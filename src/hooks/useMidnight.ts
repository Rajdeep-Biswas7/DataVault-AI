import { useCallback } from "react";
import { PREPROD_CONTRACT_ADDRESS, useDataVault, Dataset, ComputationResult } from "./useDataVault";

export interface MidnightWalletState {
  isConnected: boolean;
  address: string | null;
  network: "preprod" | "undeployed";
  error: string | null;
}

export function useMidnight() {
  const vault = useDataVault();

  const connectLace = useCallback(async () => {
    try {
      if (typeof window !== "undefined" && (window as any).midnight?.mnLace) {
        const lace = (window as any).midnight.mnLace;
        const api = await lace.enable();
        const state = await api.state();
        if (state && state.address) {
          vault.connectWallet();
          return;
        }
      }
      await vault.connectWallet();
    } catch (err: any) {
      console.warn("Midnight Lace connection error, falling back to simulated session:", err);
      await vault.connectWallet();
    }
  }, [vault]);

  const connect1AM = useCallback(async () => {
    try {
      if (typeof window !== "undefined" && (window as any).midnight?.["1am"]) {
        const oneAm = (window as any).midnight["1am"];
        const api = await oneAm.enable();
        const state = await api.state();
        if (state && state.address) {
          vault.connectWallet();
          return;
        }
      }
      await vault.connectWallet();
    } catch (err: any) {
      console.warn("1AM Wallet connection error, falling back to simulated session:", err);
      await vault.connectWallet();
    }
  }, [vault]);

  return {
    ...vault,
    contractAddress: PREPROD_CONTRACT_ADDRESS,
    connectLace,
    connect1AM,
    status: vault.isProving ? "proving" : vault.walletConnected ? "connected" : "disconnected",
  };
}

export type { Dataset, ComputationResult };
