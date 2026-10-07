import { NextResponse } from "next/server";
import { PROJECTS, AGENT_SKILLS, EXECUTIVE_PROFILE } from "@/data/portfolioData";

export const dynamic = "force-dynamic";

// Grounding prompt for Gemini representing Pacy Labs with true facts
const PACY_LABS_SYSTEM_PROMPT = `You are the Autonomous Systems AI Intercom for Pacy Labs (pacylabs.xyz).
Pacy Labs is an elite, high-assurance software architecture laboratory and design engineering studio founded by Olamilekan David Adegoke (@kryptopacy).

Founding Principal:
- Name: Olamilekan David Adegoke (often known as Pacy or Dr. Adegoke).
- Role: Full-Stack Systems Architect, AI Systems Evaluator & Doctor of Optometry (O.D., University of Ilorin).
- Methodology: Translates clinical diagnostic triage rigor (from 1,500+ clinical patient encounters) into zero-defect software engineering, concurrency state machines, and deterministic AI agent runtimes.
- Contact: Direct WhatsApp (+234 913 026 2529) or Email (pacy@cruisehq.fun).
- GitHub: https://github.com/kryptopacy | X: https://x.com/kryptopacy | LinkedIn: https://www.linkedin.com/in/olamilekanadegoke

Deployed Systems & Architectures Built by Pacy Labs:
1. Wetaego (wetaego.com): Polymorphic Multi-Vertical Commerce OS serving 6 distinct verticals (Dining, Hospitality, Boutique Retail, Wellness, Trades, Studios). Features native W3C WebMCP autonomous agent checkout (8 client tools on document.modelContext), Tego voice/vision scanning (Gemini Multimodal Live API over 16kHz/24kHz WebSockets), and zero-daemon driverless ESC/POS thermal printing over WebUSB/WebSerial.
2. CruiseHQ (cruisehq.fun): City-scale urban social headquarters and event ticketing platform spanning 44 database migrations. Closed-loop $CRUISE microeconomy, Bachs split-at-source ticketing, live audio rooms with AES-256 Spotify AUX proxying, and TCG—a bidirectional voice AI concierge that interprets speech to directly trigger React DOM tool declarations.
3. BAUNTI (baunti.cruisehq.fun): Escrowed prize and bounty protocol turning community budgets into locked competitions. Upfront escrow locking (pool:<challengeId>), 9 provably-fair cryptographic draw algorithms backed by commit-reveal SHA-256 HMAC seeds, The Slice exact-sum pot solver, 3-class asymmetric credit partitioning (earned, purchased, promo), and Logo Rush arcade (3,400+ vector marks).
4. Huiyi (huiyi.cruisehq.fun): Zero-app collaborative event video recap engine. Guests upload raw clips via dynamic QR codes without app downloads or accounts; event organizers direct multi-candidate AI video timelines using natural language prompts via Gemini Multimodal and distributed Modal cloud FFmpeg render workers with Bachs charge-on-success credits.
5. GozAI (gozai-app.web.app): Voice-first emotional & accessibility copilot for people with low vision (2.2B globally). Grounded in ophthalmic research (PLOS ONE, NIH), featuring continuous 1 FPS spatial hazard detection (stairs, spills, obstacles), live prescription medication verification (Timolol, dosage, expiration), sub-500ms Gemini Live conversational voice, and audio-haptic wayfinding. Built with Flutter 3.47 and Google Cloud Run.
6. CaelumOS (caelumos.trade): Institutional quantitative execution OS and black-swan market simulator. 15,000+ M5 historical hours, 12 macro shock replays (FTX collapse, COVID crash, Brexit), Llama 3.2 Vision candlestick pattern recognition, and ICT/SMC multi-engine structure analysis with deterministic drawdown limits.
7. PitchBuddy (pitchbuddy.cruisehq.fun): Operating system for small-sided football venues. Replaces paper slips with graph-preserving team queue balancer keeping friend groups together, automated tournament scheduler, server-authoritative match clocks, hands-free Gemini Live PA announcements, and Bachs ring-fenced prize pots.
8. GEBO (gebo-bsc.vercel.app): Verification-first agent marketplace and scoped authority registry on BNB Smart Chain. Audits 338,000+ ERC-8004 registered identities, probes 14,800+ endpoints with p50/p95 latency logging, models cryptographic blast-radius authority using Altana Keystore (EIP-7702), and executes escrow hires via APEX (ERC-8183).
9. Joebrown Palace Hotel & Suites (joebrownhotel.com): Bespoke enterprise hospitality operating system and guest booking webapp. Atomic book_room_atomically PL/pgSQL lock preventing double-bookings, Express QR check-in pass, digital dining menu with centered order tray modal, 100% zero-cost in-app real-time order tracking via Supabase WebSockets, interactive 2D drag-and-drop table canvas, multi-station KDS (kitchen, bar, grill), and 11-tier RBAC.
10. DreamwiseHUB (dreamwisehub.com): Omnichannel tech retail POS and multi-stage repair CRM. Dual inventory isolation separating retail products from workshop repair parts (screws, IC chips, thermal paste), 7-tier PostgreSQL RLS, multi-stage technician lifecycle (received → diagnosing → waiting_on_parts → completed), floating Gemini AI support intercom, and Nominatim OpenStreetMap auto-geocoding.

Published Agent Skills (skills.sh):
- WebMCP Integration & Auditor (npx skills add Kryptopacy/pacy_webmcp_auditor): W3C WebMCP standard scoring and integration tool.
- Pacy Codebase Auditor (npx skills add kryptopacy/pacy-codebase-auditor): Paranoid pre-ship audit suite with Developer Pay Handoff Simulator and Codebase Doctor.
- Pacy Reverse OTP Builder (npx skills add kryptopacy/pacy-reverse-otp-builder): Zero-cost inbound verification via WhatsApp/Telegram deep links.

Your Persona & Tone:
- Precise, authoritative, hyper-knowledgeable, elegant, and courteous.
- Respond crisply in 1 to 3 short paragraphs.
- If a client wants to hire Pacy Labs or book Olamilekan David Adegoke for an architecture commission or advisory engagement, encourage them to outline their scope or connect directly via WhatsApp (+234 913 026 2529) or email (pacy@cruisehq.fun).
- Mention that Olamilekan monitors this live intercom in real-time and can take over if online.
- When asked technical questions, reference the exact architectures, protocols, and RPCs above with precision.`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API Key is configured, call Gemini
    if (apiKey) {
      try {
        const contents = [];

        // Add conversation history if available
        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-6)) {
            contents.push({
              role: item.role === "assistant" || item.role === "ai" ? "model" : "user",
              parts: [{ text: item.content || item.text || "" }],
            });
          }
        }

        // Add current user message
        contents.push({
          role: "user",
          parts: [{ text: message }],
        });

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: PACY_LABS_SYSTEM_PROMPT }],
              },
              contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const replyText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I received your inquiry. Let me connect you directly with Olamilekan.";

          return NextResponse.json({
            reply: replyText,
            source: "gemini",
          });
        }
      } catch (geminiErr) {
        console.error("Gemini API error, using deterministic knowledge fallback:", geminiErr);
      }
    }

    // Deterministic High-Fidelity Knowledge Fallback
    const lower = message.toLowerCase();
    let fallbackReply = "";

    if (
      lower.includes("rate") ||
      lower.includes("cost") ||
      lower.includes("price") ||
      lower.includes("pricing") ||
      lower.includes("hire") ||
      lower.includes("quote")
    ) {
      fallbackReply = `Pacy Labs accepts enterprise architecture commissions, specialized protocol engineering, and principal systems advisory. Engagements begin with an architectural teardown and executable blueprint. To discuss timelines and project requirements directly, Olamilekan is reachable via WhatsApp at +234 913 026 2529 or email at pacy@cruisehq.fun.`;
    } else if (
      lower.includes("doctor") ||
      lower.includes("optometry") ||
      lower.includes("clinical") ||
      lower.includes("degree") ||
      lower.includes("medical")
    ) {
      fallbackReply = `Olamilekan David Adegoke holds a Doctor of Optometry (O.D.) degree from the University of Ilorin. He translates the clinical diagnostic method—where differential triage, latency tolerance, and zero-defect records are high-stakes imperatives—directly into deterministic distributed state machines and autonomous agent runtimes.`;
    } else if (lower.includes("gozai") || lower.includes("vision") || lower.includes("accessibility")) {
      fallbackReply = `GozAI (gozai-app.web.app) is an emotional & accessibility copilot for 2.2B people with low vision. Built with Flutter 3.47 and Gemini Multimodal Live API on Google Cloud Run, it delivers continuous 1 FPS spatial hazard detection, live prescription drug auditing (Timolol dosage/expiration), and audio-haptic wayfinding grounded in clinical ophthalmic research.`;
    } else if (lower.includes("wetaego") || lower.includes("commerce") || lower.includes("webmcp")) {
      fallbackReply = `Wetaego (wetaego.com) is an agent-native commerce OS serving 6 polymorphic verticals (Dining, Hospitality, Boutique Retail, Wellness, Trades, Studios). It features 8 W3C WebMCP tools on document.modelContext, Gemini Multimodal Live voice/vision scanning, driverless ESC/POS printing over WebUSB/WebSerial, and RFC 9727 machine discovery.`;
    } else if (lower.includes("cruise") || lower.includes("cruisehq")) {
      fallbackReply = `CruiseHQ (cruisehq.fun) is an urban social platform and ticketing microeconomy spanning 44 database migrations. It features a closed-loop $CRUISE ledger, Bachs split checkout, and TCG—a Gemini Live voice AI concierge that manipulates the React DOM in real-time via 20+ tool declarations.`;
    } else if (lower.includes("baunti") || lower.includes("prize") || lower.includes("draw")) {
      fallbackReply = `BAUNTI (baunti.cruisehq.fun) is an upfront-escrowed prize protocol. Sponsors lock pools in Naira, USDT, or $CRUISE credits (pool:<challengeId>). Draws run across 9 provably-fair formats with commit-reveal SHA-256 HMAC seeds, The Slice exact-sum pot solver, 3-class credit economics, and the 3,400+ vector mark Logo Rush arcade.`;
    } else if (lower.includes("gebo") || lower.includes("bnb") || lower.includes("erc-8004")) {
      fallbackReply = `GEBO (gebo-bsc.vercel.app) is a verification-first agent marketplace on BNB Smart Chain. It indexes 338,000+ ERC-8004 identities, probes 14,800+ live endpoints, bounds agent authority using Altana Keystore (EIP-7702), and executes escrow hires via APEX (ERC-8183).`;
    } else if (lower.includes("joebrown") || lower.includes("hotel") || lower.includes("hospitality")) {
      fallbackReply = `Joebrown Palace Hotel & Suites (joebrownhotel.com) is an enterprise hospitality platform featuring atomic room reservation locks (book_room_atomically), Express QR check-in passes, digital dining with centered order tray modal, zero-cost Supabase Realtime tracking, 2D drag-and-drop table canvas, and 11-tier RBAC.`;
    } else if (lower.includes("dreamwise") || lower.includes("repair") || lower.includes("pos")) {
      fallbackReply = `DreamwiseHUB (dreamwisehub.com) is an omnichannel hardware POS and repair CRM commissioned by Dreamwise Computer Enterprise. It features dual retail/workshop inventory isolation, 7-tier PostgreSQL RLS, multi-stage technician lifecycle tracking, and Nominatim OpenStreetMap auto-geocoding.`;
    } else if (lower.includes("human") || lower.includes("talk") || lower.includes("call") || lower.includes("whatsapp") || lower.includes("david") || lower.includes("founder")) {
      fallbackReply = `Olamilekan monitors this intercom live. You can also reach him immediately on WhatsApp at +234 913 026 2529 or email at pacy@cruisehq.fun.`;
    } else {
      fallbackReply = `Welcome to Pacy Labs. I am the autonomous studio intercom. I can answer questions about our 10 production platforms (including Wetaego, GozAI, CruiseHQ, Baunti, GEBO, and Joebrown Hotel), Olamilekan's clinical systems architecture methodology, published Agent Skills, or commission timelines. How can I assist you?`;
    }

    return NextResponse.json({
      reply: fallbackReply,
      source: "knowledge-engine",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
