/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Header from "./components/Header";
import SEOManager from "./components/SEOManager";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Industries from "./components/Industries";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import About from "./components/About";
import ServicesPage from "./components/ServicesPage";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";
import Frameworks from "./components/Frameworks";
import { useNavigation } from "./context/NavigationContext";
import { TESTIMONIALS } from "./data";
import { Quote, Sparkles, Shield, BookmarkCheck } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const { currentPage } = useNavigation();

  // Helper to render content based on selected page
  const renderContent = () => {
    switch (currentPage) {
      case "about":
        return <About />;
      case "services":
        return <ServicesPage />;
      case "blog":
        return <Blog />;
      case "frameworks":
        return <Frameworks />;
      case "faq":
        return <FAQ />;
      case "contact":
        return <Contact />;
      case "home":
      default:
        return (
          <>
            {/* 2. Hero Fold & Embedded Interactive 3D Showcase */}
            <Hero />

            {/* 3. Performance Metrics Bento Grid Section */}
            <Stats />

            {/* 4. Core Marketing Capabilities Accordion Deck */}
            <Services />

            {/* 5. Editorial Testimonial Carousel Banner (Luxury Social Proof) */}
            <section className="py-24 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
                  <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-1.5">
                    <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                    VERIFIED ADVISORY REPUTATION
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight text-white">
                    Discreet endorsements from leading directors.
                  </h2>
                </div>

                {/* Testimonials Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="testimonials-grid">
                  {TESTIMONIALS.map((t, index) => (
                    <motion.div
                      id={`testimonial-card-${index}`}
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-900 relative flex flex-col justify-between min-h-[300px]"
                    >
                      <div className="space-y-6">
                        <Quote className="w-8 h-8 text-emerald-500/20" />
                        <p className="font-serif text-zinc-300 text-sm leading-relaxed italic">
                          "{t.quote}"
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-6 border-t border-zinc-900 mt-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-black flex items-center justify-center font-mono text-xs font-bold shadow-md select-none shrink-0">
                          {t.avatar}
                        </div>
                        <div>
                          <h4 className="font-sans text-xs text-white font-medium">{t.author}</h4>
                          <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mt-0.5">{t.title}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12 flex items-center gap-2 justify-center text-[10px] text-zinc-500 font-mono select-none">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>PROTECTED BY RIGID MUTUAL NON-DISCLOSURE PACTS (NDA)</span>
                </div>
              </div>
            </section>

            {/* 6. Industries Served Gallery Cards */}
            <Industries />

            {/* 7. Bespoke Budget blueprints and Contact Enquiry Section */}
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen selection:bg-emerald-500 selection:text-black transition-colors duration-300">
      
      {/* Dynamic SEO, AEO & GEO Metadata & Schema Orchestration */}
      <SEOManager />

      {/* 1. Sticky Navigation Header */}
      <Header />

      <main className="relative">
        {renderContent()}
      </main>

      {/* 8. Minimalist Spacious Footer */}
      <Footer />

    </div>
  );
}
