const { compiledContract } = require('../compile');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const clearTextPassword = 'SuperSecretPassword';
let accounts = [];
let deployedBodyMapContract = null;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    deployedBodyMapContract = await new web3.eth.Contract(compiledContract.abi).deploy({
        data: compiledContract.evm.bytecode.object,
        arguments: [clearTextPassword]
    }).send({ from: accounts[0], gas: "1000000" });
});

describe('BodyMap', () => {
    it('deploys the contract', () => {
        assert.ok(deployedBodyMapContract.options.address);
        console.log(deployedBodyMapContract.options.address);
    });

    it("changes the body maps", async () => {
        const newBasicBodyMap = 'newBasicBodyMap';
        const newTailorBodyMap = 'newTailorBodyMap';

        await deployedBodyMapContract.methods.setBodyMaps(clearTextPassword, newBasicBodyMap, newTailorBodyMap)
            .send({ from: accounts[0], gas: 5000000 });

        const basicBodyMap = await deployedBodyMapContract.methods.basicBodyMap().call();
        const tailorBodyMap = await deployedBodyMapContract.methods.tailorBodyMap().call();

        assert.equal(basicBodyMap, newBasicBodyMap);
        assert.equal(tailorBodyMap, newTailorBodyMap);
    });

    it("fails to change the body maps with the wrong password", async () => {
        const newBasicBodyMap = 'newBasicBodyMap';
        const newTailorBodyMap = 'newTailorBodyMap';
        const wrongPassword = 'WrongPassword';

        await assert.rejects(deployedBodyMapContract.methods.setBodyMaps(wrongPassword, newBasicBodyMap, newTailorBodyMap)
            .send({ from: accounts[0], gas: 5000000 }));
    });
});