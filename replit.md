# VirtualLab

VirtualLab is a focused virtual laboratory foundation for Computer Science students to explore practicals, code execution concepts, and faculty assessment workflows.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/virtuallab run dev` — run the VirtualLab web app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/virtuallab/src/pages/virtuallab-pages.tsx` — public, auth, student, and faculty screens
- `artifacts/virtuallab/src/components/virtuallab.tsx` — shared shell, navigation, cards, badges, modal, and feedback components
- `artifacts/virtuallab/src/lib/mock-data.ts` — centralized first-phase mock entities
- `artifacts/virtuallab/src/index.css` — VirtualLab visual tokens, typography, motion, and responsive utilities

## Architecture decisions

- The first phase is frontend-only with mocked authentication and data; execution, visualization, AI viva, and persistence remain intentionally deferred.
- Wouter routes are kept thin and screens are grouped by product surface so later auth/data services can replace mocks without changing navigation.
- Shared app-shell primitives are kept separate from page composition to support future student and faculty feature growth.

## Product

The current foundation includes a landing page, role-based mock login, student dashboard and lab directory, linked-list lab workspace shell, faculty dashboard, and practical management flow.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
