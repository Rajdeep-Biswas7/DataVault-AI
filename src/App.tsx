import React, { useState, useRef, useEffect } from "react";
import { CyberBackground } from "./components/CyberBackground";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { PrivacyBanner } from "./components/PrivacyBanner";
import { DataOwnerView } from "./components/DataOwnerView";
import { ResearcherView } from "./components/ResearcherView";
import { AuditView } from "./components/AuditView";
import { ContactSession } from "./components/ContactSession";
import { ProofModal } from "./components/ProofModal";
import { useDataVault } from "./hooks/useDataVault";
import { AlertCircle, CheckCircle, X } from "lucide-react";

export const App: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("datavault_theme");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("datavault_theme", theme);
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
    connectWallet,
    disconnectWallet,
    registerDataset,
    requestComputation,
    clearError,
    clearSuccess,
  } = useDataVault();

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
    <div className={`relative min-h-screen ${theme === "dark" ? "dark" : ""} transition-colors duration-300`}>
      {/* Background Canvas (Adaptive to light/dark) */}
      <CyberBackground theme={theme} />

      {/* Zero-Knowledge Proof In Progress Modal */}
      <ProofModal isOpen={isProving} stepText={provingStep} />

      {/* Top Navigation */}
      <Navbar
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        isConnecting={isConnecting}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollToContact={handleScrollToContact}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Floating Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/90 border border-rose-300 dark:border-rose-700/80 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start justify-between shadow-lg backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              <div>
                <span className="font-bold block">Execution Error</span>
                <span>{errorMessage}</span>
              </div>
            </div>
            <button
              onClick={clearError}
              className="text-rose-600 dark:text-rose-400 hover:opacity-75 transition p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Floating Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/90 border border-emerald-300 dark:border-emerald-700/80 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm flex items-start justify-between shadow-lg backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold block">Cryptographic Verification Succeeded</span>
                <span>{successMessage}</span>
              </div>
            </div>
            <button
              onClick={clearSuccess}
              className="text-emerald-600 dark:text-emerald-400 hover:opacity-75 transition p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Hero Section with Interactive X-Ray Lens */}
        <HeroSection
          onLaunchDemo={handleLaunchDemo}
          onExploreAudit={handleExploreAudit}
          theme={theme}
        />

        {/* Anchor point for live interactive studio */}
        <div ref={studioRef} className="pt-6">
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

      {/* Global High-Tech Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800/90 bg-white/80 dark:bg-slate-950/95 py-6 px-4 text-center text-xs text-slate-600 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px]">
            DataVault AI • Built on Midnight Network (Preprod) • Compact v0.34.0
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">
              Zero-Knowledge Clean Room
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <a
              href="https://github.com/Rajdeep-Biswas7/DataVault-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition font-semibold"
            >
              GitHub Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
