# ETH Blockchain Application Body Map (Smart Contract + Backend API + UI)
Build my first blockchain application over ETH with UI interface.

## Requirements
- NodeJS v18.20.8 or greater

## Starting the application

1. Install `npm` dependencies: `cd bodymap-react && npm i && cd ../bodymap-server && npm i`
2. Start backend API: `npm start`
3. Start UI: `cd ../bodymap-react && npm start`

## Scaffolding
```bash
.
├── bodymap-react
│   ├── public
│   └── src
│       ├── components
│       │   ├── BasicPasswordForm
│       │   ├── BodyMap
│       │   ├── BodyMapList
│       │   ├── BodyPart
│       │   └── ContractPasswordForm
│       ├── compositions
│       │   ├── Footer
│       │   ├── Header
│       │   ├── Layout
│       │   └── Main
│       └── shared
└── bodymap-server
    ├── contracts
    └── test
```

### `bodymap-react`: This folder contains the UI application

### `bodymap-server`: This folder contains the Backend API and the ETH Smart Contracts.
