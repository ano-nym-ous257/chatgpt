# Engineering Governance and Development Standards Manual

**PaymentFlow AI** — Official engineering handbook for human engineers and AI coding assistants.
**Purpose**: Establish mandatory standards and procedures that every commit, pull request, API, UI component, database migration, AI prompt, infrastructure change, and deployment must follow once implementation begins. This manual is the governing standard for engineering quality, security, and operational readiness; approved architecture and product decisions remain authoritative within their own scopes.

---

## Contents

1. Engineering Philosophy
2. Coding Standards
3. File Organization
4. Component Standards
5. Design System Rules
6. API Development Rules
7. Database Rules
8. AI Development Standards
9. Git Workflow
10. Pull Request Standards
11. Code Review Standards
12. Testing Standards
13. Security Standards
14. Performance Standards
15. Observability Standards
16. Documentation Standards
17. Architecture Decision Records
18. Contribution Guide
19. AI Coding Agent Rules
20. Definition of Excellence and Final Quality Checklist

---

### 1 Engineering Philosophy

**Mission**
Deliver a secure, auditable, scalable, and delightful AI powered fintech platform that preserves financial integrity and regulatory compliance while enabling rapid innovation.

**Engineering Principles**

- **Maintainability** — Code must be readable, modular, and documented so future engineers can change it safely.
- **Scalability** — Design for horizontal scale, partitioning, and graceful degradation.
- **Security First** — Default to the most secure option; assume hostile actors.
- **Consistency** — Shared patterns, naming, and conventions across the monorepo.
- **Performance** — Optimize for predictable latency and throughput.
- **Accessibility** — All user interfaces meet accessibility standards.
- **Developer Experience** — Fast local feedback loops, clear docs, and automation.
- **AI First** — Use AI assistants to accelerate work while enforcing governance and human review.

**Clean Code Philosophy**
- Small functions, single responsibility, expressive names, and minimal side effects.
- Prefer explicitness over cleverness.
- Tests accompany behavior, not implementation.

**Security First**
- Least privilege, defense in depth, encryption in transit and at rest, secrets in Vault, and mandatory threat modeling for new features.

**AI First**
- AI tools are accelerators, not decision makers. All AI generated code must be reviewed by a human and pass the same tests and security checks as human authored code.

**Developer Experience**
- Local dev scripts, reproducible environments, and clear onboarding. CI provides fast feedback and enforces standards.

**Performance by Default**
- Measure early. Use profiling and load tests before production rollout.

**Accessibility by Default**
- UI components must be accessible by keyboard and screen readers and meet WCAG AA.

---

### 2 Coding Standards

This section defines language specific rules and cross cutting practices.

#### 2.1 TypeScript

**Naming Conventions**
- **Files**: `kebab-case.ts` for modules; `PascalCase.tsx` for React components.
- **Types and Interfaces**: `PascalCase` with `I` prefix avoided. Example `UserProfile`.
- **Constants**: `UPPER_SNAKE_CASE`.
- **Variables and functions**: `camelCase`.

**Folder Organization**
- Feature first in apps: `features/wallet/components`, `features/wallet/hooks`.
- Domain modules in services: `src/modules/wallet`.

**Function Structure**
- Small, pure where possible.
- Async functions return `Promise<T>` and use `try/catch` at boundary layers.

**Error Handling**
- Throw typed errors with `code` and `metadata`.
- Use centralized error mapper to convert to RFC7807 responses.

**Logging**
- Use structured JSON logs with `requestId`, `userId`, `tenantId`.
- No PII in logs.

**Documentation**
- JSDoc for public functions and exported types.
- Inline examples for complex logic.

**Code Example**
```ts
export type WalletBalance = {
  walletId: string;
  currency: string;
  available: string;
};

export async function getBalance(walletId: string): Promise<WalletBalance> {
  try {
    const row = await db.query('SELECT ...', [walletId]);
    return mapRowToBalance(row);
  } catch (err) {
    logger.error({ err, walletId }, 'getBalance failed');
    throw new ServiceError('BALANCE_FETCH_FAILED', { walletId });
  }
}
```

**Anti Patterns**
- `any` usage without justification.
- Large monolithic files.
- Silent catch blocks.

**Best Practices**
- Strict TypeScript settings: `noImplicitAny`, `strictNullChecks`.
- Prefer `readonly` and `as const`.

#### 2.2 React

**Naming**
- Components `PascalCase`.
- Hooks `useSomething`.

**Folder**
- `components/atoms`, `components/molecules`, `components/organisms`, `pages`.

**Structure**
- Presentational components separated from container logic.
- Use functional components and hooks.

**Error Handling**
- Use Error Boundaries for top level UI.
- Show user friendly messages and log details.

**Accessibility**
- Use semantic HTML, ARIA attributes only when necessary.
- Keyboard focus management for modals and dialogs.

**Example**
```tsx
export function Button({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button className="btn" onClick={onClick}>{children}</button>;
}
```

**Anti Patterns**
- Direct DOM manipulation.
- Inline styles for complex layouts.

#### 2.3 Next.js

**Routing**
- File based routing in `pages` or `app` directory.
- API routes in `pages/api` for serverless endpoints; prefer backend services for heavy logic.

**Data Fetching**
- Use `getServerSideProps` for authenticated pages requiring fresh data.
- Use React Query for client side data.

**Performance**
- Use `next/image` for optimized images.
- Avoid blocking SSR for non critical data.

#### 2.4 NestJS

**Structure**
- `modules` per domain, each with `controllers`, `services`, `repositories`.
- DTOs in `dtos` folder, validators with `class-validator`.

**Dependency Injection**
- Use NestJS DI for services and clients.

**Error Handling**
- Use exception filters to map to RFC7807.

**Logging**
- Use centralized logger with correlation id.

#### 2.5 Python and FastAPI

**Naming**
- Modules `snake_case`, classes `PascalCase`.

**Structure**
- `app/routers`, `app/services`, `app/models`, `app/schemas`.

**Validation**
- Pydantic models for request/response validation.

**Error Handling**
- Raise HTTPException with status and detail.

**Logging**
- Structured logs with `structlog` or `logging` configured for JSON.

#### 2.6 Prisma

**Models**
- Use explicit `@@index` and `@@unique`.
- Use `Decimal` for monetary fields.

**Migrations**
- Use migration files in `packages/database/migrations`.
- Review migrations for destructive changes.

**Transactions**
- Use `prisma.$transaction` for atomic operations.

#### 2.7 SQL

**Naming**
- `snake_case` for tables and columns.
- Table names plural: `wallet_accounts`.

**Queries**
- Parameterized queries only.
- Avoid SELECT *.

**Indexes**
- Add indexes for frequent filters and joins.
- Use BRIN for time series where appropriate.

**Anti Patterns**
- Long running transactions holding locks.
- Unbounded result sets.

#### 2.8 Infrastructure as Code

**Terraform**
- Modules for reusable resources.
- State in secure backend with locking.
- Plan and apply in CI with approvals for production.

**Kubernetes**
- Use resource requests and limits.
- Liveness and readiness probes mandatory.

---

### 3 File Organization

**Monorepo top level**
```
apps/
services/
packages/
infra/
docs/
scripts/
```

**Frontend app structure**
```
apps/web/src/
  pages/
  app/
  features/
  components/
  hooks/
  styles/
  utils/
  services/
  types/
  tests/
```

**Backend service structure**
```
services/<service-name>/src/
  modules/
    <domain>/
      controllers/
      services/
      repositories/
      dtos/
      schemas/
      tests/
  common/
  main.ts
  config/
  migrations/
```

**Shared packages**
- `packages/ui` — design system
- `packages/shared-types` — OpenAPI generated types
- `packages/shared-utils` — logging, errors, http client
- `packages/database` — Prisma schemas and migrations

**Where files belong**
- **Components**: `apps/*/src/components`
- **Hooks**: `apps/*/src/hooks`
- **Pages**: `apps/*/src/pages`
- **Layouts**: `apps/*/src/layouts`
- **Services**: `services/*/src/modules/*/services`
- **Repositories**: `services/*/src/modules/*/repositories`
- **DTOs**: `services/*/src/modules/*/dtos`
- **Schemas and Validators**: `services/*/src/modules/*/schemas`
- **Utilities**: `packages/shared-utils`
- **Constants and Enums**: `packages/shared-types`
- **Tests**: colocated with code as `*.spec.ts` or `*.test.ts`
- **Assets**: `apps/*/public` or `apps/*/assets`
- **Documentation**: `docs/` and `services/*/README.md`

---

### 4 Component Standards

**React Components**
- **Single responsibility**: one component per file.
- **Props typing**: explicit props interface.
- **Default props**: avoid implicit defaults; prefer explicit values.
- **Testing**: unit tests for behavior and accessibility.

**Layouts**
- Use layout components for consistent header/footer and auth gating.
- Keep layout logic minimal.

**Forms**
- Use React Hook Form + Zod.
- Client side validation mirrors server side validation.

**Modals**
- Accessible focus trap, close on ESC, labeled by heading.

**Tables**
- Use semantic `<table>` with `thead`, `tbody`.
- Support keyboard navigation and ARIA attributes.

**Charts**
- Use accessible chart library; provide data table fallback.

**Dialogs and Cards**
- Reusable components in design system with documented props.

**Buttons and Inputs**
- Variants defined in design system; avoid inline styles.

**Icons**
- Use SVG icons from `packages/ui/icons` with accessible `title`.

**Animation**
- Use motion sparingly; respect reduced motion preference.

**Accessibility**
- All interactive elements must be keyboard accessible and have ARIA labels where necessary.
- Color contrast must meet WCAG AA.

**Component Template**
```tsx
type Props = {
  title: string;
  onClose: () => void;
};

export function Modal({ title, onClose }: Props) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">{title}</h2>
      <button onClick={onClose} aria-label="Close">×</button>
    </div>
  );
}
```

---

### 5 Design System Rules

**Spacing System**
- Base unit `4px`. Spacing scale: `4, 8, 12, 16, 24, 32, 40, 48`.

**Typography Scale**
- Tokens: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`.
- Line heights and letter spacing defined per token.

**Border Radius**
- Small `4px`, medium `8px`, large `12px`.

**Elevation**
- Use tokenized shadows: `elevation-1`, `elevation-2`.

**Grid**
- 12 column grid with breakpoints: `sm`, `md`, `lg`, `xl`.

**Breakpoints**
- `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.

**Dark Mode**
- Provide tokens for color and elevation; prefer semantic tokens.

**Motion**
- Use `prefers-reduced-motion` to disable nonessential animations.

**Accessibility**
- Color tokens must meet contrast ratios.
- Provide focus styles for interactive elements.

**Color Tokens**
- Primary, Secondary, Success, Warning, Danger, Neutral.
- Semantic tokens for backgrounds and surfaces.

---

### 6 API Development Rules

**REST Endpoints**
- Resource oriented: `/v1/wallets`, `/v1/payments`.
- Use nouns, not verbs.

**HTTP Methods**
- `GET` read, `POST` create, `PUT` replace, `PATCH` partial update, `DELETE` remove.

**Status Codes**
- 200 OK, 201 Created, 202 Accepted, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests, 500 Internal Server Error.

**Error Responses**
- Use RFC7807 Problem Details with `type`, `title`, `status`, `detail`, `code`, `requestId`.

**Validation**
- Use DTOs and schema validation at controller boundary.
- Return structured field errors.

**Authentication**
- OAuth2 Authorization Code with PKCE for public clients.
- JWT access tokens with short TTL and rotating refresh tokens.

**Pagination**
- Cursor based: `limit` and `cursor`. Response includes `nextCursor` and `hasMore`.

**Filtering and Sorting**
- Use query parameters: `?status=settled&sort=-createdAt`.

**Versioning**
- URI versioning: `/api/v1/`.
- Deprecation header for older versions.

**Idempotency**
- `Idempotency-Key` header required for payment and payroll creation endpoints.
- Server stores idempotency records for 7 days.

**Examples**
- `POST /api/v1/payments` with `Idempotency-Key` header.

---

### 7 Database Rules

**Table Naming**
- `snake_case` plural nouns: `wallet_accounts`, `journal_entries`.

**Column Naming**
- `snake_case` with suffixes: `_id`, `_at`, `_count`.

**Indexes**
- Add indexes for frequent filters and joins.
- Use composite indexes for multi column queries.

**Foreign Keys**
- Always define FK constraints for referential integrity.

**Constraints**
- Use `CHECK` constraints for enums and numeric ranges.

**Enums**
- Prefer DB enums for domain values when stable.

**Migrations**
- Migrations must be reviewed and tested in staging.
- Avoid destructive migrations without multi step plan.

**Transactions**
- Use DB transactions for multi table updates.
- Keep transactions short.

**Audit Columns**
- `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at` for soft deletes.

**Soft Deletes**
- Use `deleted_at` for logical deletion; ensure queries filter by `deleted_at IS NULL`.

**Best Practices**
- Use `NUMERIC(30,8)` for money.
- Store FX rates with timestamp and provider.
- Maintain append only ledger journals; reversals are new journals.

---

### 8 AI Development Standards

**Prompt Versioning**
- Store prompts in versioned library with semantic version tags.

**Prompt Testing**
- Unit tests for prompt templates with deterministic inputs.
- Safety tests for PII leakage and hallucination.

**Prompt Templates**
- Parameterized templates with placeholders and guardrails.

**Context Management**
- Limit context window; redact PII before sending to models.
- Store context with TTL and consent flags.

**Memory**
- Short term in Redis; long term in encrypted DB with retention policy.

**Tool Calling**
- Agents call tools via well defined adapters; tool calls logged and auditable.

**Hallucination Prevention**
- Use grounding data, retrieval augmented generation, and verification steps.
- For financial actions, require explicit human confirmation.

**Model Evaluation**
- Track metrics: accuracy, precision, recall, hallucination rate.
- A/B test model versions.

**AI Safety**
- Human in the loop for high risk actions.
- Explainability logs for every model decision.

**Prompt Documentation**
- Each prompt must include purpose, inputs, outputs, safety considerations, and test cases.

---

### 9 Git Workflow

**Branching Model**
- `main` for production ready code.
- `develop` for integration.
- `feature/<ticket-id>-short-description` for features.
- `bugfix/<ticket-id>` for fixes.
- `release/<version>` for release stabilization.
- `hotfix/<ticket-id>` for production fixes.

**Commit Messages**
- Use Conventional Commits: `feat(wallet): add multi currency support`.
- Include ticket id and short description.

**Semantic Versioning**
- Services follow semver: MAJOR.MINOR.PATCH.

**Tagging**
- Tag releases on `main` with `vX.Y.Z`.

**Merge Strategy**
- Pull requests merged via squash or merge commit depending on team policy.
- Require at least one code review and passing CI.

---

### 10 Pull Request Standards

Every PR must include:

- **Summary**: Short description and link to ticket.
- **Screenshots**: UI changes with before and after.
- **Testing**: How to run tests and manual steps.
- **Migration Notes**: DB migrations and rollback steps.
- **Security Review**: Any security implications documented.
- **Performance Review**: Potential performance impact.
- **Accessibility Review**: Accessibility checklist results.
- **Documentation Updates**: Links to updated docs.
- **Checklist**:
  - Lint and type checks pass
  - Unit tests added
  - Integration tests added if applicable
  - OpenAPI updated if API changed
  - Migration reviewed
  - Security checklist completed

---

### 11 Code Review Standards

**Reviewer Checklist**
- **Architecture**: Does change follow domain boundaries?
- **Readability**: Is code clear and well named?
- **Security**: Any secrets, injection risks, or auth bypass?
- **Performance**: Any heavy loops or sync blocking?
- **Testing**: Are tests adequate and meaningful?
- **Accessibility**: UI changes accessible?
- **Documentation**: Are docs updated?
- **Maintainability**: Is logic duplicated?
- **AI Code Quality**: If generated by AI, is it idiomatic and secure?

**Approval**
- At least one approval from domain owner and one from security or QA for sensitive changes.

---

### 12 Testing Standards

**Unit Tests**
- Fast, isolated, deterministic.
- Coverage target 80% per service.

**Integration Tests**
- Use testcontainers for DB and Kafka.
- Cover critical flows.

**Contract Tests**
- Consumer driven contracts for public APIs and events.

**End to End Tests**
- Playwright for web flows; run nightly in staging.

**Performance Tests**
- k6 scripts for TPS and latency; run before major releases.

**Security Tests**
- SAST and DAST in CI; dependency scanning.

**AI Evaluation Tests**
- Model accuracy, hallucination checks, privacy tests.

**Test Data**
- Use anonymized realistic data for tests.

---

### 13 Security Standards

**Secrets**
- Vault for secrets; no secrets in repo.

**Authentication**
- OAuth2 with PKCE; rotating refresh tokens.

**Authorization**
- RBAC and ABAC for tenant isolation.

**Encryption**
- TLS 1.3; AES 256 at rest; field level encryption for PII.

**OWASP**
- Follow OWASP Top 10 mitigations.

**PCI DSS**
- Card data tokenized and handled by PCI compliant providers.

**GDPR**
- Data subject rights endpoints and data minimization.

**KYC and AML**
- KYC documents encrypted; AML rules engine with audit trail.

**Rate Limiting**
- API Gateway enforces per client and per tenant limits.

**Threat Modeling**
- Required for new features with sensitive data.

**Dependency Scanning**
- Automated scans on PRs and weekly full scans.

**Penetration Testing**
- Annual pen tests and remediation tracked.

---

### 14 Performance Standards

**Frontend**
- **Bundle size**: Keep main bundle under 200 KB gzipped.
- **Lazy loading**: Route level and component level.
- **Caching**: CDN for static assets and edge caching for public endpoints.
- **Image optimization**: Use `next/image` and responsive images.

**Backend**
- **Response times**: p95 < 200ms for core endpoints.
- **Query optimization**: Use indexes and explain plans.
- **Caching**: Redis for hot reads and rate limiting.
- **Async processing**: Use queues for long running tasks.

**Measurable Targets**
- Payment initiation p95 < 500ms.
- Fraud scoring p95 < 200ms.
- AI inference latency p95 < 2s for lightweight models.

---

### 15 Observability Standards

**Logging**
- Structured JSON logs with `requestId`, `service`, `level`, `message`, `context`.

**Tracing**
- OpenTelemetry instrumentation and trace propagation.

**Metrics**
- Prometheus metrics with service level SLOs.

**Dashboards**
- Grafana dashboards for payments, ledger integrity, fraud alerts, AI model health.

**Alerts**
- PagerDuty for critical alerts; severity based routing.

**Incident Response**
- Runbooks in `docs/runbooks` with playbooks and postmortem templates.

---

### 16 Documentation Standards

Every feature must include:

- **Technical Documentation**: architecture, sequence diagrams, data flows.
- **API Documentation**: OpenAPI updated and published.
- **Architecture Notes**: ADR if design decisions made.
- **User Documentation**: product facing docs for customers.
- **Developer Documentation**: how to run, test, and deploy.

**Templates**
- Feature README with purpose, design, API, tests, and run instructions.
- Runbook template with symptoms, mitigation, and escalation.

---

### 17 Architecture Decision Records

**ADR Format**
- **Title**
- **Status**: Proposed, Accepted, Deprecated
- **Context**
- **Decision**
- **Consequences**
- **Date**
- **Authors**

**Approval Process**
- ADR proposed in PR, reviewed by architecture board, accepted with two approvals.

**Storage**
- `docs/adr/` in repo with sequential numbering.

---

### 18 Contribution Guide

**Onboarding**
- Request access to GitHub, Slack, Jira, AWS, Vault.
- Run `scripts/dev up` to start local environment.

**Coding Workflow**
- Create `feature/<ticket>` branch.
- Implement, add tests, update OpenAPI if needed.
- Open PR with checklist completed.

**Testing**
- Run unit tests and linters locally.
- Integration tests run in CI.

**Submitting PRs**
- Assign reviewers, include migration notes, and link ticket.

**Deployment**
- Merged PR triggers CI build and deploy to staging canary.

---

### 19 AI Coding Agent Rules

AI coding assistants must follow these explicit rules before generating code or changes.

**Hard Rules**
1. **Never break architecture**: Respect domain boundaries and contracts.
2. **Never duplicate logic**: Reuse shared packages and utilities.
3. **Never introduce new dependencies without approval**: Propose dependency in PR and get approval.
4. **Always update tests**: Unit and integration tests must accompany generated code.
5. **Always update documentation**: README, OpenAPI, ADRs as applicable.
6. **Always follow coding standards**: Naming, formatting, and patterns.
7. **Never bypass security**: Do not generate code that disables auth, logging, or validation.
8. **Never modify APIs without versioning**: Add new endpoints or version existing ones.
9. **Never remove audit logging**: All financial and admin actions must be logged.
10. **Human review required**: All AI generated code must be reviewed and approved by a human engineer.

**Checklist AI Agents Must Run Before Code Generation**
- Confirm target service and domain.
- Confirm no existing function implements same behavior.
- Confirm dependency list and request approval if new.
- Generate tests and docs alongside code.
- Ensure no secrets or credentials are embedded.
- Ensure compliance with performance and security constraints.
- Output a PR template with migration notes and test instructions.

---

### 20 Definition of Excellence and Final Quality Checklist

A feature is production ready only when all items below are satisfied.

**Functionality**
- Feature implements acceptance criteria and passes E2E tests.

**Performance**
- Meets performance targets and load test results.

**Security**
- SAST and DAST passed; threat model updated.

**Accessibility**
- UI meets WCAG AA; keyboard and screen reader tested.

**Documentation**
- Technical docs, API docs, and runbooks updated.

**Observability**
- Metrics, logs, and traces instrumented; dashboards updated.

**Testing**
- Unit coverage >= 80% for changed modules; integration and contract tests pass.

**Compliance**
- Data retention, KYC, AML, and PCI considerations addressed.

**Maintainability**
- Code reviewed, no duplication, clear tests, and ADRs for design decisions.

**Developer Experience**
- Local dev scripts updated; migration and rollback steps documented.

**Final Release Checklist**
- All PR checks green.
- Canary deployment successful.
- DR test for related systems passed.
- Stakeholder signoff from Product, Security, and Compliance.

---

## Closing

This manual is the authoritative engineering governance document for PaymentFlow AI. It is mandatory for all contributors and AI coding assistants. Changes to this manual must be proposed via an ADR and approved by the architecture board. The manual will be reviewed quarterly and updated as the platform evolves.

**Location**: `docs/engineering/EGDSM.md` in the monorepo.
**Owners**: Platform Engineering, Security, and Architecture Board.
