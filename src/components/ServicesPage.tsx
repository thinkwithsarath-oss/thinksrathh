import React, { useState } from "react";
import { motion } from "motion/react";
import { SERVICES, Service } from "../data";
import { Search, BrainCircuit, Globe, Laptop, Target, Users, HelpCircle, CheckCircle2, ChevronRight, Calculator, Calendar, Sparkles } from "lucide-react";
import ElectricBorder from "./ElectricBorder";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [calcTier, setCalcTier] = useState<"professional" | "growth" | "elite">("growth");
  const [calcChannels, setCalcChannels] = useState<string[]>(["seo", "aeo"]);

  const categories = ["All", "Organic Growth", "AI Visibility", "Future SEO", "Local SEO", "PPC", "Paid Social", "Web Dev", "Strategy"];

  const filteredServices = selectedCategory === "All" 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedCategory);

  const toggleChannel = (channel: string) => {
    if (calcChannels.includes(channel)) {
      setCalcChannels(calcChannels.filter(c => c !== channel));
    } else {
      setCalcChannels([...calcChannels, channel]);
    }
  };

  const calculateEstimate = () => {
    let basePrice = 0;
    
    // Calculate base rate per selected channel depending on business tier
    calcChannels.forEach(ch => {
      if (ch === "seo") basePrice += calcTier === "professional" ? 5000 : calcTier === "growth" ? 75000 : 150000;
      else if (ch === "aeo" || ch === "geo") basePrice += calcTier === "professional" ? 8000 : calcTier === "growth" ? 85000 : 180000;
      else if (ch === "webdev") basePrice += calcTier === "professional" ? 15000 : calcTier === "growth" ? 120000 : 300000;
      else if (ch === "gads" || ch === "meta") basePrice += calcTier === "professional" ? 5000 : calcTier === "growth" ? 60000 : 120000;
      else basePrice += calcTier === "professional" ? 5000 : calcTier === "growth" ? 50000 : 100000;
    });

    // Discount if multiple channels are selected
    if (calcChannels.length > 2) {
      basePrice = basePrice * 0.85; // 15% off multi-channel retainer
    }

    return Math.round(basePrice);
  };

  return (
    <div className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* 1. Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-5">
        <span className="font-mono text-xs text-emerald-500 uppercase tracking-[0.25em] font-semibold">
          SERVICE MATRIX
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight text-zinc-900 dark:text-white">
          AI SEO, pSEO & <span className="font-semibold text-emerald-500">GEO Services</span> | ThinkSarath
        </h1>
        <p className="font-serif text-lg text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
          From modern organic search engineering (SEO, AEO, GEO) to Programmatic SEO frameworks and high-ROI ad deployments.
        </p>
      </section>

      {/* 2. Interactive Strategy Blueprint Blueprint & Calculator */}
      <section className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-900 rounded-3xl p-8 md:p-12 relative overflow-hidden" id="interactive-blueprints">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Selector controls */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-emerald-500 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5" />
                STRATEGY VALUE CALCULATOR
              </span>
              <h2 className="font-serif text-3xl font-medium text-zinc-900 dark:text-white">
                Bespoke AI SEO & Paid Media Retainer Estimator
              </h2>
              <p className="font-serif text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                Configure your digital channels of interest and your organizational tier to view simulated monthly investments and prime deliverables.
              </p>
            </div>

            {/* Business Scale Tier Selector */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                1. Select Organizational Tier:
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "professional", label: "Professional / Startup", desc: "For scaling personal brands or growing boutique setups." },
                  { id: "growth", label: "Growth Enterprise", desc: "For established mid-market leaders scaling national footprints." },
                  { id: "elite", label: "Enterprise Elite", desc: "For market-dominating brands looking for absolute industry authority." },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setCalcTier(tier.id as any)}
                    className={`p-4 rounded-xl text-left border cursor-pointer transition-all ${
                      calcTier === tier.id 
                        ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-950 dark:border-white shadow-md" 
                        : "bg-white text-zinc-700 border-zinc-200/60 dark:bg-zinc-900/60 dark:text-zinc-300 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="font-serif text-xs font-semibold">{tier.label}</div>
                    <div className="font-serif text-[10px] opacity-70 mt-1 line-clamp-2 leading-tight">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Channel Multi-selectors */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                2. Select Core Channels of Interest:
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { id: "seo", label: "Premium SEO" },
                  { id: "aeo", label: "AEO & GEO Optimization" },
                  { id: "webdev", label: "WordPress Custom Development" },
                  { id: "gads", label: "Google Ads (PPC)" },
                  { id: "meta", label: "Meta Ads (Paid Social)" },
                  { id: "gmb", label: "GMB Local Authority" },
                ].map((channel) => {
                  const isSelected = calcChannels.includes(channel.id);
                  return (
                    <button
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id)}
                      className={`px-4 py-2.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-emerald-500 text-black border-emerald-500 font-semibold shadow-sm" 
                          : "bg-white text-zinc-600 border-zinc-200/60 dark:bg-zinc-900/30 dark:text-zinc-400 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      {channel.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Price Sheet Card */}
          <div className="lg:col-span-5">
            <ElectricBorder
              className="p-8 bg-zinc-950 text-white rounded-3xl border border-zinc-900 shadow-2xl space-y-6"
              colors={["#10b981", "#3b82f6"]}
              duration={4}
              borderRadius="24px"
              glow={true}
            >
              <div className="space-y-1 border-b border-zinc-900 pb-4">
                <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-[0.2em] font-bold">ESTIMATED DIGITAL BUDGET</span>
                <div className="flex items-baseline gap-1.5 pt-2">
                  <span className="font-serif text-3xl font-normal text-zinc-400">₹</span>
                  <span className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-white">
                    {calcChannels.length === 0 ? "0" : calculateEstimate().toLocaleString("en-IN")}
                  </span>
                  <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest ml-1">/ Month</span>
                </div>
                <p className="font-serif text-[11px] text-zinc-500 italic mt-1">Calculated under standard retainer frameworks. Excluding ad spends.</p>
              </div>

              {/* Dynamic details listing */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Proposed Blueprint Pillars</span>
                </div>

                <div className="space-y-3">
                  {calcChannels.length === 0 ? (
                    <p className="font-serif text-sm text-zinc-500 italic">Select channels to construct your target ecosystem.</p>
                  ) : (
                    calcChannels.map(ch => {
                      const matchingService = SERVICES.find(s => s.id === ch);
                      return (
                        <div key={ch} className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900/40 border border-zinc-900/60 text-xs font-serif">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold text-zinc-200">{matchingService?.title || ch.toUpperCase()}</p>
                            <p className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider mt-0.5">{matchingService?.category || "Target Segment"}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {calcChannels.length > 0 && (
                  <div className="pt-4 border-t border-zinc-900 space-y-3">
                    <div className="flex justify-between font-mono text-[10px] text-zinc-500 uppercase">
                      <span>PROJECTED TIMELINE:</span>
                      <span className="text-zinc-300 font-semibold">3 - 6 Months Focus</span>
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-zinc-500 uppercase">
                      <span>RETAINER BASIS:</span>
                      <span className="text-zinc-300 font-semibold">Confidential NDA Alignment</span>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#contact"
                className="block text-center w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-95 text-black font-mono text-xs uppercase tracking-widest font-semibold transition-opacity"
              >
                REQUEST PROPOSAL WITH THIS BLUEPRINT
              </a>
            </ElectricBorder>
          </div>

        </div>
      </section>

      {/* 3. Detailed Services Filter & Grid */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200 dark:border-zinc-900 pb-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest font-semibold">EXQUISITE SERVICES</span>
            <h2 className="font-serif text-3xl font-medium text-zinc-900 dark:text-white">ThinkSarath Organic Search & Paid Media Capabilities Portfolio</h2>
          </div>
          
          {/* Categories Horizontal Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border text-xs font-mono shrink-0 cursor-pointer transition-all ${
                  selectedCategory === cat 
                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-950 dark:border-white font-medium" 
                    : "bg-zinc-50 text-zinc-600 border-zinc-200/50 dark:bg-zinc-900/30 dark:text-zinc-400 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="capabilities-page-grid">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-900/80 flex flex-col justify-between hover:border-emerald-500/30 dark:hover:border-emerald-500/10 transition-all duration-300 relative group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.01] rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">0{index + 1}.</span>
                  <span className="font-mono text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full uppercase tracking-widest font-semibold border border-emerald-500/20">
                    {service.category}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-medium text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {service.title}
                </h3>

                <p className="font-serif text-sm text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-zinc-200/50 dark:border-zinc-900">
                  <h4 className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Key Focus Areas:</h4>
                  <ul className="space-y-1.5">
                    {service.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200/50 dark:border-zinc-900 flex justify-between items-center text-xs font-mono text-zinc-500">
                <span>{service.metrics}</span>
                <span className="text-emerald-500 dark:text-emerald-400 group-hover:translate-x-1.5 transition-transform font-bold flex items-center gap-1 cursor-pointer">
                  INQUIRE DETAILS <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Deep-dive Engineering Methodologies Banner */}
      <section className="p-8 md:p-12 rounded-3xl bg-zinc-950 text-white grid grid-cols-1 lg:grid-cols-12 gap-12 border border-zinc-900 relative overflow-hidden" id="methodologies">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="lg:col-span-5 space-y-4">
          <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-[0.25em] font-semibold">
            METHODOLOGY
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light leading-tight text-white">
            Programmatic SEO & Conversational Engines
          </h2>
          <p className="font-sans text-sm text-zinc-400 leading-relaxed font-light">
            I don't manually build pages one by one for mass traffic; I engineer database structures, schema configurations, and content loops. This systematic approach ensures your brand is recommended natively across traditional indexers and modern AI.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900 space-y-4">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">pSEO</span>
            <h4 className="font-serif text-lg font-medium text-white">Programmatic Scale</h4>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
              Creating high-speed landing templates powered by relational databases to capture thousands of hyper-specific search combinations in days instead of months.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900 space-y-4">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">GEO</span>
            <h4 className="font-serif text-lg font-medium text-white">Citation Architecture</h4>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
              Designing vector-rich content structures, JSON-LD micro-data, and entity seeds so modern LLMs (ChatGPT, Gemini) fetch and recommend your enterprise.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
