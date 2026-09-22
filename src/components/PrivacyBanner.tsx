import React from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export const PrivacyBanner: React.FC = () => {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 mb-8 shadow-xs transition-colors">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <ShieldCheck className="w-5 h-5 text-black dark:text-[#FFD400]" />
        <h3 className="text-xs sm:text-sm font-black text-zinc-950 dark:text-white tracking-wider uppercase font-mono">
          Zero-Knowledge Privacy Model — Live Circuit Boundary
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Public Column */}
        <div className="bg-emerald-50/70 dark:bg-zinc-950 border border-emerald-200 dark:border-emerald-900/60 rounded-xl p-4">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-extrabold text-xs mb-2">
            <Eye className="w-4 h-4" />
            <span>PUBLIC (On-Chain / Visible to Any Node Observer)</span>
          </div>
          <ul className="text-xs text-zinc-800 dark:text-zinc-200 space-y-1.5 list-disc list-inside font-medium">
            <li>
              <code className="text-emerald-900 dark:text-emerald-300 font-mono font-bold bg-emerald-100/80 dark:bg-emerald-950 px-1 rounded">datasetCount</code> &amp;{" "}
              <code className="text-emerald-900 dark:text-emerald-300 font-mono font-bold bg-emerald-100/80 dark:bg-emerald-950 px-1 rounded">totalComputations</code> (aggregate counters only)
            </li>
            <li>
              Cryptographic commitment hashes (
              <code className="text-emerald-900 dark:text-emerald-300 font-mono font-bold bg-emerald-100/80 dark:bg-emerald-950 px-1 rounded">policyHash</code>,{" "}
              <code className="text-emerald-900 dark:text-emerald-300 font-mono font-bold bg-emerald-100/80 dark:bg-emerald-950 px-1 rounded">compHash</code>)
            </li>
            <li>Proof of compliance status via selective zero-knowledge disclosure</li>
          </ul>
        </div>

        {/* Private Column */}
        <div className="bg-rose-50/70 dark:bg-zinc-950 border border-rose-200 dark:border-rose-900/60 rounded-xl p-4">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-400 font-extrabold text-xs mb-2">
            <EyeOff className="w-4 h-4" />
            <span>PRIVATE (Circuit Witnesses / Stays in Vault Enclave)</span>
          </div>
          <ul className="text-xs text-zinc-800 dark:text-zinc-200 space-y-1.5 list-disc list-inside font-medium">
            <li>
              Raw dataset records &amp; patient identifiers (
              <code className="text-rose-900 dark:text-rose-300 font-mono font-bold bg-rose-100/80 dark:bg-rose-950 px-1 rounded">rawRecordCount</code>)
            </li>
            <li>
              Owner secret authorization keys (
              <code className="text-rose-900 dark:text-rose-300 font-mono font-bold bg-rose-100/80 dark:bg-rose-950 px-1 rounded">policyKey</code>)
            </li>
            <li>
              Internal researcher identity token (
              <code className="text-rose-900 dark:text-rose-300 font-mono font-bold bg-rose-100/80 dark:bg-rose-950 px-1 rounded">researcherId</code>)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
