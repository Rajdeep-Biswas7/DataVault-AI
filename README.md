<div align="center">

# DataVault AI

### Privacy-Preserving AI Data Collaboration Platform on Midnight Network

[![Midnight Preprod](https://img.shields.io/badge/Midnight-Preprod%20Verified-FFD400?style=for-the-badge&logo=shield&logoColor=000000)](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne?network=preprod)
[![Midnight Preview](https://img.shields.io/badge/Midnight-Preview%20Verified-00D4FF?style=for-the-badge&logo=shield&logoColor=000000)](https://explorer.1am.xyz/contract/mn_addr_preview1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q53w7vd?network=preview)
[![Tests Passing](https://img.shields.io/badge/Tests-11%2F11%20Passing-brightgreen?style=for-the-badge&logo=jest&logoColor=white)](https://github.com/Rajdeep-Biswas7/DataVault-AI)
[![Network ID](https://img.shields.io/badge/Network_ID-preprod%20%7C%20preview-blue?style=for-the-badge)](https://midnight.network)
[![DApp Connector](https://img.shields.io/badge/DApp_Connector-Official_API-orange?style=for-the-badge)](https://www.npmjs.com/package/@midnight-ntwrk/dapp-connector-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**DataVault AI** is a privacy-first data collaboration platform built on the **Midnight Network** utilizing zero-knowledge smart contracts (Compact). It enables healthcare providers, researchers, and enterprises to collaboratively train and query AI models on confidential data with mathematical privacy guarantees.

[Live DApp](https://data-vault-ai-kappa.vercel.app/) • [Demo Video](https://www.youtube.com/watch?v=hsI-7lmRVJc) • [1AM Preprod Explorer](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne?network=preprod) • [1AM Preview Explorer](https://explorer.1am.xyz/contract/mn_addr_preview1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q53w7vd?network=preview)

</div>

---

## Live Links & Resources

- **Interactive Web DApp:** [https://data-vault-ai-kappa.vercel.app/](https://data-vault-ai-kappa.vercel.app/)
- **Demo Video Walkthrough:** [https://www.youtube.com/watch?v=hsI-7lmRVJc](https://www.youtube.com/watch?v=hsI-7lmRVJc)
- **Preprod Contract Explorer:** [View on 1AM Preprod Explorer](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne?network=preprod)
- **Preview Contract Explorer:** [View on 1AM Preview Explorer](https://explorer.1am.xyz/contract/mn_addr_preview1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q53w7vd?network=preview)
- **Wallet Provider:** [1AM Midnight Explorer & Web Store](https://explorer.1am.xyz)

---

## Video Walkthrough

**Watch the 1-Minute Walkthrough Video on YouTube:**

[![Watch DataVault AI Demo on YouTube](https://img.youtube.com/vi/hsI-7lmRVJc/maxresdefault.jpg)](https://www.youtube.com/watch?v=hsI-7lmRVJc)

*The video demonstrates the complete collaborative flow: connecting Midnight 1AM Wallet via official DApp Connector, switching between Preprod and Preview networks, registering private datasets with zero-knowledge witness commitments, executing confidential AI inference, verifying ZK proofs, and inspecting passing unit tests.*

---

## Supported Midnight Networks & Funded Wallets

DataVault AI provides seamless, first-class support for both **Midnight Preprod** and **Midnight Preview** public networks:

| Network | Network ID | Funded Deployer / User Address | Deployed Contract Address | Status |
|:---|:---:|:---|:---|:---:|
| **Midnight Preprod** | `preprod` | `mn_addr_preprod1s29kdzlg2pk0cvj64c2yh9dga0f7dc03p2ynlquypukpal663z2qgrlrtw` | `mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne` | **VERIFIED & LIVE** |
| **Midnight Preview** | `preview` | `mn_addr_preview1s29kdzlg2pk0cvj64c2yh9dga0f7dc03p2ynlquypukpal663z2qgzpncn` | `mn_addr_preview1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q53w7vd` | **VERIFIED & LIVE** |

Both addresses are funded via official Midnight Preprod & Preview faucets with tNIGHT and tDUST tokens.

---

## Independent Network & Contract Verification

Anyone or any reviewer can independently verify the contract and indexer state on either network:

### 1. Verify Midnight Preprod
```bash
npm run verify:preprod
```

**Live Verified Output (Preprod):**
```text
============================================================
  Midnight Network Verification Tool: DataVault AI
  Active Network ID: preprod
============================================================

[1/3] Checking Midnight Preprod Indexer Connection...
      Endpoint: https://indexer.preprod.midnight.network/api/v4/graphql
      ✓ Preprod Indexer is Live and Synced!
      ✓ Current Block Height: 2,675,838
      ✓ Current Block Hash:   e3a0c6b492e6e2cad7e61aa126de98ddea1a14c351968f7002feee71dc706722
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

### 2. Verify Midnight Preview
```bash
npm run verify:preview
```

**Live Verified Output (Preview):**
```text
============================================================
  Midnight Network Verification Tool: DataVault AI
  Active Network ID: preview
============================================================

[1/3] Checking Midnight Preview Indexer Connection...
      Endpoint: https://indexer.preview.midnight.network/api/v4/graphql
      ✓ Preview Indexer is Live and Synced!
      ✓ Current Block Height: 992,414
      ✓ Current Block Hash:   37e3551bd39091d4f7317dcab59259aaeb455aaf54f975301b9e620824bae8ff
      ✓ Current Epoch:        994541

[2/3] Querying Contract State using indexerPublicDataProvider...
      Funded User Address: mn_addr_preview1s29kdzlg2pk0cvj64c2yh9dga0f7dc03p2ynlquypukpal663z2qgzpncn
      Contract Bech32:     mn_addr_preview1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q53w7vd
      Contract Hex:        77afd5d89319bc417f20865fac30556e30b83b5a36e313faf5640d600a8dd814
      ✓ Indexer queried contract address successfully.
      (Contract is registered on Preview network)

[3/3] Explorer & Verification References:
      - 1AM Explorer: https://explorer.1am.xyz/contract/mn_addr_preview1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q53w7vd?network=preview
      - Funded Deployer / User: mn_addr_preview1s29kdzlg2pk0cvj64c2yh9dga0f7dc03p2ynlquypukpal663z2qgzpncn
      - Deployed Contract Address (Bech32): mn_addr_preview1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q53w7vd
      - Deployed Contract Address (Hex):    77afd5d89319bc417f20865fac30556e30b83b5a36e313faf5640d600a8dd814

============================================================
  VERIFICATION PASSED: Contract is verifiable on Preview
============================================================
```

### 3. Deployer Scripts
Run the verifiable deployers to test or trigger contract deployment on either network:
```bash
npm run deploy:preprod   # Deploy / Verify on Preprod
npm run deploy:preview   # Deploy / Verify on Preview
```

---

## Genuine Midnight SDK Integration Architecture

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
│  │ Dynamic setNetworkId  │                  │ Indexer Public Data   │  │
│  │ ('preprod' | 'preview'│                  │ Provider (GraphQL)    │  │
│  └───────────┬───────────┘                  └───────────┬───────────┘  │
└──────────────┼──────────────────────────────────────────┼──────────────┘
               │                                          │
               ▼                                          ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        On-Chain Infrastructure                         │
│  • Compact Contract: contracts/counter.compact                         │
│  • Explicit Witnesses: getDatasetWitness, getResearcherWitness        │
│  • Preprod Indexer: https://indexer.preprod.midnight.network           │
│  • Preview Indexer: https://indexer.preview.midnight.network           │
│  • Proof Server: http://127.0.0.1:6300 (Docker)                        │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Official DApp Connector API (`@midnight-ntwrk/dapp-connector-api`):**
   - Implements CAIP-372 compliant wallet discovery via `window.midnight`.
   - Supports 1AM Wallet and Midnight Lace extensions (`connectDAppWallet('1am', networkId)`).
   - Retrieves real unshielded, shielded, and tDUST gas addresses.

2. **Dynamic `setNetworkId('preprod' | 'preview')` Configuration:**
   - Multi-network configuration that cleanly switches context between Preprod and Preview.

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
   - All pseudo-random `Math.random()` simulation hashes removed.
   - Circuit executions construct cryptographic commitments using `crypto.subtle.digest("SHA-256", ...)`.
   - Block heights and hashes queried dynamically from Midnight Preprod/Preview GraphQL Indexers (`fetchNetworkTelemetry()`).

---

## 1AM Multi-Asset Account Configuration

DataVault AI is configured with full multi-asset keypairs for both networks:

### Preprod Accounts
| Key Type | Address | Role |
|:---|:---|:---|
| **Midnight Shielded** | `mn_shield-addr_preprod1wl593tyd30m67lw38y896sn5rewjmkel2n5vv5k8wurcm2dkc445vu8ycpvcmg4cwphkudepzlm5hmye7hx55cysf94jx4g25s4j9rqlmvncf` | Private ZK Enclave & Transactions |
| **Midnight Unshielded** | `mn_addr_preprod1s29kdzlg2pk0cvj64c2yh9dga0f7dc03p2ynlquypukpal663z2qgrlrtw` | Funded Verifier & Deployer |
| **Midnight tDUST** | `mn_dust_preprod1wvmfhtagje9zwvc8et2lavzsnzty2h9ljwr24r9544rgpgj4789qwhuhzwd` | Network Gas & Fee Settlement |
| **Cardano L1 Testnet** | `addr_test1qrmrz4j9x0mv4692a0nrewp7zanl0sxxcdfljyzg98td2r9l4xzkqd6g882xmpk20m9rvn75vjclkgxv9agtg5gn5l5sxcwjvn` | L1 Settlement Anchor & Bridge |

### Preview Accounts
| Key Type | Address | Role |
|:---|:---|:---|
| **Midnight Shielded** | `mn_shield-addr_preview1wl593tyd30m67lw38y896sn5rewjmkel2n5vv5k8wurcm2dkc445vu8ycpvcmg4cwphkudepzlm5hmye7hx55cysf94jx4g25s4j9rqlmvncf` | Private ZK Enclave & Transactions |
| **Midnight Unshielded** | `mn_addr_preview1s29kdzlg2pk0cvj64c2yh9dga0f7dc03p2ynlquypukpal663z2qgzpncn` | Funded Verifier & Deployer |
| **Midnight tDUST** | `mn_dust_preview1wvmfhtagje9zwvc8et2lavzsnzty2h9ljwr24r9544rgpgj4789qwhuhzwd` | Network Gas & Fee Settlement |
| **Cardano L1 Testnet** | `addr_test1qrmrz4j9x0mv4692a0nrewp7zanl0sxxcdfljyzg98td2r9l4xzkqd6g882xmpk20m9rvn75vjclkgxv9agtg5gn5l5sxcwjvn` | L1 Settlement Anchor & Bridge |

---

## Quickstart & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Rajdeep-Biswas7/DataVault-AI.git
cd DataVault-AI
npm install
```

### 2. Verify On-Chain State
```bash
npm run verify:preprod    # Verify Preprod contract & indexer
npm run verify:preview    # Verify Preview contract & indexer
```

### 3. Run Unit Tests (11/11 Passing)
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
    ✓ registerDataset: increments datasetCount by 1 (21 ms)
    ✓ requestComputation: increments totalComputations by 1 (6 ms)
    ✓ verifyPolicyCompliance: updates lastVerificationHash (5 ms)
  State Transitions
    ✓ three registerDataset calls accumulate datasetCount = 3 (9 ms)
    ✓ two requestComputation calls accumulate totalComputations = 2 (7 ms)
    ✓ lastVerificationHash reflects the most recent verifyPolicyCompliance call (7 ms)
    ✓ datasetCount and totalComputations are independent counters (10 ms)
  Privacy Guarantees — private inputs never exposed
    ✓ registerDataset: raw record count is NOT stored in ledger (5 ms)
    ✓ requestComputation: researcher identity is NOT stored in ledger (4 ms)
    ✓ verifyPolicyCompliance: disease records NOT stored in ledger (4 ms)
    ✓ initial ledger is clean — no sensitive data pre-loaded (4 ms)

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        1.586 s
```

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.