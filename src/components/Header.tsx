import React, { useState, useEffect } from "react";
import { Menu, X, MapPin, Globe, Sparkles, Moon, Sun, Database } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigation, PageType } from "../context/NavigationContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState("");
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { currentPage, setCurrentPage, isDatabaseModalOpen, setIsDatabaseModalOpen } = useNavigation();

  // Track scroll state for glassmorphism and progress bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const percent = (window.scrollY / totalHeight) * 100;
        setScrollPercent(percent);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Spy Observer
  useEffect(() => {
    const sectionIds = ["interactive-showcase", "metrics", "capabilities", "industries", "advisory"];
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-30% 0px -40% 0px",
          threshold: 0.1,
        }
      );
      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, [language]); // Re-initialize if language switches to maintain accuracy

  // Show live Chennai Local Time in high-end format
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setTimeStr(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: t.navHome, id: "home" as PageType },
    { label: t.navAbout, id: "about" as PageType },
    { label: t.navServices, id: "services" as PageType },
    { label: t.navFrameworks, id: "frameworks" as PageType },
    { label: t.navBlog, id: "blog" as PageType },
    { label: t.navFaq, id: "faq" as PageType },
    { label: t.navContact, id: "contact" as PageType },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-emerald-500 z-[100] transition-all duration-75 ease-out"
        style={{ width: `${scrollPercent}%` }}
      />

      <header
        id="site-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-white/90 dark:bg-zinc-950/95 backdrop-blur-md border-zinc-200/50 dark:border-zinc-900/50 py-3 shadow-sm"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand Frame */}
          <button 
            onClick={() => setCurrentPage("home")} 
            className="flex flex-col select-none group text-left cursor-pointer bg-transparent border-none p-0 focus:outline-none" 
            id="logo-brand"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-serif text-2xl tracking-widest text-zinc-900 dark:text-white font-medium uppercase transition-all group-hover:text-emerald-500">
                ThinkSarath
              </span>
              <span className="font-mono text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-md tracking-wider">
                AI
              </span>
            </div>
            <span className="font-mono text-[8px] tracking-[0.25em] text-zinc-400 dark:text-zinc-500 uppercase ml-4.5">
              {t.digitalMarketingAdvisor}
            </span>
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  id={`nav-link-${link.id}`}
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  className={`font-mono text-[11px] tracking-widest uppercase transition-all duration-300 relative py-1 group cursor-pointer border-none bg-transparent focus:outline-none ${
                    isActive
                      ? "text-emerald-500 font-medium"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-emerald-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Location & Time Indicator + Theme & Lang Controls + CTA */}
          <div className="hidden lg:flex items-center gap-5" id="header-meta-ctas">
            {/* Discreet Language Switcher */}
            <div className="flex items-center gap-1.5 border border-zinc-200/50 dark:border-zinc-800/80 px-2.5 py-1 rounded-full bg-zinc-50/50 dark:bg-zinc-900/40 text-[10px] font-mono">
              <button 
                id="lang-btn-en"
                onClick={() => setLanguage("en")}
                className={`cursor-pointer hover:text-emerald-500 transition-colors ${language === "en" ? "text-emerald-500 font-semibold" : "text-zinc-400 dark:text-zinc-500"}`}
              >
                EN
              </button>
              <span className="text-zinc-300 dark:text-zinc-800">|</span>
              <button 
                id="lang-btn-ta"
                onClick={() => setLanguage("ta")}
                className={`cursor-pointer hover:text-emerald-500 transition-colors ${language === "ta" ? "text-emerald-500 font-semibold" : "text-zinc-400 dark:text-zinc-500"}`}
              >
                தமிழ்
              </button>
            </div>

            {/* Live Database Integration Panel */}
            <button
              id="db-toggle-btn"
              onClick={() => setIsDatabaseModalOpen(true)}
              className="p-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all cursor-pointer flex items-center justify-center"
              title="Database Manager & Real-Time Sync"
              aria-label="Configure Database"
            >
              <Database className="w-3.5 h-3.5 animate-pulse" />
            </button>

            {/* Persistent Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <div className="flex flex-col items-end font-mono text-[10px] text-zinc-500 select-none border-l border-zinc-200/40 dark:border-zinc-800/40 pl-5">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span className="tracking-wider text-zinc-700 dark:text-zinc-300">{t.chennai}</span>
              </div>
              <span className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-0.5 font-mono">
                {t.localTime}: {timeStr || "10:27:46"}
              </span>
            </div>

            <button
              id="header-cta-inquire"
              onClick={() => setCurrentPage("contact")}
              className="relative px-5 py-2.5 rounded-full overflow-hidden border border-zinc-900 dark:border-white font-mono text-xs uppercase tracking-wider transition-all duration-300 group hover:border-emerald-500 cursor-pointer focus:outline-none"
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500 ease-out group-hover:w-full -z-10" />
              <span className="text-zinc-900 dark:text-white group-hover:text-black transition-colors duration-300">
                {t.inquirePrivately}
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle button */}
          <div className="flex md:hidden items-center gap-3">
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 px-2.5 py-1 rounded-full text-[9px] font-mono text-zinc-600 dark:text-zinc-400">
              <MapPin className="w-2.5 h-2.5 text-emerald-500" />
              <span>MAS</span>
            </div>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-zinc-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 pt-24 px-6 pb-8 flex flex-col justify-between border-b border-zinc-200 dark:border-zinc-900 shadow-2xl h-fit"
          >
            <div className="space-y-8 flex flex-col">
              <p className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-900 pb-2">
                {t.tableOfNavigation}
              </p>
              {navLinks.map((link) => (
                <button
                  id={`mobile-nav-link-${link.id}`}
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setIsOpen(false);
                  }}
                  className="font-serif text-3xl font-light text-left text-zinc-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer border-none bg-transparent focus:outline-none"
                >
                  {link.label}
                </button>
              ))}
            </div>
 
            <div className="space-y-6 pt-8 border-t border-zinc-100 dark:border-zinc-900 mt-8">
              {/* Mobile Lang and Theme controls */}
              <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900/80 p-3.5 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <button 
                    id="mobile-lang-btn-en"
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${language === "en" ? "bg-emerald-500 text-black font-semibold" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
                  >
                    EN
                  </button>
                  <button 
                    id="mobile-lang-btn-ta"
                    onClick={() => setLanguage("ta")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${language === "ta" ? "bg-emerald-500 text-black font-semibold" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
                  >
                    தமிழ்
                  </button>
                </div>
                <button
                  id="mobile-db-toggle-btn"
                  onClick={() => {
                    setIsDatabaseModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Configure Database"
                >
                  <Database className="w-4 h-4 animate-pulse" />
                </button>

                <button
                  id="mobile-theme-toggle-btn"
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center transition-all"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
 
              <div className="flex justify-between items-center text-zinc-500 font-mono text-xs">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {t.chennai}
                </span>
                <span>{timeStr || "10:27:46"}</span>
              </div>
              <button
                id="mobile-cta-inquire"
                onClick={() => {
                  setCurrentPage("contact");
                  setIsOpen(false);
                }}
                className="block text-center w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 font-mono text-sm uppercase tracking-widest font-semibold text-black hover:opacity-90 transition-opacity cursor-pointer border-none focus:outline-none"
              >
                {t.inquirePrivately}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
