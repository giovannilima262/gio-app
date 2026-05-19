import type { FastifyPluginAsync } from "fastify";
import { processNewEmail } from "../services/email-processor.js";
import { getGmailClient } from "../lib/gmail.js";
import { db } from "@gio/db";
import { connectedAccounts } from "@gio/db";
import { eq } from "drizzle-orm";

interface PubSubMessage {
  message: {
    data: string; // base64-encoded JSON
    messageId: string;
    publishTime: string;
  };
  subscription: string;
}

interface GmailPushNotification {
  emailAddress: string;
  historyId: string;
}

export const gmailWebhookRoutes: FastifyPluginAsync = async (app) => {
  // Google Pub/Sub pushes here when a new email arrives
  app.post<{ Body: PubSubMessage }>("/gmail", {
    schema: {
      body: {
        type: "object",
        required: ["message"],
        properties: {
          message: {
            type: "object",
            required: ["data"],
            properties: {
              data: { type: "string" },
              messageId: { type: "string" },
              publishTime: { type: "string" },
            },
          },
          subscription: { type: "string" },
        },
      },
    },
    handler: async (request, reply) => {
      // Always return 204 quickly — Pub/Sub retries on non-2xx
      reply.status(204).send();

      const { message } = request.body;
      let notification: GmailPushNotification;

      try {
        const decoded = Buffer.from(message.data, "base64").toString("utf-8");
        notification = JSON.parse(decoded) as GmailPushNotification;
      } catch (err) {
        request.log.warn({ err }, "Failed to decode Pub/Sub message");
        return;
      }

      app.log.info(
        { emailAddress: notification.emailAddress, historyId: notification.historyId },
        "Gmail push notification received"
      );

      // Find the connected account for this Gmail address
      const accounts = await db
        .select()
        .from(connectedAccounts)
        .where(eq(connectedAccounts.email, notification.emailAddress));

      if (accounts.length === 0) {
        app.log.warn(
          { email: notification.emailAddress },
          "No connected account found for Gmail address"
        );
        return;
      }

      const account = accounts[0];
      if (!account) return;

      try {
        const gmail = await getGmailClient(account);
        await processNewEmail(gmail, account, notification.historyId);
      } catch (err) {
        app.log.error({ err, accountId: account.id }, "Email processing failed");
      }
    },
  });
};
