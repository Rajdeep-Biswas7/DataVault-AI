import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { PrivacyBanner } from "./components/PrivacyBanner";
import { DataOwnerView } from "./components/DataOwnerView";
import { ResearcherView } from "./components/ResearcherView";
import { AuditView } from "./components/AuditView";
import { ProofModal } from "./components/ProofModal";
import { useDataVault } from "./hooks/useDataVault";
import { AlertCircle, CheckCircle, X } from "lucide-react";

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"owner" | "researcher" | "audit">("owner");

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Proof Generation Modal with Spinner */}
      <ProofModal isOpen={isProving} stepText={provingStep} />

      {/* Top Navbar */}
      <Navbar
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        isConnecting={isConnecting}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-sm flex items-start justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={clearError}
              className="text-rose-400 hover:text-rose-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-sm flex items-start justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button
              onClick={clearSuccess}
              className="text-emerald-400 hover:text-emerald-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Privacy Model Banner */}
        <PrivacyBanner />

        {/* Role Views */}
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
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <p>
          DataVault AI — Built for Midnight Builder Challenge Level 3 | Zero-Knowledge Privacy-Preserving Collaboration
        </p>
      </footer>
    </div>
  );
};
