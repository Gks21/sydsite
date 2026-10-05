import { NextResponse } from "next/server";
import { deliverInquiry } from "@/lib/deliver-inquiry";
import { validateInquiry } from "@/lib/inquiries";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Please send a valid inquiry." }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;
  const kind = input.kind === "contact" ? "contact" : "event";
  const result = validateInquiry(
    {
      name: String(input.name ?? ""),
      email: String(input.email ?? ""),
      phone: String(input.phone ?? ""),
      preferredDate: String(input.preferredDate ?? ""),
      eventType: String(input.eventType ?? ""),
      guestCount: String(input.guestCount ?? ""),
      services: Array.isArray(input.services) ? input.services.map(String) : [],
      details: String(input.details ?? ""),
    },
    kind,
  );

  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  try {
    const delivery = await deliverInquiry(result.value);
    return NextResponse.json({ ok: true, ...delivery });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "The inquiry could not be delivered just now." }, { status: 500 });
  }
}
