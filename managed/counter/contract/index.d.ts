import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  registerDataset(context: __compactRuntime.CircuitContext<PS>,
                  policyHash_0: string): Promise<__compactRuntime.CircuitResults<PS, []>>;
  requestComputation(context: __compactRuntime.CircuitContext<PS>,
                     computationHash_0: string): Promise<__compactRuntime.CircuitResults<PS, []>>;
  verifyPolicyCompliance(context: __compactRuntime.CircuitContext<PS>,
                         verificationHash_0: string): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type ProvableCircuits<PS> = {
  registerDataset(context: __compactRuntime.CircuitContext<PS>,
                  policyHash_0: string): Promise<__compactRuntime.CircuitResults<PS, []>>;
  requestComputation(context: __compactRuntime.CircuitContext<PS>,
                     computationHash_0: string): Promise<__compactRuntime.CircuitResults<PS, []>>;
  verifyPolicyCompliance(context: __compactRuntime.CircuitContext<PS>,
                         verificationHash_0: string): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  registerDataset(context: __compactRuntime.CircuitContext<PS>,
                  policyHash_0: string): Promise<__compactRuntime.CircuitResults<PS, []>>;
  requestComputation(context: __compactRuntime.CircuitContext<PS>,
                     computationHash_0: string): Promise<__compactRuntime.CircuitResults<PS, []>>;
  verifyPolicyCompliance(context: __compactRuntime.CircuitContext<PS>,
                         verificationHash_0: string): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type Ledger = {
  readonly datasetCount: bigint;
  readonly totalComputations: bigint;
  readonly lastVerificationHash: string;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): Promise<__compactRuntime.ConstructorResult<PS>>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
export declare const expectedVk: Record<string, string>;
