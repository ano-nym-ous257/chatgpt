# Wallets Feature

Manages multi-currency wallet display, funding, and balance operations.

Responsibilities:
- Wallet list and detail views
- Balance display with currency formatting
- Funding and withdrawal flows
- Wallet creation and configuration

Boundaries:
- Does NOT process payments (see payments)
- Does NOT record ledger entries directly
- Wallet mutations go through the wallet service API
