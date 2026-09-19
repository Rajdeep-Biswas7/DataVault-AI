import React from "react";
import { Loader2, ShieldAlert, Cpu } from "lucide-react";

interface ProofModalProps {
  isOpen: boolean;
  stepText: string;
}

export const ProofModal: React.FC<ProofModalProps> = ({ isOpen, stepText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl shadow-cyan-500/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-cyan-950/80 border border-cyan-700/60 rounded-xl text-cyan-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-white">Midnight ZK Proof In Progress</h4>
            <p className="text-xs text-slate-400">Generating circuit witnesses & constraints</p>
          </div>
        </div>

        {/* Progress Spinner */}
        <div className="my-6 flex flex-col items-center justify-center py-4 bg-slate-950/60 rounded-xl border border-slate-800">
          <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-3" />
          <p className="text-xs font-mono text-cyan-300 text-center px-4 font-medium">
            {stepText || "Proving execution constraints..."}
          </p>
        </div>

        {/* Explanatory notes */}
        <div className="text-[11px] text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            The Compact compiler circuits ensure your raw records and secret authorization keys are evaluated as private witnesses and NEVER broadcast to the network.
          </span>
        </div>
      </div>
    </div>
  );
};
