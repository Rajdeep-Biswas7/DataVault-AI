import React, { useState } from "react";
import { Wallet, ShieldCheck, AlertTriangle, ExternalLink, Check, Copy } from "lucide-react";
import { PREPROD_CONTRACT_ADDRESS } from "../hooks/useDataVault";

interface WalletConnectProps {
  walletConnected: boolean;
  walletAddress: string;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onConnectLace?: () => void;
  onConnect1AM?: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  walletConnected,
  walletAddress,
  isConnecting,
  onConnect,
  onDisconnect,
  onConnectLace,
  onConnect1AM,
}) => {
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress || PREPROD_CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-block text-left">
      {walletConnected ? (
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-700/60 text-emerald-700 dark:text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">Midnight Preprod</span>
          </div>

          <div
            onClick={handleCopy}
            title="Click to copy address"
            className="cursor-pointer flex items-center gap-1 text-xs font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 px-2.5 py-1 rounded-xl hover:bg-cyan-100 dark:hover:bg-cyan-900/60 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
            <span className="font-semibold">
              {walletAddress.slice(0, 8)}...{walletAddress.slice(-4)}
            </span>
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-60" />}
          </div>

          <button
            onClick={onDisconnect}
            className="px-3 py-1 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={onConnect}
            disabled={isConnecting}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all active:scale-95 disabled:opacity-50"
          >
            <Wallet className="w-4 h-4" />
            <span>{isConnecting ? "Connecting Wallet..." : "Connect Midnight Wallet"}</span>
          </button>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-2 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            title="Select Wallet Provider"
          >
            ?
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-12 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Midnight Provider
              </div>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  onConnectLace ? onConnectLace() : onConnect();
                }}
                className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>Midnight Lace Wallet</span>
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400">Extension</span>
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  onConnect1AM ? onConnect1AM() : onConnect();
                }}
                className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>1AM Midnight Wallet</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400">Web/Ext</span>
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  onConnect();
                }}
                className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between border-t border-slate-100 dark:border-slate-800"
              >
                <span>Preprod Sandbox (Demo)</span>
                <span className="text-[10px] text-emerald-600">Simulated</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
