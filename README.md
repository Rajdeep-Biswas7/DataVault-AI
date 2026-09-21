# DataVault AI — Privacy-Preserving AI Data Collaboration Platform

[![CI](https://github.com/Rajdeep-Biswas7/DataVault-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/Rajdeep-Biswas7/DataVault-AI/actions/workflows/ci.yml)
[![Network: Midnight Preprod](https://img.shields.io/badge/Network-Midnight_Preprod-6366f1?style=flat&logo=blockchain&logoColor=white)](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne?network=preprod)
[![Live DApp: Production](https://img.shields.io/badge/Deployment-Live_DApp-10b981?style=flat&logo=vercel&logoColor=white)](https://data-vault-ai-kappa.vercel.app/)
[![Smart Contract: Compact](https://img.shields.io/badge/Language-Compact_0.34.0-purple?style=flat)](https://docs.midnight.network)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A decentralized, privacy-preserving confidential data clean room where organizations allow AI analysis on sensitive datasets without exposing the underlying raw data to any external party. Built natively on Midnight using Compact smart contracts and zero-knowledge proofs.

[🚀 Live DApp](https://data-vault-ai-kappa.vercel.app/) • [🎬 Video Walkthrough](#demo-video) • [📜 Smart Contracts](#contract-address) • [💡 Architecture](#what-this-does) • [🔒 Privacy Model](#privacy-model) • [🛡️ Privacy Claim](#privacy-claim) • [✨ Key Innovations](#key-features--innovations) • [🛠️ Tech Stack](#tech-stack) • [💻 Local Setup](#setup--run-locally) • [🧪 Test Suite](#run-tests) • [⚙️ CI/CD Pipeline](#cicd) • [📋 Product Proposal](#product-proposal) • [✅ Submission Checklist](#submission-checklist)

---

## Live Demo

- 🌐 **Interactive Web DApp:** [https://data-vault-ai-kappa.vercel.app/](https://data-vault-ai-kappa.vercel.app/)
- 🎬 **Video Walkthrough:** [https://www.youtube.com/watch?v=hsI-7lmRVJc](https://www.youtube.com/watch?v=hsI-7lmRVJc)
- 📜 **Deployed Smart Contract:** [View on 1AM Preprod Explorer ↗](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne?network=preprod)

---

## Demo Video

🎬 **Watch the 1-Minute Walkthrough Video on YouTube:**

[![Watch DataVault AI Demo on YouTube](https://img.youtube.com/vi/hsI-7lmRVJc/maxresdefault.jpg)](https://www.youtube.com/watch?v=hsI-7lmRVJc)

*The video demonstrates the complete collaborative flow: connecting Midnight 1AM Wallet, registering private datasets with selective disclosure, executing privacy-preserving AI inference, verifying ZK proofs, and inspecting the passing test suite and green GitHub Actions CI/CD.*

---

## Contract Address

### 🌟 Deployed Midnight Smart Contract

| Network | Contract Address | Deployment Status | Explorer Link | Status |
|:---|:---|:---|:---|:---:|
| **Midnight Preprod** | `mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne` | Verified & Live | [View on 1AM Explorer ↗](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne?network=preprod) | 🟢 LIVE & ACTIVE |

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DataVault AI — Compact Smart Contracts on Midnight Testnet
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Contract Source   : ./contracts/counter.compact
Managed Bindings  : ./managed/counter/contract/index.js
Preprod Contract  : mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne
Circuits          : registerDataset, requestComputation, verifyPolicyCompliance
Public Ledger     : datasetCount (Counter), totalComputations (Counter), lastVerificationHash
Private Witnesses : policyKey, rawRecordCount, researcherIdentifier
Rules             : disclose(recordCount > 0); disclose(policyKey != 0); totalComputations += 1
Status            : 100% On-Chain Verifiable Dual-State Architecture
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## What This Does

Traditional data collaboration forces organizations to share raw, unencrypted datasets with third-party researchers:

```text
Hospital (Data Owner) ──[ Raw Patient Records ]──> AI Researcher (HIGH LEAK & COMPLIANCE RISK)
```

**DataVault AI** solves this collaboration deadlock using Midnight Network's zero-knowledge architecture:

```text
Hospital (Data Owner)
   │
   ▼
Private Dataset Vault (Enclave)
   │
   ▼
Compact Smart Contract (Midnight Preprod)
   │
   ├─► Policy Constraint Verification (ZK Proof generated via proof-server:6300)
   ├─► Authorized ML Model Inference (Random Forest / Logistic Regression)
   │
   ▼
Verified Aggregate AI Result ──► Researcher (Raw Data NEVER Leaves Vault)
```

1. **Confidential Dataset Registration**: Data owners prove their dataset is non-empty and authorized without exposing record counts or secret authorization keys.
2. **Policy-Controlled AI Computation**: External researchers run authorized machine learning models (disease risk prediction, cohort summaries) within a confidential clean room.
3. **Selective Disclosure**: Only verified aggregate cohorts (e.g. `High Risk: 1,204`, `Med: 3,510`) leave the vault.
4. **On-Chain Verifiability**: Midnight's public ledger records counters and commitment hashes that prove the computation adhered to policy rules without broadcasting private records.

---

## Key Features & Innovations

- 🛡️ **Interactive Privacy X-Ray Lens:** Real-time visual comparison showing raw hospital patient records transformed into zero-knowledge shielded witnesses.
- ⚡ **4-Stage Cryptographic Workflow:** Step-by-step interactive visualizer explaining encrypted ingestion, Compact ZK rules, confidential compute, and verified insights.
- 🎨 **Adaptive Dual-Theme Engine:** High-contrast Dark Cyber mode and soft Light Porcelain Aurora mode with persistent theme memory.
- 🌐 **Dynamic Neural Particle Background:** Interactive HTML5 canvas with mouse-reactive particle connections and floating cryptographic keyword streams.
- 💼 **1AM Wallet Handshake:** Seamless connectivity with Midnight browser wallets and Preprod contract telemetry.
- 📊 **Differential Privacy Budget Control:** Real-time tunable ($\varepsilon$) epsilon controller for mathematically bounding privacy loss.
- 📜 **Cryptographic Audit Explorer:** Chronological ledger history tracking on-chain transactions with one-click hash copy and verification proofs.

---

## Privacy Model

| Element | Type | Where It Lives | Who Can See It |
|:---|:---|:---|:---|
| **`datasetCount`** | Public Ledger | On-Chain State | Everyone (Public Counter) |
| **`totalComputations`** | Public Ledger | On-Chain State | Everyone (Public Counter) |
| **`lastVerificationHash`** | Public Ledger | On-Chain State | Everyone (Public Hash Commitment) |
| **`rawRecordCount`** | Private Witness | Local Enclave Memory | **Only Data Owner** (0 bytes on-chain) |
| **`policyKey`** | Private Witness | Local Enclave Memory | **Only Data Owner** (0 bytes on-chain) |
| **`researcherIdentifier`**| Private Witness | Local Enclave Memory | **Only Researcher** (0 bytes on-chain) |
| **Patient Medical Records**| Private Data | Local Secure Storage | **Never Leaves Vault** |
| **ZK-SNARK Proof** | Cryptographic Proof | Extrinsic Payload | Verifiers / Nodes (Certifies compliance, leaks 0 data) |

### What the User Proves Without Revealing
- **Dataset Validity:** Proves `rawRecordCount > 0` via `disclose()` without revealing how many patients are in the dataset.
- **Authorization Integrity:** Proves `policyKey != 0` certifying legitimate data ownership without disclosing the secret key.
- **Computation Compliance:** Proves the ML inference adhered to data clean room policies with zero row-level data leaks.

---

## Privacy Claim

### What an On-Chain Observer CAN SEE:
- The public transaction hash, block height, timestamp, and gas/dust fees paid.
- The total number of registered datasets (`datasetCount`) and total computations performed (`totalComputations`).
- The cryptographic verification commitment hash (`lastVerificationHash`).
- The validity of the zero-knowledge proof certifying all circuit constraints were met.

### What an On-Chain Observer CANNOT SEE:
- Any patient names, social security numbers, diagnoses, or clinical values.
- The actual record count of any individual dataset.
- The secret authorization key of the data owner.
- The personal identity of the researcher requesting computation.

---

## Tech Stack

- **Smart Contracts:** Compact (`counter.compact`), Compact Circuits, Compact Runtime (`@midnight-ntwrk/compact-runtime` v0.19.0)
- **Zero-Knowledge Infrastructure:** Midnight Proof Server (`midnightnetwork/proof-server:6300`), Proving & Verifying Keys (`.zkir`, `.bzkir`, `.prover`, `.verifier`)
- **Blockchain & Network:** Midnight Preprod Testnet, Compact Compiler v0.34.0
- **Supported Wallets:** 1AM Wallet (`1am.xyz`), Midnight Lace Wallet
- **Frontend dApp:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, HTML5 Canvas Cyber Engine
- **Test Suite:** Jest, `ts-jest`, ES Modules (`node --experimental-vm-modules`)
- **CI/CD Pipeline:** GitHub Actions (`.github/workflows/ci.yml`)

---

## Prerequisites

- **Node.js:** `v22.x` LTS (`node -v` >= 22.0.0)
- **Docker Desktop:** Running locally for the Midnight ZK Proof Server container
- **Compact Compiler:** Compact CLI (`compact 0.5.2` / toolchain `v0.34.0`)
- **Midnight Wallet:** [1AM Wallet](https://1am.xyz) configured for Midnight Preprod

---

## Setup & Run Locally

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Rajdeep-Biswas7/DataVault-AI.git
cd DataVault-AI
npm install
```

### 2. Start the Midnight Proof Server (Docker)
```bash
docker run -d -p 6300:6300 --name proof-server midnightnetwork/proof-server:latest
```

### 3. Compile the Compact Smart Contract
```bash
# Using Compact compiler (inside Linux/WSL):
compact compile contracts/counter.compact managed/counter
```
*Outputs compiled circuits, keys, and TypeScript bindings to `managed/counter/`.*

### 4. Run the 11-Test Suite
```bash
npm test
```

### 5. Launch the Frontend dApp
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Build for Production
```bash
npm run build
```

### 🐳 Running via Docker

You can launch both the **DataVault AI dApp** and the official **Midnight Zero-Knowledge Proof Server** locally using Docker:

```bash
# 1. Build and start containers
npm run build
docker compose up -d

# 2. Access the services:
#    - DataVault AI dApp:   http://localhost:8080
#    - Midnight Proof Server: http://localhost:6300

# 3. Stop containers:
docker compose down
```

---

## Run Tests

The test suite thoroughly verifies circuit logic, sequential state transitions, and zero-knowledge privacy guarantees across 11 unit tests:

```bash
npm test
```

**Passing Test Output:**
```text
PASS tests/counter.test.ts
  Circuit Logic
    √ registerDataset: increments datasetCount by 1 (22 ms)
    √ requestComputation: increments totalComputations by 1 (6 ms)
    √ verifyPolicyCompliance: updates lastVerificationHash (5 ms)
  State Transitions
    √ three registerDataset calls accumulate datasetCount = 3 (9 ms)
    √ two requestComputation calls accumulate totalComputations = 2 (7 ms)
    √ lastVerificationHash reflects the most recent verifyPolicyCompliance call (7 ms)
    √ datasetCount and totalComputations are independent counters (10 ms)
  Privacy Guarantees — private inputs never exposed
    √ registerDataset: raw record count is NOT stored in ledger (5 ms)
    √ requestComputation: researcher identity is NOT stored in ledger (4 ms)
    √ verifyPolicyCompliance: disease records NOT stored in ledger (3 ms)
    √ initial ledger is clean — no sensitive data pre-loaded (4 ms)

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        0.966 s
```

---

## CI/CD Pipeline

Continuous Integration is configured via GitHub Actions in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). On every push and pull request to `main` and `master`, the workflow automatically:
1. Provisions a clean Ubuntu environment with Node.js v22.
2. Installs dependencies using `npm install`.
3. Sets up the standalone Compact compiler CLI.
4. Compiles the Compact smart contract (`compact compile contracts/counter.compact managed/counter`).
5. Executes the automated test suite (`npm test`).
6. Verifies the production frontend build (`npm run build`).

---

## Product Proposal.

See [PROPOSAL.md](PROPOSAL.md) for the complete product proposal scoping the **Confidential Data Clean Room** for Midnight Mainnet.

---

## Submission Checklist

- [✓] **Public GitHub Repository:** Complete open-source repository with full documentation, architecture diagrams, and setup instructions ([https://github.com/Rajdeep-Biswas7/DataVault-AI](https://github.com/Rajdeep-Biswas7/DataVault-AI)).
- [✓] **Live DApp Deployment:** Deployed and accessible on Vercel at [https://data-vault-ai-kappa.vercel.app/](https://data-vault-ai-kappa.vercel.app/).
- [✓] **Verified Midnight Preprod Contract:** `mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne`.
- [✓] **CI/CD Pipeline:** Automated GitHub Actions workflow ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) with green passing status.
- [✓] **Demo Video of the MVP:** [Watch DataVault AI Demo Walkthrough on YouTube](https://www.youtube.com/watch?v=hsI-7lmRVJc).
- [✓] **11 Passing Tests:** Covering circuit logic, state transitions, and zero-knowledge privacy guarantees.
- [✓] **Meaningful Commits:** 19+ semantic commits across contract development, test suites, cryptographic circuits, and frontend UI.
- [✓] **Complete Product Proposal:** Defined in [PROPOSAL.md](PROPOSAL.md) solving real-world AI data collaboration challenges.
