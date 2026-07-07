import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ta";

export const translations = {
  en: {
    // Header
    engine: "Engine",
    metrics: "Metrics",
    capabilities: "Capabilities",
    industries: "Industries",
    advisory: "Advisory",
    inquirePrivately: "Inquire Privately",
    localTime: "LOCAL TIME",
    chennai: "CHENNAI, IN",
    tableOfNavigation: "Table of Navigation",
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navBlog: "Blog",
    navFaq: "FAQ",
    navContact: "Contact",
    navFrameworks: "Method™",
    
    // Hero
    digitalMarketingAdvisor: "Digital Marketing Advisor",
    heroHeadline: "Precision Organic Search Engineering for High-Growth Ventures.",
    heroSubtitle: "I craft bespoke search solutions (SEO, AEO, GEO) that place your enterprise in front of high-intent clients. Absolute mathematical clarity. Zero vanity metrics.",
    explore3D: "Explore 3D Marketing Engine",
    requestPrivateAudit: "Request Private Audit",
    activeAdvisor: "ACTIVE ADVISOR IN SOUTH INDIA",
    guaranteedNoLeakage: "GUARANTEED DATA SECURE & CONFLICT-FREE",
    interactiveStage: "INTERACTIVE COGNITIVE RADAR STAGE",
    
    // Stats Section
    metricsHeadline: "Audited performance metrics that validate trust.",
    metricsSubtitle: "Real numbers, verified growth, and sustained organic positioning.",
    brandsServed: "Brands Served",
    yearsExperience: "Years Experience",
    avgTrafficGrowth: "Avg Traffic Growth",
    clientSatisfaction: "Client Satisfaction",
    pageRankings: "Page-1 Rankings",
    
    // Capabilities Section
    capabilitiesHeadline: "High-Caliber Capabilities",
    capabilitiesSub: "Surgical execution across organic, conversational AI, and paid media funnels.",
    moreContext: "More context",
    lessContext: "Less context",
    metricsTitle: "Key Metric:",
    strategicFocus: "Strategic Focus:",
    
    // Industries Section
    industriesHeadline: "Exclusive Segments Served",
    industriesSub: "We design tailored digital funnels for select high-end industry verticals.",
    
    // Contact Section
    advisoryInquiry: "Advisory Inquiry",
    contactHeadline: "Initiate Private Consultation Alignment",
    contactSub: "Begin with a confidential digital footprint assessment. Fill out the details below to evaluate alignment.",
    selectBudget: "SELECT CONFIDENTIAL MONTHLY ADVISORY BUDGET (INR):",
    selectTargetChannels: "SELECT CHANNELS OF INTEREST:",
    fullName: "FULL NAME",
    fullNamePlaceholder: "Enter your full name",
    corporateEmail: "CORPORATE EMAIL",
    corporateEmailPlaceholder: "name@company.com",
    phoneNumber: "PHONE NUMBER",
    phoneNumberPlaceholder: "e.g. +91 98765 43210",
    message: "CONFIDENTIAL CONTEXT / PRINCIPAL GOALS",
    messagePlaceholder: "Briefly detail your primary digital constraints or target outcomes...",
    submittingBtn: "Encrypting Alignment...",
    submitBtn: "Transmit Secure Inquiry",
    ndaText: "PROTECTED BY RIGID MUTUAL NON-DISCLOSURE PACTS (NDA)",
    budgetEstimate: "CONFIDENTIAL BUDGET ASSESSMENT",
    suggestedBlueprint: "Suggested Blueprint",
    investmentTier: "Investment Tier",
    estimatedDeliverables: "Estimated Deliverables",
    expectedRoasTimeline: "Expected Timeline",
    
    // Interactive Q/A Consultation Appointment
    consultationWizard: "Consultation Wizard",
    directInquiry: "Direct Inquiry",
    interactiveWizard: "Interactive Q/A",
    qaSub: "Answer 4 quick questions to qualify and secure your free strategic advisory slot.",
    stepLabel: "Step",
    nextBtn: "Next Step",
    prevBtn: "Back",
    selectOptionError: "Please select an option to continue.",
    question1: "What is your primary growth goal?",
    q1_opt1: "Scale Organic Traffic (Premium SEO)",
    q1_opt2: "Dominate AI Citations (AEO/GEO)",
    q1_opt3: "Hyperlocal Dominance (Chennai & South)",
    q1_opt4: "Undertake Comprehensive Digital Audit",
    question2: "What is your brand's current monthly traffic?",
    q2_opt1: "Under 10k monthly visitors",
    q2_opt2: "10k - 100k monthly visitors",
    q2_opt3: "100k - 1M monthly visitors",
    q2_opt4: "Enterprise Elite (1M+ visitors)",
    question3: "What is your target monthly budget tier?",
    q3_opt1: "Confidential Tier (₹5,000 - ₹1,00,000/mo)",
    q3_opt2: "Scale Tier (₹1,00,000 - ₹2,50,000/mo)",
    q3_opt3: "Enterprise Elite (₹2,50,000 - ₹5,00,000+/mo)",
    question4: "Select your preferred consultation time slot:",
    selectDate: "Choose Date",
    selectTime: "Choose Time Slot",
    bookAppointment: "Confirm Appointment Slot",
    securingSlot: "Securing Your Priority Slot...",
    apptTicketTitle: "SECURED ADVISORY ENTRANCE",
    apptConfirmed: "Your Private Consultation is Confirmed",
    apptConfirmedSub: "A secure Google Meet calendar invite with your performance pre-audit draft has been scheduled.",
    apptDateLabel: "DATE",
    apptTimeLabel: "TIME SLOT",
    apptGoalLabel: "GROWTH GOAL",
    apptStatusLabel: "STATUS",
    apptStatusValue: "CONFIRMED & ENCRYPTED",
    
    // Toast & Form Validation
    validationEmailEmpty: "Corporate email is required.",
    validationEmailInvalid: "Please provide a valid corporate email (e.g., name@company.com).",
    validationPhoneEmpty: "Phone number is required.",
    validationPhoneInvalid: "Please enter a valid phone number (10+ digits with optional country code).",
    validationNameEmpty: "Full name is required.",
    validationMessageEmpty: "Message context is required.",
    validationSuccess: "Your inquiry has been encrypted and transmitted securely."
  },
  ta: {
    // Header
    engine: "இயந்திரம்",
    metrics: "அளவீடுகள்",
    capabilities: "திறன்கள்",
    industries: "துறைகள்",
    advisory: "ஆலோசனை",
    inquirePrivately: "தனிப்பட்ட விசாரணை",
    localTime: "உள்ளூர் நேரம்",
    chennai: "சென்னை, இந்தியா",
    tableOfNavigation: "வழிசெலுத்தல் அட்டவணை",
    navHome: "முகப்பு",
    navAbout: "பற்றி",
    navServices: "சேவைகள்",
    navBlog: "வலைப்பதிவு",
    navFaq: "கேள்விகள்",
    navContact: "தொடர்பு",
    navFrameworks: "வழிமுறை™",
    
    // Hero
    digitalMarketingAdvisor: "டிஜிட்டல் சந்தைப்படுத்தல் ஆலோசகர்",
    heroHeadline: "உயர் வளர்ச்சி நிறுவனங்களுக்கான துல்லியமான ஆர்கானிக் தேடல் பொறியியல்.",
    heroSubtitle: "உயர்-நோக்க வாடிக்கையாளர்களுக்கு முன்னால் உங்கள் நிறுவனத்தை நிலைநிறுத்தும் தனிப்பயனாக்கப்பட்ட தேடல் தீர்வுகளை (SEO, AEO, GEO) நான் வடிவமைக்கிறேன். முழுமையான கணித தெளிவு. தேவையற்ற வெற்று அளவீடுகள் இல்லை.",
    explore3D: "3D சந்தைப்படுத்தல் இயந்திரத்தை ஆராய்க",
    requestPrivateAudit: "தனிப்பட்ட தணிக்கை கோருக",
    activeAdvisor: "தென்னிந்தியாவில் செயல்படும் முன்னணி ஆலோசகர்",
    guaranteedNoLeakage: "தரவு பாதுகாப்பு மற்றும் முரண்பாடற்றது உறுதி",
    interactiveStage: "ஊடாடும் அறிவாற்றல் ரேடார் மேடை",
    
    // Stats Section
    metricsHeadline: "நம்பிக்கையை உறுதிப்படுத்தும் செயல்திறன் அளவீடுகள்.",
    metricsSubtitle: "உண்மையான எண்கள், சரிபார்க்கப்பட்ட வளர்ச்சி மற்றும் நீடித்த ஆர்கானிக் நிலைப்பாடு.",
    brandsServed: "சேவை செய்த பிராண்டுகள்",
    yearsExperience: "ஆண்டுகள் அனுபவம்",
    avgTrafficGrowth: "சராசரி போக்குவரத்து வளர்ச்சி",
    clientSatisfaction: "வாடிக்கையாளர் திருப்தி",
    pageRankings: "முதல்-பக்க தரவரிசைகள்",
    
    // Capabilities Section
    capabilitiesHeadline: "உயர்-திறன் திறன்கள்",
    capabilitiesSub: "ஆர்கானிக், உரையாடல் AI மற்றும் கட்டண ஊடகப் பாதைகளில் துல்லியமான செயல்படுத்தல்.",
    moreContext: "கூடுதல் தகவல்",
    lessContext: "சுருக்கமான தகவல்",
    metricsTitle: "முக்கிய அளவீடு:",
    strategicFocus: "மூலோபாய கவனம்:",
    
    // Industries Section
    industriesHeadline: "நாங்கள் சேவை செய்யும் பிரத்தியேக துறைகள்",
    industriesSub: "தேர்ந்தெடுக்கப்பட்ட உயர்தர தொழில்துறை பிரிவுகளுக்கு ஏற்ப வடிவமைக்கப்பட்ட டிஜிட்டல் பாதைகளை உருவாக்குகிறோம்.",
    
    // Contact Section
    advisoryInquiry: "ஆலோசனை விசாரணை",
    contactHeadline: "தனிப்பட்ட ஆலோசனைக்கான தொடர்பை தொடங்குங்கள்",
    contactSub: "இரகசிய டிஜிட்டல் தணிக்கையுடன் தொடங்குங்கள். உங்கள் தேவைகளை மதிப்பீடு செய்ய கீழே உள்ள விவரங்களை நிரப்பவும்.",
    selectBudget: "இரகசிய மாதாந்திர ஆலோசனை வரவுசெலவு திட்டத்தை தேர்வு செய்க (INR):",
    selectTargetChannels: "ஆர்வமுள்ள சேனல்களைத் தேர்வுசெய்க:",
    fullName: "முழு பெயர்",
    fullNamePlaceholder: "உங்கள் முழுப் பெயரை உள்ளிடவும்",
    corporateEmail: "நிறுவன மின்னஞ்சல்",
    corporateEmailPlaceholder: "name@company.com",
    phoneNumber: "தொலைபேசி எண்",
    phoneNumberPlaceholder: "உதாரணமாக: +91 98765 43210",
    message: "இரகசிய சூழல் / முக்கிய இலக்குகள்",
    messagePlaceholder: "உங்கள் முக்கிய டிஜிட்டல் தேவைகள் அல்லது இலக்குகளை சுருக்கமாக விளக்கவும்...",
    submittingBtn: "இணைப்பை குறியாக்கமாக்குகிறது...",
    submitBtn: "பாதுகாப்பான விசாரணையை அனுப்புக",
    ndaText: "இருதரப்பு இரகசிய காப்பு ஒப்பந்தத்தின் (NDA) மூலம் பாதுகாக்கப்பட்டது",
    budgetEstimate: "இரகசிய வரவுசெலவு மதிப்பீடு",
    suggestedBlueprint: "பரிந்துரைக்கப்பட்ட திட்டம்",
    investmentTier: "முதலீட்டு அடுக்கு",
    estimatedDeliverables: "மதிப்பிடப்பட்ட பலன்கள்",
    expectedRoasTimeline: "எதிர்பார்க்கப்படும் காலக்கெடு",
    
    // Interactive Q/A Consultation Appointment
    consultationWizard: "ஆலோசனை வழிகாட்டி",
    directInquiry: "நேரடி விசாரணை",
    interactiveWizard: "ஊடாடும் Q/A",
    qaSub: "உங்கள் இலவச ஆலோசனையைப் பெற 4 எளிய கேள்விகளுக்குப் பதிலளிக்கவும்.",
    stepLabel: "படி",
    nextBtn: "அடுத்த படி",
    prevBtn: "பின்னால்",
    selectOptionError: "தொடர ஏதேனும் ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
    question1: "உங்கள் முதன்மை வளர்ச்சி இலக்கு என்ன?",
    q1_opt1: "ஆர்கானிக் டிராஃபிக்கை அதிகரித்தல் (Premium SEO)",
    q1_opt2: "AI தேடல்களில் முதலிடம் (AEO/GEO)",
    q1_opt3: "உள்ளூர் சந்தையில் ஆதிக்கம் (சென்னை & தெற்கு)",
    q1_opt4: "முழுமையான டிஜிட்டல் தணிக்கை",
    question2: "உங்கள் பிராண்டின் தற்போதைய மாதாந்திர டிராஃபிக் என்ன?",
    q2_opt1: "10k-க்கும் குறைவாக",
    q2_opt2: "10k - 100k பார்வையாளர்கள்",
    q2_opt3: "100k - 1M பார்வையாளர்கள்",
    q2_opt4: "முன்னணி நிறுவனம் (1M+ பார்வையாளர்கள்)",
    question3: "உங்கள் மாதாந்திர பட்ஜெட் என்ன?",
    q3_opt1: "நடுத்தர பட்ஜெட் (₹5ஆயிரம் - ₹1லட்சம்/மாதம்)",
    q3_opt2: "வளர்ச்சி பட்ஜெட் (₹1லட்சம் - ₹2.5லட்சம்/மாதம்)",
    q3_opt3: "பிரீமியம் பட்ஜெட் (₹2.5லட்சம் - ₹5லட்சம்+/மாதம்)",
    question4: "உங்களுக்கு விருப்பமான ஆலோசனை நேரத்தைத் தேர்ந்தெடுக்கவும்:",
    selectDate: "தேதியைத் தேர்ந்தெடுக்கவும்",
    selectTime: "நேரத்தைத் தேர்ந்தெடுக்கவும்",
    bookAppointment: "ஆலோசனை நேரத்தை உறுதிசெய்",
    securingSlot: "நேரத்தை உறுதிசெய்கிறது...",
    apptTicketTitle: "உறுதிசெய்யப்பட்ட அனுமதிச் சீட்டு",
    apptConfirmed: "உங்கள் தனிப்பட்ட ஆலோசனை உறுதிசெய்யப்பட்டது",
    apptConfirmedSub: "கூகுள் மீட் காலண்டர் அழைப்பிதழும் உங்கள் செயல்திறன் தணிக்கை வரைவும் திட்டமிடப்பட்டுள்ளது.",
    apptDateLabel: "தேதி",
    apptTimeLabel: "நேரம்",
    apptGoalLabel: "வளர்ச்சி இலக்கு",
    apptStatusLabel: "நிலை",
    apptStatusValue: "உறுதிசெய்யப்பட்டு பாதுகாக்கப்பட்டது",
    
    // Toast & Form Validation
    validationEmailEmpty: "நிறுவன மின்னஞ்சல் தேவை.",
    validationEmailInvalid: "முறையான நிறுவன மின்னஞ்சலை வழங்கவும் (எ.கா., name@company.com).",
    validationPhoneEmpty: "தொலைபேசி எண் தேவை.",
    validationPhoneInvalid: "சரியான தொலைபேசி எண்ணை உள்ளிடவும் (குறைந்தது 10 இலக்கங்கள்).",
    validationNameEmpty: "முழு பெயர் தேவை.",
    validationMessageEmpty: "விசாரணை செய்தி தேவை.",
    validationSuccess: "உங்கள் விசாரணை குறியாக்கப்பட்டு பாதுகாப்பாக அனுப்பப்பட்டது."
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("preferred_language");
    return (saved === "ta" ? "ta" : "en") as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
