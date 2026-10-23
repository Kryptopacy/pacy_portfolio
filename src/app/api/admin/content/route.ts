import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { verifyAuthToken } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  const user = await verifyAuthToken(token);
  if (!user) {
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
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read content files: " + error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  const user = await verifyAuthToken(token);
  if (!user) {
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

    // Save to local filesystem
    try {
      await fs.writeFile(fullPath, jsonString, "utf8");
    } catch (e: any) {
      return NextResponse.json({ error: "Filesystem write failed: " + e.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      type,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update content" }, { status: 500 });
  }
}
