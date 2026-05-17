# Gio App

SaaS platform — Next.js 15, TypeScript, deployed on Vercel.

## Stack

| Layer      | Technology            |
|------------|-----------------------|
| Framework  | Next.js 15 (App Router) |
| Language   | TypeScript            |
| Tests      | Vitest                |
| Lint       | ESLint (next config)  |
| CI         | GitHub Actions        |
| Deploy     | Vercel                |

## Local development

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
git clone https://github.com/giovannilima262/gio-app.git
cd gio-app
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available commands

| Command              | Description                  |
|----------------------|------------------------------|
| `npm run dev`        | Start dev server             |
| `npm run build`      | Production build             |
| `npm run start`      | Start production server      |
| `npm run lint`       | Run ESLint                   |
| `npm run type-check` | TypeScript check             |
| `npm test`           | Run tests (single pass)      |
| `npm run test:watch` | Run tests in watch mode      |

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values.

**Rules:**
- Never commit `.env.local` or any file with real secrets.
- Use Vercel's environment variable dashboard for production/preview/development secrets.
- All `NEXT_PUBLIC_*` variables are exposed to the browser — only put non-sensitive config there.

## CI/CD

GitHub Actions runs on every push:

1. **Lint** — `eslint`
2. **Type check** — `tsc --noEmit`
3. **Test** — `vitest run`
4. **Build** — `next build` (runs only if the above pass)

Vercel triggers a deployment on every push to `main`. Preview deployments are created for every branch/PR.

## Project structure

```
src/
  app/              # Next.js App Router pages and layouts
    layout.tsx
    page.tsx
    globals.css
  __tests__/        # Unit and integration tests
.github/
  workflows/
    ci.yml          # GitHub Actions CI
.env.example        # Template for environment variables
```

## Deployment

Deployed automatically via Vercel on push to `main`. The Vercel project is connected to this GitHub repository.

For production environment variables, set them in the [Vercel dashboard](https://vercel.com) — never in code or git.
