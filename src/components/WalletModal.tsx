import React, { useState } from "react";
import {
  Wallet,
  X,
  Copy,
  Check,
  ShieldCheck,
  Layers,
  ArrowRight,
  Coins,
  Shield,
  Key,
} from "lucide-react";
import { USER_1AM_WALLETS, AddressType } from "../hooks/useMidnight";

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
  onConnect1AM: (customAddress?: string, type?: AddressType) => Promise<boolean>;
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
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AddressType>("shielded");

  if (!isOpen) return null;

  const handleCopy = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSelectAddress = async (type: AddressType) => {
    setActiveTab(type);
    await onConnect1AM(undefined, type);
  };

  const addressList = [
    {
      type: "shielded" as AddressType,
      label: "Midnight Shielded (ZK Private)",
      icon: Shield,
      address: USER_1AM_WALLETS.shielded,
      tag: "SHIELDED",
      tagColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    },
    {
      type: "unshielded" as AddressType,
      label: "Midnight Unshielded (Public)",
      icon: Key,
      address: USER_1AM_WALLETS.unshielded,
      tag: "UNSHIELDED",
      tagColor: "bg-[#FFD400] text-black font-bold",
    },
    {
      type: "dust" as AddressType,
      label: "Midnight tDUST Gas Account",
      icon: Coins,
      address: USER_1AM_WALLETS.dustToken,
      tag: "tDUST",
      tagColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    },
    {
      type: "cardano" as AddressType,
      label: "Cardano Settlement Testnet",
      icon: Layers,
      address: USER_1AM_WALLETS.cardanoTestnet,
      tag: "CARDANO L1",
      tagColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden transition-all text-zinc-950 dark:text-white">
        {/* Top Cyphra Yellow Bar */}
        <div className="h-1.5 bg-[#FFD400]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFD400] flex items-center justify-center text-black font-mono font-black text-xs shadow-xs">
              1AM
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
                Midnight 1AM Wallet
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFD400] text-black font-bold">
                  PREPROD
                </span>
              </h3>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                {is1AMInstalled ? "Extension Connected 🟢" : "1AM Testnet Multi-Key Session"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Connection Status Banner */}
          <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-semibold text-zinc-600 dark:text-zinc-400 block">
                ACTIVE STATUS
              </span>
              <span className="text-xs font-bold text-zinc-950 dark:text-white flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {walletConnected ? `${walletProviderName} Connected` : "Ready to Connect"}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-500 block">BALANCE</span>
              <span className="text-xs font-mono font-bold text-black dark:text-[#FFD400]">
                {balance}
              </span>
            </div>
          </div>

          {/* 1AM Testnet Multi-Asset Addresses */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider font-mono">
                Your 1AM Testnet Addresses
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Click to activate / copy</span>
            </div>

            <div className="space-y-2">
              {addressList.map((item) => {
                const isSelected = activeTab === item.type;
                const IconComponent = item.icon;
                const isCopied = copiedKey === item.type;
                const shortAddr = `${item.address.slice(0, 14)}...${item.address.slice(-8)}`;

                return (
                  <div
                    key={item.type}
                    onClick={() => handleSelectAddress(item.type)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FFD400]/10 border-[#FFD400] dark:bg-[#FFD400]/5"
                        : "bg-white dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <IconComponent className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                        <span className="text-xs font-bold text-zinc-950 dark:text-white font-mono">
                          {item.label}
                        </span>
                      </div>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono">
                      <span className="text-zinc-800 dark:text-zinc-200 font-semibold truncate mr-2">
                        {shortAddr}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.address, item.type);
                        }}
                        className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition shrink-0"
                        title="Copy Full Address"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            {!walletConnected ? (
              <button
                onClick={() => {
                  onConnect1AM(undefined, activeTab);
                  onClose();
                }}
                disabled={isConnecting}
                className="flex-1 relative inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#FFD400] hover:bg-[#E5BE00] text-black font-bold text-xs border border-black/15 shadow-xs transition cursor-pointer"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>{isConnecting ? "Connecting..." : "Connect 1AM Session"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onDisconnect();
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-bold border border-zinc-300 dark:border-zinc-700 transition cursor-pointer"
              >
                Disconnect Session
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold border border-zinc-300 dark:border-zinc-800 transition cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Privacy Note */}
          <div className="pt-2 text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 border-t border-zinc-200 dark:border-zinc-800 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Dual-State Architecture • Zero raw data leaked on-chain</span>
          </div>
        </div>
      </div>
    </div>
  );
};
