import { NextResponse } from "next/server";
import { handleSquareWebhook, verifySquareWebhook, type SquareWebhookEvent } from "@/lib/square/webhooks";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-square-hmacsha256-signature") ?? "";
  const valid = verifySquareWebhook(signature, body, request.url);

  if (!valid) {
    return NextResponse.json({ error: "Invalid Square signature." }, { status: 401 });
  }

  let event: SquareWebhookEvent;
  try {
    event = JSON.parse(body) as SquareWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const result = await handleSquareWebhook(event);
  return NextResponse.json({ ok: true, ...result });
}
