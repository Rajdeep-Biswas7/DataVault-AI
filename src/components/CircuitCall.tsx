import React, { useState } from "react";
import { Cpu, CheckCircle2, Lock, ArrowRight, Loader2, ExternalLink } from "lucide-react";
import { PREPROD_CONTRACT_ADDRESS } from "../hooks/useDataVault";
import { ONE_AM_EXPLORER_BASE } from "../hooks/useMidnight";
import { executeRequestComputationCircuit } from "../services/contractClient";

interface CircuitCallProps {
  walletConnected: boolean;
  onRequestComputation: (datasetId: string, model: string) => Promise<void>;
  isProving: boolean;
  provingStep?: string;
  contractAddress?: string;
}

export const CircuitCall: React.FC<CircuitCallProps> = ({
  walletConnected,
  onRequestComputation,
  isProving,
  provingStep = "",
  contractAddress = PREPROD_CONTRACT_ADDRESS,
}) => {
  const [selectedModel, setSelectedModel] = useState("DiseaseRisk-RandomForest-v1");
  const [lastTxId, setLastTxId] = useState<string | null>(null);
  const [lastBlockHeight, setLastBlockHeight] = useState<number | null>(null);
  const [callSuccess, setCallSuccess] = useState(false);

  const handleExecute = async () => {
    if (!walletConnected) return;
    setCallSuccess(false);
    try {
      await onRequestComputation("ds-001", selectedModel);
      const receipt = await executeRequestComputationCircuit(
        "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
        selectedModel,
        "caller"
      );
      setLastTxId(receipt.txId);
      setLastBlockHeight(receipt.blockHeight);
      setCallSuccess(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl transition-all">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#FFD400]/20 border border-[#FFD400]/40 text-black dark:text-[#FFD400]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Midnight Preprod Circuit Caller
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              Circuit: requestComputation(computationHash)
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-mono text-black dark:text-[#FFD400] bg-[#FFD400]/20 px-2.5 py-0.5 rounded-md border border-[#FFD400]/40 font-bold">
            Compact v0.34
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            Preprod Contract Target
          </label>
          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 truncate">
            {contractAddress}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            AI Model Pipeline
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFD400] font-mono"
          >
            <option value="DiseaseRisk-RandomForest-v1">DiseaseRisk-RandomForest-v1 (Zero-Leakage)</option>
            <option value="CancerBiomarker-XGBoost-v2">CancerBiomarker-XGBoost-v2 (Zero-Leakage)</option>
            <option value="GenomicVariant-LogisticReg-v3">GenomicVariant-LogisticReg-v3 (Zero-Leakage)</option>
          </select>
        </div>

        {/* Level 2 Zero-Knowledge Disclosure Notice */}
        <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
          <Lock className="w-4 h-4 text-black dark:text-[#FFD400] shrink-0" />
          <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">
            Proved without revealing your input
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleExecute}
          disabled={!walletConnected || isProving}
          className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#FFD400] hover:bg-[#E5BE00] text-black shadow-md border border-black/10 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isProving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating Zero-Knowledge Proof...</span>
            </>
          ) : (
            <>
              <span>Execute Preprod Circuit</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Proving Stage Progress */}
        {isProving && (
          <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-black dark:text-[#FFD400] animate-pulse text-center">
            {provingStep || "Compiling local witness and running Halo2/ZK prover..."}
          </div>
        )}

        {/* Result Verification Confirmation */}
        {callSuccess && lastTxId && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-xs space-y-2">
            <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Circuit Proved and Verified on Midnight Preprod!</span>
              </div>
              {lastBlockHeight && (
                <span className="font-mono text-[10px] bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded">
                  Block #{lastBlockHeight}
                </span>
              )}
            </div>
            <div className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono break-all">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">Transaction ID: </span>
              {lastTxId}
            </div>
            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                ? Proved without revealing your input • 0 raw records leaked
              </p>
              <a
                href={`${ONE_AM_EXPLORER_BASE}/tx/${lastTxId}?network=preprod`}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-zinc-600 dark:text-zinc-300 hover:underline inline-flex items-center gap-1 font-mono"
              >
                1AM Explorer <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
