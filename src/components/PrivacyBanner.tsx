import React from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export const PrivacyBanner: React.FC = () => {
  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 mb-8 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide uppercase font-mono">
          Zero-Knowledge Privacy Model — Live Circuit Boundary
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Public Column */}
        <div className="bg-emerald-50/60 dark:bg-slate-950/70 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs mb-2">
            <Eye className="w-4 h-4" />
            <span>PUBLIC (On-Chain / Visible to Any Node Observer)</span>
          </div>
          <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
            <li>
              <code className="text-emerald-800 dark:text-emerald-300 font-mono font-bold">datasetCount</code> &{" "}
              <code className="text-emerald-800 dark:text-emerald-300 font-mono font-bold">totalComputations</code> (aggregate counters only)
            </li>
            <li>
              Cryptographic commitment hashes (<code className="text-emerald-800 dark:text-emerald-300 font-mono">policyHash</code>,{" "}
              <code className="text-emerald-800 dark:text-emerald-300 font-mono">compHash</code>)
            </li>
            <li>Proof of compliance status via selective disclosure</li>
          </ul>
        </div>

        {/* Private Column */}
        <div className="bg-rose-50/60 dark:bg-slate-950/70 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs mb-2">
            <EyeOff className="w-4 h-4" />
            <span>PRIVATE (Circuit Witnesses / Stays in Vault Enclave)</span>
          </div>
          <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
            <li>
              Raw dataset records & patient identifiers (<code className="text-rose-800 dark:text-rose-300 font-mono font-bold">rawRecordCount</code>)
            </li>
            <li>
              Owner secret authorization keys (<code className="text-rose-800 dark:text-rose-300 font-mono font-bold">policyKey</code>)
            </li>
            <li>
              Internal researcher identity token (<code className="text-rose-800 dark:text-rose-300 font-mono font-bold">researcherId</code>)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
