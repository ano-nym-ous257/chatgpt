## Unreleased

### Added

- Added Lamplight-inspired login and signup experiences with validation, protected workspace routing, persistent demo sessions, and sign-out.
- Added a global light/dark appearance system with persisted preference, no-flash initialization, header/auth toggles, and settings controls.
- Personalized navigation, profile settings, dashboard greetings, and the AI workspace from the active demo account.
- Added a route-aware, viewport-triggered UI motion system with staggered module reveals.
- Added premium micro-interactions for cards, navigation, Quick Actions, buttons, live states, dialogs, drawers, and authentication surfaces.
- Added comprehensive reduced-motion handling and motion-system documentation for future web, mobile, and AI-agent modules.

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-07-23

### Added

- **Web MVP**: Complete dashboard, wallets, payments, transactions, exchange rates, AI workspace, settings, and demo login experiences
- **AI**: Specialized Cashflow, Payment, Risk, and FX agent workspace with human-approval guardrails
- **Interaction**: Command palette, notification drawer, modals, toasts, CSV export, filters, and simulated product actions
- **Mobile**: Installable PWA manifest, responsive mobile layouts, bottom navigation, and native mobile architecture handoff
- **Operations**: Vercel deployment guide and health endpoint at `/api/health`
- **Documentation**: Deployable MVP scope and mobile architecture guidance
- **Governance**: CTO Post-Ticket Review template (`docs/governance/CTO-REVIEW-TEMPLATE.md`)
- **Governance**: Repository Baseline Snapshot template (`docs/repository/REPOSITORY-BASELINE-TEMPLATE.md`)
- **Governance**: Engineering Backlog with 39 tickets PF-0002–PF-0040 (`docs/backlog/ENGINEERING-BACKLOG.md`)
- **Governance**: Engineering Roadmap with 7 phases and release strategy (`docs/roadmap/ENGINEERING-ROADMAP.md`)
- **Governance**: Architecture Decision Record template (`docs/decisions/ADR-TEMPLATE.md`)
- **Governance**: Ticket Review template (`docs/reviews/REVIEW-TEMPLATE.md`)
- **Governance**: Definition of Done — 10-requirement engineering contract (`docs/governance/DEFINITION-OF-DONE.md`)
- **Governance**: Engineering Standards — 12 standard areas (`docs/governance/ENGINEERING-STANDARDS.md`)
- **Governance**: AI Collaboration Protocol (`docs/governance/AI-COLLABORATION-PROTOCOL.md`)
- **CI**: GitHub Actions pipeline for lint, typecheck, and test
- **Packages**: `@paymentflow/shared-types` — Currency, Wallet, Payment, API response types
- **Packages**: `@paymentflow/ui` — Button, Card, DataTable components with ARIA accessibility
- **Styles**: Design token system with CSS custom properties
- **Docs**: CLAUDE.md engineering manual
- **Docs**: Product Requirements Document (PRD)
- **Docs**: System Design Document (SDD)
- **Docs**: Milestone specifications M0 and M1
- **Docs**: Engineering Review Board charter

### Changed

- Updated the repository from foundation-only status to a deployable demonstration release
- Expanded CI to run the production build before lint, typecheck, and tests

### Fixed

- Added direct web-workspace declarations for shared types, Node types, and Vitest so strict pnpm installs resolve every imported package explicitly.

### Security

- Added baseline browser security headers and documented that agents cannot execute protected financial actions without human approval.

---

## Release History

- **0.2.0** — Deployable product demonstration with complete web workflows, safe agent simulations, PWA support, and Vercel deployment guidance.
- Earlier foundation work remains documented in the engineering history.

---

## Versioning Notes

- **Pre-1.0**: All versions before 1.0.0 are considered unstable. APIs may change without notice.
- **1.0.0-alpha.1**: First alpha release — core authentication and identity (M1 complete).
- **1.0.0-beta.1**: First beta release — wallets and payments functional (M2 complete).
- **1.0.0-rc.1**: Release candidate — production infrastructure validated (M3 complete).
- **1.0.0**: General availability — all launch features operational.
