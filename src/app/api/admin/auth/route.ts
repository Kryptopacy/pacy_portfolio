import { NextRequest, NextResponse } from "next/server";
import { isEmailWhitelisted, verifyAuthToken } from "@/lib/adminAuth";

// Validates session cookie or bearer token
export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  const user = await verifyAuthToken(token);

  if (!user) {
    return NextResponse.json({ isAuthenticated: false }, { status: 200 });
  }

  return NextResponse.json({
    isAuthenticated: true,
    user: {
      email: user.email,
      id: user.id,
    },
  });
}

// Signs in with Supabase Auth or sets session cookie after client sign-in
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accessToken, email } = body;

    if (!accessToken || !email) {
      return NextResponse.json({ error: "Access token and email are required" }, { status: 400 });
    }

    if (!isEmailWhitelisted(email)) {
      return NextResponse.json(
        { error: "Access Denied: Email is not on the admin whitelist." },
        { status: 403 }
      );
    }

    // Verify token validity with Supabase
    const user = await verifyAuthToken(accessToken);
    if (!user || user.email?.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ error: "Invalid or expired session token" }, { status: 401 });
    }

    const res = NextResponse.json({
      success: true,
      user: {
        email: user.email,
        id: user.id,
      },
    });

    res.cookies.set("admin_session", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Authentication failed" }, { status: 500 });
  }
}

// Log out and clear session cookie
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_session");
  return res;
}
