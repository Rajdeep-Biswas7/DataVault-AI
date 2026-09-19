import React from "react";
import { History, Shield, CheckCircle2, Hash, Terminal } from "lucide-react";
import { ComputationResult } from "../hooks/useDataVault";

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
  return (
    <div className="space-y-6">
      {/* On-Chain Ledger State */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <Terminal className="w-5 h-5 text-cyan-400" />
          Midnight On-Chain Public Ledger State
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 block mb-1">
              datasetCount (Counter)
            </span>
            <span className="text-2xl font-bold font-mono text-cyan-400">
              {datasetCount.toString()}
            </span>
            <p className="text-[11px] text-slate-500 mt-1">
              Public count of registered private datasets
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 block mb-1">
              totalComputations (Counter)
            </span>
            <span className="text-2xl font-bold font-mono text-indigo-400">
              {totalComputations.toString()}
            </span>
            <p className="text-[11px] text-slate-500 mt-1">
              Verified compliant AI computation runs
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 block mb-1">
              lastVerificationHash
            </span>
            <span className="text-xs font-mono text-emerald-400 break-all block leading-tight">
              {lastVerificationHash}
            </span>
            <p className="text-[11px] text-slate-500 mt-1">
              Most recent on-chain commitment
            </p>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          Cryptographic Audit Trail
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Event / Operation</th>
                <th className="px-4 py-3">Dataset</th>
                <th className="px-4 py-3">Policy Status</th>
                <th className="px-4 py-3">ZK Proof Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {computations.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-4 py-3 font-mono text-slate-400">{item.timestamp}</td>
                  <td className="px-4 py-3 font-medium text-white">AI Inference ({item.model})</td>
                  <td className="px-4 py-3 text-slate-300">{item.datasetName}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Compliant
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-cyan-300 text-[11px]">
                    {item.zkProofHash.slice(0, 16)}...{item.zkProofHash.slice(-8)}
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
