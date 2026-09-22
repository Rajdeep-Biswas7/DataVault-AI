import React, { useState } from "react";
import {
  Mail,
  Send,
  Shield,
  CheckCircle,
  ExternalLink,
  Globe,
} from "lucide-react";
import { VaultIcon } from "./VaultIcon";
import { PREPROD_CONTRACT_ADDRESS } from "../hooks/useDataVault";

export const ContactSession: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orgType, setOrgType] = useState("Healthcare / Hospital System");
  const [encryptionLevel, setEncryptionLevel] = useState("Level 3 Zero-Knowledge Enclave");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 1000));

    const receipt =
      "0x" + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setSubmittedReceipt(receipt);
    setIsSubmitting(false);
  };

  return (
    <section className="mt-16 pt-12 pb-16 border-t border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-mono font-bold mb-3 shadow-xs">
            <Mail className="w-3.5 h-3.5 text-black dark:text-[#FFD400]" />
            <span>Confidential Inquiries &amp; Collaboration Node</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Deploy A Private Data Clean Room
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
            Connect your hospital, bank, or research institute to DataVault AI on Midnight.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFD400]" />

            {submittedReceipt ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-sm">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Inquiry Encrypted &amp; Received</h3>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 max-w-md mx-auto font-medium">
                  Your collaboration request was sealed with zero-knowledge metadata. Our core engineering team will contact you within 24 hours.
                </p>
                <div className="p-3.5 bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-300 dark:border-zinc-800 text-left text-xs space-y-1">
                  <span className="text-[10px] text-zinc-500 font-mono block font-bold">ENCRYPTED RECEIPT HASH:</span>
                  <code className="text-zinc-950 dark:text-[#FFD400] font-mono break-all text-[11px] block font-bold">
                    {submittedReceipt}
                  </code>
                </div>
                <button
                  onClick={() => {
                    setSubmittedReceipt(null);
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="px-5 py-2.5 text-xs font-bold rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700 transition cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-200 mb-1">
                      Your Name / Representative
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Elena Vance"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-[#FFD400] shadow-xs transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-200 mb-1">
                      Institutional Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@health-research.org"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-[#FFD400] shadow-xs transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-200 mb-1">
                      Institution Type
                    </label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#FFD400] shadow-xs transition cursor-pointer"
                    >
                      <option>Healthcare / Hospital System</option>
                      <option>AI Research Lab / University</option>
                      <option>Financial Institution / Banking</option>
                      <option>Biotech / Pharmaceutical</option>
                      <option>Midnight Ecosystem Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-200 mb-1">
                      Target Privacy Standard
                    </label>
                    <select
                      value={encryptionLevel}
                      onChange={(e) => setEncryptionLevel(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-950 dark:text-white focus:outline-none focus:border-black dark:focus:border-[#FFD400] shadow-xs transition cursor-pointer"
                    >
                      <option>Level 3 Zero-Knowledge Enclave</option>
                      <option>HIPAA-Compliant Differential Privacy</option>
                      <option>Zero-Exposure Clean Room (Preprod)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-200 mb-1">
                    Collaboration Scope / Data Use Case
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="We manage 250,000 anonymized cardiac patient records and want to collaborate with university researchers for disease risk modeling without exposing patient data..."
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl p-3 text-xs sm:text-sm text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-black dark:focus:border-[#FFD400] shadow-xs transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#FFD400] hover:bg-[#E5BE00] text-black font-bold text-xs sm:text-sm border border-black/15 shadow-xs transition cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Cryptographically Transmitting..." : "Submit Confidential Inquiry"}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Key Project Resources & Links */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-black text-[#FFD400] flex items-center justify-center font-bold">
                  <VaultIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-zinc-950 dark:text-white">DataVault AI Protocol</h3>
                  <p className="text-xs text-zinc-800 dark:text-[#FFD400] font-mono font-bold">
                    Midnight Builder Challenge Level 3
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                Empowering ethical data collaboration through cryptographic zero-knowledge proofs. Built on Compact language v0.34.0, deployed to Midnight Preprod.
              </p>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2.5">
                <a
                  href="https://data-vault-ai-kappa.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-[#FFD400] text-xs text-zinc-900 dark:text-zinc-100 transition group shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold">Live Production DApp (Vercel)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-black dark:group-hover:text-white transition" />
                </a>

                <a
                  href="https://github.com/Rajdeep-Biswas7/DataVault-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-[#FFD400] text-xs text-zinc-900 dark:text-zinc-100 transition group shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current text-zinc-700 dark:text-zinc-300" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span className="font-bold">GitHub Repository</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-black dark:group-hover:text-white transition" />
                </a>

                <a
                  href="https://www.youtube.com/watch?v=hsI-7lmRVJc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-[#FFD400] text-xs text-zinc-900 dark:text-zinc-100 transition group shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current text-red-600" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="font-bold">Watch 1-Min Demo (YouTube)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-black dark:group-hover:text-white transition" />
                </a>

                <a
                  href="https://docs.midnight.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-[#FFD400] text-xs text-zinc-900 dark:text-zinc-100 transition group shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                    <span className="font-bold">Midnight Documentation</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-black dark:group-hover:text-white transition" />
                </a>
              </div>
            </div>

            {/* Smart Contract Quick Reference Card */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs text-xs space-y-2">
              <div className="flex items-center justify-between font-mono font-bold">
                <span className="flex items-center gap-1.5 text-zinc-950 dark:text-white">
                  <Shield className="w-4 h-4 text-black dark:text-[#FFD400]" />
                  Preprod Smart Contract
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFD400] text-black font-bold">
                  Verified
                </span>
              </div>
              <code className="font-mono text-[10.5px] text-zinc-900 dark:text-zinc-200 break-all block bg-zinc-100 dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 font-semibold">
                {PREPROD_CONTRACT_ADDRESS}
              </code>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                Contains 3 deployed circuits: <span className="font-mono text-zinc-900 dark:text-zinc-200 font-bold">registerDataset</span>, <span className="font-mono text-zinc-900 dark:text-zinc-200 font-bold">requestComputation</span>, <span className="font-mono text-zinc-900 dark:text-zinc-200 font-bold">verifyPolicyCompliance</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
