import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export const ComparisonTable: React.FC = () => {
  const comparisons = [
    {
      capability: "Organizational Data Privacy",
      publicChain: "Completely exposed on public blocks (Catastrophic for HIPAA/GDPR)",
      dataVault: "100% Shielded inside local enclave; only ZK proofs touch Midnight",
    },
    {
      capability: "AI Model Execution",
      publicChain: "Raw dataset must be uploaded unencrypted to external researcher",
      dataVault: "Confidential Clean Room: AI model runs in-situ over private features",
    },
    {
      capability: "Raw Record Leakage",
      publicChain: "Full row-level telemetry and record counts visible to validators",
      dataVault: "Mathematically 0 rows exported; enforce disclose(recordCount > 0)",
    },
    {
      capability: "Differential Privacy",
      publicChain: "None; raw outputs can be reverse-engineered",
      dataVault: "Built-in ε-differential privacy budget bounding mathematical loss",
    },
    {
      capability: "Regulatory Compliance",
      publicChain: "Violates HIPAA, GDPR Article 9, and GLBA data sovereignty",
      dataVault: "Selective viewing key disclosure for certified compliance audits",
    },
  ];

  return (
    <section className="py-16 bg-[#FAFAFA] dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1 block">
            Ledger Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
            Public Blockchains vs. DataVault on Midnight
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-xs">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-200">
                <th className="p-4 font-black">CAPABILITY</th>
                <th className="p-4 font-bold text-zinc-600 dark:text-zinc-400">PUBLIC BLOCKCHAINS</th>
                <th className="p-4 font-black text-black bg-[#FFD400]/30 dark:bg-[#FFD400]/20">
                  DATAVAULT ON MIDNIGHT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {comparisons.map((row, i) => (
                <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4 font-sans font-bold text-zinc-950 dark:text-white">
                    {row.capability}
                  </td>
                  <td className="p-4 text-zinc-700 dark:text-zinc-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>{row.publicChain}</span>
                    </div>
                  </td>
                  <td className="p-4 text-black dark:text-white font-bold bg-[#FFD400]/5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{row.dataVault}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
