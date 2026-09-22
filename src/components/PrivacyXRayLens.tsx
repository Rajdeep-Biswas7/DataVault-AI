import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, Sparkles, Lock, Cpu, Check } from "lucide-react";
import { VaultIcon } from "./VaultIcon";

interface PrivacyXRayLensProps {
  theme: "light" | "dark";
}

export const PrivacyXRayLens: React.FC<PrivacyXRayLensProps> = () => {
  const [lensMode, setLensMode] = useState<"shielded" | "raw">("shielded");
  const [isSimulatingProof, setIsSimulatingProof] = useState(false);
  const [proofComplete, setProofComplete] = useState(false);

  const handleSimulate = async () => {
    setIsSimulatingProof(true);
    setProofComplete(false);
    await new Promise((r) => setTimeout(r, 900));
    setIsSimulatingProof(false);
    setProofComplete(true);
    setLensMode("shielded");
  };

  return (
    <div className="my-10 relative">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 overflow-hidden relative shadow-sm transition-colors">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFD400]" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-mono font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-black dark:text-[#FFD400]" />
              <span>Interactive Privacy X-Ray Simulator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 dark:text-white">
              See The Zero-Knowledge Difference In Real-Time
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 mt-1 max-w-xl font-medium">
              Toggle the lens below to compare what happens to sensitive hospital records under Midnight vs traditional cloud sharing.
            </p>
          </div>

          {/* Interactive Lens Switcher */}
          <div className="flex bg-zinc-100 dark:bg-zinc-950 p-1.5 rounded-xl border border-zinc-300 dark:border-zinc-800 shadow-inner w-fit">
            <button
              onClick={() => setLensMode("shielded")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lensMode === "shielded"
                  ? "bg-[#FFD400] text-black shadow-xs border border-black/15 font-black"
                  : "text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Midnight ZK Shielded
            </button>

            <button
              onClick={() => setLensMode("raw")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lensMode === "raw"
                  ? "bg-rose-600 text-white shadow-xs font-black"
                  : "text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Unprotected Raw Data
            </button>
          </div>
        </div>

        {/* Live Interactive Record Inspection Card */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Inspection Terminal */}
          <div className="lg:col-span-8 rounded-xl p-5 sm:p-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xs font-mono transition-all">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800 text-xs">
              <span className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
                <Cpu className="w-4 h-4 text-black dark:text-[#FFD400]" />
                Hospital Patient Record #HOSP-94821 (Clinical Cardiology)
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  lensMode === "shielded"
                    ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                    : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 animate-pulse"
                }`}
              >
                {lensMode === "shielded" ? "● ZERO-KNOWLEDGE PROVED" : "⚠️ UNENCRYPTED PII EXPOSED"}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-600 dark:text-zinc-400 font-sans font-semibold">Patient Full Name:</span>
                {lensMode === "shielded" ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    [ZK Witness: Cryptographically Shielded]
                  </span>
                ) : (
                  <span className="text-rose-700 dark:text-rose-300 font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                    Eleanor Rigby (DOB: 1968-04-12)
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-600 dark:text-zinc-400 font-sans font-semibold">Primary Diagnosis:</span>
                {lensMode === "shielded" ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    [Private Memory Witness: Shielded]
                  </span>
                ) : (
                  <span className="text-rose-700 dark:text-rose-300 font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                    Stage 3 Coronary Artery Ischemia
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-600 dark:text-zinc-400 font-sans font-semibold">Insurance &amp; SSN:</span>
                {lensMode === "shielded" ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    [Zero Exposure: Never read by AI model]
                  </span>
                ) : (
                  <span className="text-rose-700 dark:text-rose-300 font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                    BlueCross #992-14-8821 | SSN: 481-90-XXXX
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-zinc-600 dark:text-zinc-400 font-sans font-semibold">Authorized AI Output:</span>
                <span className="text-zinc-950 dark:text-[#FFD400] font-black">
                  Aggregate Cohort: High Risk (Score: 0.89) ✓
                </span>
              </div>
            </div>
          </div>

          {/* Right Action & Explanation Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <h4 className="text-sm font-bold text-zinc-950 dark:text-white mb-2 flex items-center gap-1.5">
                <VaultIcon className="w-4 h-4 text-black dark:text-[#FFD400]" />
                Selective Disclosure Guarantee
              </h4>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 font-medium">
                The researcher learns the <strong className="text-black dark:text-white">aggregate statistical outcome</strong> needed for drug discovery, but learns <strong className="text-black dark:text-white">zero identifying information</strong> about the individual patient.
              </p>

              <button
                onClick={handleSimulate}
                disabled={isSimulatingProof}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#FFD400] hover:bg-[#E5BE00] text-black font-bold text-xs border border-black/15 shadow-xs transition cursor-pointer disabled:opacity-50"
              >
                {isSimulatingProof ? (
                  <span>Generating ZK Proof...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run Interactive ZK Test</span>
                  </>
                )}
              </button>

              {proofComplete && (
                <div className="mt-2.5 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 font-bold">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Verified: Compact circuit satisfied with 0 data leaks.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
