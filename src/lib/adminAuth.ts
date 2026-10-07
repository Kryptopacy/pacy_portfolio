import crypto from "node:crypto";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "pacy2026";
}

export function createSessionToken(password: string): string {
  const secret = process.env.SESSION_SECRET || "pacy-labs-secret-key-2026-default";
  return crypto.createHmac("sha256", secret).update(`admin:${password}`).digest("hex");
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const expected = createSessionToken(getAdminPassword());
  return token === expected;
}

export interface GitHubCommitPayload {
  path: string;
  content: string; // utf-8 or base64
  message: string;
  isBase64?: boolean;
}

/**
 * Commits a file to GitHub via the REST API or local filesystem fallback.
 * If GITHUB_TOKEN is set, writes directly to GitHub repo Kryptopacy/pacy_portfolio
 * which triggers Vercel to rebuild and deploy automatically.
 */
export async function commitFileToGitHub({
  path,
  content,
  message,
  isBase64 = false,
}: GitHubCommitPayload): Promise<{ success: boolean; sha?: string; error?: string }> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || "Kryptopacy/pacy_portfolio";
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token) {
    return {
      success: false,
      error: "GITHUB_TOKEN is not configured in environment variables.",
    };
  }

  try {
    const fileUrl = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`;
    
    // Check if file already exists to get its current sha
    let currentSha: string | undefined;
    const getRes = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "PacyLabs-CMS",
      },
    });

    if (getRes.ok) {
      const existing = await getRes.json();
      currentSha = existing.sha;
    }

    const base64Content = isBase64
      ? content
      : Buffer.from(content, "utf8").toString("base64");

    const putRes = await fetch(fileUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "PacyLabs-CMS",
      },
      body: JSON.stringify({
        message,
        content: base64Content,
        branch,
        ...(currentSha ? { sha: currentSha } : {}),
      }),
    });

    if (!putRes.ok) {
      const err = await putRes.json();
      return { success: false, error: err.message || "Failed to commit to GitHub" };
    }

    const data = await putRes.json();
    return { success: true, sha: data.content?.sha };
  } catch (err: any) {
    return { success: false, error: err.message || "Network error committing to GitHub" };
  }
}
