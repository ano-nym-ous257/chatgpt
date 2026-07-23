# PaymentFlow AI Documentation

This directory is the ordered documentation set for PaymentFlow AI. These files describe the target
product and architecture; they do not indicate that the corresponding production systems exist.

## Recommended Reading Order

1. [Product Requirements Document](product/PRD.md) — vision, users, scope, requirements, APIs, and roadmap.
2. [System Design Document](architecture/SDD.md) — target system architecture and operational model.
3. [Entity Relationship Document](architecture/ERD.md) — target data model and persistence strategy.
4. [Engineering Repository Blueprint](engineering/ERB.md) — intended repository and technology structure.
5. [Engineering Governance and Development Standards](engineering/EGDSM.md) — rules for implementation and review.
6. [Enterprise Engineering Implementation Plan](engineering/EEIP.md) — epics, sequencing, sprints, and release gates.
7. [Milestone Specifications](milestones/) — detailed implementation contracts in numeric order.
8. [Engineering Handoff](handoff/HANDOFF.md) — prototype and design-system implementation guidance.

## Milestone Order

| Milestone | Document | Status |
| --- | --- | --- |
| M0 | [Foundation](milestones/M0.md) | Draft specification; not implemented |
| M1 | [Authentication and Identity](milestones/M1.md) | Draft specification; not implemented |
| M2 | [Ledger Engine](milestones/M2.md) | Draft specification; not implemented |
| M3 | [Wallet Service](milestones/M3.md) | Draft specification; not implemented |

The current canonical milestone sequence begins with M0 Foundation, M1 Authentication and Identity,
M2 Ledger Engine, and M3 Wallet Service. Add future milestones as `M4.md`, `M5.md`, and so on. The
next expected milestone after M3 is M4 Payments Service unless the roadmap is intentionally revised.
Every milestone document should state its status, dependencies, scope, deliverables, acceptance criteria,
security requirements, test plan, observability, rollback strategy, and definition of done. Milestone
numbers are implementation dependencies and are not the same thing as sprint numbers in the
implementation plan.

## Status Language

- **Placeholder**: reserved document with no approved implementation specification.
- **Draft specification**: written but still subject to review and approval.
- **Approved specification**: accepted as the implementation contract; work may begin when dependencies are met.
- **Implemented**: acceptance criteria pass and the milestone has been formally accepted.

No milestone in this repository is currently marked implemented.
