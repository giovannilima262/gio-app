import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  uuid,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const emailCategoryEnum = pgEnum("email_category", [
  "action_required",
  "meeting_info",
  "info_only",
  "skip",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const connectedAccounts = pgTable("connected_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  provider: text("provider").notNull().default("google"),
  providerAccountId: text("provider_account_id").notNull(),
  email: text("email").notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  scopes: text("scopes").array(),
  historyId: text("history_id"),
  watchExpiry: timestamp("watch_expiry", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const processedEmails = pgTable("processed_emails", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  connectedAccountId: uuid("connected_account_id")
    .notNull()
    .references(() => connectedAccounts.id, { onDelete: "cascade" }),
  gmailMessageId: text("gmail_message_id").notNull(),
  gmailThreadId: text("gmail_thread_id").notNull(),
  fromEmail: text("from_email").notNull(),
  fromName: text("from_name"),
  subject: text("subject"),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull(),
  processedAt: timestamp("processed_at", { withTimezone: true }).defaultNow().notNull(),
  category: emailCategoryEnum("category").notNull(),
  summary: text("summary").notNull(),
  keyPoints: text("key_points").array(),
  urgency: integer("urgency").default(0),
  sentiment: text("sentiment"),
  modelUsed: text("model_used").default("gemini-2.0-flash"),
  processingMs: integer("processing_ms"),
});

export const draftedReplies = pgTable("drafted_replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  processedEmailId: uuid("processed_email_id")
    .notNull()
    .references(() => processedEmails.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  draftBody: text("draft_body").notNull(),
  tone: text("tone"),
  wasUsed: boolean("was_used").default(false),
  editedBody: text("edited_body"),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const actionItems = pgTable("action_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  processedEmailId: uuid("processed_email_id")
    .notNull()
    .references(() => processedEmails.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date", { withTimezone: true }),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const dailyDigests = pgTable("daily_digests", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: timestamp("date", { withTimezone: true }).notNull(),
  emailCount: integer("email_count").default(0),
  actionItemCount: integer("action_item_count").default(0),
  summary: text("summary"),
  topEmails: jsonb("top_emails"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const writingSamples = pgTable("writing_samples", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  subject: text("subject"),
  body: text("body").notNull(),
  tone: text("tone"),
  context: text("context"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
