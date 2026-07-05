import React, { useState } from "react";
import { INDUSTRIES, Industry } from "../data";
import { motion } from "motion/react";
import { Building2, Heart, ShoppingBag, GraduationCap, Factory, Hotel, Cpu, Briefcase, ChevronRight } from "lucide-react";

export default function Industries() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Return elegant custom vector icons matching the luxury theme
  const getIndustryIcon = (slug: string) => {
    const sizeClasses = "w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform duration-300";
    switch (slug) {
      case "healthcare": return <Heart className={sizeClasses} />;
      case "real-estate": return <Building2 className={sizeClasses} />;
      case "retail": return <ShoppingBag className={sizeClasses} />;
      case "education": return <GraduationCap className={sizeClasses} />;
      case "manufacturing": return <Factory className={sizeClasses} />;
      case "hospitality": return <Hotel className={sizeClasses} />;
      case "technology": return <Cpu className={sizeClasses} />;
      case "legal-finance": return <Briefcase className={sizeClasses} />;
      default: return <Building2 className={sizeClasses} />;
    }
  };

  return (
    <section id="industries" className="py-24 bg-zinc-50 dark:bg-zinc-950/20 border-t border-zinc-100 dark:border-zinc-900/40 relative overflow-hidden">
      {/* Decorative luxury gradient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.25em]">Sectors Served</p>
          <h2 className="font-serif text-4xl md:text-5xl text-zinc-900 dark:text-white font-normal leading-tight">
            Tailored solutions across high-impact industries.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-lg mx-auto">
            From premier private clinics to high-end real estate developments, we translate brand prestige into organic digital market share.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="industries-grid">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              id={`industry-card-${ind.slug}`}
              key={ind.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onMouseEnter={() => setActiveSlug(ind.slug)}
              onMouseLeave={() => setActiveSlug(null)}
              className="p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 relative overflow-hidden group hover:shadow-xl hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between min-h-[250px]"
            >
              {/* Luxury green light leak on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="space-y-6">
                {/* Visual Header */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-100 dark:border-zinc-800 shrink-0">
                    {getIndustryIcon(ind.slug)}
                  </div>
                  <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
                    IND_SEC_0{i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl md:text-2xl text-zinc-900 dark:text-white font-normal tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {ind.name}
                  </h3>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {ind.description}
                  </p>
                </div>
              </div>

              {/* Action trigger footer */}
              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900/60 mt-4 flex items-center justify-between text-zinc-400 group-hover:text-emerald-500 transition-colors">
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  View Cases
                </span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
