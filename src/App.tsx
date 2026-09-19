import React, { useState, useRef } from "react";
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
import { AlertCircle, CheckCircle, X, Terminal, Cpu } from "lucide-react";

export const App: React.FC = () => {
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
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Dynamic Interactive Cyber Canvas Background */}
      <CyberBackground />

      {/* Zero-Knowledge Proof In Progress Modal */}
      <ProofModal isOpen={isProving} stepText={provingStep} />

      {/* Top Futuristic Navigation */}
      <Navbar
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        isConnecting={isConnecting}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onScrollToContact={handleScrollToContact}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Floating Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/90 border border-rose-700/80 text-rose-200 text-xs sm:text-sm flex items-start justify-between shadow-2xl backdrop-blur-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <span className="font-semibold block text-white">Execution Error</span>
                <span>{errorMessage}</span>
              </div>
            </div>
            <button
              onClick={clearError}
              className="text-rose-400 hover:text-white transition p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Floating Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-700/80 text-emerald-200 text-xs sm:text-sm flex items-start justify-between shadow-2xl backdrop-blur-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-semibold block text-white">Cryptographic Verification Succeeded</span>
                <span>{successMessage}</span>
              </div>
            </div>
            <button
              onClick={clearSuccess}
              className="text-emerald-400 hover:text-white transition p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Hero Section */}
        <HeroSection onLaunchDemo={handleLaunchDemo} onExploreAudit={handleExploreAudit} />

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
      <footer className="relative z-10 border-t border-slate-800/90 bg-slate-950/95 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-slate-400">
            DataVault AI • Built on Midnight Network (Preprod) • Compact v0.34.0
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-cyan-400 font-mono">Zero-Knowledge Clean Room</span>
            <span className="text-slate-600">|</span>
            <a
              href="https://github.com/Rajdeep-Biswas7/DataVault-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              GitHub Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
