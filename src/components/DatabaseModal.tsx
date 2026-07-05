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
  X, 
  Settings, 
  Calendar, 
  Layers, 
  Sparkles, 
  Server, 
  Cpu, 
  Link2 
} from "lucide-react";
import { useNavigation } from "../context/NavigationContext";

export default function DatabaseModal() {
  const { isDatabaseModalOpen, setIsDatabaseModalOpen } = useNavigation();
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
        // Don't set password for security, leave empty unless they change it
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

  // Delete Inquire
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
    if (isDatabaseModalOpen) {
      fetchDbStatus();
      fetchData();
    }
  }, [isDatabaseModalOpen]);

  if (!isDatabaseModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 select-none overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-zinc-950 border border-zinc-900 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        id="db-modal-panel"
      >
        {/* Modal Header */}
        <div className="p-6 md:p-8 border-b border-zinc-900 flex items-center justify-between bg-zinc-950 relative">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Database className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif text-lg md:text-xl text-white font-normal flex items-center gap-2">
                ThinkSarath Database Manager™
              </h2>
              <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5">
                phpMyAdmin Compatibility Hub &amp; Live Entity Storage
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsDatabaseModalOpen(false)}
            className="p-1.5 rounded-full border border-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Status Bar */}
        <div className="px-6 py-3.5 bg-zinc-900/30 border-b border-zinc-900 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px]">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">MySQL Connection:</span>
            {isLoadingStatus ? (
              <span className="flex items-center gap-1 text-zinc-400">
                <RefreshCw className="w-3 h-3 animate-spin" /> Fetching Status...
              </span>
            ) : status?.connected ? (
              <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> CONNECTED (LIVE)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                <ShieldAlert className="w-3.5 h-3.5" /> PENDING CONFIG / FALLBACK ACTIVE
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-zinc-500">Auto-Tables Status:</span>
            <span className="text-zinc-300">
              {status?.connected ? "Verified & Active" : "In-Memory Buffer Enabled"}
            </span>
          </div>
        </div>

        {/* Tab System */}
        <div className="flex border-b border-zinc-900 bg-zinc-950 font-mono text-[10px] uppercase tracking-widest px-6 pt-2">
          <button
            onClick={() => setActiveTab("config")}
            className={`pb-3 px-4 border-b-2 cursor-pointer transition-all ${
              activeTab === "config" 
                ? "border-emerald-500 text-emerald-400 font-bold" 
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5" /> Connection config
            </span>
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`pb-3 px-4 border-b-2 cursor-pointer transition-all ${
              activeTab === "inquiries" 
                ? "border-emerald-500 text-emerald-400 font-bold" 
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Live inquiries ({inquiries.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab("drafts")}
            className={`pb-3 px-4 border-b-2 cursor-pointer transition-all ${
              activeTab === "drafts" 
                ? "border-emerald-500 text-emerald-400 font-bold" 
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> AI Blog Drafts ({drafts.length})
            </span>
          </button>
        </div>

        {/* Modal Body / Scrollable Content Area */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-zinc-950/60 text-zinc-300">
          
          <AnimatePresence mode="wait">
            {activeTab === "config" && (
              <motion.div 
                key="config-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-900 text-xs text-zinc-400 leading-relaxed space-y-2">
                  <div className="flex items-center gap-2 text-zinc-200 font-serif text-sm font-medium">
                    <Server className="w-4 h-4 text-emerald-400" />
                    Connecting your phpMyAdmin/MySQL database:
                  </div>
                  <p>
                    Provide the host address, port, database name, and login credentials of your MySQL database. 
                    Once saved, the system will immediately check connectivity and **automatically create the required tables** (<code>contact_inquiries</code> and <code>blog_drafts</code>) if they do not exist in your schema.
                  </p>
                </div>

                {actionMessage && (
                  <div className={`p-4 rounded-xl border text-xs flex gap-2.5 items-start ${
                    actionMessage.type === "success" 
                      ? "bg-emerald-500/[0.04] border-emerald-500/20 text-emerald-400" 
                      : "bg-red-500/[0.04] border-red-500/20 text-red-400"
                  }`}>
                    {actionMessage.type === "success" ? (
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
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
                    <label className="text-zinc-500 uppercase tracking-wider block">Database User (Username) *</label>
                    <input 
                      type="text"
                      placeholder="e.g. root, u1847582"
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
                      Leave empty to retain previously configured password, or type your phpMyAdmin user password.
                    </p>
                  </div>

                  <div className="col-span-2 pt-4 border-t border-zinc-900 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleResetConfig}
                      disabled={isResetting || isLoadingStatus}
                      className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 font-mono transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isResetting ? "Resetting..." : "Reset to defaults"}
                    </button>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-semibold font-mono flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Verifying Connection...
                        </>
                      ) : (
                        <>
                          <Link2 className="w-3.5 h-3.5" /> Save &amp; Test Connection
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
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 mb-2">
                  <span>Displaying live inquiries recorded in MySQL/Cache:</span>
                  <button 
                    onClick={fetchData} 
                    className="text-emerald-400 hover:underline flex items-center gap-1 bg-transparent border-none cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Reload
                  </button>
                </div>

                {isLoadingData ? (
                  <div className="py-20 text-center text-zinc-500 font-mono text-xs flex flex-col items-center justify-center gap-3">
                    <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
                    Querying database tables...
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="py-20 text-center border border-zinc-900 rounded-2xl bg-zinc-900/10 text-zinc-500 font-serif text-sm">
                    No lead inquiries found yet. All submissions via the advisory forms will populate here.
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
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 mb-2">
                  <span>Displaying generated AI blog post drafts stored in MySQL/Cache:</span>
                  <button 
                    onClick={fetchData} 
                    className="text-emerald-400 hover:underline flex items-center gap-1 bg-transparent border-none cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Reload
                  </button>
                </div>

                {isLoadingData ? (
                  <div className="py-20 text-center text-zinc-500 font-mono text-xs flex flex-col items-center justify-center gap-3">
                    <RefreshCw className="w-6 h-6 animate-spin text-emerald-500" />
                    Querying drafts table...
                  </div>
                ) : drafts.length === 0 ? (
                  <div className="py-20 text-center border border-zinc-900 rounded-2xl bg-zinc-900/10 text-zinc-500 font-serif text-sm">
                    No blog drafts have been generated yet. Create draft guides via the AI Writer inside the Blog Hub.
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
      </motion.div>
    </div>
  );
}
