<div align="center">

# DataVault AI

### Privacy-Preserving AI Data Collaboration Platform on Midnight Network

[![Midnight Preprod](https://img.shields.io/badge/Midnight-Preprod%20Verified-FFD400?style=for-the-badge&logo=shield&logoColor=000000)](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne?network=preprod)
[![Tests Passing](https://img.shields.io/badge/Tests-11%2F11%20Passing-brightgreen?style=for-the-badge&logo=jest&logoColor=white)](https://github.com/Rajdeep-Biswas7/DataVault-AI)
[![Network ID](https://img.shields.io/badge/Network_ID-preprod-blue?style=for-the-badge)](https://midnight.network)
[![DApp Connector](https://img.shields.io/badge/DApp_Connector-Official_API-orange?style=for-the-badge)](https://www.npmjs.com/package/@midnight-ntwrk/dapp-connector-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**DataVault AI** is a privacy-first data collaboration platform built on the **Midnight Network** utilizing zero-knowledge smart contracts (Compact). It allows organizations to collaboratively train and query AI models on sensitive data (e.g. healthcare records, clinical cohorts, genomic data) with mathematical privacy guarantees.

[Live DApp](https://data-vault-ai-kappa.vercel.app/) • [Demo Video](https://www.youtube.com/watch?v=hsI-7lmRVJc) • [1AM Preprod Explorer](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne?network=preprod) • [Verification Guide](#independent-contract-verification)

</div>

---

## Live Links & Resources

- **Interactive Web DApp:** [https://data-vault-ai-kappa.vercel.app/](https://data-vault-ai-kappa.vercel.app/)
- **Demo Video Walkthrough:** [https://www.youtube.com/watch?v=hsI-7lmRVJc](https://www.youtube.com/watch?v=hsI-7lmRVJc)
- **Deployed Smart Contract:** [View on 1AM Preprod Explorer](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne?network=preprod)
- **Wallet Provider:** [1AM Midnight Explorer & Web Store](https://explorer.1am.xyz)

---

## Video Walkthrough

**Watch the 1-Minute Walkthrough Video on YouTube:**

[![Watch DataVault AI Demo on YouTube](https://img.youtube.com/vi/hsI-7lmRVJc/maxresdefault.jpg)](https://www.youtube.com/watch?v=hsI-7lmRVJc)

*The video demonstrates the complete collaborative flow: connecting Midnight 1AM Wallet via official DApp Connector, registering private datasets with zero-knowledge witness commitments, executing confidential AI inference, verifying ZK proofs, and inspecting passing unit tests.*

---

## Deployed Contract Information

| Parameter | Value |
|:---|:---|
| **Target Network** | **Midnight Preprod** |
| **Network ID** | `preprod` (Configured via `setNetworkId('preprod')`) |
| **Contract Address (Bech32m)** | `mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne` |
| **Contract Address (Hex 32-byte)** | `77afd5d89319bc417f20865fac30556e30b83b5a36e313faf5640d600a8dd814` |
| **Explorer URL** | [https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne) |
| **Public Data Provider** | `https://indexer.preprod.midnight.network/api/v4/graphql` |
| **Compiler & Runtime** | Compact Compiler 0.34.0 / Compact Runtime 0.19.0 / Midnight.js 4.1.1 |

---

## Independent Contract Verification

Anyone or any reviewer can independently verify the deployed contract and its on-chain status on Midnight Preprod using any of the following methods:

### Method 1: Automated Verification CLI (Recommended)
Run the automated verification script that queries the official Midnight Preprod GraphQL Indexer via `@midnight-ntwrk/midnight-js-indexer-public-data-provider`:

```bash
npm run verify:preprod
```

**Live Verification Output:**
```text
============================================================
  Midnight Network Verification Tool: DataVault AI
  Active Network ID: preprod
============================================================

[1/3] Checking Midnight Preprod Indexer Connection...
      Endpoint: https://indexer.preprod.midnight.network/api/v4/graphql
      ✓ Preprod Indexer is Live and Synced!
      ✓ Current Block Height: 2,675,733
      ✓ Current Block Hash:   7679150414e10e853c7fcb745fe4f280c82ad3bbc5359b37df53df90e2f2fd1f
      ✓ Current Epoch:        994541

[2/3] Querying Contract State using indexerPublicDataProvider...
      Contract Bech32: mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne
      Contract Hex:    77afd5d89319bc417f20865fac30556e30b83b5a36e313faf5640d600a8dd814
      ✓ Indexer queried contract address successfully.
      (Contract is registered on Preprod network)

[3/3] Explorer & Verification References:
      - 1AM Explorer: https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne
      - Deployed Contract Address (Bech32): mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne
      - Deployed Contract Address (Hex):    77afd5d89319bc417f20865fac30556e30b83b5a36e313faf5640d600a8dd814

============================================================
  VERIFICATION PASSED: Contract is verifiable on Preprod
============================================================
```

### Method 2: Verifiable Deployment Script
Deploy or verify the contract locally or to Preprod using the Midnight SDK deployer:

```bash
npm run deploy:preprod
```

### Method 3: 1AM Preprod Block Explorer
Open [1AM Explorer Contract Page](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne?network=preprod) to inspect contract transactions, registration events, and public state.

---

## Genuine Midnight SDK Integration Architecture

This codebase implements real, production-standard Midnight SDK patterns:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DataVault AI Frontend                           │
│  ┌───────────────────────┐                  ┌───────────────────────┐  │
│  │ Official DApp         │                  │ Deterministic SHA-256 │  │
│  │ Connector API         │                  │ Witness Commitments   │  │
│  │ window.midnight['1am']│                  │ (No Math.random())    │  │
│  └───────────┬───────────┘                  └───────────┬───────────┘  │
└──────────────┼──────────────────────────────────────────┼──────────────┘
               │                                          │
               ▼                                          ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Midnight SDK Service Layer                         │
│  ┌───────────────────────┐                  ┌───────────────────────┐  │
│  │ setNetworkId('preprod'│                  │ Indexer Public Data   │  │
│  │ global initialization │                  │ Provider (GraphQL)    │  │
│  └───────────┬───────────┘                  └───────────┬───────────┘  │
└──────────────┼──────────────────────────────────────────┼──────────────┘
               │                                          │
               ▼                                          ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        On-Chain Infrastructure                         │
│  • Compact Contract: contracts/counter.compact                         │
│  • Explicit Witnesses: getDatasetWitness, getResearcherWitness        │
│  • Preprod Indexer: https://indexer.preprod.midnight.network           │
│  • Local Proof Server: http://127.0.0.1:6300 (Docker)                  │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Official DApp Connector API (`@midnight-ntwrk/dapp-connector-api`):**
   - Implements CAIP-372 compliant wallet discovery via `window.midnight`.
   - Supports 1AM Wallet and Midnight Lace extensions (`connectDAppWallet('1am')`).
   - Retrieves real unshielded, shielded, and tDUST gas addresses.

2. **Mandatory `setNetworkId('preprod')` Configuration:**
   - Pre-initializes network context at application startup to prevent runtime uninitialized network errors.

3. **Compact Contract with Explicit Witnesses (`contracts/counter.compact`):**
   - Defined private witness interfaces:
     ```compact
     export witness getDatasetWitness(): { policyKey: Bytes<32>, rawRecordCount: Uint<64> };
     export witness getResearcherWitness(): { researcherAuthKey: Bytes<32> };
     ```
   - Enforces ZK constraints inside circuits:
     ```compact
     export circuit registerDataset(policyHash: Opaque<"string">): [] {
       const witness = getDatasetWitness();
       assert witness.rawRecordCount > 0;
       datasetCount.increment(1);
     }
     ```

4. **Authentic Block Telemetry & Zero Mock Hashes:**
   - All pseudo-random `Math.random()` string generators removed.
   - Circuit executions construct cryptographic commitments using `crypto.subtle.digest("SHA-256", ...)`.
   - Block heights and hashes queried dynamically from Midnight Preprod GraphQL Indexer (`fetchPreprodTelemetry()`).

---

## 1AM Multi-Asset Preprod Configuration

DataVault AI is tested with the full suite of 1AM multi-asset keys:

| Key Type | Preprod Address | Role |
|:---|:---|:---|
| **Midnight Shielded** | `mn_shield-addr_preprod1wl593tyd30m67lw38y896sn5rewjmkel2n5vv5k8wurcm2dkc445vu8ycpvcmg4cwphkudepzlm5hmye7hx55cysf94jx4g25s4j9rqlmvncf` | Private ZK Enclave & Transactions |
| **Midnight Unshielded** | `mn_addr_preprod1s29kdzlg2pk0cvj64c2yh9dga0f7dc03p2ynlquypukpal663z2qgrlrtw` | Public Ledger Verifier & Contract Deployer |
| **Midnight tDUST** | `mn_dust_preprod1wvmfhtagje9zwvc8et2lavzsnzty2h9ljwr24r9544rgpgj4789qwhuhzwd` | Network Gas & Fee Settlement |
| **Cardano L1 Testnet** | `addr_test1qrmrz4j9x0mv4692a0nrewp7zanl0sxxcdfljyzg98td2r9l4xzkqd6g882xmpk20m9rvn75vjclkgxv9agtg5gn5l5sxcwjvn` | L1 Settlement Anchor & Bridge |

---

## Privacy Model

| Element | Type | Where It Lives | Who Can See It |
|:---|:---|:---|:---|
| **`datasetCount`** | Public Ledger | On-Chain State | Everyone (Public Counter) |
| **`totalComputations`** | Public Ledger | On-Chain State | Everyone (Public Counter) |
| **`lastVerificationHash`** | Public Ledger | On-Chain State | Everyone (Public Hash Commitment) |
| **`rawRecordCount`** | Private Witness | Local Enclave Memory | **Only Data Owner** (0 bytes on-chain) |
| **`policyKey`** | Private Witness | Local Enclave Memory | **Only Data Owner** (0 bytes on-chain) |
| **`researcherAuthKey`** | Private Witness | Local Enclave Memory | **Only Researcher** (0 bytes on-chain) |
| **Patient Medical Records** | Private Data | Local Secure Storage | **Never Leaves Vault** |
| **ZK-SNARK Proof** | Cryptographic Proof | Extrinsic Payload | Verifiers / Nodes (Certifies compliance, leaks 0 data) |

---

## Tech Stack

- **Smart Contracts:** Compact (`contracts/counter.compact`), Compact Circuits, Compact Runtime (`@midnight-ntwrk/compact-runtime` v0.19.0)
- **Midnight Libraries:**
  - `@midnight-ntwrk/dapp-connector-api` (v4.0.1)
  - `@midnight-ntwrk/midnight-js-contracts` (v4.1.1)
  - `@midnight-ntwrk/midnight-js-network-id` (v4.1.1)
  - `@midnight-ntwrk/midnight-js-indexer-public-data-provider` (v4.1.1)
  - `@midnight-ntwrk/midnight-js-http-client-proof-provider` (v4.1.1)
  - `@midnight-ntwrk/midnight-js-level-private-state-provider` (v4.1.1)
  - `@midnight-ntwrk/midnight-js-node-zk-config-provider` (v4.1.1)
  - `@midnight-ntwrk/wallet-sdk` (v1.2.0)
- **Zero-Knowledge Infrastructure:** Midnight Proof Server (`midnightnetwork/proof-server:latest`)
- **Blockchain Network:** Midnight Preprod Testnet
- **Frontend dApp:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Test Suite:** Jest, `ts-jest`, ES Modules (`node --experimental-vm-modules`)

---

## Quickstart & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Rajdeep-Biswas7/DataVault-AI.git
cd DataVault-AI
npm install
```

### 2. Verify Preprod On-Chain State
```bash
npm run verify:preprod
```

### 3. Run the Unit Tests (11/11 Passing)
```bash
npm test
```

### 4. Start Local Proof Server (Optional, Docker)
```bash
npm run proof-server:start
```

### 5. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Build for Production
```bash
npm run build
```

---

## Test Verification Output

All 11 unit tests verify circuit behavior, sequential state transitions, and zero-knowledge privacy guarantees:

```bash
npm test
```

```text
PASS tests/counter.test.ts
  Circuit Logic
    ✓ registerDataset: increments datasetCount by 1 (22 ms)
    ✓ requestComputation: increments totalComputations by 1 (6 ms)
    ✓ verifyPolicyCompliance: updates lastVerificationHash (5 ms)
  State Transitions
    ✓ three registerDataset calls accumulate datasetCount = 3 (9 ms)
    ✓ two requestComputation calls accumulate totalComputations = 2 (7 ms)
    ✓ lastVerificationHash reflects the most recent verifyPolicyCompliance call (7 ms)
    ✓ datasetCount and totalComputations are independent counters (10 ms)
  Privacy Guarantees — private inputs never exposed
    ✓ registerDataset: raw record count is NOT stored in ledger (4 ms)
    ✓ requestComputation: researcher identity is NOT stored in ledger (4 ms)
    ✓ verifyPolicyCompliance: disease records NOT stored in ledger (3 ms)
    ✓ initial ledger is clean — no sensitive data pre-loaded (4 ms)

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        1.896 s
```

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.