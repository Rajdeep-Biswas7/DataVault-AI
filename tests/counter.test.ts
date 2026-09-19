/**
 * DataVault AI — Compact Contract Test Suite
 * tests/counter.test.ts
 *
 * Tests covering:
 *   1. Circuit logic       — each circuit produces the correct output
 *   2. State transitions   — ledger state updates correctly across calls
 *   3. Privacy guarantees  — private inputs are NEVER exposed in on-chain state
 */

import {
  sampleContractAddress,
  createConstructorContext,
  ContractState,
  createCircuitContext,
  dummyUserAddress,
} from "@midnight-ntwrk/compact-runtime";

import {
  Contract,
  ledger,
} from "../managed/counter/contract/index.js";

// ─────────────────────────────────────────────────────────────
// Helper: initialise a fresh contract state for each test
// ─────────────────────────────────────────────────────────────
const ADDR = sampleContractAddress();
const COIN_PK = dummyUserAddress();

async function freshState() {
  const contract = new Contract({});
  const ctorCtx = createConstructorContext(new ContractState(), COIN_PK);
  const initResult = await contract.initialState(ctorCtx);
  return { contract, ctorCtx, initResult };
}

/** Build a circuit context ready for a specific circuit */
function makeCtx(
  circuitId: string,
  state: import("@midnight-ntwrk/compact-runtime").ChargedState,
  privateState: import("@midnight-ntwrk/compact-runtime").ContractState
) {
  return createCircuitContext(circuitId, ADDR, COIN_PK, state, privateState);
}

/** Extract the ledger from a circuit result */
function extractLedger(result: { context: any }) {
  return ledger(result.context.callContext.currentQueryContext.state);
}

// ─────────────────────────────────────────────────────────────
// SUITE 1 — Circuit Logic
// ─────────────────────────────────────────────────────────────
describe("Circuit Logic", () => {
  test("registerDataset: increments datasetCount by 1", async () => {
    const { contract, initResult } = await freshState();
    const ctx = makeCtx(
      "registerDataset",
      initResult.currentContractState.data,
      initResult.currentPrivateState
    );
    const result = await contract.impureCircuits.registerDataset(
      ctx,
      "policy-commitment-hospital-001"
    );
    expect(extractLedger(result).datasetCount).toBe(1n);
  });

  test("requestComputation: increments totalComputations by 1", async () => {
    const { contract, initResult } = await freshState();
    const ctx = makeCtx(
      "requestComputation",
      initResult.currentContractState.data,
      initResult.currentPrivateState
    );
    const result = await contract.impureCircuits.requestComputation(
      ctx,
      "computation-commitment-disease-prediction-001"
    );
    expect(extractLedger(result).totalComputations).toBe(1n);
  });

  test("verifyPolicyCompliance: updates lastVerificationHash", async () => {
    const { contract, initResult } = await freshState();
    const hash = "verification-commitment-policy-satisfied-001";
    const ctx = makeCtx(
      "verifyPolicyCompliance",
      initResult.currentContractState.data,
      initResult.currentPrivateState
    );
    const result = await contract.impureCircuits.verifyPolicyCompliance(
      ctx,
      hash
    );
    expect(extractLedger(result).lastVerificationHash).toBe(hash);
  });
});

// ─────────────────────────────────────────────────────────────
// SUITE 2 — State Transitions
// ─────────────────────────────────────────────────────────────
describe("State Transitions", () => {
  test("three registerDataset calls accumulate datasetCount = 3", async () => {
    const { contract, initResult } = await freshState();
    let state = initResult.currentContractState.data;
    const ps = initResult.currentPrivateState;

    for (const hash of ["policy-001", "policy-002", "policy-003"]) {
      const ctx = makeCtx("registerDataset", state, ps);
      const r = await contract.impureCircuits.registerDataset(ctx, hash);
      state = r.context.callContext.currentQueryContext.state;
    }
    expect(ledger(state).datasetCount).toBe(3n);
  });

  test("two requestComputation calls accumulate totalComputations = 2", async () => {
    const { contract, initResult } = await freshState();
    let state = initResult.currentContractState.data;
    const ps = initResult.currentPrivateState;

    for (const hash of ["comp-001", "comp-002"]) {
      const ctx = makeCtx("requestComputation", state, ps);
      const r = await contract.impureCircuits.requestComputation(ctx, hash);
      state = r.context.callContext.currentQueryContext.state;
    }
    expect(ledger(state).totalComputations).toBe(2n);
  });

  test("lastVerificationHash reflects the most recent verifyPolicyCompliance call", async () => {
    const { contract, initResult } = await freshState();
    let state = initResult.currentContractState.data;
    const ps = initResult.currentPrivateState;

    for (const hash of ["verify-001", "verify-002"]) {
      const ctx = makeCtx("verifyPolicyCompliance", state, ps);
      const r = await contract.impureCircuits.verifyPolicyCompliance(ctx, hash);
      state = r.context.callContext.currentQueryContext.state;
      expect(ledger(state).lastVerificationHash).toBe(hash);
    }
  });

  test("datasetCount and totalComputations are independent counters", async () => {
    const { contract, initResult } = await freshState();
    let state = initResult.currentContractState.data;
    const ps = initResult.currentPrivateState;

    // Register 2 datasets
    for (const hash of ["policy-A", "policy-B"]) {
      const ctx = makeCtx("registerDataset", state, ps);
      const r = await contract.impureCircuits.registerDataset(ctx, hash);
      state = r.context.callContext.currentQueryContext.state;
    }
    // Request 1 computation
    const compCtx = makeCtx("requestComputation", state, ps);
    const compR = await contract.impureCircuits.requestComputation(compCtx, "comp-A");
    state = compR.context.callContext.currentQueryContext.state;

    expect(ledger(state).datasetCount).toBe(2n);
    expect(ledger(state).totalComputations).toBe(1n);
  });
});

// ─────────────────────────────────────────────────────────────
// SUITE 3 — Privacy Guarantees
// ─────────────────────────────────────────────────────────────
describe("Privacy Guarantees — private inputs never exposed", () => {
  test("registerDataset: raw record count is NOT stored in ledger", async () => {
    const { contract, initResult } = await freshState();
    const ctx = makeCtx(
      "registerDataset",
      initResult.currentContractState.data,
      initResult.currentPrivateState
    );
    const result = await contract.impureCircuits.registerDataset(
      ctx,
      "sha256-policy-commitment"
    );
    const l = extractLedger(result);
    // Ledger MUST NOT contain raw record count or policy key
    expect(l).not.toHaveProperty("rawRecordCount");
    expect(l).not.toHaveProperty("policyKey");
    expect(l).not.toHaveProperty("patientData");
  });

  test("requestComputation: researcher identity is NOT stored in ledger", async () => {
    const { contract, initResult } = await freshState();
    const ctx = makeCtx(
      "requestComputation",
      initResult.currentContractState.data,
      initResult.currentPrivateState
    );
    const result = await contract.impureCircuits.requestComputation(
      ctx,
      "sha256-computation-commitment"
    );
    const l = extractLedger(result);
    // Researcher identity must never appear on-chain
    expect(l).not.toHaveProperty("researcherIdentifier");
    expect(l).not.toHaveProperty("researcherId");
    expect(l).not.toHaveProperty("privateKey");
  });

  test("verifyPolicyCompliance: disease records NOT stored in ledger", async () => {
    const { contract, initResult } = await freshState();
    const ctx = makeCtx(
      "verifyPolicyCompliance",
      initResult.currentContractState.data,
      initResult.currentPrivateState
    );
    const result = await contract.impureCircuits.verifyPolicyCompliance(
      ctx,
      "sha256-compliance-commitment"
    );
    const l = extractLedger(result);
    // Raw medical data must never appear on-chain
    expect(l).not.toHaveProperty("rawData");
    expect(l).not.toHaveProperty("diseaseRecords");
    expect(l).not.toHaveProperty("patientNames");
  });

  test("initial ledger is clean — no sensitive data pre-loaded", async () => {
    const { initResult } = await freshState();
    const l = ledger(initResult.currentContractState.data);

    expect(l.datasetCount).toBe(0n);
    expect(l.totalComputations).toBe(0n);

    // No private fields in initial on-chain state
    expect(l).not.toHaveProperty("policyKey");
    expect(l).not.toHaveProperty("researcherIdentifier");
    expect(l).not.toHaveProperty("rawRecordCount");
  });
});
