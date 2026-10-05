import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSquareOAuthUrl, isSquareOAuthConfigured } from "@/lib/square/oauth";

export async function GET() {
  if (!isSquareOAuthConfigured()) {
    return NextResponse.json(
      { error: "Set SQUARE_APPLICATION_ID, SQUARE_APPLICATION_SECRET, and SQUARE_OAUTH_REDIRECT_URL." },
      { status: 503 },
    );
  }

  const state = randomBytes(24).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set("square_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/square/oauth",
    maxAge: 600,
  });

  return NextResponse.redirect(getSquareOAuthUrl(state));
}
