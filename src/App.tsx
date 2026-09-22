import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { CircuitSimulator } from "./components/CircuitSimulator";
import { ComparisonTable } from "./components/ComparisonTable";
import { PrivacyBanner } from "./components/PrivacyBanner";
import { DataOwnerView } from "./components/DataOwnerView";
import { ResearcherView } from "./components/ResearcherView";
import { AuditView } from "./components/AuditView";
import { ContactSession } from "./components/ContactSession";
import { ProofModal } from "./components/ProofModal";
import { useMidnight, PREPROD_CONTRACT_ADDRESS, ONE_AM_EXPLORER_BASE } from "./hooks/useMidnight";
import { AlertCircle, CheckCircle, X, ExternalLink } from "lucide-react";

export const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("datavault_theme");
      return saved === "light" || saved === "dark" ? saved : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("datavault_theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const [activeTab, setActiveTab] = useState<"owner" | "researcher" | "audit">("owner");
  const contactRef = useRef<HTMLDivElement | null>(null);
  const studioRef = useRef<HTMLDivElement | null>(null);

  const {
    walletConnected,
    walletAddress,
    walletProviderName,
    balance,
    is1AMInstalled,
    isLaceInstalled,
    isConnecting,
    datasetCount,
    totalComputations,
    lastVerificationHash,
    isProving,
    provingStep,
    errorMessage,
    successMessage,
    datasets,
    computations,
    connect1AM,
    connectLace,
    disconnectWallet,
    registerDataset,
    requestComputation,
    clearError,
    clearSuccess,
  } = useMidnight();

  const handleScrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLaunchDemo = () => {
    setActiveTab("researcher");
    studioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleExploreAudit = () => {
    setActiveTab("audit");
    studioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark bg-zinc-950 text-white" : "bg-white text-zinc-950"} font-sans antialiased selection:bg-[#FFD400] selection:text-black transition-colors`}>
      {/* Zero-Knowledge Proof Modal */}
      <ProofModal isOpen={isProving} stepText={provingStep} />

      {/* Top Header matching Cyphra style */}
      <Navbar
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        walletProviderName={walletProviderName}
        balance={balance}
        is1AMInstalled={is1AMInstalled}
        isLaceInstalled={isLaceInstalled}
        isConnecting={isConnecting}
        onConnect1AM={connect1AM}
        onConnectLace={connectLace}
        onDisconnect={disconnectWallet}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollToContact={handleScrollToContact}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Floating Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/90 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <span className="font-bold block">Notice</span>
                <span>{errorMessage}</span>
              </div>
            </div>
            <button
              onClick={clearError}
              className="text-rose-600 dark:text-rose-400 hover:opacity-75 transition p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Floating Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-start justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">1AM Midnight Succeeded</span>
                <span>{successMessage}</span>
              </div>
            </div>
            <button
              onClick={clearSuccess}
              className="text-emerald-600 dark:text-emerald-400 hover:opacity-75 transition p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Hero Section matching Cyphra style */}
        <HeroSection
          onLaunchDemo={handleLaunchDemo}
          onExploreAudit={handleExploreAudit}
          theme={theme}
        />

        {/* Live Circuit Simulation Section (like Cyphra) */}
        <CircuitSimulator />

        {/* Public Blockchains vs DataVault Comparison Table (like Cyphra) */}
        <ComparisonTable />

        {/* Anchor point for live interactive studio */}
        <div ref={studioRef} className="pt-10">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
              Confidential Clean Room
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">
              Interactive Enclave Studio
            </h2>
          </div>

          {/* Privacy Model Live Circuit Guarantees */}
          <PrivacyBanner />

          {/* Active Workspace Tabs */}
          {activeTab === "owner" && (
            <DataOwnerView
              datasets={datasets}
              onRegister={registerDataset}
              walletConnected={walletConnected}
            />
          )}

          {activeTab === "researcher" && (
            <ResearcherView
              datasets={datasets}
              computations={computations}
              onRequestComputation={requestComputation}
              walletConnected={walletConnected}
            />
          )}

          {activeTab === "audit" && (
            <AuditView
              datasetCount={datasetCount}
              totalComputations={totalComputations}
              lastVerificationHash={lastVerificationHash}
              computations={computations}
            />
          )}
        </div>

        {/* Confidential Contact & Deployment Session */}
        <div ref={contactRef}>
          <ContactSession />
        </div>
      </main>

      {/* Cyphra-style Footer */}
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-8 text-zinc-900 dark:text-zinc-100 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-black dark:text-white font-mono">
                DATAVAULT AI
              </span>
              <span className="text-xs text-zinc-300 dark:text-zinc-700">/</span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">
                Privacy-first confidential clean room powered by{" "}
                <span className="text-black dark:text-white font-semibold">Midnight</span> &amp;{" "}
                <span className="text-black dark:text-white font-semibold">1AM Wallet</span>
              </span>
            </div>

            <div className="flex items-center gap-5 text-xs text-zinc-600 dark:text-zinc-400">
              <a
                href="https://docs.midnight.network"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                Midnight Docs <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://github.com/Rajdeep-Biswas7/DataVault-AI"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                GitHub Source <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={`${ONE_AM_EXPLORER_BASE}/contract/${PREPROD_CONTRACT_ADDRESS}?network=preprod`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                1AM Explorer <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                Preprod Ledger: Operational
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 font-mono gap-2">
            <div>
              <span>DATAVAULT Confidential Clean Room • Compact v0.34.0</span>
            </div>
            <span>1AM Wallet DApp Connector v4.0.1</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
