import { NextRequest, NextResponse } from "next/server";
import { getAdminPassword, createSessionToken, verifySessionToken } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || password !== getAdminPassword()) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = createSessionToken(password);
    const res = NextResponse.json({ success: true });
    
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  const isAuthenticated = verifySessionToken(token);

  return NextResponse.json({ isAuthenticated });
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_session");
  return res;
}
