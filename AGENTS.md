<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop

Recruiting/hiring web app built on Next.js 16 (App Router) + better-auth + MongoDB. No `src/` dir, no tests, no CI yet.

## Commands

- Dev: `npm run dev` (Turbopack). Build: `npm run build`. Lint: `npm run lint`.
- No `typecheck` script exists — verify types with `npx tsc --noEmit` before claiming a change is safe.
- No test suite. Verification = lint + `tsc --noEmit` + (for auth changes) hitting `/api/auth/*` against a running dev server.

## Stack quirks

- `next.config.ts` enables `cacheComponents: true` (async dynamic APIs must be awaited; `"use cache"` is available) and loads Tailwind v4 via a Turbopack rule — there is **no** `tailwind.config` and no PostCSS; theme lives in `app/globals.css` (`@theme`/CSS variables).
- Path alias `@/*` maps to the repo root (e.g. `@/components/ui/button`, `@/lib/auth`).
- shadcn UI (`components.json`): style `base-nova`, built on `@base-ui/react` primitives (not Radix), lucide icons. Add components with `npx shadcn@latest add <name>`; existing ones live in `components/ui/`.

## Auth (better-auth) — three wired pieces

- Server: `lib/auth.ts` — better-auth with `@better-auth/mongo-adapter`. Connection string is **hardcoded** to `mongodb://localhost:27017`, database `hireloopdb` — a local MongoDB must be running or every `/api/auth/*` request fails. Email/password enabled; Google OAuth provider expects `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.
- Client: `lib/auth-client.ts` (`better-auth/react`).
- Routes: `app/api/auth/[...all]/route.ts` (`toNextJsHandler`) serves all auth endpoints — don't create per-endpoint auth routes.

## Env / secrets

- `.env` holds `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL` and is **committed to git** (tracked before `.gitignore` added `.env*`, so ignore rules don't shield it). Don't add real secrets to it; don't rely on it being ignored.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` are referenced in `lib/auth.ts` via `as string` but are currently absent from `.env` — the Google provider config is effectively `undefined` until they're added.
