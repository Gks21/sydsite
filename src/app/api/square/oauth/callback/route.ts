import { writeFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { exchangeOAuthCode } from "@/lib/square/oauth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const expected = cookieStore.get("square_oauth_state")?.value;

  if (!code || !state || !expected || state !== expected) {
    return NextResponse.json({ error: "Invalid Square OAuth state." }, { status: 400 });
  }

  cookieStore.delete("square_oauth_state");

  try {
    const tokens = await exchangeOAuthCode(code);
    if (process.env.NODE_ENV !== "production") {
      await writeFile(
        path.join(process.cwd(), ".square-token.json"),
        JSON.stringify(
          {
            merchantId: tokens.merchant_id,
            expiresAt: tokens.expires_at,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          },
          null,
          2,
        ),
        { mode: 0o600 },
      );
    }
    return NextResponse.json({
      ok: true,
      merchantId: tokens.merchant_id,
      expiresAt: tokens.expires_at,
      storedLocally: process.env.NODE_ENV !== "production",
      note: "Add SQUARE_ACCESS_TOKEN to the server environment. Access tokens are never sent to the browser.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Square OAuth exchange failed." }, { status: 502 });
  }
}
