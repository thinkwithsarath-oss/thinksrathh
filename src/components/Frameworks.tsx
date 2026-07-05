import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  CheckCircle, 
  BookOpen, 
  Cpu, 
  TrendingUp, 
  Award, 
  User, 
  FileText, 
  Bookmark, 
  Zap, 
  Globe, 
  Mail, 
  ListTodo, 
  Search, 
  ChevronRight, 
  ArrowRight,
  Database,
  Lock,
  Compass,
  ArrowUpRight
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Frameworks() {
  const { language } = useLanguage();
  const isTa = language === "ta";

  // Selected sub-page state
  const [activeTab, setActiveTab] = useState<string>("about-brand");
  const [checklistState, setChecklistState] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const toggleChecklist = (index: number) => {
    setChecklistState(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Search filter for glossary
  const [glossarySearch, setGlossarySearch] = useState("");

  const glossaryItems = [
    { term: "GEO (Generative Engine Optimization)", definition: "The strategic practice of optimizing web structures, factual references, and brand citations so that LLM crawlers (like Gemini, ChatGPT, Claude) accurately synthesize and recommend your brand in generated answers." },
    { term: "AEO (Answer Engine Optimization)", definition: "Optimizing content format specifically for conversational query engines, emphasizing highly structured direct answers, Q&A schemas, and high-relevance direct citation targets." },
    { term: "pSEO (Programmatic SEO)", definition: "Building database-driven, highly optimized, and lightweight landing page directories to capture mass volumes of granular transactional long-tail keywords with perfect search intent matching." },
    { term: "Entity Node", definition: "A distinct, uniquely identifiable concept, brand, or person in Google's Knowledge Graph. AI search engines retrieve information by connecting relationships between these verified node parameters." },
    { term: "sameAs Schema", definition: "A specific structured data property in JSON-LD markup linking a webpage or person to verified external authority URLs (such as LinkedIn, Wikipedia, or corporate registries) to eliminate identity ambiguity." },
    { term: "Conversational Search", definition: "The paradigm shift where users query in natural conversational sentences instead of isolated keywords, requiring websites to align with conversational semantics and query context." },
    { term: "Crawl Budget", definition: "The maximum number of pages a search engine robot crawls within a given timeframe. ThinkSarath minimizes server bloat so search crawlers index high-value pages with zero latency." },
    { term: "LLM Web Crawlers", definition: "Bots deployed by AI developers (e.g., Google-Extended, GPTBot, ClaudeBot) that crawl the web to gather training datasets or real-time ground truth for generative outputs." }
  ];

  const filteredGlossary = glossaryItems.filter(item => 
    item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    item.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  const tabs = [
    { id: "about-brand", label: isTa ? "திங்சரத் பற்றி" : "About ThinkSarath", icon: Layers },
    { id: "about-sarath", label: isTa ? "சரத் பாபு கே" : "About Sarath Babu K", icon: User },
    { id: "why-exists", label: isTa ? "ஏன் திங்சரத்?" : "Why ThinkSarath Exists", icon: Compass },
    { id: "method-ai", label: isTa ? "ஏஐ தேடல் முறைமை™" : "ThinkSarath Method™", icon: Cpu },
    { id: "seo-framework", label: isTa ? "எஸ்சிஓ கட்டமைப்பு™" : "SEO Framework™", icon: TrendingUp },
    { id: "geo-framework", label: isTa ? "ஜிஇஓ கட்டமைப்பு™" : "GEO Framework™", icon: Sparkles },
    { id: "aeo-framework", label: isTa ? "ஏஇஓ கட்டமைப்பு™" : "AEO Framework™", icon: Zap },
    { id: "ai-checklist", label: isTa ? "ஏஐ எஸ்சிஓ சரிபார்ப்பு" : "AI SEO Checklist", icon: ListTodo },
    { id: "resource-hub", label: isTa ? "வள மையம்" : "Resource Hub", icon: BookOpen },
    { id: "case-studies", label: isTa ? "கேஸ் ஸ்டடீஸ்" : "Case Studies", icon: FileText },
    { id: "research-reports", label: isTa ? "ஆராய்ச்சி அறிக்கைகள்" : "Research Reports", icon: Award },
    { id: "ai-tools", label: isTa ? "ஏஐ கருவிகள் கோப்பு" : "AI Tools Directory", icon: Database },
    { id: "glossary-terms", label: isTa ? "சொற்களஞ்சியம்" : "Glossary of AI SEO", icon: Bookmark },
    { id: "learning-center", label: isTa ? "பயிற்சி மையம்" : "Learning Center", icon: Award },
    { id: "newsletter-sub", label: isTa ? "செய்திமடல்" : "Newsletter Briefs", icon: Mail }
  ];

  return (
    <section className="pt-32 pb-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Page Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-900 pb-12 mb-12">
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              THINKSARATH BRAND ENTITY & PROPRIETARY INTELLECT
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight text-zinc-900 dark:text-white">
              The ThinkSarath <span className="font-semibold text-emerald-500">Method™ & Frameworks</span>
            </h1>
            <p className="font-serif text-lg text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Bespoke search strategies, AEO schemas, and Generative Engine Optimization models engineered directly by Sarath Babu K to reinforce absolute entity clarity for search spiders and LLM crawlers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Navigation Sidebar List */}
          <div className="lg:col-span-4 space-y-1.5 lg:sticky lg:top-28">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900 mb-4">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-semibold mb-1">
                ENTITY STRUCTURE INDEX
              </h4>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Click any node below to load the verified brand authority dataset, optimized for crawlers.
              </p>
            </div>

            <div className="space-y-1 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    id={`tab-btn-${tab.id}`}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-250 cursor-pointer border ${
                      isActive 
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium shadow-sm"
                        : "bg-transparent border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-emerald-500" : "text-zinc-400"}`} />
                      <span className="font-mono text-xs tracking-tight">{tab.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform shrink-0 ${isActive ? "translate-x-0.5 text-emerald-500" : "opacity-0 group-hover:opacity-100 text-zinc-400"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Content Display Area */}
          <div className="lg:col-span-8">
            <div className="p-8 md:p-10 rounded-2xl bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 relative overflow-hidden min-h-[500px]">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/[0.01] rounded-full blur-[80px] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* TAB 1: ABOUT THINKSARATH */}
                  {activeTab === "about-brand" && (
                    <div className="space-y-6" id="about-brand-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Brand Profile
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Node: ThinkSarath</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        ThinkSarath Brand Entity
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        <strong>ThinkSarath</strong> is the premium personal brand of Sarath Babu K, a highly sought-after AI Digital Marketer, Generative Engine Optimization (GEO) Consultant, and Answer Engine Optimization (AEO) specialist.
                      </p>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        Operating at the convergence of traditional organic SEO and cutting-edge artificial intelligence, ThinkSarath assists fast-growth companies, founders, and premium regional agencies to ensure their service footprint is cleanly indexed, mapped, and highly cited within conversational LLMs (such as ChatGPT, Google Gemini, Anthropic Claude, and Perplexity) as well as traditional Google search channels.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-900/60">
                          <h4 className="font-mono text-xs font-semibold text-zinc-900 dark:text-white uppercase mb-2">
                            Core Mission
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Bypass shallow vanity metrics to engineer pure mathematical growth and high-intent conversions for elite brands globally.
                          </p>
                        </div>
                        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-900/60">
                          <h4 className="font-mono text-xs font-semibold text-zinc-900 dark:text-white uppercase mb-2">
                            Core Capabilities
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Advanced Schema Synthesis, Programmatic SEO Systems, AEO Conversational Maps, GEO Crawler Ingestion, and High-ROI Paid Search.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: ABOUT SARATH BABU K */}
                  {activeTab === "about-sarath" && (
                    <div className="space-y-6" id="about-sarath-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Individual Entity
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Node: Sarath Babu K</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        Sarath Babu K
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        Sarath Babu K is a distinguished digital marketing engineer, strategic SEO advisor, and AI marketing educator based in Chennai, South India. With a robust background in technical programming, speed-optimized WordPress deployment, and mass search crawling mechanics, Sarath serves as the operational mind behind numerous complex search engine transformations.
                      </p>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        In addition to guiding client accounts at <strong>ThinkSarath</strong>, Sarath leads advanced digital curriculum development as Head of Digital Marketing at <strong>Code99 IT Academy</strong> and provides intensive professional mentorship at <strong>ZenX Academy</strong>. His projects are designed around strict data-privacy standards, ensuring verified results without compromising client proprietary trade secrets.
                      </p>

                      <div className="border-t border-zinc-200 dark:border-zinc-900 pt-6 space-y-3">
                        <h4 className="font-mono text-xs text-zinc-900 dark:text-white font-semibold uppercase">
                          ACTIVE INTEGRATED AFFILIATIONS:
                        </h4>
                        <ul className="space-y-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                          <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span><strong>ThinkSarath</strong> — Founder & Chief Organic Growth Advisor</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span><strong>Code99 IT Academy</strong> — Head of Digital Marketing (Leadership & Strategic Search Systems)</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span><strong>ZenX Academy</strong> — Educator (Hands-on Technical SEO & Marketing Automation)</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span><strong>LuMay AI</strong> — AI & Search Marketing Projects (Conversational LLM optimization research)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: WHY THINKSARATH EXISTS */}
                  {activeTab === "why-exists" && (
                    <div className="space-y-6" id="why-exists-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Brand Philosophy
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Paradigm Shift</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        Why ThinkSarath Exists
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        Modern digital marketing has become dangerously superficial. Traditional agencies frequently sell generic traffic, bot clicks, and superficial ranking metrics that do not generate commercial growth. Meanwhile, search engines have evolved past mere keyword indexing. Today, AI engines read and synthesize content directly, changing how information is served.
                      </p>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        <strong>ThinkSarath</strong> was founded to offer a mathematical, transparent alternative. We treat search as a highly structured database architecture. By building pages optimized for machine ingestion, semantic search engines, and AI models, we protect premium client companies from obsolete keyword spam and align them precisely with how search works today.
                      </p>

                      <div className="p-6 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850">
                        <p className="font-serif text-sm text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                          "If an AI search engine cannot extract your brand's unique capabilities within a millisecond crawl, your digital footprint does not exist. We bridge the gap between human genius and algorithmic ingestion."
                        </p>
                        <span className="block font-mono text-[10px] text-emerald-500 uppercase tracking-wider mt-3 font-semibold">
                          — Sarath Babu K, Founder
                        </span>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: THINKSARATH METHOD™ FOR AI SEARCH */}
                  {activeTab === "method-ai" && (
                    <div className="space-y-6" id="method-ai-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Operational System
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Patent-Pending Approach</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium font-semibold flex items-center gap-2">
                        ThinkSarath Method™ <span className="text-zinc-400 font-light text-xl">for AI Search</span>
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        The <strong>ThinkSarath Method™</strong> is a robust, data-scientific, four-tiered ingestion and search indexation orchestration pipeline that transforms static digital assets into highly recognizable sameAs entity structures.
                      </p>

                      {/* Timeline steps */}
                      <div className="space-y-6 pt-2">
                        {[
                          { step: "01", title: "Semantic Entity Mapping", desc: "We convert unstructured web data into schema-rich nodes. By adding absolute sameAs declarations, we resolve ambiguity and link your personal brand directly to your institutional achievements." },
                          { step: "02", title: "Conversational Intent Seeding", desc: "Rather than targeting isolated keywords, we seed direct Q&A structures across authoritative pages, preparing your content to match conversational questions posed to Voice or LLM platforms." },
                          { step: "03", title: "Generative Citation Engineering (GEO)", desc: "We style web elements with optimized facts and citations to trigger high retrieval probability during LLM crawler sweeps, ensuring your brand is cited in AI Overviews." },
                          { step: "04", title: "Programmatic Scale Deployment (pSEO)", desc: "We orchestrate database systems to safely publish hundreds of fast, structured long-tail pages that capture intent at scale without triggering crawl errors." }
                        ].map((m, i) => (
                          <div key={i} className="flex gap-4 items-start">
                            <span className="font-mono text-sm bg-emerald-500/15 text-emerald-500 px-2.5 py-1 rounded-md font-bold shrink-0">
                              {m.step}
                            </span>
                            <div className="space-y-1">
                              <h4 className="font-sans text-sm font-semibold text-zinc-900 dark:text-white">
                                {m.title}
                              </h4>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                {m.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 5: THINKSARATH SEO FRAMEWORK™ */}
                  {activeTab === "seo-framework" && (
                    <div className="space-y-6" id="seo-framework-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Organic Search Model
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Framework: SEO</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium flex items-center gap-2">
                        ThinkSarath SEO Framework™
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        Our foundational SEO model focuses on structural hygiene, crawl efficiency, and strict topical clusters. It consists of five major structural pillars:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {[
                          { title: "Topical Cluster Domination", desc: "Structuring pages under clear parent-child directory pathways to signal absolute authority on specific focus niches." },
                          { title: "Mathematical Speed Standards", desc: "Stripping unnecessary code so your landing page loads in under 0.8 seconds with perfect Core Web Vitals." },
                          { title: "Advanced Semantic Schemas", desc: "Injecting thorough JSON-LD markup to explicitly define every service, founder relationship, and address parameters." },
                          { title: "Intent-Based Optimization", desc: "Aligning user keyword intent (informational, transactional, commercial) to precise visual and copy structures." },
                          { title: "Entity Citation Networks", desc: "Building organic relationship links to establish authoritative credibility in Google's Knowledge Graph." }
                        ].map((p, i) => (
                          <div key={i} className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900/60 flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <h5 className="font-mono text-xs font-semibold text-zinc-900 dark:text-white uppercase">{p.title}</h5>
                              <p className="text-[11px] text-zinc-500 leading-normal">{p.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 6: THINKSARATH GEO FRAMEWORK™ */}
                  {activeTab === "geo-framework" && (
                    <div className="space-y-6" id="geo-framework-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Generative AI Search
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Framework: GEO</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        ThinkSarath GEO Framework™
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        <strong>Generative Engine Optimization (GEO)</strong> is the essential evolution of digital visibility. When users ask ChatGPT, Perplexity, Gemini, or Claude for advice, these models synthesize immediate custom responses with footnotes. We ensure your brand is their primary source.
                      </p>

                      <div className="space-y-4 pt-2">
                        <div className="flex items-start gap-3.5">
                          <Sparkles className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                          <div className="space-y-1">
                            <h4 className="font-sans text-sm font-semibold text-zinc-900 dark:text-white">Facts & Data Structuring</h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                              LLMs look for structured facts, numbers, and clear datasets. We translate your text into table indexes, bulleted parameters, and quantitative metrics that crawlers easily parse.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3.5">
                          <Globe className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                          <div className="space-y-1">
                            <h4 className="font-sans text-sm font-semibold text-zinc-900 dark:text-white">Co-Citation Planting</h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                              We place mentions of your brand alongside established leaders in your industry vertical, forming logical semantic associations that AI model retrievers connect together.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3.5">
                          <Lock className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                          <div className="space-y-1">
                            <h4 className="font-sans text-sm font-semibold text-zinc-900 dark:text-white">Information Freshness Nodes</h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                              Generative search engines value fresh real-time information. We implement automatic date structures and periodic factual revisions to signal constant, verified accuracy.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 7: THINKSARATH AEO FRAMEWORK™ */}
                  {activeTab === "aeo-framework" && (
                    <div className="space-y-6" id="aeo-framework-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Conversational Optimization
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Framework: AEO</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        ThinkSarath AEO Framework™
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        <strong>Answer Engine Optimization (AEO)</strong> is designed to capture zero-click positions on Google, Apple Siri, Amazon Alexa, and smart voice systems. By optimizing for highly specific question semantics, we make your brand the single direct answer.
                      </p>

                      <div className="border-l-2 border-emerald-500 pl-4 py-1 my-4 bg-zinc-100/50 dark:bg-zinc-900/40 p-4 rounded-r-lg">
                        <h4 className="font-mono text-xs text-zinc-900 dark:text-white font-semibold uppercase mb-1">
                          The AEO Direct-Answer Formula
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          Define the user's conversational question in a concise, authoritative heading. Immediately follow it with a 45-to-55 word direct answer block containing schema annotations.
                        </p>
                      </div>

                      <ul className="space-y-3 pt-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <li className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Strict integration of verified `FAQPage` and `Question` schema nodes.</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Content structures that align with conversational "How to", "Why", and "Where can I" questions.</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Highly concise phrasing to maximize compatibility with modern voice-activated systems.</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* TAB 8: THINKSARATH AI SEO CHECKLIST */}
                  {activeTab === "ai-checklist" && (
                    <div className="space-y-6" id="ai-checklist-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Interactive Diagnostic
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Audit Checklist</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        ThinkSarath AI SEO Checklist
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        Use our interactive tool to evaluate your brand's readiness for Google's Search Generative Experience and conversational LLM search models.
                      </p>

                      <div className="space-y-3 pt-2" id="interactive-checklist">
                        {[
                          "JSON-LD Person and sameAs schemas explicitly declare all relationships.",
                          "Core Web Vitals scores are consistently green on mobile viewports.",
                          "FAQ elements use explicit direct answer patterns (45-55 word structure).",
                          "Unstructured brand mentions are supported by authoritative citation links.",
                          "Database pSEO landing pages use clean, lightweight WordPress frameworks.",
                          "Robots.txt safely allows extraction by AI crawlers (Google-Extended/GPTBot).",
                          "LinkedIn profiles use verified expertise badges to establish digital entity weight."
                        ].map((item, idx) => (
                          <div 
                            key={idx}
                            onClick={() => toggleChecklist(idx)}
                            className={`p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                              checklistState[idx]
                                ? "bg-emerald-500/5 border-emerald-500/20 text-zinc-800 dark:text-zinc-200"
                                : "bg-white dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-900 text-zinc-500"
                            }`}
                          >
                            <input 
                              type="checkbox"
                              checked={!!checklistState[idx]}
                              onChange={() => {}} // Handled by onClick
                              className="accent-emerald-500 cursor-pointer shrink-0"
                            />
                            <span className="text-xs font-mono leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 9: THINKSARATH RESOURCE HUB */}
                  {activeTab === "resource-hub" && (
                    <div className="space-y-6" id="resource-hub-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Free Intellectual Assets
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Resource Library</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        ThinkSarath Resource Hub
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        Access our curated collection of technical blueprints, schema builders, and AI-optimized template files.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {[
                          { title: "JSON-LD Entity Templates", format: "JSON / Schema", desc: "Download validated Person and Organization schema schemas ready for custom integration." },
                          { title: "GEO Content Directives", format: "PDF Guide", desc: "A detailed list of structural formulas to optimize webpage components for LLM search scrapers." },
                          { title: "Robots.txt Safety Setup", format: "TXT Blueprint", desc: "Configure your robots.txt file to balance AI data collection with indexing efficiency." },
                          { title: "pSEO Database Schemes", format: "XLSX Blueprint", desc: "A spreadsheet model to map out hundreds of target keywords into cohesive page structures." }
                        ].map((r, i) => (
                          <div key={i} className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900/60 relative group">
                            <div className="flex justify-between items-start gap-4 mb-2">
                              <span className="font-mono text-[9px] text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
                                {r.format}
                              </span>
                              <Compass className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <h4 className="font-sans text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                              {r.title}
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                              {r.desc}
                            </p>
                            <button className="text-[10px] font-mono text-emerald-500 hover:text-emerald-400 font-semibold flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer">
                              RESERVE ACCESS <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 10: THINKSARATH CASE STUDIES */}
                  {activeTab === "case-studies" && (
                    <div className="space-y-6" id="case-studies-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Client Benchmarks
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Case Studies</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        ThinkSarath Case Studies
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        Explore verified performance breakdowns where mathematical rigor successfully bypassed common vanity metrics.
                      </p>

                      <div className="space-y-4 pt-2">
                        {[
                          { title: "B2B SaaS Conversational Citation Scale", niche: "GEO & Entity Seeding", outcome: "340% increase in generative search recommendations", details: "By mapping direct entity linkages and seeding clear definitions, this company achieved primary citations across major generative AI search models." },
                          { title: "Mass Programmatic Directory Launch", niche: "pSEO Integration", outcome: "4.5M monthly organic impressions", details: "Structured database layouts built on lightweight custom WordPress templates allowed rapid page crawling and indexation without performance bottlenecks." }
                        ].map((c, i) => (
                          <div key={i} className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900/60 space-y-3">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <span className="font-mono text-[9px] text-emerald-500 uppercase tracking-widest block font-semibold">{c.niche}</span>
                                <h4 className="font-sans text-sm font-semibold text-zinc-900 dark:text-white mt-1">{c.title}</h4>
                              </div>
                              <span className="font-mono text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded">
                                {c.outcome}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                              {c.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 11: THINKSARATH RESEARCH REPORTS */}
                  {activeTab === "research-reports" && (
                    <div className="space-y-6" id="research-reports-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Industry Intelligence
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Whitepapers</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        ThinkSarath Research Reports
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        Technical studies on search crawler behaviors, LLM citation retrieval logic, and semantic intent modeling.
                      </p>

                      <div className="space-y-4 pt-2">
                        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900/60">
                          <h4 className="font-sans text-sm font-semibold text-zinc-900 dark:text-white mb-2 flex items-center justify-between">
                            <span>LLM Web Crawler Behavior Audit</span>
                            <span className="font-mono text-[9px] text-zinc-400">JULY 2026</span>
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            An analysis monitoring how often bots like GPTBot and Google-Extended crawl schema endpoints. Our tests confirm that pages with detailed Person schema receive 40% more frequent visits.
                          </p>
                        </div>

                        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900/60">
                          <h4 className="font-sans text-sm font-semibold text-zinc-900 dark:text-white mb-2 flex items-center justify-between">
                            <span>SGE Ingestion Patterns</span>
                            <span className="font-mono text-[9px] text-zinc-400">MAY 2026</span>
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            How Google’s search-generative interfaces retrieve local business facts. It proves that local GMB reviews with specific industry keywords are primary local citation targets.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 12: THINKSARATH AI TOOLS DIRECTORY */}
                  {activeTab === "ai-tools" && (
                    <div className="space-y-6" id="ai-tools-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Interactive Toolbox
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">AI Database</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        ThinkSarath AI Tools Directory
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        A curated database of vetted artificial intelligence platforms and custom tools used to build, audit, and measure modern digital marketing campaigns.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        {[
                          { name: "Schema Builder", cat: "Technical SEO", desc: "Generate validated JSON-LD scripts with zero markup errors." },
                          { name: "GEO Auditor", cat: "AI Search", desc: "Check if your content is optimized for LLM retrievers." },
                          { name: "Speed Optimizer", cat: "WordPress Core", desc: "Clean up heavy databases and optimize page load speed." },
                          { name: "pSEO Architect", cat: "Database SEO", desc: "Plan hundreds of landing pages with simple data maps." },
                          { name: "Prompt Engineer", cat: "AI Workflow", desc: "Build tailored prompts to streamline content workflows." },
                          { name: "Crawl Monitor", cat: "Hygiene", desc: "Track search bot activity across your folders." }
                        ].map((t, i) => (
                          <div key={i} className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900/60 space-y-2">
                            <span className="font-mono text-[8px] text-emerald-500 uppercase tracking-widest font-semibold">{t.cat}</span>
                            <h4 className="font-sans text-xs font-semibold text-zinc-900 dark:text-white">{t.name}</h4>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">{t.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 13: THINKSARATH GLOSSARY OF AI SEO TERMS */}
                  {activeTab === "glossary-terms" && (
                    <div className="space-y-6" id="glossary-terms-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Vocabulary Nodes
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Term Glossary</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        ThinkSarath Glossary of AI SEO Terms
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        A detailed list of modern industry terms to help you understand the next generation of search engine growth.
                      </p>

                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
                        <input 
                          type="text"
                          value={glossarySearch}
                          onChange={(e) => setGlossarySearch(e.target.value)}
                          placeholder="Filter terms (e.g. schema, GEO, pSEO)..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-900 text-xs font-mono focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-4 pt-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredGlossary.length > 0 ? (
                          filteredGlossary.map((g, i) => (
                            <div key={i} className="space-y-1 pb-3 border-b border-zinc-200/50 dark:border-zinc-900/60 last:border-b-0">
                              <h4 className="font-mono text-xs font-semibold text-zinc-900 dark:text-white">
                                {g.term}
                              </h4>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                {g.definition}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-zinc-500 font-mono italic">No terms found matching your query.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 14: THINKSARATH LEARNING CENTER */}
                  {activeTab === "learning-center" && (
                    <div className="space-y-6" id="learning-center-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Offline & Online Education
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Mentorship Channels</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        ThinkSarath Learning Center
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        Sarath Babu K provides structured training to upskill agencies, marketing managers, and independent builders.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900/60 space-y-3">
                          <h4 className="font-mono text-xs font-semibold text-zinc-900 dark:text-white uppercase flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            ZenX Academy
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Hybrid training on advanced automation workflows and conversion rate optimization (CRO). Designed for digital builders who want to streamline their execution.
                          </p>
                        </div>

                        <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900/60 space-y-3">
                          <h4 className="font-mono text-xs font-semibold text-zinc-900 dark:text-white uppercase flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Code99 IT Academy
                          </h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Hands-on, in-person training covering technical SEO, fast WordPress architecture, and modern paid ad frameworks. Based in Chennai, India.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 15: THINKSARATH NEWSLETTER */}
                  {activeTab === "newsletter-sub" && (
                    <div className="space-y-6" id="newsletter-sub-content">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-semibold">
                          Discreet Communication
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="font-mono text-xs text-zinc-500">Insights Delivery</span>
                      </div>
                      <h2 className="font-serif text-3xl text-zinc-900 dark:text-white font-medium">
                        ThinkSarath Newsletter
                      </h2>
                      <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                        Join an elite audience of digital marketing directors, agencies, and founders who receive our technical briefs directly in their inboxes.
                      </p>

                      <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900/60 space-y-4">
                        <h4 className="font-mono text-xs font-semibold text-zinc-900 dark:text-white uppercase">
                          SUBSCRIBE TO SEARCH GROWTH BRIEFS:
                        </h4>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input 
                            type="email"
                            placeholder="your.email@company.com"
                            className="flex-1 px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 text-xs font-mono focus:outline-none focus:border-emerald-500"
                          />
                          <button className="bg-zinc-950 hover:bg-zinc-900 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-black font-mono text-xs font-bold px-6 py-2.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                            SUBSCRIBE SECURELY
                          </button>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-normal">
                          We do not spam. All newsletters deliver raw, quantitative, actionable search engine optimization briefs curated solely by Sarath Babu K.
                        </p>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
