import { createClient } from "@supabase/supabase-js";

export function getAdminEmails(): string[] {
  const envEmails = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "pacy@cruisehq.fun";
  return envEmails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailWhitelisted(email: string | null | undefined): boolean {
  if (!email) return false;
  const whitelisted = getAdminEmails();
  return whitelisted.includes(email.trim().toLowerCase());
}

/**
 * Verifies a Supabase JWT access token using the Supabase client
 */
export async function verifyAuthToken(token: string | undefined): Promise<{ id: string; email?: string } | null> {
  if (!token) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing during token verification.");
    return null;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return null;
    }

    if (!isEmailWhitelisted(user.email)) {
      console.warn(`Blocked non-whitelisted email: ${user.email}`);
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  } catch (err) {
    console.error("Token verification exception:", err);
    return null;
  }
}
