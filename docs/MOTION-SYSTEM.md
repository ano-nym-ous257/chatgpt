# PaymentFlow Motion System

PaymentFlow uses restrained motion to communicate hierarchy, navigation, and interaction feedback without distracting from financial data.

## Principles

1. **Motion explains change.** Route transitions, drawers, dialogs, and newly revealed modules should make spatial relationships clear.
2. **Financial clarity comes first.** Balances, statuses, and approval controls must remain readable while animation is running.
3. **No critical meaning depends on motion.** Status and state are always communicated with text, shape, or color as well.
4. **One-time entrances, responsive interactions.** Page modules reveal once as they enter the viewport; controls respond immediately to hover, focus, and press.
5. **Reduced motion is mandatory.** `prefers-reduced-motion: reduce` removes non-essential movement and reveals all content immediately.

## Motion tokens

The shared motion tokens live in `packages/ui/src/tokens/motion.ts`. The web implementation mirrors them as CSS custom properties in `apps/web/src/app/globals.css`.

- Fast feedback: 100–120ms
- Standard interaction: 200ms
- Panels and dialogs: 300ms
- Route transition: 420ms
- Scroll reveal: 560ms
- Stagger interval: 55ms, capped at six sibling steps

## Web orchestration

`MotionOrchestrator` observes reusable page modules and adds one-time viewport reveal states. It does not contain business logic and does not alter component data or layout.

The orchestrator covers:

- page and section headers
- grid cards and Quick Actions
- dashboard columns
- tables and list surfaces
- wallet, exchange-rate, agent, and settings modules

Route content is keyed by pathname so each page receives a short entrance transition.

## Interaction motion

Interactive surfaces use small, consistent movements:

- cards lift up to 4px on pointer hover
- action arrows move forward to reinforce navigation
- sidebar items shift horizontally to reinforce direction
- buttons and controls use press-scale feedback
- drawers enter from the edge they occupy
- dialogs and command surfaces scale from their visual origin
- live and unread indicators use a slow status pulse

## Mobile boundary

The future mobile application should reuse the timing and easing intent, not web-specific CSS or DOM selectors. Native mobile components should implement platform-appropriate equivalents using shared semantic tokens.

## AI-agent modules

Agent recommendations, risk alerts, approvals, and task updates should use the same reveal and interaction patterns as other dashboard modules. Continuous animation must not be used to create artificial urgency; only genuinely live or unread states may pulse.
