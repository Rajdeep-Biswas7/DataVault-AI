import React from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export const PrivacyBanner: React.FC = () => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400" />
        <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
          Zero-Knowledge Privacy Model — Live Circuit Guarantees
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Public Column */}
        <div className="bg-slate-950/70 border border-emerald-900/40 rounded-lg p-3">
          <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs mb-1.5">
            <Eye className="w-4 h-4" />
            <span>PUBLIC (On-Chain / Visible to Anyone)</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
            <li>
              <code className="text-emerald-300 font-mono">datasetCount</code> &{" "}
              <code className="text-emerald-300 font-mono">totalComputations</code> (aggregate counters)
            </li>
            <li>Cryptographic commitment hashes (<code className="text-emerald-300 font-mono">policyHash</code>, <code className="text-emerald-300 font-mono">compHash</code>)</li>
            <li>Proof of compliance status via selective disclosure</li>
          </ul>
        </div>

        {/* Private Column */}
        <div className="bg-slate-950/70 border border-rose-900/40 rounded-lg p-3">
          <div className="flex items-center gap-2 text-rose-400 font-medium text-xs mb-1.5">
            <EyeOff className="w-4 h-4" />
            <span>PRIVATE (Circuit Witnesses / Never Leaves Vault)</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
            <li>Raw dataset records & patient identifiers (<code className="text-rose-300 font-mono">rawRecordCount</code>)</li>
            <li>Owner secret authorization keys (<code className="text-rose-300 font-mono">policyKey</code>)</li>
            <li>Internal researcher identity token (<code className="text-rose-300 font-mono">researcherId</code>)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
