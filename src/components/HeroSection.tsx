import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Database,
  ArrowRight,
  Sparkles,
  Lock,
  Binary,
  Layers,
  CheckCircle2,
  XCircle,
  Zap,
} from "lucide-react";
import { VaultIcon } from "./VaultIcon";
import { PrivacyXRayLens } from "./PrivacyXRayLens";

interface HeroSectionProps {
  onLaunchDemo: () => void;
  onExploreAudit: () => void;
  theme: "light" | "dark";
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchDemo, onExploreAudit, theme }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      id: 1,
      title: "1. Encrypted Ingestion",
      desc: "Hospital or Bank stores confidential records in their local enclave. Raw PII never leaves internal servers.",
      icon: Database,
      badge: "Private Enclave",
    },
    {
      id: 2,
      title: "2. Compact ZK Rules",
      desc: "Midnight smart contract evaluates policy keys and differential privacy parameters as private witnesses.",
      icon: Lock,
      badge: "Compact v0.34.0",
    },
    {
      id: 3,
      title: "3. Enclave AI Compute",
      desc: "Approved ML algorithm executes inference over shielded features without exporting raw data rows.",
      icon: Cpu,
      badge: "Confidential AI",
    },
    {
      id: 4,
      title: "4. Verified Insights",
      desc: "Only aggregate statistics leave the vault. Midnight Preprod verifies the computation proof on-chain.",
      icon: ShieldCheck,
      badge: "Zero-Knowledge Verifiable",
    },
  ];

  return (
    <section className="relative pt-6 pb-8 overflow-hidden">
      {/* Top Status Pill */}
      <div className="flex items-center justify-center mb-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-300 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-semibold shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          <span>Midnight Preprod Live</span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span>Zero-Knowledge Data Clean Room</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
      </div>

      {/* Main Headline */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          AI Needs Sensitive Data.{" "}
          <span className="block mt-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
            Institutions Cannot Risk Leaking It.
          </span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          <strong className="text-cyan-700 dark:text-cyan-300 font-bold">DataVault AI</strong> makes confidential AI collaboration possible on <span className="font-semibold text-indigo-700 dark:text-indigo-300">Midnight</span>. Organizations can allow advanced AI algorithms to analyze sensitive datasets with <span className="font-bold underline decoration-cyan-500 decoration-2">absolute mathematical zero-exposure guarantees</span>.
        </p>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onLaunchDemo}
            className="group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <VaultIcon className="w-5 h-5" />
            <span>Launch Clean Room Studio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="https://www.youtube.com/watch?v=hsI-7lmRVJc"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-red-600/10 hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white border border-red-500/30 hover:border-red-600 font-bold text-sm shadow-lg shadow-red-500/10 hover:shadow-red-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4 fill-current text-red-600 dark:text-red-400 group-hover:text-white transition-colors" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Watch 1-Min Demo</span>
          </a>

          <button
            onClick={onExploreAudit}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl glass-panel text-slate-800 dark:text-slate-200 font-semibold text-sm hover:border-cyan-500/50 transition-all"
          >
            <Binary className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Inspect Midnight ZK Proofs</span>
          </button>
        </div>
      </div>

      {/* Interactive Privacy X-Ray Lens Component */}
      <PrivacyXRayLens theme={theme} />

      {/* Interactive 4-Step Collaborative Pipeline */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
                Cryptographic Workflow
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                How Data Moves Without Leaving The Vault
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Click any stage to inspect logic:
            </span>
          </div>

          {/* Interactive Steps Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {steps.map((s) => {
              const Icon = s.icon;
              const isSelected = activeStep === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? "bg-cyan-50 dark:bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/15"
                      : "bg-white/60 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? "bg-cyan-600 text-white"
                          : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                      {s.badge}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {s.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Expanded Step Details */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
            <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                Stage {activeStep} Technical Mechanism:
              </span>
              <p className="leading-relaxed">{steps[activeStep - 1].desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Metrics Strip */}
      <div className="mt-8 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-[10px] sm:text-xs text-slate-500 font-mono uppercase block mb-0.5">
              Raw Exposure
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              0 bytes
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Shielded by Midnight</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-[10px] sm:text-xs text-slate-500 font-mono uppercase block mb-0.5">
              Proof Generation
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
              &lt; 1.0s
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Proof-Server :6300</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-[10px] sm:text-xs text-slate-500 font-mono uppercase block mb-0.5">
              Contract Language
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
              Compact
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">v0.34.0 Native</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-center">
            <span className="text-[10px] sm:text-xs text-slate-500 font-mono uppercase block mb-0.5">
              Target Network
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">
              Preprod
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Live Verifiable</span>
          </div>
        </div>
      </div>
    </section>
  );
};
