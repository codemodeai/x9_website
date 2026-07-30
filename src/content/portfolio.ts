/**
 * PORTFOLIO CONTENT
 *
 * Three segments, in page order:
 *   1. CLIENT      — edited videos + creative design work
 *   2. SETUP       — behind-the-scenes stills from shoots
 *   3. PERFORMANCE — account / campaign results, with proof screenshots
 *
 * Assets live under public/portfolio/{videos,works,setup,results}.
 * A segment with no entries hides in production and shows a labelled scaffold
 * in development.
 *
 * ── PRIVACY NOTE ────────────────────────────────────────────────────────────
 * Every face in the Setup stills has been detected and irreversibly obscured
 * (mosaic + blur), including crew at frame edges and subjects visible on camera
 * preview monitors. Source files in Assets/ are untouched; only the blurred
 * copies were published. If you replace or add a still, it must go through the
 * same treatment — do not copy straight from Assets/.
 */

export type Orientation = "portrait" | "landscape";

export interface PortfolioVideo {
  id: string;
  title: string;
  client?: string;
  format?: string;
  orientation: Orientation;
  poster: string;
  youtubeId?: string;
  vimeoId?: string;
  src?: string;
}

export interface PortfolioDesign {
  id: string;
  title: string;
  client?: string;
  format?: string;
  src: string;
  alt: string;
}

export interface PortfolioSetupShot {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  client?: string;
  wide?: boolean;
}

export interface PortfolioResult {
  id: string;
  client: string;
  platform?: string;
  period?: string;
  summary?: string;
  screenshot?: string;
  screenshotAlt?: string;
  metrics: { label: string; value: string; delta?: string }[];
}

export interface ClientProfile {
  handle: string;
  name: string;
  url: string;
  platform: "instagram" | "youtube";
  note?: string;
  /** e.g. "35.6K subscribers · 3.5K videos". Point-in-time — see note below. */
  stats?: string;
  /** Square logo. Optional; the card lays out fine without one. */
  avatar?: string;
}

/* ── 1a. CLIENT — edited videos ────────────────────────────────────────────
   All five files from Assets/Works are published.

   Titles are descriptive placeholders taken from the footage, since the source
   filenames ("1.mp4", "Gemini_R0.mp4", "Intro_Test_R1.mp4") carry no client
   information. Replace `title` / `client` with the real campaign names.
   ───────────────────────────────────────────────────────────────────────── */
export const VIDEOS: PortfolioVideo[] = [
  {
    id: "showreel",
    title: "Editing is like cooking",
    format: "Showreel",
    orientation: "portrait",
    poster: "/portfolio/videos/showreel.jpg",
    src: "/portfolio/videos/showreel.mp4",
  },
  {
    id: "brand-reel",
    title: "Founder brand reel",
    format: "Reel",
    orientation: "portrait",
    poster: "/portfolio/videos/brand-reel.jpg",
    src: "/portfolio/videos/brand-reel.mp4",
  },
  {
    id: "intro-sting",
    title: "Channel intro sting",
    format: "Motion graphics",
    orientation: "landscape",
    poster: "/portfolio/videos/intro-sting.jpg",
    src: "/portfolio/videos/intro-sting.mp4",
  },
  {
    id: "ai-explainer",
    title: "AI workflow explainer",
    format: "Explainer",
    orientation: "landscape",
    poster: "/portfolio/videos/ai-explainer.jpg",
    src: "/portfolio/videos/ai-explainer.mp4",
  },
  {
    id: "animated-explainer",
    title: "Script-to-animation explainer",
    format: "Explainer",
    orientation: "landscape",
    poster: "/portfolio/videos/animated-explainer.jpg",
    src: "/portfolio/videos/animated-explainer.mp4",
  },
];

/* ── 1b. CLIENT — creative design ─────────────────────────────────────────── */
/*
   NOTE ON FILE ORDER: gbs-05 is the "34 branches" poster, not gbs-01. The
   source files were named "…PM.jpeg", "…PM (1).jpeg" … so an alphabetical sort
   puts the unsuffixed one LAST. Each src below has been checked against the
   rendered image — do not assume the numbering follows the order here.
*/
export const DESIGNS: PortfolioDesign[] = [
  {
    id: "gbs-branches",
    title: "34 branches. One standard.",
    client: "GBS Systems & Services",
    format: "Brand campaign",
    src: "/portfolio/works/gbs-05.webp",
    alt: "GBS Systems campaign poster listing 34 branches across Chennai, Tamil Nadu and Karnataka",
  },
  {
    id: "gbs-exchange",
    title: "Your next laptop starts with your current one",
    client: "GBS Systems & Services",
    format: "Offer campaign",
    src: "/portfolio/works/gbs-01.webp",
    alt: "Laptop exchange campaign poster split between an old and a new laptop",
  },
  {
    id: "gbs-brands",
    title: "5 brands. One place.",
    client: "GBS Systems & Services",
    format: "Retail campaign",
    src: "/portfolio/works/gbs-02.webp",
    alt: "Retail poster showing Lenovo, ASUS, Acer, HP and Dell laptops side by side",
  },
  {
    id: "gbs-service",
    title: "Only what your device needs",
    client: "GBS Systems & Services",
    format: "Service campaign",
    src: "/portfolio/works/gbs-03.webp",
    alt: "Service campaign poster showing an engineer repairing a laptop mainboard",
  },
  {
    id: "gbs-genuine",
    title: "Genuine. Always.",
    client: "GBS Systems & Services",
    format: "Trust campaign",
    src: "/portfolio/works/gbs-04.webp",
    alt: "Poster showing genuine replacement parts alongside an invoice and warranty card",
  },
];

/* ── 2. SETUP — behind the scenes (faces obscured) ─────────────────────────
   Alt text describes the lighting setup rather than the people, which is both
   what the segment is about and the right call now faces are obscured.
   ───────────────────────────────────────────────────────────────────────── */
export const SETUP_SHOTS: PortfolioSetupShot[] = [
  {
    id: "setup-02",
    src: "/portfolio/setup/bts-02.webp",
    alt: "Wide view of a podcast set with softbox key light, practical lamps and two camera positions",
    caption: "Full set build, podcast shoot",
    wide: true,
  },
  {
    id: "setup-03",
    src: "/portfolio/setup/bts-03.webp",
    alt: "Seated interview subject lit with a warm key against an amber backdrop",
    caption: "Interview key light",
  },
  {
    id: "setup-01",
    src: "/portfolio/setup/bts-01.webp",
    alt: "Low-key living-room set with softbox camera-left and a monitor on a tripod",
    caption: "Low-key living-room set",
  },
  {
    id: "setup-06",
    src: "/portfolio/setup/bts-06.webp",
    alt: "Octabox key light and tube fill on a sofa set dressed with plants and shelving",
    caption: "Octabox key, tube fill",
  },
  {
    id: "setup-07",
    src: "/portfolio/setup/bts-07.webp",
    alt: "Green-panelled set with large softbox, boom microphone and camera on a fluid head",
    caption: "Green room set, boom audio",
    wide: true,
  },
  {
    id: "setup-09",
    src: "/portfolio/setup/bts-09.webp",
    alt: "Seated subject on a dark wood set with a large silver reflector and floor lamps",
    caption: "Reflector fill, warm practicals",
  },
  {
    id: "setup-11",
    src: "/portfolio/setup/bts-11.webp",
    alt: "Bright arched set with softbox key and overhead tube light above a low sofa",
    caption: "Arched set, overhead tube",
  },
  {
    id: "setup-13",
    src: "/portfolio/setup/bts-13.webp",
    alt: "Warm-lit set with a large diffused key light and dressed shelving behind the subject",
    caption: "Warm key, dressed shelving",
  },
  {
    id: "setup-04",
    src: "/portfolio/setup/bts-04.webp",
    alt: "Empty studio set lit for an interview, chairs and side table in position",
    caption: "Set dressed, pre-shoot",
  },
  {
    id: "setup-05",
    src: "/portfolio/setup/bts-05.webp",
    alt: "Empty set with a large silver octabox, tube light and dressed bookshelf",
    caption: "Lighting test, no talent",
  },
  {
    id: "setup-08",
    src: "/portfolio/setup/bts-08.webp",
    alt: "Empty set with softbox and grey backdrop ready for a seated interview",
    caption: "Backdrop and key in position",
  },
  {
    id: "setup-12",
    src: "/portfolio/setup/bts-12.webp",
    alt: "Wide studio view with Godox softbox, styled furniture and a white feature chair",
    caption: "Styled set, wide",
    wide: true,
  },
];

/* ── 3. PERFORMANCE — results ──────────────────────────────────────────────
   Figures below are read directly off the supplied screenshots. Nothing is
   estimated or rounded up.

   ⚠ REVIEW BEFORE PUBLISHING: the Meta Ads screenshot shows client campaign
   names (city + brand) and exact ad spend. That is commercially sensitive to
   the client. Either get written sign-off or let me redact those two columns.
   ───────────────────────────────────────────────────────────────────────── */
export const RESULTS: PortfolioResult[] = [
  {
    id: "instagram-organic",
    client: "Instagram — organic growth",
    platform: "Instagram",
    period: "18 Dec – 17 Mar",
    summary:
      "Reels-led content mix: 92.4% of views came from reels, and 93.8% of reach came from non-followers.",
    screenshot: "/portfolio/results/instagram-insights.webp",
    screenshotAlt:
      "Instagram insights panels showing views, accounts reached, content mix and profile activity",
    metrics: [
      { label: "Views", value: "10.8M" },
      { label: "Accounts reached", value: "4.48M", delta: "+57.9%" },
      { label: "Profile visits", value: "187,104", delta: "+11.7%" },
      { label: "External link taps", value: "17,887", delta: "+48.1%" },
    ],
  },
  {
    id: "meta-ads",
    client: "Meta Ads — awareness & leads",
    platform: "Meta Ads",
    period: "31 campaigns",
    summary:
      "Awareness and lead campaigns run across Chennai, Coimbatore and Pondicherry, with form leads tracked on a 7-day click attribution window.",
    screenshot: "/portfolio/results/meta-ads.webp",
    screenshotAlt:
      "Meta Ads Manager showing campaign reach, impressions, page engagement and cost per result",
    metrics: [
      { label: "Accounts reached", value: "2.29M" },
      { label: "Impressions", value: "3.62M" },
      { label: "Page engagement", value: "699,097" },
      { label: "Instagram profile visits", value: "44,231" },
    ],
  },
];

/* ── 3b. Client accounts we run ────────────────────────────────────────────
   Live accounts, so visitors can check the work rather than take a screenshot
   on trust. Verify with each client that they are happy to be named.

   `stats` is a point-in-time figure. A subscriber count that has not moved in
   a year reads as a neglected page, so refresh these when they drift — or drop
   the field and let the link speak for itself.

   Share URLs are stripped of their utm_source / igsh tracking parameters:
   those identify the person who copied the link, and there is no reason to
   publish that or to send every visitor through someone else's attribution.
   ───────────────────────────────────────────────────────────────────────── */
export const PROFILES: ClientProfile[] = [
  {
    handle: "@karnanpattucentre",
    name: "Karnan Pattu Centre",
    url: "https://www.instagram.com/karnanpattucentre/",
    platform: "instagram",
    note: "Silk saree retail",
  },
  {
    handle: "@oldkanchiipurampattucenter",
    name: "Old Kanchipuram Pattu Center",
    url: "https://www.instagram.com/oldkanchiipurampattucenter/",
    platform: "instagram",
    note: "Silk saree retail",
  },
  {
    handle: "@beyondheadlinesmedia",
    name: "Beyond Headlines Media",
    url: "https://www.instagram.com/beyondheadlinesmedia/",
    platform: "instagram",
    note: "Digital news media",
  },
  {
    handle: "@BeyondHeadlinesMedia",
    name: "Beyond Headlines Media",
    url: "https://www.youtube.com/@BeyondHeadlinesMedia",
    platform: "youtube",
    note: "Channel managed by X9",
    stats: "35.6K subscribers · 3.5K videos",
    avatar: "/portfolio/profiles/beyond-headlines.webp",
  },
];

export const portfolioIsEmpty =
  VIDEOS.length === 0 &&
  DESIGNS.length === 0 &&
  SETUP_SHOTS.length === 0 &&
  RESULTS.length === 0;
