# @paymentflow/domain

Canonical business domain model for the PaymentFlow AI platform.

This package defines the shared language used by every application, service, and integration in the monorepo.

## Purpose

- Single source of truth for all domain types
- Zero runtime dependencies (pure TypeScript definitions + lightweight error classes)
- Consumed by apps, services, and other packages

## Structure

| Directory | Contents |
|-----------|----------|
| `entities/` | Core domain interfaces: User, Wallet, Payment, Transaction, etc. |
| `value-objects/` | Branded IDs, Money, Currency, Timestamp |
| `enums/` | Status enums, CurrencyCode, NotificationType |
| `events/` | Domain event type definitions |
| `errors/` | Domain-specific error classes |
| `interfaces/` | Service and repository contracts (placeholder) |

## Domain Boundaries

- **Identity**: User, roles, sessions
- **Wallets**: Accounts, balances, funding
- **Payments**: Initiation, routing, settlement
- **Transactions**: Ledger entries, double-entry bookkeeping
- **Compliance**: KYC/AML, sanctions screening
- **Notifications**: Delivery channels, templates

## Value Objects

Branded types prevent accidental mixing of identifiers:

```typescript
import type { WalletId, PaymentId } from '@paymentflow/domain';

// These are incompatible at compile time despite both being strings
declare const walletId: WalletId;
declare const paymentId: PaymentId;
```

## Naming Conventions

- Entity interfaces: PascalCase (`User`, `Wallet`, `Payment`)
- Value objects: PascalCase (`Money`, `WalletId`)
- Enums: PascalCase for type, SCREAMING_SNAKE or PascalCase for members
- Events: PascalCase past tense (`PaymentCompleted`, `WalletCreated`)
- Errors: PascalCase + `Error` suffix (`InsufficientFundsError`)

## Import Convention

Always import from the package root:

```typescript
import type { User, Money, PaymentStatus } from '@paymentflow/domain';
```

Never import from internal paths (`@paymentflow/domain/src/entities`).
