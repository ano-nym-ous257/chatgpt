# Application Architecture

## Directory Structure

```
apps/web/src/
├── app/            — Next.js App Router pages and layouts
├── components/     — Shared UI components local to this application
├── features/       — Domain-organized feature modules
├── hooks/          — Shared custom React hooks
├── lib/            — Framework configuration and third-party wrappers
├── providers/      — React context providers (composed at root)
├── services/       — API client layers and service abstractions
├── styles/         — Application-level CSS and token overrides
├── types/          — Application-wide TypeScript type definitions
└── utils/          — Pure utility functions
```

## Feature Boundaries

Each directory under `features/` represents a product domain:

| Feature | Responsibility |
|---------|---------------|
| `auth` | Authentication flows, session lifecycle, MFA |
| `dashboard` | Authenticated overview, recent activity, quick actions |
| `wallets` | Multi-currency wallet display and management |
| `payments` | Payment initiation, tracking, and history |
| `transactions` | Immutable ledger read access and reporting |
| `settings` | Profile, security, and preference management |

Rules:
- Features do not import from other features directly.
- Cross-feature communication happens through providers or shared services.
- Each feature owns its own components, hooks, and types internally.
- Shared code goes in the top-level `components/`, `hooks/`, `types/`, or `utils/`.

## Provider Architecture

Providers compose at the application root in `src/providers/index.tsx`:

```
ThemeProvider
  └── QueryProvider
        └── AuthProvider
              └── {children}
```

- **ThemeProvider** — Design token injection and theme switching.
- **QueryProvider** — Data fetching layer configuration (e.g., TanStack Query).
- **AuthProvider** — Authentication state and session context.

All providers are currently structural placeholders with no business logic.
They render children unchanged until their respective features are implemented.

## Import Conventions

Path aliases configured via `tsconfig.json`:

```
@/components  →  src/components/
@/features    →  src/features/
@/hooks       →  src/hooks/
@/lib         →  src/lib/
@/providers   →  src/providers/
@/services    →  src/services/
@/types       →  src/types/
@/utils       →  src/utils/
```

Rules:
- Always use `@/` aliases for cross-directory imports.
- Relative imports (`./`, `../`) only within the same feature or directory.
- Workspace packages use their package name: `import { Button } from '@paymentflow/ui'`.

## Package Dependencies

```
@paymentflow/web
├── @paymentflow/ui (workspace:*)  — Shared component library
├── next                           — Framework
├── react / react-dom              — Runtime
└── (future: @tanstack/react-query, etc.)
```
