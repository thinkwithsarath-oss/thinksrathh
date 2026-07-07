import React from "react";
import { motion } from "motion/react";
import { Briefcase, Calendar, Award, CheckCircle2, User, Linkedin, Mail, Phone, ExternalLink, Globe, Sparkles, Code, Cpu } from "lucide-react";
import ElectricBorder from "./ElectricBorder";
import { useLanguage } from "../context/LanguageContext";
import ProfileCard from "./ProfileCard";

export default function About() {
  const { t, language } = useLanguage();

  const skillsList = [
    { name: "AEO & GEO Optimization", icon: Cpu, desc: "Answering engine & Generative AI optimization to dominate LLM citation models." },
    { name: "Programmatic SEO (pSEO)", icon: Code, desc: "Scalable content generation structures to capture thousands of high-intent keywords." },
    { name: "AI-Powered Search Marketing", icon: Sparkles, desc: "End-to-end integration of ChatGPT, Claude, and Gemini into content pipelines." },
    { name: "Google & Meta Paid Media", icon: Globe, desc: "High-ROI digital advertising funnels backed by deep conversion tracking systems." },
    { name: "WordPress Development", icon: Code, desc: "Bespoke, lightning-fast WordPress websites optimized for crawl budget and page speeds." },
    { name: "LinkedIn Profile Optimization", icon: Award, desc: "Premium personal brand positioning for founders, specialists, and modern professionals." },
  ];

  const experiences = [
    {
      role: "Founder & Digital Marketing Consultant",
      company: "ThinkSarath",
      period: "Jan 2026 - Present (Self-employed)",
      location: "Erode, Tamil Nadu, India · Hybrid",
      desc: "Built and grew ThinkSarath as a personal brand focused on SEO, AI SEO, GEO, AEO, content marketing, and digital growth strategies. Created educational content, industry insights, case studies, and marketing resources. Conducted SEO research, technical website audits, and AI search visibility analysis to scale traffic, leads, and brand authority.",
      skills: ["AI SEO", "AEO", "GEO", "Technical Audits", "Growth Consulting"],
      highlight: true
    },
    {
      role: "SEO Specialist | Search Marketing & Paid Ads",
      company: "LuMay AI",
      period: "Aug 2025 - Present (Freelance)",
      location: "United States · Remote",
      desc: "Manage end-to-end search marketing initiatives, including SEO, Google Ads, Meta Ads, and ChatGPT Ads campaigns. Formulate key-phrase mapping, perform technical SEO, competitor research, campaign deployment, performance monitoring, and conversion tracking to increase organic citations in AI tools and traditional engines.",
      skills: ["ChatGPT Ads", "Google Ads", "Meta Ads", "Organic Search Citations"]
    },
    {
      role: "AI Digital Marketing Trainer & Mentor",
      company: "ZenX Academy",
      period: "Jan 2026 - Present (Part-time)",
      location: "Chennai, Tamil Nadu, India · Remote",
      desc: "Mentor students and professionals in SEO, AI SEO, GEO, AEO, Google Ads, Meta Ads, and digital marketing strategy. Provide hands-on training via live projects, case studies, real-world frameworks, and practical growth hacks to build job-ready digital consultants.",
      skills: ["Digital Marketing Mentorship", "AI-Integrated SEO Training", "Meta Ads"]
    },
    {
      role: "Head of Digital Marketing",
      company: "Code99 IT Academy",
      period: "Jun 2023 - Present (Full-time)",
      location: "Chennai, Tamil Nadu, India · On-site",
      desc: "Responsible for building scalable AI-driven marketing systems and performance growth strategies. Implemented Programmatic SEO (pSEO) to capture long-tail search terms. Built high-converting speed-optimized WordPress sites. Integrated LLM-based content architectures to scale and optimize landing-page workflows.",
      skills: ["Programmatic SEO (pSEO)", "LLM Systems", "WordPress Dev", "Performance Marketing"]
    }
  ];

  return (
    <div className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* 1. Header Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-2"
        >
          <span className="h-[1px] w-8 bg-emerald-500" />
          <span className="font-mono text-xs text-emerald-500 uppercase tracking-[0.25em] font-semibold">
            MEET THE ENGINEER
          </span>
          <span className="h-[1px] w-8 bg-emerald-500" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl font-normal leading-tight text-zinc-900 dark:text-white"
        >
          About <span className="text-emerald-500 font-semibold">Sarath Babu K</span> | AI SEO & Search Growth Consultant
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed"
        >
          He / Him • Founder at ThinkSarath | AI SEO & Search Growth Consultant | SEO, AEO, GEO & Programmatic SEO | Google Ads | AI Automation | Helping Businesses Grow Through AI Search
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-serif text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Looking to scale your online visibility and achieve top rankings on Google and modern AI engines? I specialize in creating high-quality, AI-optimized content structures, building high-ROI programmatic systems, and engineering personal LinkedIn footprints.
        </motion.p>
      </section>

      {/* 2. Interactive Spotlight Bio Section with ElectricBorder */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="bio-spotlight">
        
        {/* Left column: Brand Philosophy & Quick Contact Grids (Perfect Alignment) */}
        <div className="lg:col-span-8 space-y-8">
          <ElectricBorder 
            className="p-8 md:p-10 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-900 shadow-xl rounded-3xl"
            colors={["#10b981", "#3b82f6", "#10b981"]}
            duration={5}
            borderRadius="24px"
            glow={true}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-emerald-500" />
                <h3 className="font-serif text-2xl text-zinc-900 dark:text-white font-medium">Core Narrative & ThinkSarath Brand Philosophy</h3>
              </div>
              <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                As a pioneering Search & Conversational Engine Optimizer, I combine mathematical clarity with deep technical digital marketing strategies. My goal is to completely bypass vanity metrics to deliver real, sustainable organic placements.
              </p>
              <p className="font-serif text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                Whether you need to scale search terms to tens of thousands via Programmatic SEO, or protect your brand’s reputation across AI search indexes (AEO & GEO), I engineer the pipelines to make it happen. I assist businesses, professionals, and entrepreneurs in dominating digital landscapes.
              </p>
              
              <div className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/80">
                <h4 className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">Aura of Services I Master:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "SEO Articles & Blog Posts",
                    "AEO & GEO Search Citations",
                    "LinkedIn Profile Badges",
                    "AI Tools & Workflows",
                    "Wordpress Development",
                    "Google & Meta Paid Media"
                  ].map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ElectricBorder>

          {/* Sub-grid under the brand philosophy to match the height of ProfileCard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Direct Channels */}
            <div className="p-6 bg-zinc-950 text-white rounded-3xl border border-zinc-900 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest">SECURE LINKWAYS</span>
                  <h3 className="font-serif text-xl font-light">Direct Channels</h3>
                </div>
                
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  Connect for private advisory, consulting, speaking, or performance coaching.
                </p>

                <div className="space-y-3 pt-2">
                  <a 
                    href="tel:+917094629042" 
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900/60 hover:bg-emerald-500 hover:text-black transition-all duration-300 group text-xs font-mono border border-zinc-900 hover:border-emerald-400"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black transition-colors" />
                    <span>+91 7094629042</span>
                  </a>

                  <a 
                    href="mailto:thinkwithsarath@gmail.com" 
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900/60 hover:bg-emerald-500 hover:text-black transition-all duration-300 group text-xs font-mono border border-zinc-900 hover:border-emerald-400"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black transition-colors" />
                    <span className="truncate">thinkwithsarath@gmail.com</span>
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/sarathbabuk/" 
                    target="_blank" 
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900/60 hover:bg-emerald-500 hover:text-black transition-all duration-300 group text-xs font-mono border border-zinc-900 hover:border-emerald-400"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black transition-colors shrink-0" />
                    <span className="truncate">linkedin.com/in/sarathbabuk/</span>
                    <ExternalLink className="w-3 ml-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Headquarters & Availability */}
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-900/60 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold shrink-0">
                    SB
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-sans text-sm font-medium text-zinc-900 dark:text-white">Chennai & Erode, IN</h4>
                    <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Operating Globally</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/40">
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Remote-first collaboration framework</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Timezone flexibility for EU, US & Asia</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>NDA-protected private audits</span>
                  </div>
                </div>
              </div>

              <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mt-4">
                SECURE REMOTE OPERATIONS
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Gorgeous Holographic Founder Profile Card (Standalone Focus) */}
        <div className="lg:col-span-4 flex items-start justify-center">
          <ProfileCard
            avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
            name="Sarath Babu K"
            title="Founder & Lead Advisor"
            handle="sarathbabuk"
            status="Active"
            contactText="Connect"
            behindGlowColor="rgba(16, 185, 129, 0.45)"
            onContactClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }
            }}
          />
        </div>
      </section>

      {/* 3. Core Capability Grid */}
      <section className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="font-mono text-[9px] text-emerald-500 uppercase tracking-[0.25em] font-semibold">
            GROWTH WEAPONS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-normal leading-tight text-zinc-900 dark:text-white">
            AI SEO, GEO, AEO & Digital Marketing Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsList.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-900 hover:border-emerald-500/40 dark:hover:border-emerald-500/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-medium text-zinc-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors">
                  {skill.name}
                </h3>
                <p className="font-serif text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                  {skill.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Strategic Career Timeline Section */}
      <section className="space-y-16">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="font-mono text-[9px] text-emerald-500 uppercase tracking-[0.25em] font-semibold">
            TRACK RECORD
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-normal leading-tight text-zinc-900 dark:text-white">
            Elite Digital Marketing Career & Track Record
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative border-l border-zinc-200 dark:border-zinc-900 pl-6 md:pl-10 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* timeline bullet */}
              <div className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border-4 ${
                exp.highlight 
                  ? "bg-emerald-500 border-white dark:border-zinc-950 scale-125 ring-4 ring-emerald-500/20" 
                  : "bg-zinc-300 dark:bg-zinc-800 border-white dark:border-zinc-950"
              }`} />

              <div className={`p-8 rounded-2xl border transition-all duration-300 ${
                exp.highlight 
                  ? "bg-emerald-500/[0.01] dark:bg-emerald-500/[0.02] border-emerald-500/20 dark:border-emerald-500/10 shadow-lg" 
                  : "bg-transparent border-zinc-200/50 dark:border-zinc-900"
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl font-medium text-zinc-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end text-right shrink-0">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{exp.period}</span>
                    </div>
                    <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 mt-1">{exp.location}</span>
                  </div>
                </div>

                <p className="font-serif text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light mb-6">
                  {exp.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((s, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[9px] px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800/60 uppercase tracking-wider"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
