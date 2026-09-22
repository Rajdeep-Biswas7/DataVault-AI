import React, { useState } from "react";
import {
  ShieldCheck,
  Cpu,
  Database,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronRight,
  Globe,
  EyeOff,
  Terminal,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { VaultIcon } from "./VaultIcon";
import { PrivacyXRayLens } from "./PrivacyXRayLens";

interface HeroSectionProps {
  onLaunchDemo: () => void;
  onExploreAudit: () => void;
  theme: "light" | "dark";
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchDemo,
  onExploreAudit,
  theme,
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<"preview" | "preprod" | "mainnet">("preprod");
  const [sampleModel, setSampleModel] = useState("DiseaseRisk-RandomForest-v1");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedProof, setSimulatedProof] = useState<string | null>(null);

  const handleRunInference = async () => {
    setIsSimulating(true);
    setSimulatedProof(null);
    await new Promise((r) => setTimeout(r, 1200));
    setSimulatedProof("0x816864c5b45da0e3f9ec170aa21bce724b7cc09728af754bd718351a05c9125a");
    setIsSimulating(false);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-zinc-200 dark:border-zinc-800">
      {/* Background SVG Grid Pattern (like Cyphra) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg
          className="absolute w-full h-full stroke-zinc-200/60 dark:stroke-zinc-800/40 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid-pattern" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M.5 36V.5H36" fill="none" strokeWidth="1" strokeDasharray="2 4" />
              <circle cx="0.5" cy="0.5" r="1" fill="#A1A1AA" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#FFD400]/15 via-[#FFD400]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200/80 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-colors mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Midnight Network • Official 1AM Wallet DApp Connector</span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
        </div>

        {/* Network Selector Tabs (Cyphra style) */}
        <div className="mb-8 flex flex-col items-center">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 shadow-xs backdrop-blur-sm">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
              <span>Network:</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedNetwork("preview")}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  selectedNetwork === "preview"
                    ? "bg-[#FFD400] text-black shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                <span>Preview</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-sans font-semibold">
                  Testnet
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedNetwork("preprod")}
                className={`relative px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  selectedNetwork === "preprod"
                    ? "bg-[#FFD400] text-black shadow-xs border border-black/15"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Preprod</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-black/10 text-black font-sans font-semibold">
                  Active
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedNetwork("mainnet")}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  selectedNetwork === "mainnet"
                    ? "bg-[#FFD400] text-black shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                <span>Mainnet</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-sans font-semibold">
                  Upcoming
                </span>
              </button>
            </div>
          </div>
          <div className="mt-2 text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
            <span className="text-zinc-400">Target RPC:</span>
            <span className="text-zinc-800 dark:text-zinc-300 font-medium">
              Multi-validator confidential staging network for Compact clean rooms
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.03em] text-zinc-950 dark:text-white max-w-3xl mx-auto leading-[1.08]">
          Confidential AI Clean Rooms for Sensitive Data
        </h1>
        <p className="mt-5 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Allow advanced AI algorithms to analyze sensitive organizational datasets with{" "}
          <strong className="text-black dark:text-white font-bold">absolute zero-exposure mathematical guarantees</strong>{" "}
          powered by Midnight Compact smart contracts.
        </p>

        {/* Action Buttons (Cyphra Yellow & Crisp Secondary) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          <button
            onClick={onLaunchDemo}
            className="relative inline-flex items-center justify-center rounded-lg focus:outline-none select-none transition-colors overflow-hidden active:shadow-inner gap-2.5 w-full sm:w-auto text-sm px-7 py-3.5 font-bold bg-[#FFD400] text-black hover:bg-[#E5BE00] border border-black/15 shadow-sm cursor-pointer"
          >
            <div className="absolute inset-0 -translate-x-full hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            <VaultIcon className="w-4 h-4" />
            <span>Launch Clean Room Studio</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onExploreAudit}
            className="relative inline-flex items-center justify-center rounded-lg select-none transition-colors overflow-hidden bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 shadow-sm gap-2.5 w-full sm:w-auto text-sm px-6 py-3.5 font-semibold cursor-pointer"
          >
            <Lock className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
            <span>Simulate ZK Circuit</span>
          </button>
        </div>

        {/* Interactive Live Confidential Clean Room Card (Cyphra Showcase Card Style!) */}
        <div className="mt-12 w-full max-w-md mx-auto text-left">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FFD400]/20 border border-[#FFD400] flex items-center justify-center text-black">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-black dark:text-white">Confidential Clean Room</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">Midnight PREPROD Circuit</p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                ZK-Encrypted
              </span>
            </div>

            <div className="space-y-3 pt-3.5">
              <div>
                <label className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 block mb-1">
                  Target Institutional Protected Vault
                </label>
                <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
                  <span className="truncate">Hospital-Alpha Clinical Cohort (100k Records)</span>
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-2" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                  <label className="font-semibold">Selected ML Model</label>
                  <span>Differential Privacy: ε = 0.5</span>
                </div>
                <div className="p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950">
                  <select
                    value={sampleModel}
                    onChange={(e) => setSampleModel(e.target.value)}
                    className="w-full bg-transparent font-mono text-xs font-bold text-black dark:text-white px-2 py-1 outline-none cursor-pointer"
                  >
                    <option value="DiseaseRisk-RandomForest-v1" className="dark:bg-zinc-900">
                      DiseaseRisk-RandomForest-v1 (Approved)
                    </option>
                    <option value="CardioRisk-XGBoost-v2" className="dark:bg-zinc-900">
                      CardioRisk-XGBoost-v2 (Approved)
                    </option>
                    <option value="Aggregate-CohortSummary" className="dark:bg-zinc-900">
                      Cohort Demographic Summary (Approved)
                    </option>
                  </select>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Ledger Visibility:</span>
                </span>
                <span className="font-bold text-black dark:text-white">Private Witness (Zero-Leak)</span>
              </div>

              {simulatedProof && (
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-mono text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <span className="truncate">ZK Proof: {simulatedProof.slice(0, 18)}...</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
              )}

              <button
                onClick={handleRunInference}
                disabled={isSimulating}
                className="relative inline-flex items-center justify-center rounded-lg font-bold text-xs py-2.5 bg-[#FFD400] text-black hover:bg-[#E5BE00] border border-black/10 shadow-xs w-full cursor-pointer transition select-none disabled:opacity-50"
              >
                <div className="absolute inset-0 -translate-x-full hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <span>{isSimulating ? "Synthesizing Proof..." : "Execute Confidential Inference"}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-Stat Metric Grid (like Cyphra) */}
        <div className="mt-14 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono text-zinc-700 dark:text-zinc-300 w-full">
          <div className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-left shadow-xs">
            <span className="text-zinc-500 block mb-1 font-semibold text-[10px] uppercase">
              Shielded Records
            </span>
            <span className="text-black dark:text-white font-bold text-base tabular-nums">
              100,000+
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-left shadow-xs">
            <span className="text-zinc-500 block mb-1 font-semibold text-[10px] uppercase">
              WASM Prover Time
            </span>
            <span className="text-black dark:text-white font-bold text-base tabular-nums flex items-center gap-1">
              1.28s <span className="text-xs font-normal text-emerald-600">(-35%)</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-left shadow-xs">
            <span className="text-zinc-500 block mb-1 font-semibold text-[10px] uppercase">
              Proof Engine
            </span>
            <span className="text-black dark:text-white font-bold text-base tabular-nums">
              BLS12-381 ZK
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 text-left shadow-xs">
            <span className="text-zinc-500 block mb-1 font-semibold text-[10px] uppercase">
              1AM Connector
            </span>
            <span className="text-black dark:text-white font-bold text-base tabular-nums flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              v4.0.1 Official
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Privacy X-Ray Lens Component */}
      <div className="mt-14">
        <PrivacyXRayLens theme={theme} />
      </div>
    </section>
  );
};
