# PF-{NUMBER}: {Title}

## Metadata

| Field | Value |
|-------|-------|
| **Ticket ID** | PF-{NUMBER} |
| **Title** | |
| **Type** | `Governance` / `Engineering` / `Product` / `Infrastructure` / `Security` |
| **Priority** | `Critical` / `High` / `Medium` / `Low` |
| **Severity** | `S1 — System Down` / `S2 — Major Degradation` / `S3 — Minor Impact` / `S4 — Cosmetic` |
| **Sprint** | Sprint {N} |
| **Milestone** | M{N} |
| **Status** | `Backlog` / `Ready` / `In Progress` / `In Review` / `Blocked` / `Done` / `Cancelled` |
| **Owner** | |
| **Assignee** | |
| **Created** | YYYY-MM-DD |
| **Updated** | YYYY-MM-DD |
| **Completed** | YYYY-MM-DD |
| **Estimated Effort** | `XS (<2h)` / `S (2–4h)` / `M (4–8h)` / `L (1–2d)` / `XL (3–5d)` |
| **Actual Effort** | |
| **PR Link** | |
| **Branch** | |

---

## Dependencies

| Dependency | Ticket | Status | Blocking? |
|------------|--------|--------|-----------|
| | PF-{NUMBER} | | Yes / No |
| | PF-{NUMBER} | | Yes / No |

**Blocked by**: None / PF-{NUMBER}
**Blocks**: None / PF-{NUMBER}

---

## 1. Objective

> One-sentence statement of what this ticket accomplishes and why it matters.

---

## 2. Background

> Context that a reviewer or future contributor needs to understand this work.
> Reference relevant architecture decisions, incidents, user feedback, or business drivers.
> Link to related ADRs, milestone docs, or external resources.

---

## 3. Scope

### In Scope

-
-
-

### Out of Scope

> Explicitly state what this ticket does NOT cover to prevent scope creep.

-
-
-

---

## 4. Technical Requirements

> Specific technical constraints, patterns, or approaches that must be followed.

| Requirement | Detail | Source |
|-------------|--------|--------|
| | | CLAUDE.md §{N} / SDD / ADR-{N} |
| | | |
| | | |

### Architecture Constraints

- [ ] Follows domain boundaries (SDD.md)
- [ ] No cross-service table joins or direct imports
- [ ] Package dependency rules respected (CLAUDE.md §12)
- [ ] Event-driven communication where specified
- [ ] Ledger-first write pattern (if financial mutation)
- [ ] Idempotency required (if mutation endpoint)

### Technology Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| | | |
| | | |

---

## 5. Deliverables

> Concrete artifacts this ticket produces. Each deliverable should be independently verifiable.

| # | Deliverable | Type | Location |
|---|-------------|------|----------|
| 1 | | File / Config / Service / Test / Doc | `path/to/file` |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

---

## 6. Acceptance Criteria

> Specific, testable conditions that must all be true for this ticket to be considered complete.
> Use Given/When/Then format where applicable.

| # | Criterion | Verification Method |
|---|-----------|-------------------|
| 1 | | Manual / Automated test / CI check / Code review |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

---

## 7. Validation Commands

> Commands that prove the deliverables work. These will be run during review.

```bash
# Build verification
pnpm typecheck
pnpm lint
pnpm test

# Feature-specific validation
# {describe what to run and expected output}
```

**Expected results:**
- All commands exit with code 0
-

---

## 8. Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| 1 | | Low / Medium / High | Low / Medium / High | |
| 2 | | | | |
| 3 | | | | |

---

## 9. Rollback Plan

> How to reverse this change if it causes problems in production or on `main`.

| Step | Action | Command / Procedure |
|------|--------|-------------------|
| 1 | | |
| 2 | | |
| 3 | | |

**Rollback complexity**: Simple (revert commit) / Moderate (migration rollback) / Complex (data cleanup required)

**Rollback window**: Immediate / Within 1 hour / Requires coordination

---

## 10. Definition of Done Checklist

> All items must be checked before moving to `Done`. Reference: `docs/governance/DEFINITION-OF-DONE.md`

- [ ] Code builds without errors (`pnpm typecheck`)
- [ ] Code lints without errors or warnings (`pnpm lint`)
- [ ] Code typechecks under strict mode
- [ ] Tests pass with required coverage thresholds (`pnpm test`)
- [ ] Documentation updated (CHANGELOG.md, API docs, README if applicable)
- [ ] Security reviewed — no secrets, no dangerous APIs, no SQL concatenation
- [ ] CTO review completed (if applicable)
- [ ] No TODOs, placeholder code, or commented-out blocks
- [ ] No `@ts-ignore`, `eslint-disable`, or `any` types
- [ ] Commit messages follow Conventional Commits format
- [ ] Ready to merge to `main`

---

## 11. CTO Review Notes

> Completed by the reviewing engineer after implementation. Use `docs/governance/CTO-REVIEW-TEMPLATE.md` for full review.

**Review Date**: YYYY-MM-DD
**Reviewer**:

### Assessment

- [ ] Requirements met
- [ ] Architecture compliant
- [ ] Code quality acceptable
- [ ] Security reviewed
- [ ] Tests adequate
- [ ] Performance acceptable

### Issues Found

| # | Severity | Description | Resolution |
|---|----------|-------------|------------|
| | | | |

### Decision

- [ ] **APPROVED** — Merge
- [ ] **CHANGES REQUESTED** — Revise and re-review
- [ ] **BLOCKED** — Cannot proceed

---

## 12. Implementation Notes

> Completed by the implementer during or after development. Capture decisions made,
> deviations from the original plan, lessons learned, and anything a future reader should know.

### Approach Taken

> Brief description of the implementation approach and any deviations from the original plan.

### Key Decisions Made

| Decision | Rationale | ADR Created? |
|----------|-----------|-------------|
| | | Yes (ADR-{N}) / No |
| | | |

### Lessons Learned

-

---

## 13. Completion Summary

> Filled when the ticket moves to `Done`. Provides a permanent record of what was delivered.

| Field | Value |
|-------|-------|
| **Completed Date** | YYYY-MM-DD |
| **Actual Effort** | |
| **Lines Changed** | +{added} / -{removed} |
| **Files Changed** | {count} |
| **Tests Added** | {count} |
| **Commits** | {count} |
| **Final PR** | #{number} |

### Deliverables Completed

| # | Deliverable | Delivered? | Notes |
|---|-------------|-----------|-------|
| 1 | | Yes / Partial / No | |
| 2 | | | |
| 3 | | | |

### Follow-up Tickets Created

| Ticket ID | Title | Priority | Reason |
|-----------|-------|----------|--------|
| PF-{NUMBER} | | | Discovered during implementation / Deferred scope |
| | | | |
