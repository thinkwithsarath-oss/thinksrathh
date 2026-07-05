import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Sparkles, MessageCircle, ArrowUpRight, Search, BookOpen } from "lucide-react";
import ElectricBorder from "./ElectricBorder";

interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "AI SEO & GEO" | "pSEO & WordPress" | "Mentorship & Brand";
}

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const faqs: FAQItem[] = [
    {
      category: "AI SEO & GEO",
      question: "What is GEO (Generative Engine Optimisation) and how does it work?",
      answer: "Generative Engine Optimization (GEO) is the technical process of preparing your website content and brand attributes so they are accurately retrieved and cited by Large Language Models (LLMs) such as ChatGPT, Claude, and Gemini in their search overviews (AEO). Unlike traditional SEO which targets standard links, GEO targets retrieval algorithms (RAG) by embedding high-quality structured micro-data, maintaining semantic entity density, and seeding citations in authoritative datasets."
    },
    {
      category: "pSEO & WordPress",
      question: "Is Programmatic SEO (pSEO) safe from Google algorithmic updates?",
      answer: "Yes, but only if engineered with absolute focus on content quality. Poor pSEO involves generic spinning, which Google filters out. Our programmatic SEO frameworks rely on high-fidelity, highly curated datasets (e.g., precise coordinates, regional parameters, genuine industry stats) injected into clean, fast WordPress templates. By managing crawl budgets, avoiding thin-content pages, and mapping genuine user-intent variations, our pSEO setups build immense, lasting search footprints."
    },
    {
      category: "Mentorship & Brand",
      question: "Do you offer physical in-person training in Chennai, or is it strictly online?",
      answer: "I offer both! Through my roles as Head of Digital Marketing at Code99 IT Academy and Trainer & Mentor at ZenX Academy, I conduct hybrid training structures. This includes hands-on online mentorship globally and focused physical bootcamps in Chennai, Tamil Nadu, for select enterprise cohorts, students, and digital marketing professionals looking to learn AI-integrated search systems."
    },
    {
      category: "Mentorship & Brand",
      question: "What is LinkedIn Profile Optimisation, and how does it help?",
      answer: "Your LinkedIn profile is your digital business card and is highly crawled by Google. LinkedIn Profile Optimization aligns your personal brand headline, featured section, experiences, and meta-data to rank at the top of both LinkedIn internal searches and Google. This includes guidance on securing specific industry skill badges, which signals premium, verified expertise to potential high-paying clients, partners, or founders."
    },
    {
      category: "pSEO & WordPress",
      question: "Why do you specialize specifically in WordPress Development?",
      answer: "WordPress powers over 40% of the web and has the most mature indexing API endpoints. I build bespoke, lightweight WordPress landing pages and directory structures stripped of bulky bloatware. This guarantees mobile speed scores of 95+ out of the box, structured page architecture, and perfect schema compliance, giving your business a solid, reliable foundation that search engine spiders crawl with absolute efficiency."
    },
    {
      category: "General",
      question: "What is your typical client engagement structure? Do you sign NDAs?",
      answer: "Yes, absolutely. Because I consult for premium institutions, founders, and specialized enterprises, 100% of my high-end advisory services are bound by rigid mutual Non-Disclosure Agreements (NDAs). This protects your proprietary growth datasets and digital footprints. Engagement is strictly on a premium monthly retainer framework with clear, actionable mathematical targets."
    },
    {
      category: "General",
      question: "How long does it take to see tangible organic traffic results?",
      answer: "For standard technical SEO audits and local GMB positioning, noticeable improvements often occur within 30 to 60 days as crawlers re-index optimized pages. For comprehensive Programmatic SEO networks or conversational AEO citation seeding, timelines are structured across a 3 to 6-month ramp-up phase to securely build authority and bypass spam-detection index thresholds safely."
    }
  ];

  const filteredFaqs = faqs.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* 1. Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-5">
        <span className="font-mono text-xs text-emerald-500 uppercase tracking-[0.25em] font-semibold">
          ALIGNED RESOLUTIONS
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight text-zinc-900 dark:text-white">
          AI SEO, GEO & <span className="font-semibold text-emerald-500">AEO Advisory FAQ</span> | ThinkSarath
        </h1>
        <p className="font-serif text-lg text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
          Uncompromised, transparent clarity regarding modern search engineering, programmatic systems, and local Chennai training.
        </p>
      </section>

      {/* 2. Interactive Search & Categorization Row */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-900 pb-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {["All", "General", "AI SEO & GEO", "pSEO & WordPress", "Mentorship & Brand"].map(cat => (
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

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by question keyword..."
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 dark:border-zinc-900 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20 text-xs font-mono focus:outline-none focus:border-emerald-500 text-zinc-800 dark:text-zinc-200"
            />
          </div>
        </div>

        {/* 3. Accordion Core Grid */}
        <div className="max-w-4xl mx-auto space-y-4" id="faq-accordions">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <BookOpen className="w-12 h-12 text-zinc-300 dark:text-zinc-800 mx-auto" />
              <p className="font-serif text-sm text-zinc-500 italic">No search entries match your queries.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div 
                  key={idx}
                  className="border border-zinc-200/60 dark:border-zinc-900 rounded-2xl overflow-hidden bg-zinc-50/40 dark:bg-zinc-900/10 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="w-full py-6 px-6 md:px-8 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <HelpCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="font-serif text-base md:text-lg font-medium text-zinc-900 dark:text-white">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transform transition-transform duration-300 ml-4 ${
                      isExpanded ? "rotate-180 text-emerald-500" : ""
                    }`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 px-6 md:px-8 pl-15 md:pl-17 border-t border-zinc-200/40 dark:border-zinc-900/40 pt-4">
                          <p className="font-serif text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                            {faq.answer}
                          </p>
                          <div className="mt-4 flex items-center gap-1.5 font-mono text-[9px] text-zinc-400 uppercase">
                            <span>SEGMENT:</span>
                            <span className="text-emerald-500 font-semibold">{faq.category}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 4. Bottom Custom Contact Prompt */}
      <section className="max-w-4xl mx-auto">
        <ElectricBorder
          className="p-8 md:p-10 bg-zinc-950 text-white rounded-3xl border border-zinc-900 shadow-2xl relative overflow-hidden"
          colors={["#10b981", "#3b82f6"]}
          duration={5}
          borderRadius="24px"
          glow={true}
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest font-bold">STILL HAVE INQUIRIES?</span>
              </div>
              <h3 className="font-serif text-2xl font-light">Connect for a Direct Briefing</h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
                If your technical queries or niche constraints aren't addressed above, schedule a secure, conflict-free pre-audit call with Sarath Babu K.
              </p>
            </div>

            <a
              href="#contact"
              className="cursor-pointer font-mono text-xs uppercase tracking-widest px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-95 text-black font-semibold flex items-center gap-2 transition-opacity shrink-0"
            >
              BOOK CALL SLOT <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </ElectricBorder>
      </section>

    </div>
  );
}
