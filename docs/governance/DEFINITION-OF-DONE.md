# Definition of Done

> This document defines the engineering contract that every ticket, PR, and deliverable must
> satisfy before it can be considered complete. No ticket moves to `Done` unless every
> applicable requirement below is met.

---

## Document Control

| Field | Value |
|-------|-------|
| **Owner** | Principal Software Engineer |
| **Last Updated** | 2026-07-13 |
| **Version** | 1.0 |
| **Applies To** | All tickets in ENGINEERING-BACKLOG.md |
| **Enforcement** | Manual review against this checklist on every PR |

---

## The Ten Requirements

Every requirement below must be satisfied. If a requirement is not applicable to a specific
ticket type (e.g., documentation-only tickets don't produce runtime code), mark it N/A with
a justification in the PR description.

---

### 1. Builds

**The code compiles and builds without errors.**

| Check | Command | Pass Criteria |
|-------|---------|---------------|
| TypeScript compilation | `pnpm typecheck` | Zero errors |
| Package build (if applicable) | `pnpm build` | Exit code 0 |
| No circular dependencies | `madge --circular` (when configured) | Zero cycles |

**What this means:**
- `strict: true` and `noUncheckedIndexedAccess: true` must remain enabled.
- No `// @ts-ignore` or `// @ts-expect-error` directives without a linked tracking issue.
- All type errors are resolved, not suppressed.
- Build output is deterministic — same source produces same output.

**Failure mode:** If the build fails on `main` after merge, the author must fix it within
one business hour or the commit is reverted.

---

### 2. Lints

**The code passes all lint rules without errors or warnings.**

| Check | Command | Pass Criteria |
|-------|---------|---------------|
| ESLint | `pnpm lint` | Zero errors, zero warnings |
| Prettier formatting | `pnpm format:check` (when configured) | All files formatted |

**What this means:**
- No `eslint-disable` comments without a justification comment and linked tracking issue.
- No new lint warnings introduced — the codebase trends toward zero warnings.
- Import order follows convention: node builtins → external → `@paymentflow/*` → relative.
- Named exports only — no default exports.

**Enforcement escalation:**
- `no-explicit-any` will be escalated from `warn` to `error` (see PF-0005).
- New lint rules may be added per sprint — check `.eslintrc.js` for current rules.

---

### 3. Typechecks

**The code satisfies the TypeScript compiler under strict mode.**

| Check | Command | Pass Criteria |
|-------|---------|---------------|
| Strict typecheck | `pnpm typecheck` | Zero errors |

**What this means:**
- `any` is prohibited. Use `unknown` with type narrowing.
- `as` type assertions require an immediately preceding runtime type check.
- All exported functions have explicit return types.
- `import type` used for type-only imports.
- Generic constraints are preferred over type assertions.
- Discriminated unions are preferred over boolean flags.

**Prohibited patterns:**
```typescript
// NEVER
const x: any = ...
const y = value as SomeType  // without preceding runtime check
// @ts-ignore
// @ts-expect-error

// ALWAYS
const x: unknown = ...
if (isSomeType(x)) { /* x is narrowed */ }
```

---

### 4. Tests

**All tests pass and coverage thresholds are met.**

| Metric | Threshold | Command |
|--------|-----------|---------|
| Statement coverage | ≥ 80% | `pnpm test --coverage` |
| Branch coverage | ≥ 70% | `pnpm test --coverage` |
| Function coverage | ≥ 80% | `pnpm test --coverage` |
| Line coverage | ≥ 80% | `pnpm test --coverage` |
| All tests pass | 100% | `pnpm test` |

**What this means:**
- Every new function, component, or endpoint has corresponding tests.
- Tests are co-located with source files: `Button.tsx` → `Button.test.tsx`.
- Test names are descriptive: `it('rejects payment when wallet is frozen')`.
- No test depends on another test's state or execution order.
- Financial calculations are tested with edge cases: zero, maximum, rounding, negative.
- State machine transitions are tested: valid transitions succeed, invalid transitions throw.
- Idempotency is tested: duplicate requests return the same result.

**What to test by component type:**

| Type | Required Tests |
|------|---------------|
| UI component | Renders, variants, accessibility (ARIA), event handlers, className pass-through |
| API endpoint | Success, validation errors, auth/authz, idempotency, rate limiting |
| Business logic | Happy path, edge cases, error cases, state transitions |
| Database query | Correct results, pagination, filtering |
| Utility function | Pure function behavior, edge cases, type narrowing |

---

### 5. Documentation Updated

**All documentation affected by the change is updated.**

| Check | Criteria |
|-------|----------|
| CHANGELOG.md | Entry added under `[Unreleased]` with category and description |
| API documentation | OpenAPI spec updated if endpoints changed |
| ADR created | If an architecture decision was made (use `docs/decisions/ADR-TEMPLATE.md`) |
| README updated | If public interfaces, setup steps, or configuration changed |
| Code comments | Only when WHY is non-obvious — no WHAT comments |
| Migration guide | If breaking changes are introduced |

**What this means:**
- Documentation changes are part of the same PR, not a follow-up.
- CHANGELOG entries use Keep a Changelog format and Conventional Commit categories.
- No multi-paragraph docstrings or comment blocks — one short line maximum.
- Comments explain WHY, never WHAT. Well-named identifiers explain WHAT.

---

### 6. Security Reviewed

**The change has been reviewed for security implications.**

| Check | Criteria |
|-------|----------|
| No secrets in code | No API keys, passwords, tokens, or connection strings in source |
| No dangerous APIs | No `eval()`, `new Function()`, `innerHTML`, `dangerouslySetInnerHTML` |
| No SQL injection | Parameterized queries or ORM only — never string concatenation |
| No PII in logs | Emails, phones, names, financial data masked in all log statements |
| Input validation | All user input validated at API boundary with Zod schemas |
| Dependencies clean | `pnpm audit` passes with zero high/critical vulnerabilities |
| CORS configured | Explicit origin allowlist, never `*` in production |

**Escalation triggers** — any of these require explicit security sign-off:
- Changes to authentication or authorization logic
- Changes to encryption, hashing, or token handling
- New external API integrations
- Changes to input validation or sanitization
- New file upload handling
- Changes to CORS, CSP, or security headers
- Addition of security-sensitive dependencies

---

### 7. CTO Approved

**The change has been reviewed and approved by the engineering lead.**

| Review Type | When Required |
|-------------|---------------|
| Standard review | Every PR |
| Architecture review | Changes to service boundaries, data models, or shared types |
| Security review | Changes to auth, encryption, or data handling |
| Performance review | Changes to hot paths, database queries, or caching |

**Review process:**
1. Author opens PR with description: what changed, why, how to test.
2. CI must pass before review is requested.
3. Reviewer uses `docs/reviews/REVIEW-TEMPLATE.md` or `docs/governance/CTO-REVIEW-TEMPLATE.md`.
4. All review comments must be resolved (not just acknowledged) before merge.
5. Re-review required if changes are made after approval.

**Review SLA:**
- Standard PRs: reviewed within 1 business day.
- Critical/blocking PRs: reviewed within 4 hours.
- Security-sensitive PRs: reviewed within 4 hours with security checklist.

---

### 8. No TODOs

**No TODO, FIXME, HACK, or XXX comments remain in the changed code.**

| Pattern | Policy |
|---------|--------|
| `TODO` | Not permitted in merged code. Create a backlog ticket instead. |
| `FIXME` | Not permitted. Fix it now or create a ticket. |
| `HACK` | Not permitted. Find the proper solution. |
| `XXX` | Not permitted. Address the concern or document in an ADR. |
| `@ts-expect-error` | Only with a linked tracking issue (e.g., `// @ts-expect-error PF-0099`) |
| `eslint-disable` | Only with a linked tracking issue and justification comment |

**What this means:**
- If you discover technical debt during implementation, create a backlog ticket.
- Reference the ticket ID in the PR description, not in a code comment.
- Temporary workarounds must have a ticket, an owner, and a target sprint for resolution.

---

### 9. No Placeholder Code

**All code is complete, functional, and production-ready.**

| Pattern | Policy |
|---------|--------|
| Empty function bodies | Not permitted — implement or remove |
| `throw new Error('Not implemented')` | Not permitted — implement or remove |
| `return null // placeholder` | Not permitted — implement or remove |
| Commented-out code | Not permitted — delete it (git has history) |
| Unused imports | Not permitted — remove them |
| Unused variables | Not permitted — remove them (no `_` prefix workarounds) |
| Dead code paths | Not permitted — remove unreachable code |
| Prototype code | Not permitted in `packages/` or `services/` |

**What this means:**
- Every function does what its signature promises.
- Every component renders meaningful output.
- Every test asserts meaningful behavior.
- If a feature is partially implemented, the incomplete parts are not merged.
- Scaffolding and placeholder directories are acceptable only when explicitly defined
  in a milestone spec (e.g., `apps/web/` as a workspace placeholder).

---

### 10. Ready to Merge

**The PR is in a mergeable state with no outstanding blockers.**

| Check | Criteria |
|-------|----------|
| Branch is up to date | Rebased or merged with `main` — no conflicts |
| CI pipeline passes | All stages green: lint, typecheck, test |
| Review approved | At least one approval with no outstanding change requests |
| Commit messages clean | Conventional Commits format, squashed if needed |
| No unrelated changes | One logical change per PR |
| PR description complete | What changed, why, how to test |
| Linked tickets | PR references ticket ID(s) in description |

**Merge protocol:**
1. Squash and merge for feature branches (clean history on `main`).
2. Merge commit for release branches (preserve branch history).
3. Delete the branch after merge.
4. Verify `main` CI passes after merge.

---

## Applicability Matrix

Not every requirement applies to every ticket type. Use this matrix to determine which
requirements are mandatory (M), recommended (R), or not applicable (N/A).

| Requirement | Feature | Bug Fix | Refactor | Docs | Config/CI | Security |
|-------------|---------|---------|----------|------|-----------|----------|
| 1. Builds | M | M | M | N/A | M | M |
| 2. Lints | M | M | M | N/A | M | M |
| 3. Typechecks | M | M | M | N/A | M | M |
| 4. Tests | M | M | M | N/A | R | M |
| 5. Documentation | M | R | R | M | R | M |
| 6. Security | M | M | R | N/A | M | M |
| 7. CTO Approved | M | M | M | R | M | M |
| 8. No TODOs | M | M | M | M | M | M |
| 9. No Placeholder | M | M | M | N/A | M | M |
| 10. Ready to Merge | M | M | M | M | M | M |

---

## Exceptions

Exceptions to the Definition of Done are permitted only when:

1. **Documented** — The exception is noted in the PR description with a justification.
2. **Tracked** — A follow-up ticket is created to address the gap.
3. **Time-bound** — The follow-up ticket is assigned to a specific sprint (not "someday").
4. **Approved** — The reviewer explicitly acknowledges and approves the exception.

Exceptions must never compromise:
- Type safety (requirements 1, 3)
- Security (requirement 6)
- Test coverage below thresholds (requirement 4)

---

## Enforcement

| Enforcement Layer | Mechanism | Status |
|-------------------|-----------|--------|
| Pre-commit hooks | Husky + lint-staged (lint, format) | Planned (PF-0007) |
| CI pipeline | GitHub Actions (lint, typecheck, test) | Active |
| PR review | Manual checklist against this document | Active |
| Post-merge | Verify `main` CI passes | Active |
| Periodic audit | Repository baseline snapshot | Planned (quarterly) |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-13 | Engineering | Initial Definition of Done |
