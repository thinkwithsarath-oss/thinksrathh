import React, { useState } from "react";
import { SERVICES, Service } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles, Target, Settings, BrainCircuit, Landmark } from "lucide-react";

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>("seo");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextId = SERVICES[(index + 1) % SERVICES.length].id;
      document.getElementById(`service-trigger-${nextId}`)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevId = SERVICES[(index - 1 + SERVICES.length) % SERVICES.length].id;
      document.getElementById(`service-trigger-${prevId}`)?.focus();
    }
  };

  return (
    <section id="capabilities" className="py-28 bg-white dark:bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading & Luxury Introduction */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-20">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.25em]">Our Capabilities</p>
            <h2 className="font-serif text-4xl md:text-6xl text-zinc-900 dark:text-white font-normal mt-2 leading-[1.1]">
              Elite Digital Intelligence Channels
            </h2>
          </div>
          <div className="lg:max-w-md text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed pt-2">
            Algorithms change daily. Elite visibility depends on structured semantic data, robust site architecture, 
            and targeted distribution models. We design strategies to preserve your brand's luxury identity while expanding total capture rate.
          </div>
        </div>

        {/* Editorial Accordion Deck */}
        <div className="border-t border-zinc-200 dark:border-zinc-900" id="services-deck">
          {SERVICES.map((service, index) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                id={`service-row-${service.id}`}
                key={service.id}
                className="border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-350"
              >
                {/* Accordion Row Header */}
                <button
                  id={`service-trigger-${service.id}`}
                  onClick={() => toggleExpand(service.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={isExpanded}
                  aria-controls={`service-content-${service.id}`}
                  className="w-full py-8 flex flex-col md:flex-row items-start md:items-center justify-between text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg px-2 -mx-2 transition-all duration-300"
                >
                  <div className="flex items-center gap-6 md:gap-12 w-full">
                    {/* List Index */}
                    <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 transition-colors">
                      0{index + 1}.
                    </span>
                    
                    {/* Service & Category Block */}
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-16 w-full justify-between">
                      <h3 className="font-serif text-2xl md:text-3xl font-normal text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {service.title}
                      </h3>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] bg-zinc-100 dark:bg-zinc-900 text-zinc-500 px-3 py-1 rounded-full uppercase tracking-widest border border-zinc-200/40 dark:border-zinc-800">
                          {service.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Icon rotation */}
                  <div className="mt-4 md:mt-0 ml-16 md:ml-0 p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-all">
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-emerald-500" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Details Body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`service-content-${service.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pl-16 pr-6 md:pr-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Summary */}
                        <div className="lg:col-span-5 space-y-4">
                          <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
                            {service.description}
                          </p>
                          
                          {/* Performance Indicator Callout */}
                          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800 flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-serif font-bold text-lg">
                              KPI
                            </div>
                            <div>
                              <p className="font-mono text-[9px] text-zinc-400 uppercase">Target Projection</p>
                              <p className="font-serif text-sm font-semibold text-zinc-800 dark:text-white">{service.metrics}</p>
                            </div>
                          </div>
                        </div>

                        {/* Deliverables List */}
                        <div className="lg:col-span-4 space-y-3">
                          <h4 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                            Engineered Scope
                          </h4>
                          <ul className="space-y-2">
                            {service.keyPoints.map((point, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Luxury demographic contextual advisory statement */}
                        <div className="lg:col-span-3 bg-gradient-to-br from-emerald-50/60 to-transparent dark:from-emerald-950/10 dark:to-transparent p-5 rounded-2xl border border-emerald-100/30 dark:border-emerald-900/20 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              <Landmark className="w-3.5 h-3.5" />
                            </span>
                            <span className="font-serif text-xs font-semibold text-zinc-800 dark:text-zinc-200">Luxury Demography Alignment</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed italic">
                            {service.luxuryContext}
                          </p>
                          <a
                            href="#inquire"
                            className="inline-block font-mono text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest pt-2 hover:text-emerald-700 hover:underline transition-colors"
                          >
                            Inquire for custom strategy &rarr;
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
