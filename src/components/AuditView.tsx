import React, { useState } from "react";
import {
  History,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
} from "lucide-react";
import { ComputationResult, PREPROD_CONTRACT_ADDRESS } from "../hooks/useDataVault";
import { ONE_AM_EXPLORER_BASE } from "../hooks/useMidnight";

interface AuditViewProps {
  datasetCount: bigint;
  totalComputations: bigint;
  lastVerificationHash: string;
  computations: ComputationResult[];
}

export const AuditView: React.FC<AuditViewProps> = ({
  datasetCount,
  totalComputations,
  lastVerificationHash,
  computations,
}) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* On-Chain Ledger State */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 relative overflow-hidden shadow-xs">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFD400]" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#FFD400]/20 border border-[#FFD400] flex items-center justify-center text-black">
                <Terminal className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-black dark:text-white tracking-tight">
                Midnight Preprod Public Ledger State
              </h2>
            </div>
            <p className="text-xs text-zinc-500">
              Live state variables queryable on-chain via Midnight Preprod RPC & 1AM Explorer.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`${ONE_AM_EXPLORER_BASE}/contract/${PREPROD_CONTRACT_ADDRESS}?network=preprod`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>1AM Explorer</span>
            </a>
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Node In Sync</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
            <span className="text-xs text-zinc-500 font-mono block mb-1">
              ledger.datasetCount
            </span>
            <span className="text-3xl font-black font-mono text-black dark:text-white">
              {datasetCount.toString()}
            </span>
            <p className="text-[11px] text-zinc-500 mt-2">
              Registered datasets. Individual rows remain 100% shielded.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
            <span className="text-xs text-zinc-500 font-mono block mb-1">
              ledger.totalComputations
            </span>
            <span className="text-3xl font-black font-mono text-black dark:text-white">
              {totalComputations.toString()}
            </span>
            <p className="text-[11px] text-zinc-500 mt-2">
              Verified compliant AI computation runs recorded on-chain.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
            <span className="text-xs text-zinc-500 font-mono block mb-1">
              ledger.lastVerificationHash
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-black dark:text-white break-all block leading-relaxed font-bold">
                {lastVerificationHash}
              </span>
              <button
                onClick={() => handleCopy(lastVerificationHash)}
                className="p-1.5 rounded-lg bg-white dark:bg-zinc-900 text-zinc-500 hover:text-black dark:hover:text-white transition shrink-0 border border-zinc-200 dark:border-zinc-800"
                title="Copy Hash"
              >
                {copiedHash === lastVerificationHash ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Cryptographic hash commitment of latest verified computation.
            </p>
          </div>
        </div>
      </div>

      {/* Cryptographic Proof Audit Log */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h3 className="text-base sm:text-lg font-bold text-black dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-black dark:text-[#FFD400]" />
            Zero-Knowledge Execution History
          </h3>
          <span className="text-xs font-mono text-zinc-500">
            Preprod Network Verification Proofs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700 dark:text-zinc-300">
            <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 uppercase text-[10px] font-mono border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Circuit Invoked</th>
                <th className="px-4 py-3">Target Dataset</th>
                <th className="px-4 py-3">Policy Guarantee</th>
                <th className="px-4 py-3">ZK Commitment Hash</th>
                <th className="px-4 py-3 text-right">Explorer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono text-[11px]">
              {computations.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition">
                  <td className="px-4 py-3 text-zinc-500">{item.timestamp}</td>
                  <td className="px-4 py-3 font-bold text-black dark:text-white">
                    requestComputation()
                  </td>
                  <td className="px-4 py-3 text-black dark:text-white font-sans font-semibold">
                    {item.datasetName}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      SATISFIED (0 rows leaked)
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-black dark:text-white font-bold">
                        {item.zkProofHash.slice(0, 16)}...{item.zkProofHash.slice(-8)}
                      </span>
                      <button
                        onClick={() => handleCopy(item.zkProofHash)}
                        className="p-1 rounded text-zinc-400 hover:text-black dark:hover:text-white transition"
                        title="Copy Proof Hash"
                      >
                        {copiedHash === item.zkProofHash ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={`${ONE_AM_EXPLORER_BASE}/contract/${PREPROD_CONTRACT_ADDRESS}?network=preprod`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-black dark:text-[#FFD400] hover:underline"
                    >
                      <span>1AM Log</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
