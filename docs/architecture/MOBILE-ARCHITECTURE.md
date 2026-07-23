# Mobile Architecture

## Status

The deployable MVP includes an installable responsive PWA. A native application is planned but intentionally not coupled to unfinished backend or authentication decisions.

## Recommended platform

Expo with React Native is the leading recommendation because PaymentFlow AI already uses TypeScript, React, pnpm workspaces, and shared domain packages. The final decision should be captured in an ADR before native implementation.

## Platform boundaries

### Shared

- `packages/domain`: financial entities, events, errors, and value objects.
- `packages/shared-types`: API and product contracts.
- Future `packages/validation`: platform-neutral validation rules.
- Future `packages/api-sdk`: generated, typed API client.
- Future `packages/agent-contracts`: recommendations, prepared actions, evidence, confidence, and approval requirements.
- Future `packages/design-tokens`: semantic colors, spacing, typography scales, motion values, and elevation intent.

### Web only

- Next.js routes and server components.
- DOM elements and browser accessibility primitives.
- CSS implementation in `apps/web` and `packages/ui`.

### Mobile only

- React Native view components.
- Native navigation, deep links, biometrics, secure storage, notifications, and app lifecycle handling.

## Security requirements

A native application must use secure device storage for refresh tokens, support biometric re-authentication for sensitive operations, pin supported network certificates where appropriate, and never persist raw payment credentials or provider secrets.

## Agent experience

Agents may analyze, recommend, and prepare drafts. Mobile and web must use the same action contract and approval state machine. No platform may allow an agent to execute a financial action without the required user authorization and policy checks.

## Current mobile deliverable

The web application provides:

- responsive screens for dashboard, wallets, payments, transactions, FX, AI, and settings;
- a mobile bottom-navigation shell;
- installable manifest metadata and product icon;
- touch-friendly controls and safe-area spacing;
- progressive enhancement without native-only dependencies.
