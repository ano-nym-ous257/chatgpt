# AI Collaboration Protocol

> This document defines the rules of engagement for AI-assisted engineering on PaymentFlow AI.
> It governs how AI tools (Claude Code, GitHub Copilot, or any future AI coding assistant)
> interact with the codebase, what they may and may not do, and how their contributions
> are reviewed and attributed.

---

## Document Control

| Field | Value |
|-------|-------|
| **Owner** | Principal Software Engineer |
| **Last Updated** | 2026-07-13 |
| **Version** | 1.0 |
| **Applies To** | All AI-assisted development sessions |
| **Primary AI Tool** | Claude Code (Anthropic) |
| **Governing Documents** | CLAUDE.md, ENGINEERING-STANDARDS.md, DEFINITION-OF-DONE.md |

---

## 1. Principles

### 1.1 AI as Collaborator, Not Autonomous Agent

AI tools assist human engineers — they do not make independent architectural, security,
or product decisions. Every AI-generated change is reviewed and approved by a human engineer
before it enters the codebase.

### 1.2 Transparency

All AI-assisted contributions are attributed. Reviewers and future contributors must be able
to identify which code was AI-assisted to calibrate their review attention accordingly.

### 1.3 Trust but Verify

AI-generated code is held to the same standards as human-written code. There is no reduced
bar for AI contributions — the Definition of Done applies equally.

### 1.4 Deterministic Outcomes

AI sessions follow documented processes and produce verifiable results. The same instructions
should produce consistent outcomes regardless of which session executes them.

### 1.5 Safety First

AI tools must never bypass safety mechanisms. Type safety, security rules, and forbidden
patterns (CLAUDE.md §16) apply without exception to AI-generated code.

---

## 2. Session Protocol

### 2.1 Session Startup

Every AI coding session must begin with the Session Startup Checklist (CLAUDE.md §14):

```
1. Verify working directory
2. Check git status and recent history
3. Verify dependencies are installed
4. Run the full check suite: pnpm lint && pnpm typecheck && pnpm test
5. Read CLAUDE.md in full (if first session or significant time has passed)
6. Read relevant milestone docs (if implementing milestone work)
7. Read any files to be modified
```

**Rule**: If any check fails on startup, do not begin new work until the failure is understood
and either fixed or explicitly acknowledged by the human engineer.

### 2.2 Session Scope

Before beginning work, the AI must confirm:

| Question | Required Answer |
|----------|----------------|
| What is the task? | Clear, specific description |
| Which ticket(s) does this address? | PF-{NUMBER} reference(s) |
| What files will be modified? | List of expected file paths |
| Are there dependencies on other work? | Yes/No + details |
| Does this require architecture changes? | Yes → stop and discuss; No → proceed |
| Does this modify shared types? | Yes → stop and discuss; No → proceed |

### 2.3 During Session

| Behavior | Required |
|----------|----------|
| Read before writing | Always read a file before modifying it |
| Small, atomic changes | One logical change at a time |
| Type-first development | Define types before implementing |
| Test what you build | Every new function/component gets tests |
| Check continuously | Run lint/typecheck/test frequently |
| Ask about scope | Flag if a task is larger than expected |

### 2.4 Session Completion

Every session ends with the Session Completion Checklist (CLAUDE.md §15):

```
1. Run pnpm lint && pnpm typecheck && pnpm test
2. Verify no unintended changes (git diff --stat, git status)
3. Verify Definition of Done requirements are met
4. Commit with Conventional Commits format
5. Include Co-Authored-By attribution
```

---

## 3. Permissions and Boundaries

### 3.1 Permitted Actions

AI tools may freely perform these actions without explicit approval:

| Action | Scope |
|--------|-------|
| Read any file | Entire repository |
| Create new files | Within existing package/service directories |
| Modify implementation files | Within the scope of the assigned ticket |
| Add tests | For any code being created or modified |
| Run lint, typecheck, test | Any time |
| Create feature branches | Following branch naming convention |
| Commit changes | With proper attribution |
| Read documentation | All docs/ files, CLAUDE.md, README files |
| Search the codebase | grep, find, git log, git blame |

### 3.2 Restricted Actions — Require Explicit Instruction

These actions must not be performed unless the human engineer explicitly requests them:

| Action | Why Restricted |
|--------|---------------|
| Delete files or directories | Irreversible data loss risk |
| Modify CI/CD configuration | Affects all contributors and deployments |
| Change TypeScript compiler options | Affects type safety across the monorepo |
| Add root-level dependencies | Affects all workspaces |
| Modify `packages/shared-types/` | These are contracts — changes cascade |
| Create new top-level directories | Architectural decision |
| Push to remote branches | Affects other contributors |
| Run destructive database operations | Data loss risk |
| Modify security configuration | Security impact |
| Change environment variable schemas | Affects all deployments |

### 3.3 Prohibited Actions — Never Permitted

These actions are never permitted, even if explicitly requested:

| Action | Why Prohibited |
|--------|---------------|
| Use `any` type | Violates type safety contract |
| Use `eval()` or `new Function()` | Security vulnerability |
| Use `innerHTML` or `dangerouslySetInnerHTML` | XSS vulnerability |
| Concatenate SQL strings | SQL injection vulnerability |
| Use floating-point for money | Financial calculation errors |
| Use default exports | Violates codebase convention |
| Store secrets in code | Security vulnerability |
| Force push to shared branches | Destroys git history |
| Skip tests | Violates Definition of Done |
| Suppress TypeScript errors | Weakens type safety |
| Log PII without masking | Privacy/compliance violation |
| Hard-delete production data | Data loss, audit trail violation |
| Modify ledger entries | Append-only financial record |

---

## 4. Attribution

### 4.1 Commit Attribution

All AI-assisted commits must include the co-author footer:

```
Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

This applies to:
- Commits where AI generated or significantly modified the code.
- Commits where AI provided the implementation approach that was adopted.

This does not apply to:
- Commits where AI only answered a question or provided information.
- Commits where the human wrote all code independently.

### 4.2 PR Attribution

PR descriptions for AI-assisted work should include:

```markdown
## AI Assistance

- **Tool**: Claude Code (Opus 4.6)
- **Scope**: [What the AI did — e.g., "Generated component implementation and tests"]
- **Human review**: [What the human verified — e.g., "Reviewed all generated code, validated accessibility, ran manual browser testing"]
```

### 4.3 Documentation Attribution

AI-generated documentation includes a version history entry noting AI assistance:

```markdown
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-13 | Engineering (AI-assisted) | Initial version |
```

---

## 5. Review Standards for AI-Generated Code

### 5.1 Enhanced Review Checklist

AI-generated code requires the standard review checklist plus these additional checks:

| Check | Why |
|-------|-----|
| Verify no hallucinated APIs | AI may reference functions/methods that don't exist |
| Verify no hallucinated packages | AI may import packages not in the dependency tree |
| Verify no invented patterns | AI may create patterns inconsistent with the codebase |
| Verify error messages are accurate | AI may generate plausible but incorrect error text |
| Verify test assertions are meaningful | AI may write tests that pass but don't assert behavior |
| Verify no copy-paste artifacts | AI may duplicate code unnecessarily |
| Verify no over-engineering | AI may add abstractions not warranted by the requirements |
| Verify security boundaries | AI may not fully understand the threat model |

### 5.2 Hallucination Red Flags

Watch for these patterns that suggest AI hallucination:

| Red Flag | Example |
|----------|---------|
| Unknown import paths | `import { something } from '@paymentflow/nonexistent'` |
| Non-existent API methods | `response.getData()` when the API returns `.data` |
| Invented configuration options | Config keys that don't exist in the framework |
| Fabricated error codes | Error codes not defined in shared-types |
| Non-existent CLI commands | `pnpm` subcommands that don't exist |
| Invented type names | Types not defined in `packages/shared-types/` |

### 5.3 Test Validation

AI-generated tests require extra scrutiny:

| Check | What to Look For |
|-------|-----------------|
| Tests actually fail when code is wrong | Comment out the implementation — does the test fail? |
| Assertions test behavior, not implementation | Tests shouldn't break on refactoring |
| Edge cases are genuine | Not just copies of the happy path with different names |
| Mock boundaries are correct | Mocks should be at I/O boundaries, not internal functions |
| Test data is realistic | Not just `"test"`, `123`, or `"foo"` |

---

## 6. Quality Gates

### 6.1 Automated Gates

These are enforced by CI and cannot be bypassed:

| Gate | Tool | Threshold |
|------|------|-----------|
| Lint clean | ESLint | Zero errors |
| Type safe | TypeScript | Zero errors |
| Tests pass | Vitest | 100% pass rate |
| Coverage | Vitest + v8 | 80/70/80/80 |
| No vulnerabilities | pnpm audit | Zero high/critical |

### 6.2 Manual Gates

These are verified during code review:

| Gate | Reviewer Action |
|------|----------------|
| Definition of Done | Check all 10 requirements |
| Architecture compliance | Verify domain boundaries and patterns |
| Security review | Check for OWASP Top 10 vulnerabilities |
| Performance review | Verify no N+1 queries, timeouts configured |
| Documentation | Verify CHANGELOG updated, APIs documented |

### 6.3 AI-Specific Gates

Additional verification for AI-generated code:

| Gate | Action |
|------|--------|
| No hallucinated imports | `grep` for all imports, verify they resolve |
| No hallucinated APIs | Check referenced functions exist |
| Tests are meaningful | Mutate code, verify tests fail |
| Attribution present | Verify `Co-Authored-By` footer |
| CLAUDE.md compliance | Verify no forbidden patterns |

---

## 7. Escalation Protocol

### 7.1 When AI Must Stop and Ask

The AI must stop and request human guidance when:

| Trigger | Action |
|---------|--------|
| Task requires architecture changes | Stop, describe the proposed change, wait for approval |
| Task requires modifying shared types | Stop, describe the type change, wait for approval |
| Task scope exceeds the ticket | Stop, flag the scope expansion, wait for guidance |
| Ambiguity in requirements | Stop, state the ambiguity, present options |
| Security-sensitive changes | Stop, describe the security implications, wait for review |
| CI fails after changes | Stop, diagnose the failure, present findings |
| Conflict with CLAUDE.md rules | Stop, cite the conflicting rule, wait for resolution |
| Performance concerns | Stop, describe the concern, present alternatives |

### 7.2 When AI Must Not Proceed

The AI must refuse to proceed when asked to:

| Request | Response |
|---------|----------|
| Bypass type safety | "This violates CLAUDE.md §4 and §16. I cannot use `any` or weaken strict mode." |
| Skip tests | "This violates Definition of Done requirement 4. All new code requires tests." |
| Hardcode secrets | "This violates CLAUDE.md §6 and §16. Secrets must use environment variables." |
| Use forbidden patterns | "This violates CLAUDE.md §16 item {N}. The alternative is {X}." |
| Force push to main | "This violates CLAUDE.md §16 item 13. This is a destructive operation." |

---

## 8. Knowledge Management

### 8.1 Session Continuity

AI sessions are stateless — each new session starts without memory of previous sessions.
To maintain continuity:

| Mechanism | Purpose |
|-----------|---------|
| CLAUDE.md | Permanent operating manual — read every session |
| Git history | What was done and why — check `git log` |
| Milestone docs | What to build next — read before implementing |
| CHANGELOG.md | What has changed — read for recent context |
| ADRs | Why decisions were made — read when relevant |
| ENGINEERING-BACKLOG.md | What needs to be done — read for task context |
| ENGINEERING-ROADMAP.md | Where we're heading — read for strategic context |

### 8.2 Context Loading Priority

When starting a session, load context in this order:

```
1. CLAUDE.md                           (always — operating manual)
2. Git status + recent commits         (always — current state)
3. ENGINEERING-BACKLOG.md              (if working on a ticket)
4. Relevant milestone doc              (if implementing milestone work)
5. Related ADRs                        (if making architecture decisions)
6. Files to be modified                (before any changes)
7. Related test files                  (before modifying tests)
8. ENGINEERING-ROADMAP.md              (if planning or prioritizing)
```

### 8.3 Learning from Mistakes

When an AI session produces code that fails review:

1. The reviewer documents the issue in the review record.
2. If the issue represents a pattern, add it to the "Enhanced Review Checklist" (§5.1).
3. If the issue represents a missing rule, add it to CLAUDE.md or this document.
4. If the issue represents an ambiguity, create an ADR to resolve it.

This creates a feedback loop that improves AI collaboration quality over time.

---

## 9. Metrics and Tracking

### 9.1 AI Contribution Metrics

Track these metrics to evaluate AI collaboration effectiveness:

| Metric | Measurement | Target |
|--------|-------------|--------|
| First-pass review approval rate | % of AI-assisted PRs approved without changes | > 80% |
| Hallucination rate | # of hallucinated APIs/imports per session | 0 |
| Test quality score | % of AI-generated tests that catch real bugs | > 90% |
| CLAUDE.md compliance | # of rule violations per session | 0 |
| Scope creep incidents | # of times AI exceeded ticket scope | 0 |
| Security issues introduced | # of security findings in AI-generated code | 0 |

### 9.2 Continuous Improvement

Review AI collaboration metrics quarterly:

1. Analyze common review feedback patterns.
2. Update this protocol to address recurring issues.
3. Update CLAUDE.md with new rules or clarifications.
4. Add new lint rules to automate enforcement where possible.
5. Share findings across the engineering team.

---

## Appendix A: Quick Reference — AI Session Workflow

```
┌──────────────────────────────────────────────────┐
│              AI Session Workflow                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  START                                           │
│    │                                             │
│    ▼                                             │
│  Read CLAUDE.md                                  │
│    │                                             │
│    ▼                                             │
│  Run startup checks                              │
│    │   ┌─────────────┐                           │
│    ├───│ Checks fail? │── Fix or ask ──┐         │
│    │   └─────────────┘                 │         │
│    ▼                                   │         │
│  Confirm task scope                    │         │
│    │   ┌──────────────────┐            │         │
│    ├───│ Scope too large?  │── Ask ────┤         │
│    │   └──────────────────┘            │         │
│    ▼                                   │         │
│  Read files to modify                  │         │
│    │                                   │         │
│    ▼                                   │         │
│  Implement (small, atomic changes)     │         │
│    │                                   │         │
│    ▼                                   │         │
│  Run checks (lint, typecheck, test)    │         │
│    │   ┌─────────────┐                 │         │
│    ├───│ Checks fail? │── Fix ─────────┤         │
│    │   └─────────────┘                 │         │
│    ▼                                   │         │
│  Commit with attribution               │         │
│    │                                   │         │
│    ▼                                   │         │
│  Run completion checklist              │         │
│    │                                   │         │
│    ▼                                             │
│  END                                             │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Appendix B: AI Tool Configuration

### Claude Code (Primary)

| Setting | Value |
|---------|-------|
| Operating manual | `CLAUDE.md` (auto-loaded) |
| Memory | Project-scoped (`~/.claude/projects/`) |
| Permission mode | Confirm destructive operations |
| Max file size | Respect context window limits |

### Future Tools

Any new AI coding tool integrated into the workflow must:

1. Be configured to read and follow CLAUDE.md.
2. Produce output that meets the Definition of Done.
3. Include attribution in all generated code.
4. Be reviewed against this protocol before adoption.
5. Be approved via an ADR before becoming a standard tool.

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-13 | Engineering (AI-assisted) | Initial AI Collaboration Protocol |
