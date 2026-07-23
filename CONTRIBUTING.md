# Contributing to PaymentFlow AI

## Prerequisites

- Node.js >= 20
- pnpm >= 9

## Getting Started

```bash
git clone <repository-url>
cd paymentflow-ai
pnpm install
```

## Development Workflow

1. Create a branch from `main`:
   ```bash
   git checkout -b feat/M0-description
   ```

2. Make your changes and verify:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   ```

3. Commit using Conventional Commits:
   ```bash
   git commit -m "feat(scope): description"
   ```

4. Push and open a PR against `main`.

## Commit Convention

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) via commitlint.

**Format**: `type(scope): description`

**Types**: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`, `style`, `perf`, `revert`

**Scopes**: Use the package or service name (`ui`, `shared-types`, `auth`, `payment`, etc.)

## Branch Naming

```
feat/M{n}-short-description
fix/M{n}-short-description
chore/short-description
docs/short-description
```

## Pull Requests

- One logical change per PR
- CI must pass (lint, typecheck, test)
- Include a description of what changed, why, and how to test
- Update `CHANGELOG.md` under `[Unreleased]`

## Code Standards

See `docs/governance/ENGINEERING-STANDARDS.md` for the complete engineering standards.

Key rules:
- TypeScript strict mode — no `any`, no unsafe assertions
- Named exports only — no default exports
- Tests required for all new code
- RFC 7807 error format for APIs
- `MonetaryAmount` type for all financial values — never floating-point

## Definition of Done

Every PR must satisfy the Definition of Done before merge.
See `docs/governance/DEFINITION-OF-DONE.md`.
