# Payments Feature

Handles payment initiation, tracking, and management.

Responsibilities:
- Payment creation flows (domestic and cross-border)
- Beneficiary selection
- Payment status tracking
- Payment history and receipts
- Idempotent submission handling

Boundaries:
- Does NOT manage wallet balances (see wallets)
- Does NOT own transaction ledger records (see transactions)
- All mutations require idempotency keys
