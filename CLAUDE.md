# CLAUDE.md — PaymentFlow AI Engineering Manual

This is the permanent operating manual for every Claude Code session on this repository.
Do not treat this as documentation to read — treat it as instructions to follow.

---

## 1. Project Overview

**PaymentFlow AI** is an AI-first enterprise financial platform for cross-border payments,
multi-currency wallets, and intelligent financial operations. Target: 1M users within 36 months,
$10B+ annualized payment volume by year 3.

| Attribute | Value |
|---|---|
| Domain | Fintech — payments, wallets, compliance, fraud detection |
| Architecture | Microservices, event-driven (Kafka), ledger-first design |
| Monorepo tool | pnpm 9 workspaces |
| Language | TypeScript 5.4, strict mode everywhere |
| Node version | >=20 |
| Frontend framework | React 18 (Next.js planned) |
| Backend framework | NestJS (planned) |
| Database | PostgreSQL + Prisma ORM (planned) |
| Cache / queue | Redis + Kafka (planned) |
| CI/CD | GitHub Actions |
| SLA target | 99.99% uptime, <200ms p95 API latency |

**Five user personas drive all product decisions:**
1. Consumer Aisha — personal cross-border transfers
2. Freelancer Carlos — invoicing and multi-currency receipts
3. SME Owner Priya — payroll and vendor payments
4. Enterprise Finance Manager Michael — treasury and compliance
5. Admin Leila — platform operations and fraud review

**Core business rules that must never be violated:**
- Money uses `MonetaryAmount` (`{ amount: string; currency: CurrencyCode }`) — never floating-point.
- All payments require an `idempotencyKey` — duplicate submissions must return the original result, not create a new payment.
- Ledger entries use double-entry bookkeeping — every debit has a matching credit.
- Currency codes follow ISO 4217 as a union type, not a freeform string.
- User status transitions follow: `pending_verification → active → locked → suspended → closed`.
- Wallet status transitions follow: `pending_kyc → active → frozen → closed`.
- Payment status transitions follow: `created → pending_fraud_check → fraud_approved/fraud_declined → processing → completed/failed → refunded/cancelled`.

---

## 2. Architecture

### System Design

The platform follows a microservices, event-driven, ledger-first architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│  Next.js Web App  │  Mobile (future)  │  Admin Portal   │
└────────────┬────────────────┬────────────────┬──────────┘
             │                │                │
┌────────────▼────────────────▼────────────────▼──────────┐
│                    API Gateway                          │
│            Rate limiting, auth, routing                 │
└────────────┬────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────┐
│                  Service Layer                          │
│  Auth │ User │ Wallet │ Payment │ Transaction │ Fraud   │
│  Beneficiary │ Invoice │ Payroll │ Treasury │ Routing   │
│  Analytics │ AI Copilot │ Compliance │ Audit │ Notif.   │
└────────────┬────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────┐
│              Infrastructure Layer                       │
│  PostgreSQL │ Redis │ Kafka │ S3 │ Vault                │
└─────────────────────────────────────────────────────────┘
```

### Key Architecture Principles

1. **Ledger-first**: Write to the immutable ledger before updating any derived state.
2. **Event-driven**: Services communicate through Kafka events, not synchronous calls (except reads).
3. **Domain ownership**: Each service owns its schema. No cross-service table joins.
4. **Safety first**: Every financial operation must be idempotent and atomic.
5. **Observable by default**: Structured logging, distributed tracing, metrics on every service.
6. **Design for failure**: Circuit breakers, retries with backoff, graceful degradation.

### Database Strategy

PostgreSQL with domain-driven schemas (MVP: shared database, service-owned schemas):

| Schema | Owner Service | Purpose |
|---|---|---|
| `identity` | Auth/User Service | Users, sessions, devices, roles, permissions |
| `wallets` | Wallet Service | Wallets, balances, balance history |
| `payments` | Payment Service | Payments, payment methods, beneficiaries |
| `ledger` | Transaction Service | Immutable transaction ledger, double-entry |
| `business` | Invoice/Payroll | Invoices, payroll runs, line items |
| `treasury` | Treasury Service | Float accounts, FX rates, reserves |
| `fraud` | Fraud Service | Rules, signals, reviews |
| `ai` | AI Copilot | Conversations, suggestions, feedback |
| `compliance` | Compliance Service | KYC/AML records, screening results |
| `audit` | Audit Service | Immutable audit trail |
| `notifications` | Notification Service | Templates, delivery log |
| `analytics` | Analytics Service | Aggregations, reports |

### Monorepo Structure

```
paymentflow-ai/
├── apps/                    # Deployable applications (planned)
│   ├── web/                 # Next.js customer-facing app
│   ├── admin/               # Next.js admin portal
│   ├── mobile/              # Mobile app workspace (placeholder)
│   └── docs/                # Documentation site
├── packages/                # Shared libraries (active)
│   ├── ui/                  # React component library
│   ├── shared-types/        # TypeScript type definitions (zero runtime deps)
│   ├── shared-utils/        # Logging, errors, IDs, dates (planned)
│   ├── config/              # Environment parsing and validation (planned)
│   ├── database/            # Prisma client and migration helpers (planned)
│   ├── validation/          # Shared Zod schemas and validators (planned)
│   └── api-sdk/             # Generated API SDKs (placeholder)
├── services/                # NestJS microservices (planned)
│   ├── auth-service/        # M1 authentication and identity
│   ├── api-gateway/         # Routing, rate limiting, security headers
│   ├── payment-service/
│   ├── wallet-service/
│   └── ...
├── design/                  # Design prototypes (to be consolidated)
│   └── components/          # Prototype components — DO NOT add new files here
├── styles/                  # Design tokens and global CSS
├── docs/                    # Architecture, milestones, product specs
│   ├── architecture/        # SDD.md, ERD.md
│   ├── engineering/         # ERB.md
│   ├── milestones/          # M0.md, M1.md, ...
│   └── product/             # PRD.md
├── infra/                   # Infrastructure definitions (planned)
│   ├── docker/              # Dockerfiles and base images
│   ├── kubernetes/          # K8s manifests
│   ├── terraform/           # Infrastructure modules
│   └── helm/                # Helm chart templates
├── scripts/                 # Developer and CI scripts
└── tools/                   # Internal code generation and automation
```

**Important**: `design/components/` contains prototype duplicates of `packages/ui/src/` components.
All new component work goes in `packages/ui/src/`. The `design/` directory will be consolidated.

---

## 3. Current Repository Status

### What exists and works

- **`packages/shared-types/`**: Complete type definitions for Currency, Wallet, Payment, and API
  response envelopes. These are the source of truth for all domain types.
- **`packages/ui/`**: Three production components — `Button`, `Card`, `DataTable` — with proper
  TypeScript types, ARIA accessibility, and named exports.
- **`design/components/`**: Tests for Button (7), Card (4), DataTable (6) — all passing.
  These tests import from `design/components/` not `packages/ui/`.
- **`styles/`**: Design token system with CSS custom properties and JSON token source.
- **`docs/`**: Comprehensive specs for milestones M0 and M1, plus architecture and product docs.
- **`.github/workflows/ci.yml`**: CI pipeline for lint, typecheck, and test.
- **Root config**: tsconfig.json, .eslintrc.js, vitest.config.ts, prettier config.

### What is scaffolded but empty

- `apps/` directory (declared in pnpm-workspace.yaml, no contents)
- `services/` directory (declared in pnpm-workspace.yaml, no contents)

### Known issues that must be fixed

| Priority | Issue | Details |
|---|---|---|
| **CRITICAL** | No `pnpm-lock.yaml` | CI uses `--frozen-lockfile` and will fail. Run `pnpm install` and commit the lockfile. |
| **HIGH** | Component duplication | `design/components/` duplicates `packages/ui/src/` with different export styles. Tests target the `design/` copies only. |
| **HIGH** | `.gitignore` missing secrets patterns | No `.env*`, `*.pem`, `*.key` exclusions. Add before any secrets exist. |
| **HIGH** | ESLint `any` rule not enforced | `.eslintrc.js` sets `no-explicit-any: 'warn'` — must be escalated to `'error'` before M1. Until then, treat this as a policy gap: the lint tool will not catch violations that this document prohibits. |
| **MEDIUM** | ESLint skips `.js` files | `ignorePatterns: ['*.js']` means `app.js` is never linted. |
| **MEDIUM** | React not in root devDependencies | Tests in `design/components/` need React at root level. |
| **MEDIUM** | DataTable type assertion | `packages/ui/src/DataTable.tsx:48` uses `as string` without a runtime check, violating Section 4 type safety rules. Fix when consolidating components. |
| **LOW** | `ignoreDeprecations: "6.0"` in tsconfig | Remove after dropping TypeScript <5.4 workarounds. |
| **LOW** | `app.js` is a prototype IIFE | Should be replaced with proper Next.js app. |

---

## 4. Engineering Rules

These rules are non-negotiable. Every Claude session must follow them.
See also Section 16 (Forbidden Actions) for the definitive list of prohibitions.

### Money handling

Use `MonetaryAmount` (`{ amount: string; currency: CurrencyCode }`) for all monetary values.
Perform arithmetic server-side using a decimal library (decimal.js or dinero.js).
Store amounts as string or integer (cents/minor units) in the database.
See Section 16 item #1 for prohibited patterns.

### Idempotency

- Every mutation endpoint (POST, PUT, PATCH, DELETE) must accept an `Idempotency-Key` header.
- If a request with the same key arrives, return the original response — do not re-execute.
- Store idempotency keys with their responses for at least 24 hours.
- For DELETE endpoints: a repeated DELETE on an already-deleted resource returns 204 (not 404).

### State machines

- User, wallet, and payment statuses are strict state machines (see Section 1 for lifecycles).
- Use a transition function that validates the current state before applying the new state.
- Log every state transition with: previous state, new state, actor (user/system/admin), timestamp.
- Valid transitions are defined in the table below. All others must throw.

```
User:    pending_verification → active → locked → suspended → closed
                                active ↔ locked (reversible)
                                suspended → closed (terminal)

Wallet:  pending_kyc → active → frozen → closed
                       active ↔ frozen (reversible)
                       closed (terminal)

Payment: created → pending_fraud_check → fraud_approved → processing → completed
                                       → fraud_declined (terminal)
                   processing → failed (terminal)
                   completed → refunded
                   created → cancelled (terminal)
```

### Error handling

- All API errors follow RFC 7807 Problem Details format (`ApiError` from shared-types).
- Never expose stack traces, internal IDs, or database errors to clients.
- Use the `errors[]` array for field-level validation errors with `field`, `message`, `code`.
- HTTP status codes must be semantically correct: 400 for validation, 401 for auth,
  403 for authorization, 404 for not found, 409 for conflicts/state violations,
  422 for unprocessable, 429 for rate limiting.

### Type safety

- `strict: true` and `noUncheckedIndexedAccess: true` are enabled — do not weaken them.
- Use `unknown` with type narrowing instead of `any` (see Section 16 #2).
- `as` type assertions require an immediately preceding runtime type check on the same value.
- All exported functions must have explicit return types. Internal/private functions may use inference.
- Prefer `import type` for type-only imports.

### Imports and exports

- Use named exports exclusively (see Section 16 #3 and Decision Log DL-002).
- Barrel files (`index.ts`) must re-export, never contain logic.
- Import order: node builtins → external packages → internal `@paymentflow/*` → relative.

### Database rules (for when services are implemented)

- Every migration must be reversible (provide both `up` and `down`).
- Soft-delete with a `deletedAt` timestamp — never hard delete (see Section 16 #8).
- All tables must have: `id` (UUID v7), `createdAt`, `updatedAt` columns.
- The `ledger` schema is append-only (see Section 16 #9).
- Index every column used in WHERE clauses or JOIN conditions.
- Use row-level security (RLS) for multi-tenant data isolation.
- Use `SELECT FOR UPDATE` or optimistic locking (version column) for concurrent balance mutations.

---

## 5. Coding Standards

### TypeScript

```typescript
// Functions: explicit return types on public APIs
export function calculateFee(amount: MonetaryAmount): MonetaryAmount { ... }

// Prefer readonly for data that shouldn't mutate
interface Config {
  readonly apiUrl: string;
  readonly maxRetries: number;
}

// Discriminated unions over boolean flags
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

// Exhaustive switch with never
function handleStatus(status: PaymentStatus): string {
  switch (status) {
    case 'created': return '...';
    case 'pending_fraud_check': return '...';
    // ... all cases
    default: {
      const _exhaustive: never = status;
      throw new Error(`Unhandled status: ${_exhaustive}`);
    }
  }
}
```

### React components

```typescript
// Named exports only, no React.FC
export function ComponentName({ prop1, prop2, ...rest }: ComponentNameProps) {
  return <div {...rest}>...</div>;
}

// Prop interfaces named {ComponentName}Props, exported separately
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

// Export types separately in barrel file
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

**Component rules:**
- Every interactive element must have ARIA attributes (see DataTable for pattern).
- Use CSS custom properties from `styles/tokens.css` — never hardcode colors or spacing.
- `type="button"` is the default for all `<button>` elements (prevents accidental form submission).
- Pass through `className` and `...rest` props for composition.
- No inline styles. Use CSS classes with BEM-like naming.

### Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Files — components | PascalCase.tsx | `PaymentCard.tsx` |
| Files — utilities | camelCase.ts | `formatCurrency.ts` |
| Files — tests | {name}.test.ts(x) | `Button.test.tsx` |
| Files — types only | camelCase.ts | `payment.ts` |
| Variables / functions | camelCase | `calculateFee` |
| Types / interfaces | PascalCase | `PaymentStatus` |
| Constants | SCREAMING_SNAKE | `MAX_RETRY_COUNT` |
| CSS custom properties | kebab-case | `--color-brand-navy` |
| Database tables | snake_case, plural | `payment_methods` |
| Database columns | snake_case | `created_at` |
| API endpoints | kebab-case, plural | `/api/v1/payment-methods` |
| Environment variables | SCREAMING_SNAKE | `DATABASE_URL` |

### Formatting

- Prettier handles all formatting. Do not manually format.
- Config: single quotes, trailing commas, 100 char print width (check `.prettierrc` if it exists,
  otherwise use project defaults).
- Run `pnpm lint` before every commit.

---

## 6. Security Rules

### Authentication (M1 implementation)

- Password hashing: Argon2id with minimum parameters (memory: 64MB, iterations: 3, parallelism: 4).
- Password policy: minimum 12 characters, check against Have I Been Pwned breached passwords API.
- Account lockout: 5 failed attempts → 15-minute lockout. 10 failed attempts → require email verification.
- JWT access tokens: 15-minute expiry, signed with RS256 (asymmetric). Store in memory only (never localStorage).
- Refresh tokens: 7-day expiry with absolute 30-day lifetime, single-use rotation. Store in httpOnly secure cookie.
- On refresh token reuse detection: revoke the entire token family immediately.
- MFA: TOTP (RFC 6238) required for all admin and business accounts.
- Device fingerprinting: track and challenge unrecognized devices.

### Data protection

- Never log: passwords, tokens, full card numbers, bank account numbers, SSNs, or raw PII.
- Mask in logs: email (`a***@example.com`), phone (`+1***4567`), names (first letter + `***`).
- Encrypt at rest: all PII fields, all financial data, all tokens.
- TLS 1.3 minimum for all connections.
- No secrets in code, config files, or environment variable defaults. Use a vault.

### Input validation

- Validate all input at the API boundary — never trust client data.
- Use Zod schema validation on every endpoint (see Decision Log DL-006).
- Sanitize all string inputs: trim whitespace, check length limits, reject control characters.
- Validate currency codes against the `CurrencyCode` union type.
- Validate monetary amounts: must be non-negative, must parse as valid decimal, must not exceed
  per-transaction and per-currency limits.

### API security

- Rate limiting on all endpoints: 100 req/min general, 5 req/min for auth endpoints.
- CORS: explicit origin allowlist, never `*` in production.
- CSRF protection on all state-changing endpoints.
- All API responses include: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Strict-Transport-Security`, `Content-Security-Policy`.
- No sensitive data in URL query parameters (they appear in logs and browser history).

### Code security

- No `eval()`, `new Function()`, `innerHTML`, or `dangerouslySetInnerHTML`.
- Use parameterized queries exclusively — never concatenate SQL.
- Validate file uploads: type, size, content (not just extension).
- Dependencies: `pnpm audit` must pass with zero high/critical vulnerabilities.
- Run `pnpm audit` in CI. Block merges on new high/critical findings.
- Pin exact dependency versions in services (`--save-exact`). Use ranges in libraries only.
- Review changelogs before major version bumps of security-sensitive packages (auth, crypto, ORM).

---

## 7. Performance Rules

### API performance targets

- p50 latency: <100ms
- p95 latency: <200ms
- p99 latency: <500ms
- Throughput: 10,000 requests/second per service instance

### Database performance

- Every query must use an index. No full table scans in production.
- Use connection pooling (PgBouncer or Prisma connection pool).
- Paginate all list endpoints. Default page size: 20. Max page size: 100.
- Use `SELECT` only the columns you need — never `SELECT *`.
- Cache hot reads in Redis with appropriate TTLs (balances: 5s, config: 5min, static: 1hr).

### Frontend performance

- Bundle size budget: <200KB initial JS (gzipped).
- Lazy-load routes and heavy components.
- Images: WebP format, responsive srcset, lazy loading.
- No blocking requests in the render path.
- Use React.memo only when profiling shows a measurable re-render problem.

### General rules

- No N+1 queries. Use batch loading or JOIN.
- No synchronous I/O on the hot path.
- All external API calls must have timeouts (default: 5 seconds).
- Circuit breakers on all inter-service calls (threshold: 5 failures in 30 seconds).

---

## 8. Observability and Operations

### Structured logging

- Use JSON-structured logs in production (pino or winston with JSON transport).
- Every log entry must include: `timestamp`, `level`, `service`, `traceId`, `message`.
- Log levels: `error` (actionable failures), `warn` (degraded but operational), `info` (business events), `debug` (development only, never in production).
- Log at service boundaries: incoming requests, outgoing responses, external API calls, state transitions.
- Never log at high frequency inside loops or hot paths.

### Distributed tracing

- Propagate `X-Trace-Id` (W3C Trace Context format) through all inter-service calls.
- Every inbound request that lacks a trace ID gets one assigned at the API gateway.
- Include `traceId` in all error responses so users can reference it in support tickets.

### Metrics

- Emit RED metrics (Rate, Errors, Duration) for every endpoint.
- Emit USE metrics (Utilization, Saturation, Errors) for infrastructure (DB pool, Redis, Kafka).
- Track business metrics: payments/min, conversion rates, fraud detection rates.
- Use histograms (not averages) for latency tracking.

### Health checks

- Every service exposes `GET /health` (liveness) and `GET /ready` (readiness).
- Liveness: process is running and not deadlocked.
- Readiness: all dependencies (DB, Redis, Kafka) are reachable and connections are warm.

### API versioning

- URL-based versioning: `/api/v1/payments`, `/api/v2/payments`.
- Support N-1 versions concurrently. Deprecate with `Sunset` header and 6-month notice.
- Breaking changes (field removals, type changes, behavior changes) require a version bump.
- Additive changes (new optional fields, new endpoints) do not require a version bump.

### Environment management

- Four environments: `local`, `development`, `staging`, `production`.
- Environment config via: `.env.local` (local dev, gitignored), environment variables (deployed).
- All environment variables must be validated at startup with Zod schemas (fail fast on misconfiguration).
- Required env file patterns in `.gitignore`: `.env`, `.env.*`, `!.env.example`.
- Provide `.env.example` with dummy values and comments for every required variable.

### Concurrency and locking

- Wallet balance mutations require either optimistic locking (version column + retry) or `SELECT FOR UPDATE`.
- Payment processing must acquire a distributed lock (Redis SETNX with TTL) keyed on `idempotencyKey`.
- Lock TTL should be 2x the expected operation duration. Always release explicitly in `finally`.
- Design for at-least-once delivery from Kafka. Consumers must be idempotent.

### Data retention

- Idempotency keys: 24 hours.
- Access tokens: 15 minutes. Refresh tokens: 30 days (absolute).
- Audit logs: 7 years (regulatory requirement for financial services).
- Soft-deleted records: retain indefinitely or per data retention policy.
- Session data: 30 days after last activity.
- Analytics raw events: 90 days hot (PostgreSQL), archived to cold storage after.

---

## 9. Testing Philosophy

### Test pyramid

```
         ╱╲
        ╱ E2E ╲          Few — critical user journeys only
       ╱────────╲
      ╱Integration╲      Moderate — service boundaries, DB queries
     ╱──────────────╲
    ╱   Unit Tests    ╲   Many — business logic, pure functions
   ╱────────────────────╲
```

### Coverage requirements (configured in vitest.config.ts)

| Metric | Threshold |
|---|---|
| Statements | 80% |
| Branches | 70% |
| Functions | 80% |
| Lines | 80% |

### Testing rules

- **Unit tests**: No I/O, no database, no network. Fast and deterministic.
- **Integration tests**: Real database (use Docker), real Redis. No mocking infrastructure.
- **E2E tests**: Real browser (Playwright). Test critical user journeys.
- Test financial calculations with edge cases: zero amounts, maximum amounts,
  currency conversion rounding, negative scenarios.
- Test state machine transitions: valid transitions succeed, invalid transitions throw.
- Test idempotency: sending the same request twice returns the same result.
- Test concurrency: two simultaneous debits on the same wallet must not overdraw.

### Test file conventions

- Co-locate test files: `Button.tsx` → `Button.test.tsx` in the same directory.
- Use descriptive test names: `it('rejects payment when wallet is frozen')`.
- No test should depend on another test's state or execution order.
- Use factories for test data, not fixtures with magic values.

### What to test for each component type

| Type | Must test |
|---|---|
| UI component | Renders, variants, accessibility (ARIA), event handlers, className pass-through |
| API endpoint | Success, validation errors, auth/authz, idempotency, rate limiting |
| Business logic | Happy path, edge cases, error cases, state transitions |
| Database query | Correct results, pagination, filtering, index usage (EXPLAIN) |

---

## 10. AI Collaboration Rules

### How Claude should work on this project

1. **Read before writing.** Before modifying any file, read it first. Before adding a feature,
   read the relevant milestone doc. Before changing types, read `packages/shared-types/`.

2. **Follow the milestone specs.** The `docs/milestones/` directory contains detailed implementation
   specifications. When implementing a milestone feature, follow the spec precisely — do not
   improvise architecture. If the spec is ambiguous, state the ambiguity and ask.

3. **Small, atomic changes.** Each change should do one thing. A PR should have one purpose.
   If you find a bug while working on a feature, fix it in a separate commit.

4. **Type-first development.** Define types in `packages/shared-types/` before implementing.
   The type definitions are the contract — implementation follows.

5. **Test what you build.** Every new function, component, or endpoint must have tests.
   Run `pnpm test` before declaring any task complete.

6. **Check CI before finishing.** Run `pnpm lint && pnpm typecheck && pnpm test` locally.
   If any check fails, fix it before moving on.

7. **Respect existing patterns.** Match the style of surrounding code. If existing components
   use named exports, use named exports. If existing tests use a certain structure, follow it.

8. **Never bypass safety.** Do not use `@ts-ignore`, `@ts-expect-error` (unless truly temporary
   with a tracking issue), `eslint-disable`, `any`, or `as unknown as X` type escape hatches.

9. **Ask about scope.** If a task seems larger than expected, or requires changes to shared types
   or architecture, flag it before proceeding.

### What Claude should never do without explicit instruction

- Delete files or directories
- Modify `.github/workflows/` CI configuration
- Change `tsconfig.json` compiler options
- Add new root-level dependencies
- Modify `packages/shared-types/` interfaces (these are contracts)
- Create new top-level directories
- Push to any remote branch
- Run destructive database operations

---

## 11. Milestone Workflow

### Milestone structure

The project follows a milestone-based development process. Each milestone is specified in
`docs/milestones/M{n}.md` with detailed implementation requirements.

| Milestone | Scope | Status |
|---|---|---|
| M0 | Foundation — repo, tooling, infra, shared packages, design system | Partially complete |
| M1 | Authentication & Identity — registration, login, MFA, RBAC, sessions | Specified, not started |
| M2+ | Wallets, Payments, Ledger, etc. | Planned |

### How to implement a milestone

1. **Read the entire milestone doc** before writing any code.
2. **Identify dependencies** — check which shared types, services, or infrastructure are needed.
3. **Implement in the order specified** — milestone sections are ordered by dependency.
4. **Check acceptance criteria** — every milestone ends with acceptance tests that must pass.
5. **Handoff checklist** — every milestone ends with a handoff section listing what must be true
   before the next milestone begins.

### Current priorities (M0 completion)

These must be done before starting M1:

1. Run `pnpm install` and commit `pnpm-lock.yaml`
2. Add `.env*`, `*.pem`, `*.key`, `*.cert` to `.gitignore`
3. Consolidate `design/components/` into `packages/ui/` (move tests, delete duplicates)
4. Add React + testing-library to root devDependencies
5. Ensure `pnpm lint && pnpm typecheck && pnpm test` all pass in CI
6. Escalate ESLint `no-explicit-any` from `'warn'` to `'error'`
7. Set up Husky + lint-staged + commitlint (per M0 spec)
8. Set up Docker Compose for PostgreSQL + Redis (per M0 spec)
9. Create `.env.example` with documented variables
10. Initialize Next.js app in `apps/web/`
11. Initialize NestJS service scaffold in `services/auth-service/`

---

## 12. Repository Conventions

### Branch naming

```
feat/M{n}-short-description     # Feature work for a milestone
fix/M{n}-short-description      # Bug fix within a milestone
chore/short-description          # Tooling, config, CI changes
docs/short-description           # Documentation only
refactor/short-description       # Refactoring with no behavior change
```

### Commit messages

Follow Conventional Commits:

```
type(scope): imperative description

types: feat, fix, chore, docs, refactor, test, ci, style, perf
scope: package or service name (ui, shared-types, auth-service, etc.)

Examples:
feat(shared-types): add InvoiceStatus type
fix(ui): correct ARIA label on DataTable empty state
chore(ci): add pnpm-lock.yaml to repository
test(ui): add Button accessibility tests
refactor(ui): consolidate design/components into packages/ui
```

### PR conventions

- Title follows the same commit message format.
- Description must include: what changed, why, how to test.
- Every PR must pass CI (lint, typecheck, test).
- One logical change per PR. Do not bundle unrelated changes.

### File organization within a package

```
packages/ui/src/
├── Button.tsx              # Component implementation
├── Button.test.tsx         # Component tests (co-located)
├── Card.tsx
├── Card.test.tsx
├── DataTable.tsx
├── DataTable.test.tsx
└── index.ts                # Barrel exports only
```

### Package dependency rules

- `packages/shared-types` has ZERO runtime dependencies. Types only.
- `packages/shared-utils` depends on no other `@paymentflow/*` packages.
- `packages/validation` depends on `shared-types` (for type imports) and `zod` (runtime).
- `packages/ui` depends on `shared-types` for type imports only. React is a peer dependency.
- `packages/config` depends on `zod` and `shared-types`.
- `packages/database` depends on `shared-types` and Prisma.
- `apps/*` can depend on any `packages/*`.
- `services/*` can depend on `packages/shared-types`, `packages/shared-utils`, `packages/validation`, `packages/config`, and `packages/database`.
- No circular dependencies. No service-to-service package imports.
- No `apps/*` or `services/*` may import from each other.

---

## 13. Decision Log

Record architecture decisions here. Add new entries when making significant technical choices.

### DL-001: String-based monetary amounts

**Decision**: Use `{ amount: string; currency: CurrencyCode }` for all money values.
**Rationale**: IEEE 754 floating-point cannot represent decimal fractions exactly. `0.1 + 0.2 !== 0.3`
in JavaScript. Financial calculations require exact decimal representation. Strings prevent
accidental floating-point arithmetic. Server-side decimal libraries handle computation.
**Alternatives rejected**: `number` (precision loss), `bigint` (no decimals), integer cents
(requires knowing decimals per currency — JPY has 0, most have 2, some have 3).

### DL-002: Named exports over default exports

**Decision**: All modules use named exports exclusively.
**Rationale**: Named exports enable better tree-shaking, IDE auto-import, and refactoring support.
They prevent naming inconsistencies across import sites. They make barrel files straightforward.
**Migration note**: `design/components/` uses default exports — these must be converted when
consolidating into `packages/ui/`.

### DL-003: RFC 7807 Problem Details for errors

**Decision**: All API errors use the RFC 7807 `ApiError` shape with optional field-level errors.
**Rationale**: Industry standard, machine-readable, extensible. Field-level errors enable rich
client-side form validation feedback. The `type` URI enables error categorization.

### DL-004: Ledger-first write pattern

**Decision**: All financial mutations write to the immutable ledger before updating derived state.
**Rationale**: The ledger is the source of truth. Derived state (balances, reports) can be
reconstructed from the ledger. This pattern ensures auditability and enables event replay.
Inspired by double-entry bookkeeping and event sourcing.

### DL-005: Domain-driven database schemas

**Decision**: Each service owns its schema within a shared PostgreSQL instance (MVP). Schemas
will split into independent databases as the platform scales.
**Rationale**: Shared DB simplifies MVP development while maintaining logical isolation. Schema
ownership enforces the same boundaries that will exist when databases split. Foreign keys only
within a schema — cross-schema references use IDs with application-level consistency.

### DL-006: Zod for runtime validation

**Decision**: Use Zod as the sole runtime validation library across all packages and services.
**Rationale**: Zod schemas infer TypeScript types directly, eliminating drift between runtime
validation and compile-time types. Works in both frontend (form validation) and backend (API
input validation). The `packages/validation/` package will contain shared Zod schemas that
derive from `packages/shared-types/` interfaces. class-validator was considered but requires
decorators and class-based models that conflict with our functional/interface-first approach.

---

## 14. Session Startup Checklist

Run these checks at the beginning of every Claude Code session:

```bash
# 1. Verify you're in the right directory
pwd
# Expected: .../paymentflow-ai

# 2. Check git status
git status
git log --oneline -5

# 3. Check if dependencies are installed
ls pnpm-lock.yaml 2>/dev/null && echo "Lock file exists" || echo "WARNING: No lock file"

# 4. If lock file exists, verify install
pnpm install --frozen-lockfile

# 5. Run the full check suite
pnpm lint
pnpm typecheck
pnpm test
```

**Before making any changes:**
- Read this CLAUDE.md in full if you haven't in this session.
- Read the relevant milestone doc if implementing milestone work.
- Read any files you intend to modify.
- Understand the current branch and any uncommitted changes.

**If any check fails on startup:**
- Do not start new work until the failure is understood.
- If it's a pre-existing failure, note it and ask the user how to proceed.
- If it's a new failure from your changes, fix it immediately.

---

## 15. Session Completion Checklist

Before ending a session or declaring a task complete:

```bash
# 1. Run the full check suite
pnpm lint
pnpm typecheck
pnpm test

# 2. Verify no unintended changes
git diff --stat
git status
```

**Verify before reporting completion:**
- [ ] All CI checks pass (lint, typecheck, test)
- [ ] New code has tests with meaningful assertions
- [ ] No violations of Section 16 (Forbidden Actions) introduced
- [ ] No `console.log` left in production code
- [ ] No hardcoded URLs, secrets, or environment-specific values
- [ ] Commit messages follow Conventional Commits format

---

## 16. Forbidden Actions

The following actions are **strictly prohibited** in every Claude Code session.
Violating these can cause data loss, security breaches, or broken production systems.

### Never do these — no exceptions

1. **Never use floating-point for money.** No `number` type for amounts. No `parseFloat()`.
   No `Math.round()` on financial values. Use `MonetaryAmount` with string amounts.

2. **Never use `any`.** Use `unknown` with type narrowing. If you think you need `any`,
   you need a generic type parameter or a discriminated union instead.

3. **Never use default exports.** Every export must be named. This is enforced by convention
   and will be enforced by lint rule.

4. **Never weaken TypeScript strictness.** Do not set `strict: false`, do not remove
   `noUncheckedIndexedAccess`, do not add `skipLibCheck: false` in package configs.

5. **Never store secrets in code.** No API keys, passwords, tokens, or connection strings
   in source files, config files, or environment variable defaults.

6. **Never use `eval()`, `new Function()`, or `innerHTML`.** These create XSS and
   injection attack vectors.

7. **Never concatenate SQL.** Always use parameterized queries or an ORM.

8. **Never delete production data.** Use soft deletes with `deletedAt` timestamps.

9. **Never modify the ledger.** The `ledger` schema is append-only. No UPDATE or DELETE
   operations on ledger entries.

10. **Never push to `main` without CI passing.** All changes must pass lint, typecheck,
    and test before merging.

11. **Never skip idempotency.** Every mutation endpoint must handle duplicate requests safely.

12. **Never log PII or secrets.** Mask emails, phone numbers, names. Never log passwords,
    tokens, card numbers, or bank details.

13. **Never use `git push --force` on shared branches.** This rewrites history and can
    destroy other contributors' work.

14. **Never import from `design/components/` in production code.** Import from
    `packages/ui` exclusively. The `design/` directory is deprecated for components.

15. **Never add dependencies to `packages/shared-types`.** This package must have zero
    runtime dependencies. It contains only TypeScript type definitions.
