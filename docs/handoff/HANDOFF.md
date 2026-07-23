# PaymentFlow AI Handoff

## Design System

PaymentFlow AI uses a premium dark fintech foundation with restrained glass surfaces and sharp data hierarchy.

### Core Tokens

- Brand: PaymentFlow AI
- Font: Inter, then system UI fallback
- Background: Deep Navy `#050713`
- Primary action: Electric Blue `#00BFFF` blended with Emerald Green `#22C55E`
- AI accent: AI Purple `#7B4BD6`
- Text: Soft White `#EEF2FF`
- Muted text: `#AEB8D5`
- Warning: `#F59E0B`
- Danger: `#EF4444`
- Radius: `8px` for cards, buttons, controls, and panels
- Motion: 160ms to 360ms for interaction, with reduced-motion support

Full tokens are available in [`design-tokens.json`](../../design-tokens.json).

## Current Implementation Boundary

This repository currently contains a static prototype and planning artifacts. All displayed financial
values, status indicators, risk scores, forecasts, routing decisions, and AI responses are illustrative.
No production applications, APIs, databases, payment integrations, or AI models are implemented yet.
Milestone specifications may be drafted before Milestone 0 begins; a specification is not evidence that
its milestone has been implemented.

## Component Library

The prototype defines these reusable UI patterns:

- App shell with persistent product navigation
- Sticky enterprise topbar
- Glass panels and metric cards
- Mobile banking phone frames
- Financial balance cards
- AI insight cards
- Quick action grids
- Data tables with status chips
- AI Copilot chat interface
- Fraud alert rows and risk gauge
- Route visualization
- Treasury forecast bars
- Color swatches and typography specimens

## Information Architecture

### PaymentFlow Personal

- Home
- Wallets
- Payments
- AI Insights
- Profile

### PaymentFlow Business

- Business Dashboard
- Wallets
- Payments
- Invoices
- Payroll
- Analytics

### AI Platform

- AI Copilot
- AI Insights Feed
- Forecasting
- Recommended Actions

### Risk And Money Movement

- Fraud Center
- Smart Routing Center
- Treasury Intelligence

### Admin Portal

- User Management
- Compliance Center
- Platform Monitoring

## User Journeys

1. Personal customer checks total balance, reviews an AI savings suggestion, moves surplus funds into savings, and detects unused subscriptions.
2. Business owner reviews cash position, receives a revenue forecast, approves a vendor batch, and accepts a lower-cost payment route.
3. Finance lead opens AI Copilot, asks which customers pay late, then triggers automated invoice reminders.
4. Fraud analyst triages a high-risk alert, reviews behavioral signals, and assigns the investigation.
5. Admin operator reviews KYC approvals, monitors AML cases, checks audit logs, and confirms API health.

## Responsive Behavior

- Mobile-first personal screens are optimized for 360px to 430px widths.
- Business, admin, risk, routing, and treasury dashboards are desktop-first with dense grids.
- Below 1100px, the global rail becomes an off-canvas menu.
- Below 760px, dashboard grids collapse to one column and wide route flows become vertical.
- Tables preserve minimum readable widths and scroll horizontally when needed.

## Accessibility Notes

- Navigation uses real buttons and `aria-pressed` state.
- The top search has a semantic search role and prototype-only feedback when submitted.
- Charts and visualizations include descriptive labels.
- Focus states are visible through a blue focus ring token.
- Status chips include text labels, not color alone.
- Motion is disabled for users with `prefers-reduced-motion`.

## Engineering Notes

- This is a dependency-free static prototype suitable for handoff, stakeholder review, or conversion into React, Next.js, Vue, or native mobile surfaces.
- Convert repeated card patterns into components before production integration.
- Keep monetary values right-aligned in production tables.
- Connect charts to typed data models rather than inline values.
- Integrate AI Copilot with permissions, audit logs, and data-source visibility.
- Fraud, compliance, and treasury actions should require role-based access control.
- Any AI recommendation that moves money should require explainability, preview, and approval.

## Production Next Steps

1. Map each screen to user roles and permissions.
2. Create design tokens in the target design tool and component library.
3. Replace mock data with typed API contracts.
4. Add authenticated routing and workspace switching.
5. Add real charting with accessible tables as fallbacks.
6. Write interaction specs for approvals, payment release, KYC review, and AI-generated actions.
