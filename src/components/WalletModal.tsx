import React, { useState } from "react";
import {
  Wallet,
  X,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PREPROD_CONTRACT_ADDRESS } from "../hooks/useMidnight";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
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
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
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
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnect1AM = async () => {
    await onConnect1AM();
    onClose();
  };

  const handleConnectLace = async () => {
    await onConnectLace();
    onClose();
  };

  // Truncated clean address representation (e.g. mn_1am...3z2q)
  const maskedAddress = walletAddress
    ? `${walletAddress.slice(0, 10)}...${walletAddress.slice(-6)}`
    : "Shielded Key";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden transition-all">
        {/* Top Cyphra Yellow Bar */}
        <div className="h-1.5 bg-[#FFD400]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFD400]/20 border border-[#FFD400] flex items-center justify-center text-black font-mono font-bold text-xs">
              1AM
            </div>
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white flex items-center gap-1.5">
                Midnight Network
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFD400] text-black font-bold">
                  PREPROD
                </span>
              </h3>
              <p className="text-[11px] text-zinc-500">Confidential DApp Connector</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-black dark:hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {walletConnected ? (
            /* Connected View (Raw address hidden, clean 1AM info) */
            <div className="space-y-3.5">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono">Status</span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{walletProviderName} Connected</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-zinc-200/70 dark:border-zinc-800">
                  <span className="text-xs text-zinc-500 font-mono">Shielded Balance</span>
                  <span className="text-sm font-bold font-mono text-black dark:text-white">
                    {balance}
                  </span>
                </div>

                <div className="pt-2 border-t border-zinc-200/70 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 font-mono uppercase block mb-1">
                    Wallet Identifier
                  </span>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <code className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
                      {maskedAddress}
                    </code>
                    <button
                      onClick={handleCopy}
                      className="p-1 rounded text-zinc-400 hover:text-black dark:hover:text-white transition"
                      title="Copy Address"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onDisconnect();
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition"
              >
                Disconnect Session
              </button>
            </div>
          ) : (
            /* Connect Options */
            <div className="space-y-3">
              {/* 1AM Wallet Primary Option */}
              <div className="p-4 rounded-xl border-2 border-black dark:border-[#FFD400] bg-zinc-50 dark:bg-zinc-950 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FFD400] flex items-center justify-center text-black font-mono font-black text-xs">
                      1AM
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-black dark:text-white">
                        1AM Midnight Wallet
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-mono">
                        {is1AMInstalled ? "Extension Detected 🟢" : "Preprod DApp Connector"}
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black text-[#FFD400]">
                    OFFICIAL
                  </span>
                </div>

                <button
                  onClick={handleConnect1AM}
                  disabled={isConnecting}
                  className="w-full relative inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#FFD400] hover:bg-[#E5BE00] text-black font-bold text-xs border border-black/15 shadow-xs transition cursor-pointer"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>{isConnecting ? "Connecting..." : "Connect 1AM Wallet"}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>

              {/* Midnight Lace Option */}
              <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-mono font-bold text-xs">
                    ML
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-black dark:text-white block">
                      Midnight Lace
                    </span>
                    <span className="text-[10px] text-zinc-500">Alternate Wallet</span>
                  </div>
                </div>
                <button
                  onClick={handleConnectLace}
                  disabled={isConnecting}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-black dark:text-white transition"
                >
                  Connect
                </button>
              </div>
            </div>
          )}

          {/* Privacy Footnote */}
          <div className="pt-2 text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 border-t border-zinc-100 dark:border-zinc-800 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Zero-Knowledge Protected • Raw balances never exposed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
