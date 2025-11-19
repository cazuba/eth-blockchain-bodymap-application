import { useState, useMemo } from 'react';
import Web3 from 'web3';
import fetch from 'node-fetch';
import crypto from 'crypto-js';

import ContractPasswordForm from '../../components/ContractPasswordForm';
import BasicPasswordForm from '../../components/BasicPasswordForm';
import BodyMap from '../../components/BodyMap';
import LoadingState from '../../shared/LoadingState';

window.ethereum.request({ method: 'eth_requestAccounts' });
const web3 = new Web3(window.ethereum);

function Main() {
    const [passwordClearText, setPasswordClearText] = useState('');
    const [contractDeploymentState, setContractDeploymentState] = useState({
        state: LoadingState.INITIAL, errorMessage: '', contract: '', address: ''
    });
    const [passwordsSetupState, setPasswordsSetupState] = useState({
        state: LoadingState.INITIAL, errorMessage: '', passwordClearTextBasic: '', passwordClearTextTailor: ''
    });
    const [bodyMapState, setBodyMapState] = useState({
        state: LoadingState.INITIAL,
        errorMessage: ''
    });
    const [bodyMapBasic, setBodyMapBasic] = useState({
        Height: '',
        Weight: ''
    });

    const [bodyMapTailor, setBodyMapTailor] = useState({
        Waist: '',
        Legs: '',
        Arms: '',
        Posture: ''
    });

    const { deployedContract, deployedAddress } = useMemo(() => ({
        deployedContract: contractDeploymentState.contract,
        deployedAddress: contractDeploymentState.address
    }), [contractDeploymentState.contract, contractDeploymentState.address]);

    const { passwordClearTextBasic, passwordClearTextTailor } = useMemo(() => ({
        passwordClearTextBasic: passwordsSetupState.passwordClearTextBasic,
        passwordClearTextTailor: passwordsSetupState.passwordClearTextTailor
    }), [passwordsSetupState.passwordClearTextBasic, passwordsSetupState.passwordClearTextTailor]);

    const isDeployed = useMemo(() => !!deployedAddress, [deployedAddress]);
    const {
        isBlockedForPasswordSetup,
        isBlockedForInteraction
    } = useMemo(() => {
        const hasPasswordsSetUp = passwordsSetupState.state === LoadingState.SUCCESS;
        return {
            isBlockedForPasswordSetup: !isDeployed || hasPasswordsSetUp,
            isBlockedForInteraction: !isDeployed || !hasPasswordsSetUp
        }
    }, [isDeployed, passwordsSetupState.state]);

    const handlePasswordClearTextChange = (event) => {
        setPasswordClearText(event.target.value);
    };

    const handlePasswordClearTextBasicChange = (event) => {
        setPasswordsSetupState((prevState) => ({ ...prevState, passwordClearTextBasic: event.target.value }));
    };

    const handlePasswordClearTextTailorChange = (event) => {
        setPasswordsSetupState((prevState) => ({ ...prevState, passwordClearTextTailor: event.target.value }));
    };

    const handleBasicPasswordSubmit = (event) => {
        event.preventDefault();
        if (!passwordClearTextBasic) {
            setPasswordsSetupState((prevState) => ({ ...prevState, state: LoadingState.FAILED, errorMessage: 'Basic password is required' }));
            return;
        }
        if (!passwordClearTextTailor) {
            setPasswordsSetupState((prevState) => ({ ...prevState, state: LoadingState.FAILED, errorMessage: 'Tailor password is required' }));
            return;
        }
        setPasswordsSetupState((prevState) => ({ ...prevState, state: LoadingState.SUCCESS }));
    };

    const handleBodyMapBasicChange = (event, key) => {
        setBodyMapBasic({ ...bodyMapBasic, [key]: event.target.value });
    };

    const handleBodyMapTailorChange = (event, key) => {
        setBodyMapTailor({ ...bodyMapTailor, [key]: event.target.value });
    };

    const deployContract = async (event) => {
        event.preventDefault();
        setContractDeploymentState((prevState) => ({ ...prevState, state: LoadingState.IN_PROGRESS }));
        if (!passwordClearText || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(passwordClearText)) {
            setContractDeploymentState({ state: LoadingState.FAILED, errorMessage: 'Password is required. It must be at least 8 characters long. And it must contain at least one uppercase letter, one lowercase letter, and one number.' });
            return;
        }
        fetch('http://localhost:8000/')
            .then(response => {
                return response.json();
            })
            .then(async (compiledContract) => {
                const accounts = await web3.eth.getAccounts();
                let contract = await new web3.eth.Contract(compiledContract.abi)
                    .deploy({ data: compiledContract.evm.bytecode.object, arguments: [passwordClearText] })
                    .send({ from: accounts[0], gas: 1000000 });
                setContractDeploymentState({ state: LoadingState.SUCCESS, contract, address: contract.options.address });
            })
            .catch(error => {
                setContractDeploymentState({ state: LoadingState.FAILED, errorMessage: error.message });
                console.error('Error:', error);
            });
    };

    const updateBodyMaps = async (event) => {
        event.preventDefault();
        setBodyMapState({ state: LoadingState.IN_PROGRESS });
        try {

            const accounts = await web3.eth.getAccounts();
            let bodyMapBasicString = JSON.stringify(bodyMapBasic);
            let bodyMapTailorString = JSON.stringify(bodyMapTailor);

            const encryptedBodyMapBasic = crypto.AES.encrypt(bodyMapBasicString, passwordClearTextBasic).toString();
            const encryptedBodyMapTailor = crypto.AES.encrypt(bodyMapTailorString, passwordClearTextTailor).toString();

            await deployedContract.methods.setBodyMaps(passwordClearText, encryptedBodyMapBasic, encryptedBodyMapTailor).send({ from: accounts[0], gas: 5000000 });
            setBodyMapState({ state: LoadingState.SUCCESS, errorMessage: '' });
            setTimeout(() => {
                setBodyMapState({ state: LoadingState.INITIAL, errorMessage: '' });
            }, 1500);
        } catch (error) {
            setBodyMapState({ state: LoadingState.FAILED, errorMessage: error.message });
            console.error('Error:', error);
        }
    }

    const loadBodyMaps = async () => {
        let newBodyMapBasicEncrypted = await deployedContract.methods.basicBodyMap().call();
        let newBodyMapTailorEncrypted = await deployedContract.methods.tailorBodyMap().call();

        let newBodyMapBasicString = crypto.AES.decrypt(newBodyMapBasicEncrypted, passwordClearTextBasic).toString(crypto.enc.Utf8);
        console.log('newBodyMapBasicString:', newBodyMapBasicString);
        let newBodyMapTailorString = crypto.AES.decrypt(newBodyMapTailorEncrypted, passwordClearTextTailor).toString(crypto.enc.Utf8);
        console.log('newBodyMapTailorString:', newBodyMapTailorString);

        const newBodyMapBasic = JSON.parse(newBodyMapBasicString);
        console.log('newBodyMapBasic:', newBodyMapBasic);
        const newBodyMapTailor = JSON.parse(newBodyMapTailorString);
        console.log('newBodyMapTailor:', newBodyMapTailor);

        setBodyMapBasic(newBodyMapBasic);
        setBodyMapTailor(newBodyMapTailor);
        setBodyMapState({ state: LoadingState.INITIAL, errorMessage: '' });
    }

    return (
        <main>
            <h2>Globomantics Body Map</h2>
            <h3>Contract address: {deployedAddress || 'Not deployed yet'}</h3>

            <ContractPasswordForm
                disabled={isDeployed}
                loadingState={contractDeploymentState.state}
                errorMessage={contractDeploymentState.errorMessage}
                onChange={handlePasswordClearTextChange}
                onSubmit={deployContract}
            />

            {isDeployed && (
                <>
                    <hr className="my-4" />

                    <BasicPasswordForm
                        disabled={isBlockedForPasswordSetup}
                        loadingState={passwordsSetupState.state}
                        errorMessage={passwordsSetupState.errorMessage}
                        onChange={handlePasswordClearTextBasicChange}
                        onChangeTailor={handlePasswordClearTextTailorChange}
                        onSubmit={handleBasicPasswordSubmit}
                    />

                    {isBlockedForPasswordSetup && (
                        <>
                            <hr className="my-4" />

                            <BodyMap
                                disabled={isBlockedForInteraction}
                                loadingState={bodyMapState.state}
                                errorMessage={bodyMapState.errorMessage}
                                bodyMapBasic={bodyMapBasic}
                                bodyMapTailor={bodyMapTailor}
                                onChangeBasic={handleBodyMapBasicChange}
                                onChangeTailor={handleBodyMapTailorChange}
                                onSave={updateBodyMaps}
                                onRefresh={loadBodyMaps}
                            />
                        </>
                    )}
                </>
            )}
        </main>
    );
}

export default Main;