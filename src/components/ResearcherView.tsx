import React, { useState } from "react";
import { BrainCircuit, Play, CheckCircle, ShieldCheck, Sparkles, FileSpreadsheet } from "lucide-react";
import { Dataset, ComputationResult } from "../hooks/useDataVault";

interface ResearcherViewProps {
  datasets: Dataset[];
  computations: ComputationResult[];
  onRequestComputation: (datasetId: string, model: string) => Promise<void>;
  walletConnected: boolean;
}

export const ResearcherView: React.FC<ResearcherViewProps> = ({
  datasets,
  computations,
  onRequestComputation,
  walletConnected,
}) => {
  const [selectedDatasetId, setSelectedDatasetId] = useState(datasets[0]?.id || "");
  const [selectedModel, setSelectedModel] = useState("DiseaseRisk-RandomForest-v1");

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDatasetId) return;
    await onRequestComputation(selectedDatasetId, selectedModel);
  };

  return (
    <div className="space-y-6">
      {/* Compute Request Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <div className="mb-4 pb-3 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-400" />
            Authorized AI Analysis & Computation (Researcher)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Circuit: <code className="text-indigo-300 font-mono">requestComputation(compHash)</code> — runs authorized ML inference under policy control.
          </p>
        </div>

        <form onSubmit={handleExecute} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Protected Dataset
              </label>
              <select
                value={selectedDatasetId}
                onChange={(e) => setSelectedDatasetId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {datasets.map((ds) => (
                  <option key={ds.id} value={ds.id}>
                    {ds.name} ({ds.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Authorized AI Algorithm
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="DiseaseRisk-RandomForest-v1">Disease Risk Prediction (Random Forest v1.4)</option>
                <option value="CardioAnalytics-LogisticRegression">Cardio Event Risk (Logistic Regression)</option>
                <option value="Aggregate-CohortSummary">Cohort Demographic & Statistical Summary</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 bg-indigo-950/30 border border-indigo-900/40 rounded-xl text-xs flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-slate-300 space-y-1">
              <span className="font-semibold text-indigo-300">Privacy & Policy Enforced at Runtime:</span>
              <p className="text-[11px] text-slate-400">
                You will receive only verified aggregate statistics. Raw patient identities, individual records, and medical files remain inside the Data Owner's vault and are cryptographically shielded.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!walletConnected || !selectedDatasetId}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm shadow-md transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4 fill-current" />
            {walletConnected ? "Submit Computation & Generate ZK Proof" : "Connect Wallet to Compute"}
          </button>
        </form>
      </div>

      {/* Verified Computation Results */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          Verified AI Results ({computations.length})
        </h3>

        <div className="space-y-4">
          {computations.map((comp) => (
            <div
              key={comp.id}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 sm:p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-900">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{comp.datasetName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {comp.model}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Executed at: {comp.timestamp} | Requester: <code className="text-slate-400">{comp.researcher}</code>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    ZK Proof Verified
                  </span>
                </div>
              </div>

              {/* Aggregate Results Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                <div className="bg-rose-950/30 border border-rose-900/30 rounded-lg p-2.5 text-center">
                  <span className="text-[10px] text-rose-400 font-semibold uppercase tracking-wider block">
                    High Risk Cohort
                  </span>
                  <span className="text-lg font-bold text-rose-200">
                    {comp.aggregateResult.highRisk.toLocaleString()}
                  </span>
                </div>

                <div className="bg-amber-950/30 border border-amber-900/30 rounded-lg p-2.5 text-center">
                  <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">
                    Medium Risk Cohort
                  </span>
                  <span className="text-lg font-bold text-amber-200">
                    {comp.aggregateResult.mediumRisk.toLocaleString()}
                  </span>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-900/30 rounded-lg p-2.5 text-center">
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">
                    Low Risk Cohort
                  </span>
                  <span className="text-lg font-bold text-emerald-200">
                    {comp.aggregateResult.lowRisk.toLocaleString()}
                  </span>
                </div>

                <div className="bg-cyan-950/30 border border-cyan-900/30 rounded-lg p-2.5 text-center">
                  <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider block">
                    Model Accuracy
                  </span>
                  <span className="text-lg font-bold text-cyan-200">
                    {comp.aggregateResult.accuracy}
                  </span>
                </div>
              </div>

              {/* Privacy Verification Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-medium">✓ Policy Compliant</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-emerald-400 font-medium">✓ Raw Data Protected (0 rows exposed)</span>
                </div>
                <div className="font-mono text-[10px] text-slate-500 truncate max-w-xs">
                  ZK Hash: {comp.zkProofHash}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
