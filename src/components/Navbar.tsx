import React from "react";
import { VaultIcon } from "./VaultIcon";
import { WalletConnect } from "./WalletConnect";
import { Sun, Moon, Database, BrainCircuit, History, Shield, Globe } from "lucide-react";

interface NavbarProps {
  walletConnected: boolean;
  walletAddress: string;
  walletProviderName: string;
  balance: string;
  is1AMInstalled: boolean;
  isLaceInstalled: boolean;
  isConnecting: boolean;
  onConnect1AM: (customAddress?: string) => Promise<boolean>;
  onConnectLace: () => Promise<boolean>;
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
  walletProviderName,
  balance,
  is1AMInstalled,
  isLaceInstalled,
  isConnecting,
  onConnect1AM,
  onConnectLace,
  onDisconnect,
  activeTab,
  setActiveTab,
  onScrollToContact,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Brand matching Cyphra style */}
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-2.5 group cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 rounded-lg bg-black text-[#FFD400] flex items-center justify-center font-bold text-sm shadow-xs transition-transform group-hover:scale-105 active:scale-95">
              <VaultIcon className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-black dark:text-white font-mono">
                DATAVAULT
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFD400] text-black font-bold">
                AI
              </span>
            </div>
          </div>

          {/* Navigation Links with Lucide Icons */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => {
                setActiveTab("owner");
                window.scrollTo({ top: 700, behavior: "smooth" });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "owner"
                  ? "bg-black text-[#FFD400] font-bold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Data Owner</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("researcher");
                window.scrollTo({ top: 700, behavior: "smooth" });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "researcher"
                  ? "bg-black text-[#FFD400] font-bold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>AI Researcher</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("audit");
                window.scrollTo({ top: 700, behavior: "smooth" });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === "audit"
                  ? "bg-black text-[#FFD400] font-bold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>ZK Audit</span>
            </button>

            <button
              onClick={onScrollToContact}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Enterprise Node</span>
            </button>
          </nav>
        </div>

        {/* Right Section: Ticker, Preprod Pill, Wallet, Theme */}
        <div className="flex items-center gap-3">
          {/* Live Block Height Pill (like Cyphra) */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Block #248,192</span>
          </div>

          {/* Network Selector Pill (Cyphra #FFD400 PREPROD Badge) */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider bg-[#FFD400] text-black border border-black/15 shadow-xs select-none"
              title="Midnight Preprod Active Ledger"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>PREPROD</span>
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-800" />
            )}
          </button>

          {/* 1AM Wallet Integration (Clean, hidden preprod address) */}
          <WalletConnect
            walletConnected={walletConnected}
            walletAddress={walletAddress}
            walletProviderName={walletProviderName}
            balance={balance}
            is1AMInstalled={is1AMInstalled}
            isLaceInstalled={isLaceInstalled}
            isConnecting={isConnecting}
            onConnect1AM={onConnect1AM}
            onConnectLace={onConnectLace}
            onDisconnect={onDisconnect}
          />
        </div>
      </div>
    </header>
  );
};
