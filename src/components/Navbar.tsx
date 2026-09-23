import React, { useState, useRef, useEffect } from "react";
import { VaultIcon } from "./VaultIcon";
import { WalletConnect } from "./WalletConnect";
import { Sun, Moon, Database, BrainCircuit, History, Shield, ChevronDown, Check } from "lucide-react";

import { AddressType } from "../hooks/useMidnight";
import { SupportedNetwork } from "../services/midnight";

interface NavbarProps {
  walletConnected: boolean;
  walletAddress: string;
  walletProviderName: string;
  balance: string;
  is1AMInstalled: boolean;
  isLaceInstalled: boolean;
  isConnecting: boolean;
  currentNetwork: SupportedNetwork;
  liveBlockHeight: number;
  onSwitchNetwork: (net: SupportedNetwork) => void;
  onConnect1AM: (customAddress?: string, type?: AddressType) => Promise<boolean>;
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
  currentNetwork,
  liveBlockHeight,
  onSwitchNetwork,
  onConnect1AM,
  onConnectLace,
  onDisconnect,
  activeTab,
  setActiveTab,
  onScrollToContact,
  theme,
  onToggleTheme,
}) => {
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setNetworkDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {/* Right Section: Ticker, Preprod/Preview Dropdown, Wallet, Theme */}
        <div className="flex items-center gap-3">
          {/* Live Block Height Pill (queried from active network indexer) */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Block #{liveBlockHeight ? liveBlockHeight.toLocaleString() : "..."}</span>
          </div>

          {/* Interactive Network Selector Pill (Preprod / Preview Toggle) */}
          <div className="relative hidden sm:block" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider bg-[#FFD400] text-black border border-black/15 shadow-xs select-none hover:bg-[#E5BE00] transition cursor-pointer"
              title="Click to Switch Midnight Network"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{currentNetwork.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-black/70" />
            </button>

            {networkDropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl py-1 z-50 animate-fadeIn text-xs">
                <button
                  type="button"
                  onClick={() => {
                    onSwitchNetwork("preprod");
                    setNetworkDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left font-mono font-bold transition hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                    currentNetwork === "preprod" ? "text-black dark:text-[#FFD400]" : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${currentNetwork === "preprod" ? "bg-emerald-500" : "bg-zinc-400"}`} />
                    Preprod
                  </span>
                  {currentNetwork === "preprod" && <Check className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSwitchNetwork("preview");
                    setNetworkDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left font-mono font-bold transition hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                    currentNetwork === "preview" ? "text-black dark:text-[#FFD400]" : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${currentNetwork === "preview" ? "bg-emerald-500" : "bg-zinc-400"}`} />
                    Preview
                  </span>
                  {currentNetwork === "preview" && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
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

          {/* 1AM Wallet Integration */}
          <WalletConnect
            walletConnected={walletConnected}
            walletAddress={walletAddress}
            walletProviderName={walletProviderName}
            balance={balance}
            currentNetwork={currentNetwork}
            onSwitchNetwork={onSwitchNetwork}
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