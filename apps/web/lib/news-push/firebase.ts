import { sign } from "node:crypto";

const firebaseProject = "akwedukt-bf41c";
const googleTokenUrl = "https://oauth2.googleapis.com/token";
const messagingScope = "https://www.googleapis.com/auth/firebase.messaging";
const requestTimeoutMs = 8_000;

export type FirebaseNewsTarget =
  | { token: string; topic?: never }
  | { topic: string; token?: never };

type ServiceAccount = {
  type: "service_account";
  project_id: string;
  client_email: string;
  private_key: string;
  private_key_id: string;
};

function readServiceAccount(json: string): ServiceAccount {
  let account: Partial<ServiceAccount> | null;
  try {
    account = JSON.parse(json);
  } catch {
    throw new Error("FCM_SERVICE_ACCOUNT_JSON is not valid JSON");
  }

  if (
    account?.type !== "service_account" ||
    account.project_id !== firebaseProject ||
    typeof account.client_email !== "string" ||
    !account.client_email ||
    typeof account.private_key !== "string" ||
    !account.private_key ||
    typeof account.private_key_id !== "string" ||
    !account.private_key_id
  ) {
    throw new Error("FCM_SERVICE_ACCOUNT_JSON must be a service account key for Akwedukt");
  }

  return {
    type: account.type,
    project_id: account.project_id,
    client_email: account.client_email,
    private_key: account.private_key,
    private_key_id: account.private_key_id,
  };
}

function encodeJwtPart(value: Record<string, string | number>): string {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

async function getAccessToken(account: ServiceAccount): Promise<string> {
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = encodeJwtPart({ alg: "RS256", typ: "JWT", kid: account.private_key_id });
  const claims = encodeJwtPart({
    iss: account.client_email,
    aud: googleTokenUrl,
    scope: messagingScope,
    iat: issuedAt,
    exp: issuedAt + 3600,
  });
  const input = `${header}.${claims}`;
  const signature = sign("RSA-SHA256", Buffer.from(input), account.private_key);

  const response = await fetch(googleTokenUrl, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${input}.${signature.toString("base64url")}`,
    }),
    signal: AbortSignal.timeout(requestTimeoutMs),
  });

  if (!response.ok) {
    throw new Error(`Google OAuth returned HTTP ${response.status}`);
  }

  const credentials: { access_token?: unknown } | null = await response.json().catch(() => null);
  if (typeof credentials?.access_token !== "string" || !credentials.access_token) {
    throw new Error("Google OAuth returned no access token");
  }

  return credentials.access_token;
}

export async function sendFirebaseNewsPush({
  serviceAccountJson,
  target,
  postId,
  title,
}: {
  serviceAccountJson: string;
  target: FirebaseNewsTarget;
  postId: string;
  title: string;
}): Promise<string> {
  const account = readServiceAccount(serviceAccountJson);
  const accessToken = await getAccessToken(account);
  const response = await fetch(
    `https://fcm.googleapis.com/v1/projects/${firebaseProject}/messages:send`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message: {
          ...target,
          data: {
            postId,
            title: "Akwedukt",
            body: Array.from(title.trim()).slice(0, 200).join("") || "Nowy artykuł",
          },
          android: {
            restricted_package_name: "pl.org.akwedukt",
            priority: "high",
          },
        },
      }),
      signal: AbortSignal.timeout(requestTimeoutMs),
    }
  );

  if (!response.ok) {
    throw new Error(`Firebase Cloud Messaging returned HTTP ${response.status}`);
  }

  const message: { name?: unknown } | null = await response.json().catch(() => null);
  if (typeof message?.name !== "string" || !message.name) {
    throw new Error("Firebase Cloud Messaging returned no message ID");
  }

  return message.name;
}
