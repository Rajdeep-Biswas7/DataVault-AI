import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Database,
  ArrowRight,
  Sparkles,
  Lock,
  EyeOff,
  Flame,
  Binary,
  Layers,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { VaultIcon } from "./VaultIcon";
import { PREPROD_CONTRACT_ADDRESS } from "../hooks/useDataVault";

interface HeroSectionProps {
  onLaunchDemo: () => void;
  onExploreAudit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchDemo, onExploreAudit }) => {
  const [activeTab, setActiveTab] = useState<"solution" | "problem">("solution");

  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Top Protocol Status Pill */}
      <div className="flex items-center justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-500/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Midnight Preprod Active</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Confidential Clean Room v1.0</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </div>

      {/* Main Headline */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          AI Needs Sensitive Data.{" "}
          <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            Organizations Cannot Risk Exposing It.
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          <strong className="text-cyan-300 font-semibold">DataVault AI</strong> is a privacy-preserving AI collaboration platform built on{" "}
          <span className="text-indigo-300 font-semibold">Midnight</span>. Run cutting-edge AI models over confidential hospital, financial, or proprietary records with{" "}
          <span className="text-emerald-300 font-semibold underline decoration-emerald-500/50 decoration-2">
            Zero Raw Data Ever Leaving The Vault
          </span>.
        </p>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onLaunchDemo}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <VaultIcon className="w-5 h-5" />
            <span>Launch Live Clean Room</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreAudit}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-medium text-sm border border-slate-700 hover:border-slate-600 transition backdrop-blur-md"
          >
            <Binary className="w-4 h-4 text-cyan-400" />
            <span>View Midnight ZK Proofs</span>
          </button>
        </div>
      </div>

      {/* Interactive Problem vs Solution Comparison Box */}
      <div className="mt-12 max-w-5xl mx-auto px-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Header Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 block mb-1">
                The Core Innovation
              </span>
              <h3 className="text-xl font-bold text-white">
                How DataVault AI Solves The Collaboration Deadlock
              </h3>
            </div>

            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-fit">
              <button
                onClick={() => setActiveTab("solution")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  activeTab === "solution"
                    ? "bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                DataVault AI (Zero-Knowledge)
              </button>
              <button
                onClick={() => setActiveTab("problem")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  activeTab === "problem"
                    ? "bg-rose-950 text-rose-300 border border-rose-800/80 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                Traditional Sharing (Dangerous)
              </button>
            </div>
          </div>

          {/* Comparison Content */}
          <div className="pt-6">
            {activeTab === "solution" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40">
                    <div className="w-9 h-9 rounded-xl bg-cyan-900/50 flex items-center justify-center text-cyan-400 mb-3">
                      <Database className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">1. Private Vault Ingestion</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Hospital keeps 100,000 patient records in a local zero-knowledge enclave. Names, disease history, and blood reports never leave the hospital premises.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40">
                    <div className="w-9 h-9 rounded-xl bg-indigo-900/50 flex items-center justify-center text-indigo-400 mb-3">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">2. Policy Enforced AI</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Researcher requests Disease Prediction. The Compact smart contract validates researcher credentials, locks out raw export, and runs inference under strict rules.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40">
                    <div className="w-9 h-9 rounded-xl bg-emerald-900/50 flex items-center justify-center text-emerald-400 mb-3">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">3. Verifiable Output</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Only aggregate statistics (e.g. Risk Cohorts: 1,204 High, 3,510 Med) leave. Midnight preprod verifies the ZK proof of compliant computation without seeing rows.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Key Result:</strong> Research accelerates 10x while HIPAA, GDPR & privacy regulations are 100% satisfied.</span>
                  </div>
                  <span className="font-mono text-[11px] text-cyan-400 px-3 py-1 rounded bg-slate-900 border border-slate-800">
                    disclose(recordCount &gt; 0)
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40">
                    <div className="w-9 h-9 rounded-xl bg-rose-900/40 flex items-center justify-center text-rose-400 mb-3">
                      <XCircle className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">Raw Dataset Export</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Researcher asks for data. Hospital sends raw CSV/SQL dump containing patient names, phone numbers, and diagnoses over insecure channels.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40">
                    <div className="w-9 h-9 rounded-xl bg-rose-900/40 flex items-center justify-center text-rose-400 mb-3">
                      <Flame className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">Massive Legal & Breach Risk</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Any external contractor or university breach exposes confidential patient data, resulting in multimillion dollar regulatory fines and PR fallout.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40">
                    <div className="w-9 h-9 rounded-xl bg-rose-900/40 flex items-center justify-center text-rose-400 mb-3">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">Complete Stagnation</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Because data cannot safely be shared, 90% of life-saving medical AI and fraud detection models are NEVER built.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/50 flex items-center gap-3 text-xs text-rose-200">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    Traditional data sharing forces organizations to choose between <strong>Innovation</strong> or <strong>Compliance</strong>. DataVault AI eliminates this false choice.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Protocol Metrics Strip */}
      <div className="mt-12 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center backdrop-blur-md">
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase block mb-0.5">Raw Records Exposed</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">0</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Zero-Knowledge Shielded</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center backdrop-blur-md">
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase block mb-0.5">Proof Verification</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">&lt;1.0s</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Midnight Proof-Server</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center backdrop-blur-md">
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase block mb-0.5">Compiler Language</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">Compact</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">v0.34.0 Native</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center backdrop-blur-md">
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase block mb-0.5">Active Network</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">Preprod</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Verifiable on-chain</span>
          </div>
        </div>
      </div>
    </section>
  );
};
