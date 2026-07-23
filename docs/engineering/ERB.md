# PaymentFlow AI — Engineering Repository Blueprint (ERB)

**Purpose**
This Engineering Repository Blueprint (ERB) is the official engineering handbook for PaymentFlow AI. It defines repository layout, collaboration workflows, coding standards, architecture patterns, CI/CD, security, testing, and onboarding. It is written for engineers, architects, DevOps, AI teams, security, and new hires so they can contribute immediately and safely to a global, production-grade fintech platform.

---

### Revision history
- **v1.0** — Initial blueprint
- **Owner** — Platform Engineering
- **Date** — 2026-06-26

---

---


### SECTION 1 — ENGINEERING PHILOSOPHY

#### Mission
**Deliver a secure, auditable, and scalable AI-powered fintech platform** that enables consumers, freelancers, SMEs, and enterprises to move, manage, and optimize money globally while maintaining regulatory compliance and operational excellence.

#### Engineering Principles
- **Safety and Compliance First** — Every design decision must consider regulatory, privacy, and audit requirements.
- **Domain Ownership** — Teams own domains end-to-end including code, infra, data contracts, and SLAs.
- **Small, Composable Services** — Prefer focused services with clear APIs and event contracts.
- **Observable by Default** — Instrumentation, tracing, and metrics are required for all services.
- **Automate Everything** — Tests, builds, deployments, security scans, and compliance checks are automated.
- **Design for Failure** — Assume external systems fail; design retries, circuit breakers, and fallbacks.
- **Data Integrity Above All** — Ledger-first approach, idempotency, and strong transactional guarantees for money flows.

#### Code Quality Standards
- **Type safety** across services (TypeScript, Python typing).
- **Linting and formatting** enforced in CI.
- **Comprehensive tests** with coverage gates.
- **API contracts** are added in OpenAPI, with event schemas in a central registry, when implementation of the owning domain begins.
- **Peer review** mandatory for all changes.

#### Architecture Principles
- **Ledger-first**: All money movements recorded in immutable journals.
- **Event-driven**: Kafka for domain events and CDC to analytics.
- **Multi-region active-active**: Stateless services across regions; stateful services with replication and sharding.
- **Separation of concerns**: Clear separation between transactional, analytical, and AI workloads.

#### Scalability Principles
- **Autoscaling** for stateless services and inference clusters.
- **Sharding** for high-volume tables and tenant isolation for large customers.
- **CQRS**: Separate read models for analytics and dashboards.
- **Backpressure**: API gateway and queue-based throttling.

#### Security First Philosophy
- **Zero trust** network and least privilege access.
- **Encryption** in transit and at rest.
- **Secrets management** via Vault.
- **Continuous security scanning** and annual red team exercises.

#### Developer Experience Philosophy
- **Fast feedback loops**: local dev environments, hot reload, and test runners.
- **Clear onboarding**: scripts and docs to get running in hours.
- **Shared tooling**: CLI, code generators, and templates to reduce cognitive load.

**Why these principles exist**
They ensure financial correctness, regulatory compliance, operational resilience, and developer productivity at scale. They reduce risk, speed delivery, and make the platform maintainable for years.

---

---

### SECTION 2 — MONOREPO STRUCTURE

**Top-level layout**
```
paymentflow-ai/
  apps/
    web/
    mobile/
    admin/
    marketing/
  services/
    auth-service/
    user-service/
    wallet-service/
    ledger-service/
    payment-service/
    transaction-service/
    invoice-service/
    payroll-service/
    fraud-service/
    routing-service/
    treasury-service/
    analytics-service/
    notification-service/
    ai-service/
    compliance-service/
    audit-service/
    gateway/
  packages/
    ui/
    design-system/
    shared-types/
    shared-utils/
    database/
    api-sdk/
    eslint-config/
    tsconfig/
  infra/
    docker/
    kubernetes/
    terraform/
    helm/
  .github/
    workflows/
  scripts/
  tools/
  docs/
  README.md
```

#### Directory purposes
- **apps** — Frontend applications and consumer-facing clients. Each app is a deployable artifact.
  - **web** — Business web app and dashboards.
  - **mobile** — React Native or native wrappers.
  - **admin** — Admin portal for KYC, fraud, and operations.
  - **marketing** — Marketing site and landing pages.
- **services** — Backend microservices. Each service is a self-contained module with its own tests, Dockerfile, and deployment manifests.
- **packages** — Shared libraries and utilities published internally or consumed by apps and services.
  - **ui** — Reusable UI components.
  - **design-system** — Tokens, themes, and guidelines.
  - **shared-types** — TypeScript types and OpenAPI-generated types.
  - **shared-utils** — Utilities for logging, errors, validation.
  - **database** — Prisma schemas, migrations helpers, and DB utilities.
  - **api-sdk** — Generated SDKs for internal and external consumption.
  - **eslint-config** and **tsconfig** — Centralized lint and TypeScript configs.
- **infra** — Infrastructure as code and deployment artifacts.
  - **docker** — Base images and build helpers.
  - **kubernetes** — Helm charts and K8s manifests.
  - **terraform** — Cloud resources and state management.
  - **helm** — Chart templates for services.
- **.github/workflows** — CI/CD pipelines.
- **scripts** — Developer scripts for bootstrapping, migrations, and local orchestration.
- **tools** — CLI tools, code generators, and devops helpers.
- **docs** — Architecture docs, runbooks, and onboarding guides.

#### Monorepo rules
- **Single source of truth** for each implemented shared type and API contract; planned contracts must not be presented as existing artifacts.
- **Per-service ownership**: each service team owns its folder and CI jobs.
- **Atomic PRs**: changes touching multiple services must include coordinated tests and migration plans.
- **Versioning**: packages use semantic versioning; services use independent versioning.

---

---

### SECTION 3 — TECHNOLOGY STACK

#### Frontend
- **Next.js** — Server-side rendering, routing, and performance.
- **TypeScript** — Type safety and developer tooling.
- **React** — Component model and ecosystem.
- **Tailwind CSS** — Utility-first styling for consistent UI.
- **React Query** — Data fetching and caching.
- **React Hook Form** — Forms and validation performance.
- **Zod** — Runtime schema validation and type inference.
- **Framer Motion** — Animations for polished UX.

**Why**: Next.js + TypeScript + React is a proven stack for scalable web apps. Tailwind accelerates UI development. React Query and Zod provide robust data and validation patterns.

#### Backend
- **NestJS** with **TypeScript** — Structured modular backend with DI and decorators.
- **Prisma** — Type-safe ORM and migrations for PostgreSQL.
- **PostgreSQL** — ACID transactions and extensibility for ledger.
- **Redis** — Caching, locks, and rate limiting.
- **Kafka** — Event bus for domain events and stream processing.
- **BullMQ** — Job queues for background processing.

**Why**: NestJS provides a scalable architecture with DI and modules. Prisma + Postgres ensures transactional integrity. Kafka and Redis enable high throughput and low latency.

#### AI
- **FastAPI** with Python — Lightweight model serving and APIs.
- **OpenAI** and private LLMs — Conversational and reasoning models.
- **LangGraph** and **LangChain** — Orchestration of agents and tools.
- **Pandas**, **Scikit-Learn** — Feature engineering and classical ML.
- **Vector DB** (e.g., Milvus or Pinecone) — Embeddings and semantic search.

**Why**: Python ecosystem is mature for ML. FastAPI is performant for model endpoints. LangChain/Graph enable agent orchestration.

#### Infrastructure
- **Docker** — Containerization.
- **Kubernetes** — Orchestration and autoscaling.
- **Terraform** — Cloud provisioning.
- **GitHub Actions** — CI/CD pipelines.
- **AWS** — Primary cloud provider.
- **Cloudflare** — CDN, WAF, and edge security.

**Why**: Cloud-native stack for reliability and scale.

#### Monitoring
- **Prometheus** and **Grafana** — Metrics and dashboards.
- **OpenTelemetry** — Distributed tracing.
- **Sentry** — Error monitoring.
- **Loki** — Log aggregation.

**Why**: Observability stack provides end-to-end visibility.

---

---

### SECTION 4 — DEVELOPMENT STANDARDS

#### Folder conventions
- **Feature-first** inside apps: `features/checkout`, `features/invoices`.
- **Domain-first** inside services: `src/modules/wallet`, `src/modules/ledger`.

#### Naming conventions
- **Services**: `kebab-case` e.g., `payment-service`.
- **Packages**: `@paymentflow/ui`, `@paymentflow/shared-types`.
- **Files**: `camelCase` for JS/TS files, `PascalCase` for React components.
- **Database tables**: `snake_case` plural nouns, e.g., `wallet_accounts`.

#### File naming
- **Components**: `ComponentName.tsx`.
- **Hooks**: `useFeature.ts`.
- **Tests**: `*.spec.ts` or `*.test.ts`.

#### Component naming
- **UI components**: `Button`, `Modal`, `InvoiceList`.
- **Domain modules**: `WalletController`, `WalletService`, `WalletRepository`.

#### Service naming
- **K8s service names**: `svc-wallet`, `svc-payment`.
- **Docker images**: `registry.paymentflow.ai/payment-service:tag`.

#### Database naming
- **Schemas** per domain: `identity`, `wallets`, `ledger`.
- **Tables**: `ledger.journal_entries`.

#### Branch naming
- **feature/** for new features.
- **bugfix/** for fixes.
- **hotfix/** for production fixes.
- **release/** for release branches.

#### Commit message format
- **Conventional Commits**:
  - `feat(wallet): add multi-currency support`
  - `fix(payment): handle idempotency edge case`
  - `chore(ci): update node version`

#### Versioning strategy
- **Services**: semantic versioning per service.
- **Packages**: semantic versioning and internal registry.
- **APIs**: URI versioning `/api/v1`.

#### Dependency management
- **Centralized** `package.json` scripts for workspace management.
- **Dependabot** for automated updates.
- **Security scans** in CI.

#### Documentation standards
- **Docs** in `docs/` with Markdown and diagrams.
- **API contracts** in OpenAPI stored in `packages/api-specs`.
- **Runbooks** and playbooks in `docs/runbooks`.

---

---

### SECTION 5 — FRONTEND ARCHITECTURE

#### Feature-based architecture
- **Structure**
  ```
  apps/web/
    src/
      features/
        wallets/
          components/
          hooks/
          api.ts
          types.ts
      shared/
        components/
        hooks/
        utils/
      pages/
      styles/
  ```

#### Component hierarchy
- **Atoms**: Buttons, Inputs.
- **Molecules**: FormField, Modal.
- **Organisms**: WalletCard, PaymentForm.
- **Pages**: WalletPage, InvoicePage.

#### State management
- **Local UI state**: React state and context.
- **Server state**: React Query for caching and background refresh.
- **Global derived state**: Zustand or lightweight context for ephemeral cross-cutting state.

#### Data fetching
- **React Query** with stale-while-revalidate and background refresh.
- **Error boundaries** and retry policies.
- **Idempotency**: client generates `Idempotency-Key` for create endpoints.

#### Caching
- **Client cache** via React Query.
- **CDN** for static assets.
- **SWR** patterns for near-real-time data.

#### Error handling
- **Global error boundary** and toast notifications.
- **Structured error parsing** for RFC7807 responses.

#### Forms
- **React Hook Form** + **Zod** for schema validation and type inference.

#### Routing
- **Next.js routing** with nested layouts and dynamic routes.
- **Protected routes** via server-side session checks and client-side guards.

#### Authentication
- **OAuth2** flows with PKCE for web and mobile.
- **Silent refresh** and token rotation.
- **Device binding** and session management.

#### Design System integration
- **Design tokens** in `packages/design-system`.
- **Component library** in `packages/ui`.
- **Storybook** for component development.

---

---

### SECTION 6 — BACKEND ARCHITECTURE

#### Layered design
- **Controllers**: HTTP endpoints and request validation.
- **Services**: Business logic and orchestration.
- **Repositories**: DB access via Prisma.
- **Modules**: Group controllers, services, repositories per domain.

#### DTOs and Validation
- **DTOs** defined with Zod or class-validator.
- **Validation** at controller boundary.

#### Middleware and Interceptors
- **Middleware**: logging, request id, rate limiting.
- **Interceptors**: response shaping, caching.
- **Guards**: authentication and RBAC enforcement.
- **Exception filters**: map exceptions to RFC7807 responses.

#### Dependency Injection
- **NestJS DI** for services and repositories.
- **Singletons** for clients (Kafka, Redis).

#### Folder structure
```
services/payment-service/
  src/
    modules/
      payments/
        controllers/
        services/
        repositories/
        dtos/
        events/
    common/
      guards/
      interceptors/
      filters/
    main.ts
  Dockerfile
  helm/
  tests/
```

---

---

### SECTION 7 — DATABASE LAYER

#### Prisma organization
- **Monorepo package** `packages/database` contains Prisma schemas per domain and shared models.
- **Per-service Prisma client** generated from domain-specific schema to enforce data ownership.

#### Migration strategy
- **Migrations** stored in `packages/database/migrations`.
- **CI** runs migrations in staging; production migrations require manual approval and run via deployment pipeline.
- **Backward compatibility**: Additive migrations preferred; destructive changes via multi-step migration with feature flags.

#### Seed strategy
- **Dev seeds** for local dev with realistic but anonymized data.
- **Test seeds** for CI integration tests.
- **Production seeds** only for essential reference data (currencies, roles).

#### Repository pattern
- **Repositories** encapsulate Prisma queries and transactions.
- **Unit of work** pattern for multi-repository transactions.

#### Transaction handling
- **Ledger transactions** use explicit DB transactions and optimistic locking.
- **Two-phase commit** avoided; use compensating transactions for external systems.

#### Database versioning
- **Schema version** tracked in `schema_migrations` table and in Git tags.

---

---

### SECTION 8 — AI SERVICE STRUCTURE

#### Service responsibilities
- **AI orchestration**: prompt orchestration, context management, and model routing.
- **Feature store**: precomputed features for fraud and forecasting.
- **Model serving**: inference endpoints for predictions and embeddings.

#### Prompt library
- **Centralized templates** in `services/ai-service/prompts`.
- **Versioned** with semantic tags and changelogs.

#### Agents and Tools
- **Agents** orchestrate calls to models, data sources, and actions.
- **Tools** are adapters for payments, ledger queries, and treasury actions.

#### Memory and Context
- **Short-term context** in Redis with TTL.
- **Long-term memory** in encrypted DB with consent flags and retention policies.

#### Embeddings and Vector DB
- **Embeddings** stored in vector DB (Milvus/Pinecone).
- **Indexing** and similarity search for conversation retrieval and knowledge augmentation.

#### Conversation management
- **Conversation store** in Postgres with hashed context and audit logs.
- **Streaming** support for real-time responses.

#### Prompt versioning and evaluation
- **Model registry** with version metadata.
- **Evaluation pipeline** for A/B testing and drift detection.
- **Safety layer**: content filters, PII redaction, and explainability logs.

---

---

### SECTION 9 — API CLIENT ARCHITECTURE

#### Generated SDK
- **OpenAPI** generated SDKs in `packages/api-sdk` for TypeScript, Python, and Java.
- **Versioned** and published to internal registry.

#### API abstraction
- **Thin wrapper** around fetch/axios with automatic token refresh, retries, and idempotency helpers.

#### Hooks
- **React Query hooks** generated for common endpoints in `packages/api-sdk/hooks`.

#### Error handling
- **Centralized error parser** that maps RFC7807 to typed exceptions.

#### Retry strategy
- **Idempotent retries** for safe operations.
- **Exponential backoff** with jitter for transient errors.

#### Offline support
- **Local queue** for mobile offline payments with reconciliation on reconnect.

#### Caching
- **Client-side** via React Query.
- **Edge caching** via CDN for public resources.

---

---

### SECTION 10 — SHARED PACKAGES

#### Packages and responsibilities
- **ui** — Reusable UI components and tokens.
- **design-system** — Theme, tokens, and Storybook.
- **types** — Shared TypeScript types and OpenAPI generated types.
- **utils** — Logging, error handling, date utilities.
- **validators** — Zod schemas and validation helpers.
- **constants** — Currency lists, status enums.
- **config** — Centralized configuration loader.
- **api-client** — Shared HTTP client and hooks.

#### Ownership and dependencies
- **Core platform team** owns `shared-types`, `database`, and `api-sdk`.
- **Design team** owns `design-system` and `ui`.
- **Each service** depends on `shared-types` and `utils` but not on other services directly.

---

---

### SECTION 11 — SECURITY STANDARDS

#### Authentication
- **OAuth2 Authorization Code with PKCE** for public clients.
- **Client credentials** for service-to-service with mTLS.

#### Authorization
- **Scopes** and **RBAC** enforced at API and service layers.
- **Attribute-based access control** for tenant-level checks.

#### Secrets
- **Vault** for secrets and key rotation.
- **No secrets in code** or repo.

#### Encryption
- **TLS 1.3** for all network traffic.
- **AES-256** for data at rest.
- **Field-level encryption** for PII.

#### Environment variables
- **.env** only for local dev; CI and infra use secret stores.

#### Dependency scanning
- **Snyk** or GitHub Advanced Security in CI.
- **SBOM** generated for each release.

#### Static analysis
- **ESLint**, **TypeScript strict mode**, **Bandit** for Python.

#### Security reviews
- **Threat modeling** for new features.
- **Pen tests** annually and after major releases.

---

---

### SECTION 12 — TESTING STRATEGY

#### Testing pyramid
- **Unit tests**: 70% of tests; fast and isolated.
- **Integration tests**: 20%; DB and external mocks.
- **E2E tests**: 10%; critical flows in staging.

#### Unit tests
- **Jest** for TypeScript; **pytest** for Python.
- **Mocks** for external services.

#### Integration tests
- **Testcontainers** for DB and Kafka in CI.
- **Contract tests** for service APIs using Pact.

#### Contract tests
- **Consumer-driven contracts** for public APIs and event schemas.

#### E2E tests
- **Playwright** for web flows and mobile emulators.

#### Load tests
- **k6** or **Gatling** for TPS and latency targets.

#### Security tests
- **Static analysis**, **dependency scanning**, and **dynamic scanning**.

#### AI evaluation tests
- **Model accuracy**, **drift detection**, and **safety tests** for hallucination and PII leakage.

#### Coverage targets
- **Unit**: 80% per service.
- **Integration**: critical paths covered.
- **E2E**: smoke flows.

---

---

### SECTION 13 — CI/CD

#### GitHub Actions pipelines
- **Lint** and **type check** on PR.
- **Unit tests** and **security scans**.
- **Build** and **containerize** on merge to main.
- **Integration tests** in staging environment.
- **Deploy** via Terraform and Helm to Kubernetes.
- **Rollback** via Helm rollback and image tags.

#### Pipeline stages
1. **Pre-merge**: lint, tests, static analysis.
2. **Merge**: build artifacts, run integration tests.
3. **Release**: tag, publish images, run infra plan.
4. **Deploy**: canary then promote to production.

#### Rollback and promotion
- **Canary** deployments for new images.
- **Blue/Green** for critical services.
- **Feature flags** for gradual rollout.

---

---

### SECTION 14 — ENVIRONMENTS

#### Environment list
- **Local** — developer machines with docker-compose.
- **QA** — automated test environment.
- **Staging** — production-like for final validation.
- **Production** — multi-region clusters.
- **Feature Preview** — ephemeral environments per PR.
- **Sandbox** — for partners and testing with simulated rails.

#### Configuration strategy
- **12-factor** config via environment variables.
- **Secrets** from Vault.
- **Feature flags** via LaunchDarkly or internal service.

---

---

### SECTION 15 — OBSERVABILITY

#### Logging
- **Structured JSON logs** with `requestId`, `userId`, `tenantId`.
- **Loki** for log aggregation.

#### Tracing
- **OpenTelemetry** instrumentation across services.
- **Jaeger** or vendor tracing for spans.

#### Metrics
- **Prometheus** metrics per service.
- **Grafana** dashboards for SLOs and health.

#### Alerts
- **PagerDuty** for critical alerts.
- **Alert rules** for error rate, latency, and SLO breaches.

#### Incident response
- **Runbooks** in `docs/runbooks`.
- **Postmortems** with blameless culture.

#### SLOs and SLIs
- **Payment success rate**: 99.99% for core flows.
- **API latency**: p95 < 200ms for core endpoints.
- **Error budget**: defined per service.

---

---

### SECTION 16 — RELEASE STRATEGY

#### Branching model
- **main** for production-ready code.
- **develop** for integration.
- **feature/** branches for work.
- **release/** branches for release stabilization.

#### Release branches
- **Minor** releases monthly.
- **Patch** releases as needed.

#### Feature flags
- **Default off** for new features.
- **Gradual rollout** with percentage targeting.

#### Canary and Blue/Green
- **Canary** for low-risk services.
- **Blue/Green** for critical services like ledger and payment.

#### Rollback procedures
- **Helm rollback** and image tag revert.
- **DB migrations** reversible or run with feature flags.

---

---

### SECTION 17 — CODING STANDARDS

#### TypeScript rules
- **Strict mode** enabled.
- **No any** except with justification.
- **Prefer readonly** and `as const`.
- **Example**
```ts
// Good
type Currency = 'USD' | 'EUR';
const formatAmount = (amount: number): string => amount.toFixed(2);

// Bad
function format(a) { return a; } // no types
```

#### React rules
- **Functional components** with hooks.
- **Presentational vs container** separation.
- **Accessibility**: ARIA attributes and keyboard navigation.
- **Example**
```tsx
// Good
function Button({label, onClick}: {label: string; onClick: () => void}) {
  return <button onClick={onClick} aria-label={label}>{label}</button>;
}
```

#### NestJS rules
- **Modules per domain**, controllers thin, services own logic.
- **DTOs** with Zod or class-validator.
- **Example**
```ts
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Post()
  create(@Body() dto: CreateWalletDto) { return this.walletService.create(dto); }
}
```

#### Python rules
- **Type hints** and linting with `ruff` and `mypy`.
- **FastAPI** endpoints typed and documented.

#### SQL and Prisma rules
- **Use parameterized queries**.
- **NUMERIC** for money with explicit precision.
- **Prisma** migrations reviewed and tested.

#### API design rules
- **Use nouns** for resources.
- **Idempotency** for create endpoints.
- **Use RFC7807** for errors.

#### Documentation
- **JSDoc** and typed comments.
- **API docs** generated from OpenAPI.

---

---

### SECTION 18 — CODE REVIEW CHECKLIST

#### Architecture
- Does the change follow domain boundaries?
- Are new services justified and scoped?

#### Security
- Are secrets handled correctly?
- Is input validated and sanitized?

#### Performance
- Any blocking calls or sync loops?
- Are caches and pagination used?

#### Accessibility
- Are UI components accessible?
- Keyboard and screen reader support?

#### Testing
- Unit tests added and passing.
- Integration tests for DB and external calls.

#### Documentation
- README updated.
- API contract updated if applicable.

#### Maintainability
- Clear naming and comments.
- No duplicated logic.

---

---

### SECTION 19 — ENGINEERING ROADMAP

#### Milestone 0 Foundation
- Monorepo scaffold, local development environment, CI/CD baseline, infrastructure skeleton, shared packages, contract folders, security scanning, documentation rules, and service health-check scaffolds.
- Deliverables: repo foundation, local stack, CI quality gates, infrastructure skeleton, onboarding docs.

#### Milestone 1 Authentication and Identity
- Auth Service, User Service, registration, login, OAuth2/OIDC-compatible token flows, sessions, MFA, device tracking, RBAC, tenant-aware authorization foundations, and identity audit events.
- Deliverables: identity schema, auth APIs, user APIs, token/session lifecycle, MFA flows, RBAC enforcement, contract tests.

#### Milestone 2 Ledger Engine
- Banking-grade immutable double-entry ledger, chart of accounts, journal entries, posting engine, balance derivation, reversals, adjustments, reconciliation, and ledger APIs.
- Deliverables: ledger schema, posting engine, balance engine, reconciliation workflows, audit-ready financial records.

#### Milestone 3 Wallet Service
- Multi-currency wallet lifecycle, wallet accounts mapped to ledger accounts, available/pending/reserved balance views, holds, funding readiness, and wallet APIs.
- Deliverables: wallet service, wallet APIs, ledger-backed balance reads, wallet events, wallet test suite.

#### Milestone 4 Payments and Transactions
- Payment orchestration, transaction state machine, beneficiaries, idempotency, internal transfers, scheduled and recurring payment foundations, and failure handling.
- Deliverables: payment APIs, transaction records, beneficiary APIs, idempotency controls, internal transfer flow.

#### Milestone 5 External Rails, FX, and Reconciliation
- Provider adapters, FX quotes and conversions, external settlement, webhook handling, provider reconciliation, and route fallback foundations.
- Deliverables: provider integration contracts, FX workflows, settlement handling, reconciliation reports.

#### Milestone 6 Business Platform
- Invoicing, payroll, company dashboards, business roles, approval flows, and operational admin workflows.
- Deliverables: invoice flows, payroll engine, company/team model, admin workflows, KYC/KYB integration points.

#### Milestone 7 AI, Fraud, Treasury, and Global Scale
- AI Copilot, forecasting, fraud models, smart routing, treasury automation, multi-region deployment, data residency, and compliance certifications.
- Deliverables: Copilot beta, fraud/risk models, treasury dashboards, routing optimization, compliance and enterprise-readiness artifacts.

---

---

### SECTION 20 — DEVELOPER ONBOARDING

#### Pre-boarding
- **Access**: GitHub, Slack, Jira, AWS console, Vault.
- **Accounts**: Request access via onboarding form.

#### Local setup
1. **Clone repo** and install dependencies:
```bash
git clone git@github.com:paymentflow-ai/paymentflow-ai.git
pnpm install
```
2. **Run dev environment**:
```bash
scripts/dev up
# starts local Postgres, Kafka, Redis, and services
```
3. **Run tests**:
```bash
pnpm test
```

#### Environment configuration
- **.env.local** template in `scripts/env.example`.
- **Secrets** fetched from Vault via `scripts/vault-login`.

#### Running services
- **Start a single service**:
```bash
cd services/wallet-service
pnpm dev
```
- **Start all services**:
```bash
scripts/dev up
```

#### Testing and debugging
- **Attach debugger** to Node or Python processes.
- **Use testcontainers** for integration tests.

#### Deployment
- **Create PR** and follow CI checks.
- **Merge** triggers build and canary deploy to staging.
- **Promote** via GitHub Actions to production with approvals.

#### Contribution workflow
- **Fork or branch** from `main`.
- **Open PR** with description, tests, and migration plan.
- **Assign reviewers** and address feedback.
- **Merge** after approvals and passing CI.

#### Coding standards
- Follow linting and commit message rules.
- Add tests for new logic.

---

---

### Closing notes

This Engineering Repository Blueprint is the canonical guide for building PaymentFlow AI. It balances security, compliance, and developer velocity. It is intentionally prescriptive where financial correctness matters and flexible where teams need autonomy. The next steps are:

- Approve the ERB by CTO and Security.
- Create initial repo scaffold and CI templates.
- Run a pilot onboarding with 2–3 engineers to validate the developer experience.

---

**Visual aids and diagrams**
Use the following inline placeholders where diagrams should be added in docs and PRs:

- `

`
- `

`
- `

`
- `

`
- `

`

These tags mark where architecture diagrams, ERDs, and flow charts belong in the repository documentation.

---

**Prepared by** Platform Engineering
**Contact** engineering@paymentflow.ai
