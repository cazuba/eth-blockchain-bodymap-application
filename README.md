# ETH Blockchain Application Body Map (Smart Contract + Backend API + UI)
Build my first blockchain application over ETH with UI interface.

## Screenshots

- Testnet: Sepolia ETH
Link: [https://sepolia.etherscan.io/address/0x8bC11D86Ca8883C7785A37FB03aD70875A59A35f](https://sepolia.etherscan.io/address/0x8bC11D86Ca8883C7785A37FB03aD70875A59A35f)
<img width="1664" height="880" alt="Screenshot 2025-11-19 at 7 34 33 AM" src="https://github.com/user-attachments/assets/8ab3ceb4-952d-47f6-a8d7-101b876607a8" />

- User Interface
<img width="1506" height="986" alt="Screenshot 2025-11-19 at 7 34 14 AM" src="https://github.com/user-attachments/assets/652e5a7a-20fb-4fc5-a5ed-f13674048734" />

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

## Credits
- Pluralsight course: [Blockchain Fundamentals](https://app.pluralsight.com/library/courses/fundamentals-blockchain) By [Jan-Erik Sandberg](https://app.pluralsight.com/profile/author/janerik-sandberg)
