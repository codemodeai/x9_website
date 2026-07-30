/**
 * Canonical brand facts. Single source of truth for anything that must stay
 * identical across the footer, /about, and JSON-LD — entity consistency is
 * what makes answer engines resolve "X9 Creatives" to one thing.
 * See docs/02-website-plan.md section 6.
 */

export const BRAND = {
  name: "X9 Creatives",
  tagline: ["Strategy", "Creative", "Performance", "Growth"],
  /** The canonical description. Repeat VERBATIM in footer, /about and schema. */
  description:
    "X9 Creatives is a full-stack growth agency combining brand strategy, content and creative production, performance marketing and SEO, and custom software — websites, CRM/ERP and AI automation — into one accountable team.",
} as const;

export type PillarId = "strategy" | "creative" | "performance" | "growth";

export const PILLARS: Record<
  PillarId,
  { id: PillarId; name: string; line: string; accent: "volt" | "blaze" }
> = {
  strategy: {
    id: "strategy",
    name: "Strategy",
    line: "Decide what the brand stands for, and to whom.",
    accent: "volt",
  },
  creative: {
    id: "creative",
    name: "Creative",
    line: "Produce the work that earns attention.",
    accent: "volt",
  },
  performance: {
    id: "performance",
    name: "Performance",
    line: "Buy and earn demand, measurably.",
    // Blaze's one recurring role on the site — see the accent budget in docs/01.
    accent: "blaze",
  },
  growth: {
    id: "growth",
    name: "Growth",
    line: "Build the systems that compound after the campaign stops.",
    accent: "volt",
  },
};

export interface Service {
  slug: string;
  name: string;
  pillar: PillarId;
  objective: string;
  scope: string[];
  deliverables: string[];
}

/** All 12 services, verbatim from X9_Creatives_Service_PRD_Detailed.docx. */
export const SERVICES: Service[] = [
  {
    slug: "brand-strategy",
    name: "Brand Strategy & Branding",
    pillar: "strategy",
    objective:
      "Help businesses build a recognizable and consistent brand identity that differentiates them in the market.",
    scope: [
      "Brand discovery workshop",
      "Market & competitor research",
      "Target audience research",
      "Brand positioning",
      "Brand messaging",
      "Visual identity",
      "Brand guidelines",
    ],
    deliverables: [
      "Brand strategy document",
      "Logo package",
      "Color palette",
      "Typography",
      "Brand guideline PDF",
      "Social media identity kit",
    ],
  },
  {
    slug: "personal-branding",
    name: "Personal Branding",
    pillar: "strategy",
    objective:
      "Build founders, CEOs and creators into recognizable industry authorities.",
    scope: [
      "Personal positioning",
      "Content pillars",
      "LinkedIn optimization",
      "Instagram strategy",
      "Content calendar",
      "Profile photography direction",
      "Thought leadership strategy",
    ],
    deliverables: [
      "30/60/90 day personal branding roadmap",
      "Optimized profiles",
      "Content plan",
      "Brand voice guide",
    ],
  },
  {
    slug: "content-production",
    name: "Content Production",
    pillar: "creative",
    objective:
      "Plan, create and publish high-quality content that educates, builds trust and generates leads.",
    scope: [
      "Trend research",
      "Topic research",
      "Keyword research",
      "Script writing",
      "Storyboarding",
      "Shoot planning",
      "Video production",
      "Editing",
      "Motion graphics",
      "Thumbnail design",
    ],
    deliverables: [
      "Monthly content calendar",
      "Edited videos",
      "Shorts/Reels",
      "Long-form videos",
      "Captions",
      "Thumbnails",
    ],
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    pillar: "creative",
    objective:
      "Manage the complete publishing and growth process across social platforms.",
    scope: [
      "Content scheduling",
      "Publishing",
      "Community management",
      "Comment & DM response guidance",
      "Monthly analytics",
      "Growth optimization",
    ],
    deliverables: [
      "Monthly posting schedule",
      "Performance report",
      "Platform optimization",
    ],
  },
  {
    slug: "creative-design",
    name: "Creative Design",
    pillar: "creative",
    objective: "Produce marketing assets that align with the client's brand.",
    scope: [
      "Ad creatives",
      "Social posts",
      "Brochures",
      "Pitch decks",
      "Presentation design",
      "Print design",
    ],
    deliverables: ["Editable source files", "Export packages"],
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    pillar: "performance",
    objective: "Acquire qualified leads through paid advertising.",
    scope: [
      "Campaign strategy",
      "Audience research",
      "Creative testing",
      "Meta Ads",
      "Google Ads",
      "LinkedIn Ads",
      "Retargeting",
      "Conversion tracking",
      "A/B testing",
    ],
    deliverables: [
      "Campaign dashboard",
      "Lead reports",
      "ROAS report",
      "Optimization log",
    ],
  },
  {
    slug: "seo-llm-seo",
    name: "SEO & LLM SEO",
    pillar: "performance",
    objective:
      "Improve visibility across traditional search engines and AI-powered search experiences.",
    scope: [
      "Technical SEO",
      "On-page SEO",
      "Keyword clustering",
      "Content optimization",
      "Schema markup",
      "Local SEO",
      "LLM SEO",
      "Answer Engine Optimization",
      "Internal linking",
    ],
    deliverables: [
      "SEO audit",
      "Keyword strategy",
      "Monthly ranking report",
      "Optimized content",
    ],
  },
  {
    slug: "website-development",
    name: "Website Development",
    pillar: "growth",
    objective:
      "Design and develop fast, responsive websites focused on conversion and user experience.",
    scope: [
      "UX research",
      "Wireframes",
      "UI design",
      "Responsive frontend",
      "CMS",
      "SEO implementation",
      "Performance optimization",
      "Analytics integration",
    ],
    deliverables: [
      "Production website",
      "CMS",
      "Admin guide",
      "Deployment documentation",
    ],
  },
  {
    slug: "landing-page-development",
    name: "Landing Page Development",
    pillar: "growth",
    objective:
      "Create high-converting landing pages for campaigns and lead generation.",
    scope: [
      "Offer strategy",
      "Copywriting",
      "Design",
      "Development",
      "Form integration",
      "Analytics",
      "A/B test readiness",
    ],
    deliverables: ["Landing page", "Analytics", "Conversion tracking"],
  },
  {
    slug: "crm-erp-development",
    name: "CRM & ERP Development",
    pillar: "growth",
    objective:
      "Build customized business management systems tailored to client operations.",
    scope: [
      "Requirement gathering",
      "Workflow mapping",
      "UI/UX",
      "Database design",
      "Development",
      "Testing",
      "Deployment",
      "Training",
    ],
    deliverables: ["Custom CRM/ERP", "Admin panel", "User roles", "Documentation"],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    pillar: "growth",
    objective:
      "Automate repetitive business operations using AI and workflow automation.",
    scope: [
      "Lead automation",
      "WhatsApp automation",
      "Email automation",
      "AI chatbots",
      "Voice agents",
      "Appointment booking",
      "Workflow automation",
      "Reporting",
    ],
    deliverables: ["Automation flows", "Knowledge base", "Monitoring dashboard"],
  },
  {
    slug: "maintenance-amc",
    name: "Maintenance & AMC",
    pillar: "growth",
    objective: "Provide ongoing support after project delivery.",
    scope: [
      "Bug fixes",
      "Security updates",
      "Performance optimization",
      "Content updates",
      "Backups",
      "Monthly reports",
    ],
    deliverables: ["Support reports", "Health reports", "Updated releases"],
  },
];

/**
 * The nine-step workflow. Identical for all 12 services in the PRD, so it lives
 * here once and is promoted to /process rather than repeated twelve times.
 */
export const PROCESS_STEPS = [
  "Discovery",
  "Research",
  "Strategy",
  "Planning",
  "Design / Execution",
  "Review",
  "Client Approval",
  "Delivery",
  "Optimization",
] as const;

export const servicesByPillar = (pillar: PillarId) =>
  SERVICES.filter((s) => s.pillar === pillar);

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

/** Services in the same pillar, excluding the current one. */
export const relatedServices = (slug: string) => {
  const current = getService(slug);
  if (!current) return [];
  return SERVICES.filter((s) => s.pillar === current.pillar && s.slug !== slug);
};

/* ==========================================================================
   DRAFTED CONTENT — everything above this line is verbatim from the PRD.
   Everything below was written by us and needs client sign-off before launch.
   Kept in separate maps precisely so that distinction stays visible.
   ========================================================================== */

/**
 * Replaces the PRD's Success Metrics, which is the same boilerplate sentence
 * repeated for all twelve services. These are the KPIs each service is actually
 * measured on — metric names, deliberately not claimed results.
 * See docs/02-website-plan.md section 7, gap #1.
 */
export const SERVICE_OUTCOMES: Record<string, string[]> = {
  "brand-strategy": [
    "Prompted and unprompted brand awareness",
    "Share of voice against named competitors",
    "Message recall in customer interviews",
    "Brand consistency audit score across touchpoints",
    "Time-to-launch for new campaign assets",
  ],
  "personal-branding": [
    "Follower growth on the priority platform",
    "Profile views and search appearances",
    "Inbound enquiries from the target segment",
    "Engagement rate per post",
    "Speaking, podcast and press invitations",
  ],
  "content-production": [
    "Publishing cadence held against plan",
    "Average view duration and watch-through rate",
    "Saves and shares per asset",
    "Cost per finished asset",
    "Assets repurposed per shoot day",
  ],
  "social-media-management": [
    "Follower growth rate",
    "Engagement rate per post",
    "Reach and impressions",
    "First-response time on comments and DMs",
    "Click-through rate to site",
  ],
  "creative-design": [
    "Creative throughput per cycle",
    "Ad creative win rate in testing",
    "Revision rounds per asset",
    "Brand consistency pass rate",
  ],
  "performance-marketing": [
    "Cost per qualified lead (CPL)",
    "Return on ad spend (ROAS)",
    "Customer acquisition cost and payback period",
    "Qualified lead rate from total leads",
    "Creative win rate across tests",
  ],
  "seo-llm-seo": [
    "Non-brand organic sessions",
    "Rankings across target keyword clusters",
    "Citation share in AI answer engines",
    "Indexed page coverage and crawl health",
    "Organic conversions",
  ],
  "website-development": [
    "Core Web Vitals — LCP, CLS, INP",
    "Conversion rate on primary actions",
    "Bounce rate and pages per session",
    "Lighthouse performance and accessibility scores",
    "Uptime",
  ],
  "landing-page-development": [
    "Conversion rate",
    "Cost per conversion against the campaign",
    "Form start-to-completion rate",
    "Scroll depth to the primary CTA",
    "Measured lift from A/B tests",
  ],
  "crm-erp-development": [
    "Manual hours removed per week",
    "Data-entry error rate",
    "Cycle time per mapped process",
    "User adoption across intended roles",
    "Time to produce standard reports",
  ],
  "ai-automation": [
    "Processes automated and running unattended",
    "First-response time to inbound enquiries",
    "Staff hours saved per month",
    "Deflection rate before human handoff",
    "Booking or qualification rate",
  ],
  "maintenance-amc": [
    "Uptime percentage",
    "Mean time to resolution by severity",
    "Open critical vulnerabilities",
    "Backup success rate and restore tests passed",
    "Performance held over time",
  ],
};

/**
 * Answer-first summary — the ≤50-word, directly quotable block each service page
 * opens with. Composed from the PRD's objective and deliverables rather than
 * invented, so it stays factually anchored to what X9 actually committed to.
 * See docs/02-website-plan.md section 6.
 */
export const SERVICE_ANSWERS: Record<string, string> = {
  "brand-strategy":
    "X9 Creatives builds brand identities from research rather than taste. You get a brand strategy document, logo package, colour palette, typography, a full guideline PDF and a social identity kit — everything needed to look like one company across every touchpoint.",
  "personal-branding":
    "X9 Creatives turns founders, CEOs and creators into recognisable industry authorities. You get a 30/60/90 day roadmap, optimised LinkedIn and Instagram profiles, a content plan built on defined pillars, and a brand voice guide your team can write against.",
  "content-production":
    "X9 Creatives plans, shoots and edits content that earns attention and generates leads. You get a monthly content calendar, edited long-form videos, shorts and reels, captions and thumbnails — researched from trends and keywords, not guesswork.",
  "social-media-management":
    "X9 Creatives runs the full publishing and growth operation across your social platforms. You get a monthly posting schedule, community management with response guidance, platform optimisation, and a performance report that explains what moved and why.",
  "creative-design":
    "X9 Creatives produces on-brand marketing assets at campaign speed — ad creatives, social posts, brochures, pitch decks, presentations and print. You get editable source files and packaged exports, so nothing is locked inside an agency account.",
  "performance-marketing":
    "X9 Creatives acquires qualified leads through paid media on Meta, Google and LinkedIn. You get a campaign dashboard, lead and ROAS reporting, and an optimisation log — with conversion tracking and A/B testing wired in from the start.",
  "seo-llm-seo":
    "X9 Creatives improves visibility across both traditional search and AI answer engines. You get an SEO audit, a clustered keyword strategy, schema markup, optimised content and monthly ranking reports — covering technical, on-page, local and answer engine optimisation.",
  "website-development":
    "X9 Creatives designs and builds fast, responsive websites focused on conversion. You get a production site with a CMS, SEO and analytics implemented, performance optimisation, an admin guide and deployment documentation — handed over, not held hostage.",
  "landing-page-development":
    "X9 Creatives builds high-converting landing pages for specific campaigns and offers. You get the page, form integration, analytics and conversion tracking, structured so A/B tests can run from day one rather than being retrofitted later.",
  "crm-erp-development":
    "X9 Creatives builds custom CRM and ERP systems around how your business actually operates. You get the system, an admin panel, role-based access, documentation and team training — preceded by requirement gathering and workflow mapping.",
  "ai-automation":
    "X9 Creatives automates repetitive operations using AI and workflow tooling — lead routing, WhatsApp and email flows, chatbots, voice agents and appointment booking. You get the automation flows, a knowledge base and a monitoring dashboard.",
  "maintenance-amc":
    "X9 Creatives keeps delivered work healthy after launch: bug fixes, security updates, performance tuning, content updates and backups. You get support and health reports plus updated releases, so the system does not quietly decay.",
};
