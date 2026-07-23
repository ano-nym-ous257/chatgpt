# PaymentFlow AI Engineering Backlog

## Document Purpose

This document is the single source of truth for all engineering work on the PaymentFlow AI platform. Every task, improvement, bug fix, and feature is tracked here from proposal through completion. The backlog is populated from the completed **PF-0001 Repository Audit & Hardening** assessment and will be maintained as the canonical work tracker throughout the project lifecycle.

**Source of Truth**: PF-0001 Repository Audit (completed 2026-07-13)
**Audit Health Score**: 4.0 / 10.0

---

## Ownership

| Role | Responsibility |
|------|----------------|
| **Principal Engineer** | Backlog prioritization, sprint planning, architectural decisions |
| **Engineering Lead** | Ticket refinement, dependency resolution, sprint execution |
| **Individual Contributor** | Ticket implementation, testing, documentation |
| **CTO** | Final approval on critical and high-priority items |

---

## Status Definitions

| Status | Definition |
|--------|------------|
| **Proposed** | Identified but not yet refined. Requirements may be incomplete. Cannot be worked on. |
| **Ready** | Fully refined with acceptance criteria, dependencies resolved, estimated. Can be pulled into a sprint. |
| **In Progress** | Actively being worked on by an assigned owner. Must have a branch created. |
| **Review** | Implementation complete. Awaiting code review, CI validation, and CTO sign-off. |
| **Done** | Merged to main, CI passing, acceptance criteria verified, CTO review template completed. |
| **Blocked** | Cannot proceed due to an unresolved dependency, decision, or external factor. Blocker must be documented. |
| **Deferred** | Intentionally postponed. Reason and re-evaluation date must be documented. |

---

## Priority Levels

| Priority | Definition | SLA |
|----------|------------|-----|
| **Critical** | Blocks CI, breaks builds, creates security vulnerabilities, or prevents any forward progress. Must be resolved before any other work. | Same day |
| **High** | Significant quality, safety, or correctness issue. Degrades engineering velocity or introduces risk. | Current sprint |
| **Medium** | Important improvement to developer experience, maintainability, or platform capability. | Next 2 sprints |
| **Low** | Minor cleanup, optimization, or cosmetic improvement. No functional impact if deferred. | Backlog |

---

## Estimation Scale

| Size | Definition | Approximate Duration |
|------|------------|---------------------|
| **XS** | Trivial change. Single file, obvious fix, no decisions required. | < 1 hour |
| **S** | Small scope. One or two files, clear requirements, minimal testing. | 1–4 hours |
| **M** | Moderate scope. Multiple files, some design decisions, tests required. | 4–16 hours (1–2 days) |
| **L** | Large scope. Cross-package changes, new infrastructure, significant testing. | 2–5 days |
| **XL** | Epic scope. New service, major architectural change, or multi-system integration. | 1–2 weeks |

---

## Engineering Backlog Summary

### Sprint 0 — Engineering Foundation

| Ticket | Title | Priority | Effort | Sprint | Status | Dependencies | Owner |
|--------|-------|----------|--------|--------|--------|--------------|-------|
| PF-0002 | Generate and commit pnpm-lock.yaml | Critical | XS | 0 | Ready | None | — |
| PF-0003 | Harden .gitignore with secrets patterns | Critical | XS | 0 | Ready | None | — |
| PF-0004 | Escalate ESLint no-explicit-any to error | High | XS | 0 | Ready | None | — |
| PF-0005 | Add React and testing-library to root devDependencies | High | XS | 0 | Ready | PF-0002 | — |
| PF-0006 | Consolidate design/components into packages/ui | High | M | 0 | Ready | PF-0005 | — |
| PF-0007 | Fix DataTable unsafe type assertion | High | S | 0 | Ready | PF-0006 | — |
| PF-0008 | Create Prettier configuration file | Medium | XS | 0 | Ready | None | — |
| PF-0009 | Configure Husky, lint-staged, and commitlint | Medium | S | 0 | Ready | PF-0002 | — |
| PF-0010 | Fix ESLint to lint JavaScript files | Medium | XS | 0 | Ready | None | — |
| PF-0011 | Remove tsconfig ignoreDeprecations workaround | Low | XS | 0 | Ready | None | — |
| PF-0012 | Create .env.example with documented variables | Medium | S | 0 | Ready | None | — |
| PF-0013 | Update root README.md for engineering project | Medium | S | 0 | Ready | None | — |

### Sprint 1 — Platform Foundation

| Ticket | Title | Priority | Effort | Sprint | Status | Dependencies | Owner |
|--------|-------|----------|--------|--------|--------|--------------|-------|
| PF-0014 | Initialize Next.js application in apps/web | High | M | 1 | Proposed | PF-0002, PF-0008 | — |
| PF-0015 | Initialize NestJS scaffold in services/auth-service | High | M | 1 | Proposed | PF-0002, PF-0008 | — |
| PF-0016 | Configure Turborepo for monorepo orchestration | Medium | M | 1 | Proposed | PF-0002 | — |
| PF-0017 | Set up Docker Compose for PostgreSQL and Redis | Medium | M | 1 | Proposed | None | — |
| PF-0018 | Create packages/shared-utils | Medium | M | 1 | Proposed | PF-0002 | — |
| PF-0019 | Create packages/validation with Zod schemas | Medium | M | 1 | Proposed | PF-0002, PF-0018 | — |
| PF-0020 | Create packages/config for environment parsing | Medium | M | 1 | Proposed | PF-0002, PF-0019 | — |
| PF-0021 | Add VS Code workspace settings and recommended extensions | Low | S | 1 | Proposed | None | — |
| PF-0022 | Create packages/api-sdk placeholder with codegen config | Low | S | 1 | Proposed | PF-0015 | — |

### Sprint 2 — Core Financial Platform

| Ticket | Title | Priority | Effort | Sprint | Status | Dependencies | Owner |
|--------|-------|----------|--------|--------|--------|--------------|-------|
| PF-0023 | Initialize Prisma in packages/database | High | L | 2 | Proposed | PF-0017 | — |
| PF-0024 | Implement identity schema and user model | High | L | 2 | Proposed | PF-0023 | — |
| PF-0025 | Implement auth-service registration endpoint | High | L | 2 | Proposed | PF-0015, PF-0024 | — |
| PF-0026 | Implement auth-service login and session management | High | L | 2 | Proposed | PF-0025 | — |
| PF-0027 | Implement JWT access and refresh token lifecycle | High | L | 2 | Proposed | PF-0026 | — |
| PF-0028 | Implement MFA (TOTP) support | Medium | L | 2 | Proposed | PF-0026 | — |
| PF-0029 | Set up API gateway service with routing and rate limiting | High | L | 2 | Proposed | PF-0015 | — |

### Sprint 3 — Developer Platform

| Ticket | Title | Priority | Effort | Sprint | Status | Dependencies | Owner |
|--------|-------|----------|--------|--------|--------|--------------|-------|
| PF-0030 | Configure structured logging with pino | Medium | M | 3 | Proposed | PF-0015 | — |
| PF-0031 | Implement distributed tracing (W3C Trace Context) | Medium | M | 3 | Proposed | PF-0029, PF-0030 | — |
| PF-0032 | Add health check and readiness endpoints to all services | Medium | S | 3 | Proposed | PF-0015, PF-0029 | — |
| PF-0033 | Create OpenAPI specification and documentation | Medium | M | 3 | Proposed | PF-0025, PF-0029 | — |
| PF-0034 | Set up integration test infrastructure | High | L | 3 | Proposed | PF-0017, PF-0023 | — |
| PF-0035 | Implement E2E test framework with Playwright | Medium | L | 3 | Proposed | PF-0014, PF-0034 | — |

### Sprint 4 — Production Readiness

| Ticket | Title | Priority | Effort | Sprint | Status | Dependencies | Owner |
|--------|-------|----------|--------|--------|--------|--------------|-------|
| PF-0036 | Configure multi-stage CI/CD pipeline | High | L | 4 | Proposed | PF-0016 | — |
| PF-0037 | Set up container builds and registry | Medium | M | 4 | Proposed | PF-0017, PF-0036 | — |
| PF-0038 | Implement CORS, CSRF, and security headers | High | M | 4 | Proposed | PF-0029 | — |
| PF-0039 | Conduct security audit and remediation | High | L | 4 | Proposed | PF-0038 | — |
| PF-0040 | Production deployment configuration (Kubernetes manifests) | High | XL | 4 | Proposed | PF-0037, PF-0039 | — |

---

## Ticket Details

---

### PF-0002: Generate and Commit pnpm-lock.yaml

**Priority**: Critical | **Effort**: XS | **Sprint**: 0 | **Status**: Ready

#### Objective

Generate the pnpm lockfile and commit it to the repository so that CI can run `pnpm install --frozen-lockfile` successfully.

#### Scope

- Run `pnpm install` at the repository root
- Verify the generated `pnpm-lock.yaml` is complete and valid
- Verify `pnpm install --frozen-lockfile` succeeds with the committed lockfile

#### Deliverables

- `pnpm-lock.yaml` committed to repository root
- CI install step passes

#### Acceptance Criteria

- [ ] `pnpm-lock.yaml` exists at repository root and is committed
- [ ] `pnpm install --frozen-lockfile` exits with code 0
- [ ] All workspace packages resolve correctly
- [ ] CI pipeline install stage passes

#### Dependencies

None — this is the first ticket and blocks most subsequent work.

#### Risks

- Dependency resolution conflicts between workspace packages
- Version mismatches in peer dependencies (React 18)

#### Estimated Effort

< 30 minutes

---

### PF-0003: Harden .gitignore with Secrets Patterns

**Priority**: Critical | **Effort**: XS | **Sprint**: 0 | **Status**: Ready

#### Objective

Prevent accidental commit of secrets, credentials, certificates, and environment files by adding comprehensive exclusion patterns to `.gitignore`.

#### Scope

- Add `.env`, `.env.*`, `!.env.example` patterns
- Add `*.pem`, `*.key`, `*.cert`, `*.p12`, `*.pfx` patterns
- Add credential file patterns (`.credentials`, `*.secret`, `serviceAccountKey.json`)
- Add IDE and OS-specific patterns as needed

#### Deliverables

- Updated `.gitignore` with security-critical exclusion patterns

#### Acceptance Criteria

- [ ] `.env` files are excluded (except `.env.example`)
- [ ] Certificate and key files are excluded (`*.pem`, `*.key`, `*.cert`)
- [ ] `git status` does not show any env or secret files
- [ ] `.env.example` is explicitly un-ignored
- [ ] Patterns cover Docker secrets (`.docker/config.json`)

#### Dependencies

None.

#### Risks

- Low: existing secrets may already be committed (verify with `git log` search)

#### Estimated Effort

< 30 minutes

---

### PF-0004: Escalate ESLint no-explicit-any to Error

**Priority**: High | **Effort**: XS | **Sprint**: 0 | **Status**: Ready

#### Objective

Change the `@typescript-eslint/no-explicit-any` rule from `warn` to `error` so that `any` types cause CI failure, enforcing the project's type safety policy.

#### Scope

- Update `.eslintrc.js` rule from `'warn'` to `'error'`
- Fix any existing violations in the codebase (audit found none in current source)
- Verify `pnpm lint` passes

#### Deliverables

- Updated `.eslintrc.js` with `'@typescript-eslint/no-explicit-any': 'error'`
- Zero lint errors after change

#### Acceptance Criteria

- [ ] `@typescript-eslint/no-explicit-any` is set to `'error'`
- [ ] `pnpm lint` passes with zero errors
- [ ] Any code introducing `any` will fail CI

#### Dependencies

None.

#### Risks

- None identified — audit found no existing `any` usage in source files

#### Estimated Effort

< 30 minutes

---

### PF-0005: Add React and Testing-Library to Root devDependencies

**Priority**: High | **Effort**: XS | **Sprint**: 0 | **Status**: Ready

#### Objective

Add React, ReactDOM, and @testing-library packages to root devDependencies so that tests in `design/components/` (and later `packages/ui/`) can resolve React without package-level installs breaking.

#### Scope

- Add `react`, `react-dom`, `@types/react`, `@types/react-dom` to root devDependencies
- Add `@testing-library/react`, `@testing-library/jest-dom` to root devDependencies
- Verify all existing tests pass after the change

#### Deliverables

- Updated root `package.json` with React and testing-library devDependencies
- Updated `pnpm-lock.yaml`
- All tests passing

#### Acceptance Criteria

- [ ] `react` and `react-dom` available at root level
- [ ] `@testing-library/react` and `@testing-library/jest-dom` available at root level
- [ ] `pnpm test` passes from repository root
- [ ] No duplicate React instances in node_modules

#### Dependencies

- PF-0002 (lockfile must exist first)

#### Risks

- React version conflicts between root and `packages/ui` peer dependencies

#### Estimated Effort

< 1 hour

---

### PF-0006: Consolidate design/components into packages/ui

**Priority**: High | **Effort**: M | **Sprint**: 0 | **Status**: Ready

#### Objective

Eliminate the component duplication between `design/components/` and `packages/ui/src/`. Move all tests to co-locate with `packages/ui/src/` components, update imports from default exports to named exports, and deprecate `design/components/` for component use.

#### Scope

- Migrate `design/components/Button.test.tsx` to `packages/ui/src/Button.test.tsx`
- Migrate `design/components/Card.test.tsx` to `packages/ui/src/Card.test.tsx`
- Migrate `design/components/DataTable.test.tsx` to `packages/ui/src/DataTable.test.tsx`
- Update all test imports from `import Button from './Button'` (default) to `import { Button } from './Button'` (named)
- Update `vitest.config.ts` coverage includes to remove `design/components/**`
- Remove `.tsx` component duplicates from `design/components/`
- Remove `.jsx` legacy prototypes from `design/components/`
- Add `README.md` to `design/` noting it is archived

#### Deliverables

- Tests co-located in `packages/ui/src/`
- All tests use named imports
- `vitest.config.ts` updated
- `design/components/` cleaned of TypeScript/JSX component files
- All 17 tests passing

#### Acceptance Criteria

- [ ] All tests exist in `packages/ui/src/` alongside their components
- [ ] All test imports use named exports: `import { Button } from './Button'`
- [ ] `pnpm test` passes with all 17 tests green
- [ ] Coverage configuration no longer references `design/components/`
- [ ] No `.tsx` or `.jsx` component files remain in `design/components/`
- [ ] `pnpm lint` and `pnpm typecheck` pass

#### Dependencies

- PF-0005 (React must be available at root)

#### Risks

- Test assertions may reference default-export-specific behavior
- Import paths in tests may need adjustment for package-relative resolution

#### Estimated Effort

4–8 hours

---

### PF-0007: Fix DataTable Unsafe Type Assertion

**Priority**: High | **Effort**: S | **Sprint**: 0 | **Status**: Ready

#### Objective

Replace the unsafe `as string` type assertion on `packages/ui/src/DataTable.tsx:48` with a runtime type check, satisfying the project's type safety rules (CLAUDE.md §4).

#### Scope

- Replace `(row[rowKey] as string) ?? index` with a runtime type-narrowed alternative
- Add a unit test covering the case where `rowKey` produces a non-string value
- Ensure the fix handles `number`, `undefined`, and `null` row key values gracefully

#### Deliverables

- Updated `DataTable.tsx` with safe type narrowing
- New test case in `DataTable.test.tsx` for non-string row keys

#### Acceptance Criteria

- [ ] No `as string` assertion exists in DataTable.tsx
- [ ] Row keys that are numbers are converted safely via `String()`
- [ ] Undefined or null row keys fall back to the index
- [ ] New test case covers non-string row key scenarios
- [ ] `pnpm typecheck` and `pnpm test` pass

#### Dependencies

- PF-0006 (tests should be consolidated first)

#### Risks

- None — localized change with clear scope

#### Estimated Effort

1–2 hours

---

### PF-0008: Create Prettier Configuration File

**Priority**: Medium | **Effort**: XS | **Sprint**: 0 | **Status**: Ready

#### Objective

Create a `.prettierrc` configuration file so that formatting is explicit and reproducible across all development environments. The ESLint config already extends `eslint-config-prettier`, but no Prettier configuration file exists.

#### Scope

- Create `.prettierrc` at repository root
- Configure: single quotes, trailing commas (all), 100-char print width, 2-space tabs, semicolons
- Create `.prettierignore` excluding `dist/`, `coverage/`, `pnpm-lock.yaml`, `*.md` (optional)
- Verify `pnpm lint` still passes (eslint-config-prettier compatibility)

#### Deliverables

- `.prettierrc` configuration file
- `.prettierignore` file

#### Acceptance Criteria

- [ ] `.prettierrc` exists at repository root with documented settings
- [ ] Prettier formatting is consistent with ESLint config (no conflicts)
- [ ] `pnpm lint` passes after addition

#### Dependencies

None.

#### Risks

- None — additive configuration

#### Estimated Effort

< 30 minutes

---

### PF-0009: Configure Husky, lint-staged, and commitlint

**Priority**: Medium | **Effort**: S | **Sprint**: 0 | **Status**: Ready

#### Objective

Enforce code quality and commit message conventions at the git hook level. Pre-commit hooks run lint-staged (lint + format on staged files). Commit-msg hooks validate Conventional Commits format.

#### Scope

- Install `husky`, `lint-staged`, `@commitlint/cli`, `@commitlint/config-conventional`
- Configure Husky with `pre-commit` and `commit-msg` hooks
- Configure lint-staged in `package.json` or `.lintstagedrc`
- Configure commitlint in `commitlint.config.js`
- Verify hooks trigger on `git commit`

#### Deliverables

- `.husky/pre-commit` hook running lint-staged
- `.husky/commit-msg` hook running commitlint
- `commitlint.config.js` extending `@commitlint/config-conventional`
- lint-staged configuration targeting `.ts`, `.tsx`, `.js`, `.jsx` files

#### Acceptance Criteria

- [ ] `git commit` with a non-conventional message is rejected
- [ ] `git commit` with lint errors in staged files is rejected
- [ ] `git commit` with valid code and message succeeds
- [ ] Hooks work in CI (Husky auto-disables in CI by default — verify)

#### Dependencies

- PF-0002 (lockfile must exist)

#### Risks

- Husky hooks may not install correctly on some developer machines
- CI may need explicit hook bypass (`HUSKY=0`)

#### Estimated Effort

2–4 hours

---

### PF-0010: Fix ESLint to Lint JavaScript Files

**Priority**: Medium | **Effort**: XS | **Sprint**: 0 | **Status**: Ready

#### Objective

Remove `*.js` from ESLint `ignorePatterns` so that JavaScript files (like `app.js`) are linted. The current pattern `'*.js'` excludes all JS files from linting, creating a blind spot.

#### Scope

- Remove `'*.js'` from `ignorePatterns` in `.eslintrc.js`
- Keep `'!.eslintrc.js'` override (or refactor if no longer needed)
- Fix any lint errors in existing `.js` files or add targeted overrides
- The `app.js` prototype may need specific rule exemptions or removal (coordinate with PF-0013)

#### Deliverables

- Updated `.eslintrc.js` with corrected ignore patterns
- All lintable files passing `pnpm lint`

#### Acceptance Criteria

- [ ] `*.js` is no longer blanket-ignored by ESLint
- [ ] `.eslintrc.js` itself is still excluded (CJS config file)
- [ ] `pnpm lint` passes

#### Dependencies

None.

#### Risks

- `app.js` may have numerous lint errors (acceptable — it is a prototype file)

#### Estimated Effort

< 1 hour

---

### PF-0011: Remove tsconfig ignoreDeprecations Workaround

**Priority**: Low | **Effort**: XS | **Sprint**: 0 | **Status**: Ready

#### Objective

Remove `"ignoreDeprecations": "6.0"` from root `tsconfig.json` and `packages/ui/tsconfig.json`. This was a workaround for TypeScript <5.4 deprecation warnings that no longer applies.

#### Scope

- Remove `ignoreDeprecations` from root `tsconfig.json`
- Remove `ignoreDeprecations` from `packages/ui/tsconfig.json`
- Verify `pnpm typecheck` passes without the flag

#### Deliverables

- Updated `tsconfig.json` files
- Clean typecheck

#### Acceptance Criteria

- [ ] `ignoreDeprecations` removed from all tsconfig files
- [ ] `pnpm typecheck` passes with zero errors
- [ ] No new deprecation warnings appear

#### Dependencies

None.

#### Risks

- Deprecation warnings may surface if other config options are deprecated (unlikely with TS 5.4+)

#### Estimated Effort

< 15 minutes

---

### PF-0012: Create .env.example with Documented Variables

**Priority**: Medium | **Effort**: S | **Sprint**: 0 | **Status**: Ready

#### Objective

Create a `.env.example` file documenting all required and optional environment variables with safe placeholder values and explanatory comments.

#### Scope

- Create `.env.example` at repository root
- Document variables for: database, Redis, Kafka, JWT secrets, API keys, feature flags
- Use safe placeholder values (never real credentials)
- Add variable grouping with comment headers

#### Deliverables

- `.env.example` with all documented variables
- Grouped by service: Database, Cache, Queue, Auth, API, Feature Flags

#### Acceptance Criteria

- [ ] `.env.example` exists at repository root
- [ ] Every variable has a comment explaining its purpose
- [ ] No real secrets or credentials in placeholder values
- [ ] File is committed to git (not ignored)

#### Dependencies

None.

#### Risks

- None — documentation-only file

#### Estimated Effort

1–2 hours

---

### PF-0013: Update Root README.md for Engineering Project

**Priority**: Medium | **Effort**: S | **Sprint**: 0 | **Status**: Ready

#### Objective

Replace the prototype-oriented README.md with a proper engineering project README covering architecture overview, setup instructions, development workflow, and project structure.

#### Scope

- Rewrite README.md with: project description, prerequisites, setup instructions, development commands, project structure, contributing guidelines reference
- Remove prototype instructions ("Open index.html in a browser")
- Add badges for CI status, Node version, pnpm version

#### Deliverables

- Updated `README.md` with engineering-grade content

#### Acceptance Criteria

- [ ] README describes PaymentFlow AI as an engineering project
- [ ] Prerequisites section lists Node >=20 and pnpm >=9
- [ ] Setup section includes `pnpm install` and dev commands
- [ ] Project structure matches actual repository layout
- [ ] No references to prototype HTML files

#### Dependencies

None.

#### Risks

- None

#### Estimated Effort

1–2 hours

---

### PF-0014: Initialize Next.js Application in apps/web

**Priority**: High | **Effort**: M | **Sprint**: 1 | **Status**: Proposed

#### Objective

Create the customer-facing web application in `apps/web/` using Next.js 14+ with App Router, TypeScript, and integration with the `@paymentflow/ui` component library.

#### Scope

- Initialize Next.js app with `create-next-app` (App Router, TypeScript, ESLint, Tailwind optional)
- Configure `tsconfig.json` extending root config
- Add `@paymentflow/ui` and `@paymentflow/shared-types` as workspace dependencies
- Create a minimal landing page using `Button` and `Card` components
- Configure Next.js for the monorepo (transpilePackages)
- Add `dev`, `build`, `start`, `lint`, `typecheck` scripts

#### Deliverables

- `apps/web/` with working Next.js application
- Workspace dependency integration verified
- Dev server runs and renders UI components

#### Acceptance Criteria

- [ ] `apps/web/` exists with standard Next.js structure
- [ ] `pnpm --filter @paymentflow/web dev` starts the dev server
- [ ] `@paymentflow/ui` components render correctly in the app
- [ ] `pnpm typecheck` and `pnpm lint` pass including the new app
- [ ] App Router is configured (not Pages Router)

#### Dependencies

- PF-0002 (lockfile), PF-0008 (prettier config)

#### Risks

- Next.js + pnpm workspace configuration can require custom transpilation settings
- React version alignment between Next.js and packages/ui

#### Estimated Effort

8–16 hours

---

### PF-0015: Initialize NestJS Scaffold in services/auth-service

**Priority**: High | **Effort**: M | **Sprint**: 1 | **Status**: Proposed

#### Objective

Create the authentication service scaffold in `services/auth-service/` using NestJS with TypeScript, following the project's microservice architecture.

#### Scope

- Initialize NestJS project with `@nestjs/cli`
- Configure TypeScript extending root tsconfig
- Create module structure: AuthModule, UserModule, SessionModule
- Add health check endpoint (`GET /health`, `GET /ready`)
- Configure Jest/Vitest for service testing
- Add `@paymentflow/shared-types` as workspace dependency
- Add Dockerfile for the service

#### Deliverables

- `services/auth-service/` with NestJS project structure
- Module scaffolds for Auth, User, Session
- Health check endpoints
- Dockerfile

#### Acceptance Criteria

- [ ] `services/auth-service/` exists with NestJS structure
- [ ] `pnpm --filter @paymentflow/auth-service start:dev` starts the service
- [ ] `GET /health` returns 200 with service status
- [ ] TypeScript strict mode is enabled
- [ ] Tests run and pass (scaffold tests)

#### Dependencies

- PF-0002 (lockfile), PF-0008 (prettier config)

#### Risks

- NestJS + pnpm workspace path resolution
- Vitest vs Jest configuration (NestJS defaults to Jest)

#### Estimated Effort

8–16 hours

---

### PF-0016: Configure Turborepo for Monorepo Orchestration

**Priority**: Medium | **Effort**: M | **Sprint**: 1 | **Status**: Proposed

#### Objective

Add Turborepo for intelligent task orchestration across the monorepo, enabling cached builds, parallel execution, and dependency-aware task scheduling.

#### Scope

- Install `turbo` as root devDependency
- Create `turbo.json` with pipeline definitions for: build, lint, typecheck, test, dev
- Configure task dependencies (e.g., build depends on ^build)
- Configure caching for build outputs
- Update root package.json scripts to use `turbo run`

#### Deliverables

- `turbo.json` configuration
- Updated root `package.json` scripts
- Verified parallel execution and caching

#### Acceptance Criteria

- [ ] `turbo.json` exists with complete pipeline definitions
- [ ] `pnpm build` executes via Turborepo with dependency ordering
- [ ] Cached tasks skip on second run (cache hit verified)
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` work through Turborepo

#### Dependencies

- PF-0002 (lockfile)

#### Risks

- Cache invalidation configuration may need tuning

#### Estimated Effort

4–8 hours

---

### PF-0017: Set Up Docker Compose for PostgreSQL and Redis

**Priority**: Medium | **Effort**: M | **Sprint**: 1 | **Status**: Proposed

#### Objective

Create a Docker Compose configuration for local development that provides PostgreSQL and Redis instances matching the planned production topology.

#### Scope

- Create `docker-compose.yml` at repository root
- Configure PostgreSQL 16 with health checks and volume persistence
- Configure Redis 7 with health checks
- Add database initialization scripts directory (`infra/docker/init-scripts/`)
- Create a `scripts/dev-db.sh` convenience script for start/stop/reset
- Document in README.md

#### Deliverables

- `docker-compose.yml` with PostgreSQL and Redis
- `infra/docker/init-scripts/` directory
- `scripts/dev-db.sh` script
- README section on local database setup

#### Acceptance Criteria

- [ ] `docker compose up -d` starts PostgreSQL and Redis
- [ ] PostgreSQL is accessible on port 5432 with configured credentials
- [ ] Redis is accessible on port 6379
- [ ] Health checks pass for both services
- [ ] `docker compose down -v` cleanly removes all resources

#### Dependencies

None (Docker is an external tool).

#### Risks

- Docker Desktop licensing for commercial use
- Port conflicts with developer machines

#### Estimated Effort

4–8 hours

---

### PF-0018: Create packages/shared-utils

**Priority**: Medium | **Effort**: M | **Sprint**: 1 | **Status**: Proposed

#### Objective

Create the shared utilities package providing common functions for logging, error construction, ID generation, and date formatting used across all services and applications.

#### Scope

- Create `packages/shared-utils/` with package.json, tsconfig.json
- Implement: `generateId()` (UUID v7), `createApiError()`, `maskPii()`, `formatDate()`
- Add comprehensive unit tests
- Ensure zero dependency on other `@paymentflow/*` packages

#### Deliverables

- `packages/shared-utils/` package
- Utility functions with tests
- Barrel export (`index.ts`)

#### Acceptance Criteria

- [ ] Package builds and typechecks
- [ ] `generateId()` produces valid UUID v7 strings
- [ ] `createApiError()` produces RFC 7807 compliant error objects
- [ ] `maskPii()` correctly masks email, phone, and name fields
- [ ] All functions have unit tests with >80% coverage
- [ ] Zero runtime dependencies on other `@paymentflow/*` packages

#### Dependencies

- PF-0002 (lockfile)

#### Risks

- UUID v7 may require a runtime dependency (uuid library)

#### Estimated Effort

8–16 hours

---

### PF-0019: Create packages/validation with Zod Schemas

**Priority**: Medium | **Effort**: M | **Sprint**: 1 | **Status**: Proposed

#### Objective

Create the shared validation package containing Zod schemas that correspond to `@paymentflow/shared-types` interfaces, enabling runtime validation at API boundaries.

#### Scope

- Create `packages/validation/` with package.json, tsconfig.json
- Implement Zod schemas for: MonetaryAmount, Currency, Wallet, Payment, User (registration)
- Ensure schemas align with shared-types interfaces (type inference compatibility)
- Add unit tests validating accept/reject cases for each schema

#### Deliverables

- `packages/validation/` package
- Zod schemas matching shared-types interfaces
- Unit tests for all schemas

#### Acceptance Criteria

- [ ] Every schema infers a type compatible with its shared-types interface
- [ ] MonetaryAmount schema rejects negative amounts and invalid currencies
- [ ] Payment schema enforces idempotencyKey presence
- [ ] All schemas have accept and reject test cases
- [ ] Package depends only on `zod` and `@paymentflow/shared-types` (type-only)

#### Dependencies

- PF-0002, PF-0018

#### Risks

- Zod schema inference may not perfectly match manually-written interfaces

#### Estimated Effort

8–16 hours

---

### PF-0020: Create packages/config for Environment Parsing

**Priority**: Medium | **Effort**: M | **Sprint**: 1 | **Status**: Proposed

#### Objective

Create the configuration package that validates and parses environment variables at startup using Zod, providing type-safe configuration objects to all services.

#### Scope

- Create `packages/config/` with package.json, tsconfig.json
- Implement environment schemas for: database, Redis, auth (JWT), API gateway
- Fail fast with descriptive errors on missing or invalid configuration
- Support `.env` files for local development

#### Deliverables

- `packages/config/` package
- Environment validation schemas
- Type-safe config objects
- Unit tests

#### Acceptance Criteria

- [ ] Missing required variables cause immediate startup failure with clear error messages
- [ ] All configuration values are typed (no `string | undefined`)
- [ ] `.env` file loading works for local development
- [ ] Config objects are frozen (readonly) after parsing

#### Dependencies

- PF-0002, PF-0019

#### Risks

- None significant

#### Estimated Effort

8–16 hours

---

### PF-0021: Add VS Code Workspace Settings and Extensions

**Priority**: Low | **Effort**: S | **Sprint**: 1 | **Status**: Proposed

#### Objective

Configure VS Code workspace settings for consistent editor behavior and recommend extensions that support the project's toolchain.

#### Scope

- Populate `.vscode/settings.json` with: format on save, ESLint integration, TypeScript SDK path, file associations
- Expand `.vscode/extensions.json` with: ESLint, Prettier, Prisma, Docker, GitLens
- Create `.editorconfig` for editor-agnostic settings

#### Deliverables

- Updated `.vscode/settings.json`
- Updated `.vscode/extensions.json`
- New `.editorconfig`

#### Acceptance Criteria

- [ ] Format on save triggers Prettier
- [ ] ESLint errors appear inline in VS Code
- [ ] Recommended extensions cover project toolchain

#### Dependencies

None.

#### Risks

- None

#### Estimated Effort

1–2 hours

---

### PF-0022: Create packages/api-sdk Placeholder with Codegen Config

**Priority**: Low | **Effort**: S | **Sprint**: 1 | **Status**: Proposed

#### Objective

Set up the API SDK package with OpenAPI code generation configuration, ready to generate typed clients once API specifications are available.

#### Scope

- Create `packages/api-sdk/` with package.json, tsconfig.json
- Configure OpenAPI Generator or `openapi-typescript` for code generation
- Add generation scripts to package.json
- Create README documenting the generation workflow

#### Deliverables

- `packages/api-sdk/` package scaffold
- Code generation configuration
- README with workflow documentation

#### Acceptance Criteria

- [ ] Package exists with valid configuration
- [ ] Generation script is defined (will fail gracefully until OpenAPI spec exists)
- [ ] README documents the expected workflow

#### Dependencies

- PF-0015 (NestJS service for eventual API spec)

#### Risks

- None — placeholder only

#### Estimated Effort

2–4 hours

---

### PF-0023: Initialize Prisma in packages/database

**Priority**: High | **Effort**: L | **Sprint**: 2 | **Status**: Proposed

#### Objective

Set up Prisma ORM in `packages/database/` with the initial schema covering the identity domain (users, sessions, devices) and the ledger domain (entries, accounts).

#### Scope

- Create `packages/database/` with package.json, tsconfig.json
- Initialize Prisma with PostgreSQL provider
- Define `identity` schema: users, sessions, devices, roles
- Define `ledger` schema: accounts, entries (append-only)
- Create initial migration
- Configure Prisma Client generation
- Add seed script for development data

#### Deliverables

- `packages/database/` with Prisma configuration
- Initial schema and migration
- Prisma Client wrapper with connection pooling
- Seed script

#### Acceptance Criteria

- [ ] `pnpm --filter @paymentflow/database prisma migrate dev` succeeds against Docker PostgreSQL
- [ ] Prisma Client generates with typed models
- [ ] All tables have `id` (UUID), `createdAt`, `updatedAt` columns
- [ ] Ledger entries table has no UPDATE or DELETE operations in the client wrapper
- [ ] Seed script populates test data
- [ ] Soft-delete pattern implemented with `deletedAt` column

#### Dependencies

- PF-0017 (Docker Compose for PostgreSQL)

#### Risks

- Schema design may evolve — migrations must be reversible
- Multi-schema support in Prisma requires configuration

#### Estimated Effort

2–5 days

---

### PF-0024: Implement Identity Schema and User Model

**Priority**: High | **Effort**: L | **Sprint**: 2 | **Status**: Proposed

#### Objective

Implement the complete user domain model with status state machine, profile management, and role-based access control foundation.

#### Scope

- User model with all fields from shared-types
- User status state machine (`pending_verification → active → locked → suspended → closed`)
- Role and permission models
- User repository with CRUD operations
- Comprehensive unit and integration tests

#### Deliverables

- User domain model and repository
- State machine transition function with validation
- Role/permission models
- Tests covering all state transitions (valid and invalid)

#### Acceptance Criteria

- [ ] User status transitions follow the defined state machine exactly
- [ ] Invalid transitions throw with descriptive error messages
- [ ] All transitions are logged with previous state, new state, actor, timestamp
- [ ] Passwords are never stored in plaintext
- [ ] User queries support pagination and filtering

#### Dependencies

- PF-0023 (Prisma database)

#### Risks

- State machine edge cases (concurrent status changes)

#### Estimated Effort

2–5 days

---

### PF-0025: Implement Auth-Service Registration Endpoint

**Priority**: High | **Effort**: L | **Sprint**: 2 | **Status**: Proposed

#### Objective

Implement the user registration endpoint with Argon2id password hashing, input validation, email uniqueness checking, and idempotency support.

#### Scope

- `POST /api/v1/auth/register` endpoint
- Zod input validation (email, password policy, profile fields)
- Argon2id password hashing (memory: 64MB, iterations: 3, parallelism: 4)
- Password breach checking (Have I Been Pwned API)
- Idempotency key handling
- Email verification token generation
- RFC 7807 error responses for validation failures

#### Deliverables

- Registration endpoint with full validation pipeline
- Argon2id hashing implementation
- Idempotency middleware
- Unit and integration tests

#### Acceptance Criteria

- [ ] Registration creates user with `pending_verification` status
- [ ] Passwords hashed with Argon2id (verified by hash prefix)
- [ ] Duplicate email returns 409 Conflict
- [ ] Duplicate idempotency key returns original response
- [ ] Password under 12 characters returns 400 with field-level error
- [ ] Rate limited to 5 requests per minute

#### Dependencies

- PF-0015 (NestJS service), PF-0024 (user model)

#### Risks

- Argon2id native dependency compilation on different platforms

#### Estimated Effort

2–5 days

---

### PF-0026: Implement Auth-Service Login and Session Management

**Priority**: High | **Effort**: L | **Sprint**: 2 | **Status**: Proposed

#### Objective

Implement login, session creation, and account lockout mechanisms following the security rules defined in CLAUDE.md §6.

#### Scope

- `POST /api/v1/auth/login` endpoint
- Credential verification with timing-safe comparison
- Session creation with device fingerprinting
- Account lockout: 5 failures → 15-min lock, 10 failures → email verification required
- Login attempt logging for audit trail
- RFC 7807 error responses

#### Deliverables

- Login endpoint
- Session model and management
- Account lockout mechanism
- Login attempt audit logging

#### Acceptance Criteria

- [ ] Successful login returns JWT tokens and creates session
- [ ] Failed login increments attempt counter
- [ ] 5th failure triggers 15-minute lockout
- [ ] 10th failure requires email verification
- [ ] Lockout state resets after successful login
- [ ] Login from unrecognized device triggers challenge

#### Dependencies

- PF-0025 (registration must exist)

#### Risks

- Timing attacks on credential verification

#### Estimated Effort

2–5 days

---

### PF-0027: Implement JWT Access and Refresh Token Lifecycle

**Priority**: High | **Effort**: L | **Sprint**: 2 | **Status**: Proposed

#### Objective

Implement the complete JWT token lifecycle with RS256 signing, refresh token rotation, and token family revocation.

#### Scope

- JWT access tokens: 15-min expiry, RS256 signed, in-memory storage only
- Refresh tokens: 7-day expiry, 30-day absolute lifetime, single-use rotation
- `POST /api/v1/auth/refresh` endpoint
- Token family tracking for reuse detection
- Refresh token reuse → revoke entire family
- Token blacklisting for logout

#### Deliverables

- JWT issuance and verification service
- Refresh token rotation mechanism
- Token family tracking
- Logout endpoint (`POST /api/v1/auth/logout`)

#### Acceptance Criteria

- [ ] Access tokens expire after 15 minutes
- [ ] Refresh tokens are single-use (each use issues a new pair)
- [ ] Reusing a consumed refresh token revokes the entire family
- [ ] Logout invalidates both access and refresh tokens
- [ ] RS256 (asymmetric) signing verified
- [ ] Refresh tokens stored in httpOnly secure cookies

#### Dependencies

- PF-0026 (login and sessions)

#### Risks

- Key rotation strategy for RS256 keys
- Redis dependency for token blacklist

#### Estimated Effort

2–5 days

---

### PF-0028: Implement MFA (TOTP) Support

**Priority**: Medium | **Effort**: L | **Sprint**: 2 | **Status**: Proposed

#### Objective

Implement Time-based One-Time Password (TOTP) multi-factor authentication per RFC 6238, required for admin and business accounts.

#### Scope

- TOTP secret generation and QR code provisioning
- `POST /api/v1/auth/mfa/setup` — generate and return TOTP URI
- `POST /api/v1/auth/mfa/verify` — verify TOTP code and enable MFA
- `POST /api/v1/auth/mfa/challenge` — verify TOTP during login
- Backup codes generation (10 single-use codes)
- MFA enforcement for admin and business user roles

#### Deliverables

- TOTP implementation with RFC 6238 compliance
- MFA setup and verification endpoints
- Backup codes
- Integration with login flow

#### Acceptance Criteria

- [ ] TOTP codes validate within ±1 time step window
- [ ] MFA setup requires password re-verification
- [ ] Backup codes are single-use and hashed at rest
- [ ] Admin accounts cannot disable MFA
- [ ] Login flow prompts for MFA when enabled

#### Dependencies

- PF-0026 (login flow)

#### Risks

- Clock drift between server and client devices

#### Estimated Effort

2–5 days

---

### PF-0029: Set Up API Gateway Service with Routing and Rate Limiting

**Priority**: High | **Effort**: L | **Sprint**: 2 | **Status**: Proposed

#### Objective

Create the API gateway service that handles request routing, authentication, rate limiting, CORS, and security headers for all downstream services.

#### Scope

- Initialize `services/api-gateway/` NestJS application
- Implement request routing to downstream services
- Rate limiting: 100 req/min general, 5 req/min auth endpoints
- CORS with explicit origin allowlist
- Security headers (X-Content-Type-Options, X-Frame-Options, HSTS, CSP)
- Request/response logging with trace ID propagation
- JWT validation middleware

#### Deliverables

- `services/api-gateway/` service
- Rate limiting middleware
- CORS and security header configuration
- JWT validation guard
- Trace ID propagation

#### Acceptance Criteria

- [ ] Routes proxy to downstream services correctly
- [ ] Rate limiting enforced (verified with test)
- [ ] Security headers present on all responses
- [ ] Invalid JWT returns 401
- [ ] Trace ID assigned to requests without one
- [ ] CORS rejects non-allowlisted origins

#### Dependencies

- PF-0015 (NestJS scaffold)

#### Risks

- Latency overhead of gateway layer
- Configuration complexity for routing rules

#### Estimated Effort

2–5 days

---

### PF-0030: Configure Structured Logging with Pino

**Priority**: Medium | **Effort**: M | **Sprint**: 3 | **Status**: Proposed

#### Objective

Implement structured JSON logging across all services using pino, with consistent fields, PII masking, and appropriate log levels.

#### Scope

- Add pino to `packages/shared-utils` as a configured logger factory
- Configure JSON transport for production, pretty-print for development
- Ensure every log includes: `timestamp`, `level`, `service`, `traceId`, `message`
- Implement PII redaction (email, phone, name masking)
- Configure log levels per environment

#### Deliverables

- Logger factory in `packages/shared-utils`
- PII redaction middleware
- Per-service logger configuration
- Documentation

#### Acceptance Criteria

- [ ] All log output is structured JSON in production mode
- [ ] PII fields are automatically masked in log output
- [ ] Every log entry includes timestamp, level, service, traceId
- [ ] Debug logs suppressed in production
- [ ] Logger is injectable in NestJS services

#### Dependencies

- PF-0015 (NestJS services)

#### Risks

- Performance impact of serialization on hot paths

#### Estimated Effort

4–8 hours

---

### PF-0031: Implement Distributed Tracing (W3C Trace Context)

**Priority**: Medium | **Effort**: M | **Sprint**: 3 | **Status**: Proposed

#### Objective

Implement W3C Trace Context propagation across all services for distributed request tracing.

#### Scope

- `X-Trace-Id` generation at API gateway for requests without one
- Trace context propagation through inter-service HTTP calls
- Trace ID inclusion in all log entries
- Trace ID inclusion in error responses (for support ticket reference)

#### Deliverables

- Trace context middleware for NestJS
- HTTP client interceptor for trace propagation
- Integration with structured logging

#### Acceptance Criteria

- [ ] Every inbound request has a trace ID (generated if missing)
- [ ] Trace ID propagated to all downstream service calls
- [ ] Trace ID appears in all log entries for a request
- [ ] Error responses include traceId field

#### Dependencies

- PF-0029 (API gateway), PF-0030 (structured logging)

#### Risks

- None significant

#### Estimated Effort

4–8 hours

---

### PF-0032: Add Health Check and Readiness Endpoints

**Priority**: Medium | **Effort**: S | **Sprint**: 3 | **Status**: Proposed

#### Objective

Implement liveness and readiness health check endpoints on all services for Kubernetes orchestration.

#### Scope

- `GET /health` — liveness probe (process running, not deadlocked)
- `GET /ready` — readiness probe (DB, Redis, Kafka connections verified)
- Standardized response format with dependency status
- Configurable timeout for dependency checks

#### Deliverables

- Health check module for NestJS (reusable across services)
- Endpoint implementations on auth-service and api-gateway
- Response format documentation

#### Acceptance Criteria

- [ ] `/health` returns 200 when process is running
- [ ] `/ready` returns 200 only when all dependencies are reachable
- [ ] `/ready` returns 503 with details when a dependency is down
- [ ] Response includes service name, version, uptime

#### Dependencies

- PF-0015 (NestJS services), PF-0029 (API gateway)

#### Risks

- None

#### Estimated Effort

2–4 hours

---

### PF-0033: Create OpenAPI Specification and Documentation

**Priority**: Medium | **Effort**: M | **Sprint**: 3 | **Status**: Proposed

#### Objective

Generate OpenAPI 3.1 specifications from NestJS decorators and serve interactive API documentation.

#### Scope

- Configure `@nestjs/swagger` on auth-service and api-gateway
- Add OpenAPI decorators to all endpoints
- Serve Swagger UI at `/api/docs` in development
- Export OpenAPI JSON/YAML for SDK generation

#### Deliverables

- OpenAPI decorators on all implemented endpoints
- Swagger UI accessible in development
- Exportable OpenAPI specification files

#### Acceptance Criteria

- [ ] All endpoints documented with request/response schemas
- [ ] Swagger UI accessible at `/api/docs`
- [ ] OpenAPI spec validates against OpenAPI 3.1 standard
- [ ] Spec includes authentication requirements

#### Dependencies

- PF-0025 (registration endpoint), PF-0029 (API gateway)

#### Risks

- Decorator maintenance burden

#### Estimated Effort

4–8 hours

---

### PF-0034: Set Up Integration Test Infrastructure

**Priority**: High | **Effort**: L | **Sprint**: 3 | **Status**: Proposed

#### Objective

Create the integration test infrastructure using real PostgreSQL and Redis instances (via Docker) for testing service boundaries, database queries, and inter-service communication.

#### Scope

- Configure test containers or Docker Compose for test databases
- Create test database setup/teardown utilities
- Implement test factories for domain entities (User, Wallet, Payment)
- Configure separate test database with automatic migration
- Add integration test scripts to CI pipeline

#### Deliverables

- Integration test infrastructure
- Test factories
- CI pipeline integration
- Documentation

#### Acceptance Criteria

- [ ] Integration tests run against real PostgreSQL
- [ ] Test database is created and migrated automatically
- [ ] Test factories produce valid domain entities
- [ ] Tests are isolated (no cross-test state leakage)
- [ ] CI pipeline runs integration tests

#### Dependencies

- PF-0017 (Docker Compose), PF-0023 (Prisma database)

#### Risks

- CI Docker-in-Docker configuration complexity
- Test isolation with shared database

#### Estimated Effort

2–5 days

---

### PF-0035: Implement E2E Test Framework with Playwright

**Priority**: Medium | **Effort**: L | **Sprint**: 3 | **Status**: Proposed

#### Objective

Set up Playwright for end-to-end testing of critical user journeys through the web application.

#### Scope

- Install and configure Playwright
- Create test helpers for authentication, navigation
- Implement E2E tests for: registration flow, login flow, dashboard access
- Configure CI to run E2E tests
- Add visual regression testing (optional)

#### Deliverables

- Playwright configuration
- E2E test helpers
- Critical journey test suites
- CI integration

#### Acceptance Criteria

- [ ] Playwright runs against the web application
- [ ] Registration → email verification → login journey passes
- [ ] Tests run in CI with headed browser
- [ ] Test reports generated with screenshots on failure

#### Dependencies

- PF-0014 (Next.js app), PF-0034 (integration test infra)

#### Risks

- E2E test flakiness
- CI browser installation

#### Estimated Effort

2–5 days

---

### PF-0036: Configure Multi-Stage CI/CD Pipeline

**Priority**: High | **Effort**: L | **Sprint**: 4 | **Status**: Proposed

#### Objective

Upgrade the GitHub Actions CI pipeline from a single lint/typecheck/test job to a multi-stage pipeline with build, security scanning, integration tests, and deployment stages.

#### Scope

- Separate jobs: lint, typecheck, unit test, build, integration test, security scan
- Parallel execution where possible
- Turborepo cache integration in CI
- Artifact upload for build outputs
- Branch protection rules for main
- Deployment stages for staging and production (manual gate)

#### Deliverables

- Updated `.github/workflows/ci.yml`
- New `.github/workflows/deploy.yml`
- Branch protection configuration documentation

#### Acceptance Criteria

- [ ] Pipeline stages execute in correct dependency order
- [ ] Lint, typecheck, and unit tests run in parallel
- [ ] Integration tests run after build succeeds
- [ ] Security scan (`pnpm audit`) blocks on high/critical findings
- [ ] Turborepo cache reduces CI duration
- [ ] Deployment requires manual approval for production

#### Dependencies

- PF-0016 (Turborepo)

#### Risks

- CI duration may exceed free-tier limits
- Cache configuration complexity

#### Estimated Effort

2–5 days

---

### PF-0037: Set Up Container Builds and Registry

**Priority**: Medium | **Effort**: M | **Sprint**: 4 | **Status**: Proposed

#### Objective

Create Dockerfiles for all services and configure a container registry for image storage and deployment.

#### Scope

- Multi-stage Dockerfiles for auth-service and api-gateway
- Base image with shared dependencies
- Docker build optimization (layer caching, .dockerignore)
- GitHub Container Registry (ghcr.io) configuration
- CI job for building and pushing images on merge to main

#### Deliverables

- `infra/docker/` Dockerfiles
- `.dockerignore` files
- CI job for image building
- Container registry configuration

#### Acceptance Criteria

- [ ] Docker images build successfully for all services
- [ ] Multi-stage builds produce minimal production images
- [ ] Images are tagged with git SHA and semantic version
- [ ] Images pushed to registry on merge to main

#### Dependencies

- PF-0017 (Docker Compose), PF-0036 (CI pipeline)

#### Risks

- Image size optimization
- Registry access configuration

#### Estimated Effort

4–8 hours

---

### PF-0038: Implement CORS, CSRF, and Security Headers

**Priority**: High | **Effort**: M | **Sprint**: 4 | **Status**: Proposed

#### Objective

Harden the API gateway with comprehensive security middleware covering CORS, CSRF protection, and security response headers.

#### Scope

- CORS: explicit origin allowlist per environment (never `*` in production)
- CSRF: token-based protection on all state-changing endpoints
- Security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Strict-Transport-Security`, `Content-Security-Policy`
- Helmet.js integration for NestJS
- Configuration per environment (local, development, staging, production)

#### Deliverables

- CORS middleware with environment-aware configuration
- CSRF protection middleware
- Security headers via Helmet.js
- Per-environment configuration

#### Acceptance Criteria

- [ ] CORS rejects requests from non-allowlisted origins
- [ ] CSRF token required on POST/PUT/PATCH/DELETE
- [ ] All security headers present on every response
- [ ] No `Access-Control-Allow-Origin: *` in staging or production configs
- [ ] Configuration documented in `.env.example`

#### Dependencies

- PF-0029 (API gateway)

#### Risks

- CSRF configuration with JWT-based auth (stateless vs stateful tokens)

#### Estimated Effort

4–8 hours

---

### PF-0039: Conduct Security Audit and Remediation

**Priority**: High | **Effort**: L | **Sprint**: 4 | **Status**: Proposed

#### Objective

Perform a comprehensive security audit of the codebase covering dependency vulnerabilities, code patterns, secrets management, and authentication flows.

#### Scope

- `pnpm audit` for dependency vulnerabilities
- Static analysis for security anti-patterns (eval, innerHTML, SQL concatenation)
- Secrets scanning (git history, config files)
- Authentication flow review (timing attacks, token handling)
- Input validation completeness review
- OWASP Top 10 checklist verification

#### Deliverables

- Security audit report
- Remediation tickets for any findings
- Updated `pnpm audit` configuration
- Secrets scanning configuration (e.g., trufflehog, gitleaks)

#### Acceptance Criteria

- [ ] `pnpm audit` returns zero high/critical vulnerabilities
- [ ] No secrets found in git history
- [ ] No security anti-patterns in codebase
- [ ] OWASP Top 10 checklist completed
- [ ] All findings documented with remediation status

#### Dependencies

- PF-0038 (security headers must be in place)

#### Risks

- Historical secrets in git history (may require history rewrite)

#### Estimated Effort

2–5 days

---

### PF-0040: Production Deployment Configuration

**Priority**: High | **Effort**: XL | **Sprint**: 4 | **Status**: Proposed

#### Objective

Create the complete production deployment infrastructure configuration including Kubernetes manifests, Helm charts, and Terraform modules for cloud infrastructure.

#### Scope

- Kubernetes manifests for all services (Deployment, Service, Ingress, ConfigMap, Secret)
- Helm chart for parameterized deployment
- Terraform modules for cloud infrastructure (database, cache, networking, DNS)
- Environment-specific value files (staging, production)
- Horizontal Pod Autoscaler configuration
- Network policies for inter-service communication

#### Deliverables

- `infra/kubernetes/` manifests
- `infra/helm/` chart
- `infra/terraform/` modules
- Deployment documentation

#### Acceptance Criteria

- [ ] `helm install` deploys all services to a Kubernetes cluster
- [ ] Terraform provisions required cloud infrastructure
- [ ] Services communicate through internal networking only
- [ ] Secrets managed through Kubernetes Secrets / external vault
- [ ] HPA configured for auto-scaling based on CPU/memory
- [ ] Rollback procedure documented and tested

#### Dependencies

- PF-0037 (container builds), PF-0039 (security audit)

#### Risks

- Cloud provider-specific configuration
- Cost estimation for infrastructure
- Complexity of Terraform state management

#### Estimated Effort

1–2 weeks

---

## Footer

| Field | Value |
|-------|-------|
| **Current Repository State** | M0 partially complete — CI broken, component duplication, missing lockfile |
| **Current Engineering Phase** | Phase 0 — Engineering Foundation |
| **Next Recommended Ticket** | PF-0002: Generate and commit pnpm-lock.yaml |
| **Repository Maturity** | Pre-alpha — 4.0/10 audit score |
| **Total Tickets** | 39 (PF-0002 through PF-0040) |
| **Critical Tickets** | 2 |
| **High Tickets** | 16 |
| **Medium Tickets** | 17 |
| **Low Tickets** | 4 |
| **Last Updated** | 2026-07-13 |
