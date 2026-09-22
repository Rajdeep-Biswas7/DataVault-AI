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
  Coins,
  Shield,
  Key,
  CheckCircle2,
} from "lucide-react";
import { VaultIcon } from "./VaultIcon";
import { PrivacyXRayLens } from "./PrivacyXRayLens";
import { USER_1AM_WALLETS } from "../hooks/useMidnight";

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
  const [selectedWalletType, setSelectedWalletType] = useState<"shielded" | "unshielded" | "dust">("shielded");
  const [sampleModel, setSampleModel] = useState("DiseaseRisk-RandomForest-v1");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedProof, setSimulatedProof] = useState<string | null>(null);

  const activeWalletAddress =
    selectedWalletType === "shielded"
      ? USER_1AM_WALLETS.shielded
      : selectedWalletType === "dust"
      ? USER_1AM_WALLETS.dustToken
      : USER_1AM_WALLETS.unshielded;

  const handleRunInference = async () => {
    setIsSimulating(true);
    setSimulatedProof(null);
    await new Promise((r) => setTimeout(r, 1100));
    setSimulatedProof("0x816864c5b45da0e3f9ec170aa21bce724b7cc09728af754bd718351a05c9125a");
    setIsSimulating(false);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-zinc-200 dark:border-zinc-800">
      {/* Background SVG Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg
          className="absolute w-full h-full stroke-zinc-300/70 dark:stroke-zinc-800/40 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="heroGridPattern" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M.5 36V.5H36" fill="none" strokeWidth="1" strokeDasharray="2 4" />
              <circle cx="0.5" cy="0.5" r="1" fill="#71717a" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#heroGridPattern)" />
        </svg>
      </div>

      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#FFD400]/20 via-[#FFD400]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-semibold text-zinc-900 dark:text-zinc-100 transition-colors mb-4 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Midnight Network • Official 1AM Wallet DApp Connector</span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
        </div>

        {/* Network Selector Tabs (Cyphra style with high contrast) */}
        <div className="mb-8 flex flex-col items-center">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 shadow-xs">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-zinc-800 dark:text-zinc-200" />
              <span>Network:</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedNetwork("preview")}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedNetwork === "preview"
                    ? "bg-[#FFD400] text-black shadow-xs border border-black/15"
                    : "text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                <span>Preview</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-sans font-semibold">
                  Testnet
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedNetwork("preprod")}
                className={`relative px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedNetwork === "preprod"
                    ? "bg-[#FFD400] text-black shadow-xs border border-black/15"
                    : "text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
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
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedNetwork === "mainnet"
                    ? "bg-[#FFD400] text-black shadow-xs border border-black/15"
                    : "text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-zinc-400" />
                <span>Mainnet</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-sans font-semibold">
                  Upcoming
                </span>
              </button>
            </div>
          </div>
          <div className="mt-2 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 font-medium">
            <span className="text-zinc-500">Target RPC:</span>
            <span className="text-zinc-900 dark:text-zinc-200 font-semibold">
              Multi-validator confidential staging network for Compact clean rooms
            </span>
          </div>
        </div>

        {/* Main Headline (Razor Sharp Black in Light Mode) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-zinc-950 dark:text-white max-w-3xl mx-auto leading-[1.08]">
          Confidential AI Clean Rooms for Sensitive Data
        </h1>
        <p className="mt-5 text-base sm:text-lg md:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto font-medium leading-relaxed">
          Allow advanced AI algorithms to analyze sensitive organizational datasets with{" "}
          <strong className="text-black dark:text-white font-bold underline decoration-[#FFD400] decoration-2">
            mathematical zero-exposure guarantees
          </strong>{" "}
          powered by Midnight Compact smart contracts.
        </p>

        {/* Action Buttons */}
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

        {/* Interactive Live Confidential Clean Room Card */}
        <div className="mt-12 w-full max-w-lg mx-auto text-left">
          <div className="rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFD400] flex items-center justify-center text-black shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-950 dark:text-white">Confidential Clean Room</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">Midnight PREPROD Circuit</p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                ZK-Encrypted
              </span>
            </div>

            <div className="space-y-3.5 pt-3.5">
              {/* 1AM Testnet Key Selection Selector */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono font-bold text-zinc-700 dark:text-zinc-300 block">
                    Your 1AM Wallet Testnet Address
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500">Active Key</span>
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedWalletType("shielded")}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                      selectedWalletType === "shielded"
                        ? "bg-black text-[#FFD400]"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
                    }`}
                  >
                    Shielded Key (ZK)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedWalletType("unshielded")}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                      selectedWalletType === "unshielded"
                        ? "bg-black text-[#FFD400]"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
                    }`}
                  >
                    Unshielded Key
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedWalletType("dust")}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                      selectedWalletType === "dust"
                        ? "bg-black text-[#FFD400]"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
                    }`}
                  >
                    tDUST Token
                  </button>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-[11px] text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
                  <span className="truncate mr-2 font-semibold">
                    {activeWalletAddress.slice(0, 16)}...{activeWalletAddress.slice(-8)}
                  </span>
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
              </div>

              {/* Target Protected Institutional Vault */}
              <div>
                <label className="text-[11px] font-mono font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Target Protected Institutional Dataset
                </label>
                <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-900 dark:text-zinc-100 font-semibold flex items-center justify-between">
                  <span className="truncate">Hospital-Alpha Clinical Cohort (100,000 Records)</span>
                  <Database className="w-3.5 h-3.5 text-zinc-600 shrink-0 ml-2" />
                </div>
              </div>

              {/* Model Selector */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-700 dark:text-zinc-300 mb-1">
                  <label className="font-bold">Machine Learning Model</label>
                  <span className="text-zinc-500">Privacy Budget: ε = 0.5</span>
                </div>
                <div className="p-1.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950">
                  <select
                    value={sampleModel}
                    onChange={(e) => setSampleModel(e.target.value)}
                    className="w-full bg-transparent font-mono text-xs font-bold text-zinc-950 dark:text-white px-2 py-1 outline-none cursor-pointer"
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

              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-700 dark:text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Ledger Visibility:</span>
                </span>
                <span className="font-bold text-black dark:text-white">Private Witness (Zero-Leak)</span>
              </div>

              {simulatedProof && (
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-[10px] font-mono text-emerald-900 dark:text-emerald-300 flex items-center justify-between">
                  <span className="truncate">ZK Proof: {simulatedProof.slice(0, 22)}...</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </div>
              )}

              <button
                onClick={handleRunInference}
                disabled={isSimulating}
                className="relative inline-flex items-center justify-center rounded-lg font-bold text-xs py-3 bg-[#FFD400] text-black hover:bg-[#E5BE00] border border-black/15 shadow-xs w-full cursor-pointer transition select-none disabled:opacity-50"
              >
                <div className="absolute inset-0 -translate-x-full hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <span>{isSimulating ? "Synthesizing Proof..." : "Execute Confidential Inference"}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-Stat Metric Grid */}
        <div className="mt-14 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono text-zinc-800 dark:text-zinc-200 w-full">
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-left shadow-xs">
            <span className="text-zinc-600 dark:text-zinc-400 block mb-1 font-semibold text-[10px] uppercase">
              Shielded Records
            </span>
            <span className="text-zinc-950 dark:text-white font-black text-base tabular-nums">
              100,000+
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-left shadow-xs">
            <span className="text-zinc-600 dark:text-zinc-400 block mb-1 font-semibold text-[10px] uppercase">
              WASM Prover Time
            </span>
            <span className="text-zinc-950 dark:text-white font-black text-base tabular-nums flex items-center gap-1">
              1.28s <span className="text-xs font-normal text-emerald-600">(-35%)</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-left shadow-xs">
            <span className="text-zinc-600 dark:text-zinc-400 block mb-1 font-semibold text-[10px] uppercase">
              Proof Engine
            </span>
            <span className="text-zinc-950 dark:text-white font-black text-base tabular-nums">
              BLS12-381 ZK
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-left shadow-xs">
            <span className="text-zinc-600 dark:text-zinc-400 block mb-1 font-semibold text-[10px] uppercase">
              1AM Connector
            </span>
            <span className="text-zinc-950 dark:text-white font-black text-base tabular-nums flex items-center gap-1.5">
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
