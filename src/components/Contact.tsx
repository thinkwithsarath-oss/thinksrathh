import React, { useState } from "react";
import { INDUSTRIES, SERVICES } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sliders, 
  Send, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  AlertCircle, 
  Shield, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Ticket, 
  Check, 
  MapPin 
} from "lucide-react";
import Magnetic from "./Magnetic";
import { useLanguage } from "../context/LanguageContext";
import ElectricBorder from "./ElectricBorder";

export default function Contact() {
  const { t } = useLanguage();
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["seo", "aeo"]);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(100000); // Default ₹1,00,000 INR
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Tab control between interactive wizard and direct form
  const [activeTab, setActiveTab] = useState<"wizard" | "direct">("wizard");
  
  // Wizard states
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedTraffic, setSelectedTraffic] = useState("");
  const [selectedBudgetTier, setSelectedBudgetTier] = useState("");
  const [selectedDate, setSelectedDate] = useState("Jul 6");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("10:00 AM - 11:00 AM IST");
  const [wizardErrors, setWizardErrors] = useState<string>("");

  // Form fields state
  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [industry, setIndustry] = useState("real-estate");
  const [message, setMessage] = useState("");
  
  // Validation errors
  const [errors, setErrors] = useState<{ brandName?: string; email?: string; phone?: string }>({});

  const validateForm = () => {
    const newErrors: { brandName?: string; email?: string; phone?: string } = {};
    
    // Brand Name Validation
    if (!brandName.trim()) {
      newErrors.brandName = t.validationNameEmpty;
    }

    // Email Validation
    if (!email.trim()) {
      newErrors.email = t.validationEmailEmpty;
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = t.validationEmailInvalid;
      }
    }

    // Phone Validation
    if (!phoneNumber.trim()) {
      newErrors.phone = t.validationPhoneEmpty;
    } else {
      const phoneClean = phoneNumber.replace(/[\s\-()]/g, "");
      const phoneRegex = /^\+?[0-9]{10,20}$/;
      if (!phoneRegex.test(phoneClean)) {
        newErrors.phone = t.validationPhoneInvalid;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleChannel = (id: string) => {
    if (selectedChannels.includes(id)) {
      if (selectedChannels.length > 1) {
        setSelectedChannels(selectedChannels.filter(c => c !== id));
      }
    } else {
      setSelectedChannels([...selectedChannels, id]);
    }
  };

  // Math models to calculate dynamic premium digital outcomes
  const calculateOutcomes = () => {
    const baseMultiplier = monthlyInvestment / 50000; // base ₹50k investment
    const channelWeight = selectedChannels.length * 0.45;
    
    const organicReachMultiplier = (1 + (baseMultiplier * 0.35) + channelWeight).toFixed(1);
    const aiImprMultiplier = Math.round((monthlyInvestment * 0.12) * (selectedChannels.includes("aeo") || selectedChannels.includes("geo") ? 1.5 : 0.6));
    const estConversionGain = (0.5 + (baseMultiplier * 0.15) + (selectedChannels.includes("webdev") ? 0.8 : 0.2)).toFixed(1);

    return {
      organicReachMultiplier,
      aiImprMultiplier: aiImprMultiplier.toLocaleString(),
      estConversionGain,
    };
  };

  const outcomes = calculateOutcomes();

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate secure private transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <section id="advisory" className="py-28 bg-white dark:bg-zinc-950 relative overflow-hidden">
      <div id="inquire" className="absolute top-0" />
      {/* Decorative clean line borders for luxury framing */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-zinc-100 dark:bg-zinc-900" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-100 dark:bg-zinc-900" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left side: Interactive Estimator and Value Props */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.25em]">Bespoke Audit Simulator</span>
              <h1 className="font-serif text-4xl md:text-5xl text-zinc-900 dark:text-white font-normal leading-tight">
                Contact ThinkSarath | Bespoke AI SEO & Digital Marketing Advisory
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">
                Select your target growth channels and slide your planned monthly marketing investment to project 
                organic multipliers designed specifically for the Chennai, South Indian, or Global premium markets.
              </p>
            </div>

            {/* Interactive Calculator Panel */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-900 space-y-8 shadow-sm">
              
              {/* Channel Selector Pills */}
              <div className="space-y-3">
                <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                  Step 1. Choose Channels ({selectedChannels.length} Active)
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.slice(0, 7).map(channel => {
                    const active = selectedChannels.includes(channel.id);
                    return (
                      <button
                        id={`calc-channel-${channel.id}`}
                        key={channel.id}
                        type="button"
                        onClick={() => toggleChannel(channel.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-sans tracking-wide transition-all border ${
                          active
                            ? "bg-emerald-500 text-black border-emerald-500 font-medium"
                            : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        {channel.title.replace("Search Engine ", "SEO ").replace("Answer Engine ", "AEO ").replace("Generative Engine ", "GEO ")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slider Component */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                    Step 2. Monthly Growth Investment
                  </label>
                  <span className="font-mono text-base font-semibold text-emerald-600 dark:text-emerald-400">
                    ₹{monthlyInvestment.toLocaleString("en-IN")} / mo
                  </span>
                </div>
                <input
                  id="investment-slider"
                  type="range"
                  min="25000"
                  max="500000"
                  step="25000"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
                  <span>Min (₹25,000)</span>
                  <span>Mid (₹2,50,000)</span>
                  <span>Enterprise (₹5,00,000+)</span>
                </div>
              </div>

              {/* Dynamic projections based on selection */}
              <div className="border-t border-zinc-200/50 dark:border-zinc-900 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase">Est. Organic Reach</span>
                  <p className="font-serif text-3xl font-medium text-zinc-900 dark:text-white">
                    {outcomes.organicReachMultiplier}×
                  </p>
                  <p className="text-[10px] text-zinc-400 leading-snug">Traffic capture growth expectation.</p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase">AI Synapse Imp.</span>
                  <p className="font-serif text-3xl font-medium text-emerald-600 dark:text-emerald-400">
                    +{outcomes.aiImprMultiplier}
                  </p>
                  <p className="text-[10px] text-zinc-400 leading-snug">AEO/GEO conversational citations/mo.</p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase">Conversion Lift</span>
                  <p className="font-serif text-3xl font-medium text-zinc-900 dark:text-white">
                    +{outcomes.estConversionGain}%
                  </p>
                  <p className="text-[10px] text-zinc-400 leading-snug">Average revenue-aligned conversion hike.</p>
                </div>

              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/30 dark:border-emerald-900/20 text-[11px] text-emerald-800 dark:text-emerald-300 flex gap-2">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  These represent modeled local projections. Submit the final details on the right to trigger an custom, manual organic search audit of your domain.
                </p>
              </div>

            </div>
          </div>

          {/* Right side: Luxurious Consultation Request Form & Q/A Appointment Wizard */}
          <ElectricBorder className="lg:col-span-5 bg-zinc-950 text-white p-8 md:p-10 rounded-3xl border border-zinc-900/80 shadow-2xl relative" id="advisory-card" borderRadius="24px" colors={["#10b981", "#3b82f6", "#10b981"]} duration={4} glow={true}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Elegant Tab Switcher - Only visible if not submitted */}
            {!submitted && (
              <div className="flex border-b border-zinc-900 mb-6 font-mono text-[10px] uppercase tracking-wider relative z-20">
                <button
                  id="tab-btn-wizard"
                  type="button"
                  onClick={() => {
                    setActiveTab("wizard");
                    setWizardStep(1);
                    setErrors({});
                    setWizardErrors("");
                  }}
                  className={`flex-1 pb-3 text-center transition-all border-b-2 cursor-pointer ${
                    activeTab === "wizard"
                      ? "border-emerald-500 text-emerald-400 font-bold"
                      : "border-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {t.interactiveWizard}
                </button>
                <button
                  id="tab-btn-direct"
                  type="button"
                  onClick={() => {
                    setActiveTab("direct");
                    setErrors({});
                    setWizardErrors("");
                  }}
                  className={`flex-1 pb-3 text-center transition-all border-b-2 cursor-pointer ${
                    activeTab === "direct"
                      ? "border-emerald-500 text-emerald-400 font-bold"
                      : "border-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {t.directInquiry}
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {!submitted ? (
                activeTab === "wizard" ? (
                  /* MULTI-STEP INTERACTIVE Q/A APPOINTMENT WIZARD */
                  <motion.div
                    key="wizard-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6 relative z-10"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                        <span className="text-emerald-400 font-semibold">{t.consultationWizard}</span>
                        <span>{t.stepLabel} {wizardStep} / 5</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 leading-normal">{t.qaSub}</p>
                    </div>

                    {/* Step Progress Bar */}
                    <div className="flex gap-1.5 h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div
                          key={s}
                          className={`h-full flex-1 transition-all duration-300 ${
                            s <= wizardStep ? "bg-emerald-500" : "bg-zinc-800"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Step Renderers */}
                    <AnimatePresence mode="wait">
                      {wizardStep === 1 && (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <p className="font-serif text-lg font-light text-zinc-200">{t.question1}</p>
                          <div className="grid grid-cols-1 gap-2.5">
                            {[
                              { id: "seo", title: t.q1_opt1, icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
                              { id: "aeo", title: t.q1_opt2, icon: <Sliders className="w-4 h-4 text-emerald-400" /> },
                              { id: "local", title: t.q1_opt3, icon: <MapPin className="w-4 h-4 text-emerald-400" /> },
                              { id: "audit", title: t.q1_opt4, icon: <HelpCircle className="w-4 h-4 text-emerald-400" /> },
                            ].map((g) => (
                              <button
                                id={`wizard-goal-${g.id}`}
                                key={g.id}
                                type="button"
                                onClick={() => {
                                  setSelectedGoal(g.id);
                                  setWizardErrors("");
                                }}
                                className={`w-full p-4 rounded-xl text-left text-xs transition-all border flex items-center gap-3 cursor-pointer ${
                                  selectedGoal === g.id
                                    ? "bg-emerald-500/10 border-emerald-500/80 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                    : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700/80 hover:text-zinc-200"
                                }`}
                              >
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                                  selectedGoal === g.id ? "border-emerald-500 bg-emerald-500 text-black" : "border-zinc-700 bg-transparent"
                                }`}>
                                  {selectedGoal === g.id && <Check className="w-3 h-3 stroke-[2.5]" />}
                                </div>
                                <div className="flex items-center gap-2">
                                  {g.icon}
                                  <span className="font-sans leading-tight">{g.title}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {wizardStep === 2 && (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <p className="font-serif text-lg font-light text-zinc-200">{t.question2}</p>
                          <div className="grid grid-cols-1 gap-2.5">
                            {[
                              { id: "under10k", title: t.q2_opt1 },
                              { id: "10k_100k", title: t.q2_opt2 },
                              { id: "100k_1m", title: t.q2_opt3 },
                              { id: "1m_plus", title: t.q2_opt4 },
                            ].map((tr) => (
                              <button
                                id={`wizard-traffic-${tr.id}`}
                                key={tr.id}
                                type="button"
                                onClick={() => {
                                  setSelectedTraffic(tr.id);
                                  setWizardErrors("");
                                }}
                                className={`w-full p-4 rounded-xl text-left text-xs transition-all border flex items-center gap-3 cursor-pointer ${
                                  selectedTraffic === tr.id
                                    ? "bg-emerald-500/10 border-emerald-500/80 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                    : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700/80 hover:text-zinc-200"
                                }`}
                              >
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                                  selectedTraffic === tr.id ? "border-emerald-500 bg-emerald-500 text-black" : "border-zinc-700 bg-transparent"
                                }`}>
                                  {selectedTraffic === tr.id && <Check className="w-3 h-3 stroke-[2.5]" />}
                                </div>
                                <span className="font-sans leading-tight">{tr.title}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {wizardStep === 3 && (
                        <motion.div
                          key="step-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <p className="font-serif text-lg font-light text-zinc-200">{t.question3}</p>
                          <div className="grid grid-cols-1 gap-2.5">
                            {[
                              { id: "confidential", title: t.q3_opt1 },
                              { id: "scale", title: t.q3_opt2 },
                              { id: "enterprise", title: t.q3_opt3 },
                            ].map((b) => (
                              <button
                                id={`wizard-budget-${b.id}`}
                                key={b.id}
                                type="button"
                                onClick={() => {
                                  setSelectedBudgetTier(b.id);
                                  setWizardErrors("");
                                }}
                                className={`w-full p-4 rounded-xl text-left text-xs transition-all border flex items-center gap-3 cursor-pointer ${
                                  selectedBudgetTier === b.id
                                    ? "bg-emerald-500/10 border-emerald-500/80 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                    : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700/80 hover:text-zinc-200"
                                }`}
                              >
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                                  selectedBudgetTier === b.id ? "border-emerald-500 bg-emerald-500 text-black" : "border-zinc-700 bg-transparent"
                                }`}>
                                  {selectedBudgetTier === b.id && <Check className="w-3 h-3 stroke-[2.5]" />}
                                </div>
                                <span className="font-sans leading-tight">{b.title}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {wizardStep === 4 && (
                        <motion.div
                          key="step-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <p className="font-serif text-lg font-light text-zinc-200">{t.question4}</p>
                          
                          <div className="space-y-2">
                            <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">{t.selectDate}</label>
                            <div className="grid grid-cols-5 gap-1.5">
                              {[
                                { day: "Mon", date: "Jul 6" },
                                { day: "Tue", date: "Jul 7" },
                                { day: "Wed", date: "Jul 8" },
                                { day: "Thu", date: "Jul 9" },
                                { day: "Fri", date: "Jul 10" },
                              ].map((d) => (
                                <button
                                  id={`wizard-date-${d.date.replace(/\s+/g, "-")}`}
                                  key={d.date}
                                  type="button"
                                  onClick={() => {
                                    setSelectedDate(d.date);
                                    setWizardErrors("");
                                  }}
                                  className={`p-2 rounded-xl text-center transition-all border flex flex-col items-center justify-center cursor-pointer ${
                                    selectedDate === d.date
                                      ? "bg-emerald-500 text-black border-emerald-500 font-medium"
                                      : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700"
                                  }`}
                                >
                                  <span className="font-mono text-[9px] uppercase tracking-wider block opacity-70">{d.day}</span>
                                  <span className="font-sans text-xs font-semibold block mt-0.5">{d.date.split(" ")[1]}</span>
                                  <span className="font-mono text-[8px] uppercase block opacity-70">{d.date.split(" ")[0]}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2 pt-1">
                            <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">{t.selectTime}</label>
                            <div className="grid grid-cols-1 gap-2">
                              {[
                                "10:00 AM - 11:00 AM IST",
                                "02:00 PM - 03:00 PM IST",
                                "04:30 PM - 05:30 PM IST"
                              ].map((slot) => (
                                <button
                                  id={`wizard-slot-${slot.replace(/\s+/g, "-")}`}
                                  key={slot}
                                  type="button"
                                  onClick={() => {
                                    setSelectedTimeSlot(slot);
                                    setWizardErrors("");
                                  }}
                                  className={`p-3 rounded-xl text-left text-xs transition-all border flex items-center gap-3 cursor-pointer ${
                                    selectedTimeSlot === slot
                                      ? "bg-emerald-500/10 border-emerald-500/80 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                      : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700/80"
                                  }`}
                                >
                                  <Clock className={`w-3.5 h-3.5 shrink-0 ${selectedTimeSlot === slot ? "text-emerald-400 animate-pulse" : "text-zinc-600"}`} />
                                  <span className="font-sans leading-tight font-medium">{slot}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {wizardStep === 5 && (
                        <motion.div
                          key="step-5"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          <p className="font-serif text-lg font-light text-zinc-200">Encrypt Advisory Ticket</p>
                          <p className="text-zinc-400 text-xs leading-relaxed">
                            Provide your secure identity parameters below to complete the consultation scheduling.
                          </p>

                          <div className="space-y-3.5 pt-1">
                            {/* Brand Name / Company */}
                            <div className="space-y-1.5">
                              <label className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block">{t.fullName} *</label>
                              <input
                                id="wizard-brand-name"
                                type="text"
                                placeholder={t.fullNamePlaceholder}
                                value={brandName}
                                onChange={(e) => {
                                  setBrandName(e.target.value);
                                  if (errors.brandName) setErrors((prev) => ({ ...prev, brandName: undefined }));
                                }}
                                className={`w-full bg-zinc-900/50 border ${
                                  errors.brandName ? "border-red-500/60" : "border-zinc-800/80"
                                } rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/60 placeholder:text-zinc-600 transition-colors`}
                              />
                              {errors.brandName && (
                                <p className="text-red-400 font-mono text-[9px] flex items-center gap-1 mt-1">
                                  <AlertCircle className="w-3 h-3" /> {errors.brandName}
                                </p>
                              )}
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                              <label className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block">{t.corporateEmail} *</label>
                              <input
                                id="wizard-email"
                                type="text"
                                placeholder={t.corporateEmailPlaceholder}
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                                }}
                                className={`w-full bg-zinc-900/50 border ${
                                  errors.email ? "border-red-500/60" : "border-zinc-800/80"
                                } rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/60 placeholder:text-zinc-600 transition-colors`}
                              />
                              {errors.email && (
                                <p className="text-red-400 font-mono text-[9px] flex items-center gap-1 mt-1">
                                  <AlertCircle className="w-3 h-3" /> {errors.email}
                                </p>
                              )}
                            </div>

                            {/* Phone */}
                            <div className="space-y-1.5">
                              <label className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block">{t.phoneNumber} *</label>
                              <input
                                id="wizard-phone"
                                type="text"
                                placeholder={t.phoneNumberPlaceholder}
                                value={phoneNumber}
                                onChange={(e) => {
                                  setPhoneNumber(e.target.value);
                                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                                }}
                                className={`w-full bg-zinc-900/50 border ${
                                  errors.phone ? "border-red-500/60" : "border-zinc-800/80"
                                } rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/60 placeholder:text-zinc-600 transition-colors`}
                              />
                              {errors.phone && (
                                <p className="text-red-400 font-mono text-[9px] flex items-center gap-1 mt-1">
                                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step Error Message */}
                    {wizardErrors && (
                      <p className="text-red-400 font-mono text-[9px] flex items-center gap-1 mt-2">
                        <AlertCircle className="w-3.5 h-3.5" /> {wizardErrors}
                      </p>
                    )}

                    {/* Step Navigation Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-900 gap-4">
                      {wizardStep > 1 ? (
                        <button
                          id="wizard-back-btn"
                          type="button"
                          onClick={() => {
                            setWizardStep((prev) => prev - 1);
                            setWizardErrors("");
                          }}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          {t.prevBtn}
                        </button>
                      ) : (
                        <div />
                      )}

                      <button
                        id="wizard-next-btn"
                        type="button"
                        onClick={() => {
                          // Step validation
                          if (wizardStep === 1 && !selectedGoal) {
                            setWizardErrors(t.selectOptionError);
                            return;
                          }
                          if (wizardStep === 2 && !selectedTraffic) {
                            setWizardErrors(t.selectOptionError);
                            return;
                          }
                          if (wizardStep === 3 && !selectedBudgetTier) {
                            setWizardErrors(t.selectOptionError);
                            return;
                          }
                          if (wizardStep === 4 && (!selectedDate || !selectedTimeSlot)) {
                            setWizardErrors(t.selectOptionError);
                            return;
                          }
                          if (wizardStep === 5) {
                            // Submit validation
                            if (!validateForm()) return;
                            setIsSubmitting(true);
                            setTimeout(() => {
                              setIsSubmitting(false);
                              setSubmitted(true);
                            }, 2000);
                            return;
                          }

                          setWizardStep((prev) => prev + 1);
                          setWizardErrors("");
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-black text-[10px] font-mono font-bold hover:opacity-95 transition-opacity ml-auto cursor-pointer"
                      >
                        {wizardStep === 5 ? (
                          isSubmitting ? (
                            <>
                              <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                              {t.securingSlot}
                            </>
                          ) : (
                            <>
                              {t.bookAppointment}
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </>
                          )
                        ) : (
                          <>
                            {t.nextBtn}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 justify-center text-[9px] text-zinc-500 font-mono select-none pt-2">
                      <Shield className="w-3 h-3 text-emerald-500" />
                      <span>{t.ndaText}</span>
                    </div>
                  </motion.div>
                ) : (
                  /* DIRECT DETAILED INQUIRY FORM */
                  <motion.form
                    key="inquiry-form"
                    onSubmit={handleSubmitInquiry}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6 relative z-10"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest font-semibold">{t.advisoryInquiry}</span>
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl font-medium">{t.contactHeadline}</h3>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        {t.contactSub}
                      </p>
                    </div>

                    <div className="space-y-4 pt-1">
                      {/* Brand Name */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">{t.fullName} *</label>
                        <input
                          id="form-brand-name"
                          type="text"
                          placeholder={t.fullNamePlaceholder}
                          value={brandName}
                          onChange={(e) => {
                            setBrandName(e.target.value);
                            if (errors.brandName) setErrors((prev) => ({ ...prev, brandName: undefined }));
                          }}
                          className={`w-full bg-zinc-900/50 border ${
                            errors.brandName ? "border-red-500/60" : "border-zinc-800/80"
                          } rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/60 placeholder:text-zinc-600 transition-colors`}
                        />
                        {errors.brandName && (
                          <p className="text-red-400 font-mono text-[10px] flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.brandName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">{t.corporateEmail} *</label>
                        <input
                          id="form-email"
                          type="text"
                          placeholder={t.corporateEmailPlaceholder}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          className={`w-full bg-zinc-900/50 border ${
                            errors.email ? "border-red-500/60" : "border-zinc-800/80"
                          } rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/60 placeholder:text-zinc-600 transition-colors`}
                        />
                        {errors.email && (
                          <p className="text-red-400 font-mono text-[10px] flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">{t.phoneNumber} *</label>
                        <input
                          id="form-phone-number"
                          type="text"
                          placeholder={t.phoneNumberPlaceholder}
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                          className={`w-full bg-zinc-900/50 border ${
                            errors.phone ? "border-red-500/60" : "border-zinc-800/80"
                          } rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/60 placeholder:text-zinc-600 transition-colors`}
                        />
                        {errors.phone && (
                          <p className="text-red-400 font-mono text-[10px] flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Industry */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">{t.industriesHeadline}</label>
                        <select
                          id="form-industry"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="w-full bg-zinc-900/50 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/60 transition-colors"
                        >
                          {INDUSTRIES.map(ind => (
                            <option key={ind.slug} value={ind.slug} className="bg-zinc-950 text-white">
                              {ind.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">{t.message}</label>
                        <textarea
                          id="form-message"
                          rows={3}
                          placeholder={t.messagePlaceholder}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-zinc-900/50 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/60 placeholder:text-zinc-600 transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* Submission triggers */}
                    <div className="pt-4 space-y-4">
                      <Magnetic className="w-full block">
                        <button
                          id="form-submit-btn"
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 font-mono text-xs uppercase tracking-widest font-semibold text-black hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                              {t.submittingBtn}
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              {t.submitBtn}
                            </>
                          )}
                        </button>
                      </Magnetic>
                      
                      <div className="flex items-center gap-2 justify-center text-[10px] text-zinc-500 font-mono select-none">
                        <Shield className="w-3 h-3 text-emerald-500" />
                        <span>{t.ndaText}</span>
                      </div>
                    </div>
                  </motion.form>
                )
              ) : activeTab === "wizard" ? (
                /* TICKETS CONFIRMED APPOINTMENT DISPLAY */
                <motion.div
                  key="ticket-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-4 flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/30 mb-1">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-[0.25em] font-semibold">
                      Appointment Secured
                    </span>
                    <h3 className="font-serif text-2xl text-white font-medium">
                      {t.apptConfirmed}
                    </h3>
                    <p className="text-zinc-400 text-[11px] leading-relaxed max-w-xs mx-auto">
                      {t.apptConfirmedSub}
                    </p>
                  </div>

                  {/* Premium Boarding Pass Ticket */}
                  <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative shadow-lg">
                    {/* Cutouts on the sides for ticket aesthetic */}
                    <div className="absolute top-[52%] -left-3 w-6 h-6 bg-zinc-950 rounded-full border border-zinc-800/80 z-20" />
                    <div className="absolute top-[52%] -right-3 w-6 h-6 bg-zinc-950 rounded-full border border-zinc-800/80 z-20" />

                    {/* Ticket Header */}
                    <div className="p-4 bg-zinc-900/80 border-b border-zinc-800/40 text-left flex justify-between items-center">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">{t.apptTicketTitle}</span>
                      <span className="font-mono text-[9px] text-emerald-400 font-bold">#TS-QA-{((brandName.length * email.length) % 89999) + 10000}</span>
                    </div>

                    {/* Ticket Body */}
                    <div className="p-5 text-left grid grid-cols-2 gap-y-4 gap-x-2">
                      <div className="space-y-1 col-span-2">
                        <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest block">PASSENGER BRAND</span>
                        <span className="font-sans text-xs font-semibold text-zinc-100 uppercase">{brandName || "CONFIDENTIAL CLIENT"}</span>
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest block">{t.apptDateLabel}</span>
                        <span className="font-sans text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          {selectedDate}, 2026
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest block">{t.apptTimeLabel}</span>
                        <span className="font-sans text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          {selectedTimeSlot.split(" ")[0]} {selectedTimeSlot.split(" ")[1]}
                        </span>
                      </div>

                      <div className="space-y-1 col-span-2">
                        <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest block">{t.apptGoalLabel}</span>
                        <span className="font-sans text-xs font-medium text-zinc-300 leading-snug block">
                          {selectedGoal === "seo" ? t.q1_opt1 : selectedGoal === "aeo" ? t.q1_opt2 : selectedGoal === "local" ? t.q1_opt3 : t.q1_opt4}
                        </span>
                      </div>
                    </div>

                    {/* Dashed Tear Line */}
                    <div className="border-t border-dashed border-zinc-800 my-1 mx-4" />

                    {/* Ticket Footer */}
                    <div className="p-4 bg-zinc-900/30 text-left flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest block">{t.apptStatusLabel}</span>
                        <span className="font-mono text-[9px] text-emerald-400 font-bold">{t.apptStatusValue}</span>
                      </div>
                      
                      {/* Mock Security Barcode */}
                      <div className="flex items-center gap-[1.5px] select-none">
                        {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7].map((val, idx) => (
                          <div
                            key={idx}
                            className="bg-zinc-700 h-6"
                            style={{ width: `${(val % 3) + 1.5}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    id="wizard-success-reset-btn"
                    onClick={() => {
                      setSubmitted(false);
                      setWizardStep(1);
                      setBrandName("");
                      setEmail("");
                      setPhoneNumber("");
                      setMessage("");
                      setSelectedGoal("");
                      setSelectedTraffic("");
                      setSelectedBudgetTier("");
                    }}
                    className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors pt-2 hover:underline cursor-pointer"
                  >
                    Schedule another appointment
                  </button>
                </motion.div>
              ) : (
                /* DIRECT FORM SUCCESS DISPLAY */
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-12 flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/30 mb-2">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-[0.25em] font-semibold">Transmission Successful</span>
                    <h3 className="font-serif text-3xl text-white font-medium">{t.validationSuccess}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed max-w-sm mx-auto">
                      Your business parameters have been encrypted and dispatched directly to ThinkSarath. 
                      A manual performance review of your brand is being processed.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-left space-y-1.5 w-full">
                    <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest block">Logged Coordinates</span>
                    <p className="text-xs text-zinc-300 font-mono">BRAND: {brandName}</p>
                    <p className="text-xs text-zinc-300 font-mono">EMAIL: {email}</p>
                    <p className="text-xs text-zinc-300 font-mono">PHONE: {phoneNumber}</p>
                    <p className="text-xs text-zinc-300 font-mono">BUDGET: ₹{monthlyInvestment.toLocaleString("en-IN")}/mo</p>
                    <p className="text-xs text-zinc-300 font-mono">CHANNELS: {selectedChannels.map(c => c.toUpperCase()).join(", ")}</p>
                  </div>

                  <button
                    id="success-reset-btn"
                    onClick={() => {
                      setSubmitted(false);
                      setBrandName("");
                      setEmail("");
                      setPhoneNumber("");
                      setMessage("");
                    }}
                    className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors pt-4 hover:underline cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </ElectricBorder>

        </div>
      </div>
    </section>
  );
}
