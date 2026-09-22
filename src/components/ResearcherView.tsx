import React, { useState } from "react";
import {
  BrainCircuit,
  Play,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Download,
  Terminal,
  BarChart3,
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
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 relative overflow-hidden shadow-xs">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFD400]" />

        <div className="mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#FFD400] flex items-center justify-center text-black font-bold">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white tracking-tight">
              AI Researcher Secure Computation Studio
            </h2>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
            Circuit: <code className="text-black dark:text-[#FFD400] font-mono font-bold">requestComputation(compHash)</code> — run approved AI models over shielded datasets.
          </p>
        </div>

        <form onSubmit={handleExecute} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-200 mb-1.5">
                Target Protected Institutional Dataset
              </label>
              <select
                value={selectedDatasetId}
                onChange={(e) => setSelectedDatasetId(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#FFD400] transition cursor-pointer font-medium"
              >
                {datasets.map((ds) => (
                  <option key={ds.id} value={ds.id} className="dark:bg-zinc-900">
                    {ds.name} ({ds.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-200 mb-1.5">
                Select Approved Machine Learning Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#FFD400] transition cursor-pointer font-medium"
              >
                <option value="DiseaseRisk-RandomForest-v1" className="dark:bg-zinc-900">Disease Risk Prediction (Random Forest v1.4 • 94.8% Acc)</option>
                <option value="CardioAnalytics-LogisticRegression" className="dark:bg-zinc-900">Cardiovascular Event Risk (Logistic Regression)</option>
                <option value="DeepCohort-NeuralClassifier" className="dark:bg-zinc-900">Multi-Cohort Neural Classifier (Enclave v2)</option>
                <option value="Aggregate-CohortSummary" className="dark:bg-zinc-900">Cohort Demographic &amp; Statistical Summary</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-black dark:text-[#FFD400] shrink-0 mt-0.5" />
            <div className="text-zinc-700 dark:text-zinc-300 space-y-1">
              <span className="font-bold text-zinc-950 dark:text-white">
                Zero-Knowledge Privacy Enforcement Activated:
              </span>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                The smart contract evaluates your authorized researcher credentials as a private witness. The AI inference executes within a confidential clean room. You receive verified aggregate output cohorts, while individual patient rows are cryptographically sealed.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!walletConnected || !selectedDatasetId}
            className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#FFD400] hover:bg-[#E5BE00] text-black font-bold text-xs sm:text-sm border border-black/15 shadow-xs transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4 fill-current" />
            {walletConnected ? "Execute Privacy-Preserving Inference" : "Connect 1AM Wallet to Run AI"}
          </button>
        </form>
      </div>

      {/* Verified AI Results Feed */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs">
        <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
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
                className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 sm:p-6 space-y-4"
              >
                {/* Result Title & Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-900">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-zinc-950 dark:text-white text-base">
                        {comp.datasetName}
                      </span>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold">
                        {comp.model}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-medium">
                      Computed: {comp.timestamp} | Status: <span className="text-emerald-700 dark:text-emerald-400 font-bold">Compliant &amp; Shielded</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 shadow-xs">
                      <ShieldCheck className="w-4 h-4" />
                      Midnight ZK Proof Verified
                    </span>
                    <button
                      onClick={() => handleExportJson(comp)}
                      className="p-2 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 transition cursor-pointer"
                      title="Export Cryptographic Certificate"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Aggregate Insights Visual Distribution */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-300 flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-black dark:text-[#FFD400]" />
                      Zero-Knowledge Aggregate Output (Zero Patient Record Leakage)
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      Model Accuracy: {comp.aggregateResult.accuracy}
                    </span>
                  </div>

                  {/* Multi-segment Progress Bar */}
                  <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex shadow-inner">
                    <div
                      style={{ width: `${highPct}%` }}
                      className="bg-rose-500 h-full transition-all duration-500 flex items-center justify-center text-[9px] font-bold text-white font-mono"
                      title={`High Risk: ${comp.aggregateResult.highRisk} (${highPct}%)`}
                    >
                      {highPct > 10 ? `${highPct}%` : ""}
                    </div>
                    <div
                      style={{ width: `${medPct}%` }}
                      className="bg-amber-500 h-full transition-all duration-500 flex items-center justify-center text-[9px] font-bold text-white font-mono"
                      title={`Medium Risk: ${comp.aggregateResult.mediumRisk} (${medPct}%)`}
                    >
                      {medPct > 10 ? `${medPct}%` : ""}
                    </div>
                    <div
                      style={{ width: `${lowPct}%` }}
                      className="bg-emerald-500 h-full transition-all duration-500 flex items-center justify-center text-[9px] font-bold text-white font-mono"
                      title={`Low Risk: ${comp.aggregateResult.lowRisk} (${lowPct}%)`}
                    >
                      {lowPct > 10 ? `${lowPct}%` : ""}
                    </div>
                  </div>

                  {/* Legend Cards */}
                  <div className="grid grid-cols-3 gap-3 mt-3 text-center text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                      <div className="flex items-center justify-center gap-1.5 text-rose-700 font-bold mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>High Risk Cohort</span>
                      </div>
                      <span className="text-base font-black text-zinc-950 dark:text-white">
                        {comp.aggregateResult.highRisk.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                      <div className="flex items-center justify-center gap-1.5 text-amber-700 font-bold mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>Medium Risk Cohort</span>
                      </div>
                      <span className="text-base font-black text-zinc-950 dark:text-white">
                        {comp.aggregateResult.mediumRisk.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Low Risk Cohort</span>
                      </div>
                      <span className="text-base font-black text-zinc-950 dark:text-white">
                        {comp.aggregateResult.lowRisk.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cryptographic ZK Proof Card */}
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                  <div className="flex items-center gap-2 truncate">
                    <Terminal className="w-4 h-4 text-zinc-600 dark:text-zinc-400 shrink-0" />
                    <span className="text-zinc-600 dark:text-zinc-400 font-semibold">ZK Proof Hash:</span>
                    <span className="font-bold text-zinc-950 dark:text-white truncate">
                      {comp.zkProofHash}
                    </span>
                  </div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                    Dual-State Verifiable
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
