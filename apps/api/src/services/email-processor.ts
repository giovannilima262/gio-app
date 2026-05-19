import {
  db,
  processedEmails,
  draftedReplies,
  actionItems,
  connectedAccounts,
} from "@gio/db";
import { eq } from "drizzle-orm";
import { fetchNewMessages, fetchEmailContent } from "../lib/gmail.js";
import { analyzeEmail } from "../lib/gemini.js";
import type { gmail_v1 } from "googleapis";
import type { InferSelectModel } from "drizzle-orm";

type ConnectedAccount = InferSelectModel<typeof connectedAccounts>;

export async function processNewEmail(
  gmail: gmail_v1.Gmail,
  account: ConnectedAccount,
  newHistoryId: string
): Promise<void> {
  const previousHistoryId = account.historyId ?? newHistoryId;

  // Fetch message IDs added since last known history point
  const messageIds = await fetchNewMessages(gmail, previousHistoryId);

  // Advance the stored history ID so next notification doesn't re-process
  await db
    .update(connectedAccounts)
    .set({ historyId: newHistoryId, updatedAt: new Date() })
    .where(eq(connectedAccounts.id, account.id));

  for (const messageId of messageIds) {
    await processMessage(gmail, account, messageId);
  }
}

async function processMessage(
  gmail: gmail_v1.Gmail,
  account: ConnectedAccount,
  messageId: string
): Promise<void> {
  const start = Date.now();

  const email = await fetchEmailContent(gmail, messageId);
  if (!email) return;

  // Skip emails already processed (idempotency)
  const existing = await db
    .select({ id: processedEmails.id })
    .from(processedEmails)
    .where(eq(processedEmails.gmailMessageId, email.gmailMessageId));

  if (existing.length > 0) return;

  const analysis = await analyzeEmail(
    `${email.fromName ? `"${email.fromName}" ` : ""}<${email.fromEmail}>`,
    email.subject,
    email.bodyText
  );

  const processingMs = Date.now() - start;

  // Persist processed email (no raw body stored)
  const [inserted] = await db
    .insert(processedEmails)
    .values({
      userId: account.userId,
      connectedAccountId: account.id,
      gmailMessageId: email.gmailMessageId,
      gmailThreadId: email.gmailThreadId,
      fromEmail: email.fromEmail,
      fromName: email.fromName,
      subject: email.subject,
      receivedAt: email.receivedAt,
      category: analysis.category,
      summary: analysis.summary,
      keyPoints: analysis.keyPoints,
      urgency: analysis.urgency,
      sentiment: analysis.sentiment,
      modelUsed: "gemini-2.0-flash",
      processingMs,
    })
    .returning();

  if (!inserted) return;

  // Persist draft reply if action is required
  if (analysis.draftReply) {
    await db.insert(draftedReplies).values({
      processedEmailId: inserted.id,
      userId: account.userId,
      draftBody: analysis.draftReply,
    });
  }

  // Persist action items
  if (analysis.actionItems.length > 0) {
    await db.insert(actionItems).values(
      analysis.actionItems.map((item) => ({
        processedEmailId: inserted.id,
        userId: account.userId,
        title: item.title,
        description: item.description ?? null,
        dueDate: item.dueDate ? new Date(item.dueDate) : null,
      }))
    );
  }
}
