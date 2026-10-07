import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { verifySessionToken, commitFileToGitHub } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const target = formData.get("target") as string | null; // e.g. "resume" or "hero-image"
    const filename = formData.get("filename") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let destPath = "";
    let relativeGitPath = "";

    if (target === "resume") {
      destPath = path.join(process.cwd(), "public", "olamilekan_adegoke_resume.pdf");
      relativeGitPath = "public/olamilekan_adegoke_resume.pdf";
    } else if (target === "project-image" && filename) {
      const sanitized = filename.replace(/[^a-zA-Z0-9_-]/g, "_");
      destPath = path.join(process.cwd(), "public", "projects", `${sanitized}.png`);
      relativeGitPath = `public/projects/${sanitized}.png`;
    } else {
      return NextResponse.json({ error: "Invalid upload target" }, { status: 400 });
    }

    // Try local write (works in dev)
    try {
      await fs.writeFile(destPath, buffer);
    } catch (e) {
      // expected on read-only serverless platforms like Vercel
    }

    // Commit to GitHub if token configured
    let githubResult = null;
    if (process.env.GITHUB_TOKEN) {
      githubResult = await commitFileToGitHub({
        path: relativeGitPath,
        content: buffer.toString("base64"),
        isBase64: true,
        message: `cms: upload ${target === "resume" ? "updated resume PDF" : `hero image ${filename}`}`,
      });

      if (!githubResult.success) {
        return NextResponse.json(
          { error: "Local write complete, but GitHub upload failed: " + githubResult.error },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      path: `/${relativeGitPath.replace("public/", "")}`,
      committedToGitHub: Boolean(process.env.GITHUB_TOKEN),
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
  }
}
