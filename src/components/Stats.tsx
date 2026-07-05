import React from "react";
import { STATS, Stat } from "../data";
import { motion } from "motion/react";
import { Award, TrendingUp, Users, Search, ThumbsUp } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const GROWTH_DATA = [
  { month: "Month 1", value: 1.0 },
  { month: "Month 2", value: 1.3 },
  { month: "Month 3", value: 1.8 },
  { month: "Month 4", value: 2.2 },
  { month: "Month 5", value: 2.6 },
  { month: "Month 6", value: 3.0 },
];

export default function Stats() {
  const getIconForIndex = (index: number) => {
    switch (index) {
      case 0: return <Users className="w-5 h-5 text-emerald-500" />;
      case 1: return <Award className="w-5 h-5 text-emerald-500" />;
      case 2: return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 3: return <ThumbsUp className="w-5 h-5 text-emerald-500" />;
      case 4: return <Search className="w-5 h-5 text-emerald-500" />;
      default: return <TrendingUp className="w-5 h-5 text-emerald-500" />;
    }
  };

  // Grid styling coordinates to create a beautiful unequal luxury bento grid layout
  const getGridClasses = (index: number) => {
    switch (index) {
      case 0: return "md:col-span-4 lg:col-span-4 bg-white dark:bg-zinc-950";
      case 1: return "md:col-span-4 lg:col-span-4 bg-white dark:bg-zinc-950";
      case 2: return "md:col-span-4 lg:col-span-4 bg-zinc-900/10 dark:bg-zinc-900/20";
      case 3: return "md:col-span-6 lg:col-span-6 bg-white dark:bg-zinc-950";
      case 4: return "md:col-span-6 lg:col-span-6 bg-white dark:bg-zinc-950";
      default: return "bg-white dark:bg-zinc-950";
    }
  };

  return (
    <section id="metrics" className="py-24 bg-zinc-50 dark:bg-zinc-950/20 border-y border-zinc-100 dark:border-zinc-900/60 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header summary of stats section */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.25em]">Proven Outcomes</p>
          <h2 className="font-serif text-4xl md:text-5xl text-zinc-900 dark:text-white font-normal mt-2 leading-tight">
            Our benchmarks define the gold standard of organic performance.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-sans text-sm mt-4 leading-relaxed max-w-xl">
            We bypass trivial vanity metrics. Our execution is built purely upon solid customer acquisitions, organic visibility, and ROI alignment.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="bento-stats-grid">
          {STATS.map((stat, i) => (
            <motion.div
              id={`stat-card-${i}`}
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-900 relative overflow-hidden group flex flex-col justify-between min-h-[220px] transition-all hover:border-emerald-500/30 ${getGridClasses(
                i
              )}`}
            >
              {/* Background ambient gradient for hover feedback */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center justify-between z-10">
                {/* Visual marker */}
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  {getIconForIndex(i)}
                </div>
                {/* Metric sequential code */}
                <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  SYS_KPI_0{i + 1}
                </span>
              </div>

              {/* Big luxury number rendering */}
              <div className="space-y-2 pt-6 z-10 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-serif text-5xl md:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-800 to-emerald-700 dark:from-white dark:via-zinc-200 dark:to-emerald-400 tracking-tight block">
                    {stat.value}
                  </span>
                  <span className="font-sans text-sm text-zinc-800 dark:text-zinc-200 font-medium block">
                    {stat.label}
                  </span>
                  <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed pt-1">
                    {stat.description}
                  </p>
                </div>

                {i === 2 && (
                  <div className="h-28 w-full mt-4 bg-zinc-100/50 dark:bg-zinc-900/40 rounded-xl p-2 border border-zinc-200/50 dark:border-zinc-900 overflow-hidden relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={GROWTH_DATA} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" hide />
                        <YAxis hide domain={[0.8, 3.2]} />
                        <Tooltip
                          contentStyle={{
                            background: "#09090b",
                            border: "1px solid #27272a",
                            borderRadius: "8px",
                            fontSize: "10px",
                            fontFamily: "var(--font-mono)",
                          }}
                          labelStyle={{ color: "#a1a1aa" }}
                          itemStyle={{ color: "#10b981" }}
                          formatter={(value: any) => [`${value}x Growth`, "Traffic"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#10b981"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorGrowth)"
                          isAnimationActive={true}
                          animationDuration={1500}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Aesthetic vertical edge accent */}
              <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/20 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
