# PaymentFlow AI

PaymentFlow AI is a deployable, high-fidelity fintech product demonstration for global wallets, payments, transactions, treasury operations, currency conversion, and AI-assisted financial workflows.

The current release is a responsive Next.js application backed by typed mock data. It demonstrates product architecture and user experience without claiming to process real money.

## Product surfaces

- Personalized financial dashboard
- Multi-currency wallet management
- Payment preparation and approval queue
- Transaction ledger, filters, details, and CSV export
- Exchange-rate monitoring and conversion simulation
- Specialized Cashflow, Payment, Risk, and FX agents
- Profile, security, notification, and personalization settings
- Command palette and notification drawer
- Installable responsive PWA with mobile bottom navigation

## AI safety model

Agents can analyze information, explain risk, recommend next steps, and prepare drafts. They cannot move money, approve their own work, change security controls, or execute protected actions without human authorization.

## Repository structure

```text
apps/
  web/                  Next.js deployable product MVP
  mobile/               Native-mobile architecture and handoff
packages/
  domain/               Platform-neutral financial domain model
  mock-data/            Typed demonstration data
  shared-types/         Shared API and product contracts
  ui/                   Reusable web component library
docs/
  architecture/         System, data, and mobile architecture
  product/              PRD and deployable MVP scope
  engineering/          Engineering standards and processes
  roadmap/              Delivery roadmap
```

## Local development

### Requirements

- Node.js 20 or newer
- pnpm 9 or newer

```bash
pnpm install
pnpm dev:web
```

Open `http://localhost:3000/dashboard`.

## Quality commands

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm format:check
```

## Vercel deployment

Import the repository into Vercel and use:

- Root directory: `apps/web`
- Build command: `cd ../.. && pnpm exec turbo run build --filter=@paymentflow/web`
- Output directory: `.next`

No environment variables are required for the demonstration release. Full instructions are in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Mobile

The current web application is installable as a responsive PWA. The native mobile boundary and recommended Expo/React Native structure are documented in [`docs/architecture/MOBILE-ARCHITECTURE.md`](docs/architecture/MOBILE-ARCHITECTURE.md).

## Demonstration limitations

This repository does not connect to live banks, payment processors, identity providers, KYC/AML services, live exchange-rate feeds, production databases, or production AI models. All balances, transactions, recommendations, and actions are illustrative.

See [`docs/product/MVP-SCOPE.md`](docs/product/MVP-SCOPE.md) for the implemented scope and production dependencies.

## Security

Never commit API keys, financial credentials, tokens, or private customer data. Review [`SECURITY.md`](SECURITY.md) before adding external integrations.

## License

MIT License. See [`LICENSE`](LICENSE).
