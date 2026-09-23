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
  Globe,
} from "lucide-react";
import { PREPROD_WALLETS, PREVIEW_WALLETS, AddressType } from "../hooks/useMidnight";
import { SupportedNetwork } from "../services/midnight";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletConnected: boolean;
  walletAddress: string;
  walletProviderName: string;
  balance: string;
  currentNetwork?: SupportedNetwork;
  onSwitchNetwork?: (net: SupportedNetwork) => void;
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
  currentNetwork = "preprod",
  onSwitchNetwork,
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

  const activeWallets = currentNetwork === "preview" ? PREVIEW_WALLETS : PREPROD_WALLETS;

  const addressList = [
    {
      type: "shielded" as AddressType,
      label: `Midnight Shielded (${currentNetwork.toUpperCase()} ZK Private)`,
      icon: Shield,
      address: activeWallets.shielded,
      tag: "SHIELDED",
      tagColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    },
    {
      type: "unshielded" as AddressType,
      label: `Midnight Unshielded (${currentNetwork.toUpperCase()} Public)`,
      icon: Key,
      address: activeWallets.unshielded,
      tag: "UNSHIELDED",
      tagColor: "bg-[#FFD400] text-black font-bold",
    },
    {
      type: "dust" as AddressType,
      label: `Midnight tDUST Gas (${currentNetwork.toUpperCase()})`,
      icon: Coins,
      address: activeWallets.dustToken,
      tag: "tDUST",
      tagColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    },
    {
      type: "cardano" as AddressType,
      label: "Cardano Settlement Testnet",
      icon: Layers,
      address: activeWallets.cardanoTestnet,
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
        <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black text-[#FFD400] flex items-center justify-center font-bold text-sm">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                Midnight Wallet
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFD400] text-black font-extrabold uppercase">
                  {currentNetwork}
                </span>
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                {walletProviderName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Network Switcher inside Modal */}
        <div className="px-5 pt-3 pb-1 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            Active Network:
          </span>
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-[11px] font-mono font-bold">
            <button
              type="button"
              onClick={() => onSwitchNetwork && onSwitchNetwork("preprod")}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                currentNetwork === "preprod"
                  ? "bg-[#FFD400] text-black shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Preprod
            </button>
            <button
              type="button"
              onClick={() => onSwitchNetwork && onSwitchNetwork("preview")}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                currentNetwork === "preview"
                  ? "bg-[#FFD400] text-black shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Balance Card */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Funded Balance ({currentNetwork.toUpperCase()})
              </span>
              <div className="text-lg font-mono font-extrabold text-black dark:text-white">
                {balance}
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected
            </div>
          </div>

          {/* Address Switcher & Key Inspector */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              Select Enclave Key / Account
            </label>
            <div className="space-y-2">
              {addressList.map((item) => {
                const isCurrent = walletAddress === item.address;
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.type}
                    onClick={() => handleSelectAddress(item.type)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? "border-[#FFD400] bg-[#FFD400]/5 dark:bg-[#FFD400]/10 shadow-xs"
                        : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-3.5 h-3.5 ${isCurrent ? "text-amber-500" : "text-zinc-400"}`} />
                        <span className="text-xs font-bold font-mono text-zinc-900 dark:text-zinc-100">
                          {item.label}
                        </span>
                      </div>
                      <span className={`text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <code className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 truncate max-w-[280px]">
                        {item.address}
                      </code>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item.address, item.type);
                        }}
                        className="p-1 rounded text-zinc-400 hover:text-black dark:hover:text-white transition"
                        title="Copy Address"
                      >
                        {copiedKey === item.type ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
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
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <a
            href={`https://explorer.1am.xyz/?network=${currentNetwork}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-[#FFD400] flex items-center gap-1 transition"
          >
            <span>Open 1AM {currentNetwork.toUpperCase()} Explorer</span>
            <ArrowRight className="w-3 h-3" />
          </a>
          <button
            onClick={() => {
              onDisconnect();
              onClose();
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-red-500 hover:text-white transition cursor-pointer"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};