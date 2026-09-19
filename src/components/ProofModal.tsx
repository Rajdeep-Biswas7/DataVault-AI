import React, { useEffect, useState } from "react";
import { Loader2, ShieldAlert, Terminal } from "lucide-react";
import { VaultIcon } from "./VaultIcon";

interface ProofModalProps {
  isOpen: boolean;
  stepText: string;
}

export const ProofModal: React.FC<ProofModalProps> = ({ isOpen, stepText }) => {
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setTelemetryLogs([]);
      return;
    }

    const logs = [
      "INIT: Compact runtime v0.19.0 initialized",
      "WITNESS: Reading secret witness variables into private memory",
      "SHIELD: Enforcing zero-exposure boundary on raw records",
      "CIRCUIT: Evaluating circuit constraint satisfaction",
      "PROOF-SERVER: Connected to midnightnetwork/proof-server:6300",
      "DISCLOSE: Zero-knowledge assertion: disclose(recordCount > 0) -> TRUE",
      "DISCLOSE: Zero-knowledge assertion: disclose(policyKey != 0) -> TRUE",
      "CRYPTO: Synthesizing ZKIR proof packet (Groth16 / Plonk)",
      "NODE: Broadcasting verified commitment to Midnight Preprod",
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < logs.length) {
        setTelemetryLogs((prev) => [...prev, logs[currentIndex]]);
        currentIndex++;
      }
    }, 380);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl overflow-hidden">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-600/50 flex items-center justify-center shadow-md">
            <VaultIcon className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Midnight ZK Circuit Active
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 font-bold">
                PROVING
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluating Zero-Knowledge witnesses & circuit constraints
            </p>
          </div>
        </div>

        {/* Dynamic Status Display */}
        <div className="my-4 p-4 bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Loader2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400 animate-spin shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-mono text-cyan-700 dark:text-cyan-400 block font-bold">
              Current Stage:
            </span>
            <p className="text-xs font-mono text-slate-900 dark:text-white font-semibold">
              {stepText || "Synthesizing zero-knowledge verification proof..."}
            </p>
          </div>
        </div>

        {/* Real-time Simulated Cryptographic Telemetry Terminal */}
        <div className="bg-slate-950 text-cyan-300 rounded-2xl border border-slate-800 p-3 mb-4 font-mono text-[10px] space-y-1 h-36 overflow-y-auto">
          <div className="text-slate-500 flex items-center justify-between pb-1 border-b border-slate-900">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-cyan-400" />
              ZK Telemetry Console
            </span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>
          {telemetryLogs.map((log, i) => (
            <div key={i} className="text-cyan-300/90 flex items-start gap-1.5">
              <span className="text-slate-600 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>

        {/* Cryptographic Privacy Guarantee */}
        <div className="text-[11px] text-slate-700 dark:text-slate-300 bg-cyan-50 dark:bg-cyan-950/30 p-3.5 rounded-2xl border border-cyan-200 dark:border-cyan-900/50 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <span>
            <strong>Zero-Exposure Guarantee:</strong> Raw patient records and secret keys are consumed only within local circuit witness memory. Only mathematical verification commitments touch the Midnight network.
          </span>
        </div>
      </div>
    </div>
  );
};
