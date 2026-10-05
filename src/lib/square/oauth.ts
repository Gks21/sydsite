import { serverConfig } from "@/lib/server-config";

const AUTH_URL = "https://connect.squareup.com/oauth2/authorize";
const TOKEN_URL = "https://connect.squareup.com/oauth2/token";
const SANDBOX_AUTH_URL = "https://connect.squareupsandbox.com/oauth2/authorize";
const SANDBOX_TOKEN_URL = "https://connect.squareupsandbox.com/oauth2/token";

export const SQUARE_OAUTH_SCOPES = [
  "APPOINTMENTS_READ",
  "APPOINTMENTS_WRITE",
  "APPOINTMENTS_BUSINESS_SETTINGS_READ",
  "CUSTOMERS_READ",
  "CUSTOMERS_WRITE",
  "ITEMS_READ",
  "INVOICES_READ",
  "INVOICES_WRITE",
  "ORDERS_READ",
  "ORDERS_WRITE",
  "PAYMENTS_READ",
  "MERCHANT_PROFILE_READ",
  "EMPLOYEES_READ",
].join(" ");

export function isSquareOAuthConfigured() {
  return Boolean(
    serverConfig.square.applicationId &&
      serverConfig.square.applicationSecret &&
      serverConfig.square.oauthRedirectUrl,
  );
}

export function getSquareOAuthUrl(state: string) {
  if (!isSquareOAuthConfigured()) {
    throw new Error("Square OAuth is not configured.");
  }

  const sandbox = serverConfig.square.environment === "sandbox";
  const url = new URL(sandbox ? SANDBOX_AUTH_URL : AUTH_URL);
  url.searchParams.set("client_id", serverConfig.square.applicationId);
  url.searchParams.set("scope", SQUARE_OAUTH_SCOPES);
  url.searchParams.set("session", "false");
  url.searchParams.set("state", state);
  url.searchParams.set("redirect_uri", serverConfig.square.oauthRedirectUrl);
  return url.toString();
}

export async function exchangeOAuthCode(code: string) {
  if (!isSquareOAuthConfigured()) {
    throw new Error("Square OAuth is not configured.");
  }

  const sandbox = serverConfig.square.environment === "sandbox";
  const response = await fetch(sandbox ? SANDBOX_TOKEN_URL : TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Square-Version": "2025-01-23" },
    body: JSON.stringify({
      client_id: serverConfig.square.applicationId,
      client_secret: serverConfig.square.applicationSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: serverConfig.square.oauthRedirectUrl,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Square OAuth token exchange failed: ${detail}`);
  }

  return (await response.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_at?: string;
    merchant_id?: string;
  };
}
