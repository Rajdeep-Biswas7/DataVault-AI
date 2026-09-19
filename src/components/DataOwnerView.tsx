import React, { useState } from "react";
import { PlusCircle, Database, Shield, Lock, FileText, CheckCircle2 } from "lucide-react";
import { Dataset } from "../hooks/useDataVault";

interface DataOwnerViewProps {
  datasets: Dataset[];
  onRegister: (name: string, recordCount: number, policyKey: string) => Promise<void>;
  walletConnected: boolean;
}

export const DataOwnerView: React.FC<DataOwnerViewProps> = ({
  datasets,
  onRegister,
  walletConnected,
}) => {
  const [name, setName] = useState("");
  const [recordCount, setRecordCount] = useState(50000);
  const [policyKey, setPolicyKey] = useState("sec_key_owner_alpha_92104");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onRegister(name, recordCount, policyKey);
    setName("");
  };

  return (
    <div className="space-y-6">
      {/* Registration Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              Register Private Dataset (Data Owner Vault)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Circuit: <code className="text-cyan-300 font-mono">registerDataset(policyHash)</code> — records non-empty condition without publishing records.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Dataset Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Oncology Patient Cohort 2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Private Record Count</span>
                <span className="text-[10px] text-rose-400 font-normal">Private Witness</span>
              </label>
              <input
                type="number"
                min="1"
                value={recordCount}
                onChange={(e) => setRecordCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span>Owner Secret Authorization Key</span>
              <span className="text-[10px] text-rose-400 font-normal">Private Witness</span>
            </label>
            <input
              type="text"
              value={policyKey}
              onChange={(e) => setPolicyKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          {/* Privacy Constraints Summary Box */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              Selective Disclosure Circuit Enforcement:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                Prediction Allowed: YES
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" />
                Aggregate Output: YES
              </div>
              <div className="flex items-center gap-1 text-rose-400">
                <Shield className="w-3 h-3" />
                Raw Data Export: NEVER
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!walletConnected}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs sm:text-sm shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <PlusCircle className="w-4 h-4" />
            {walletConnected ? "Generate Proof & Register Dataset" : "Connect Wallet to Register"}
          </button>
        </form>
      </div>

      {/* Dataset Vault List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          Active Private Datasets in Vault ({datasets.length})
        </h3>

        <div className="space-y-3">
          {datasets.map((ds) => (
            <div
              key={ds.id}
              className="bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-semibold text-white text-sm">{ds.name}</h4>
                  <p className="text-xs text-slate-400">
                    Owner: <span className="font-mono text-cyan-400">{ds.owner}</span> | Category: {ds.category}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950 border border-emerald-800 text-emerald-300 w-fit">
                  Protected & Verified
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                <div>
                  <span className="text-slate-500 block">Private Records:</span>
                  <span className="font-mono text-slate-200">
                    {ds.recordCountPrivate.toLocaleString()} (Hidden)
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Raw Export:</span>
                  <span className="text-rose-400 font-semibold">Blocked by Policy</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block">On-Chain Policy Hash:</span>
                  <span className="font-mono text-cyan-300 truncate block text-[10px]">
                    {ds.policyCommitmentHash}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
