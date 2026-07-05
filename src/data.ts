export interface Stat {
  label: string;
  value: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: string;
  keyPoints: string[];
  luxuryContext: string; // Tailored specifically for the luxury segment
}

export interface Industry {
  name: string;
  description: string;
  slug: string;
}

export const STATS: Stat[] = [
  {
    value: "100+",
    label: "Brands Served",
    description: "Premium institutions, global scale, local prestige."
  },
  {
    value: "5+",
    label: "Years Experience",
    description: "Decades of digital transformation in modern organic channels."
  },
  {
    value: "3×",
    label: "Avg Traffic Growth",
    description: "Expedited organic acquisition across high-intent search platforms."
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    description: "Elite retention based on bespoke, revenue-aligned execution."
  },
  {
    value: "50+",
    label: "Page-1 Rankings",
    description: "Dominating ultra-competitive search fields for luxury offerings."
  }
];

export const SERVICES: Service[] = [
  {
    id: "seo",
    title: "Search Engine Optimisation",
    category: "Organic Growth",
    description: "Technical, on-page & off-page SEO that pushes your brand to the top of Google and keeps it there through every algorithm update.",
    metrics: "+240% Average Organic Growth",
    keyPoints: [
      "Technical Architecture & Core Web Vitals Auditing",
      "Semantic Relevance & High-Intent Keyword Strategy",
      "Premium Backlink Acquisition & Digital PR Campaigns",
      "Luxury UX/UI Mapping for Conversion Optimization"
    ],
    luxuryContext: "We craft immaculate content structures that align with the refined vocabulary of ultra-high-net-worth individuals, avoiding high-volume discount jargon."
  },
  {
    id: "aeo",
    title: "Answer Engine Optimisation",
    category: "AI Visibility",
    description: "Appear in ChatGPT, Perplexity & Google AI Overviews. AEO puts your brand inside AI-generated answers where your audience searches next.",
    metrics: "Top 3 Conversational Citations",
    keyPoints: [
      "Entity & Schema Markup Injection",
      "Conversational Query Mapping & Q&A Synthesis",
      "AI Overview Attribution Tracking",
      "Vector Embeddings Relevance Structuring"
    ],
    luxuryContext: "Luxury buyers bypass listicles. We optimize your brand to be recommended as the single premier choice by conversational AI interfaces."
  },
  {
    id: "geo",
    title: "Generative Engine Optimisation",
    category: "Future SEO",
    description: "GEO future-proofs your content for AI-generated search summaries — the fastest growing visibility channel in 2026.",
    metrics: "Next-Gen Search Domination",
    keyPoints: [
      "LLM Retrieval-Augmented Generation (RAG) Alignment",
      "Copiability & Citation Seed Creation",
      "Contextual Relevance Optimization for Claude & Gemini",
      "Dynamic Response Sentiment Hardening"
    ],
    luxuryContext: "Ensure your brand's unique attributes, heritage, and exclusivity are perfectly articulated in Generative Search Summaries."
  },
  {
    id: "gmb",
    title: "Google My Business",
    category: "Local SEO",
    description: "Dominate local search with a fully optimised GMB profile — photos, posts, reviews, citations & local rankings all managed.",
    metrics: "#1 Premium Map Pack Placement",
    keyPoints: [
      "Precision Coordinates & Hyper-Local Schema",
      "Curated Photography & Luxury Visual Guidelines",
      "Bespoke Review Acquisition & Reputation Crafting",
      "Local Citation Synthesis & Audit Prevention"
    ],
    luxuryContext: "Your brick-and-mortar storefront is a portal. We ensure your GMB listing reflects the premium, physical experience of your brand."
  },
  {
    id: "gads",
    title: "Google Ads",
    category: "PPC",
    description: "Search, Display & Performance Max campaigns built for ROAS. Precise targeting, compelling copy, continuous optimisation.",
    metrics: "4.8× Average Campaign ROAS",
    keyPoints: [
      "Affluent Demographics & Custom Intent Segmenting",
      "Exquisite Copywriting & High-Conversion Ad Formats",
      "Negative-Keyword Filtering to Eliminate Low-Value Clicks",
      "Advanced Attribution Modeling & Conversion APIs"
    ],
    luxuryContext: "We target surgical micro-segments—not crowds. Every rupee spent is directed strictly toward verified high-intent decision-makers."
  },
  {
    id: "meta",
    title: "Meta Ads",
    category: "Paid Social",
    description: "Facebook & Instagram campaigns that reach your ideal customer, generate qualified leads and deliver measurable ROI every month.",
    metrics: "High-Caliber Lead Generation",
    keyPoints: [
      "Immersive Visual Storytelling & Instant Experiences",
      "Lookalike Modeling from Elite Purchaser Seed Lists",
      "Multi-Stage Retargeting Funnels for Long Sales Cycles",
      "Transparent Real-time Dashboard Attribution"
    ],
    luxuryContext: "Elevate your visual presence. We design campaigns that evoke desire, keeping click-bait out and high-fashion aesthetics in."
  },
  {
    id: "webdev",
    title: "Website Development",
    category: "Web Dev",
    description: "Fast, SEO-optimised, conversion-ready websites on WordPress or Webflow — built to rank and built to convert from day one.",
    metrics: "95+ Mobile Performance Score",
    keyPoints: [
      "Custom Typography & Editorial Layout Systems",
      "Blazing Fast Static Generation & Server-Side Rendering",
      "Seamless Interactive Motion & Micro-Transitions",
      "SEO Structural Integrity Prepared on Day One"
    ],
    luxuryContext: "We build digital flagship stores. Clean code, exquisite spacing, and custom-engineered speed that acts as an invisible signal of luxury."
  },
  {
    id: "seo_consult",
    title: "SEO Consultancy",
    category: "Consulting",
    description: "End-to-end SEO consulting for brands of every size — audit, strategy, team training, implementation and monthly reporting.",
    metrics: "Strategic Growth Roadmap",
    keyPoints: [
      "Comprehensive Digital Footprint Assessment",
      "In-House Content & Dev Team Training Blocks",
      "Algorithmic Risk Management & Legacy Recoveries",
      "Direct Board-level SEO KPIs & Performance Syncs"
    ],
    luxuryContext: "Strategic direction for boutique firms and historic houses. We guide your teams to create assets that age like fine vintage."
  },
  {
    id: "dm_consult",
    title: "Digital Marketing Consultancy",
    category: "Strategy",
    description: "Full-funnel strategy covering every touchpoint — I act as your dedicated growth advisor aligning all channels to revenue.",
    metrics: "Chief Growth Advisor Access",
    keyPoints: [
      "Bespoke Omnichannel Customer Journey Mapping",
      "Elite Marketing Technology Stack Selection",
      "Customer Acquisition Cost (CAC) Optimisation",
      "Monthly Revenue Performance Attribution Reporting"
    ],
    luxuryContext: "Personalized, high-touch advisory. Think of me as your fractional CMO, shaping your brand's digital legacy with absolute discretion."
  }
];

export const INDUSTRIES: Industry[] = [
  {
    name: "Healthcare",
    description: "Elite private wellness, specialized medical centers, and premium healthcare operations looking to build digital authority.",
    slug: "healthcare"
  },
  {
    name: "Real Estate",
    description: "Luxury residential developments, premium commercial properties, and boutique real estate firms in premium Chennai corridors.",
    slug: "real-estate"
  },
  {
    name: "Retail",
    description: "Designer labels, high-end lifestyle boutiques, and artisanal retail platforms seeking digital flagship conversion structures.",
    slug: "retail"
  },
  {
    name: "Education",
    description: "Elite international academies, specialized design institutes, and premium executive coaching channels.",
    slug: "education"
  },
  {
    name: "Manufacturing",
    description: "High-end engineered components, design-first industrial systems, and precision architectural equipment builders.",
    slug: "manufacturing"
  },
  {
    name: "Hospitality",
    description: "Boutique resorts, premium heritage stays, fine dining establishments, and exclusive wellness retreats.",
    slug: "hospitality"
  },
  {
    name: "Technology",
    description: "SaaS platforms, bespoke AI solutions, deep tech ventures, and custom design agencies scaling global footprints.",
    slug: "technology"
  },
  {
    name: "Legal & Finance",
    description: "Exclusive wealth management partners, corporate legal advisory desks, and boutique family offices.",
    slug: "legal-finance"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Sarath completely transformed our digital presence. He didn't just drive traffic; he brought in the exact high-net-worth clientele we were aiming for. His strategic focus on AI visibility (AEO) has put us years ahead of our competition.",
    author: "Malathi Krishnan",
    title: "Managing Director, Chennai Heritage Estates",
    avatar: "MK"
  },
  {
    quote: "An absolute master of technical SEO. In a landscape where agencies gave us generic reports, Sarath provided direct, high-level code directives and content strategies that tripled our high-intent lead volume in under six months.",
    author: "Dr. Vikram Seth",
    title: "Chief of Surgery, Apex Holistic Care",
    avatar: "VS"
  },
  {
    quote: "Our transition into direct-to-consumer luxury retail required a website that loaded instantly and ranked flawlessly. ThinkSarath delivered both a magnificent Web development masterpiece and a perfect launchpad for Meta Ads that yielded a 5× ROAS.",
    author: "Aditi Seshadri",
    title: "Creative Director, SESH Designer Jewelry",
    avatar: "AS"
  }
];
