# DataVault AI

> A privacy-preserving data collaboration prototype for running approved AI analysis over sensitive datasets without exposing the underlying records.

[![CI](https://github.com/Rajdeep-Biswas7/DataVault-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/Rajdeep-Biswas7/DataVault-AI/actions/workflows/ci.yml)

DataVault AI demonstrates a confidential data clean-room workflow for organizations such as hospitals, financial institutions, and research laboratories. Data owners register datasets under policy commitments, authorized researchers request approved computations, and the system exposes aggregate results instead of raw rows.

The project combines a React/Vite demonstration interface with a Compact smart contract model for Midnight Network. It is intended for experimentation, architecture validation, and builder-challenge demonstration rather than production deployment.

## Contents

- [Product overview](#product-overview)
- [Key capabilities](#key-capabilities)
- [Privacy model](#privacy-model)
- [Architecture](#architecture)
- [Technology stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Available commands](#available-commands)
- [Using the demo](#using-the-demo)
- [Smart contract](#smart-contract)
- [Testing and CI](#testing-and-ci)
- [Project structure](#project-structure)
- [Current limitations](#current-limitations)
- [Roadmap](#roadmap)
- [Security](#security)
- [License](#license)

## Product overview

Traditional data collaboration requires transferring sensitive records to the party performing analysis:

```text
Data owner ── raw records ──> AI researcher
```

DataVault AI models a different flow:

```text
Data owner ──> private dataset vault ──> approved computation
                                             │
                                             └── aggregate result + commitment
```

The public ledger stores counters and cryptographic commitments. Private values such as record counts, authorization keys, and researcher credentials are treated as witnesses and are not intended to become public ledger state.

## Key capabilities

### Data owner workspace

- Register a private dataset with a policy commitment.
- Keep the record count and authorization key in the private-input model.
- Configure a differential-privacy budget in the demonstration UI.
- Enforce an explicit policy that blocks raw-data export.

### AI researcher workspace

- Select a protected dataset and an approved model.
- Request a privacy-preserving computation.
- View verified aggregate risk or cohort statistics.
- Export a JSON proof receipt containing aggregate output and commitments, not source rows.

### Audit explorer

- View public `datasetCount` and `totalComputations` counters.
- Inspect the latest verification commitment.
- Review computation history and proof hashes.
- Copy commitments for independent inspection.

### Midnight integration target

- Compact contract source is included in [`contracts/counter.compact`](<D:/DataVault AI/contracts/counter.compact>).
- Generated contract artifacts are used by the test suite.
- The configured target network is Midnight Preprod.
- The displayed contract address is:

  ```text
  mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne
  ```

## Privacy model

| Data | Intended visibility | Purpose |
| --- | --- | --- |
| `datasetCount` | Public ledger | Counts registered datasets |
| `totalComputations` | Public ledger | Counts approved computation requests |
| `lastVerificationHash` | Public ledger | Stores the latest commitment |
| Policy and computation hashes | Public commitments | Bind an event without publishing source data |
| `rawRecordCount` | Private witness | Proves the dataset is non-empty without revealing its size |
| `policyKey` | Private witness | Proves owner authorization |
| `researcherIdentifier` | Private witness | Proves researcher authorization |
| Raw dataset records | Private | Never included in the public ledger model |

The contract uses `disclose()` only for values that are intentionally committed to public state. Privacy guarantees in a production deployment would also depend on the complete witness-management, proving, storage, access-control, and infrastructure design.

## Architecture

```text
React + TypeScript + Tailwind
        │
        ├── Data Owner workspace
        ├── AI Researcher workspace
        └── Audit Explorer
                │
                ▼
        useDataVault demo orchestration
                │
                ├── Wallet/proof lifecycle demonstration
                ├── In-memory dataset and result state
                └── Compact contract behavior under test
                                │
                                ▼
                    Midnight Compact contract model
```

The current web interface demonstrates the product workflow locally. The browser-side orchestration in [`src/hooks/useDataVault.ts`](<D:/DataVault AI/src/hooks/useDataVault.ts>) uses in-memory state and simulated wallet/proving delays; it does not yet submit live transactions to the configured Preprod contract.

## Technology stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Smart contract:** Compact v0.34.0
- **Runtime and tests:** `@midnight-ntwrk/compact-runtime`, Jest, ts-jest
- **Network target:** Midnight Preprod
- **Optional proving infrastructure:** Midnight proof server on port `6300`
- **Node.js:** 22 or later

## Prerequisites

- Node.js 22+
- npm
- Git
- A Compact CLI installation for contract compilation
- Docker Desktop, if running the optional proof-server service
- Linux, macOS, or WSL 2 for the Compact compiler toolchain

Check the Node.js version before installing:

```bash
node --version
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in a browser.

The server can also be bound explicitly to localhost:

```bash
npm run dev -- --host 127.0.0.1
```

### 3. Compile the Compact contract (optional for the UI)

Install and select Compact v0.34.0, then run:

```bash
npm run compile
```

The command compiles [`contracts/counter.compact`](<D:/DataVault AI/contracts/counter.compact>) into `contracts/managed/counter`.

### 4. Start the optional proof server

The package exposes convenience scripts for a Docker Compose proof-server service:

```bash
npm run proof-server:start
```

Stop it with:

```bash
npm run proof-server:stop
```

The current repository does not include a Compose file, so these scripts require a local `proof-server` service definition before they can be used. The browser prototype does not require the service to render the interface.

## Deploying to Vercel

This repository is configured for Vercel as a standard Vite single-page application.

### Dashboard deployment

1. Import the GitHub repository into Vercel.
2. Keep the detected framework as **Vite**.
3. Use `npm run build` as the build command.
4. Use `dist` as the output directory.
5. Deploy without adding environment variables; the current prototype does not require any.

Vercel will also infer these settings automatically from the repository. The included [`vercel.json`](<D:\DataVault AI\vercel.json>) provides an SPA fallback so browser refreshes and direct navigation resolve to `index.html`.

### CLI deployment

```bash
npm install -g vercel
vercel
```

For a production deployment:

```bash
vercel --prod
```

The deployed application remains a client-side prototype: wallet connections, proof generation, and dataset/computation state are simulated in the browser until the live Midnight provider integration is completed.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Jest contract behavior and privacy tests |
| `npm run compile` | Compile the Compact contract into managed artifacts |
| `npm run proof-server:start` | Start the Compose proof-server service |
| `npm run proof-server:stop` | Stop the Compose proof-server service |

## Using the demo

1. Start the app with `npm run dev`.
2. Select **Data Owner** and connect the demo wallet.
3. Register a dataset using the default values or a quick preset.
4. Select **AI Researcher** and execute an approved model against the protected dataset.
5. Open **Audit Explorer** to inspect public counters, commitments, and computation history.
6. Use the result receipt export to download aggregate output and verification metadata.

The wallet connection is intentionally simulated in the current prototype. Do not enter production credentials, private keys, personal data, or real patient information.

## Smart contract

The Compact contract exports three circuits:

| Circuit | Public effect |
| --- | --- |
| `registerDataset(policyHash)` | Increments `datasetCount` and records a policy commitment |
| `requestComputation(computationHash)` | Increments `totalComputations` and records a computation commitment |
| `verifyPolicyCompliance(verificationHash)` | Records the latest policy-verification commitment |

Its public ledger contains only:

```compact
export ledger datasetCount: Counter;
export ledger totalComputations: Counter;
export ledger lastVerificationHash: Opaque<"string">;
```

The contract source documents the intended private-witness model and the values that must not be written to ledger state.

## Testing and CI

Run the focused test suite with:

```bash
npm test
```

The tests cover:

- Individual circuit behavior
- State accumulation across multiple calls
- Independence of public counters
- The absence of raw record counts, policy keys, researcher identities, and patient data in ledger state

GitHub Actions runs the following checks on pushes and pull requests targeting `main` or `master`:

1. Install Node.js 22 and npm dependencies.
2. Install the Compact CLI.
3. Compile the Compact contract.
4. Run the Jest suite.
5. Build the Vite application.

Workflow definition: [`.github/workflows/ci.yml`](<D:/DataVault AI/.github/workflows/ci.yml>).

## Project structure

```text
.
├── contracts/
│   └── counter.compact          # Compact privacy-policy contract
├── managed/counter/             # Generated contract artifacts used by tests
├── src/
│   ├── components/              # UI workspaces and shared components
│   ├── hooks/useDataVault.ts    # Demo state and workflow orchestration
│   ├── App.tsx                  # Application composition
│   └── main.tsx                 # Browser entry point
├── tests/counter.test.ts        # Contract behavior and privacy tests
├── public/                      # Static assets
├── .github/workflows/ci.yml     # Build, compile, and test pipeline
├── package.json                 # Scripts and dependencies
└── vite.config.ts               # Vite configuration
```

Generated build output is written to `dist/` and should not be treated as source code.

## Current limitations

This repository is an architectural and UI prototype. Before production use, it requires at least:

- Real 1AM/Midnight wallet integration and transaction signing
- Live proof-server and indexer/provider wiring
- Persistent private-state storage and secure key management
- Server-side or enclave-backed model execution
- Strong researcher and data-owner identity/access control
- Real policy enforcement connected to the contract's private witnesses
- Production-grade cryptographic review, threat modeling, and operational monitoring
- Removal of sample data and simulated result generation
- Formal privacy, compliance, and data-governance review for each deployment domain

The configured Preprod contract address is provided as a reference target, not as proof that every browser action currently reaches that deployed contract.

## Roadmap

1. Replace simulated wallet and proof flows with Midnight SDK integrations.
2. Connect contract calls to live Preprod providers.
3. Move private state and model execution into a controlled secure environment.
4. Add policy versioning, authorization scopes, revocation, and replay protection.
5. Add integration tests against a local or Preprod network.
6. Complete a security and privacy review before handling real data.

Additional product context is available in [`PROPOSAL.md`](<D:/DataVault AI/PROPOSAL.md>).

## Security

Please do not submit real secrets or sensitive datasets through the demo. To report a security concern, use a private channel rather than opening a public issue with exploit details.

## License

This project is released under the MIT License. See the [`package.json`](<D:/DataVault AI/package.json>) metadata for the project license declaration.
