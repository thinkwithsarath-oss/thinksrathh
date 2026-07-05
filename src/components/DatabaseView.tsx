import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Database, ShieldCheck, ShieldAlert, RefreshCw, Users, AlertCircle, Activity } from "lucide-react";

export interface DiagnosticsData {
  isConfigured: boolean;
  connected: boolean;
  leadsCount: number;
  message: string;
}

export default function DatabaseView() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDiagnostics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/db/diagnostics");
      if (!res.ok) {
        throw new Error("Failed to contact diagnostics API");
      }
      const data: DiagnosticsData = await res.json();
      setDiagnostics(data);
    } catch (err: any) {
      console.error("Failed to load database diagnostics:", err);
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  // Ensure it only renders if the DB environment variables are configured
  if (!diagnostics || !diagnostics.isConfigured) {
    return null;
  }

  return (
    <div id="database-diagnostic-container" className="max-w-4xl mx-auto px-6 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/[0.03] rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-[150px] h-[150px] bg-emerald-500/[0.02] rounded-full blur-[50px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg md:text-xl text-white font-normal">
                Database Diagnostic View
              </h3>
              <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">
                Real-Time Environment Status &amp; Lead Monitoring
              </p>
            </div>
          </div>

          <button
            onClick={fetchDiagnostics}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-xl font-mono text-xs transition-all cursor-pointer disabled:opacity-50 select-none"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Refreshing..." : "Refresh Status"}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/[0.04] border border-red-500/20 text-red-400 font-mono text-xs flex gap-2.5 items-start">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Connection Status Card */}
          <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                Connection Status
              </span>
              <Activity className="w-4 h-4 text-zinc-600 animate-pulse" />
            </div>

            <div className="flex items-center gap-3">
              {diagnostics.connected ? (
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
                  <div>
                    <p className="text-sm font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      CONNECTED (LIVE)
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      MySQL database is active and responding
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 relative" />
                  <div>
                    <p className="text-sm font-bold text-zinc-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      DISCONNECTED
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      Could not reach database check credentials
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-900/60 font-mono text-[10px] text-zinc-400 leading-relaxed">
              {diagnostics.message}
            </div>
          </div>

          {/* Stored Leads Count Card */}
          <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                Stored Leads Volume
              </span>
              <Users className="w-4 h-4 text-emerald-400/50" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl font-normal text-emerald-400">
                {diagnostics.leadsCount}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                Leads Tracked
              </span>
            </div>

            <p className="text-[10px] text-zinc-500 leading-relaxed pt-2 border-t border-zinc-900/60">
              The total count is retrieved directly from your verified <code>leads</code> table in MySQL.
            </p>
          </div>
        </div>

        {/* Informative Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-900 text-center">
          <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
            Protected &amp; Encrypted Tunnel • ThinkSarath™ Core Analytics
          </p>
        </div>
      </motion.div>
    </div>
  );
}
