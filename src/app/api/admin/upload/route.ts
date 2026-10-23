import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { verifyAuthToken } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  const user = await verifyAuthToken(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const target = formData.get("target") as string | null; // e.g. "resume" or "project-image"
    const filename = formData.get("filename") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let destPath = "";

    if (target === "resume") {
      destPath = path.join(process.cwd(), "public", "olamilekan_adegoke_resume.pdf");
    } else if (target === "project-image" && filename) {
      const sanitized = filename.replace(/[^a-zA-Z0-9_-]/g, "_");
      destPath = path.join(process.cwd(), "public", "projects", `${sanitized}.png`);
    } else {
      return NextResponse.json({ error: "Invalid upload target" }, { status: 400 });
    }

    await fs.writeFile(destPath, buffer);

    return NextResponse.json({
      success: true,
      target,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to upload file" }, { status: 500 });
  }
}
