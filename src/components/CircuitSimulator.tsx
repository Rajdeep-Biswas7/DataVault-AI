import React, { useState } from "react";
import { Lock, Cpu, ShieldCheck, RefreshCw, CheckCircle2 } from "lucide-react";

export const CircuitSimulator: React.FC = () => {
  const [activeCircuit, setActiveCircuit] = useState<"register" | "compute" | "compliance">("compute");
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"ready" | "proving" | "verified">("ready");
  const [blindingNonce] = useState("r_seed_0x9f4a21cb8");

  const handleSimulate = async () => {
    setIsSimulating(true);
    setStatus("proving");
    setProgress(15);

    await new Promise((r) => setTimeout(r, 400));
    setProgress(55);

    await new Promise((r) => setTimeout(r, 500));
    setProgress(85);

    await new Promise((r) => setTimeout(r, 400));
    setProgress(100);
    setStatus("verified");
    setIsSimulating(false);
  };

  return (
    <section className="py-16 bg-[#FAFAFA] dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-xl mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
            Circuit Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">
            Test Midnight Compact Cryptography Live
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            See how private witnesses, blinding factors, and policy rules compute in zero-knowledge without revealing patient records or hospital keys to the public.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm overflow-hidden relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FFD400]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                  Midnight Compact ZK Engine
                </span>
              </div>
              <h3 className="text-base font-black text-black dark:text-white tracking-tight mt-0.5">
                Zero-Knowledge Witness Synthesis & Verification
              </h3>
            </div>

            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="relative inline-flex items-center justify-center rounded-lg font-bold border border-black/15 shadow-sm active:shadow-inner px-3.5 py-2 gap-1.5 bg-black text-white hover:bg-zinc-800 font-mono text-xs cursor-pointer transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
              <span>{isSimulating ? "Synthesizing..." : "Simulate Circuit"}</span>
            </button>
          </div>

          {/* Circuit Selection Tabs */}
          <div className="flex items-center gap-2 pt-4 pb-1">
            <button
              onClick={() => {
                setActiveCircuit("compute");
                setStatus("ready");
                setProgress(0);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                activeCircuit === "compute"
                  ? "bg-black text-[#FFD400]"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
              }`}
            >
              requestComputation() Circuit
            </button>
            <button
              onClick={() => {
                setActiveCircuit("register");
                setStatus("ready");
                setProgress(0);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                activeCircuit === "register"
                  ? "bg-black text-[#FFD400]"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
              }`}
            >
              registerDataset() Circuit
            </button>
            <button
              onClick={() => {
                setActiveCircuit("compliance");
                setStatus("ready");
                setProgress(0);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                activeCircuit === "compliance"
                  ? "bg-black text-[#FFD400]"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
              }`}
            >
              verifyCompliance() Circuit
            </button>
          </div>

          {/* 3-Column Interactive Flow (Cyphra style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 relative">
            {/* 1. Private Witness */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-400 uppercase">
                    1. Private Witness
                  </span>
                  <Lock className="w-3.5 h-3.5 text-zinc-400" />
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-500">Enclave Key:</span>
                    <span className="text-black dark:text-white font-semibold">●●●●●●●● (ZK)</span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-500">Record Count:</span>
                    <span className="text-black dark:text-white font-semibold">100,000 (Private)</span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-500">Blinding Seed:</span>
                    <span className="text-zinc-700 dark:text-zinc-300 truncate max-w-[120px]">
                      {blindingNonce}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-[10px] font-mono text-zinc-500">
                *Never leaves local enclave memory (Zero-Exposure)
              </div>
            </div>

            {/* 2. Compact Prover */}
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border-2 border-black dark:border-[#FFD400] flex flex-col justify-between relative shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-black dark:text-white uppercase flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-black dark:text-[#FFD400]" />
                    2. Compact Prover
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#FFD400] text-black text-[10px] font-mono font-bold">
                    BLS12-381
                  </span>
                </div>
                <div className="my-4 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-black dark:text-white" />
                  </div>
                  <p className="mt-2 text-xs font-mono font-bold text-black dark:text-white capitalize">
                    {status === "ready"
                      ? "Ready for Witness"
                      : status === "proving"
                      ? "Generating ZK Proof..."
                      : "Proof Synthesized 🟢"}
                  </p>
                </div>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#FFD400] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* 3. Public Settlement */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-400 uppercase">
                    3. Public Settlement
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-black dark:text-white" />
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">Verification Commitment:</span>
                    <span className="text-black dark:text-white font-semibold break-all text-[11px]">
                      0x816864c...05c9
                    </span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">Dual-State Ledger:</span>
                    <span className="text-black dark:text-white font-semibold text-[11px]">
                      totalComputations += 1
                    </span>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-500">Policy Check:</span>
                    <span className="text-emerald-600 font-bold">100% Satisfied</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-[10px] font-mono text-zinc-500">
                *Only cryptographic commitments published to Midnight
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between text-xs text-zinc-500 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Prover Time: ~1.28s (Off-chain WASM prover)
            </span>
            <span>Security: Zero Knowledge + Perfect Soundness</span>
          </div>
        </div>
      </div>
    </section>
  );
};
