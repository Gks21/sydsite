import { NextResponse } from "next/server";
import { getAppointmentServices, getRetailProducts, isSquareApiConfigured } from "@/lib/square";

export const revalidate = 300;

export async function GET() {
  const [services, retail] = await Promise.all([getAppointmentServices(), getRetailProducts()]);
  return NextResponse.json({
    connected: isSquareApiConfigured(),
    services,
    retail,
  });
}
