import React from "react";
import { motion } from "motion/react";
import { ArrowDown, Sparkles, MapPin, ShieldCheck, ChevronRight } from "lucide-react";
import Showcase3D from "./Showcase3D";
import Magnetic from "./Magnetic";
import Lightning from "./Lightning";

export default function Hero() {
  // Staggered motion presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom elegant easeOut
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen bg-zinc-950 pt-28 md:pt-36 pb-20 overflow-hidden">
      {/* Lightning component from React Bits as premium high-end visual background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.22] dark:opacity-[0.25]">
        <Lightning 
          hue={150} 
          xOffset={0} 
          speed={0.65} 
          intensity={1.4} 
          size={0.65} 
        />
      </div>

      {/* Structural geometric grid backgrounds (luxury minimalism) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e7e6_1px,transparent_1px)] dark:bg-[radial-gradient(#182d27_1px,transparent_1px)] [background-size:32px_32px] opacity-60" />
      
      {/* Ambient glowing green gradients of premium texture */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-64 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-6 md:space-y-8"
        >
          {/* Tagline Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/60 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-800 dark:text-emerald-300">
              Future-Proof Organic Acquisition — 2026 Strategy
            </span>
          </motion.div>

          {/* Core High-End Typography Header */}
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-zinc-900 dark:text-white font-normal tracking-tight leading-[1.05] max-w-5xl"
          >
            Organic Growth & <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">AI Visibility</span> Engineered for the Elite.
          </motion.h1>

          {/* Location & Summary Block */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-zinc-500 dark:text-zinc-400 font-sans text-sm md:text-base max-w-3xl"
          >
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono text-xs tracking-widest uppercase">
              <MapPin className="w-4 h-4 text-emerald-500" /> Chennai, Tamil Nadu
            </span>
            <span className="hidden md:inline text-zinc-300">|</span>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
              I partner with premium brands to secure peak search performance across Google SEO, 
              Conversational AI Overview optimization (AEO), and Generative summaries (GEO).
            </p>
          </motion.div>

          {/* Action Trigger Row */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 pt-2"
          >
            <Magnetic>
              <a
                id="hero-cta-engine"
                href="#interactive-showcase"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-black font-mono text-xs uppercase tracking-widest hover:bg-emerald-600 dark:hover:bg-emerald-400 dark:hover:text-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-zinc-950/10 dark:shadow-white/5"
              >
                Explore 3D Marketing Engine
                <ChevronRight className="w-4 h-4" />
              </a>
            </Magnetic>
            
            <Magnetic>
              <a
                id="hero-cta-advisory"
                href="#inquire"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 font-mono text-xs uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Request Private Audit
              </a>
            </Magnetic>
          </motion.div>

          {/* Embed the majestic 3D Interactive Showcase */}
          <motion.div 
            id="interactive-showcase"
            variants={itemVariants}
            className="w-full pt-12 md:pt-16"
          >
            <div className="text-left mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.25em]">Interactive 3D Simulation</p>
                <h2 className="font-serif text-3xl md:text-4xl text-zinc-900 dark:text-white font-medium mt-1">Channel Morph Matrix</h2>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
                Click on the marketing categories below to watch the 3D grid morph, demonstrating the structural alignments between SEO and Generative AI indexers.
              </p>
            </div>
            
            <Showcase3D />
          </motion.div>

          {/* Trust assurances block */}
          <motion.div 
            variants={itemVariants}
            className="w-full pt-10 flex flex-wrap justify-center gap-8 md:gap-16 text-zinc-400 text-xs font-mono select-none"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>CONFIDENTIAL PARTNERSHIP ASSURANCE</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ROAS-DRIVEN PERFORMANCE COMMITTED</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ALIGNED WITH GOOGLE AI CORE GUIDELINES</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
        <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase">Scroll to metrics</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-4 h-4 text-zinc-400" />
        </motion.div>
      </div>
    </section>
  );
}
