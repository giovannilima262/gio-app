import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { healthRoutes } from "./routes/health.js";
import { gmailWebhookRoutes } from "./routes/gmail-webhook.js";

const app = Fastify({
  logger: {
    level: process.env.LOG_LEVEL ?? "info",
    transport:
      process.env.NODE_ENV === "development"
        ? { target: "pino-pretty" }
        : undefined,
  },
});

await app.register(cors, {
  origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
});

await app.register(healthRoutes);
await app.register(gmailWebhookRoutes, { prefix: "/webhooks" });

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? "0.0.0.0";

try {
  await app.listen({ port, host });
  app.log.info(`API server running on http://${host}:${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
