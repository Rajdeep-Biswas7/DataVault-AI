import React, { useState } from "react";
import { Lock, Wallet, Copy, Check, Sun, Moon } from "lucide-react";
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
  theme: "light" | "dark";
  onToggleTheme: () => void;
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
  theme,
  onToggleTheme,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PREPROD_CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand with custom VaultIcon */}
          <div
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300" />
              <div className="relative w-10 h-10 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-cyan-500/40 flex items-center justify-center shadow-md">
                <VaultIcon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                DataVault{" "}
                <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-500/40">
                  AI
                </span>
              </span>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:block">
                Confidential Data Clean Room • Midnight
              </p>
            </div>
          </div>

          {/* Navigation Interactive Tabs */}
          <nav className="flex space-x-1 sm:space-x-1.5 bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <button
              onClick={() => {
                setActiveTab("owner");
                window.scrollTo({ top: 750, behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "owner"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
              }`}
            >
              Data Owner
            </button>
            <button
              onClick={() => {
                setActiveTab("researcher");
                window.scrollTo({ top: 750, behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "researcher"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
              }`}
            >
              AI Researcher
            </button>
            <button
              onClick={() => {
                setActiveTab("audit");
                window.scrollTo({ top: 750, behavior: "smooth" });
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "audit"
                  ? "bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-300 shadow-sm border border-slate-200 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
              }`}
            >
              Audit Explorer
            </button>
            <button
              onClick={onScrollToContact}
              className="hidden md:block px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all"
            >
              Contact
            </button>
          </nav>

          {/* Right Controls: Theme Switcher & Wallet */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition shadow-sm"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-700/60 text-emerald-700 dark:text-emerald-400 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Midnight Preprod</span>
            </div>

            {walletConnected ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 px-2.5 py-1 rounded-xl hidden sm:inline font-semibold">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-4)}
                </span>
                <button
                  onClick={onDisconnect}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50"
              >
                <Wallet className="w-4 h-4" />
                {isConnecting ? "Connecting..." : "Connect 1AM"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contract Address Interactive Bar */}
      <div className="bg-slate-100/90 dark:bg-slate-950/95 border-t border-slate-200/80 dark:border-slate-800/90 px-4 py-1.5 text-center text-xs text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
        <Lock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
        <span className="font-medium">Preprod Contract:</span>
        <code className="font-mono text-cyan-700 dark:text-cyan-300 text-[11px] truncate max-w-xs sm:max-w-md bg-white dark:bg-slate-900/80 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800">
          {PREPROD_CONTRACT_ADDRESS}
        </code>
        <button
          onClick={handleCopy}
          className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-300 transition"
          title="Copy Contract Address"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </header>
  );
};
