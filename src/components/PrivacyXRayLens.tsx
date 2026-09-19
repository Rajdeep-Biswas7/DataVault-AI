import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, Sparkles, Lock, ArrowRight, Eye, EyeOff, Check, Cpu } from "lucide-react";
import { VaultIcon } from "./VaultIcon";

interface PrivacyXRayLensProps {
  theme: "light" | "dark";
}

export const PrivacyXRayLens: React.FC<PrivacyXRayLensProps> = ({ theme }) => {
  const [lensMode, setLensMode] = useState<"shielded" | "raw">("shielded");
  const [isSimulatingProof, setIsSimulatingProof] = useState(false);
  const [proofComplete, setProofComplete] = useState(false);

  const handleSimulate = async () => {
    setIsSimulatingProof(true);
    setProofComplete(false);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSimulatingProof(false);
    setProofComplete(true);
    setLensMode("shielded");
  };

  return (
    <div className="my-10 relative">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 overflow-hidden relative">
        {/* Glow Accent */}
        <div className="absolute top-0 right-1/4 w-72 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 blur-sm" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Interactive Privacy X-Ray Simulator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              See The Zero-Knowledge Difference In Real-Time
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Toggle the lens below to compare what happens to sensitive hospital records under Midnight vs traditional cloud sharing.
            </p>
          </div>

          {/* Interactive Lens Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner w-fit">
            <button
              onClick={() => setLensMode("shielded")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                lensMode === "shielded"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Midnight ZK Shielded
            </button>

            <button
              onClick={() => setLensMode("raw")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                lensMode === "raw"
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
          <div className="lg:col-span-8 rounded-2xl p-5 sm:p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm font-mono transition-all">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800/80 text-xs">
              <span className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                Hospital Patient Record #HOSP-94821 (Clinical Cardiology)
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  lensMode === "shielded"
                    ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800"
                    : "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800 animate-pulse"
                }`}
              >
                {lensMode === "shielded" ? "● ZERO-KNOWLEDGE PROVED" : "⚠️ UNENCRYPTED PII EXPOSED"}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 font-sans">Patient Full Name:</span>
                {lensMode === "shielded" ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    [ZK Witness: Cryptographically Shielded]
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                    Eleanor Rigby (DOB: 1968-04-12)
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 font-sans">Primary Diagnosis:</span>
                {lensMode === "shielded" ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    [Private Memory Witness: Shielded]
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                    Stage 3 Coronary Artery Ischemia
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 font-sans">Insurance & SSN:</span>
                {lensMode === "shielded" ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    [Zero Exposure: Never read by AI model]
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                    BlueCross #992-14-8821 | SSN: 481-90-XXXX
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 font-sans">Authorized AI Output:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                  Aggregate Cohort: High Risk (Score: 0.89) ✓
                </span>
              </div>
            </div>
          </div>

          {/* Right Action & Explanation Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <VaultIcon className="w-4 h-4" />
                Selective Disclosure Guarantee
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                The researcher learns the <strong>aggregate statistical outcome</strong> needed for drug discovery, but learns <strong>zero identifying information</strong> about the individual.
              </p>

              <button
                onClick={handleSimulate}
                disabled={isSimulatingProof}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
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
                <div className="mt-2.5 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
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
