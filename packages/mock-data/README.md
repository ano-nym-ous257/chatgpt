# @paymentflow/mock-data

Centralized mock business data for PaymentFlow AI development.

## Usage

```typescript
import { dashboardSummary, wallets, transactions } from '@paymentflow/mock-data';
```

## Modules

| Module | Description |
|--------|-------------|
| `dashboard` | Summary metrics and wallet overview for the dashboard |
| `wallets` | Multi-currency wallet records with balances |
| `transactions` | Recent transaction history |
| `payments` | Pending and scheduled payment records |
| `exchange-rates` | Currency pair rates with trend data |
| `notifications` | System alerts, payment updates, compliance reminders |

All data uses types from `@paymentflow/shared-types` to maintain type safety.
