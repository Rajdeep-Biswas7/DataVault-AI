import React from "react";
import { Shield, Lock, Wallet, ExternalLink, Activity } from "lucide-react";
import { PREPROD_CONTRACT_ADDRESS } from "../hooks/useDataVault";

interface NavbarProps {
  walletConnected: boolean;
  walletAddress: string;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  activeTab: "owner" | "researcher" | "audit";
  setActiveTab: (tab: "owner" | "researcher" | "audit") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  walletConnected,
  walletAddress,
  isConnecting,
  onConnect,
  onDisconnect,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                DataVault <span className="text-cyan-400 font-mono text-sm px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/50">AI</span>
              </span>
              <p className="text-xs text-slate-400 hidden sm:block">
                Confidential Data Clean Room on Midnight
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab("owner")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "owner"
                  ? "bg-cyan-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Data Owner
            </button>
            <button
              onClick={() => setActiveTab("researcher")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "researcher"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              AI Researcher
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "audit"
                  ? "bg-slate-700 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Audit Trail
            </button>
          </nav>

          {/* Network Badge & Wallet */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Midnight Preprod
            </div>

            {walletConnected ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 hidden md:inline">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-4)}
                </span>
                <button
                  onClick={onDisconnect}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-cyan-500/20 transition disabled:opacity-50"
              >
                <Wallet className="w-4 h-4" />
                {isConnecting ? "Connecting..." : "Connect 1AM"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contract address banner */}
      <div className="bg-slate-950/90 border-t border-slate-800/80 px-4 py-1 text-center text-xs text-slate-400 flex items-center justify-center gap-2 overflow-hidden">
        <Lock className="w-3 h-3 text-cyan-400 shrink-0" />
        <span className="text-slate-500">Contract:</span>
        <code className="font-mono text-cyan-300 text-[11px] truncate max-w-xs sm:max-w-md">
          {PREPROD_CONTRACT_ADDRESS}
        </code>
      </div>
    </header>
  );
};
