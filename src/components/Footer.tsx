import React from "react";
import { Mail, Globe, MapPin, ArrowUp, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useNavigation } from "../context/NavigationContext";

export default function Footer() {
  const { setCurrentPage } = useNavigation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionNav = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage("home");
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-900/60 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Brand Frame */}
          <div className="md:col-span-5 space-y-6">
            <button 
              onClick={() => setCurrentPage("home")} 
              className="flex flex-col select-none group text-left cursor-pointer bg-transparent border-none p-0 focus:outline-none" 
              id="footer-logo"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-serif text-2xl tracking-widest text-white font-medium uppercase group-hover:text-emerald-400 transition-colors">
                  ThinkSarath
                </span>
                <span className="font-mono text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-md tracking-wider">
                  AI
                </span>
              </div>
              <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-500 uppercase ml-4.5">
                Digital Marketing Advisor
              </span>
            </button>
            
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-sm font-sans">
              Bespoke organic traffic engineering, technical search engine optimization, and next-generation 
              Conversational AI Overview prominence (AEO & GEO). Designed strictly for premium firms.
            </p>
            
            <div className="space-y-2 pt-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors">
                <Mail className="w-4 h-4 text-emerald-500" />
                <a href="mailto:thinkwithsarath@gmail.com">thinkwithsarath@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white">Advisory Channels</h4>
            <ul className="space-y-2.5 text-xs font-mono">
              {[
                { label: "Search Engine Optimization (SEO)", href: "#capabilities" },
                { label: "Answer Engine Optimization (AEO)", href: "#capabilities" },
                { label: "Generative Engine Optimization (GEO)", href: "#capabilities" },
                { label: "Google My Business (GMB)", href: "#capabilities" },
                { label: "High-Performance PPC Campaigns", href: "#capabilities" },
                { label: "Digital Flagship Web Development", href: "#capabilities" },
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleSectionNav(link.href, e)}
                    className="hover:text-white transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategic frameworks Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white">Frameworks</h4>
            <ul className="space-y-2.5 text-xs font-mono">
              {[
                { label: "ThinkSarath Method™", page: "frameworks" },
                { label: "AI SEO Framework™", page: "frameworks" },
                { label: "GEO Framework™", page: "frameworks" },
                { label: "AEO Framework™", page: "frameworks" },
              ].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => setCurrentPage(link.page as any)}
                    className="hover:text-white transition-colors block py-0.5 text-left bg-transparent border-none p-0 cursor-pointer font-mono text-xs text-zinc-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Network verification Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white">Discretion Status</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-emerald-500 font-mono text-[9px] uppercase tracking-wider bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Advisor Status</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
                Our client relationships are protected by non-disclosure pacts. 
                Full metrics are delivered in secure personal strategy briefings only.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Meta Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-zinc-600 font-mono text-[10px]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>&copy; {currentYear} ThinkSarath. All Rights Reserved.</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Privately Encrypted Portal
            </span>
          </div>
          
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-widest cursor-pointer group"
          >
            Return to Apex
            <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
