import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("DataVault Application Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white text-zinc-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#FFD400]/20 border border-[#FFD400] flex items-center justify-center text-black mb-4">
            <AlertTriangle className="w-7 h-7 text-black" />
          </div>
          <h2 className="text-xl font-extrabold text-black tracking-tight mb-2">
            Application Recovery
          </h2>
          <p className="text-xs text-zinc-600 max-w-md mb-6 leading-relaxed">
            DataVault encountered an issue while communicating with the browser environment.
            Your session is safe.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FFD400] hover:bg-[#E5BE00] text-black font-bold text-xs border border-black/15 shadow-sm transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
