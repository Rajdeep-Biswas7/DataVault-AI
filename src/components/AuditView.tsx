import React, { useState } from "react";
import { History, Shield, CheckCircle2, Hash, Terminal, ExternalLink, Copy, Check } from "lucide-react";
import { ComputationResult, PREPROD_CONTRACT_ADDRESS } from "../hooks/useDataVault";

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
      <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="absolute top-0 left-10 w-48 h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 blur-sm" />

        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                <Terminal className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Midnight Preprod Public Ledger State
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Live state variables stored directly on Midnight's public verifiable ledger.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/60">
            Node Synchronized
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-5 hover:border-cyan-500/40 transition">
            <span className="text-xs text-slate-400 font-mono block mb-1">
              ledger.datasetCount (Counter)
            </span>
            <span className="text-3xl font-extrabold font-mono text-cyan-400">
              {datasetCount.toString()}
            </span>
            <p className="text-[11px] text-slate-500 mt-2">
              Number of registered datasets. Does not leak dataset size or rows.
            </p>
          </div>

          <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-5 hover:border-indigo-500/40 transition">
            <span className="text-xs text-slate-400 font-mono block mb-1">
              ledger.totalComputations (Counter)
            </span>
            <span className="text-3xl font-extrabold font-mono text-indigo-400">
              {totalComputations.toString()}
            </span>
            <p className="text-[11px] text-slate-500 mt-2">
              Verified compliant AI computation runs recorded on-chain.
            </p>
          </div>

          <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-5 hover:border-emerald-500/40 transition">
            <span className="text-xs text-slate-400 font-mono block mb-1">
              ledger.lastVerificationHash
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 break-all block leading-relaxed font-semibold">
                {lastVerificationHash}
              </span>
              <button
                onClick={() => handleCopy(lastVerificationHash)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition shrink-0"
              >
                {copiedHash === lastVerificationHash ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Cryptographic hash commitment of the latest verified computation event.
            </p>
          </div>
        </div>
      </div>

      {/* Cryptographic Proof Audit Log */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-cyan-400" />
          Zero-Knowledge Execution History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Circuit Invoked</th>
                <th className="px-4 py-3">Target Dataset</th>
                <th className="px-4 py-3">Policy Guarantee</th>
                <th className="px-4 py-3">ZK Commitment Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
              {computations.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-4 py-3 text-slate-400">{item.timestamp}</td>
                  <td className="px-4 py-3 font-semibold text-cyan-300">
                    requestComputation()
                  </td>
                  <td className="px-4 py-3 text-slate-300 font-sans font-medium">
                    {item.datasetName}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      SATISFIED (0 rows leaked)
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-cyan-400">
                        {item.zkProofHash.slice(0, 16)}...{item.zkProofHash.slice(-8)}
                      </span>
                      <button
                        onClick={() => handleCopy(item.zkProofHash)}
                        className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-cyan-300 transition"
                      >
                        {copiedHash === item.zkProofHash ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
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
