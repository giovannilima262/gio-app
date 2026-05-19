import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface EmailAnalysis {
  category: "action_required" | "meeting_info" | "info_only" | "skip";
  summary: string;
  keyPoints: string[];
  urgency: number; // 0-10
  sentiment: "positive" | "neutral" | "negative";
  draftReply: string | null;
  actionItems: Array<{
    title: string;
    description: string;
    dueDate: string | null;
  }>;
}

const ANALYSIS_PROMPT = `You are an email chief of staff. Analyze this email and respond with ONLY valid JSON.

Categories:
- action_required: Needs a response or action from the user
- meeting_info: Meeting invite, schedule, or logistics
- info_only: FYI, newsletters, receipts, notifications
- skip: Spam, promotional, irrelevant

JSON schema:
{
  "category": "action_required" | "meeting_info" | "info_only" | "skip",
  "summary": "2-3 sentence summary",
  "keyPoints": ["point1", "point2"],
  "urgency": 0-10,
  "sentiment": "positive" | "neutral" | "negative",
  "draftReply": "draft reply text if category is action_required, else null",
  "actionItems": [
    { "title": "...", "description": "...", "dueDate": "ISO date or null" }
  ]
}`;

export async function analyzeEmail(
  from: string,
  subject: string | null,
  body: string
): Promise<EmailAnalysis> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const emailContext = [
    `From: ${from}`,
    `Subject: ${subject ?? "(no subject)"}`,
    `Body:\n${body.slice(0, 4000)}`,
  ].join("\n");

  const result = await model.generateContent([ANALYSIS_PROMPT, emailContext]);
  const text = result.response.text();

  // Strip markdown code fences if present
  const jsonStr = text.replace(/^```(?:json)?\n?/m, "").replace(/\n?```$/m, "").trim();

  const parsed = JSON.parse(jsonStr) as EmailAnalysis;
  return parsed;
}
