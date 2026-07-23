# Ticket Review — PF-{NUMBER}

## Metadata

| Field | Value |
|-------|-------|
| **Ticket ID** | PF-{NUMBER} |
| **Title** | |
| **Sprint** | Sprint {N} |
| **Milestone** | M{N} |
| **Author** | |
| **Reviewer** | |
| **Review Date** | YYYY-MM-DD |
| **PR Link** | |
| **Status** | `APPROVED` / `CHANGES_REQUESTED` / `BLOCKED` |

---

## 1. Ticket Summary

> One-paragraph description of the ticket's intent and scope.

---

## 2. Requirements Checklist

> Verify each acceptance criterion from the ticket specification.

| # | Acceptance Criterion | Met? | Evidence |
|---|---------------------|------|----------|
| 1 | | Yes / No / Partial | |
| 2 | | Yes / No / Partial | |
| 3 | | Yes / No / Partial | |
| 4 | | Yes / No / Partial | |
| 5 | | Yes / No / Partial | |

**Verdict**: All criteria met / Gaps identified

---

## 3. Code Quality

### Type Safety

- [ ] No `any` types introduced
- [ ] No unsafe type assertions without runtime checks
- [ ] Strict mode compliance verified
- [ ] All exported functions have explicit return types
- [ ] `import type` used for type-only imports

### Standards Compliance

- [ ] Named exports only (no default exports)
- [ ] Import order follows convention (node → external → internal → relative)
- [ ] Naming conventions followed (CLAUDE.md §5)
- [ ] No forbidden patterns (CLAUDE.md §16)
- [ ] No `console.log` in production code
- [ ] No hardcoded URLs, secrets, or environment-specific values

### Error Handling

- [ ] RFC 7807 error format for API errors
- [ ] No stack traces leaked to clients
- [ ] Appropriate HTTP status codes
- [ ] Input validation at API boundary with Zod schemas

---

## 4. Architecture Compliance

- [ ] Follows domain boundaries (SDD.md)
- [ ] No cross-service table joins or direct imports
- [ ] Package dependency rules respected (CLAUDE.md §12)
- [ ] Event-driven communication where specified
- [ ] Ledger-first write pattern for financial mutations
- [ ] Idempotency implemented on mutation endpoints
- [ ] State machine transitions validated

**Deviations (if any)**:

---

## 5. Security

- [ ] No secrets in code or config
- [ ] No `eval()`, `new Function()`, or `innerHTML`
- [ ] No SQL concatenation — parameterized queries only
- [ ] PII masked in all log statements
- [ ] Input validated and sanitized at boundary
- [ ] Dependencies audited — no new high/critical vulnerabilities

**Concerns raised**:

---

## 6. Testing

| Metric | Required | Actual | Pass? |
|--------|----------|--------|-------|
| Statement coverage | 80% | | |
| Branch coverage | 70% | | |
| Function coverage | 80% | | |
| Line coverage | 80% | | |

- [ ] Unit tests cover business logic and edge cases
- [ ] Integration tests cover service boundaries (if applicable)
- [ ] Financial calculations tested with edge cases
- [ ] State machine transitions tested (valid + invalid)
- [ ] Idempotency tested (if applicable)
- [ ] No test depends on another test's state
- [ ] Tests have descriptive names

---

## 7. Performance

- [ ] No N+1 queries
- [ ] Pagination implemented on list endpoints
- [ ] No `SELECT *`
- [ ] External calls have timeouts
- [ ] No synchronous I/O on hot path

**Concerns raised**:

---

## 8. Documentation

- [ ] API changes reflected in OpenAPI spec (if applicable)
- [ ] Architecture decisions recorded in ADR (if applicable)
- [ ] CHANGELOG.md updated under `[Unreleased]`
- [ ] Breaking changes documented with migration path
- [ ] README updated (if public interface changed)

---

## 9. CI/CD Verification

```bash
pnpm lint        # ✓ / ✗
pnpm typecheck   # ✓ / ✗
pnpm test        # ✓ / ✗
pnpm audit       # ✓ / ✗
```

---

## 10. Definition of Done

> Cross-reference with `docs/governance/DEFINITION-OF-DONE.md`.

- [ ] Code builds without errors
- [ ] Code lints without errors or warnings
- [ ] Code typechecks without errors
- [ ] Tests pass with required coverage thresholds
- [ ] Documentation updated
- [ ] Security reviewed
- [ ] No TODOs or placeholder code
- [ ] No `@ts-ignore` or `eslint-disable` directives
- [ ] Commit messages follow Conventional Commits
- [ ] Ready to merge to `main`

---

## 11. Assessment

### Strengths

1.
2.
3.

### Issues Found

| # | Severity | Description | Action Required |
|---|----------|-------------|-----------------|
| 1 | Critical / High / Medium / Low | | |
| 2 | | | |

### Decision

- [ ] **APPROVED** — Merge immediately
- [ ] **APPROVED WITH NOTES** — Merge, address notes in follow-up ticket
- [ ] **CHANGES REQUESTED** — Address issues before re-review
- [ ] **BLOCKED** — Cannot proceed until dependency resolved

### Follow-up Tickets

| Ticket ID | Title | Priority |
|-----------|-------|----------|
| | | |

---

## Reviewer Signature

**Reviewed by**: ___________________________
**Date**: ___________________________
**Time spent**: ___________________________
