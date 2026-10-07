import { NextResponse } from "next/server";
import { portfolioData } from "@/data/portfolioData";

export const dynamic = "force-dynamic";

// Grounding prompt for Gemini representing Pacy Labs
const PACY_LABS_SYSTEM_PROMPT = `You are the Autonomous Systems AI Intercom for Pacy Labs (pacylabs.xyz).
Pacy Labs is an elite, high-assurance autonomous systems laboratory and design-engineering studio founded by Dr. Olamilekan David Adegoke (OD).

Founding Principal:
- Name: Dr. Olamilekan David Adegoke, MD (often referred to as OD or Pacy).
- Background: Licensed Physician turned Autonomous Systems Architect. He brings clinical triage rigor to distributed systems, mission-critical infrastructure, and deterministic AI agent workflows.
- Contact: Direct WhatsApp (+234 913 026 2529) or Email (pacy@cruisehq.fun).
- Studio Focus: Designing and engineering high-assurance platforms, medical AI, crypto protocols, predictive trading engines, and W3C WebMCP agent runtimes.

Core Systems Built by Pacy Labs:
1. Wetaego: Decentralized Peer-to-Peer Micro-Lending & Collateralized Liquidity Protocol on Solana.
2. CruiseHQ: Distributed Travel Logistics & Fleet Orchestration Engine with multi-tenant sub-second routing.
3. Baunti: AI-Driven Bug Bounty & Vulnerability Triage Agent scanning smart contracts with deterministic validation.
4. Huiyi: Multi-Party Encrypted Clinical Teleconsultation & Telehealth System with end-to-end audit compliance.
5. CaelumOS: Custom Autonomous Operating System & Microkernel Environment for resilient distributed nodes.
6. PitchBuddy: Real-Time Pitch Deck Analysis & Venture Capital Simulation Intelligence.
7. Gebo: High-Throughput Algorithmic Market Making & Order Flow Liquidity Engine.
8. ChronoTrack: Deterministic Medical Shift Scheduler & Hospital Resource Optimizer.
9. VigilantAI: Real-Time Critical Care Anomaly Detection & Clinical Telemetry Monitor.

Standards & Protocols:
- W3C WebMCP (Web Model Context Protocol) agent tools and cognitive pipelines.
- Glassmorphism UI/UX with burgundy/gold studio aesthetics.
- High-assurance TypeScript, Rust, Next.js, and deterministic distributed architectures.

Your Persona & Tone:
- Precise, authoritative, hyper-knowledgeable, elegant, and courteous.
- Respond crisply in 1 to 3 short paragraphs.
- If a client wants to hire Pacy Labs or book Dr. Adegoke for an advisory/architecture engagement, encourage them to state their project scope or connect directly via WhatsApp (+234 913 026 2529) or email (pacy@cruisehq.fun).
- Mention that Dr. Adegoke can also join this very live chat in real-time if he is online!
- If asked technical questions, reference the architecture and systems above with confidence.`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API Key is configured, call Gemini 2.5/Flash
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
            "I received your inquiry. Let me connect you directly with Dr. Adegoke.";

          return NextResponse.json({
            reply: replyText,
            source: "gemini",
          });
        }
      } catch (geminiErr) {
        console.error("Gemini API error, using deterministic knowledge fallback:", geminiErr);
      }
    }

    // Deterministic High-Fidelity Knowledge Fallback (When API Key is not yet set)
    const lower = message.toLowerCase();
    let fallbackReply = "";

    if (lower.includes("rate") || lower.includes("cost") || lower.includes("price") || lower.includes("pricing") || lower.includes("hire") || lower.includes("quote")) {
      fallbackReply = `Pacy Labs engages on architecture commissions, specialized system design, and fractional principal advisory. Engagements typically start with an initial technical audit and systems blueprint. To discuss your exact timeline and budget, Dr. Adegoke is available via WhatsApp (+234 913 026 2529) or direct email at pacy@cruisehq.fun.`;
    } else if (lower.includes("doctor") || lower.includes("medicine") || lower.includes("clinical") || lower.includes("degree") || lower.includes("medical")) {
      fallbackReply = `Yes, Dr. Olamilekan David Adegoke is a licensed Medical Doctor who transitioned into distributed systems and AI architecture. He applies clinical triage rigor—where latency, deterministic failovers, and fault isolation are literally life-or-death matters—to software and autonomous agent engineering.`;
    } else if (lower.includes("wetaego") || lower.includes("solana") || lower.includes("defi") || lower.includes("crypto")) {
      fallbackReply = `Wetaego is one of Pacy Labs' flagship protocols: a peer-to-peer micro-lending and collateralized liquidity protocol built on Solana. It handles automated escrow settlements, sub-second execution, and deterministic risk management.`;
    } else if (lower.includes("cruise") || lower.includes("cruisehq") || lower.includes("logistics")) {
      fallbackReply = `CruiseHQ is Pacy Labs' distributed travel logistics and fleet orchestration engine. It solves high-concurrency multi-tenant scheduling, real-time routing, and state synchronization across distributed fleets.`;
    } else if (lower.includes("baunti") || lower.includes("security") || lower.includes("audit") || lower.includes("triage")) {
      fallbackReply = `Baunti is an AI-driven vulnerability assessment and bug bounty triage platform. It integrates static code analysis with intelligent automated verification to detect smart contract and API vulnerabilities with high precision.`;
    } else if (lower.includes("stack") || lower.includes("tech") || lower.includes("language") || lower.includes("rust") || lower.includes("next")) {
      fallbackReply = `Pacy Labs engineers systems primarily in TypeScript, Rust, Next.js, Tailwind CSS, Supabase, and distributed vector/agent runtimes. All architectures adhere to strict deterministic protocols, W3C WebMCP standards, and sub-100ms UI response targets.`;
    } else if (lower.includes("human") || lower.includes("talk") || lower.includes("call") || lower.includes("whatsapp") || lower.includes("founder") || lower.includes("david")) {
      fallbackReply = `Dr. Adegoke monitors this intercom live. You can also reach him immediately on WhatsApp at +234 913 026 2529 or by email at pacy@cruisehq.fun. If you leave your email or phone right here, we will ping him directly.`;
    } else {
      fallbackReply = `Welcome to Pacy Labs. I am the autonomous studio intercom. I can answer questions about our 9 distributed platforms (including Wetaego, CruiseHQ, and Baunti), Dr. Adegoke's clinical triage architecture approach, or commission timelines. What challenge are you looking to solve?`;
    }

    return NextResponse.json({
      reply: fallbackReply,
      source: "knowledge-engine",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
