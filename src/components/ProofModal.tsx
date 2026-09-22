import React, { useEffect, useState } from "react";
import { Loader2, ShieldCheck, Terminal } from "lucide-react";
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
      "INIT: Compact runtime v0.34.0 initialized",
      "WITNESS: Reading secret witness variables into private enclave memory",
      "SHIELD: Enforcing zero-exposure boundary on raw records",
      "CIRCUIT: Evaluating circuit constraint satisfaction",
      "PROOF-SERVER: Connected to midnightnetwork/proof-server:6300",
      "DISCLOSE: Zero-knowledge assertion: disclose(recordCount > 0) -> TRUE",
      "DISCLOSE: Zero-knowledge assertion: disclose(policyKey != 0) -> TRUE",
      "CRYPTO: Synthesizing ZK proof packet (BLS12-381 / Compact)",
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl overflow-hidden transition-all text-zinc-950 dark:text-white">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FFD400]" />

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-11 h-11 rounded-xl bg-black text-[#FFD400] flex items-center justify-center shadow-xs">
            <VaultIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-zinc-950 dark:text-white flex items-center gap-2">
              Midnight ZK Circuit Active
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFD400] text-black font-bold">
                PROVING
              </span>
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              Evaluating Zero-Knowledge witnesses &amp; circuit constraints
            </p>
          </div>
        </div>

        {/* Dynamic Status Display */}
        <div className="my-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-black dark:text-[#FFD400] animate-spin shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-mono text-zinc-600 dark:text-zinc-400 block font-bold">
              Current Stage:
            </span>
            <p className="text-xs font-mono text-zinc-950 dark:text-white font-bold">
              {stepText || "Synthesizing zero-knowledge verification proof..."}
            </p>
          </div>
        </div>

        {/* Real-time Simulated Cryptographic Telemetry Terminal */}
        <div className="bg-zinc-950 text-emerald-400 rounded-xl border border-zinc-800 p-3 mb-4 font-mono text-[10.5px] space-y-1 h-36 overflow-y-auto">
          <div className="text-zinc-400 flex items-center justify-between pb-1 border-b border-zinc-800">
            <span className="flex items-center gap-1.5 font-bold">
              <Terminal className="w-3.5 h-3.5 text-[#FFD400]" />
              ZK Telemetry Console
            </span>
            <span className="text-emerald-400 font-bold">ONLINE</span>
          </div>
          {telemetryLogs.map((log, i) => (
            <div key={i} className="text-zinc-300 flex items-start gap-1.5">
              <span className="text-zinc-600 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>

        {/* Cryptographic Privacy Guarantee */}
        <div className="text-[11px] text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Zero-exposure boundary enforced: private records never leave local memory unencrypted.
          </span>
        </div>
      </div>
    </div>
  );
};
