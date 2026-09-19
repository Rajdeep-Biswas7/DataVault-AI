import React, { useState } from "react";
import { Lock, Wallet, ExternalLink, Activity, Copy, Check, Terminal } from "lucide-react";
import { VaultIcon } from "./VaultIcon";
import { PREPROD_CONTRACT_ADDRESS } from "../hooks/useDataVault";

interface NavbarProps {
  walletConnected: boolean;
  walletAddress: string;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  activeTab: "owner" | "researcher" | "audit";
  setActiveTab: (tab: "owner" | "researcher" | "audit") => void;
  onScrollToContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  walletConnected,
  walletAddress,
  isConnecting,
  onConnect,
  onDisconnect,
  activeTab,
  setActiveTab,
  onScrollToContact,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PREPROD_CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand with custom VaultIcon */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl blur opacity-40 group-hover:opacity-80 transition duration-300" />
              <div className="relative w-10 h-10 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-center justify-center shadow-lg">
                <VaultIcon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                DataVault <span className="text-cyan-400 font-mono text-xs px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/40">AI</span>
              </span>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono hidden sm:block">
                Confidential Data Clean Room • Midnight
              </p>
            </div>
          </div>

          {/* Navigation Interactive Tabs */}
          <nav className="flex space-x-1 sm:space-x-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => {
                setActiveTab("owner");
                window.scrollTo({ top: 680, behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "owner"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              Data Owner
            </button>
            <button
              onClick={() => {
                setActiveTab("researcher");
                window.scrollTo({ top: 680, behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "researcher"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              AI Researcher
            </button>
            <button
              onClick={() => {
                setActiveTab("audit");
                window.scrollTo({ top: 680, behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "audit"
                  ? "bg-slate-800 text-cyan-300 shadow border border-slate-700"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              Audit Explorer
            </button>
            <button
              onClick={onScrollToContact}
              className="hidden md:block px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              Contact Node
            </button>
          </nav>

          {/* Network Badge & Wallet Status */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Midnight Preprod</span>
            </div>

            {walletConnected ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded-lg hidden sm:inline">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-4)}
                </span>
                <button
                  onClick={onDisconnect}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
              >
                <Wallet className="w-4 h-4" />
                {isConnecting ? "Connecting..." : "Connect 1AM"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contract Address Interactive Bar */}
      <div className="bg-slate-950/95 border-t border-slate-800/90 px-4 py-1.5 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="text-slate-400 font-medium">Preprod Contract:</span>
        <code className="font-mono text-cyan-300 text-[11px] truncate max-w-xs sm:max-w-md bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          {PREPROD_CONTRACT_ADDRESS}
        </code>
        <button
          onClick={handleCopy}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition"
          title="Copy Contract Address"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </header>
  );
};
