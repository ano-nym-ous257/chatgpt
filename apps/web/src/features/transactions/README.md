# Transactions Feature

Provides read access to the immutable transaction ledger.

Responsibilities:
- Transaction history views with filtering and pagination
- Transaction detail and audit trail display
- Export and reporting interfaces
- Search across transaction records

Boundaries:
- Read-only — transactions are never created or modified from the frontend
- Does NOT initiate payments (see payments)
- Displays ledger data provided by the transaction service API
