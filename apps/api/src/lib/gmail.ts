import { google } from "googleapis";
import { db, connectedAccounts } from "@gio/db";
import { eq } from "drizzle-orm";
import type { gmail_v1 } from "googleapis";
import type { InferSelectModel } from "drizzle-orm";

type ConnectedAccount = InferSelectModel<typeof connectedAccounts>;

export async function getGmailClient(account: ConnectedAccount): Promise<gmail_v1.Gmail> {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: account.accessToken,
    refresh_token: account.refreshToken ?? undefined,
    expiry_date: account.expiresAt?.getTime(),
  });

  // Refresh token if expired and persist the new access token
  oauth2Client.on("tokens", async (tokens) => {
    if (tokens.access_token) {
      await db
        .update(connectedAccounts)
        .set({
          accessToken: tokens.access_token,
          expiresAt: tokens.expiry_date ? new Date(tokens.expiry_date) : undefined,
          updatedAt: new Date(),
        })
        .where(eq(connectedAccounts.id, account.id));
    }
  });

  return google.gmail({ version: "v1", auth: oauth2Client });
}

export interface EmailContent {
  gmailMessageId: string;
  gmailThreadId: string;
  fromEmail: string;
  fromName: string | null;
  subject: string | null;
  bodyText: string;
  receivedAt: Date;
}

export async function fetchEmailContent(
  gmail: gmail_v1.Gmail,
  messageId: string
): Promise<EmailContent | null> {
  const msg = await gmail.users.messages.get({
    userId: "me",
    id: messageId,
    format: "full",
  });

  if (!msg.data) return null;

  const headers = msg.data.payload?.headers ?? [];
  const getHeader = (name: string) =>
    headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value ?? null;

  const fromHeader = getHeader("From") ?? "";
  const fromMatch = fromHeader.match(/^(?:"?([^"<]+)"?\s*)?<?([^>]+)>?$/);
  const fromName = fromMatch?.[1]?.trim() ?? null;
  const fromEmail = fromMatch?.[2]?.trim() ?? fromHeader;

  const subject = getHeader("Subject");
  const dateStr = getHeader("Date");
  const receivedAt = dateStr ? new Date(dateStr) : new Date();

  const bodyText = extractTextBody(msg.data.payload);

  return {
    gmailMessageId: msg.data.id!,
    gmailThreadId: msg.data.threadId!,
    fromEmail,
    fromName,
    subject,
    bodyText,
    receivedAt,
  };
}

function extractTextBody(payload: gmail_v1.Schema$MessagePart | undefined): string {
  if (!payload) return "";

  if (payload.mimeType === "text/plain" && payload.body?.data) {
    return Buffer.from(payload.body.data, "base64").toString("utf-8");
  }

  if (payload.parts) {
    for (const part of payload.parts) {
      const text = extractTextBody(part);
      if (text) return text;
    }
  }

  return "";
}

export async function fetchNewMessages(
  gmail: gmail_v1.Gmail,
  startHistoryId: string
): Promise<string[]> {
  const res = await gmail.users.history.list({
    userId: "me",
    startHistoryId,
    historyTypes: ["messageAdded"],
  });

  const messageIds: string[] = [];
  for (const record of res.data.history ?? []) {
    for (const msg of record.messagesAdded ?? []) {
      if (msg.message?.id) {
        messageIds.push(msg.message.id);
      }
    }
  }
  return messageIds;
}

export async function setupGmailWatch(
  gmail: gmail_v1.Gmail,
  topicName: string
): Promise<{ historyId: string; expiration: string }> {
  const res = await gmail.users.watch({
    userId: "me",
    requestBody: {
      labelIds: ["INBOX"],
      topicName,
    },
  });

  return {
    historyId: res.data.historyId!,
    expiration: res.data.expiration!,
  };
}
