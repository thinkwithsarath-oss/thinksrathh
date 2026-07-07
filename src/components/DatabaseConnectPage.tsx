import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Database, 
  CheckCircle, 
  AlertTriangle, 
  ShieldAlert,
  ShieldCheck, 
  RefreshCw, 
  Trash2, 
  Settings, 
  Calendar, 
  Sparkles, 
  Server, 
  Link2 
} from "lucide-react";

export default function DatabaseConnectPage() {
  const [activeTab, setActiveTab] = useState<"config" | "inquiries" | "drafts">("config");

  // Config States
  const [host, setHost] = useState("");
  const [port, setPort] = useState("3306");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");

  // Status and loading states
  const [status, setStatus] = useState<{
    connected: boolean;
    configured: boolean;
    message: string;
    config?: any;
  } | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Data state
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Load Status
  const fetchDbStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const res = await fetch("/api/db/status");
      const data = await res.json();
      setStatus(data);
      if (data.config) {
        setHost(data.config.host || "");
        setPort(data.config.port?.toString() || "3306");
        setUser(data.config.user || "");
        setDatabase(data.config.database || "");
      }
    } catch (err) {
      console.error("Failed to fetch database status:", err);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  // Save Configuration
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setActionMessage(null);
    try {
      const res = await fetch("/api/db/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ host, port, user, password, database }),
      });
      const data = await res.json();
      
      if (data.success) {
        if (data.connectionError) {
          setActionMessage({
            type: "error",
            text: data.connectionError,
          });
        } else {
          setActionMessage({
            type: "success",
            text: "Database configuration saved. Successfully connected and verified tables!",
          });
        }
        fetchDbStatus();
        fetchData();
      } else {
        setActionMessage({
          type: "error",
          text: data.message || "Failed to save configuration.",
        });
      }
    } catch (err: any) {
      setActionMessage({
        type: "error",
        text: err.message || "An error occurred while connecting to MySQL.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default
  const handleResetConfig = async () => {
    if (!window.confirm("Are you sure you want to reset configuration to default .env variables?")) return;
    setIsResetting(true);
    setActionMessage(null);
    try {
      const res = await fetch("/api/db/reset", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setActionMessage({ type: "success", text: "Reset successfully." });
        setHost("");
        setUser("");
        setDatabase("");
        setPassword("");
        setPort("3306");
        fetchDbStatus();
        fetchData();
      }
    } catch (err: any) {
      setActionMessage({ type: "error", text: err.message });
    } finally {
      setIsResetting(false);
    }
  };

  // Fetch inquiries and drafts
  const fetchData = async () => {
    setIsLoadingData(true);
    try {
      const [inqRes, draftRes] = await Promise.all([
        fetch("/api/contact"),
        fetch("/api/drafts")
      ]);
      const inqData = await inqRes.json();
      const draftData = await draftRes.json();
      
      if (inqData.success) setInquiries(inqData.data || []);
      if (draftData.success) setDrafts(draftData.data || []);
    } catch (err) {
      console.error("Failed to load database records:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: number) => {
    if (!window.confirm("Are you sure you want to permanently delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setInquiries(inquiries.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  useEffect(() => {
    fetchDbStatus();
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.02]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-900/60">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 shadow-lg">
              <Database className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl text-white font-normal tracking-tight">
                Database Connectivity Portal
              </h1>
              <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                Secure Live Entity Storage &amp; Connection Hub
              </p>
            </div>
          </div>

          <div className="font-mono text-[11px] bg-zinc-900/40 border border-zinc-800 rounded-full px-4.5 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-400 uppercase tracking-wider">Secure Connection Layer Active</span>
          </div>
        </div>

        {/* Dynamic Status Bar */}
        <div className="p-5 bg-zinc-900/20 border border-zinc-900/80 rounded-2xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="text-zinc-500">Database Status:</span>
            {isLoadingStatus ? (
              <span className="flex items-center gap-2 text-zinc-400">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Querying Database...
              </span>
            ) : status?.connected ? (
              <span className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold text-[11px]">
                <ShieldCheck className="w-4 h-4" /> CONNECTED (MYSQL LIVE)
              </span>
            ) : (
              <span className="flex items-center gap-2 text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-bold text-[11px]">
                <ShieldAlert className="w-4 h-4" /> IN-MEMORY CACHE ACTIVE
              </span>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div>
              <span className="text-zinc-500">Auto-Tables Status: </span>
              <span className="text-zinc-300 font-bold">
                {status?.connected ? "Verified & Configured" : "Buffer Mode (No DB)"}
              </span>
            </div>
          </div>
        </div>

        {/* Connection Control Card */}
        <div className="bg-zinc-900/10 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          {/* Tab System */}
          <div className="flex border-b border-zinc-900 bg-zinc-950/40 font-mono text-xs uppercase tracking-widest px-6 pt-3">
            <button
              onClick={() => setActiveTab("config")}
              className={`pb-3.5 px-5 border-b-2 cursor-pointer transition-all ${
                activeTab === "config" 
                  ? "border-emerald-500 text-emerald-400 font-bold" 
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Settings className="w-4 h-4" /> Connection Config
              </span>
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`pb-3.5 px-5 border-b-2 cursor-pointer transition-all ${
                activeTab === "inquiries" 
                  ? "border-emerald-500 text-emerald-400 font-bold" 
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Captured Leads ({inquiries.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab("drafts")}
              className={`pb-3.5 px-5 border-b-2 cursor-pointer transition-all ${
                activeTab === "drafts" 
                  ? "border-emerald-500 text-emerald-400 font-bold" 
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Blog Drafts ({drafts.length})
              </span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8 min-h-[400px] bg-zinc-950/20 text-zinc-300">
            <AnimatePresence mode="wait">
              {activeTab === "config" && (
                <motion.div 
                  key="config-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900/80 text-xs text-zinc-400 leading-relaxed space-y-3">
                    <div className="flex items-center gap-2 text-zinc-200 font-serif text-sm font-medium">
                      <Server className="w-4.5 h-4.5 text-emerald-400" />
                      Configure and Link Your Secure Relational Database:
                    </div>
                    <p>
                      Enter your private MySQL database host, port, credentials, and database name. 
                      Once you click <strong>Save &amp; Connect</strong>, the application will attempt to connect, 
                      bind to your tables, and automatically run the required entity migration schemas if they don't exist yet.
                    </p>
                  </div>

                  {actionMessage && (
                    <div className={`p-4 rounded-xl border text-xs flex gap-2.5 items-start ${
                      actionMessage.type === "success" 
                        ? "bg-emerald-500/[0.04] border-emerald-500/20 text-emerald-400" 
                        : "bg-red-500/[0.04] border-red-500/20 text-red-400"
                    }`}>
                      {actionMessage.type === "success" ? (
                        <CheckCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{actionMessage.text}</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveConfig} className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                      <label className="text-zinc-500 uppercase tracking-wider block">Database Host Address *</label>
                      <input 
                        type="text"
                        placeholder="e.g. localhost, mysql.yourhost.com"
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                      <label className="text-zinc-500 uppercase tracking-wider block">MySQL Connection Port *</label>
                      <input 
                        type="text"
                        placeholder="3306"
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                      <label className="text-zinc-500 uppercase tracking-wider block">Database Name (Schema) *</label>
                      <input 
                        type="text"
                        placeholder="e.g. thinksarath_db"
                        value={database}
                        onChange={(e) => setDatabase(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2 md:col-span-1">
                      <label className="text-zinc-500 uppercase tracking-wider block">Database Username *</label>
                      <input 
                        type="text"
                        placeholder="e.g. root"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-zinc-500 uppercase tracking-wider block">Database Password</label>
                      <input 
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-zinc-700"
                      />
                      <p className="text-[10px] text-zinc-500 leading-normal mt-1">
                        Leave blank to retain previously configured credentials. Your password will be securely compiled server-side.
                      </p>
                    </div>

                    <div className="col-span-2 pt-6 border-t border-zinc-900/60 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={handleResetConfig}
                        disabled={isResetting || isLoadingStatus}
                        className="px-5 py-3 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 font-mono transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isResetting ? "Resetting..." : "Reset to defaults"}
                      </button>

                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-semibold font-mono flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                      >
                        {isSaving ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Establishing Connect...
                          </>
                        ) : (
                          <>
                            <Link2 className="w-4 h-4" /> Save &amp; Connect Live
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {activeTab === "inquiries" && (
                <motion.div 
                  key="inquiries-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500 mb-2">
                    <span>Displaying live inquiries recorded in MySQL/Cache:</span>
                    <button 
                      onClick={fetchData} 
                      className="text-emerald-400 hover:underline flex items-center gap-1 bg-transparent border-none cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Reload List
                    </button>
                  </div>

                  {isLoadingData ? (
                    <div className="py-20 text-center text-zinc-500 font-mono text-xs flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
                      Retrieving tables...
                    </div>
                  ) : inquiries.length === 0 ? (
                    <div className="py-20 text-center border border-zinc-900 rounded-2xl bg-zinc-900/10 text-zinc-500 font-serif text-sm">
                      No lead inquiries found yet. All submissions via the contact form will populate here.
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-zinc-900 rounded-2xl">
                      <table className="w-full border-collapse font-sans text-left text-xs text-zinc-300">
                        <thead className="bg-zinc-900/60 font-mono text-[9px] uppercase tracking-wider text-zinc-400 border-b border-zinc-900">
                          <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Identity / Brand</th>
                            <th className="p-4">Contact Detail</th>
                            <th className="p-4">Channels</th>
                            <th className="p-4">Budget / Setup</th>
                            <th className="p-4">Appointment</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900 bg-zinc-950/40">
                          {inquiries.map((inq, idx) => (
                            <tr key={inq.id || idx} className="hover:bg-zinc-900/20 transition-colors">
                              <td className="p-4 font-mono text-[10px] text-emerald-500">
                                {inq.id || "Cached"}
                              </td>
                              <td className="p-4 space-y-0.5">
                                <p className="font-bold text-white">{inq.brand_name}</p>
                                <p className="font-mono text-[9px] text-zinc-500 uppercase">{inq.industry}</p>
                              </td>
                              <td className="p-4 space-y-0.5 font-mono text-[10px]">
                                <p className="text-zinc-300">{inq.email}</p>
                                <p className="text-zinc-500">{inq.phone_number}</p>
                              </td>
                              <td className="p-4 max-w-[150px] truncate">
                                <span className="font-mono text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/10 block w-fit truncate">
                                  {inq.channels || "Direct Enquiry"}
                                </span>
                              </td>
                              <td className="p-4 space-y-0.5 font-mono text-[10px]">
                                <p className="text-zinc-300">
                                  {inq.investment > 0 ? `₹${inq.investment.toLocaleString("en-IN")}` : (inq.budget_tier || "N/A")}
                                </p>
                                <p className="text-zinc-500 text-[9px] truncate max-w-[120px]">{inq.goal || "Contact Page"}</p>
                              </td>
                              <td className="p-4 font-mono text-[9px] space-y-0.5 text-zinc-400">
                                {inq.appointment_date ? (
                                  <>
                                    <p className="text-emerald-400 font-semibold">{inq.appointment_date}</p>
                                    <p>{inq.appointment_time}</p>
                                  </>
                                ) : (
                                  <p className="text-zinc-500">No date booked</p>
                                )}
                              </td>
                              <td className="p-4 text-right">
                                {inq.id ? (
                                  <button
                                    onClick={() => handleDeleteInquiry(inq.id)}
                                    className="p-1.5 rounded-lg border border-zinc-900 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors"
                                    title="Delete Permanent"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                ) : (
                                  <span className="font-mono text-[8px] text-zinc-600 uppercase">Buffer</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "drafts" && (
                <motion.div 
                  key="drafts-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500 mb-2">
                    <span>Displaying generated AI blog post drafts stored in MySQL/Cache:</span>
                    <button 
                      onClick={fetchData} 
                      className="text-emerald-400 hover:underline flex items-center gap-1 bg-transparent border-none cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Reload List
                    </button>
                  </div>

                  {isLoadingData ? (
                    <div className="py-20 text-center text-zinc-500 font-mono text-xs flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
                      Retrieving blog drafts...
                    </div>
                  ) : drafts.length === 0 ? (
                    <div className="py-20 text-center border border-zinc-900 rounded-2xl bg-zinc-900/10 text-zinc-500 font-serif text-sm">
                      No blog drafts have been generated yet. Use the AI Content Suite inside the Blog Hub.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {drafts.map((d, index) => (
                        <div 
                          key={d.id || index}
                          className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-900 space-y-3 relative overflow-hidden"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[8px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/15 uppercase">
                              {d.category || "General"}
                            </span>
                            <span className="font-mono text-[8px] text-zinc-500">
                              ID: {d.id || "Memory Cache"}
                            </span>
                          </div>
                          
                          <h3 className="font-serif text-sm font-semibold text-white leading-snug">
                            {d.title}
                          </h3>

                          {d.prompt && (
                            <div className="bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-900/50 font-serif text-[11px] text-zinc-400 italic">
                              Prompt: {d.prompt}
                            </div>
                          )}

                          <div className="bg-zinc-950/30 p-3 rounded-lg border border-zinc-900/50 font-serif text-[11px] text-zinc-400 line-clamp-4 leading-relaxed whitespace-pre-line">
                            {d.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
