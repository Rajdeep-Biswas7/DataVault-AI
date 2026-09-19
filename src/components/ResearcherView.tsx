import React, { useState } from "react";
import {
  BrainCircuit,
  Play,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Download,
  Terminal,
  Activity,
  BarChart3,
  Layers,
} from "lucide-react";
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

  const handleExportJson = (comp: ComputationResult) => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify(
          {
            protocol: "DataVault AI",
            network: "Midnight Preprod",
            contractCircuit: "requestComputation",
            computationId: comp.id,
            dataset: comp.datasetName,
            model: comp.model,
            aggregateResults: comp.aggregateResult,
            zeroKnowledgeProof: comp.zkProofHash,
            policyVerification: "SATISFIED",
            rawRecordExposure: 0,
            timestamp: comp.timestamp,
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `datavault_proof_${comp.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Compute Request Terminal */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-10 w-48 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 blur-sm" />

        <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-700/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              AI Researcher Secure Computation Studio
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Circuit: <code className="text-indigo-700 dark:text-indigo-300 font-mono font-bold">requestComputation(compHash)</code> — run approved AI models over shielded datasets.
          </p>
        </div>

        <form onSubmit={handleExecute} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Protected Institutional Dataset
              </label>
              <select
                value={selectedDatasetId}
                onChange={(e) => setSelectedDatasetId(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 shadow-sm transition cursor-pointer"
              >
                {datasets.map((ds) => (
                  <option key={ds.id} value={ds.id}>
                    {ds.name} ({ds.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Approved Machine Learning Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 shadow-sm transition cursor-pointer"
              >
                <option value="DiseaseRisk-RandomForest-v1">Disease Risk Prediction (Random Forest v1.4 • 94.8% Acc)</option>
                <option value="CardioAnalytics-LogisticRegression">Cardiovascular Event Risk (Logistic Regression)</option>
                <option value="DeepCohort-NeuralClassifier">Multi-Cohort Neural Classifier (Enclave v2)</option>
                <option value="Aggregate-CohortSummary">Cohort Demographic & Statistical Summary</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 rounded-2xl text-xs flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-indigo-800 dark:text-indigo-300">
                Zero-Knowledge Privacy Enforcement Activated:
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                The smart contract evaluates your authorized researcher credentials as a private witness. The AI inference executes within a confidential clean room. You receive verified aggregate output cohorts, while individual patient rows are cryptographically sealed.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!walletConnected || !selectedDatasetId}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/25 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4 fill-current" />
            {walletConnected ? "Execute Privacy-Preserving Inference" : "Connect 1AM Wallet to Run AI"}
          </button>
        </form>
      </div>

      {/* Verified AI Results Feed */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Verified AI Analysis Results ({computations.length})
        </h3>

        <div className="space-y-6">
          {computations.map((comp) => {
            const totalRecords =
              comp.aggregateResult.highRisk +
              comp.aggregateResult.mediumRisk +
              comp.aggregateResult.lowRisk;
            const highPct = Math.round((comp.aggregateResult.highRisk / totalRecords) * 100);
            const medPct = Math.round((comp.aggregateResult.mediumRisk / totalRecords) * 100);
            const lowPct = Math.round((comp.aggregateResult.lowRisk / totalRecords) * 100);

            return (
              <div
                key={comp.id}
                className="bg-white dark:bg-slate-950/85 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm"
              >
                {/* Result Title & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-900">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 dark:text-white text-base">
                        {comp.datasetName}
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold">
                        {comp.model}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Computed: {comp.timestamp} | Authorized Requester:{" "}
                      <code className="text-slate-800 dark:text-slate-300 font-mono font-bold">
                        {comp.researcher}
                      </code>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/60 shadow-sm">
                      <ShieldCheck className="w-4 h-4" />
                      Midnight ZK Proof Verified
                    </span>
                    <button
                      onClick={() => handleExportJson(comp)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition"
                      title="Export Cryptographic Certificate"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Graphical Cohort Distribution Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      Differential Cohort Breakdown
                    </span>
                    <span className="font-mono text-[11px] font-bold">
                      Total Evaluated: {totalRecords.toLocaleString()} Patients
                    </span>
                  </div>
                  <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden flex p-0.5 gap-0.5 border border-slate-200 dark:border-slate-800">
                    <div
                      style={{ width: `${highPct}%` }}
                      className="bg-rose-500 rounded-l-full h-full transition-all duration-500"
                      title={`High Risk: ${highPct}%`}
                    />
                    <div
                      style={{ width: `${medPct}%` }}
                      className="bg-amber-400 h-full transition-all duration-500"
                      title={`Medium Risk: ${medPct}%`}
                    />
                    <div
                      style={{ width: `${lowPct}%` }}
                      className="bg-emerald-500 rounded-r-full h-full transition-all duration-500"
                      title={`Low Risk: ${lowPct}%`}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-semibold pt-0.5">
                    <span className="text-rose-600 dark:text-rose-400">● High Risk: {highPct}%</span>
                    <span className="text-amber-600 dark:text-amber-400">● Medium Risk: {medPct}%</span>
                    <span className="text-emerald-600 dark:text-emerald-400">● Low Risk: {lowPct}%</span>
                  </div>
                </div>

                {/* Aggregate Numeric Cohorts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/30 rounded-2xl p-3 text-center">
                    <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider block">
                      High Risk Cohort
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-rose-800 dark:text-rose-200 font-mono">
                      {comp.aggregateResult.highRisk.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-3 text-center">
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider block">
                      Medium Risk Cohort
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-amber-800 dark:text-amber-200 font-mono">
                      {comp.aggregateResult.mediumRisk.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl p-3 text-center">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
                      Low Risk Cohort
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-emerald-800 dark:text-emerald-200 font-mono">
                      {comp.aggregateResult.lowRisk.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/30 rounded-2xl p-3 text-center">
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider block">
                      Model Accuracy
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-cyan-800 dark:text-cyan-200 font-mono">
                      {comp.aggregateResult.accuracy}
                    </span>
                  </div>
                </div>

                {/* Cryptographic Proof Receipt Footer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-900 gap-2 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Policy Enforced</span>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 0 Patient Rows Leaked</span>
                  </div>
                  <div className="text-[10px] text-cyan-700 dark:text-cyan-300 truncate max-w-sm bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                    ZK Commitment: {comp.zkProofHash}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
