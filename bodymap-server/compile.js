const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractToCompileName = 'bodymap.sol';
const contractPath = path.join(__dirname, 'contracts', contractToCompileName);
const contractSource = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        [contractToCompileName]: {
            content: contractSource
        }
    },
    settings: {outputSelection: {"*": {"*":["*"]}}}
    //     outputSelection: {
    //         '*': {
    //             '*': [
    //                 'abi',
    //                 'evm.bytecode',
    //                 'evm.deployedBytecode'
    //             ]
    //         }
    //     }
    // }
};
const compiledContracts = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(compiledContracts);

const compiledContract = compiledContracts.contracts[contractToCompileName]["BodyMap"];
// console.log(compiledContract);

module.exports = { compiledContract };