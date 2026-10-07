export interface SystemModule {
  name: string;
  description: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  descriptor: string;
  url?: string;
  urlLabel?: string;
  isClientContract?: boolean;
  clientName?: string;
  image?: string;
  accentColor?: string;
  summary: string;
  metrics: Metric[];
  tags: string[];
  techStackByCategory: {
    frontend: string[];
    databaseAndConcurrency: string[];
    aiAndRealtime: string[];
    paymentsAndProtocols: string[];
  };
  modules: SystemModule[];
  bullets: string[];
  architecture: {
    category: string;
    concurrencyGuarantee: string;
    protocolOrAi: string;
    dbOrInfra: string;
  };
}

export interface AgentSkill {
  id: string;
  name: string;
  tagline: string;
  packageSlug: string;
  installCommand: string;
  skillsShUrl?: string;
  repoUrl?: string;
  description: string;
  capabilities: string[];
  pillarsOrRubric?: string[];
}

export const PROJECTS: Project[] = [
  // =========================================================================
  // 1. PROPRIETARY / FLAGSHIP PLATFORMS FIRST
  // =========================================================================
  {
    id: "wetaego",
    name: "Wetaego",
    descriptor: "Polymorphic Multi-Vertical Commerce OS, W3C WebMCP Agent Runtime & Driverless Hardware POS",
    url: "https://wetaego.com",
    urlLabel: "wetaego.com",
    image: "/projects/wetaego_hero.png",
    accentColor: "blue",
    metrics: [
      { label: "Vertical Engines", value: "6 Polymorphic" },
      { label: "Concurrency Lock", value: "SELECT FOR UPDATE" },
      { label: "Agent Client Tools", value: "8 WebMCP Tools" },
      { label: "Thermal Print Mode", value: "Zero-Daemon Driverless" },
    ],
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "W3C WebMCP",
      "Supabase Realtime",
      "PostgreSQL RLS",
      "Gemini Multimodal Live API",
      "Upstash Redis",
      "x402 / MPP",
      "WebUSB / WebSerial",
      "Serwist PWA",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js 16 (React 19)",
        "Tailwind CSS v4",
        "Serwist PWA (Offline-First)",
        "HTML5 Canvas",
        "Zustand + IndexedDB Sync",
      ],
      databaseAndConcurrency: [
        "PostgreSQL 16",
        "Supabase Realtime",
        "Row-Level Security (RLS)",
        "SELECT FOR UPDATE Locks",
        "20+ PL/pgSQL Atomic RPCs",
        "Upstash Redis",
      ],
      aiAndRealtime: [
        "W3C WebMCP (document.modelContext)",
        "Gemini Multimodal Live API",
        "16kHz/24kHz Bidirectional WebSockets",
        "Vercel AI SDK",
        "1 FPS Camera Vision Pipeline",
      ],
      paymentsAndProtocols: [
        "RFC 9727 & RFC 8288 Discovery",
        "Coinbase x402 Micropayments",
        "Machine Payment Protocol (MPP)",
        "Paystack Cards & Transfers",
        "Bachs USDC/USDT/SOL",
        "WebUSB / WebSerial ESC/POS Driverless",
      ],
    },
    summary:
      "Polymorphic commerce operating system serving 6 enterprise verticals (Dining, Hospitality, Boutique Retail, Wellness, Trades, and Creative Studios) under a single high-assurance PostgreSQL schema. Features autonomous browser checkout via W3C WebMCP, Gemini Live multimodal voice/vision scanning, driverless ESC/POS printing over WebUSB/WebSerial, and RFC 9727 machine discovery.",
    modules: [
      {
        name: "Polymorphic Multi-Tenant Architecture",
        description:
          "Serves 6 distinct industries under one PostgreSQL database schema with strict RLS tenant isolation, polymorphic table joins, and custom schema triggers.",
      },
      {
        name: "W3C WebMCP Autonomous Agent Layer",
        description:
          "Registers 8 canonical client tools (search_catalog, add_to_cart, initiate_checkout, submit_order) on document.modelContext for autonomous browser agents with a mandatory Human-in-the-Loop payment gate.",
      },
      {
        name: "Tego Voice & Vision Copilot",
        description:
          "Gemini Multimodal Live API running over raw PCM WebSockets (16kHz in, 24kHz out) with adaptive vertical personas, barge-in support, and 1 FPS camera video stream for physical menu scanning.",
      },
      {
        name: "Driverless Hardware Peripheral Engine",
        description:
          "Zero-daemon ESC/POS thermal receipt printing and automated cash drawer kicks executing directly from the browser over WebUSB, WebSerial (RS232 COM), and WebBluetooth.",
      },
      {
        name: "Machine Discovery & Multi-Rail Settle",
        description:
          "Enables autonomous AI bot purchases via HTTP 402 paywalls, x402 protocols, Paystack checkout, and a Bearer-authenticated Staff MCP Server (/api/mcp) for fleet management.",
      },
    ],
    bullets: [
      "Engineered polymorphic multi-tenant PostgreSQL architecture with strict RLS isolation, atomic decrement RPCs, and SELECT FOR UPDATE row-locking preventing concurrency collisions.",
      "Implemented the W3C WebMCP specification at platform level, dynamically registering 8 canonical tools on document.modelContext with mandatory human-in-the-loop payment gates.",
      "Published 14 open machine-discovery standards (RFC 9727, RFC 8288, Coinbase x402, Machine Payment Protocol) enabling autonomous agents to settle invoices via HTTP 402.",
      "Built Tego: real-time voice and vision co-pilot via Gemini Multimodal Live API over 16kHz/24kHz bidirectional WebSockets with driverless zero-daemon ESC/POS thermal printing over WebUSB and WebSerial.",
    ],
    architecture: {
      category: "Multi-Vertical Commerce & Agentic Protocol Infrastructure",
      concurrencyGuarantee:
        "Row-level locks (SELECT FOR UPDATE), atomic inventory decrements, and idempotent payment webhooks.",
      protocolOrAi:
        "W3C WebMCP (8 client tools), RFC 9727 discovery, Gemini Multimodal Live API (PCM audio + 1 FPS video).",
      dbOrInfra:
        "PostgreSQL 16 with RLS tenant isolation, Supabase Realtime, Upstash Redis caching, Serwist PWA.",
    },
  },
  {
    id: "cruisehq",
    name: "CruiseHQ",
    descriptor: "City-Scale Social Operating System, Closed-Loop Microeconomy & DOM-Controlling Voice AI Concierge",
    url: "https://cruisehq.fun",
    urlLabel: "cruisehq.fun",
    image: "/projects/cruisehq_hero.png",
    accentColor: "indigo",
    metrics: [
      { label: "Database Migrations", value: "44 Structured" },
      { label: "Voice Client Tools", value: "20+ DOM Declarations" },
      { label: "Search Latency Cut", value: "94% via 3-Tier Cache" },
      { label: "Ecosystem Microeconomy", value: "Closed-Loop $CRUISE" },
    ],
    tags: [
      "Next.js 15",
      "TypeScript",
      "Gemini Multimodal Live API",
      "Supabase Realtime",
      "PostgreSQL RLS",
      "Upstash Redis",
      "pgvector",
      "Bachs Split-Checkout",
      "Serwist PWA",
      "ElevenLabs",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js 15",
        "Tailwind CSS",
        "Serwist Offline PWA (220+ Routes)",
        "Presence Avatars",
        "Multimodal Client Tools",
      ],
      databaseAndConcurrency: [
        "Supabase PostgreSQL (44 Migrations)",
        "pgvector Semantic Search",
        "Atomic spend_cruise RPCs",
        "Service-Role Minting Guard",
        "Deny-by-Default RLS",
      ],
      aiAndRealtime: [
        "Gemini Multimodal Live API",
        "ElevenLabs Voice Pipeline",
        "20+ Client Tool Handlers (switchMode, openTool)",
        "Supabase Broadcast & Presence",
        "Spotify AUX Proxy (AES-256)",
      ],
      paymentsAndProtocols: [
        "$CRUISE Closed-Loop Microeconomy",
        "Bachs Split-Checkout",
        "Cruisaider Commission Attributor",
        "Paystack Webhooks",
        "HMAC-SHA256 Webhook Verification",
      ],
    },
    summary:
      "City-scale social graph, event ticketing engine, and real-time multiplayer arcade spanning 44 database migrations. Driven by TCG—a bidirectional voice AI concierge that interprets natural speech to execute client tool declarations and physically manipulate the React DOM in real time.",
    modules: [
      {
        name: "Voice-Controlled React DOM Engine (TCG)",
        description:
          "TCG agent parses natural speech into client tool declarations (openTool, switchMode, analyzeImage), directly triggering React state transitions without human clicks.",
      },
      {
        name: "3-Tier Sub-Second Caching Architecture",
        description:
          "Queries check Supabase DB (7-day TTL) → Upstash Redis (15-min TTL) → Firecrawl Search API with automatic background cache replenishment, cutting query latency by 94%.",
      },
      {
        name: "Closed-Loop $CRUISE Microeconomy",
        description:
          "Atomic spend_cruise and grant_cruise RPCs with service-role security, split-at-source event ticket payouts, and affiliate commission attribution.",
      },
      {
        name: "QR Multiplayer Room Engine & AUX Proxy",
        description:
          "Enables instant frictionless room joining via mobile QR scan with Supabase Presence, crowd drops, real-time co-host voice streaming, and AES-256 encrypted Spotify AUX proxying.",
      },
      {
        name: "Hardened Namespaced Schemas",
        description:
          "Shared infrastructure with deny-by-default RLS, service-role-only ledger mutations, and HMAC-SHA256 webhook reconciliation.",
      },
    ],
    bullets: [
      "Architected a city-scale social platform spanning 44 database migrations with a closed-loop $CRUISE microeconomy, atomic spend/grant RPCs, and source-split Bachs checkout.",
      "Engineered TCG: a bidirectional WebSocket voice agent with 20+ client tool declarations mutating React state, pgvector memory recall, and Spotify AUX control via AES-256 proxy.",
      "Built low-latency multiplayer rooms with Supabase Presence/Broadcast, QR peer onboarding, sub-group channels, and remote co-host voice injection.",
      "Implemented deny-by-default RLS policies across all tables and enforced HMAC-SHA256 signature verification on incoming payment webhooks.",
    ],
    architecture: {
      category: "City-Scale Social Graph & Real-Time Voice Infrastructure",
      concurrencyGuarantee:
        "Atomic spend_cruise RPCs, service-role-only minting, and split-at-source ticketing reconciliation.",
      protocolOrAi:
        "Gemini Multimodal Live API, 20+ client tool declarations, pgvector semantic memory.",
      dbOrInfra:
        "Supabase PostgreSQL with 44 migrations, Upstash Redis 3-tier caching, Serwist PWA at 220+ sitemap scale.",
    },
  },
  {
    id: "baunti",
    name: "BAUNTI",
    descriptor: "Escrowed Prize & Bounty Protocol, Provably-Fair Cryptographic Draws & Museum-Grade Artifacts",
    url: "https://baunti.cruisehq.fun",
    urlLabel: "baunti.cruisehq.fun",
    image: "/projects/baunti_hero.jpg",
    accentColor: "rose",
    metrics: [
      { label: "Draw Algorithms", value: "9 Provably-Fair" },
      { label: "Cryptographic Seed", value: "SHA-256 HMAC Commit-Reveal" },
      { label: "Convertibility Economics", value: "3-Class Asymmetric" },
      { label: "Logo Rush Arcade", value: "3,400+ Vector Marks" },
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "SHA-256 HMAC",
      "$CRUISE Escrow",
      "Provably Fair",
      "Supabase",
      "Logo Rush",
      "Wax Seal Canvas",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js 16 (App Router)",
        "Tailwind CSS",
        "Museum-Grade Parchment Canvas",
        "Wax Seal Shaders",
        "Logo Rush Arcade Engine",
      ],
      databaseAndConcurrency: [
        "Supabase PostgreSQL",
        "Upfront Escrow Locking RPCs (pool:<challengeId>)",
        "Asymmetric Partitioning (`earned` vs `purchased` vs `promo`)",
        "Atomic pot_settle RPCs",
        "Public Verifiable Audit Ledger",
      ],
      aiAndRealtime: [
        "Commit-Reveal SHA-256 Draw Engine",
        "Automated Winner Share Solver (The Slice)",
        "Instant Pot Disbursal",
        "Real-Time Draw Room Sync",
      ],
      paymentsAndProtocols: [
        "$CRUISE Credit Protocol",
        "USDT & Naira Bank Transfers",
        "Bachs Webhook Collection",
        "Anti-Sybil Blueprint Royalties (The Lab)",
      ],
    },
    summary:
      "High-integrity platform turning marketing and community budgets into upfront-escrowed prize competitions. Sponsors lock prize pools irrevocably in Naira, USDT, or $CRUISE credits (pool:<challengeId>). Winners are selected via 9 provably-fair cryptographic algorithms backed by commit-reveal SHA-256 HMAC seeds, with random shares mathematically solved by The Slice.",
    modules: [
      {
        name: "Upfront Escrow Locking Engine",
        description:
          "Prize pools lock irrevocably before entries open (pool:<challengeId>), guaranteeing that no sponsor can default or withhold rewards once participants compete.",
      },
      {
        name: "Provably-Fair Draw Engine",
        description:
          "Implements 9 cryptographic draw formats (Classic sweep, Knockout, Golden Tickets, Roll-off, Last Seal Standing, High Rollers, Team Clash, First Blood, The Bracket) backed by immutable commit-reveal SHA-256 HMAC seeds.",
      },
      {
        name: "The Slice Proportional Share Solver",
        description:
          "Mathematically solves per-winner random shares that sum exactly to the pot, recorded on public verifiable audit ledgers with hard invariant asserts.",
      },
      {
        name: "Asymmetric Credit Convertibility Guard",
        description:
          "Strictly partitions balances into earned (withdrawable), purchased (spend-only), and promo (spend-only) to protect ecosystem liquidity.",
      },
      {
        name: "Logo Rush Arcade & The Lab",
        description:
          "Zero-repeat, multi-pack arcade challenge testing recognition across 3,400+ brand vector marks, paired with The Lab blueprint incubator paying 15% $CRUISE royalties.",
      },
    ],
    bullets: [
      "Architected upfront escrow locking mechanism preventing sponsor default by holding prize pools in earmarked escrow accounts prior to challenge activation.",
      "Engineered provably-fair draw engine across 9 formats with commit-reveal SHA-256 HMAC seeds and public cryptographic audit ledgers.",
      "Built asymmetric convertibility economics partitioning user credit balances into earned, purchased, and promo to eliminate insolvency risk.",
      "Designed physical parchment and wax-seal UI artifacts (Winner Warrants, Ticket Stubs, Audit Ledgers) rendered with canvas tear lines and seal shaders.",
    ],
    architecture: {
      category: "Cryptographic Prize Escrow & Provably-Fair Infrastructure",
      concurrencyGuarantee:
        "Upfront pool locking, atomic pot_settle RPCs, and mathematical exact-sum share validation.",
      protocolOrAi:
        "Commit-reveal SHA-256 HMAC draw engine, 9 provably-fair formats.",
      dbOrInfra:
        "Supabase PostgreSQL, shared $CRUISE ledger entries, public audit hashes.",
    },
  },
  {
    id: "huiyi",
    name: "Huiyi",
    descriptor: "Zero-App Collaborative Event Video Recap Engine & Multimodal AI Timeline Director",
    url: "https://huiyi.cruisehq.fun",
    urlLabel: "huiyi.cruisehq.fun",
    image: "/projects/huiyi_hero.png",
    accentColor: "purple",
    metrics: [
      { label: "Guest Friction", value: "0 App / 0 Account" },
      { label: "Render Workers", value: "Distributed Modal FFmpeg" },
      { label: "Storage Architecture", value: "Cloudflare R2 Direct" },
      { label: "Credit Metering", value: "Charge-On-Success Ledger" },
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Gemini Multimodal",
      "Cloudflare R2",
      "FFmpeg",
      "Bachs Checkout",
      "Supabase",
      "Zero-App QR",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js (App Router)",
        "Tailwind CSS",
        "Zero-App Mobile QR Uploader",
        "Timeline Director Controls",
        "Watermark Designer",
      ],
      databaseAndConcurrency: [
        "Supabase PostgreSQL",
        "Bachs Credit Metering Ledger",
        "Atomic credit_deduct on Render Success",
        "Multi-Version Event Asset Tree",
      ],
      aiAndRealtime: [
        "Gemini Multimodal Director",
        "Natural-Language Editing Prompts",
        "Scene Quality & Audio Scorer",
        "Automated Clip Assembly",
      ],
      paymentsAndProtocols: [
        "Bachs Hosted Checkout (10/$9, 40/$29, 120/$79)",
        "Verified collection.succeeded Webhooks",
        "Cloudflare R2 Direct Uploads",
        "Modal Cloud FFmpeg Workers",
      ],
    },
    summary:
      "Collaborative event video platform turning raw guest-shot mobile footage into cinematic recaps. Guests contribute clips instantly via dynamic QR codes with zero app downloads and zero accounts. Event organizers direct edits using natural language prompts via Gemini Multimodal and distributed Modal cloud FFmpeg render workers with Bachs charge-on-success credit metering.",
    modules: [
      {
        name: "Zero-App Guest Uploader",
        description:
          "Mobile-first web interface allowing wedding, conference, and festival guests to upload high-res video clips instantly via QR scan without account friction.",
      },
      {
        name: "Gemini Multimodal Director",
        description:
          "Analyzes raw attendee video footage, transcribes dialogue, identifies emotional peaks, and compiles an intelligent timeline edit based on organizer prompts.",
      },
      {
        name: "Cloud FFmpeg Rendering Pipeline",
        description:
          "Distributed video composition engine applying watermarks, color grading, audio leveling, and dynamic transitions across multiple candidate edits.",
      },
      {
        name: "Bachs Metered Credit Ledger",
        description:
          "Strict credit accounting charging users only upon successful render completion with verified collection.succeeded webhook security.",
      },
      {
        name: "Cloudflare R2 Direct Uploads",
        description:
          "Presigned direct-to-bucket media uploads bypassing application server bottlenecks and enabling concurrent multi-gigabyte video ingestion.",
      },
    ],
    bullets: [
      "Built zero-friction mobile web ingestion enabling hundreds of event guests to contribute raw video clips via dynamic QR codes without app downloads.",
      "Integrated Gemini Multimodal director translating natural language instructions into concrete video cut-points, transition pacing, and soundtrack sync.",
      "Architected cloud video processing using Cloudflare R2 object storage and distributed FFmpeg render workers on Modal.",
      "Implemented fair credit metering backed by Bachs hosted checkout with charge-on-success guarantees and tamper-proof ledgering.",
    ],
    architecture: {
      category: "Multimodal AI Video Pipeline & Distributed Cloud Rendering",
      concurrencyGuarantee:
        "Charge-on-success credit deduct locks, idempotent webhook collection, atomic event asset trees.",
      protocolOrAi:
        "Gemini Multimodal video reasoning, natural language director prompts, FFmpeg composition.",
      dbOrInfra:
        "Supabase PostgreSQL, Cloudflare R2 media storage, Modal cloud render workers.",
    },
  },
  {
    id: "gozai",
    name: "GozAI",
    descriptor: "Voice-First Emotional & Accessibility Copilot for Low Vision (Clinically Grounded in Ophthalmic Research)",
    url: "https://gozai-app.web.app",
    urlLabel: "gozai-app.web.app",
    image: "/projects/gozai_hero.png",
    accentColor: "emerald",
    metrics: [
      { label: "Clinical Foundations", value: "PLOS ONE & NIH Grounded" },
      { label: "Multimodal Vision", value: "Continuous 1 FPS Wayfinding" },
      { label: "Live Voice Latency", value: "Sub-500ms Gemini Live" },
      { label: "Target Audience", value: "2.2B Low-Vision Individuals" },
    ],
    tags: [
      "Flutter 3.47",
      "Gemini Multimodal Live API",
      "Google Cloud Run",
      "Firebase Firestore",
      "Clinical Optometry",
      "Audio-Haptic Wayfinding",
      "WebSockets",
    ],
    techStackByCategory: {
      frontend: [
        "Flutter 3.47",
        "High-Contrast Brutalist Accessibility UI",
        "Vibro-Acoustic Haptic Feedback",
        "WebAudio Tone Synthesizer",
        "Continuous 1 FPS Camera Pipeline",
      ],
      databaseAndConcurrency: [
        "Google Cloud Run",
        "Firebase Firestore",
        "Sub-500ms Audio Streaming Channels",
        "Ephemeral Session Token Vault",
        "Offline Light-Meter Calibration",
      ],
      aiAndRealtime: [
        "Gemini Multimodal Live API (2.0 Flash)",
        "Clinical Empathy Audio Persona",
        "Medication Safety OCR (Pill/Expiration Parsing)",
        "Real-Time Hazard Detection",
        "1 FPS Spatial Wayfinding",
      ],
      paymentsAndProtocols: [
        "Open Clinical Protocol",
        "FHIR / Medical Record Compatible Data Flow",
        "Zero-Tracking Privacy Guard",
        "WebSockets Audio Streaming",
      ],
    },
    summary:
      "Voice-first accessibility companion and spatial navigator bridging the gap between individuals with low vision and inaccessible physical/digital environments. Engineered with clinical foundations as a Doctor of Optometry (O.D.), integrating Gemini Multimodal Live API for continuous 1 FPS spatial hazard detection, prescription medication auditing, audio-haptic wayfinding, and compassionate psychological support.",
    modules: [
      {
        name: "Clinical Foundation & Medication Safety Engine",
        description:
          "Real-time multimodal auditing of prescription pill bottles (identifies active drug name, dosage instructions, and expiration dates) to prevent life-threatening medication errors.",
      },
      {
        name: "Continuous 1 FPS Spatial Wayfinding & Hazard Detection",
        description:
          "Hands-free camera stream analyzing walking paths in real time to alert users of low-contrast stairs, wet floors, and overhanging obstacles using synchronized vibro-acoustic feedback.",
      },
      {
        name: "Voice-First Clinical Empathy Persona",
        description:
          "Low-latency conversational audio companion calibrated to counteract the cognitive fatigue, isolation, and anxiety associated with progressive vision loss.",
      },
      {
        name: "Brutalist Accessibility UI & Offline Light-Meter",
        description:
          "Ultra-high-contrast interface with screen-reader-first architecture, accompanied by an offline ambient light sensor that emits rising melodic audio tones toward natural light sources.",
      },
      {
        name: "Visual-Only Digital UI Navigation",
        description:
          "Interprets inaccessible visual elements, untagged buttons, and complex image-based digital workflows without manual screenshot taking.",
      },
    ],
    bullets: [
      "Architected voice-first multimodal accessibility copilot for 2.2B low-vision individuals, fusing clinical ocular training (Doctor of Optometry) with Gemini Multimodal Live API over real-time WebSockets.",
      "Engineered continuous 1 FPS camera pipeline detecting physical hazards (stairs, obstacles, spills) and executing live prescription drug verification (Timolol, dosage, expiration).",
      "Built synchronized audio-haptic feedback engine with rising-tone offline light-metering to assist spatial orientation in unfamiliar environments.",
      "Deployed on Google Cloud Run and Firebase Firestore with brutalist accessibility standards exceeding WCAG AAA compliance.",
    ],
    architecture: {
      category: "Clinical AI & Multimodal Accessibility Infrastructure",
      concurrencyGuarantee:
        "Sub-500ms bidirectional PCM audio streaming, ephemeral token isolation, zero data retention for HIPAA/EHR privacy.",
      protocolOrAi:
        "Gemini Multimodal Live API (2.0 Flash), 1 FPS camera vision pipeline, clinical empathy persona.",
      dbOrInfra:
        "Flutter 3.47 (Web & Mobile), Google Cloud Run microservices, Firebase Firestore realtime store.",
    },
  },
  {
    id: "caelumos",
    name: "CaelumOS",
    descriptor: "Institutional Quantitative Execution OS, SMC/ICT Multi-Engine & Black-Swan Market Simulator",
    url: "https://caelumos.trade",
    urlLabel: "caelumos.trade",
    image: "/projects/caelum_hero.png",
    accentColor: "cyan",
    metrics: [
      { label: "Historical Backtest Data", value: "15,000+ M5 Hours" },
      { label: "Scenario Replays", value: "12 Black-Swan Events" },
      { label: "Pattern Vision Engine", value: "Llama 3.2 Vision" },
      { label: "Risk Model", value: "Immutable Drawdown Floor" },
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL RLS",
      "TradingView API",
      "Llama 3.2 Vision",
      "Event Simulator",
      "Tailwind CSS",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js",
        "Tailwind CSS",
        "TradingView Lightweight Charts (Multi-Pane)",
        "Canvas Drawing Tools",
        "Discipline Scoreboards",
      ],
      databaseAndConcurrency: [
        "Supabase PostgreSQL",
        "Multi-Window State Synchronization",
        "Atomic Portfolio Ledgers",
        "Deterministic Drawdown Limit Locks",
        "Row Level Security",
      ],
      aiAndRealtime: [
        "Llama 3.2 Vision Model (Setup Detection)",
        "Ask Caelum AI Coach",
        "Pre/Post-Market Sentiment Profiling",
        "FOMO / Revenge Trade Detection",
      ],
      paymentsAndProtocols: [
        "Platform Credit Accounting",
        "Cryptocurrency Subscriptions",
        "Public Challenge Proof Contracts",
        "Secure Edge Session Tokens",
      ],
    },
    summary:
      "Institutional-grade execution environment and market simulation OS unifying 15,000+ M5 historical hours, 12 black-swan macro shock replays, Llama 3.2 Vision candlestick pattern recognition, and ICT/SMC multi-engine structure analysis with deterministic drawdown limits.",
    modules: [
      {
        name: "Black-Swan Historical Simulator",
        description:
          "Replays 12+ macro shock events (FTX Collapse, COVID Crash, Brexit, LUNA Depeg) with spoiler-protected candle streams from 15,000+ hours of M5 data.",
      },
      {
        name: "Weighted Confluence Playbook Engine",
        description:
          "Enforces systematic discipline by requiring dynamic weighted strategy scores before live or paper orders can be logged.",
      },
      {
        name: "Psychological Journal & Emotional Leak Radar",
        description:
          "Detects revenge trading and FOMO by analyzing trader logs with NLP sentiment models before capital is committed.",
      },
      {
        name: "Llama 3.2 Vision Technical Pattern Scanner",
        description:
          "Automated chart image analysis detecting 50+ technical candlestick patterns and historical probability benchmarking.",
      },
      {
        name: "SMC/ICT Institutional Reference Levels",
        description:
          "Calculates PDH/PDL, PWH/PWL, NDOG/NWOG, and REH/REL cluster liquidity pools with real-time HUD status metrics.",
      },
    ],
    bullets: [
      "Architected risk-free simulation engine with spoiler-protected data across 12+ historical black-swan scenarios over 15,000+ hours of M5 data.",
      "Built dynamic confluence playbooks requiring deterministic strategy scoring before live or simulated trade execution, eliminating emotional bias.",
      "Engineered automated psychological journaling detecting emotional leaks (FOMO, revenge trading) by running NLP sentiment analytics against pre-market logs.",
      "Resolved complex multi-window state concurrency challenges, ensuring microsecond-accurate trade logging and portfolio reconciliation.",
    ],
    architecture: {
      category: "Quantitative Market Simulation & Algorithmic Execution",
      concurrencyGuarantee:
        "Deterministic drawdown floors, multi-window trade state reconciliation, and atomic ledger balance tracking.",
      protocolOrAi:
        "Llama 3.2 Vision pattern recognition, AI psychological sentiment profiling.",
      dbOrInfra:
        "Supabase PostgreSQL with RLS, TradingView lightweight chart engine, secure edge session tokens.",
    },
  },
  {
    id: "pitchbuddy",
    name: "PitchBuddy",
    descriptor: "Operating System for Small-Sided Football Venues & Hands-Free AI Match Day Companion",
    url: "https://pitchbuddy.cruisehq.fun",
    urlLabel: "pitchbuddy.cruisehq.fun",
    image: "/projects/pitchbuddy_hero.png",
    accentColor: "emerald",
    metrics: [
      { label: "Match Operations", value: "Voice-First Hands-Free" },
      { label: "Queue Balancer", value: "Graph-Preserving Algorithm" },
      { label: "Match Authority", value: "Server-Authoritative Clocks" },
      { label: "Prize Ledger", value: "Bachs Ring-Fenced Escrow" },
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Gemini Live Voice",
      "Real-Time Balancing",
      "Bachs Ledger",
      "Server Timers",
      "Multitenancy",
      "WebSockets",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js",
        "Tailwind CSS",
        "TV Scoreboard Display Canvas",
        "Mobile QR Check-In UI",
        "Live Standings Table",
      ],
      databaseAndConcurrency: [
        "Multitenant PostgreSQL (PGlite + Supabase)",
        "Atomic Queue Mutations",
        "Server-Authoritative Match Clocks",
        "Bachs Ring-Fenced Prize Ledgers",
        "Tenant-Isolation RLS",
      ],
      aiAndRealtime: [
        "Gemini Live Voice Companion",
        "Automated PA Broadcast Synthesis",
        "Hands-Free Voice Match Management",
        "Realtime WebSocket Scoreboards",
      ],
      paymentsAndProtocols: [
        "Bachs Digital Entries",
        "Cash-at-Venue Reconciliation",
        "Automated Escrow Prize Payouts",
        "Refund & Discipline Ledgers",
      ],
    },
    summary:
      "End-to-end venue management system transforming paper-based 5-a-side pitches with algorithmic team balancing, automated tournament brackets, server-authoritative timers, and voice AI PA announcements.",
    modules: [
      {
        name: "Algorithmic Queue & Draw Balancer",
        description:
          "Instantly balances teams based on player profiles and ratings, with smart clustering that keeps friend groups on the same side.",
      },
      {
        name: "Hands-Free Gemini Live PA Companion",
        description:
          "Voice-driven referee assistant that announces match starts, remaining time, next queue calls, and score updates over the venue PA.",
      },
      {
        name: "Automated Tournament Engine",
        description:
          "Procedurally builds and runs knockouts, round-robins, and multi-pitch leagues with server-authoritative timers and live venue TV sync.",
      },
      {
        name: "Ring-Fenced Bachs Prize Ledger",
        description:
          "Collects team entry fees digitally and ring-fences tournament prize pools with automated escrow release upon championship completion.",
      },
      {
        name: "Server-Authoritative WebSocket Match Clocks",
        description:
          "Synchronizes match duration and overtime across mobile devices, pitchside kiosks, and wall-mounted TV scoreboards.",
      },
    ],
    bullets: [
      "Designed instant-queue team balancing algorithm shuffling check-ins into balanced rosters while preserving friend groups for on-the-spot pickup nights.",
      "Engineered hands-free match-day operations driven by a Gemini Live voice companion controlling server-authoritative timers and venue PA announcements.",
      "Built automated tournament builder supporting round-robin, knockout brackets, discipline cards, and live TV scoreboard synchronization.",
      "Integrated Bachs payments for digital competition entry collection and ring-fenced prize pool ledgering.",
    ],
    architecture: {
      category: "Sports Venue Operations & Real-Time Event State Machines",
      concurrencyGuarantee:
        "Server-authoritative match clocks, atomic queue mutations, and ring-fenced escrow payouts.",
      protocolOrAi:
        "Gemini Live voice companion for hands-free audio announcements and scorekeeping.",
      dbOrInfra:
        "Multitenant PostgreSQL (PGlite + Supabase), WebSocket live scoreboards, offline-first mobile check-in.",
    },
  },
  {
    id: "gebo",
    name: "GEBO",
    descriptor: "Verification-First Agent Marketplace & Scoped Authority Registry for BNB Smart Chain",
    url: "https://gebo-bsc.vercel.app",
    urlLabel: "gebo-bsc.vercel.app",
    image: "/projects/gebo_hero.png",
    accentColor: "amber",
    metrics: [
      { label: "Indexed On-Chain Agents", value: "338,000+ Identities" },
      { label: "Probed Endpoints", value: "14,800+ Live APIs" },
      { label: "Scoped Authority Rail", value: "Altana (EIP-7702)" },
      { label: "Decentralized Escrow", value: "APEX (ERC-8183)" },
    ],
    tags: [
      "Next.js 15",
      "TypeScript",
      "viem",
      "Altana (EIP-7702)",
      "APEX (ERC-8183)",
      "x402 Micropayments",
      "Supabase",
      "Drizzle ORM",
      "pg_cron",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js 15",
        "Tailwind CSS",
        "viem Web3 Connect",
        "Latency Sparklines",
        "Multi-Agent Comparison Table",
      ],
      databaseAndConcurrency: [
        "PostgreSQL (Optimized 503MB → 309MB)",
        "Expression Indexes",
        "gebo-guard Latency Shedder",
        "pg_cron Scheduled Probers",
        "Drizzle ORM",
      ],
      aiAndRealtime: [
        "ERC-8004 On-Chain Verification",
        "Multi-Protocol Probers (A2A, MCP, HTTP)",
        "p50/p95 Latency Tracking",
        "Monotonic Revocation Guards",
      ],
      paymentsAndProtocols: [
        "Altana Keystore (EIP-7702)",
        "APEX ERC-8183 Escrow Settlement",
        "EvaluatorRouter Validation",
        "Dual-Rail x402 Micropayments (0.01 $U/call)",
        "Permit2 Signatures",
      ],
    },
    summary:
      "Verification-first agent marketplace on BNB Smart Chain reading all ERC-8004 registered identities directly from chain. Audits 338,000+ minted agents, probes 14,800+ endpoints with p50/p95 latency logging, exposes the gap between self-declared active agents and callable APIs, models cryptographic blast-radius authority using Altana Keystore (EIP-7702), and executes escrow hires via APEX (ERC-8183).",
    modules: [
      {
        name: "ERC-8004 Multi-Protocol Registry",
        description:
          "Indexes 338,000+ on-chain agents and probes 14,800+ endpoints with real-time percentile latency logging and state-transition tracking.",
      },
      {
        name: "Cryptographic Blast-Radius Modeling",
        description:
          "Leverages Altana Keystore (EIP-7702) to strictly decouple contract call target allowlists from spend caps with monotonic on-chain revocation.",
      },
      {
        name: "APEX Escrow & Evaluator Routing",
        description:
          "Integrates decentralized job escrow (ERC-8183) with EvaluatorRouter grading and Sybil-proof verified review anchoring.",
      },
      {
        name: "Database Self-Healing & Cron Fleet Guard",
        description:
          "Built gebo-guard: measures query latency and automatically sheds non-critical cron workers during traffic surges, eliminating aggregate cold timeouts.",
      },
      {
        name: "Live Census Statistics Engine",
        description:
          "Computes dynamic funnel stats via refresh_census_stats() over stored rows, preventing hardcoded or falsified agent counts.",
      },
    ],
    bullets: [
      "Indexed 338,000+ on-chain agent identities with automated multi-protocol liveness probers (A2A, MCP, HTTP) across 14,800+ endpoints logging p50/p95 percentiles and state transitions.",
      "Engineered cryptographic blast-radius authority limits using Altana Keystore (EIP-7702) and viem, decoupling contract call allowlists from spend caps with monotonic on-chain revocation.",
      "Integrated BNB Chain APEX (ERC-8183) decentralized escrow with EvaluatorRouter verification and x402 dual-rail HTTP micropayments (0.01 $U/call).",
      "Resolved severe database memory constraints via session-pooler vacuum surgery, replacing a 36.7MB tsvector with a 13MB expression index and eliminating 9.8s aggregate cold timeouts.",
    ],
    architecture: {
      category: "Decentralized Agent Security & On-Chain Verification",
      concurrencyGuarantee:
        "Cryptographic blast-radius bounds, monotonic on-chain revocation, and Sybil-proof APEX escrow settlements.",
      protocolOrAi:
        "ERC-8004 registry, ERC-8183 APEX, EIP-7702 session accounts, x402 HTTP micropayments.",
      dbOrInfra:
        "PostgreSQL, Drizzle ORM, gebo-guard latency-shedding daemon, pg_cron automated health checks.",
    },
  },

  // =========================================================================
  // 2. COMMERCIAL CLIENT WEBAPPS (HIRED CONTRACTS)
  // =========================================================================
  {
    id: "joebrownhotel",
    name: "Joebrown Palace Hotel & Suites",
    descriptor: "Enterprise Hospitality Management OS & Guest Booking Webapp (Commissioned by Joebrown Palace Hotel & Suites)",
    url: "https://joebrownhotel.com",
    urlLabel: "joebrownhotel.com",
    isClientContract: true,
    clientName: "Joebrown Palace Hotel and Suites",
    image: "/projects/joebrown_hero.jpg",
    accentColor: "amber",
    metrics: [
      { label: "Operational Roles", value: "11-Tier Hardened RBAC" },
      { label: "Reservation Engine", value: "Zero Double-Bookings (Atomic RPC)" },
      { label: "Floor Plan Canvas", value: "Interactive 2D Drag & Drop" },
      { label: "Order Tracking Cost", value: "100% Zero-Cost In-App WebSockets" },
    ],
    tags: [
      "Next.js 16 (React 19)",
      "Supabase Realtime",
      "Gemini AI Concierge",
      "Bachs Payment Gateway",
      "Atomic Booking Engine",
      "2D Floor Canvas",
      "Multi-Station KDS",
      "11-Tier RBAC",
      "Resend SMTP",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js 16 (React 19)",
        "Tailwind CSS",
        "HTML5 Canvas (2D Drag & Drop)",
        "Lucide Icons",
        "Audio API Alerts",
      ],
      databaseAndConcurrency: [
        "Dedicated Supabase PostgreSQL",
        "Supabase Realtime WebSockets",
        "Atomic book_room_atomically RPC",
        "Idempotent Transaction Ledger",
        "Dynamic Role-to-Station Routing",
      ],
      aiAndRealtime: [
        "JB AI Concierge (Gemini Flash)",
        "Role-Gated Tool Separation",
        "Instant KDS Ticket Dispatch",
        "Shift Handover Ledger (staff_notes)",
        "Realtime Front-Desk Escalation",
      ],
      paymentsAndProtocols: [
        "Bachs Gateway (Card, USSD, Crypto)",
        "Automated Bank Transfer Verification",
        "Receipt Screenshot Proof Uploads",
        "Resend Transactional Mail",
        "Room Folio Direct Billing",
      ],
    },
    summary:
      "Bespoke enterprise hospitality operating system and guest portal commissioned by Joebrown Palace Hotel & Suites. Unifies atomic room reservations preventing double-bookings (book_room_atomically), Express QR check-in passes, frictionless digital dining with centered order tray modal, zero-cost in-app real-time order tracking via Supabase WebSockets, interactive 2D table floor plan canvas, multi-station Kitchen Display Systems (KDS), and room folio multi-tender billing.",
    modules: [
      {
        name: "Atomic Room Booking Engine",
        description:
          "Guarantees zero double-bookings via custom PL/pgSQL RPCs (book_room_atomically) with room date-range interval locks and instant receipt generation.",
      },
      {
        name: "Interactive 2D Table Floor Plan Canvas",
        description:
          "Drag-and-drop table management with live visual occupancy states, waiter order taking, and multi-department order routing (bar, kitchen, grill).",
      },
      {
        name: "Multi-Station Kitchen Display System (KDS)",
        description:
          "Real-time kitchen, bar, and grill display screens with acoustic order chimes, ticket timers, item preparation checkboxes, and bump bar functionality.",
      },
      {
        name: "JB AI Voice & Chat Concierge",
        description:
          "Gemini Flash assistant equipped with strict RBAC tool boundaries to handle room requests, order inquiries, and automatic front desk handover.",
      },
      {
        name: "11-Tier Hardened RBAC & Shift Ledger",
        description:
          "Granular roles for owners, managers, accountants, chefs, bartenders, and receptionists with structured shift handover notes and offline night mode toggles.",
      },
    ],
    bullets: [
      "Architected atomic room reservation engine (book_room_atomically RPC) with strict double-booking prevention, automated rate tiering, and dual-rail settlement (Bachs card/USSD/crypto with instant bank transfer fallback).",
      "Engineered interactive 2D drag-and-drop table floor plan canvas for restaurant & lounge operations with live order routing to dedicated bar and kitchen KDS stations.",
      "Built JB AI Concierge: persistent Gemini Flash assistant with strict role-based tool separation and automated escalation to on-duty front desk staff over Supabase Realtime.",
      "Implemented hardened 11-tier RBAC covering front desk, waiters, bartenders, kitchen chefs, accountants, and ownership with automated shift handover ledgering.",
    ],
    architecture: {
      category: "Commissioned Enterprise Contract // Hospitality Platform",
      concurrencyGuarantee:
        "Atomic room reservation RPC (book_room_atomically), idempotency keys on payment webhooks, zero double-booking guarantee.",
      protocolOrAi:
        "Gemini Flash AI Concierge with staff handoff, Supabase Realtime WebSocket event broadcast.",
      dbOrInfra:
        "Dedicated Supabase PostgreSQL, edge middleware session guards, Resend transactional receipts.",
    },
  },
  {
    id: "dreamwise",
    name: "DreamwiseHUB",
    descriptor: "Omnichannel Tech Retail POS & Multi-Stage Repair CRM (Commissioned by Dreamwise Computer Enterprise)",
    url: "https://dreamwisehub.com",
    urlLabel: "dreamwisehub.com",
    isClientContract: true,
    clientName: "Dreamwise Computer Enterprise",
    image: "/projects/dreamwise_hero.png",
    accentColor: "emerald",
    metrics: [
      { label: "Security & Authorization", value: "7-Tier PostgreSQL RLS" },
      { label: "Inventory Model", value: "Dual Retail/Workshop Isolation" },
      { label: "CRM State Machine", value: "Multi-Stage Technician Lifecycle" },
      { label: "Location Engine", value: "Nominatim Auto-Geocoding" },
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "Supabase RLS",
      "PostgreSQL RPCs",
      "Gemini AI Support",
      "Paystack",
      "Dual Inventory",
      "7-Tier RBAC",
      "Nominatim Geocoding",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js 16",
        "Tailwind CSS",
        "Server-Side Proxy Layout Guards",
        "Lucide Icons",
        "Real-Time Tracking Timeline",
      ],
      databaseAndConcurrency: [
        "Supabase PostgreSQL",
        "7-Tier Row Level Security",
        "Atomic Stock Decrement Triggers",
        "Isolated Repair Parts DB",
        "Customer Lifetime Value RPC (get_customer_metrics)",
      ],
      aiAndRealtime: [
        "Gemini AI Support Intercom",
        "Knowledge Base FAQ Grounding",
        "WebSocket Staff Escalation",
        "Channel Alert Dispatch (needs_attention)",
      ],
      paymentsAndProtocols: [
        "Paystack Gateway (NGN ₦)",
        "Idempotent Webhook Verification",
        "Resend SMTP",
        "Nominatim OpenStreetMap Geocoding",
        "Multi-Channel Broadcast (Email, SMS, WhatsApp)",
      ],
    },
    summary:
      "Enterprise operational operating system and storefront commissioned by Dreamwise Computer Enterprise to unify omnichannel Nigerian tech retail with complex repair workflows. Features dual inventory isolation separating retail products from repair parts, 7-tier PostgreSQL RLS, multi-stage technician lifecycle tracking, persistent floating Gemini AI support intercom with staff takeover, customer self-service /track portal, and Nominatim OpenStreetMap auto-geocoding.",
    modules: [
      {
        name: "7-Tier Hardened RBAC & Automatic Owner Whitelist",
        description:
          "Enforces non-negotiable boundaries across Customer, Receptionist, Technician, Accountant, Manager, Owner, and Admin using PostgreSQL RLS and proxy middleware, with automatic owner whitelist triggers.",
      },
      {
        name: "Dual Inventory Isolation",
        description:
          "Strictly separates retail sales products from internal repair workshop stock (screws, IC chips, thermal paste), safeguarding business gross margin analytics.",
      },
      {
        name: "Multi-Stage Technician Repair CRM",
        description:
          "End-to-end device servicing lifecycle (received → diagnosing → waiting_on_parts → completed) with customer self-service tracking codes.",
      },
      {
        name: "Human-in-the-Loop Gemini Intercom",
        description:
          "Floating customer chat grounded in enterprise FAQs with seamless WebSocket escalation to technicians when human expertise is requested.",
      },
      {
        name: "Automated Nominatim Geocoding",
        description:
          "Converts raw business street addresses into verified latitude/longitude coordinates and generates interactive maps without third-party API bloat.",
      },
    ],
    bullets: [
      "Architected enterprise hardware POS and repair CRM with 7-tier RBAC enforced via PostgreSQL Row Level Security (RLS) and server-side layout proxy guards.",
      "Engineered real-time human-in-the-loop AI support intercom powered by Gemini AI with dynamic FAQ grounding and automated WebSocket escalation to technicians.",
      "Implemented high-concurrency checkout pipelines with atomic PostgreSQL constraints and idempotent Paystack webhook verification to eliminate inventory overselling.",
      "Built dual inventory isolation (retail stock vs. repair parts) to keep financial profit analytics untainted, paired with automated OpenStreetMap Nominatim address geocoding.",
    ],
    architecture: {
      category: "Commissioned Enterprise Contract // Retail POS & Repair CRM",
      concurrencyGuarantee:
        "Atomic stock decrement triggers, idempotent Paystack webhook verification, isolated internal inventory tables.",
      protocolOrAi:
        "Gemini AI support intercom with knowledge base grounding and automated staff handoff.",
      dbOrInfra:
        "Supabase PostgreSQL with 7-tier RLS, real-time ticket state machine (received → diagnosing → completed).",
    },
  },
];

export const AGENT_SKILLS: AgentSkill[] = [
  {
    id: "webmcp-auditor",
    name: "WebMCP Integration & Auditor",
    tagline: "The open agent skill for integrating and scoring the W3C WebMCP standard",
    packageSlug: "Kryptopacy/pacy_webmcp_auditor",
    installCommand: "npx skills add Kryptopacy/pacy_webmcp_auditor",
    skillsShUrl: "https://skills.sh/b/Kryptopacy/pacy_webmcp_auditor",
    repoUrl: "https://github.com/Kryptopacy/pacy_webmcp_auditor",
    description:
      "A published Agent Skill enabling coding agents (Claude Code, Cursor, OpenCode, Codex, ZCode) to wire, audit, and perfect WebMCP integrations—the W3C specification transforming websites into native MCP servers for autonomous browsing agents.",
    capabilities: [
      "Multi-Dialect Support: Targets WG draft (document.modelContext.registerTool) and CG spec (navigator.modelContext.provideContext) with universal polyfill fallback.",
      "Automated Scorecard: Grades target websites against published rubric (Usability 60%, Coverage 20%, Quality 20%).",
      "Live Browser Probe: Ships with headless DevTools probe scripts detecting trust gates, tool inventory, and schema vulnerabilities.",
      "Grade-Ordered Healing: Generates prioritized patch recipes from baseline existence to production resilience.",
    ],
    pillarsOrRubric: [
      "Usability (60%): Intent clarity, input schema precision, human-in-the-loop triggers",
      "Coverage (20%): End-to-end user journey mapping across browse, cart, checkout",
      "Quality (20%): Error handling, response serialization, and latency tolerance",
    ],
  },
  {
    id: "codebase-auditor",
    name: "Pacy Codebase Auditor",
    tagline: "A paranoid, senior auditor suite for pre-ship validation and payment handoffs",
    packageSlug: "kryptopacy/pacy-codebase-auditor",
    installCommand: "npx skills add kryptopacy/pacy-codebase-auditor",
    skillsShUrl: "https://skills.sh/kryptopacy/pacy-codebase-auditor",
    repoUrl: "https://github.com/kryptopacy/pacy-codebase-auditor",
    description:
      "An exhaustive two-skill suite built on a pessimistic, guilty-until-proven-innocent audit workflow. Contains the Developer Pay Handoff Simulator and the Codebase Doctor to ensure zero unvetted code reaches production.",
    capabilities: [
      "Developer Pay Handoff Simulator: Renders rigorous sign-off verdicts (approved, held for debt, rejected) before releasing payment or shipping.",
      "Codebase Doctor: Produces visual HTML architectural reports identifying real structural debt and conducts design-grilling convergence loops.",
      "20-Point Launch Checklist: Enforces empirical proof for meta tags, custom 404s, mobile breakpoints, error boundaries, and legal pages.",
      "Zero-Vibe Standard: Closes every route, RPC, and table with verifiable evidence or explicit written exemption.",
    ],
    pillarsOrRubric: [
      "Pillars 1-3: Code Quality, Type Rigor, DB Schema & RLS Integrity",
      "Pillars 4-5: UX Truth, Breakpoints, Loading & Error States",
      "Pillars 6-7: Discoverability, OpenGraph, WebMCP & Agent Crawlers",
      "Pillar 8: Launch Compliance, Analytics & Real Service Policies",
    ],
  },
  {
    id: "reverse-otp",
    name: "Pacy Reverse OTP Builder",
    tagline: "Zero-cost inbound verification via WhatsApp and Telegram deep links",
    packageSlug: "kryptopacy/pacy-reverse-otp-builder",
    installCommand: "npx skills add kryptopacy/pacy-reverse-otp-builder",
    repoUrl: "https://github.com/kryptopacy/pacy-reverse-otp-builder",
    description:
      "An agent skill that intercepts traditional, costly outbound SMS OTP implementations and coaches AI coding agents to build seamless Inbound Verification (Reverse OTP) flows using messaging deep links.",
    capabilities: [
      "Bypasses Telco Spam Filters: Eliminates delivery failures and carrier filtering issues.",
      "Zero Outbound Carrier Fees: User sends pre-filled verification UUID directly via deep link to secure webhook.",
      "Frictionless UX: Completely removes manual 6-digit code typing and copy-paste errors.",
      "Multi-Platform: Pre-configured adapters for WhatsApp Business Cloud API and Telegram Bot webhooks.",
    ],
    pillarsOrRubric: [
      "Step 1: One-click app deep-link generates cryptographic verification nonce",
      "Step 2: User sends pre-filled token inside native messaging app",
      "Step 3: Webhook server verifies phone match and grants session token instantly",
    ],
  },
];

export const TECHNICAL_SKILLS_RESUME = {
  languagesAndRuntimes: [
    {
      name: "TypeScript / JavaScript",
      level: "Expert",
      details:
        "Strict typings, Zod runtime schemas, AST transforms, React 19 / Next.js 16 App Router",
    },
    {
      name: "SQL (PostgreSQL & PL/pgSQL)",
      level: "Expert",
      details:
        "Atomic RPCs, SELECT FOR UPDATE row-locking, RLS policies, expression indexes, query tuning",
    },
    {
      name: "Python",
      level: "Advanced",
      details:
        "FastAPI, Modal serverless workers, AI evaluation pipelines, synthetic dataset generators, FFmpeg automation",
    },
    {
      name: "Dart / Flutter",
      level: "Advanced",
      details:
        "Cross-platform mobile apps, offline-first local stores, state management, audio/camera streaming",
    },
    {
      name: "Rust",
      level: "Proficient",
      details:
        "High-throughput token initialization pipelines, cryptographic signing routines, memory-safe data workers",
    },
  ],
  frameworksAndEngines: [
    {
      name: "Next.js 16 (App Router) & React 19",
      details:
        "Server Components, Action RPCs, partial prerendering, dynamic route segments, high-craft responsive layouts",
    },
    {
      name: "Supabase & PostgreSQL 16",
      details:
        "Realtime WebSockets, Presence & Broadcast channels, row-level security, pgvector semantic search, pg_cron",
    },
    {
      name: "Tailwind CSS v4",
      details:
        "Bespoke architectural styling, fluid responsive scales, dark mode surface hierarchies, CSS canvas shaders",
    },
    {
      name: "Flutter & Serwist PWA",
      details:
        "Offline-first caching, mobile touch event handlers, Service Worker lifecycles at 220+ sitemap route scale",
    },
  ],
  aiAndEvaluation: [
    {
      name: "Gemini Multimodal Live API",
      details:
        "Bidirectional WebSockets with 16kHz PCM mic-in, 24kHz audio out, 1 FPS video analysis, real-time barge-in",
    },
    {
      name: "RLHF / SFT Hallucination Auditing",
      details:
        "Rigorous multi-turn prompt calibration and output evaluation achieving 99.8% factuality across LLM pipelines",
    },
    {
      name: "Agentic IDEs & Autonomous Protocols",
      details:
        "Author of published Agent Skills (skills.sh), prompt architecture, tool-calling schema design, Zod EDL synthesis",
    },
    {
      name: "Media & Audio AI Compute",
      details:
        "Distributed Modal cloud workers, Stable Audio Open 1.0 stereo generation, Cloudflare R2 object ingestion",
    },
  ],
  protocolsAndHardware: [
    {
      name: "W3C WebMCP Standard",
      details:
        "Dynamic document.modelContext.registerTool registration, human-in-the-loop gates, 14 machine discovery standards (RFC 9727, RFC 8288)",
    },
    {
      name: "Machine Payments & Micro-billing",
      details:
        "Coinbase x402, Machine Payment Protocol (MPP), Bachs hosted checkout (USDC/USDT/SOL), Paystack HMAC webhooks",
    },
    {
      name: "Smart Accounts & Cryptographic Escrow",
      details:
        "Altana Keystore (EIP-7702 blast-radius boundaries), BNB Chain APEX (ERC-8183 escrow), Permit2 signatures, viem",
    },
    {
      name: "Zero-Daemon Driverless Hardware",
      details:
        "ESC/POS thermal receipt printing over WebUSB, WebSerial (RS232 COM), and WebBluetooth with automated cash drawer kick pulses",
    },
  ],
  clinicalMethodology: [
    {
      name: "Clinical Differential Diagnostics",
      details:
        "Triage framework isolating root causes across asynchronous race conditions, memory leaks, and distributed failures",
    },
    {
      name: "Deterministic Concurrency Logic",
      details:
        "Eliminating non-deterministic edge cases and hallucinations through rigid schema constraints and boundary checks",
    },
    {
      name: "Zero-Margin Data Rigor",
      details:
        "1,500+ clinical patient encounters translating high-stakes medical differential diagnosis into zero-defect software ledgers",
    },
  ],
};

export const EXECUTIVE_PROFILE = {
  name: "Olamilekan David Adegoke",
  handle: "@kryptopacy",
  role: "Full-Stack Systems Architect, AI Systems Evaluator & Doctor of Optometry",
  location: "Ibadan, Nigeria",
  phone: "+234 913 026 2529",
  email: "pacy@cruisehq.fun",
  github: "https://github.com/kryptopacy",
  twitter: "https://x.com/kryptopacy",
  x: "https://x.com/kryptopacy",
  linkedin: "https://www.linkedin.com/in/olamilekanadegoke",
  devto: "https://dev.to/kryptopacy",
  website: "https://pacylabs.xyz",
  education: {
    degree: "Doctor of Optometry (O.D.)",
    institution: "University of Ilorin",
    year: "May 2023",
    license:
      "Active License: Optometrists and Dispensing Opticians Registration Board of Nigeria (ODORBN)",
  },
  clinicalHistory: [
    {
      role: "Intern Optometrist",
      organization: "Catholic Optic Outreach",
      period: "May 2024 – May 2025",
      details:
        "Managed clinical diagnostic triage, ocular pathology treatment, and patient records with electronic health record privacy.",
    },
    {
      role: "Extern Optometrist",
      organization: "University of Ilorin Teaching Hospital Eye Clinic",
      period: "Apr 2022 – Oct 2022",
      details:
        "High-volume clinical evaluations in a tertiary hospital setting, multi-variable diagnostics under zero-defect tolerance.",
    },
  ],
};
