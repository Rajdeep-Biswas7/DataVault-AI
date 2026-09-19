# DataVault AI

> A privacy-preserving AI data collaboration platform — organizations allow AI analysis on sensitive datasets without exposing raw data to any other party.

## Contract Address

| Network  | Address                                                  |
|----------|----------------------------------------------------------|
| Preview  | [PASTE ADDRESS AFTER DEPLOY]                             |
| Preprod  | [PASTE ADDRESS AFTER DEPLOY]                             |

---

## What This Does

DataVault AI creates a **controlled privacy layer between a data owner and an AI researcher**.

Instead of:
```
Hospital → Raw Dataset → Researcher
```

DataVault AI provides:
```
Hospital (Data Owner)
  ↓  registers private dataset
DataVault AI Policy Engine
  ↓  authorization & policy checks
Compact Smart Contract (Midnight)
  ↓  ZK proof of policy compliance
Researcher
  ↓  receives verified aggregate result only
```

### The Three Circuits

| Circuit | Purpose | Public Output |
|---------|---------|---------------|
| `registerDataset` | Data owner registers a private dataset | Increments `datasetCount`; stores policy hash |
| `requestComputation` | Researcher requests an authorized AI computation | Increments `totalComputations`; stores computation hash |
| `verifyPolicyCompliance` | Proves the computation followed the approved policy | Updates `lastVerificationHash` |

---

## Privacy Model

### What is PUBLIC (on-chain, visible to anyone):
- `datasetCount` — total number of registered datasets (counter only, not dataset contents)
- `totalComputations` — total number of approved AI computations performed
- `lastVerificationHash` — cryptographic hash of the most recent policy verification

### What is PRIVATE (private witness / circuit input, NEVER on-chain):
- `policyKey` — the data owner's secret authorization key
- `rawRecordCount` — the actual number of records inside the private dataset
- `researcherIdentifier` — the internal researcher identity token

### What the user PROVES without revealing:
- **Dataset is non-empty** — proves `rawRecordCount > 0` via `disclose()` without revealing the count
- **Valid owner authorization** — proves `policyKey != zeroes` without revealing the key
- **Researcher is authorized** — proves `researcherIdentifier != zeroes` without revealing identity
- **Raw data never left the vault** — no individual patient records, names, or sensitive fields ever appear on-chain

---

## Tech Stack

- **Midnight Network** — privacy-first blockchain with ZK proof infrastructure
- **Compact** v0.34.0 — smart contract language with native `disclose()` for selective disclosure
- **Node.js** v22+ — JavaScript runtime
- **Docker** — required for the proof server
- **TypeScript** — type-safe contract interaction and tests
- **Jest** — unit test framework

---

## Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | ≥ 22 | [nodejs.org](https://nodejs.org) |
| Docker Desktop | Latest | Must be running |
| WSL 2 + Ubuntu | Any | For Compact compiler on Windows |
| Compact CLI | 0.5.2 | Installed via installer script |
| Compact Toolchain | 0.34.0 | Installed via `compact update` |

---

## Setup

### 1. Clone / open the project

```bash
cd "DataVault AI"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Compact compiler (WSL / Linux / macOS)

```bash
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh

source ~/.local/bin/env
compact update          # downloads the compiler toolchain
compact --version       # should print 0.5.2 (CLI) and 0.34.0 (toolchain)
```

> **Windows users**: run the installer inside WSL 2 Ubuntu terminal.

### 4. Start the proof server

```bash
docker pull midnightnetwork/proof-server
docker run -p 6300:6300 midnightnetwork/proof-server
```

### 5. Compile the contract

```bash
# From WSL terminal (project root):
compact compile contracts/counter.compact contracts/managed/counter
```

Successful output:
```
Compiling 3 circuits:
```

Generated files in `contracts/managed/counter/`:
```
contract/index.js          ← TypeScript-compatible contract
contract/index.d.ts        ← Type definitions
keys/registerDataset.prover
keys/registerDataset.verifier
keys/requestComputation.prover
keys/requestComputation.verifier
keys/verifyPolicyCompliance.prover
keys/verifyPolicyCompliance.verifier
zkir/registerDataset.zkir
...
```

---

## Run Tests

```bash
npm test
```

Expected output:
```
PASS tests/counter.test.ts
  Circuit Logic
    ✓ registerDataset: increments datasetCount by 1
    ✓ requestComputation: increments totalComputations by 1
    ✓ verifyPolicyCompliance: updates lastVerificationHash
  State Transitions
    ✓ three registerDataset calls accumulate datasetCount = 3
    ✓ two requestComputation calls accumulate totalComputations = 2
    ✓ lastVerificationHash reflects the most recent verifyPolicyCompliance call
    ✓ datasetCount and totalComputations are independent counters
  Privacy Guarantees — private inputs never exposed
    ✓ registerDataset: raw record count is NOT stored in ledger
    ✓ requestComputation: researcher identity is NOT stored in ledger
    ✓ verifyPolicyCompliance: disease records NOT stored in ledger
    ✓ initial ledger is clean — no sensitive data pre-loaded

Tests: 11 passed, 11 total
```

---

## Initial Idea

[LEAVE PLACEHOLDER — I will fill this in manually]

---

## Screenshots

[LEAVE PLACEHOLDER — I will add compile output and contract address screenshots]

---

## Project Structure

```
DataVault AI/
├── contracts/
│   ├── counter.compact          ← Compact smart contract
│   └── managed/
│       └── counter/
│           ├── contract/        ← Generated TypeScript contract
│           ├── keys/            ← ZK proving/verifying keys
│           └── zkir/            ← Circuit IR
├── managed/                     ← Root-level managed copy
├── src/                         ← Frontend (Level 2)
├── tests/
│   └── counter.test.ts          ← 11 passing tests
├── .github/
│   └── workflows/               ← CI/CD (Level 3)
├── mn-demo/                     ← Hello-world scaffold reference
├── README.md
├── package.json
└── tsconfig.json
```

---

## Security / Privacy Model Summary

| Threat | Defense |
|--------|---------|
| Researcher accesses raw data | Policy engine blocks; only hash commitments go on-chain |
| Unauthorized organization runs computation | Wallet identity + authorization check |
| Data leakage through AI output | Only aggregate results returned; no individual records |
| Sensitive data written to blockchain | Only hash commitments, counters, and verification hashes stored |
| Malicious data owner | ZK proof of computation correctness provides verifiable guarantee |

---

## License

MIT
