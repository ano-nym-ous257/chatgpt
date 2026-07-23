# Engineering Standards

> This document codifies the engineering standards for PaymentFlow AI. Every contributor —
> human or AI — must follow these standards. Deviations require an ADR with explicit approval.

---

## Document Control

| Field | Value |
|-------|-------|
| **Owner** | Principal Software Engineer |
| **Last Updated** | 2026-07-13 |
| **Version** | 1.0 |
| **Applies To** | All code in the paymentflow-ai monorepo |
| **Enforcement** | CI pipeline + PR review |
| **Source of Truth** | This document and CLAUDE.md |

---

## 1. Git Standards

### Configuration

| Setting | Value | Enforcement |
|---------|-------|-------------|
| Default branch | `main` | GitHub repository settings |
| Merge strategy | Squash and merge (features), merge commit (releases) | GitHub branch protection |
| Branch protection | Require CI pass, require review, no force push | GitHub branch protection |
| Signed commits | Recommended (required for production releases) | Planned |

### Workflow

```
main ← feature branches ← developer commits

1. Create branch from main
2. Develop and commit locally
3. Push branch, open PR
4. CI passes → request review
5. Review approved → squash and merge
6. Delete branch after merge
7. Verify main CI passes
```

### Rules

- Never force push to `main` or any shared branch.
- Never commit directly to `main` — all changes go through PRs.
- Rebase feature branches on `main` before opening a PR (avoid merge commits in feature branches).
- Delete merged branches promptly.
- Keep PRs small — one logical change per PR. If a PR touches more than 10 files or 500 lines,
  consider splitting it.

---

## 2. Branching Standards

### Branch Naming Convention

```
{type}/M{milestone}-{short-description}
{type}/{short-description}
```

| Type | Purpose | Example |
|------|---------|---------|
| `feat/` | New feature | `feat/M1-user-registration` |
| `fix/` | Bug fix | `fix/M1-password-validation` |
| `chore/` | Tooling, config, dependencies | `chore/add-husky` |
| `docs/` | Documentation only | `docs/eos-governance-templates` |
| `refactor/` | Code restructuring, no behavior change | `refactor/consolidate-ui-components` |
| `test/` | Test additions or changes only | `test/wallet-state-machine` |
| `ci/` | CI/CD pipeline changes | `ci/add-coverage-reporting` |
| `perf/` | Performance improvements | `perf/optimize-balance-queries` |
| `security/` | Security fixes or hardening | `security/input-sanitization` |

### Rules

- Branch names use lowercase and hyphens only — no underscores, no spaces.
- Include the milestone number when the work is part of a milestone.
- Keep branch names under 50 characters.
- Branch from `main` unless working on a dependent feature (then branch from the dependency).

---

## 3. Commit Message Standards

### Format: Conventional Commits

```
type(scope): imperative description

[optional body]

[optional footer(s)]
```

### Types

| Type | When to Use | Example |
|------|-------------|---------|
| `feat` | New feature or capability | `feat(auth): add user registration endpoint` |
| `fix` | Bug fix | `fix(wallet): correct balance calculation rounding` |
| `chore` | Maintenance, tooling, config | `chore(deps): update vitest to 1.6.0` |
| `docs` | Documentation only | `docs(architecture): update ERD with audit schema` |
| `refactor` | Code restructuring, no behavior change | `refactor(ui): consolidate component exports` |
| `test` | Test additions or modifications | `test(payment): add idempotency integration tests` |
| `ci` | CI/CD changes | `ci: add coverage reporting to GitHub Actions` |
| `style` | Formatting only (no logic change) | `style: apply prettier to all files` |
| `perf` | Performance improvement | `perf(ledger): add index on created_at column` |

### Scopes

Use the package or service name as the scope:

| Scope | Package/Service |
|-------|----------------|
| `ui` | `packages/ui` |
| `shared-types` | `packages/shared-types` |
| `shared-utils` | `packages/shared-utils` |
| `validation` | `packages/validation` |
| `config` | `packages/config` |
| `database` | `packages/database` |
| `auth` | `services/auth-service` |
| `gateway` | `services/api-gateway` |
| `payment` | `services/payment-service` |
| `wallet` | `services/wallet-service` |
| `web` | `apps/web` |
| `admin` | `apps/admin` |
| `ci` | `.github/workflows/` |
| `deps` | Dependency changes |
| `governance` | `docs/governance/` and EOS documents |
| `architecture` | `docs/architecture/` |

### Rules

- Subject line: imperative mood, lowercase, no period, max 72 characters.
- Body: wrap at 100 characters, explain WHAT and WHY (not HOW).
- Breaking changes: add `BREAKING CHANGE:` footer or `!` after type/scope.
- Reference tickets: `Refs: PF-0042` or `Closes: PF-0042` in the footer.
- AI-assisted commits: add `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` footer.

### Examples

```
feat(auth): add user registration with email verification

Implement POST /api/v1/auth/register endpoint with:
- Argon2id password hashing
- Email verification token generation
- Rate limiting (5 req/min)

Refs: PF-0014

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

```
fix(wallet): prevent negative balance on concurrent withdrawals

Use SELECT FOR UPDATE to acquire row lock before balance mutation.
Previously, two simultaneous withdrawals could both pass the balance
check and cause an overdraw.

Closes: PF-0089
```

---

## 4. Code Review Standards

### Review Responsibilities

**Author responsibilities:**
- PR description explains what, why, and how to test.
- CI passes before requesting review.
- Self-review completed — no debug code, no commented-out blocks, no TODOs.
- PR is scoped to one logical change.

**Reviewer responsibilities:**
- Review within SLA (1 business day standard, 4 hours critical).
- Use the review template (`docs/reviews/REVIEW-TEMPLATE.md`).
- Check against Definition of Done (`docs/governance/DEFINITION-OF-DONE.md`).
- Provide actionable feedback — not just "this is wrong" but "consider X instead because Y."
- Approve only when all requirements are met.

### Review Checklist (Abbreviated)

1. **Correctness** — Does the code do what the ticket requires?
2. **Type safety** — No `any`, no unsafe assertions, strict mode compliant?
3. **Security** — No secrets, no injection vectors, input validated?
4. **Tests** — Coverage thresholds met, edge cases covered?
5. **Performance** — No N+1 queries, timeouts configured, pagination present?
6. **Standards** — Naming conventions, import order, export style?

### Review Outcomes

| Outcome | Meaning | Action |
|---------|---------|--------|
| Approved | All requirements met | Author merges |
| Approved with notes | Minor issues, non-blocking | Author merges, creates follow-up ticket |
| Changes requested | Issues must be fixed | Author fixes, re-requests review |
| Blocked | External dependency unresolved | Wait for dependency, do not merge |

---

## 5. Testing Standards

### Test Pyramid

| Layer | Volume | Scope | Speed | Dependencies |
|-------|--------|-------|-------|-------------|
| Unit | Many | Single function/component | < 10ms each | None (no I/O) |
| Integration | Moderate | Service boundaries, DB queries | < 1s each | Real DB, Redis |
| E2E | Few | Critical user journeys | < 30s each | Full stack |

### File Naming

| Source File | Test File | Location |
|-------------|-----------|----------|
| `Button.tsx` | `Button.test.tsx` | Same directory |
| `calculateFee.ts` | `calculateFee.test.ts` | Same directory |
| `auth.service.ts` | `auth.service.test.ts` | Same directory |
| `auth.e2e.ts` | — | `tests/e2e/` directory |

### Test Structure

```typescript
describe('ComponentOrFunction', () => {
  describe('methodOrBehavior', () => {
    it('does expected thing when given normal input', () => {
      // Arrange → Act → Assert
    });

    it('handles edge case correctly', () => {
      // ...
    });

    it('throws when given invalid input', () => {
      // ...
    });
  });
});
```

### Rules

- Descriptive test names: `it('rejects payment when wallet is frozen')` not `it('test 1')`.
- No test state leakage — each test is independent and idempotent.
- Use factories for test data, not fixtures with magic values.
- Assert behavior, not implementation — test the what, not the how.
- No `test.skip` or `test.only` in merged code.

### Coverage Enforcement

| Metric | Threshold | Configured In |
|--------|-----------|---------------|
| Statements | ≥ 80% | `vitest.config.ts` |
| Branches | ≥ 70% | `vitest.config.ts` |
| Functions | ≥ 80% | `vitest.config.ts` |
| Lines | ≥ 80% | `vitest.config.ts` |

---

## 6. Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Files — components | PascalCase.tsx | `PaymentCard.tsx` |
| Files — utilities | camelCase.ts | `formatCurrency.ts` |
| Files — tests | `{name}.test.ts(x)` | `Button.test.tsx` |
| Files — types only | camelCase.ts | `payment.ts` |
| Files — configs | camelCase or kebab-case | `vitest.config.ts`, `.eslintrc.js` |
| Variables | camelCase | `paymentAmount` |
| Functions | camelCase | `calculateFee` |
| Types / Interfaces | PascalCase | `PaymentStatus` |
| Type props | `{Component}Props` | `ButtonProps` |
| Enums (avoid — use unions) | PascalCase | — |
| Constants | SCREAMING_SNAKE_CASE | `MAX_RETRY_COUNT` |
| CSS custom properties | `--{category}-{name}` | `--color-brand-navy` |
| Database tables | snake_case, plural | `payment_methods` |
| Database columns | snake_case | `created_at` |
| API endpoints | kebab-case, plural | `/api/v1/payment-methods` |
| Environment variables | SCREAMING_SNAKE_CASE | `DATABASE_URL` |
| Git branches | kebab-case | `feat/M1-user-registration` |
| Package names | `@paymentflow/{name}` | `@paymentflow/shared-types` |

### Anti-patterns

| Don't | Do |
|-------|-----|
| `getData()` | `fetchUserProfile()` — be specific |
| `handleClick()` | `submitPaymentForm()` — name the action |
| `processItem()` | `validateInvoiceLineItem()` — name the domain |
| `utils.ts` (grab-bag) | `formatCurrency.ts` — one responsibility |
| `IUser` (Hungarian) | `User` — no prefixes on interfaces |
| `UserEnum` | `UserStatus` (union type) — avoid enums entirely |

---

## 7. Folder Structure Standards

### Monorepo Root

```
paymentflow-ai/
├── apps/                    # Deployable applications
├── packages/                # Shared libraries
├── services/                # Microservices
├── docs/                    # All documentation
│   ├── architecture/        # System design, ERD
│   ├── backlog/             # Engineering backlog
│   ├── decisions/           # Architecture Decision Records
│   ├── engineering/         # Engineering review board
│   ├── governance/          # Standards, DoD, protocols
│   ├── handoff/             # Sprint handoff notes
│   ├── milestones/          # M0, M1, M2, ... specifications
│   ├── product/             # PRD, user personas
│   ├── repository/          # Baseline snapshots
│   ├── reviews/             # Ticket review records
│   └── roadmap/             # Engineering roadmap
├── infra/                   # Infrastructure definitions
├── scripts/                 # Developer and CI scripts
├── tools/                   # Internal automation
├── styles/                  # Design tokens and global CSS
├── CLAUDE.md                # AI engineering manual
├── CHANGELOG.md             # Project changelog
├── README.md                # Project README
├── package.json             # Root package.json
├── pnpm-workspace.yaml      # Workspace configuration
├── tsconfig.json            # Root TypeScript config
├── vitest.config.ts         # Root test configuration
└── .eslintrc.js             # Root lint configuration
```

### Package Internal Structure

```
packages/{name}/
├── src/
│   ├── index.ts             # Barrel exports only
│   ├── {Feature}.tsx        # Component/module
│   ├── {Feature}.test.tsx   # Co-located tests
│   └── types.ts             # Package-internal types
├── package.json
├── tsconfig.json
└── README.md                # Package documentation
```

### Service Internal Structure

```
services/{name}/
├── src/
│   ├── main.ts              # Entry point
│   ├── app.module.ts        # NestJS root module
│   ├── {domain}/
│   │   ├── {domain}.module.ts
│   │   ├── {domain}.controller.ts
│   │   ├── {domain}.service.ts
│   │   ├── {domain}.service.test.ts
│   │   ├── {domain}.repository.ts
│   │   ├── dto/
│   │   │   ├── create-{domain}.dto.ts
│   │   │   └── update-{domain}.dto.ts
│   │   └── entities/
│   │       └── {domain}.entity.ts
│   ├── common/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   └── config/
│       └── {service}.config.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── test/
│   └── {domain}.e2e.test.ts
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

### Rules

- No code in the repository root — use the appropriate workspace directory.
- No new top-level directories without explicit approval and an ADR.
- No files outside of the standard structure without justification.
- `design/components/` is deprecated — all component work goes in `packages/ui/`.

---

## 8. Documentation Standards

### Required Documentation

| Document | Location | When Updated |
|----------|----------|-------------|
| CHANGELOG.md | Root | Every PR (under `[Unreleased]`) |
| README.md | Root + each package/service | When public interfaces change |
| ADR | `docs/decisions/` | When architecture decisions are made |
| API spec | Per service | When endpoints change |
| Milestone spec | `docs/milestones/` | Before implementation begins |
| Review record | `docs/reviews/` | After each ticket review |

### Code Documentation Rules

| Rule | Rationale |
|------|-----------|
| Default to no comments | Well-named identifiers are self-documenting |
| One-line comments maximum | Explain WHY, never WHAT or HOW |
| No multi-paragraph docstrings | Keep it tight |
| No reference to tickets in comments | Tickets belong in PR descriptions and git history |
| No commented-out code | Delete it — git has history |

### CHANGELOG Format

Follow [Keep a Changelog](https://keepachangelog.com/):

```markdown
## [Unreleased]

### Added
- New feature description

### Changed
- Modification description

### Fixed
- Bug fix description

### Removed
- Removed feature description

### Security
- Security fix description
```

---

## 9. Security Standards

### Classification

| Level | Description | Examples |
|-------|-------------|---------|
| Critical | Direct financial or data breach risk | SQL injection, auth bypass, secret exposure |
| High | Significant vulnerability | XSS, CSRF, insecure deserialization |
| Medium | Potential risk with mitigating factors | Missing rate limiting, verbose errors |
| Low | Best practice deviation | Missing security headers, permissive CORS |

### Mandatory Controls

| Control | Standard | Enforcement |
|---------|----------|-------------|
| Password hashing | Argon2id (64MB memory, 3 iterations, parallelism 4) | Code review |
| JWT signing | RS256 (asymmetric), 15-min access tokens | Code review |
| Input validation | Zod schemas at every API boundary | Code review + tests |
| SQL safety | Parameterized queries or ORM only | ESLint rule (planned) |
| Secret management | Environment variables via vault, never in code | `.gitignore` + audit |
| Dependency security | `pnpm audit` zero high/critical | CI pipeline |
| TLS | TLS 1.3 minimum for all connections | Infrastructure config |
| CORS | Explicit origin allowlist, never `*` | Code review |
| Rate limiting | 100 req/min general, 5 req/min auth | Middleware config |
| PII handling | Mask in logs, encrypt at rest | Code review |

### Prohibited Patterns

```typescript
// NEVER — injection vectors
eval(userInput)
new Function(userInput)
element.innerHTML = userInput
sql`SELECT * FROM users WHERE id = ${id}`  // string interpolation in SQL

// NEVER — secret exposure
const API_KEY = 'sk-live-abc123'  // hardcoded secret
console.log({ user })             // PII in logs

// NEVER — weak cryptography
crypto.createHash('md5')          // use SHA-256 minimum
Math.random()                     // use crypto.randomUUID()
```

---

## 10. Dependency Management Standards

### Version Pinning

| Context | Strategy | Example |
|---------|----------|---------|
| Services (`services/*`) | Exact versions | `"express": "4.18.2"` |
| Libraries (`packages/*`) | Caret ranges | `"zod": "^3.22.0"` |
| DevDependencies | Caret ranges | `"vitest": "^1.6.0"` |
| Security-sensitive packages | Exact versions + changelog review | `"jsonwebtoken": "9.0.2"` |

### Adding Dependencies

1. Check if the dependency already exists in the workspace.
2. Verify no high/critical vulnerabilities: `pnpm audit`.
3. Check the package size and dependency tree: `npx packagephobia <name>`.
4. Prefer well-maintained packages (>1000 weekly downloads, recent commits, <5 open security issues).
5. Add to the most specific workspace — not the root unless it's a dev tool.

### Prohibited Dependencies

| Package | Reason | Alternative |
|---------|--------|-------------|
| `moment` | Deprecated, large bundle | `date-fns` or `dayjs` |
| `lodash` (full) | Large bundle | `lodash-es` or native methods |
| `request` | Deprecated | `undici` or native `fetch` |
| `node-fetch` | Redundant in Node 18+ | Native `fetch` |
| Any package with known critical CVE | Security risk | Patched version or alternative |

### Update Cadence

| Type | Frequency | Process |
|------|-----------|---------|
| Patch versions | Weekly | Automated via Dependabot/Renovate |
| Minor versions | Bi-weekly | Review changelog, run tests |
| Major versions | Per sprint | Review changelog, create ticket, test thoroughly |
| Security patches | Immediately | Emergency PR, expedited review |

---

## 11. Release Process Standards

### Versioning

Follow [Semantic Versioning 2.0.0](https://semver.org/):

```
MAJOR.MINOR.PATCH

MAJOR — breaking changes (API contract changes, data model changes)
MINOR — new features (backward-compatible additions)
PATCH — bug fixes (backward-compatible fixes)
```

Pre-release versions: `1.0.0-alpha.1`, `1.0.0-beta.1`, `1.0.0-rc.1`

### Release Stages

| Stage | Criteria | Audience |
|-------|----------|----------|
| Alpha | Core features work, known bugs acceptable | Internal team |
| Beta | Feature-complete, no critical bugs | Internal + select external |
| Release Candidate | Production-ready, final validation | Staging environment |
| Production | All gates passed | Public |

### Release Checklist

1. All tickets in the milestone are `Done` per Definition of Done.
2. CHANGELOG.md updated — `[Unreleased]` section moved to versioned section.
3. Version bumped in all affected `package.json` files.
4. Full CI pipeline passes on the release branch.
5. Security audit clean (`pnpm audit` — zero high/critical).
6. Performance benchmarks meet SLA targets.
7. Documentation complete and accurate.
8. Rollback plan documented and tested.
9. Release notes published.

---

## 12. CI/CD Standards

### Pipeline Stages

```
Install → Lint → Typecheck → Test → Build → Deploy
```

| Stage | Tool | Failure Policy |
|-------|------|----------------|
| Install | `pnpm install --frozen-lockfile` | Block — cannot proceed |
| Lint | `pnpm lint` | Block — zero errors required |
| Typecheck | `pnpm typecheck` | Block — zero errors required |
| Test | `pnpm test --coverage` | Block — coverage thresholds enforced |
| Build | `pnpm build` (per workspace) | Block — build must succeed |
| Deploy (staging) | Automated on merge to `main` | Block on failure |
| Deploy (production) | Manual trigger with approval | Requires release checklist |

### Rules

- CI must pass before a PR can be reviewed.
- CI must pass before a PR can be merged.
- Failed CI on `main` is treated as a P0 incident — fix within 1 hour or revert.
- CI configuration changes require review (see CLAUDE.md §10).
- Cache `node_modules` and `.turbo` directories for performance.
- Run lint, typecheck, and test in parallel where possible.

### Environment Variables in CI

- Use GitHub Actions secrets for sensitive values.
- Use `.env.example` as the reference for required variables.
- Never echo or log environment variables in CI output.
- Use OIDC for cloud provider authentication where possible.

---

## Appendix A: Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│            PaymentFlow AI — Quick Reference              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Money:     MonetaryAmount { amount: string; currency }  │
│  Exports:   Named only — never default                   │
│  Types:     No any — use unknown + narrowing             │
│  Errors:    RFC 7807 ApiError format                     │
│  Tests:     80/70/80/80 coverage thresholds              │
│  Commits:   type(scope): imperative description          │
│  Branches:  feat/M1-short-description                    │
│  Reviews:   Use REVIEW-TEMPLATE.md checklist             │
│  Security:  No eval, no innerHTML, no SQL concat         │
│  Secrets:   Never in code — use environment variables    │
│  Logs:      Structured JSON, mask PII, include traceId   │
│  Database:  Soft delete only, append-only ledger         │
│                                                          │
│  Before commit:  pnpm lint && pnpm typecheck && pnpm test│
│  Before PR:      Check Definition of Done                │
│  Before merge:   CI green + review approved              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-13 | Engineering | Initial Engineering Standards |
