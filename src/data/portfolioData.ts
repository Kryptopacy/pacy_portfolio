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
    descriptor: "Hardware-Agnostic Commerce & Service Operating System for Modern Brands, Human Guests & Autonomous AI Agents",
    url: "https://wetaego.com",
    urlLabel: "wetaego.com",
    image: "/projects/wetaego_hero.png",
    accentColor: "blue",
    metrics: [
      { label: "Hardware Architecture", value: "100% Web-Native (Zero Lock-In)" },
      { label: "Offline Resilience", value: "Zero-Downtime IndexedDB Queue" },
      { label: "Multi-Branch Fleets", value: "Sub-1s Catalog Duplication" },
      { label: "Agent Protocol Readiness", value: "W3C WebMCP & 14 Open Discovery RFCs" },
    ],
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "W3C WebMCP",
      "Offline-First IndexedDB",
      "Supabase Realtime",
      "PostgreSQL RLS",
      "Gemini Multimodal Live API",
      "Upstash Redis",
      "x402 / MPP",
      "Serwist PWA",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js 16 (React 19)",
        "Tailwind CSS v4",
        "Universal Design Token Engine (`design_tokens` JSONB)",
        "Split-Screen Visual Builder",
        "Serwist PWA (Offline-First)",
        "Zustand + IndexedDB Cache Hydration",
      ],
      databaseAndConcurrency: [
        "PostgreSQL 16 Multi-Tenant RLS",
        "SELECT FOR UPDATE Row-Level Locks",
        "Offline Queue Sync (`offline-queue-store.ts`)",
        "Atomic Two-Phase Checkout RPCs",
        "Supabase Realtime WebSockets",
        "Upstash Redis Edge WAF",
      ],
      aiAndRealtime: [
        "Tego Multimodal Live Voice & Vision (16kHz/24kHz PCM)",
        "Continuous 1 FPS Camera Menu/Inventory Auditing",
        "Business-Adaptive Role Personas",
        "Zero-Hallucination Database Grounding",
        "Real-Time Manager WebSocket Escalation",
      ],
      paymentsAndProtocols: [
        "W3C WebMCP Native (8 Canonical In-Browser Tools)",
        "RFC 9727 API Catalog & RFC 8288 Link Headers",
        "Coinbase x402 & Machine Payment Protocol (MPP)",
        "In-House VIP IOU / BNPL Tab Financing Ledger",
        "Multi-Gateway Settlement (Cards, Bank Transfer, USSD, Crypto)",
      ],
    },
    summary:
      "Hardware-agnostic commerce and service operating system built to dismantle predatory POS lock-in (Toast, Square, OpenTable). Operates seamlessly on any mobile phone, tablet, or web browser with zero proprietary hardware. Features zero-downtime offline-first order queueing in IndexedDB, 100% white-label customer data sovereignty, in-house VIP IOU / BNPL tab financing without third-party fees, sub-second multi-branch catalog replication, Tego multimodal live voice/vision scanning, and industry-leading autonomous AI agent commerce across 14 open discovery standards (W3C WebMCP, RFC 9727, Coinbase x402).",
    modules: [
      {
        name: "Hardware-Agnostic Engine & Zero-Downtime Offline Queue",
        description:
          "Runs on any web browser with zero mandatory terminal hardware. When venue internet drops during peak rushes, transactions buffer locally in IndexedDB (offline-queue-store.ts) and reconcile automatically upon reconnection.",
      },
      {
        name: "Universal Design Token Engine & Visual Builder",
        description:
          "Abstracts storefront visuals into semantic JSONB tokens supporting 9 polymorphic layout templates (Bento Grid, Masonry, Glassmorphism) across 6 verticals (Dining, Hospitality, Boutique Retail, Wellness, Trades, Studios).",
      },
      {
        name: "In-House VIP IOU / BNPL Tab Ledger",
        description:
          "Digitizes the high-trust 'put it on my tab' culture for regular patrons with merchant-set credit limits and automated reconciliation, eliminating predatory third-party BNPL processing fees.",
      },
      {
        name: "Multi-Branch Fleet Duplication & Location Autonomy",
        description:
          "Replicates entire multi-department supermarket and restaurant catalogs across franchise locations in under a second (duplicatePageAction) while preserving store-level manager out-of-stock autonomy.",
      },
      {
        name: "Tego Multimodal Live Voice & Vision AI",
        description:
          "Bidirectional 16kHz/24kHz PCM audio dialogue + continuous 1 FPS camera video ingestion for live physical menu and inventory auditing with zero-hallucination guardrails and seamless human staff handoff.",
      },
      {
        name: "W3C WebMCP & 14 Open Agent Standards",
        description:
          "First-in-class autonomous agent checkout exposing 8 canonical tools on document.modelContext, RFC 9727 API catalogs, and Coinbase x402 protocols with mandatory Human-in-the-Loop authorization.",
      },
    ],
    bullets: [
      "Engineered hardware-agnostic commerce architecture liberating merchants from Toast/Square proprietary lock-in with zero-downtime IndexedDB offline queueing.",
      "Built universal design token engine with split-screen visual builder supporting 9 polymorphic layout templates across 6 distinct commercial verticals.",
      "Implemented in-house VIP IOU tab financing ledger and sub-second multi-branch franchise catalog duplication with store-level manager autonomy.",
      "Pioneered autonomous agent commerce implementing W3C WebMCP on document.modelContext and 14 open discovery standards (RFC 9727, x402, MPP).",
    ],
    architecture: {
      category: "Hardware-Agnostic Commerce & Autonomous Agent Protocol OS",
      concurrencyGuarantee:
        "Row-level locks (SELECT FOR UPDATE), offline queue replay reconciliation, and atomic two-phase wallet transfers.",
      protocolOrAi:
        "W3C WebMCP (8 client tools), 14 open agent standards (RFC 9727), Gemini Multimodal Live API (PCM audio + 1 FPS video).",
      dbOrInfra:
        "PostgreSQL 16 with RLS tenant isolation, Supabase Realtime, Upstash Redis edge WAF, Serwist PWA.",
    },
  },
  {
    id: "cruisehq",
    name: "CruiseHQ",
    descriptor: "Urban Culture, Nightlife & Real-World Gathering Operating System, Community Hubs & Voice AI Master",
    url: "https://cruisehq.fun",
    urlLabel: "cruisehq.fun",
    image: "/projects/cruisehq_hero.png",
    accentColor: "indigo",
    metrics: [
      { label: "Gate Admission Speed", value: "Sub-Second Camera QR Viewfinder" },
      { label: "Social & Party Games", value: "51 Cultural Games + 9 Minigames" },
      { label: "Voice Automation", value: "TCG Multimodal Voice DOM Controller" },
      { label: "Ecosystem Currency", value: "$CRUISE Multi-Scope Utility Ledger" },
    ],
    tags: [
      "Next.js 15",
      "TypeScript",
      "Gemini Multimodal Live API",
      "Supabase Realtime",
      "PostgreSQL RLS",
      "WebRTC Audio Mesh",
      "Bachs Multi-Rail Checkout",
      "Serwist PWA",
      "In-Browser AI Game Studio",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js 15 (App Router)",
        "Tailwind CSS",
        "Mobile QR Gate Check-In Viewfinder (`/dashboard/organizer/checkin`)",
        "WebRTC Peer-to-Peer Voice Audio Mesh",
        "Real-Time Active Speaker Halo Detection",
        "Browser Soundboard FX & Web Audio Chimes",
      ],
      databaseAndConcurrency: [
        "Supabase PostgreSQL (Shared Ecosystem Data Layer)",
        "Atomic spend_cruise & grant_cruise RPCs",
        "Service-Role Minting Guard",
        "Deny-by-Default RLS Policies",
        "PostGIS Geolocation Venue Mapping",
      ],
      aiAndRealtime: [
        "TCG Multimodal Voice AI Concierge (Gemini Live API)",
        "20+ Client Tool Declarations Mutating React DOM",
        "AI Co-Host Voice Summoning in Live Lounges",
        "In-Browser 60 FPS HTML5 AI Game Studio",
        "Automated GamesMaster Rule & Penalty Announcer",
      ],
      paymentsAndProtocols: [
        "Bachs Multi-Rail Checkout (Cards, Bank Transfer, Crypto)",
        "Unified Cross-Product $CRUISE Credit Ledger",
        "Idempotent Webhook Ticket Generation",
        "Affiliate Split-at-Source Commission Engine",
      ],
    },
    summary:
      "The complete operating system for urban culture, nightlife events, and real-world gatherings. Unifies multi-tier ticketing with Bachs multi-rail checkout, instant mobile camera QR gate admission scanner with real-time throughput metrics, decentralized community hubs with WebRTC live audio lounges, TCG (The Cruise God) multimodal voice AI concierge that physically controls the React DOM, the GamesMaster directory of 51 cultural party games with automated voice hosting, 9 native multiplayer minigames, and an in-browser AI game studio generating playable 60 FPS HTML5 games with $CRUISE gas refund guarantees.",
    modules: [
      {
        name: "Event Ticketing & Mobile Camera Gate Scanner",
        description:
          "Multi-tier ticket issuance with Bachs unified checkout (Cards, Transfers, Crypto), paired with a dedicated mobile camera QR gate scanner (/dashboard/organizer/checkin) featuring real-time throughput metrics, Web Audio chimes, and haptics.",
      },
      {
        name: "Community Hubs & WebRTC Live Lounge",
        description:
          "Decentralized creator hubs with $CRUISE entry fees, Discord-grade WebRTC peer-to-peer audio mesh, active speaker halo detection, native screen sharing, and browser soundboard FX.",
      },
      {
        name: "TCG Multimodal Voice Concierge & DOM Controller",
        description:
          "Voice-first companion running over bidirectional WebSockets that interprets natural speech to execute 20+ client tool declarations, directly manipulating the React DOM and hosting live audio stages.",
      },
      {
        name: "GamesMaster Directory (51 Cultural Games)",
        description:
          "Comprehensive database of worldwide classics and deep Nigerian social gathering games (Ayo Olopon, Ten-Ten, Whot, Drink or Tell the Truth) with automated TCG AI voice hosting, timers, and drinking penalties.",
      },
      {
        name: "Arcade Hub & In-Browser AI Game Studio",
        description:
          "9 native multiplayer minigames (Conce-Conce, TriviaRush, Impostor) with weekly rival ladders, plus an in-browser AI game studio where users prompt playable 60 FPS HTML5 games directly inside /arcade with $CRUISE refund guarantees.",
      },
      {
        name: "Cross-Product $CRUISE Utility Ledger",
        description:
          "Shared microeconomy powering CruiseHQ (Events & Culture), Baunti (Prize Escrow), and Huiyi (Video Recaps) under synchronized atomic database RPCs.",
      },
    ],
    bullets: [
      "Architected urban nightlife operating system with mobile camera QR gate admission scanner, multi-tier Bachs checkout, and post-event recap integration.",
      "Engineered TCG: bidirectional Gemini Live voice AI concierge executing 20+ client tool declarations directly mutating the React DOM and hosting audio stages.",
      "Built GamesMaster and Arcade platforms featuring 51 cultural party games, 9 native multiplayer minigames, and an in-browser AI game studio generating playable HTML5 games.",
      "Implemented unified $CRUISE ledger spanning events, community hub memberships, and cross-product utility across Baunti and Huiyi.",
    ],
    architecture: {
      category: "Urban Culture, Real-Time Voice & Multiplayer Event Infrastructure",
      concurrencyGuarantee:
        "Atomic spend_cruise RPCs, service-role-only minting, and split-at-source ticketing reconciliation.",
      protocolOrAi:
        "Gemini Multimodal Live API, 20+ React DOM tool declarations, WebRTC peer audio mesh.",
      dbOrInfra:
        "Supabase PostgreSQL, Upstash Redis caching, Serwist PWA at 220+ sitemap scale.",
    },
  },
  {
    id: "baunti",
    name: "BAUNTI",
    descriptor: "Upfront-Escrowed Prize & Bounty Protocol with Provably-Fair Cryptographic Verification & Creator Royalties",
    url: "https://baunti.cruisehq.fun",
    urlLabel: "baunti.cruisehq.fun",
    image: "/projects/baunti_hero.jpg",
    accentColor: "rose",
    metrics: [
      { label: "Escrow Guarantee", value: "100% Upfront-Locked (Zero Default)" },
      { label: "Draw Integrity", value: "9 Provably-Fair SHA-256 HMAC Formats" },
      { label: "Pot Distribution", value: "The Slice Exact-Sum Mathematical Solver" },
      { label: "Creator Royalties", value: "15% Perpetual $CRUISE Blueprint Yield" },
    ],
    tags: [
      "Next.js 16",
      "TypeScript",
      "SHA-256 HMAC",
      "$CRUISE Escrow",
      "Provably Fair",
      "Supabase",
      "Exact-Sum Math",
      "Wax Seal Canvas",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js 16 (App Router)",
        "Tailwind CSS",
        "Museum-Grade Parchment Canvas",
        "Wax Seal Shaders",
        "Public Verifiable Draw Studio",
      ],
      databaseAndConcurrency: [
        "Supabase PostgreSQL",
        "Upfront Escrow Locking RPCs (pool:<challengeId>)",
        "Asymmetric 3-Class Balance Guard (earned vs. purchased vs. promo)",
        "Atomic pot_settle RPCs",
        "Immutable Audit Ledgers",
      ],
      aiAndRealtime: [
        "Commit-Reveal SHA-256 HMAC Seed Protocol",
        "The Slice Mathematical Random Share Solver",
        "Instant Automated Pot Disbursal",
        "Real-Time Draw Room Sync",
      ],
      paymentsAndProtocols: [
        "$CRUISE Escrow & Preferential 5% Rate",
        "Bachs Multi-Gateway (USDT, Cards, Bank Transfers)",
        "Anti-Sybil Blueprint Royalty Engine (The Lab)",
        "Idempotent Settlement Webhooks",
      ],
    },
    summary:
      "High-integrity prize competition and marketing bounty protocol that permanently eliminates sponsor defaults. Sponsors lock prize pools irrevocably in Naira, USDT, or $CRUISE (pool:<challengeId>) before a single entry opens. Features 9 provably-fair draw formats backed by commit-reveal SHA-256 HMAC seeds, The Slice mathematical solver distributing exact-sum random shares across multiple winners without fractional dust, 3-class asymmetric liquidity partitioning (earned vs. purchased vs. promo), and The Lab creator incubator awarding 15% perpetual royalties to community blueprint inventors.",
    modules: [
      {
        name: "Upfront Escrow Locking Engine",
        description:
          "Prize pools lock irrevocably before entries open (pool:<challengeId>), guaranteeing that no sponsor can default or withhold rewards once participants compete.",
      },
      {
        name: "9 Provably-Fair Cryptographic Draw Formats",
        description:
          "Implements 9 verifiable formats (Classic Sweep, Knockout, Golden Tickets, Roll-off, Last Seal Standing, High Rollers, Team Clash, First Blood, The Bracket) backed by immutable commit-reveal SHA-256 HMAC seeds.",
      },
      {
        name: "The Slice Exact-Sum Proportional Solver",
        description:
          "Mathematically solves per-winner random shares that sum exactly to the pot without fractional dust, recorded on public verifiable audit ledgers.",
      },
      {
        name: "Asymmetric 3-Class Liquidity Partitioning",
        description:
          "Strictly partitions balances into earned (withdrawable prize winnings), purchased (spend-only pool funding), and promo (spend-only grants) to eliminate platform insolvency risk.",
      },
      {
        name: "The Lab Blueprint Incubator & 15% Royalties",
        description:
          "Community designers submit creative bounty blueprints, earning 15% perpetual royalties in $CRUISE every time a sponsor funds their challenge.",
      },
      {
        name: "Museum-Grade Signature Parchment Artifacts",
        description:
          "High-stakes physical canvas artifacts (Winner Warrants, Ticket Stubs, Audit Ledgers) rendered with canvas tear lines, wax seal shaders, and perforated edges.",
      },
    ],
    bullets: [
      "Architected upfront escrow locking mechanism preventing sponsor default by holding prize pools in earmarked escrow accounts prior to challenge activation.",
      "Engineered provably-fair draw engine across 9 formats with commit-reveal SHA-256 HMAC seeds and public cryptographic audit ledgers.",
      "Developed The Slice mathematical algorithm distributing exact-sum random shares across multiple winners with zero fractional dust.",
      "Built asymmetric convertibility economics partitioning user credit balances into earned, purchased, and promo to eliminate insolvency risk while rewarding blueprint inventors with 15% royalties.",
    ],
    architecture: {
      category: "Cryptographic Prize Escrow & Provably-Fair Infrastructure",
      concurrencyGuarantee:
        "Upfront pool locking, atomic pot_settle RPCs, and mathematical exact-sum share validation.",
      protocolOrAi:
        "Commit-reveal SHA-256 HMAC draw engine, 9 provably-fair formats, The Slice solver.",
      dbOrInfra:
        "Supabase PostgreSQL, shared $CRUISE ledger entries, public cryptographic audit ledgers.",
    },
  },
  {
    id: "huiyi",
    name: "Huiyi",
    descriptor: "Zero-Friction Collaborative Event Video Recap Engine & Multimodal AI Director",
    url: "https://huiyi.cruisehq.fun",
    urlLabel: "huiyi.cruisehq.fun",
    image: "/projects/huiyi_hero.png",
    accentColor: "purple",
    metrics: [
      { label: "Guest Friction", value: "100% Zero-App / Zero-Account QR" },
      { label: "Editing Intelligence", value: "Gemini Multimodal Beat & Sentiment Clustering" },
      { label: "Rendering Pipeline", value: "Distributed Modal Cloud FFmpeg Workers" },
      { label: "Pricing Model", value: "100% Charge-on-Success Credit Guarantee" },
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Gemini Multimodal",
      "Cloudflare R2",
      "Distributed FFmpeg",
      "Modal Cloud Workers",
      "Bachs Checkout",
      "Zero-App QR",
    ],
    techStackByCategory: {
      frontend: [
        "Next.js (App Router)",
        "Tailwind CSS",
        "Zero-App Mobile QR Uploader",
        "Natural Language Timeline Director Controls",
        "Watermark & Branding Customizer",
      ],
      databaseAndConcurrency: [
        "Supabase PostgreSQL",
        "Charge-on-Success Credit Metering Ledger",
        "Atomic credit_deduct Locks on Render Success",
        "Cloudflare R2 Presigned Direct-to-Bucket Pipeline",
      ],
      aiAndRealtime: [
        "Gemini Multimodal Video Intelligence",
        "Natural-Language Director Prompt Compiler",
        "Face, Lighting & Audio Beat Quality Scorer",
        "Automated Multi-Candidate Highlight Assembly",
      ],
      paymentsAndProtocols: [
        "Bachs Hosted Multi-Rail Checkout (10/$9, 40/$29, 120/$79)",
        "Verified collection.succeeded Webhook Grants",
        "Modal Cloud Serverless FFmpeg Workers",
        "Zero-Charge Guarantee on Failed Renders",
      ],
    },
    summary:
      "Collaborative event video platform that solves the multi-thousand dollar videographer turnaround lag and lost attendee footage for weddings, festivals, galas, and summits. Guests drop high-resolution phone clips directly via dynamic QR codes with zero app downloads or accounts. Organizers direct edits using natural language prompts, with Gemini analyzing clip lighting, audio energy, and guest faces to render multi-candidate cinematic highlight reels across distributed Modal cloud FFmpeg workers with 100% charge-on-success credit guarantees.",
    modules: [
      {
        name: "Zero-App Mobile QR Guest Uploader",
        description:
          "Frictionless mobile web interface allowing wedding, conference, and festival guests to contribute high-res video clips instantly via QR scan without account creation or app installation.",
      },
      {
        name: "Gemini Multimodal Video Director",
        description:
          "Analyzes attendee video footage, evaluates audio beat energy and facial sentiment, and compiles intelligent timeline edits based on natural language director instructions.",
      },
      {
        name: "Distributed Modal Cloud FFmpeg Workers",
        description:
          "Scalable cloud video rendering fleet applying custom watermarks, color grading, audio leveling, and dynamic transitions across multiple candidate edits simultaneously.",
      },
      {
        name: "100% Charge-on-Success Credit Ledger",
        description:
          "Strict transactional accounting charging organizer credits only upon flawless render completion, eliminating financial risk from failed compositions.",
      },
      {
        name: "Cloudflare R2 Direct Media Pipeline",
        description:
          "Presigned direct-to-bucket media uploads bypassing web server bottlenecks and enabling concurrent multi-gigabyte video ingestion during live events.",
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
    id: "gozvision",
    name: "GozVision",
    descriptor: "The Enterprise AI Copilot & Practice Operating Platform for Eye Care (Optometry & Ophthalmology)",
    url: "https://gozvision.vercel.app",
    urlLabel: "gozvision.vercel.app",
    image: "/projects/gozvision_hero.png",
    accentColor: "emerald",
    metrics: [
      { label: "EHR Interoperability", value: "HL7 FHIR R4 & SMART on FHIR" },
      { label: "Clinical Scribe", value: "Optometric OLD CARTS Engine" },
      { label: "CMS Reimbursement", value: "RTM CPT 98975 / 98980 / 98981" },
      { label: "Edge Vision Pipeline", value: "OpenCV 5.0 CLAHE & Glare Shield" },
    ],
    tags: [
      "Flutter 3.47 / Dart",
      "HL7 FHIR R4",
      "Supabase PostgreSQL",
      "OpenCV 5.0 Edge CV",
      "FastMCP (Spec 2025-11-25+)",
      "Ambient Scribe Studio",
      "CMS RTM Billing",
      "Bachs & Stripe POS",
      "AWS CloudFront & ECS",
    ],
    techStackByCategory: {
      frontend: [
        "Flutter 3.47 (WebAssembly & CanvasKit PWA)",
        "Goz Clinic Suite B2B (/clinic)",
        "Goz Patient Copilot B2C (/patient)",
        "WCAG 2.2 Level AAA High-Contrast Obsidian System",
        "Plain-English Accessible Layperson Terminology Layer",
      ],
      databaseAndConcurrency: [
        "Supabase PostgreSQL 16 with Multi-Tenant RLS (clinic_id, doctor_id isolation)",
        "PostGIS Geolocation Emergency SOS Routing",
        "Realtime WebSocket Telemetry & Presence",
        "Amazon S3 Encrypted Form Scans",
        "AWS CloudFront TLS 1.3 Edge CDN",
      ],
      aiAndRealtime: [
        "Ambient Scribe Studio (Optometric OLD CARTS Case History)",
        "OpenCV 5.0 Edge CV (Adaptive LAB CLAHE & Photophobia Glare Attenuation)",
        "Air-Gapped Local WebGPU AI vs. Cloud HIPAA BAA Zero-Retention Switcher",
        "Multimodal Live Gemini 3.8 / 2.5 Flash Audio Streams",
        "Physical Paper Form Digitizer (AI Layout Analysis & Digital Replica)",
      ],
      paymentsAndProtocols: [
        "FastMCP Model Context Protocol (spec 2025-11-25+ at /mcp)",
        "HL7 FHIR R4 & ONC USCDI v3 (Epic, Eyefinity, RevolutionEHR, ModMed)",
        "CMS RTM Remote Therapeutic Monitoring Engine (CPT 98975, 98980, 98981)",
        "Bachs E-Commerce API (1-Tap Optical Checkout & FedNow/RTP Bank Payouts)",
        "Stripe Connect Multi-Tenant Front Desk POS & Acrylic QR Signage Stands",
      ],
    },
    summary:
      "End-to-end multi-tenant clinical intelligence and assistive visual copilot platform bridging in-clinic encounter efficiency with between-visit patient autonomy. Unifies four previously fragmented healthcare domains under one architecture: Optometric Ambient Scribing with structured OLD CARTS history, bidirectional HL7 FHIR R4 EHR interoperability (Epic, Eyefinity, RevolutionEHR, ModMed), practice commerce via Bachs instant bank payouts and Stripe POS, and continuous between-visit patient care via edge OpenCV 5.0 contrast/glare attenuation and automated CMS RTM billing (CPT 98975/98980/98981).",
    modules: [
      {
        name: "Goz Clinic Suite & Ambient Scribe Studio",
        description:
          "Real-time optometric encounter recording with structured OLD CARTS case history generation, physical paper intake form digitization, and air-gapped WebGPU local AI vs. signed HIPAA BAA cloud inference switcher.",
      },
      {
        name: "HL7 FHIR R4 EHR Interoperability Hub",
        description:
          "Bidirectional SMART on FHIR OAuth 2.0 PKCE gateway syncing Patients, Encounters, Observations (IOP, Visual Acuity OD/OS), DiagnosticReports, and DocumentReferences across Epic Systems, Eyefinity, RevolutionEHR, ModMed EMA, and Compulink.",
      },
      {
        name: "Goz Patient Copilot & Dual-Mode Engine",
        description:
          "High-contrast PWA toggling between Low-Vision Assist (voice-first, OpenCV 5.0 video contrast filter, spatial hazard alerts, encrypted caregiver SOS) and Clinic Companion (drop adherence, post-op summaries, Bachs 1-tap optical reorders).",
      },
      {
        name: "Edge OpenCV 5.0 Computer Vision Pipeline",
        description:
          "Client-side video stream processing utilizing Adaptive LAB CLAHE for contrast-deficient corneas, specular glare attenuation for photophobia, and morphological reading-zone isolation.",
      },
      {
        name: "Practice Commerce, POS & CMS RTM Engine",
        description:
          "Automated CMS Remote Therapeutic Monitoring claim generator for CPT 98975/98980/98981, paired with dual-rail Bachs FedNow/RTP payouts, Stripe Connect front-desk POS, and multi-purpose acrylic QR signage stands.",
      },
    ],
    bullets: [
      "Architected dual-surface enterprise eye care operating platform spanning Goz Clinic Suite (/clinic) and Goz Patient Copilot (/patient) in Flutter 3.47 CanvasKit/Wasm with Supabase PostgreSQL 16 multi-tenant RLS.",
      "Engineered Optometric Ambient Scribe Studio with structured OLD CARTS clinical case history extraction, physical paper form digitizer, and air-gapped on-device WebGPU AI vs. HIPAA BAA cloud switcher.",
      "Built bidirectional HL7 FHIR R4 & SMART on FHIR interoperability gateway synchronizing intraocular pressure (IOP), visual acuity, and clinical encounters across Epic Systems, Eyefinity, RevolutionEHR, and ModMed.",
      "Implemented edge OpenCV 5.0 vision pipeline with Adaptive LAB CLAHE contrast, specular glare shield, automated CMS RTM billing (CPT 98975/80/81), FastMCP server (/mcp), and Bachs instant bank payouts.",
    ],
    architecture: {
      category: "Clinical AI, EHR Interoperability & Assistive Vision Infrastructure",
      concurrencyGuarantee:
        "PostgreSQL 16 multi-tenant RLS isolation (clinic_id/doctor_id), PostGIS emergency routing, immutable FHIR AuditEvent logs.",
      protocolOrAi:
        "HL7 FHIR R4, FastMCP (spec 2025-11-25+), OpenCV 5.0 edge CV, Gemini Multimodal Live, Air-Gapped WebGPU.",
      dbOrInfra:
        "Supabase PostgreSQL 16, AWS CloudFront TLS 1.3 Edge CDN, AWS Amplify, Amazon ECS Fargate, Amazon S3/SES.",
    },
  },
  {
    id: "caelumos",
    name: "CaelumOS",
    descriptor:
      "Institutional Precision Operating System for Systematic & Prop Traders, Rule-Confluence Engine & Black-Swan Market Simulator",
    url: "https://caelumos.trade",
    urlLabel: "caelumos.trade",
    image: "/projects/caelum_hero.png",
    accentColor: "cyan",
    metrics: [
      { label: "Backtesting Dataset", value: "15,000+ M5 Market Hours" },
      { label: "Stress Testing", value: "12 Black-Swan Replays" },
      { label: "Execution Governance", value: "Weighted Confluence Scoring" },
      { label: "Edge Diagnostics", value: "AI Emotional Leak & Drawdown Engine" },
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
      "Institutional execution operating system designed to eliminate emotional tilt and discretionary errors that cause 90% of retail traders to fail. Replaces static spreadsheet journals with 15,000+ hours of spoiler-protected M5 market simulations across 12 historical black-swan shocks (FTX, COVID, Brexit), weighted rule-confluence checklists that block non-systematic orders, Llama 3.2 Vision candlestick pattern recognition, and automated NLP emotional leak detection correlating trader psychology with equity drawdowns.",
    modules: [
      {
        name: "The Simulator (The Dojo)",
        description:
          "Replays 12+ historical macro shock scenarios (FTX Collapse, COVID Crash, Brexit, LUNA Depeg) with spoiler-protected tick-by-tick candle streams across 15,000+ hours of M5 data.",
      },
      {
        name: "Rule-Bound Confluence Playbook",
        description:
          "Enforces institutional execution discipline by calculating dynamic weighted strategy scores and locking order logging until minimum setup criteria are satisfied.",
      },
      {
        name: "Psychological Leak Radar & Emotional Journal",
        description:
          "Analyzes trader journal reflections and execution timestamps with NLP sentiment models to detect FOMO, revenge trading, and emotional tilt before capital is destroyed.",
      },
      {
        name: "Llama 3.2 Vision Pattern Scanner",
        description:
          "Automated chart screenshot analysis detecting 50+ technical candlestick patterns and benchmarking uploaded setups against historical probability distributions.",
      },
      {
        name: "SMC/ICT Reference Liquidity Engine",
        description:
          "Real-time institutional liquidity HUD calculating PDH/PDL, PWH/PWL, NDOG/NWOG, and REH/REL liquidity pools with multi-window state synchronization.",
      },
    ],
    bullets: [
      "Engineered historical market simulation engine replaying 12+ macro shocks (FTX Collapse, COVID Crash, Brexit, LUNA Depeg) with spoiler-protected candle streams across 15,000+ M5 hours.",
      "Architected dynamic confluence playbooks requiring deterministic strategy scores before live or simulated trade execution, systematically blocking emotional tilt and discretionary revenge trading.",
      "Built automated psychological journaling analyzing pre/post-trade logs with NLP sentiment models to detect emotional leaks (FOMO, tilt) and correlate them directly to equity curve drawdowns.",
      "Integrated Llama 3.2 Vision automated chart pattern recognition, benchmarking uploaded chart setups against historical success probabilities and multi-window state synchronization.",
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
    descriptor:
      "All-in-One Venue Operating System for Small-Sided Football & Turf Arenas, Graph Balancer & Hands-Free Matchday OS",
    url: "https://pitchbuddy.cruisehq.fun",
    urlLabel: "pitchbuddy.cruisehq.fun",
    image: "/projects/pitchbuddy_hero.png",
    accentColor: "emerald",
    metrics: [
      { label: "Roster Operations", value: "Zero-Paper Automated Queue & Balancing" },
      { label: "Matchday Automation", value: "Server-Authoritative TV Scoreboards & Voice PA" },
      { label: "Tournament Builder", value: "Knockout, Groups & One-Night Cups" },
      { label: "Financial Ledger", value: "Bachs Ring-Fenced Prize Pots & Instant Payouts" },
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
      "Complete venue operating system replacing paper slips, chaotic queues, and cash disputes at turf football facilities. Delivers mobile QR player check-in, graph-preserving roster balancing that keeps friend groups together, server-authoritative TV scoreboards with Gemini AI voice PA announcements, automated tournament bracket generation, and Bachs ring-fenced prize escrow.",
    modules: [
      {
        name: "Instant Queue & Fair Balancer",
        description:
          "Instantly balances pickup teams based on player ratings while running graph clustering to preserve friend groups on the same side of the pitch.",
      },
      {
        name: "Gemini Live Voice PA Companion",
        description:
          "Voice-driven referee assistant that announces match starts, remaining injury time, next queue calls, and score updates over the venue PA.",
      },
      {
        name: "Multi-Format Tournament Engine",
        description:
          "Procedurally builds and runs knockouts, round-robin leagues, and one-night cup brackets with server-authoritative timers and live venue TV sync.",
      },
      {
        name: "Ring-Fenced Bachs Prize Escrow",
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
      "Designed instant-queue team balancing algorithm shuffling mobile QR check-ins into balanced rosters while preserving friend groups for on-the-spot pickup nights.",
      "Engineered hands-free match-day operations driven by a Gemini Live voice companion controlling server-authoritative clocks, acoustic klaxons, and venue PA announcements.",
      "Built automated tournament engine supporting knockouts, round-robin leagues, and one-night cup brackets with live TV scoreboard synchronization and disciplinary card tracking.",
      "Integrated Bachs digital payment rails for automated tournament entry fee collection and ring-fenced prize pool escrows with instant champion payouts.",
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
    descriptor:
      "Empirical Agent Census, Verification Marketplace & Scoped DeFi Authority Registry for BNB Chain",
    url: "https://gebo-bsc.vercel.app",
    urlLabel: "gebo-bsc.vercel.app",
    image: "/projects/gebo_hero.png",
    accentColor: "amber",
    metrics: [
      { label: "On-Chain Census", value: "340,000+ ERC-8004 Identities Audited" },
      { label: "Liveness Verification", value: "Continuous Empirical Uptime & Latency Probing" },
      { label: "Risk Containment", value: "Simulated Blast-Radius & DeFi Liquidity Bounds" },
      { label: "Execution Escrow", value: "APEX (ERC-8183) Hires & 1-Click Revocation" },
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
      "Verification-first agent security and marketplace on BNB Smart Chain. Unlike directories that blindly parrot self-reported agent data, GEBO indexes every ERC-8004 identity on-chain, probes actual service endpoints to expose ghost agents and infrastructure centralization (125 operators running 90%+ of endpoints), models cryptographic blast-radius authority limits using Altana Keystore (EIP-7702), and executes escrow hires via APEX (ERC-8183).",
    modules: [
      {
        name: "Empirical ERC-8004 Census & Probing Engine",
        description:
          "Indexes 340,000+ on-chain agents and probes 14,800+ live endpoints with real-time percentile latency logging and state-transition tracking.",
      },
      {
        name: "Simulated Authority & Blast-Radius Presets",
        description:
          "Simulates the exact contract call authority an agent would hold against live PancakeSwap and Venus liquidity pools before signing, strictly bounding spend caps.",
      },
      {
        name: "APEX Escrow & Altana Passkey Revocation",
        description:
          "Integrates decentralized job escrow (ERC-8183) with EvaluatorRouter grading, passkey-enabled session accounts (EIP-7702), and one-click on-chain revocation.",
      },
      {
        name: "gebo-guard Autonomous Database Shedder",
        description:
          "Measures query latency and automatically sheds non-critical cron workers during traffic surges, eliminating aggregate cold timeouts.",
      },
      {
        name: "DeFi Opportunity Surface Indexer",
        description:
          "Indexes live yield and liquidity opportunities directly from PancakeSwap V3 and Venus, mapping callable agents directly to high-yield primitives.",
      },
    ],
    bullets: [
      "Audited 340,000+ ERC-8004 on-chain agent identities, probing 14,800+ live endpoints with rolling p50/p95 latency and exposing 125 infrastructure operators controlling over 90% of callable agents.",
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
    descriptor:
      "Enterprise Hospitality Management Platform & Guest Experience Operating System (Commissioned by Joebrown Palace Hotel & Suites)",
    url: "https://joebrownhotel.com",
    urlLabel: "joebrownhotel.com",
    isClientContract: true,
    clientName: "Joebrown Palace Hotel and Suites",
    image: "/projects/joebrown_hero.jpg",
    accentColor: "amber",
    metrics: [
      { label: "Booking Concurrency", value: "Zero Double-Bookings (book_room_atomically)" },
      { label: "Operational Tracking", value: "100% Zero-Cost In-App WebSockets" },
      { label: "Kitchen Operations", value: "Multi-Station KDS (Kitchen, Bar, Grill)" },
      { label: "Floor Management", value: "Interactive 2D Drag-and-Drop Table Canvas" },
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
      "Enterprise hospitality management platform and guest operating system commissioned by Joebrown Palace Hotel & Suites. Unifies atomic room reservations preventing double-bookings (book_room_atomically), zero-cost in-app real-time order tracking via Supabase WebSockets (eliminating recurring SMS and WhatsApp gateway bills), interactive 2D table floor plan canvas, multi-station Kitchen Display Systems (KDS), and room folio multi-tender billing.",
    modules: [
      {
        name: "Atomic Concurrency Room Booking Engine",
        description:
          "Guarantees zero double-bookings via custom PL/pgSQL RPCs (book_room_atomically) with room date-range interval locks and instant receipt generation.",
      },
      {
        name: "Zero-Cost Real-Time WebSocket Guest Tracking",
        description:
          "Live order tracking timeline delivered over Supabase Realtime WebSockets, giving dining guests real-time kitchen status without recurring SMS/WhatsApp gateway charges.",
      },
      {
        name: "Multi-Station Kitchen Display System (KDS)",
        description:
          "Real-time kitchen, bar, and grill display screens with acoustic order chimes, ticket timers, item preparation checkboxes, and bump bar functionality.",
      },
      {
        name: "Interactive 2D Table Floor Plan Canvas",
        description:
          "Drag-and-drop table management with live visual occupancy states, waiter order taking, and multi-department order routing (bar, kitchen, grill).",
      },
      {
        name: "11-Tier Hardened RBAC & Shift Ledger",
        description:
          "Granular roles for owners, managers, accountants, chefs, bartenders, and receptionists with structured shift handover notes and offline night mode toggles.",
      },
    ],
    bullets: [
      "Architected atomic room reservation engine (book_room_atomically RPC) with strict date-range interval locks, eliminating double-booking collisions under high web concurrency.",
      "Engineered in-app digital dining tracking powered by Supabase Realtime WebSockets, eliminating recurring third-party SMS and WhatsApp gateway fees for guest order status updates.",
      "Built interactive 2D drag-and-drop table floor plan canvas for restaurant & lounge operations with live order routing to dedicated bar, grill, and kitchen KDS stations.",
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
    descriptor:
      "Omnichannel Tech Retail POS & Multi-Stage Hardware Repair Operating System (Commissioned by Dreamwise Innovative Computer Enterprise)",
    url: "https://dreamwisehub.com",
    urlLabel: "dreamwisehub.com",
    isClientContract: true,
    clientName: "Dreamwise Innovative Computer Enterprise",
    image: "/projects/dreamwise_hero.png",
    accentColor: "blue",
    metrics: [
      { label: "Inventory Architecture", value: "Dual Retail / Workshop Stock Isolation" },
      { label: "Servicing CRM", value: "Multi-Stage Technician Lifecycle State Machine" },
      { label: "Access Security", value: "7-Tier Hardened PostgreSQL RLS" },
      { label: "Support Intelligence", value: "Floating Gemini AI with Real-Time Staff Escalation" },
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
        name: "Dual Inventory Isolation Engine",
        description:
          "Mathematically separates customer retail inventory from internal workshop repair stock (screws, IC chips, thermal paste), safeguarding true gross margins and analytics.",
      },
      {
        name: "Multi-Stage Technician Repair CRM",
        description:
          "End-to-end device servicing lifecycle (received → diagnosing → waiting_on_parts → completed → collected) with customer self-service tracking codes.",
      },
      {
        name: "7-Tier Hardened RBAC & Automatic Owner Whitelist",
        description:
          "Enforces non-negotiable boundaries across Customer, Receptionist, Technician, Accountant, Manager, Owner, and Admin using PostgreSQL RLS and proxy middleware.",
      },
      {
        name: "Human-in-the-Loop Gemini Support Intercom",
        description:
          "Floating customer chat grounded in enterprise FAQs with seamless WebSocket escalation to technicians when human expertise is requested.",
      },
      {
        name: "Automated Nominatim Geocoding & Order Routing",
        description:
          "Converts raw business street addresses into verified latitude/longitude coordinates and generates interactive maps without third-party API bloat.",
      },
    ],
    bullets: [
      "Architected dual inventory model mathematically separating customer retail inventory from internal workshop repair stock (screws, IC chips, thermal paste), safeguarding true gross margins.",
      "Engineered multi-stage technician servicing CRM (received → diagnosing → waiting_on_parts → completed → collected) with public customer self-service tracking codes.",
      "Enforced non-negotiable security boundaries across 7 user tiers using PostgreSQL RLS and proxy middleware, with automatic owner whitelist triggers and audit trails.",
      "Built floating Gemini AI customer intercom grounded in enterprise FAQs with seamless WebSocket escalation to technicians when human diagnostic expertise is required.",
    ],
    architecture: {
      category: "Commissioned Enterprise Contract // Retail & Hardware CRM",
      concurrencyGuarantee:
        "PostgreSQL atomic stock decrement triggers, idempotent Paystack webhook verification, isolated repair stock locks.",
      protocolOrAi:
        "Floating Gemini Flash customer intercom with staff takeover, multi-channel customer dispatch.",
      dbOrInfra:
        "Supabase PostgreSQL with 7-tier RLS, edge layout proxy guards, Nominatim OpenStreetMap engine.",
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
