import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Calendar, User, Clock, ArrowRight, ArrowLeft, Sparkles, BookOpen, Tag, Code, Send, RefreshCw, Layers } from "lucide-react";
import ElectricBorder from "./ElectricBorder";
import { useNavigation } from "../context/NavigationContext";

import { BLOG_POSTS, BlogPost, getBlogSections, getRelatedPosts } from "../data/blogPosts";

export default function Blog() {
  const { setCurrentPage, activeBlogPostId, setActiveBlogPostId } = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // AI Generator Simulator State
  const [generatorInput, setGeneratorInput] = useState("");
  const [generatedDraft, setGeneratedDraft] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const activePost = BLOG_POSTS.find(p => p.id === activeBlogPostId) || null;

  if (activePost) {
    return (
      <div className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-12 bg-zinc-950 text-zinc-100 transition-colors duration-300 animate-fadeIn">
        {/* Back Button */}
        <div className="flex items-center justify-start">
          <button 
            onClick={() => {
              setActiveBlogPostId(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group font-mono text-xs text-emerald-500 hover:text-emerald-600 font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> BACK TO ALL GUIDES
          </button>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <span className="font-mono text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">
            {activePost.category}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-normal leading-tight text-zinc-900 dark:text-white">
            {activePost.title}
          </h1>
          <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-400">
            <span>BY {activePost.author}</span>
            <span>•</span>
            <span>{activePost.date}</span>
            <span>•</span>
            <span>{activePost.readTime}</span>
          </div>
        </div>

        {/* Main content grids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-zinc-200/60 dark:border-zinc-900">
          {/* Main article body column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* A. ThinkSarath AI SEO Framework™ Section (Cornerstone Links) */}
            <section className="bg-emerald-500/[0.04] dark:bg-emerald-500/[0.02] border border-emerald-500/20 rounded-2xl p-5 text-zinc-800 dark:text-zinc-200" aria-label="ThinkSarath AI SEO Framework">
              <div className="flex items-center gap-2 mb-2.5">
                <Layers className="w-4 h-4 text-emerald-500 animate-pulse" />
                <h3 className="font-sans text-xs font-bold tracking-wider text-zinc-900 dark:text-emerald-400 uppercase">
                  ThinkSarath AI SEO Framework™
                </h3>
              </div>
              <p className="font-serif text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-light mb-3">
                This dynamic guide serves as a key informational node of the proprietary <strong>ThinkSarath Method™</strong>. Achieving permanent search dominance across ChatGPT, Gemini, and Google Search Overviews requires integrating deep on-page entity links with database-backed scaling schemas.
              </p>
              <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono border-t border-emerald-500/10 pt-2.5">
                <span className="text-zinc-400">Cornerstone Hubs:</span>
                <button 
                  onClick={() => { setActiveBlogPostId(null); setCurrentPage("about"); }}
                  className="text-emerald-500 hover:underline cursor-pointer bg-transparent border-none p-0 font-semibold"
                >
                  About &amp; Biography &rarr;
                </button>
                <button 
                  onClick={() => { setActiveBlogPostId(null); setCurrentPage("services"); }}
                  className="text-emerald-500 hover:underline cursor-pointer bg-transparent border-none p-0 font-semibold"
                >
                  Bespoke Services &rarr;
                </button>
                <button 
                  onClick={() => { setActiveBlogPostId(null); setCurrentPage("frameworks"); }}
                  className="text-emerald-500 hover:underline cursor-pointer bg-transparent border-none p-0 font-semibold"
                >
                  Proprietary Method™ &rarr;
                </button>
              </nav>
            </section>

            {/* B. Table of Contents with smooth scroll & optimized anchor keywords */}
            <nav className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/40 dark:border-zinc-900 space-y-3" aria-label="Table of contents">
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-emerald-500" />
                <h3 className="font-sans text-xs font-bold tracking-widest text-zinc-900 dark:text-zinc-200 uppercase">
                  Table of Contents
                </h3>
              </div>
              <ul className="space-y-2.5 pt-1 font-serif text-[13px]">
                {getBlogSections(activePost).map((sect, sIdx) => (
                  <li key={sect.id} className="group flex items-start gap-2">
                    <span className="font-mono text-[9px] text-emerald-500 font-bold pt-0.5">
                      0{sIdx + 1}
                    </span>
                    <a 
                      href={`#${sect.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const targetEl = document.getElementById(sect.id);
                        if (targetEl) {
                          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:underline transition-colors leading-snug"
                    >
                      {sect.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* C. Long-form Post Content sections using semantic HTML5 tags */}
            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
              {getBlogSections(activePost).map((sect) => (
                <section key={sect.id} id={sect.id} className="space-y-3.5 scroll-mt-20">
                  <h2 className="font-serif text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white leading-snug">
                    {sect.heading}
                  </h2>
                  <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light whitespace-pre-line">
                    {sect.content}
                  </p>
                </section>
              ))}
              <section className="pt-2 font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                Maintaining structural relevance ensures Google, Bing, and AI crawlers map your entity seamlessly. Our methodologies are engineered around actual crawler behaviors, protecting search assets from sudden indexing wipes.
              </section>
            </div>

            {/* D. Premium Author Bio Card */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-900 flex flex-col md:flex-row gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono text-lg font-bold shrink-0 border border-emerald-500/20">
                SB
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-semibold text-zinc-900 dark:text-white">Sarath Babu K</h4>
                  <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest font-semibold">Founder of ThinkSarath</p>
                </div>
                <p className="font-serif text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                  Sarath Babu K is an AI SEO Consultant, digital marketer, and educator. He specializes in Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and programmatic scaling strategies (pSEO). Through bespoke advising and proprietary methodologies, he connects commercial websites with high-intent audiences on next-generation search systems.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 font-mono text-[10px]">
                  <span className="text-zinc-400">Explore Cornerstone Hubs:</span>
                  <button 
                    onClick={() => { setActiveBlogPostId(null); setCurrentPage("about"); }}
                    className="text-emerald-500 hover:underline cursor-pointer bg-transparent border-none p-0 font-semibold"
                  >
                    About Sarath &rarr;
                  </button>
                  <button 
                    onClick={() => { setActiveBlogPostId(null); setCurrentPage("services"); }}
                    className="text-emerald-500 hover:underline cursor-pointer bg-transparent border-none p-0 font-semibold"
                  >
                    Bespoke Services &rarr;
                  </button>
                  <button 
                    onClick={() => { setActiveBlogPostId(null); setCurrentPage("frameworks"); }}
                    className="text-emerald-500 hover:underline cursor-pointer bg-transparent border-none p-0 font-semibold"
                  >
                    Proprietary Method™ &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* E. Tags list */}
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-900 flex flex-wrap gap-2">
              {activePost.tags.map(t => (
                <span key={t} className="font-mono text-[10px] px-3 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-900 text-zinc-500 rounded">
                  #{t}
                </span>
              ))}
            </div>

          </div>

          {/* Sidebar Column: Semantic Topic Cluster Widget */}
          <div className="lg:col-span-4 lg:sticky lg:top-4 h-fit space-y-6">
            
            <aside className="space-y-6" aria-label="Semantic Topic Cluster">
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/40 dark:border-zinc-900 space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <h3 className="font-sans text-xs font-bold tracking-widest text-zinc-900 dark:text-zinc-200 uppercase">
                    Semantic Topic Clusters
                  </h3>
                </div>
                <p className="font-serif text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                  Explore related research threads targeting core entities (SEO, AEO, GEO, &amp; AI Marketing) to expand your topical coverage index.
                </p>

                <div className="space-y-3 pt-2">
                  {getRelatedPosts(activePost).map(rp => (
                    <div 
                      key={rp.id}
                      onClick={() => {
                        setActiveBlogPostId(rp.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="group p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-900 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-all cursor-pointer space-y-1.5"
                    >
                      <span className="font-mono text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded uppercase font-semibold">
                        {rp.category}
                      </span>
                      <h4 className="font-serif text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors line-clamp-2 leading-snug">
                        {rp.title}
                      </h4>
                      <p className="font-serif text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-1 font-light">
                        {rp.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entity Knowledge Graph Badges / Visualizer */}
              <div className="p-5 rounded-2xl bg-zinc-900 text-white border border-zinc-800 space-y-3 font-mono text-[10px]">
                <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-2">
                  <Code className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-zinc-400 font-semibold tracking-wider">ENTITY METRIC GRAPH</span>
                </div>
                <div className="space-y-1.5 text-zinc-400">
                  <div className="flex justify-between">
                    <span>Verified Entity Node:</span>
                    <span className="text-emerald-400">ThinkSarath</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Associated Authority:</span>
                    <span className="text-zinc-100">Sarath Babu K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entity Overlap Index:</span>
                    <span className="text-zinc-100">0.94 (Optimal)</span>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    );
  }

  const posts: BlogPost[] = BLOG_POSTS;

  const handleSimulateGenerate = () => {
    if (!generatorInput.trim()) return;
    setIsGenerating(true);
    setGeneratedDraft(null);

    setTimeout(() => {
      const newDraft = {
        title: `Comprehensive SEO Blueprint: ${generatorInput}`,
        targetKeywords: [
          `${generatorInput} services`,
          `best ${generatorInput} expert`,
          `how to scale ${generatorInput}`,
          `affordable ${generatorInput} packages`
        ],
        entityTags: ["Digital Marketing", "AI Search Engine", "Programmatic SEO", "Citations Node"],
        pSEOTaxonomy: {
          slugStructure: `/solutions/ps-${generatorInput.toLowerCase().replace(/\s+/g, "-")}`,
          databaseVariables: ["CityName", "BudgetTier", "DeliveryTimeframe"]
        },
        suggestedOutline: [
          "1. Executive Overview & Primary Constraints",
          "2. Crucial Strategic Metrics & ROI Mappings",
          "3. Advanced AI Overviews (AEO) Citation Seeding",
          "4. Relational Database Scalability Blueprint"
        ]
      };

      setGeneratedDraft(newDraft);
      setIsGenerating(false);

      // Save to MySQL database via full-stack API
      const draftPayload = {
        title: newDraft.title,
        category: "AI SEO Strategy Blueprint",
        prompt: generatorInput,
        content: `Target Keywords: ${newDraft.targetKeywords.join(", ")}\n\nGEO Entity Tags: ${newDraft.entityTags.join(", ")}\n\nTaxonomy: ${newDraft.pSEOTaxonomy.slugStructure}\n\nOutline:\n${newDraft.suggestedOutline.join("\n")}`
      };

      fetch("/api/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftPayload)
      })
      .then(res => res.json())
      .then(data => console.log("Blueprint draft persisted:", data))
      .catch(err => console.error("Failed to save blueprint draft:", err));

    }, 2000);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-24 bg-zinc-950 text-zinc-100 transition-colors duration-300">
      
      {/* 1. Header & Intro */}
      <section className="text-center max-w-3xl mx-auto space-y-5">
        <span className="font-mono text-xs text-emerald-500 uppercase tracking-[0.25em] font-semibold">
          AI SEO INSIGHTS
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight text-zinc-900 dark:text-white">
          ThinkSarath Digest | <span className="font-semibold text-emerald-500">AI SEO & pSEO Guides</span>
        </h1>
        <p className="font-serif text-lg text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
          Technical digital growth briefs, programmatic frameworks, and search engine optimization guides for scaling enterprises.
        </p>
      </section>

      {/* 2. Interactive AI SEO Outline Generator Widget */}
      <section className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-900 rounded-3xl p-8 md:p-12 relative overflow-hidden" id="outline-generator-widget">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-2">
            <span className="font-mono text-[9px] text-emerald-500 uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              INTELLIGENT AI GROWTH TOOL
            </span>
            <h2 className="font-serif text-3xl font-normal text-zinc-900 dark:text-white">
              AI SEO, GEO & AEO Strategy Builder
            </h2>
            <p className="font-serif text-sm text-zinc-500 dark:text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
              Test drive Sarath's AI methodology. Enter your primary business niche or service below, and simulate how our content orchestration system constructs target schemas.
            </p>
          </div>

          <div className="flex gap-3 bg-white dark:bg-zinc-950 p-2 rounded-2xl border border-zinc-200/60 dark:border-zinc-900 shadow-sm">
            <input 
              type="text"
              value={generatorInput}
              onChange={(e) => setGeneratorInput(e.target.value)}
              placeholder="e.g. Luxury Real Estate Erode, Dental Clinic Chennai, SaaS Analytics"
              className="flex-1 bg-transparent px-4 py-2 text-sm font-mono focus:outline-none text-zinc-800 dark:text-zinc-200"
            />
            <button 
              onClick={handleSimulateGenerate}
              disabled={isGenerating || !generatorInput.trim()}
              className="cursor-pointer px-6 py-2.5 rounded-xl bg-emerald-500 disabled:bg-zinc-300 dark:disabled:bg-zinc-900 disabled:text-zinc-500 hover:bg-emerald-600 text-black font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 transition-all shrink-0"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Orchestrating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Map Content
                </>
              )}
            </button>
          </div>

          {/* Generator outputs display */}
          <AnimatePresence mode="wait">
            {generatedDraft && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 md:p-8 rounded-2xl bg-zinc-950 text-white border border-zinc-900 space-y-6"
              >
                <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                  <span className="font-mono text-[9px] text-emerald-400 tracking-widest font-bold uppercase">PROCESSED SCHEMA BLUEPRINT</span>
                  <span className="font-mono text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">API NODE v2.1</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left sub-column */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-[8px] text-zinc-500 uppercase">Target Title (Keyword Weighted):</span>
                      <p className="font-serif text-base font-semibold text-zinc-100">{generatedDraft.title}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[8px] text-zinc-500 uppercase">Core Keywords & Intents:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {generatedDraft.targetKeywords.map((kw: string, i: number) => (
                          <span key={i} className="font-mono text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-900">{kw}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[8px] text-zinc-500 uppercase">GEO Entity Graph Nodes:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {generatedDraft.entityTags.map((t: string, i: number) => (
                          <span key={i} className="font-mono text-[10px] text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-900/30">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right sub-column */}
                  <div className="space-y-4 bg-zinc-900/30 p-5 rounded-xl border border-zinc-900">
                    <div>
                      <span className="font-mono text-[8px] text-zinc-500 uppercase">Programmatic Taxonomy (pSEO):</span>
                      <div className="space-y-1.5 mt-1 font-mono text-[10px] text-zinc-300">
                        <div className="flex justify-between"><span className="text-zinc-500">Route:</span> <span className="text-emerald-400">{generatedDraft.pSEOTaxonomy.slugStructure}</span></div>
                        <div className="flex justify-between"><span className="text-zinc-500">Relational DB Vars:</span> <span>{generatedDraft.pSEOTaxonomy.databaseVariables.join(", ")}</span></div>
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[8px] text-zinc-500 uppercase">Suggested H2 Structure Outline:</span>
                      <ul className="space-y-1 mt-1 font-serif text-xs text-zinc-300">
                        {generatedDraft.suggestedOutline.map((item: string, i: number) => (
                          <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <a 
                    href="#contact" 
                    className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-semibold hover:underline flex items-center justify-center gap-1.5"
                  >
                    Implement this scalable blueprint &rarr;
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Blog Filter & List Grid */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-900 pb-6">
          {/* Categories select */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {["All", "AI SEO", "pSEO", "Paid Ads", "LinkedIn Brand"].map(cat => (
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

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guides or tags..."
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 dark:border-zinc-900 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20 text-xs font-mono focus:outline-none focus:border-emerald-500 text-zinc-800 dark:text-zinc-200"
            />
          </div>
        </div>

        {/* Dynamic List */}
        <div className="space-y-12" id="blog-listing">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <BookOpen className="w-12 h-12 text-zinc-300 dark:text-zinc-800 mx-auto" />
              <p className="font-serif text-sm text-zinc-500 italic">No search entries match your criteria.</p>
            </div>
          ) : (
            filteredPosts.map((post, idx) => (
              <motion.article 
                id={`blog-post-${post.id}`}
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/10 border border-zinc-200/50 dark:border-zinc-900/60 hover:border-emerald-500/30 dark:hover:border-emerald-500/10 transition-all duration-300"
              >
                {/* Side info columns */}
                <div className="lg:col-span-3 flex lg:flex-col items-start gap-4 lg:gap-5 font-mono text-[11px] text-zinc-500 border-b lg:border-b-0 lg:border-r border-zinc-200/50 dark:border-zinc-900 pb-4 lg:pb-0 lg:pr-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{post.readTime}</span>
                  </div>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{post.category}</span>
                </div>

                {/* Main content columns */}
                <div className="lg:col-span-9 space-y-4">
                  <h2 className="font-serif text-2xl md:text-3xl font-medium text-zinc-900 dark:text-white hover:text-emerald-500 transition-colors cursor-pointer" onClick={() => setActiveBlogPostId(post.id)}>
                    {post.title}
                  </h2>
                  <p className="font-serif text-sm text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map(t => (
                      <span key={t} className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => setActiveBlogPostId(post.id)}
                      className="font-mono text-xs text-emerald-500 hover:text-emerald-600 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      READ DETAILED WRITE-UP <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
