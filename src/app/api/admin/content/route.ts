import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { verifySessionToken, commitFileToGitHub } from "@/lib/adminAuth";

// Local filesystem fallback when running in local development mode
const isLocal = process.env.NODE_ENV !== "production" || !process.env.GITHUB_TOKEN;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contentDir = path.join(process.cwd(), "src", "content");
    const [projectsRaw, profileRaw, skillsRaw, agentSkillsRaw] = await Promise.all([
      fs.readFile(path.join(contentDir, "projects.json"), "utf8"),
      fs.readFile(path.join(contentDir, "profile.json"), "utf8"),
      fs.readFile(path.join(contentDir, "skills-matrix.json"), "utf8"),
      fs.readFile(path.join(contentDir, "agent-skills.json"), "utf8"),
    ]);

    return NextResponse.json({
      projects: JSON.parse(projectsRaw),
      profile: JSON.parse(profileRaw),
      skillsMatrix: JSON.parse(skillsRaw),
      agentSkills: JSON.parse(agentSkillsRaw),
      isGitHubConfigured: Boolean(process.env.GITHUB_TOKEN),
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read content files: " + error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type, data } = await req.json();

    const allowedTypes = ["projects", "profile", "skills-matrix", "agent-skills"];
    if (!allowedTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const jsonString = JSON.stringify(data, null, 2) + "\n";
    const relativePath = `src/content/${type}.json`;
    const fullPath = path.join(process.cwd(), relativePath);

    // Always update local filesystem first (for local dev server immediate reflection)
    try {
      await fs.writeFile(fullPath, jsonString, "utf8");
    } catch (e) {
      // In read-only serverless environment (Vercel), local write will fail, which is expected
    }

    // If GitHub token is configured, commit and push to repo so Vercel auto-deploys
    let githubResult = null;
    if (process.env.GITHUB_TOKEN) {
      githubResult = await commitFileToGitHub({
        path: relativePath,
        content: jsonString,
        message: `cms: update ${type} via admin dashboard`,
      });

      if (!githubResult.success) {
        return NextResponse.json(
          { error: "Local write ok, but GitHub commit failed: " + githubResult.error },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      committedToGitHub: Boolean(process.env.GITHUB_TOKEN),
      sha: githubResult?.sha,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Save failed: " + error.message }, { status: 500 });
  }
}
