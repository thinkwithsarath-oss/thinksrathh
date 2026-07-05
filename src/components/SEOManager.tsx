import React, { useEffect } from "react";
import { useNavigation, PageType } from "../context/NavigationContext";
import { useLanguage } from "../context/LanguageContext";
import { BLOG_POSTS } from "../data/blogPosts";

export default function SEOManager() {
  const { currentPage, activeBlogPostId } = useNavigation();
  const { language } = useLanguage();

  useEffect(() => {
    // 1. Dynamic Page Configuration based on Current Route Node
    const getPageSEO = (page: PageType) => {
      const isTa = language === "ta";
      
      switch (page) {
        case "about":
          return {
            title: isTa 
              ? "சரத் பாபு கே பற்றி | AI எஸ்சிஓ & டிஜிட்டல் மார்க்கெட்டிங் ஆலோசகர் | ThinkSarath"
              : "About Sarath Babu K | AI SEO & Search Growth Consultant | ThinkSarath",
            description: isTa
              ? "சரத் பாபு கே, திங்சரத் நிறுவனர், ஏஐ எஸ்சிஓ, ஜிஇஓ, ஏஇஓ மற்றும் புரோகிராமாடிக் எஸ்சிஓ நிபுணர். சென்னை மற்றும் ஈரோடு ஆஃப்லைன்/ஆன்லைன் ஆலோசனை."
              : "Sarath Babu K is an AI SEO Consultant & AI Digital Marketer specializing in SEO, AEO, GEO, Programmatic SEO, AI automation, and paid advertising. Founder of ThinkSarath.",
            keywords: "Sarath Babu K, ThinkSarath founder, Code99 Head of Digital Marketing, ZenX Academy Trainer, AI Digital Marketing Mentor Chennai, Erode SEO, AI SEO India, GEO consultant Chennai, Tamil Nadu SEO specialist",
            url: `${window.location.origin}/about`
          };
        case "services":
          return {
            title: isTa
              ? "ஏஐ எஸ்சிஓ, ஜிஇஓ, ஏஇஓ & பிஎஸ்சிஓ சேவைகள் | ThinkSarath"
              : "AI SEO, GEO, AEO & Programmatic SEO Services | ThinkSarath",
            description: isTa
              ? "பிரைமியம் ஆர்கானிக் எஸ்சிஓ, ஜிஇஓ (GEO), ஏஇஓ (AEO), புரோகிராமாடிக் எஸ்சிஓ (pSEO), அதிவேக வேர்ட்பிரஸ் இணையதள வடிவமைப்பு மற்றும் கூகிள்/மெட்டா விளம்பரம்."
              : "Bespoke digital marketing and search optimization services: Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), pSEO, and paid ads.",
            keywords: "GEO services, AEO consulting Chennai, Programmatic SEO database systems, WordPress Custom Development India, Google Ads setup, Meta Conversions API Tamil Nadu, lead generation Chennai",
            url: `${window.location.origin}/services`
          };
        case "blog": {
          const post = BLOG_POSTS.find(p => p.id === activeBlogPostId);
          if (post) {
            return {
              title: isTa 
                ? `${post.title} | திங்சரத்`
                : `${post.title} | ThinkSarath AI SEO Digest`,
              description: post.excerpt,
              keywords: post.tags.join(", ") + ", " + (isTa ? "ThinkSarath, ஏஐ எஸ்சிஓ" : "ThinkSarath, AI SEO, GEO, AEO"),
              url: `${window.location.origin}/blog/${post.id}`
            };
          }
          return {
            title: isTa
              ? "வலைப்பதிவு | ஏஐ எஸ்சிஓ, பிஎஸ்சிஓ மற்றும் தேடல் உகப்பாக்கம் வழிகாட்டிகள் | ThinkSarath"
              : "ThinkSarath Digest | AI SEO, GEO, AEO & pSEO Blueprint Guides",
            description: isTa
              ? "ஏஐ எஸ்சிஓ, புரோகிராமாடிக் எஸ்சிஓ, கூகிள் மற்றும் மெட்டா விளம்பர உத்திகள் குறித்த பிரத்தியேக எஸ்சிஓ வழிகாட்டிகள் மற்றும் கேஸ் ஸ்டடீஸ்."
              : "Discover technical blueprints, search insights, and strategic frameworks on Generative Engine Optimization (GEO), Programmatic SEO (pSEO), paid marketing, and AI automation.",
            keywords: "SEO blog Chennai, AEO guides, GEO case studies, Programmatic WordPress models, Google crawl budget tips, organic citation mapping",
            url: `${window.location.origin}/blog`
          };
        }
        case "faq":
          return {
            title: isTa
              ? "கேள்விகள் | ஏஐ எஸ்சிஓ, ஜிஇஓ, ஏஇஓ & சென்னை பயிற்சி விவரங்கள் | ThinkSarath"
              : "AI SEO, GEO, AEO & Programmatic SEO FAQ | ThinkSarath Advisory",
            description: isTa
              ? "ஜிஇஓ நுட்பங்கள், புரோகிராமாடிக் எஸ்சிஓ பாதுகாப்பு, சென்னை/ஈரோடு பயிற்சி வழிகாட்டல்கள் மற்றும் ரகசிய ஒப்பந்தங்கள் (NDA) குறித்த விரிவான விளக்கங்கள்."
              : "Clear answers on Generative Engine Optimization (GEO), Programmatic SEO (pSEO) safety, client NDA structures, and hybrid AI search marketing training details.",
            keywords: "SEO FAQ, GEO citation pricing, Code99 training Chennai, ZenX Academy hybrid courses, NDA marketing agency India, local search positioning Chennai",
            url: `${window.location.origin}/faq`
          };
        case "contact":
          return {
            title: isTa
              ? "தொடர்பு கொள்ள | ஏஐ எஸ்சிஓ & டிஜிட்டல் மார்க்கெட்டிங் தணிக்கை | ThinkSarath"
              : "Contact ThinkSarath | Book AI SEO & Digital Marketing Audit",
            description: isTa
              ? "டிஜிட்டல் வளர்ச்சி மற்றும் ஆர்கானிக் எஸ்சிஓ தேவைகளுக்காக சரத் பாபு கே உடன் நேரடியாக தொடர்பு கொள்ளவும். சென்னை மற்றும் ஈரோடு ஆலோசனை."
              : "Get in touch with Sarath Babu K to secure your customized search blueprint. Inquire about premium retainer consulting, AEO/GEO audits, and partnerships.",
            keywords: "Contact ThinkSarath, Book SEO audit Chennai, Sarath Babu K contact number, hire pSEO expert Erode, premium marketing retainer India, digital growth consultancy Chennai",
            url: `${window.location.origin}/contact`
          };
        case "frameworks":
          return {
            title: isTa
              ? "திங்சரத் வழிமுறை™ | ஏஐ எஸ்சிஓ, ஜிஇஓ & ஏஇஓ கட்டமைப்புகள்"
              : "ThinkSarath Method™ | AI SEO, GEO & AEO Frameworks",
            description: isTa
              ? "திங்சரத் வழிமுறை™ மற்றும் ஏஐ எஸ்சிஓ (AI SEO), ஜிஇஓ (GEO), ஏஇஓ (AEO) மற்றும் புரோகிராமாடிக் எஸ்சிஓ கட்டமைப்புகள் குறித்த பிரத்தியேக விவரங்கள்."
              : "Explore the proprietary ThinkSarath Method™ and official frameworks for AI SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and programmatic scaling.",
            keywords: "ThinkSarath Method, AI SEO Framework, GEO Optimization system, AEO schema checklist, SEO checklist Chennai, Sarath Babu K proprietary models",
            url: `${window.location.origin}/frameworks`
          };
        case "home":
        default:
          return {
            title: isTa
              ? "திங்சரத் | ஏஐ எஸ்சிஓ, ஏஇஓ & பிஎஸ்சிஓ ஆலோசகர் சென்னை"
              : "ThinkSarath | AI SEO, AEO, GEO & Programmatic SEO Consultant",
            description: isTa
              ? "சரத் பாபு கே வழங்கும் பிரீமியம் எஸ்சிஓ, புரோகிராமாடிக் எஸ்சிஓ, ஏஐ தேடுபொறி உகப்பாக்கம் (GEO/AEO) மற்றும் டிஜிட்டல் வளர்ச்சி சேவைகள்."
              : "ThinkSarath is the personal brand of Sarath Babu K, an AI SEO Consultant and AI Digital Marketer specializing in GEO, AEO, Programmatic SEO (pSEO), AI automation, and paid search growth.",
            keywords: "AI SEO, GEO, AEO, Programmatic SEO, Search Marketing Consultant, Chennai SEO, WordPress Speed Optimization, Sarath Babu K, ThinkSarath Erode",
            url: window.location.origin
          };
      }
    };

    const config = getPageSEO(currentPage);

    // 2. DOM Modification for Meta Tags & Document Title
    document.title = config.title;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Update standard meta headers
    updateMetaTag("description", config.description);
    updateMetaTag("keywords", config.keywords);
    updateMetaTag("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    // Update Open Graph (OG) social tags
    updateMetaTag("og:title", config.title, true);
    updateMetaTag("og:description", config.description, true);
    updateMetaTag("og:url", config.url, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:locale", language === "ta" ? "ta_IN" : "en_US", true);

    // Update Twitter Cards tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", config.title);
    updateMetaTag("twitter:description", config.description);

    // Update Canonical URL link element
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", config.url);

    // 3. Dynamic JSON-LD Schema Generation & Injection (Highly AEO, GEO & Search Bot Optimized)
    const generateSchemaMarkup = (page: PageType) => {
      // Base entities to build solid entity networks
      const personEntity = {
        "@type": "Person",
        "@id": `${window.location.origin}/#person-sarath`,
        "name": "Sarath Babu K",
        "alternateName": "ThinkSarath",
        "jobTitle": "AI Digital Marketing Consultant & AI SEO Specialist",
        "description": "Founder at ThinkSarath | AI SEO & Search Growth Consultant | SEO, AEO, GEO & Programmatic SEO | Google Ads | AI Automation | Helping Businesses Grow Through AI Search",
        "url": `${window.location.origin}/about`,
        "telephone": "+917094629042",
        "email": "thinkwithsarath@gmail.com",
        "sameAs": [
          "https://www.linkedin.com/in/sarathbabuk/",
          "https://github.com/thinkwithsarath"
        ],
        "knowsAbout": [
          "SEO",
          "AI SEO",
          "Answer Engine Optimization (AEO)",
          "Generative Engine Optimisation (GEO)",
          "Programmatic SEO (pSEO)",
          "Technical SEO",
          "Local SEO",
          "Content Strategy",
          "Google Ads",
          "Meta Ads",
          "Conversion Rate Optimization (CRO)",
          "WordPress Development",
          "Marketing Automation",
          "AI Agents",
          "Prompt Engineering",
          "LLMs",
          "AI Search Optimization"
        ],
        "worksFor": [
          {
            "@type": "Organization",
            "name": "LuMay AI",
            "url": "https://lumay.ai",
            "description": "AI & Search Marketing Projects"
          },
          {
            "@type": "EducationalOrganization",
            "name": "Code99 IT Academy",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Chennai",
              "addressRegion": "Tamil Nadu",
              "addressCountry": "IN"
            }
          },
          {
            "@type": "EducationalOrganization",
            "name": "ZenX Academy",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Chennai",
              "addressRegion": "Tamil Nadu",
              "addressCountry": "IN"
            }
          }
        ]
      };

      const organizationEntity = {
        "@type": "ProfessionalService",
        "@id": `${window.location.origin}/#org-thinksarath`,
        "name": "ThinkSarath",
        "url": window.location.origin,
        "logo": `${window.location.origin}/icon-512.png`,
        "telephone": "+917094629042",
        "email": "thinkwithsarath@gmail.com",
        "priceRange": "$$$",
        "founder": {
          "@id": `${window.location.origin}/#person-sarath`
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Erode & Chennai",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "13.0827",
          "longitude": "80.2707"
        },
        "areaServed": [
          {
            "@type": "Country",
            "name": "India"
          },
          {
            "@type": "Country",
            "name": "United States"
          },
          {
            "@type": "Country",
            "name": "United Kingdom"
          }
        ]
      };

      const baseSchemaContext = {
        "@context": "https://schema.org",
        "@graph": [] as any[]
      };

      switch (page) {
        case "about":
          baseSchemaContext["@graph"] = [
            {
              "@type": "ProfilePage",
              "@id": `${window.location.origin}/about-profile`,
              "mainEntity": personEntity,
              "isPartOf": {
                "@type": "WebSite",
                "@id": `${window.location.origin}/#website`,
                "name": "ThinkSarath",
                "url": window.location.origin
              }
            }
          ];
          break;

        case "services":
          baseSchemaContext["@graph"] = [
            organizationEntity,
            personEntity,
            {
              "@type": "Service",
              "serviceType": "Generative Engine Optimisation (GEO) & AEO",
              "provider": { "@id": `${window.location.origin}/#org-thinksarath` },
              "description": "Structuring brand assets, unstructured citations, and entity density to secure citations and top placements in LLMs like ChatGPT, Claude, and Gemini.",
              "areaServed": { "@type": "Country", "name": "India" }
            },
            {
              "@type": "Service",
              "serviceType": "Programmatic SEO (pSEO) Architectures",
              "provider": { "@id": `${window.location.origin}/#org-thinksarath` },
              "description": "Constructing database mapping tables and ultra-fast WordPress landing engines to capture high volume, low-competition search coordinates."
            },
            {
              "@type": "Service",
              "serviceType": "Bespoke Custom WordPress Engineering",
              "provider": { "@id": `${window.location.origin}/#org-thinksarath` },
              "description": "Building lightning-fast corporate directory sites achieving 95+ mobile performance score out-of-the-box."
            },
            {
              "@type": "Service",
              "serviceType": "Paid PPC Campaign Optimization",
              "provider": { "@id": `${window.location.origin}/#org-thinksarath` },
              "description": "Google & Meta paid media with surgical negative keyword mapping and offline conversion APIs to prevent click-bleeding."
            }
          ];
          break;

        case "blog": {
          const activePost = BLOG_POSTS.find(p => p.id === activeBlogPostId);
          if (activePost) {
            baseSchemaContext["@graph"] = [
              organizationEntity,
              personEntity,
              {
                "@type": "BlogPosting",
                "@id": `${window.location.origin}/blog/${activePost.id}#posting`,
                "headline": activePost.title,
                "datePublished": activePost.date,
                "author": {
                  "@type": "Person",
                  "name": "Sarath Babu K",
                  "@id": `${window.location.origin}/#person-sarath`
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "ThinkSarath",
                  "@id": `${window.location.origin}/#org-thinksarath`,
                  "logo": `${window.location.origin}/icon-512.png`
                },
                "description": activePost.excerpt,
                "url": `${window.location.origin}/blog/${activePost.id}`,
                "mainEntityOfPage": `${window.location.origin}/blog/${activePost.id}`
              }
            ];
          } else {
            baseSchemaContext["@graph"] = [
              organizationEntity,
              personEntity,
              {
                "@type": "Blog",
                "@id": `${window.location.origin}/#blog-hub`,
                "name": "ThinkSarath Digest",
                "description": "Technical insights on modern AI search patterns, GEO entity schema, WordPress, and pSEO.",
                "publisher": {
                  "@type": "Organization",
                  "name": "ThinkSarath",
                  "@id": `${window.location.origin}/#org-thinksarath`,
                  "logo": `${window.location.origin}/icon-512.png`
                },
                "blogPost": BLOG_POSTS.map(post => ({
                  "@type": "BlogPosting",
                  "headline": post.title,
                  "datePublished": post.date,
                  "author": {
                    "@type": "Person",
                    "name": "Sarath Babu K",
                    "@id": `${window.location.origin}/#person-sarath`
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "ThinkSarath",
                    "@id": `${window.location.origin}/#org-thinksarath`,
                    "logo": `${window.location.origin}/icon-512.png`
                  },
                  "description": post.excerpt,
                  "url": `${window.location.origin}/blog/${post.id}`
                }))
              }
            ];
          }
          break;
        }

        case "faq":
          baseSchemaContext["@graph"] = [
            {
              "@type": "FAQPage",
              "@id": `${window.location.origin}/faq-page`,
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is GEO (Generative Engine Optimisation) and how does it work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Generative Engine Optimization (GEO) is the technical process of preparing your website content and brand attributes so they are accurately retrieved and cited by Large Language Models (LLMs) such as ChatGPT, Claude, and Gemini in their search overviews (AEO). Unlike traditional SEO which targets standard links, GEO targets retrieval algorithms (RAG) by embedding high-quality structured micro-data, maintaining semantic entity density, and seeding citations in authoritative datasets."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Programmatic SEO (pSEO) safe from Google algorithmic updates?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, but only if engineered with absolute focus on content quality. Poor pSEO involves generic spinning, which Google filters out. Our programmatic SEO frameworks rely on high-fidelity, highly curated datasets (e.g., precise coordinates, regional parameters, genuine industry stats) injected into clean, fast WordPress templates. By managing crawl budgets, avoiding thin-content pages, and mapping genuine user-intent variations, our pSEO setups build immense, lasting search footprints."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer physical in-person training in Chennai, or is it strictly online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "I offer both! Through my roles as Head of Digital Marketing at Code99 IT Academy and Trainer & Mentor at ZenX Academy, I conduct hybrid training structures. This includes hands-on online mentorship globally and focused physical bootcamps in Chennai, Tamil Nadu, for select enterprise cohorts, students, and digital marketing professionals looking to learn AI-integrated search systems."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is LinkedIn Profile Optimisation, and how does it help?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Your LinkedIn profile is your digital business card and is highly crawled by Google. LinkedIn Profile Optimization aligns your personal brand headline, featured section, experiences, and meta-data to rank at the top of both LinkedIn internal searches and Google. This includes guidance on securing specific industry skill badges, which signals premium, verified expertise to potential high-paying clients, partners, or founders."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why do you specialize specifically in WordPress Development?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "WordPress powers over 40% of the web and has the most mature indexing API endpoints. I build bespoke, lightweight WordPress landing pages and directory structures stripped of bulky bloatware. This guarantees mobile speed scores of 95+ out of the box, structured page architecture, and perfect schema compliance, giving your business a solid, reliable foundation that search engine spiders crawl with absolute efficiency."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is your typical client engagement structure? Do you sign NDAs?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, absolutely. Because I consult for premium institutions, founders, and specialized enterprises, 100% of my high-end advisory services are bound by rigid mutual Non-Disclosure Agreements (NDAs). This protects your proprietary growth datasets and digital footprints. Engagement is strictly on a premium monthly retainer framework with clear, actionable mathematical targets."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does it take to see tangible organic traffic results?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For standard technical SEO audits and local GMB positioning, noticeable improvements often occur within 30 to 60 days as crawlers re-index optimized pages. For comprehensive Programmatic SEO networks or conversational AEO citation seeding, timelines are structured across a 3 to 6-month ramp-up phase to securely build authority and bypass spam-detection index thresholds safely."
                  }
                }
              ]
            }
          ];
          break;

        case "contact":
          baseSchemaContext["@graph"] = [
            organizationEntity,
            personEntity,
            {
              "@type": "ContactPage",
              "@id": `${window.location.origin}/contact-page`,
              "mainEntity": {
                "@type": "ContactPoint",
                "telephone": "+917094629042",
                "email": "thinkwithsarath@gmail.com",
                "contactType": "Advisory Scheduling & Retainer Inquiries",
                "areaServed": ["IN", "US", "GB"]
              }
            }
          ];
          break;

        case "frameworks":
          baseSchemaContext["@graph"] = [
            organizationEntity,
            personEntity,
            {
              "@type": "WebPage",
              "@id": `${window.location.origin}/frameworks#webpage`,
              "name": "ThinkSarath Method™ & proprietary AI Search Optimization Frameworks",
              "description": "The official proprietary models engineered by Sarath Babu K for Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and Programmatic SEO.",
              "url": `${window.location.origin}/frameworks`,
              "about": [
                {
                  "@type": "CreativeWork",
                  "name": "ThinkSarath Method™ for AI Search"
                },
                {
                  "@type": "CreativeWork",
                  "name": "ThinkSarath SEO Framework™"
                },
                {
                  "@type": "CreativeWork",
                  "name": "ThinkSarath GEO Framework™"
                },
                {
                  "@type": "CreativeWork",
                  "name": "ThinkSarath AEO Framework™"
                }
              ]
            }
          ];
          break;

        case "home":
        default:
          baseSchemaContext["@graph"] = [
            organizationEntity,
            personEntity,
            {
              "@type": "WebSite",
              "@id": `${window.location.origin}/#website`,
              "name": "ThinkSarath",
              "url": window.location.origin,
              "publisher": { "@id": `${window.location.origin}/#org-thinksarath` }
            }
          ];
          break;
      }

      // Generate and inject dynamic BreadcrumbList (reflecting Home > Category > Page)
      const breadcrumbItems = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": window.location.origin
        }
      ];

      if (page === "about") {
        breadcrumbItems.push(
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Advisory & Brand",
            "item": `${window.location.origin}/about`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "About Sarath Babu K",
            "item": `${window.location.origin}/about`
          }
        );
      } else if (page === "services") {
        breadcrumbItems.push(
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Capabilities",
            "item": `${window.location.origin}/services`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AI SEO & pSEO Services",
            "item": `${window.location.origin}/services`
          }
        );
      } else if (page === "blog") {
        const activePost = BLOG_POSTS.find(p => p.id === activeBlogPostId);
        breadcrumbItems.push(
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Insights",
            "item": `${window.location.origin}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": activePost ? activePost.category : "ThinkSarath Digest",
            "item": `${window.location.origin}/blog`
          }
        );
        if (activePost) {
          breadcrumbItems.push({
            "@type": "ListItem",
            "position": 4,
            "name": activePost.title,
            "item": `${window.location.origin}/blog/${activePost.id}`
          });
        }
      } else if (page === "faq") {
        breadcrumbItems.push(
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Advisory FAQ",
            "item": `${window.location.origin}/faq`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AI Search Systems Q&A",
            "item": `${window.location.origin}/faq`
          }
        );
      } else if (page === "contact") {
        breadcrumbItems.push(
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Briefing",
            "item": `${window.location.origin}/contact`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Book Audit & Contact",
            "item": `${window.location.origin}/contact`
          }
        );
      } else if (page === "frameworks") {
        breadcrumbItems.push(
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Intellect & Methods",
            "item": `${window.location.origin}/frameworks`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "ThinkSarath Method™",
            "item": `${window.location.origin}/frameworks`
          }
        );
      }

      const breadcrumbListSchema = {
        "@type": "BreadcrumbList",
        "@id": `${window.location.origin}/${page === "home" ? "" : page}#breadcrumb`,
        "itemListElement": breadcrumbItems
      };

      baseSchemaContext["@graph"].push(breadcrumbListSchema);

      return baseSchemaContext;
    };

    // Inject JSON-LD Schema to DOM
    let schemaScript = document.getElementById("thinksarath-jsonld-schema") as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "thinksarath-jsonld-schema";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    
    schemaScript.innerHTML = JSON.stringify(generateSchemaMarkup(currentPage));

  }, [currentPage, language]);

  return null; // Side-effect only component
}
