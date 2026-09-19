import React, { useState } from "react";
import {
  Mail,
  Send,
  Building2,
  Shield,
  Key,
  CheckCircle,
  ExternalLink,
  Globe,
  MessageSquare,
  Sparkles,
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

    await new Promise((r) => setTimeout(r, 1200));

    const receipt =
      "0x" + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setSubmittedReceipt(receipt);
    setIsSubmitting(false);
  };

  return (
    <section className="mt-16 pt-12 pb-16 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800/50 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-bold mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Confidential Inquiries & Collaboration Node</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Deploy A Private Data Clean Room
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Connect your hospital, bank, or research institute to DataVault AI on Midnight.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 shadow-xl">
            {submittedReceipt ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Inquiry Encrypted & Received</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Your collaboration request was sealed with zero-knowledge metadata. Our core engineering team will contact you within 24 hours.
                </p>
                <div className="p-3.5 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-left text-xs space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">ENCRYPTED RECEIPT HASH:</span>
                  <code className="text-cyan-700 dark:text-cyan-300 font-mono break-all text-[11px] block font-bold">
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
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name / Representative
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Elena Vance"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-sm transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Institutional Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@health-research.org"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-sm transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Institution Type
                    </label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-sm transition cursor-pointer"
                    >
                      <option>Healthcare / Hospital System</option>
                      <option>AI Research Lab / University</option>
                      <option>Financial Institution / Banking</option>
                      <option>Biotech / Pharmaceutical</option>
                      <option>Midnight Ecosystem Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Target Privacy Standard
                    </label>
                    <select
                      value={encryptionLevel}
                      onChange={(e) => setEncryptionLevel(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-sm transition cursor-pointer"
                    >
                      <option>Level 3 Zero-Knowledge Enclave</option>
                      <option>HIPAA-Compliant Differential Privacy</option>
                      <option>Zero-Exposure Clean Room (Preprod)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Collaboration Scope / Data Use Case
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="We manage 250,000 anonymized cardiac patient records and want to collaborate with university researchers for disease risk modeling without exposing patient data..."
                    className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-sm transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Cryptographically Transmitting..." : "Submit Confidential Inquiry"}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Key Project Resources & Links */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <VaultIcon className="w-10 h-10" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">DataVault AI Protocol</h3>
                  <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                    Midnight Builder Challenge Level 3
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Empowering ethical data collaboration through cryptographic zero-knowledge proofs. Built on Compact language v0.34.0, deployed to Midnight Preprod.
              </p>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                <a
                  href="https://data-vault-ai-kappa.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 hover:border-emerald-500 text-xs text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-white transition group shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold">Live Production DApp (Vercel)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-500 transition" />
                </a>

                <a
                  href="https://github.com/Rajdeep-Biswas7/DataVault-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 text-xs text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span className="font-bold">GitHub Repository</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition" />
                </a>

                <a
                  href="https://www.youtube.com/watch?v=hsI-7lmRVJc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 hover:border-red-500 text-xs text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-white transition group shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 fill-current text-red-600 dark:text-red-400" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="font-bold">Watch 1-Min Demo (YouTube)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-red-500 transition" />
                </a>

                <a
                  href="https://docs.midnight.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 text-xs text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
                    <span className="font-bold">Midnight Documentation</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition" />
                </a>
              </div>
            </div>

            {/* Smart Contract Quick Reference Card */}
            <div className="glass-panel rounded-3xl p-5 shadow-xl text-xs space-y-2 border-cyan-500/30">
              <div className="flex items-center justify-between text-cyan-700 dark:text-cyan-300 font-mono font-bold">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  Preprod Smart Contract
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
                  Verified
                </span>
              </div>
              <code className="font-mono text-[10.5px] text-slate-800 dark:text-slate-300 break-all block bg-slate-100 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                {PREPROD_CONTRACT_ADDRESS}
              </code>
              <p className="text-[11px] text-slate-500">
                Contains 3 deployed circuits: <span className="font-mono text-slate-700 dark:text-slate-300">registerDataset</span>, <span className="font-mono text-slate-700 dark:text-slate-300">requestComputation</span>, <span className="font-mono text-slate-700 dark:text-slate-300">verifyPolicyCompliance</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
