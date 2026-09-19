import React, { useState } from "react";
import {
  PlusCircle,
  Database,
  Shield,
  Lock,
  FileText,
  CheckCircle2,
  Sliders,
  EyeOff,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
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
  const [recordCount, setRecordCount] = useState(100000);
  const [policyKey, setPolicyKey] = useState("owner_privkey_vault_alpha_92104");
  const [differentialPrivacyEpsilon, setDifferentialPrivacyEpsilon] = useState(0.5);
  const [showSampleVault, setShowSampleVault] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onRegister(name, recordCount, policyKey);
    setName("");
  };

  const handleLoadPreset = (presetName: string, count: number) => {
    setName(presetName);
    setRecordCount(count);
  };

  return (
    <div className="space-y-8">
      {/* Registration Studio */}
      <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-10 w-48 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 blur-sm" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-400">
                <Database className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Data Owner Confidential Vault
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Register private institutional datasets under cryptographic policy enforcement.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 text-[11px] font-mono mr-1">Quick Presets:</span>
            <button
              type="button"
              onClick={() => handleLoadPreset("Oncology Clinical Patient Cohort", 125000)}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] border border-slate-700 transition"
            >
              + Hospital Cohort
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset("Cross-Border Banking Fraud Ledger", 350000)}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-indigo-300 text-[11px] border border-slate-700 transition"
            >
              + Bank Fraud
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Dataset Name / Description
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rare Disease Genomic Dataset 2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Private Record Count</span>
                <span className="text-[10px] text-rose-400 font-mono flex items-center gap-1">
                  <EyeOff className="w-3 h-3" />
                  Private Witness (Never on-chain)
                </span>
              </label>
              <input
                type="number"
                min="1"
                value={recordCount}
                onChange={(e) => setRecordCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-cyan-500 transition"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Owner Private Authorization Key</span>
                <span className="text-[10px] text-rose-400 font-mono">Kept In Enclave</span>
              </label>
              <input
                type="text"
                value={policyKey}
                onChange={(e) => setPolicyKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-cyan-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Differential Privacy Budget (ε = {differentialPrivacyEpsilon})</span>
                <span className="text-[10px] text-cyan-400 font-mono">Mathematical Shield</span>
              </label>
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.1"
                  value={differentialPrivacyEpsilon}
                  onChange={(e) => setDifferentialPrivacyEpsilon(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
                />
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-2 py-1 rounded border border-cyan-800">
                  {differentialPrivacyEpsilon} ε
                </span>
              </div>
            </div>
          </div>

          {/* Cryptographic Circuit Policy Enforcement Panel */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-300 flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                Compact Circuit Automated Policy Enforcements:
              </span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                L3 Privacy Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">AI Inferences Permitted</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Disease Prediction, Stats
                </span>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">Raw Export Permission</span>
                <span className="text-rose-400 font-semibold flex items-center gap-1 mt-0.5">
                  <Shield className="w-3.5 h-3.5" /> Permanently Blocked
                </span>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-500 block">On-Chain Commitment</span>
                <span className="text-cyan-300 font-mono text-[10.5px] truncate block mt-0.5">
                  disclose(recordCount &gt; 0)
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!walletConnected}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <PlusCircle className="w-4 h-4" />
            {walletConnected ? "Generate ZK Proof & Register Dataset" : "Connect 1AM Wallet to Register"}
          </button>
        </form>
      </div>

      {/* Visual Live Demonstration: What Stays In The Vault vs What Goes On Chain */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-rose-400" />
              Live Vault Inspection: Encrypted PII vs Public Verification
            </h3>
            <p className="text-xs text-slate-400">
              Notice how individual patient rows are completely redacted from anyone outside the hospital vault.
            </p>
          </div>
          <button
            onClick={() => setShowSampleVault(!showSampleVault)}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
          >
            {showSampleVault ? "Collapse" : "Expand"}
          </button>
        </div>

        {showSampleVault && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                <tr>
                  <th className="px-4 py-2.5">Record ID</th>
                  <th className="px-4 py-2.5 text-rose-400">Confidential Name (Vault)</th>
                  <th className="px-4 py-2.5 text-rose-400">Private Diagnosis</th>
                  <th className="px-4 py-2.5">Feature Values (Input)</th>
                  <th className="px-4 py-2.5 text-emerald-400">Midnight On-Chain Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                <tr className="hover:bg-slate-800/30">
                  <td className="px-4 py-2.5 text-slate-500">REC-001</td>
                  <td className="px-4 py-2.5 text-rose-300/60 blur-[3px] select-none">Johnathan Doe</td>
                  <td className="px-4 py-2.5 text-rose-300/60 blur-[3px] select-none">Cardiac Ischemia</td>
                  <td className="px-4 py-2.5 text-slate-400">Age: 58, BMI: 28.4, BP: 140/90</td>
                  <td className="px-4 py-2.5 text-emerald-400 font-semibold">SHIELDED (0 bytes exposed)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="px-4 py-2.5 text-slate-500">REC-002</td>
                  <td className="px-4 py-2.5 text-rose-300/60 blur-[3px] select-none">Priya Sharma</td>
                  <td className="px-4 py-2.5 text-rose-300/60 blur-[3px] select-none">Type II Diabetes</td>
                  <td className="px-4 py-2.5 text-slate-400">Age: 44, Glucose: 165, HbA1c: 7.8</td>
                  <td className="px-4 py-2.5 text-emerald-400 font-semibold">SHIELDED (0 bytes exposed)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="px-4 py-2.5 text-slate-500">REC-003</td>
                  <td className="px-4 py-2.5 text-rose-300/60 blur-[3px] select-none">Alexander Wright</td>
                  <td className="px-4 py-2.5 text-rose-300/60 blur-[3px] select-none">Hypertension Stage 2</td>
                  <td className="px-4 py-2.5 text-slate-400">Age: 62, Chol: 240, Smoking: Yes</td>
                  <td className="px-4 py-2.5 text-emerald-400 font-semibold">SHIELDED (0 bytes exposed)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Active Datasets List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          Active Registered Vault Datasets ({datasets.length})
        </h3>

        <div className="space-y-4">
          {datasets.map((ds) => (
            <div
              key={ds.id}
              className="bg-slate-950/80 border border-slate-800/90 hover:border-cyan-800/50 rounded-2xl p-5 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h4 className="font-bold text-white text-base">{ds.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Owner Enclave: <span className="font-mono text-cyan-400">{ds.owner}</span> | Category: {ds.category}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Protected &amp; Verifiable
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-400 pt-3 border-t border-slate-900">
                <div>
                  <span className="text-slate-500 text-[11px] block">Vault Records:</span>
                  <span className="font-mono text-slate-200 font-medium">
                    {ds.recordCountPrivate.toLocaleString()} (Zero-Knowledge)
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Raw Export Lock:</span>
                  <span className="text-rose-400 font-semibold">ENFORCED (Denied)</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 text-[11px] block">Midnight On-Chain Hash:</span>
                  <span className="font-mono text-cyan-300 truncate block text-[11px] bg-slate-900 px-2 py-1 rounded border border-slate-800">
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
