FROM node:20-alpine AS base
WORKDIR /app
COPY package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/db/package.json ./packages/db/

FROM base AS deps
RUN npm install --workspace=apps/api --workspace=packages/db

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY apps/api ./apps/api
COPY packages/db ./packages/db
RUN npm run build --workspace=apps/api

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages/db ./packages/db

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/index.js"]
