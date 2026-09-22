import React, { useState } from "react";
import { Wallet, ShieldCheck, Check, Copy, ChevronDown } from "lucide-react";
import { WalletModal } from "./WalletModal";

import { AddressType } from "../hooks/useMidnight";

interface WalletConnectProps {
  walletConnected: boolean;
  walletAddress: string;
  walletProviderName?: string;
  balance?: string;
  is1AMInstalled?: boolean;
  isLaceInstalled?: boolean;
  isConnecting?: boolean;
  onConnect1AM: (customAddress?: string, type?: AddressType) => Promise<boolean>;
  onConnectLace: () => Promise<boolean>;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  walletConnected,
  walletAddress,
  walletProviderName = "1AM Preprod",
  balance = "1,450.00 NIGHT",
  is1AMInstalled = false,
  isLaceInstalled = false,
  isConnecting = false,
  onConnect1AM,
  onConnectLace,
  onDisconnect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative inline-flex items-center">
        {walletConnected ? (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            {/* Clean 1AM Wallet Pill (No raw preprod address shown on the navbar) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFD400] hover:bg-[#E5BE00] text-black text-xs font-mono font-bold transition shadow-xs cursor-pointer"
              title="Click to view 1AM Wallet Details"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>1AM Wallet</span>
              <ChevronDown className="w-3 h-3 text-black/70" />
            </button>

            {/* Quick Disconnect */}
            <button
              onClick={onDisconnect}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition"
              title="Disconnect Wallet"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={() => onConnect1AM()}
            disabled={isConnecting}
            className="relative inline-flex items-center justify-center rounded-lg gap-1.5 text-xs font-bold px-4 py-2 bg-[#FFD400] text-black hover:bg-[#E5BE00] border border-black/15 shadow-xs transition-colors cursor-pointer disabled:opacity-40 select-none overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            <Wallet className="w-3.5 h-3.5 mr-0.5" />
            <span>{isConnecting ? "Connecting..." : "Connect 1AM Wallet"}</span>
          </button>
        )}
      </div>

      {/* Wallet Management Modal */}
      <WalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
    </>
  );
};
