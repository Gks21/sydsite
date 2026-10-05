import { NextResponse } from "next/server";
import { isSquareApiConfigured } from "@/lib/square";

export function GET() {
  return NextResponse.json({
    ok: true,
    squareApi: isSquareApiConfigured(),
  });
}
