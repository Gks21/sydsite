import { readFileSync } from "fs";
import { SquareClient, SquareEnvironment } from "square";
import { serverConfig } from "@/lib/server-config";

function tokenFromLocalFile() {
  if (process.env.NODE_ENV === "production") return "";
  try {
    const raw = readFileSync(".square-token.json", "utf8");
    const parsed = JSON.parse(raw) as { accessToken?: string };
    return parsed.accessToken ?? "";
  } catch {
    return "";
  }
}

let cached: SquareClient | null | undefined;

export function getSquareClient(): SquareClient | null {
  if (cached !== undefined) return cached;

  const token = serverConfig.square.accessToken || tokenFromLocalFile();
  if (!token) {
    cached = null;
    return cached;
  }

  cached = new SquareClient({
    token,
    environment:
      serverConfig.square.environment === "sandbox"
        ? SquareEnvironment.Sandbox
        : SquareEnvironment.Production,
  });

  return cached;
}

export function isSquareApiConfigured(): boolean {
  return Boolean(serverConfig.square.accessToken || tokenFromLocalFile());
}

export function resetSquareClientCache() {
  cached = undefined;
}
