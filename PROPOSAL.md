# Product Proposal

## What is the product, and who uses it?
DataVault AI is a privacy-preserving confidential data clean room and AI collaboration platform built natively on the Midnight blockchain. It enables institutions possessing high-value, regulated datasets (such as hospitals, clinical cancer centers, commercial banks, and genomic research institutes) to allow external AI researchers, pharmaceutical developers, and data science teams to perform machine learning analysis and run inferences over private datasets without ever exposing or transferring the raw underlying records. 

Data owners use DataVault AI to monetize and collaborate on their proprietary data without risking compliance violations (HIPAA, GDPR, CCPA). AI researchers use DataVault AI to gain access to previously siloed datasets for drug discovery, disease risk prediction, and fraud detection, receiving mathematically verified aggregate intelligence.

## Why Midnight specifically?
On transparent blockchains (such as Ethereum, Solana, or Cardano L1), all transaction arguments, contract state variables, and execution traces are permanently broadcast and visible to every node and block explorer. Attempting to manage sensitive healthcare records or banking transaction histories on a transparent ledger is a legal and regulatory non-starter.

Midnight solves this deadlock through its dual-state architecture and the Compact programming language:
1. **Public vs. Private State Separation:** The public ledger only maintains aggregate metrics (`datasetCount`, `totalComputations`, `lastVerificationHash`), while patient records and secret keys remain as private witnesses inside client-side local memory.
2. **Zero-Knowledge Circuit Verification:** The Compact smart contract executes cryptographic constraint checks (e.g. verifying that a dataset is non-empty and that the researcher holds valid credentials) using zero-knowledge proofs.
3. **Selective Disclosure:** Using Compact's native `disclose()`, only approved aggregate results and verification commitments are revealed, ensuring that zero raw patient rows or secret keys ever touch the network.

No transparent blockchain can provide this level of confidentiality without relying on centralized, trusted third-party cloud servers.

## Data Model
| Data Point | Type | Disclosed To |
|---|---|---|
| `datasetCount` | Public ledger | Everyone (Public on-chain counter) |
| `totalComputations` | Public ledger | Everyone (Public on-chain counter) |
| `lastVerificationHash` | Public ledger | Everyone (Latest commitment hash) |
| `policyCommitmentHash` | Public ledger | Everyone (Cryptographic hash commitment) |
| `zkProofHash` | Public ledger | Verifiers & Node Validators |
| `rawRecordCount` | Private witness | No one (Evaluated only in private memory) |
| `policyKey` | Private witness | No one (Kept in Data Owner enclave) |
| `researcherIdentifier` | Private witness | No one (Evaluated only in private memory) |
| Raw Patient Medical Records | Private (Off-chain) | No one (Remains in local vault) |
| Aggregate Inferences (Risk Cohorts) | Selective disclosure | Authorized AI Researcher |

## Mainnet Feasibility
Yes, DataVault AI is realistic and positioned to reach Midnight Mainnet by Level 6:
- **Contract Maturity:** The core Compact smart contract (`contracts/counter.compact`) has been written, compiled with Compact toolchain v0.34.0, verified with an 11-test Jest suite, and deployed to Midnight Preprod (`mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne`).
- **Proving Efficiency:** Proving circuits utilize arithmetic constraints that evaluate in under 1.0 second on standard hardware via the Midnight proof-server (`midnightnetwork/proof-server:6300`), making in-browser wallet signing with 1AM Wallet practical and responsive.
- **Scalable Architecture:** The on-chain footprint is minimal (requiring only counter increments and 32-byte commitment hashes), keeping transaction fees (DUST/tNIGHT) low and predictable. Multi-tenant consortiums can deploy independent clean room instances for isolated clinical trials or banking networks.
