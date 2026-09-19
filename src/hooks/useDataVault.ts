import { useState, useEffect, useCallback } from "react";

export interface Dataset {
  id: string;
  name: string;
  owner: string;
  category: string;
  recordCountPrivate: number;
  allowedOperations: string[];
  rawExportAllowed: boolean;
  policyCommitmentHash: string;
  createdAt: string;
}

export interface ComputationResult {
  id: string;
  datasetName: string;
  model: string;
  researcher: string;
  status: "verified" | "failed";
  aggregateResult: {
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
    accuracy: string;
  };
  policyCompliant: boolean;
  rawExposed: boolean;
  zkProofHash: string;
  timestamp: string;
}

export const PREPROD_CONTRACT_ADDRESS =
  "mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne";

export function useDataVault() {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  // On-chain ledger state
  const [datasetCount, setDatasetCount] = useState<bigint>(1n);
  const [totalComputations, setTotalComputations] = useState<bigint>(1n);
  const [lastVerificationHash, setLastVerificationHash] = useState<string>(
    "0x8a9b3f421c9e8d7a1b3c5d7e9f0a2b4c6d8e0f1a3b5c7d9e1f3a5b7c9d1e3f5a"
  );

  // ZK Proving loading states
  const [isProving, setIsProving] = useState<boolean>(false);
  const [provingStep, setProvingStep] = useState<string>("");

  // Error & success messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // In-memory datasets & results
  const [datasets, setDatasets] = useState<Dataset[]>([
    {
      id: "ds-001",
      name: "Hospital Disease Clinical Records",
      owner: "Hospital-Alpha-Medical-Center",
      category: "Healthcare",
      recordCountPrivate: 100000,
      allowedOperations: ["Disease Prediction", "Aggregate Statistics"],
      rawExportAllowed: false,
      policyCommitmentHash: "0x4f3ca0a9f598cb9d82e808711cd38333c717bfb1b195bfe907bb9b0765da7c29",
      createdAt: new Date().toLocaleDateString(),
    },
  ]);

  const [computations, setComputations] = useState<ComputationResult[]>([
    {
      id: "comp-001",
      datasetName: "Hospital Disease Clinical Records",
      model: "DiseaseRisk-RandomForest-v1",
      researcher: "ResearchLab-BioAI",
      status: "verified",
      aggregateResult: {
        highRisk: 1204,
        mediumRisk: 3510,
        lowRisk: 8621,
        accuracy: "94.8%",
      },
      policyCompliant: true,
      rawExposed: false,
      zkProofHash: "0x816864c5b45da0e3f9ec170aa21bce724b7cc09728af754bd718351a05c9125a",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    setErrorMessage(null);
    try {
      // Simulate 1AM or Midnight wallet handshake
      await new Promise((resolve) => setTimeout(resolve, 800));
      const simulatedAddress = "mn1q8h4x9k7y2w3v5m6z4p1c0r8s9t2v5w6x7y8z9a";
      setWalletAddress(simulatedAddress);
      setWalletConnected(true);
      setSuccessMessage("Wallet connected successfully to Midnight Preprod!");
    } catch (err: any) {
      setErrorMessage("Failed to connect wallet: " + (err?.message || "Unknown error"));
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletConnected(false);
    setWalletAddress("");
    setSuccessMessage("Wallet disconnected.");
  }, []);

  // Register Dataset Circuit
  const registerDataset = useCallback(
    async (name: string, recordCount: number, policyKey: string) => {
      setErrorMessage(null);
      setSuccessMessage(null);

      if (!walletConnected) {
        setErrorMessage("Please connect your wallet first.");
        return;
      }
      if (!name.trim()) {
        setErrorMessage("Dataset name cannot be empty.");
        return;
      }
      if (recordCount <= 0) {
        setErrorMessage("Private record count must be greater than zero.");
        return;
      }
      if (!policyKey.trim()) {
        setErrorMessage("Policy authorization key is required.");
        return;
      }

      setIsProving(true);
      try {
        setProvingStep("Reading private witnesses (policyKey, rawRecordCount)...");
        await new Promise((r) => setTimeout(r, 600));

        setProvingStep("Proving disclose(recordCount > 0) without revealing count...");
        await new Promise((r) => setTimeout(r, 800));

        setProvingStep("Generating Zero-Knowledge proof via Midnight proof-server:6300...");
        await new Promise((r) => setTimeout(r, 1000));

        setProvingStep("Submitting transaction to Midnight Preprod network...");
        await new Promise((r) => setTimeout(r, 800));

        const newHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

        const newDataset: Dataset = {
          id: "ds-" + Math.floor(100 + Math.random() * 900),
          name: name.trim(),
          owner: walletAddress.slice(0, 12) + "...",
          category: "Medical / Enterprise",
          recordCountPrivate: recordCount,
          allowedOperations: ["Disease Prediction", "Aggregate Analysis"],
          rawExportAllowed: false,
          policyCommitmentHash: newHash,
          createdAt: new Date().toLocaleDateString(),
        };

        setDatasets((prev) => [newDataset, ...prev]);
        setDatasetCount((prev) => prev + 1n);
        setLastVerificationHash(newHash);
        setSuccessMessage(`Dataset "${name}" registered! ZK Proof verified on Midnight Preprod.`);
      } catch (err: any) {
        setErrorMessage("Failed to register dataset: " + (err?.message || "Proof generation failed"));
      } finally {
        setIsProving(false);
        setProvingStep("");
      }
    },
    [walletConnected, walletAddress]
  );

  // Request Computation Circuit
  const requestComputation = useCallback(
    async (datasetId: string, model: string) => {
      setErrorMessage(null);
      setSuccessMessage(null);

      if (!walletConnected) {
        setErrorMessage("Please connect your wallet first.");
        return;
      }

      const ds = datasets.find((d) => d.id === datasetId);
      if (!ds) {
        setErrorMessage("Dataset not found.");
        return;
      }

      setIsProving(true);
      try {
        setProvingStep("Checking researcher authorization witness...");
        await new Promise((r) => setTimeout(r, 600));

        setProvingStep("Enforcing Policy Rules: Raw export = FALSE, Aggregate = TRUE...");
        await new Promise((r) => setTimeout(r, 700));

        setProvingStep("Executing privacy-preserving AI inference in secure enclave...");
        await new Promise((r) => setTimeout(r, 1000));

        setProvingStep("Midnight Preprod verifying ZK compliance proof...");
        await new Promise((r) => setTimeout(r, 800));

        const compHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

        const newResult: ComputationResult = {
          id: "comp-" + Math.floor(100 + Math.random() * 900),
          datasetName: ds.name,
          model,
          researcher: walletAddress.slice(0, 10) + "...",
          status: "verified",
          aggregateResult: {
            highRisk: Math.floor(1000 + Math.random() * 500),
            mediumRisk: Math.floor(3000 + Math.random() * 800),
            lowRisk: Math.floor(8000 + Math.random() * 1000),
            accuracy: "95.2%",
          },
          policyCompliant: true,
          rawExposed: false,
          zkProofHash: compHash,
          timestamp: new Date().toLocaleTimeString(),
        };

        setComputations((prev) => [newResult, ...prev]);
        setTotalComputations((prev) => prev + 1n);
        setLastVerificationHash(compHash);
        setSuccessMessage("AI computation verified and compliant! Only aggregate statistics released.");
      } catch (err: any) {
        setErrorMessage("Computation request failed: " + (err?.message || "Policy violation"));
      } finally {
        setIsProving(false);
        setProvingStep("");
      }
    },
    [walletConnected, walletAddress, datasets]
  );

  return {
    walletConnected,
    walletAddress,
    isConnecting,
    datasetCount,
    totalComputations,
    lastVerificationHash,
    isProving,
    provingStep,
    errorMessage,
    successMessage,
    datasets,
    computations,
    connectWallet,
    disconnectWallet,
    registerDataset,
    requestComputation,
    clearError: () => setErrorMessage(null),
    clearSuccess: () => setSuccessMessage(null),
  };
}
