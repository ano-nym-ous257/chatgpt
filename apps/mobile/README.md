# PaymentFlow AI Mobile

The repository currently ships an installable, responsive Progressive Web App from `apps/web`. It provides a mobile navigation shell, mobile-safe layouts, and a web app manifest so the current MVP can be installed from a supported mobile browser.

A native mobile client is the next platform implementation. It should be created as an Expo/React Native application after the shared API, authentication, persistence, and agent contracts are stable.

## Intended native structure

```text
apps/mobile/
  app/
    (auth)/
    (tabs)/
      index.tsx
      wallets.tsx
      payments.tsx
      ai.tsx
      settings.tsx
  src/
    components/
    features/
    navigation/
    providers/
```

## Shared boundaries

The mobile app should reuse platform-neutral packages for:

- domain entities and value objects;
- API request and response types;
- validation schemas;
- agent recommendation and approval contracts;
- design-token values;
- formatting and telemetry conventions.

It should not import DOM components from `packages/ui`. A future migration should split that package into `ui-web`, `ui-mobile`, and `design-tokens` once the native application begins.

See `docs/architecture/MOBILE-ARCHITECTURE.md`.
