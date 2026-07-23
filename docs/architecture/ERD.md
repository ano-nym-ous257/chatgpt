# PaymentFlow AI — Entity Relationship Document (ERD)

Status: target architecture; not implemented.

---

### SECTION 1: DATABASE ARCHITECTURE OVERVIEW

**Purpose**
Provide the target PostgreSQL database architecture and ERD for PaymentFlow AI. This is an implementation specification that must be validated through migrations, tests, threat modeling, performance testing, and compliance review before production use.

**Domain Driven Design**
- **Domains** are mapped to separate logical schemas and service ownership. Each domain owns its tables and data contracts. During the MVP, the schemas may share one managed PostgreSQL deployment, allowing the cross-schema foreign keys documented here. If a domain is later moved to a separate database, those physical foreign keys must become logical UUID references validated through service contracts and events.
- **Schemas**: `identity`, `wallets`, `payments`, `ledger`, `business`, `treasury`, `fraud`, `ai`, `compliance`, `audit`, `notifications`, `analytics`.
- **Service ownership**: Each microservice owns its schema and primary tables. Example mapping: Auth Service → `identity`; Wallet Service → `wallets`; Payment Service → `payments`; Ledger Service → `ledger`; Fraud Service → `fraud`; AI Copilot → `ai`; Compliance Service → `compliance`; Audit Service → `audit`; Analytics pipelines write to `analytics` and data warehouse.

**Deployment model**
- **MVP**: one managed PostgreSQL deployment with service-owned schemas, separate database roles, and no direct cross-domain writes.
- **Scale-out**: independently move high-volume or regulated domains to dedicated databases. Preserve relationships through immutable identifiers, versioned APIs, an outbox pattern, and Kafka events.
- The ERD expresses both physical MVP relationships and logical domain relationships. Application code must access another domain through its service contract, never by writing directly to that domain's tables.

**Data boundaries and patterns**
- **Transactional domain**: Strong ACID guarantees for ledger, wallets, payments. Use Postgres primary instances with synchronous replicas in-region for HA.
- **Analytical domain**: Event streams (Kafka) feed a data warehouse (ClickHouse / Snowflake) for BI and ML.
- **Caches**: Redis for hot balances, locks, velocity counters, and feature store cache.
- **Search**: OpenSearch for full-text search on invoices, beneficiaries, KYC docs.
- **Event-driven replication**: Use Debezium or logical replication to stream changes to analytics and ML feature stores.

**Scaling strategy**
- **Vertical + horizontal**: Start with single-region Postgres with read replicas; scale by partitioning and sharding for high-volume tables (transactions, journal_entries, audit_logs).
- **Sharding**: Tenant-aware sharding for enterprise customers; hash-based sharding for global scale.
- **Read replicas**: For read-heavy services and reporting.
- **OLAP offload**: Move heavy aggregations to ClickHouse/Snowflake.

---

---

### SECTION 2: IDENTITY DOMAIN

**Schema**: `identity`

#### Table users
- **Columns**
  - `id` UUID PRIMARY KEY
  - `email` VARCHAR(320) NOT NULL
  - `phone` VARCHAR(32)
  - `username` VARCHAR(64)
  - `password_hash` TEXT NULL
  - `status` VARCHAR(20) NOT NULL DEFAULT 'pending'
  - `created_at` TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
  - `updated_at` TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
  - `primary_role` VARCHAR(32)
  - `tenant_id` UUID NULL
- **Constraints**
  - `UNIQUE(email)`; `UNIQUE(username)`; `CHECK(status IN ('pending','active','suspended','closed'))`
- **Indexes**
  - `idx_users_email` on `email`
  - `idx_users_tenant` on `tenant_id`
- **Relationships**
  - `user_roles.user_id` → `users.id`
  - `devices.user_id` → `users.id`

#### Table roles
- **Columns**
  - `id` UUID PRIMARY KEY
  - `name` VARCHAR(64) NOT NULL
  - `description` TEXT
  - `created_at` TIMESTAMP
- **Constraints**
  - `UNIQUE(name)`
- **Indexes**
  - `idx_roles_name` on `name`

#### Table permissions
- **Columns**
  - `id` UUID PRIMARY KEY
  - `name` VARCHAR(128) NOT NULL
  - `resource` VARCHAR(128)
  - `action` VARCHAR(64)
- **Constraints**
  - `UNIQUE(name)`

#### Table user_roles
- **Columns**
  - `id` UUID PRIMARY KEY
  - `user_id` UUID NOT NULL
  - `role_id` UUID NOT NULL
  - `assigned_by` UUID
  - `assigned_at` TIMESTAMP NOT NULL DEFAULT now()
- **Constraints**
  - `UNIQUE(user_id, role_id)`
  - `FOREIGN KEY (user_id) REFERENCES identity.users(id)`
  - `FOREIGN KEY (role_id) REFERENCES identity.roles(id)`
- **Indexes**
  - `idx_user_roles_user` on `user_id`

#### Table sessions
- **Columns**
  - `id` UUID PRIMARY KEY
  - `user_id` UUID NOT NULL
  - `refresh_token_hash` TEXT
  - `device_id` UUID
  - `ip_address` INET
  - `created_at` TIMESTAMP NOT NULL DEFAULT now()
  - `expires_at` TIMESTAMP
  - `revoked` BOOLEAN DEFAULT FALSE
- **Constraints**
  - `FOREIGN KEY (user_id) REFERENCES identity.users(id)`
- **Indexes**
  - `idx_sessions_user` on `user_id`
  - `idx_sessions_refresh` on `refresh_token_hash`

#### Table devices
- **Columns**
  - `id` UUID PRIMARY KEY
  - `user_id` UUID NOT NULL
  - `device_fingerprint` TEXT NOT NULL
  - `device_type` VARCHAR(32)
  - `last_seen_at` TIMESTAMP
  - `trusted` BOOLEAN DEFAULT FALSE
- **Constraints**
  - `UNIQUE(user_id, device_fingerprint)`
  - `FOREIGN KEY (user_id) REFERENCES identity.users(id)`
- **Indexes**
  - `idx_devices_user` on `user_id`
  - `idx_devices_fingerprint` on `device_fingerprint`

#### Table user_preferences
- **Columns**
  - `id` UUID PRIMARY KEY
  - `user_id` UUID NOT NULL
  - `preferences` JSONB NOT NULL DEFAULT '{}'
  - `updated_at` TIMESTAMP
- **Constraints**
  - `FOREIGN KEY (user_id) REFERENCES identity.users(id)`
- **Indexes**
  - `idx_user_prefs_user` on `user_id`

**RBAC model**
- Roles map to permissions via a join table `role_permissions(role_id, permission_id)`. Authorization checks evaluate role membership and permission scopes. Admin elevation uses `admin_approvals` table (not shown) for JIT elevation.

**MFA support**
- Store MFA methods in `identity.mfa_methods` with `type` (TOTP, SMS, WebAuthn), `secret_encrypted`, `enabled`, `created_at`. Use Vault for key encryption.

**Session management**
- Short-lived access tokens; refresh tokens stored hashed in `sessions`. Revoke by setting `revoked=true`. Device binding enforced via `devices`.

---

---

### SECTION 3: BUSINESS DOMAIN

**Schema**: `business`

#### Table companies
- **Columns**
  - `id` UUID PRIMARY KEY
  - `name` VARCHAR(255) NOT NULL
  - `legal_name` VARCHAR(255)
  - `industry` VARCHAR(128)
  - `country` CHAR(2)
  - `currency` CHAR(3)
  - `status` VARCHAR(32) DEFAULT 'active'
  - `created_at` TIMESTAMP
- **Constraints**
  - `UNIQUE(name, country)`
- **Indexes**
  - `idx_companies_country` on `country`

#### Table company_members
- **Columns**
  - `id` UUID PRIMARY KEY
  - `company_id` UUID NOT NULL
  - `user_id` UUID NOT NULL
  - `role` VARCHAR(64)
  - `joined_at` TIMESTAMP
- **Constraints**
  - `FOREIGN KEY (company_id) REFERENCES business.companies(id)`
  - `FOREIGN KEY (user_id) REFERENCES identity.users(id)`
  - `UNIQUE(company_id, user_id)`

#### Table company_roles
- **Columns**
  - `id` UUID PRIMARY KEY
  - `company_id` UUID NOT NULL
  - `name` VARCHAR(64) NOT NULL
  - `permissions` JSONB
- **Constraints**
  - `FOREIGN KEY (company_id) REFERENCES business.companies(id)`
  - `UNIQUE(company_id, name)`

#### Table departments
- **Columns**
  - `id` UUID PRIMARY KEY
  - `company_id` UUID NOT NULL
  - `name` VARCHAR(128)
  - `manager_user_id` UUID
- **Constraints**
  - `FOREIGN KEY (company_id) REFERENCES business.companies(id)`
  - `FOREIGN KEY (manager_user_id) REFERENCES identity.users(id)`

#### Table employees
- **Columns**
  - `id` UUID PRIMARY KEY
  - `company_id` UUID NOT NULL
  - `user_id` UUID NOT NULL
  - `employee_number` VARCHAR(64)
  - `department_id` UUID
  - `hire_date` DATE
  - `status` VARCHAR(32)
- **Constraints**
  - `FOREIGN KEY (company_id) REFERENCES business.companies(id)`
  - `FOREIGN KEY (user_id) REFERENCES identity.users(id)`
  - `UNIQUE(company_id, employee_number)`

**Business rules**
- Companies may have multiple departments and roles. Company-level RBAC is enforced by `company_roles` and `company_members`. Enterprise tenants can have nested teams and delegated admins.

---

---

### SECTION 4: WALLET DOMAIN

**Schema**: `wallets`

#### Table currencies
- **Columns**
  - `code` CHAR(3) PRIMARY KEY
  - `name` VARCHAR(64)
  - `symbol` VARCHAR(8)
  - `decimals` SMALLINT DEFAULT 2
  - `country` CHAR(2)
- **Seeded values**
  - USD, EUR, GBP, GHS, NGN, KES

#### Table wallets
- **Columns**
  - `id` UUID PRIMARY KEY
  - `owner_type` VARCHAR(32) NOT NULL CHECK(owner_type IN ('user','company'))
  - `owner_id` UUID NOT NULL
  - `status` VARCHAR(20) NOT NULL DEFAULT 'inactive'
  - `created_at` TIMESTAMP
  - `activated_at` TIMESTAMP
  - `default_currency` CHAR(3) NOT NULL
  - `metadata` JSONB
- **Constraints**
  - `FOREIGN KEY (default_currency) REFERENCES wallets.currencies(code)`
  - `CHECK(status IN ('inactive','active','suspended','closed'))`
- **Indexes**
  - `idx_wallets_owner` on `(owner_type, owner_id)`
  - `idx_wallets_status` on `status`

#### Table wallet_accounts
- **Purpose**: represent per-wallet per-currency ledger account references
- **Columns**
  - `id` UUID PRIMARY KEY
  - `wallet_id` UUID NOT NULL
  - `currency` CHAR(3) NOT NULL
  - `account_code` TEXT NOT NULL UNIQUE
  - `created_at` TIMESTAMP
- **Constraints**
  - `FOREIGN KEY (wallet_id) REFERENCES wallets.wallets(id)`
  - `FOREIGN KEY (currency) REFERENCES wallets.currencies(code)`
  - `UNIQUE(wallet_id, currency)`
- **Indexes**
  - `idx_wallet_accounts_wallet` on `wallet_id`
  - `idx_wallet_accounts_currency` on `currency`

#### Table wallet_balances
- **Columns**
  - `wallet_account_id` UUID PRIMARY KEY REFERENCES wallets.wallet_accounts(id)
  - `available` NUMERIC(30,8) NOT NULL DEFAULT 0
  - `reserved` NUMERIC(30,8) NOT NULL DEFAULT 0
  - `pending` NUMERIC(30,8) NOT NULL DEFAULT 0
  - `as_of` TIMESTAMP NOT NULL DEFAULT now()
  - `version` BIGINT NOT NULL DEFAULT 0
- **Constraints**
  - `CHECK(available >= 0 AND reserved >= 0 AND pending >= 0)`
- **Indexes**
  - `idx_wallet_balances_available` on `available`
- **Concurrency**
  - Use optimistic locking on `version` or SELECT FOR UPDATE in Ledger Service transactions.

#### Table wallet_limits
- **Columns**
  - `id` UUID PRIMARY KEY
  - `wallet_id` UUID NOT NULL
  - `currency` CHAR(3)
  - `daily_limit` NUMERIC(30,8)
  - `monthly_limit` NUMERIC(30,8)
  - `per_tx_limit` NUMERIC(30,8)
- **Constraints**
  - `FOREIGN KEY (wallet_id) REFERENCES wallets.wallets(id)`

**Lifecycle rules**
- Wallet creation creates `wallet_accounts` for supported currencies on demand.
- Activation requires KYC/KYB checks; status transitions logged to `audit.audit_events`.
- Holds/reserves are implemented by creating ledger journal entries that move amounts from `available` to `reserved` accounts.

**Currency conversion**
- FX rates stored in `treasury.fx_rates` with timestamp and provider. Conversion uses `fx_rate` stored on journal entries for audit.

---

---

### SECTION 5: LEDGER DOMAIN

**Schema**: `ledger`

Design a banking-grade ledger with immutable journals and double-entry bookkeeping.

#### Table ledger_accounts
- **Columns**
  - `id` UUID PRIMARY KEY
  - `account_code` TEXT UNIQUE NOT NULL
  - `account_type` VARCHAR(32) NOT NULL CHECK(account_type IN ('wallet','system','provider','reserve','suspense'))
  - `owner_id` UUID NULL
  - `currency` CHAR(3) NOT NULL
  - `created_at` TIMESTAMP
  - `status` VARCHAR(16) DEFAULT 'active'
- **Indexes**
  - `idx_ledger_accounts_code` on `account_code`
  - `idx_ledger_accounts_owner` on `owner_id`

#### Table journal_entries
- **Columns**
  - `id` UUID PRIMARY KEY
  - `journal_type` VARCHAR(64) NOT NULL
  - `reference_id` UUID NULL
  - `narration` TEXT
  - `created_at` TIMESTAMP NOT NULL DEFAULT now()
  - `created_by` UUID
  - `status` VARCHAR(16) NOT NULL DEFAULT 'pending'
  - `hash` TEXT NOT NULL
  - `previous_hash` TEXT NULL
- **Constraints**
  - `CHECK(status IN ('pending','committed','reversed'))`
- **Immutability**
  - Once `status='committed'`, rows are append-only; reversals are new journals with `journal_type='reversal'` referencing original `reference_id`.
- **Hash chain**
  - `hash = H( journal_row_data || previous_hash )` stored for tamper-evidence.

#### Table journal_entry_lines
- **Columns**
  - `id` BIGSERIAL PRIMARY KEY
  - `journal_id` UUID NOT NULL REFERENCES ledger.journal_entries(id) ON DELETE CASCADE
  - `account_id` UUID NOT NULL REFERENCES ledger.ledger_accounts(id)
  - `debit` NUMERIC(30,8) DEFAULT 0
  - `credit` NUMERIC(30,8) DEFAULT 0
  - `currency` CHAR(3) NOT NULL
  - `amount` NUMERIC(30,8) NOT NULL
  - `fx_rate` NUMERIC(24,12) NULL
  - `base_amount` NUMERIC(30,8) NOT NULL
  - `created_at` TIMESTAMP NOT NULL DEFAULT now()
- **Constraints**
  - `CHECK(debit >= 0 AND credit >= 0)`
  - `UNIQUE(journal_id, account_id)` optional to prevent duplicate lines per account
- **Integrity**
  - Application-level check: sum(debit) == sum(credit) in base currency for each journal before commit.

#### Table ledger_balances
- **Columns**
  - `account_id` UUID PRIMARY KEY REFERENCES ledger.ledger_accounts(id)
  - `currency` CHAR(3) NOT NULL
  - `balance` NUMERIC(30,8) NOT NULL DEFAULT 0
  - `as_of` TIMESTAMP NOT NULL DEFAULT now()
  - `version` BIGINT NOT NULL DEFAULT 0
- **Update pattern**
  - Updated atomically within the same DB transaction that writes `journal_entries` and `journal_entry_lines`.

**Posting workflow**
1. **Prepare**: Payment Service requests Ledger Service to create a `journal_entries` row with `status='pending'` and associated `journal_entry_lines`.
2. **Validate**: Ledger Service validates accounts exist, currencies match, and that sum(base_amount_debits) == sum(base_amount_credits).
3. **Commit**: In a single DB transaction:
   - Insert `journal_entries` and `journal_entry_lines`.
   - Update `ledger_balances` for each affected account using `UPDATE ... WHERE version = X` optimistic locking or `SELECT FOR UPDATE`.
   - Set `journal_entries.status='committed'` and compute/store `hash` linking to previous committed journal.
4. **Publish**: Emit `PaymentSettled` or `JournalCommitted` event to Kafka.

**Balance calculation logic**
- **Primary source**: `ledger_balances` snapshot for fast reads.
- **Recompute**: Periodic full-scan recompute from `journal_entry_lines` grouped by `account_id` for integrity checks.
- **FX**: Each line stores `fx_rate` and `base_amount` (platform base currency). Aggregations use `base_amount`.

**Consistency guarantees**
- Use Postgres ACID transactions for journal writes and balance updates.
- Use synchronous replicas for in-region HA.
- Use optimistic locking (`version`) or `SELECT FOR UPDATE` to prevent race conditions.
- Append-only journals with hash chaining for tamper-evidence.

---

---

### SECTION 6: PAYMENT DOMAIN

**Schema**: `payments`

#### Table payment_methods
- **Columns**
  - `id` UUID PRIMARY KEY
  - `owner_type` VARCHAR(16) CHECK(owner_type IN ('user','company'))
  - `owner_id` UUID NOT NULL
  - `type` VARCHAR(32) NOT NULL CHECK(type IN ('bank_account','card','wallet','virtual_account'))
  - `details` JSONB
  - `status` VARCHAR(16) DEFAULT 'active'
  - `created_at` TIMESTAMP
- **Indexes**
  - `idx_payment_methods_owner` on `(owner_type, owner_id)`

#### Table beneficiaries
- **Columns**
  - `id` UUID PRIMARY KEY
  - `owner_id` UUID NOT NULL
  - `owner_type` VARCHAR(16)
  - `name` VARCHAR(255)
  - `bank_account` JSONB
  - `verified` BOOLEAN DEFAULT FALSE
  - `created_at` TIMESTAMP
- **Constraints**
  - `FOREIGN KEY (owner_id) REFERENCES identity.users(id)` or `business.companies(id)` depending on `owner_type`
- **Indexes**
  - `idx_beneficiaries_owner` on `(owner_type, owner_id)`

#### Table payments
- **Columns**
  - `id` UUID PRIMARY KEY
  - `payment_reference` TEXT UNIQUE
  - `initiator_id` UUID NOT NULL
  - `initiator_type` VARCHAR(16) NOT NULL
  - `from_wallet_account_id` UUID NOT NULL REFERENCES wallets.wallet_accounts(id)
  - `to_beneficiary_id` UUID NULL REFERENCES payments.beneficiaries(id)
  - `amount` NUMERIC(30,8) NOT NULL
  - `currency` CHAR(3) NOT NULL
  - `fx_rate` NUMERIC(24,12) NULL
  - `base_amount` NUMERIC(30,8) NOT NULL
  - `status` VARCHAR(32) NOT NULL DEFAULT 'initiated'
  - `route_id` UUID NULL REFERENCES payments.payment_routes(id)
  - `created_at` TIMESTAMP NOT NULL DEFAULT now()
  - `scheduled_for` TIMESTAMP NULL
  - `idempotency_key` TEXT
- **Status flow**
  - `initiated` → `pending` → `processing` → `settled` OR `failed` OR `held` → `reversed`
- **Indexes**
  - `idx_payments_status` on `status`
  - `idx_payments_initiator` on `(initiator_type, initiator_id)`
  - `idx_payments_idempotency` on `idempotency_key`

#### Table transactions
- **Purpose**: Logical record of money movement; may map to one or more payments and journal entries.
- **Columns**
  - `id` UUID PRIMARY KEY
  - `payment_id` UUID NULL REFERENCES payments.id
  - `transaction_type` VARCHAR(32) CHECK(transaction_type IN ('debit','credit','refund','chargeback'))
  - `wallet_account_id` UUID NOT NULL REFERENCES wallets.wallet_accounts(id)
  - `amount` NUMERIC(30,8)
  - `currency` CHAR(3)
  - `status` VARCHAR(32)
  - `created_at` TIMESTAMP
  - `reference` TEXT
- **Indexes**
  - `idx_transactions_wallet` on `wallet_account_id`
  - `idx_transactions_status` on `status`

#### Table payment_routes
- **Columns**
  - `id` UUID PRIMARY KEY
  - `provider` VARCHAR(128)
  - `corridor` VARCHAR(64)
  - `currency_pair` VARCHAR(7)
  - `cost_estimate` NUMERIC(18,6)
  - `latency_ms` INTEGER
  - `success_rate` NUMERIC(5,4)
  - `active` BOOLEAN DEFAULT TRUE
  - `last_updated` TIMESTAMP
- **Indexes**
  - `idx_routes_provider` on `provider`
  - `idx_routes_corridor` on `corridor`

#### Table payment_requests
- **Columns**
  - `id` UUID PRIMARY KEY
  - `requester_id` UUID
  - `requester_type` VARCHAR(16)
  - `amount` NUMERIC(30,8)
  - `currency` CHAR(3)
  - `status` VARCHAR(32) DEFAULT 'open'
  - `expires_at` TIMESTAMP
  - `created_at` TIMESTAMP
- **Indexes**
  - `idx_payment_requests_status` on `status`

**Support for recurring and scheduled payments**
- `payments.scheduled_for` and `payments.recurring_rule` (iCal RRULE stored in JSONB) for recurring schedules. A scheduler service expands recurring rules into scheduled payment jobs.

**Cross-border payments**
- `payments.fx_rate` and `payments.base_amount` store FX at time of initiation. `payment_routes` selected by Routing Service; `treasury.fx_rates` used for quoting.

**Constraints and idempotency**
- `UNIQUE(idempotency_key, initiator_id)` to prevent duplicate payment creation.
- All external provider interactions logged in `payments_provider_logs` table with `status`, `response`, `attempts`.

---

---

### SECTION 7: INVOICING DOMAIN

**Schema**: `invoicing`

#### Table invoices
- **Columns**
  - `id` UUID PRIMARY KEY
  - `company_id` UUID NOT NULL REFERENCES business.companies(id)
  - `customer_id` UUID NULL
  - `invoice_number` TEXT NOT NULL
  - `status` VARCHAR(16) NOT NULL DEFAULT 'draft'
  - `issue_date` DATE
  - `due_date` DATE
  - `currency` CHAR(3)
  - `total_amount` NUMERIC(30,8)
  - `created_at` TIMESTAMP
  - `updated_at` TIMESTAMP
- **Statuses**
  - `draft`, `sent`, `viewed`, `paid`, `overdue`, `cancelled`
- **Constraints**
  - `UNIQUE(company_id, invoice_number)`
- **Indexes**
  - `idx_invoices_company_status` on `(company_id, status)`

#### Table invoice_items
- **Columns**
  - `id` UUID PRIMARY KEY
  - `invoice_id` UUID NOT NULL REFERENCES invoicing.invoices(id) ON DELETE CASCADE
  - `description` TEXT
  - `quantity` NUMERIC(18,6)
  - `unit_price` NUMERIC(30,8)
  - `tax` NUMERIC(18,6)
  - `total` NUMERIC(30,8)
- **Indexes**
  - `idx_invoice_items_invoice` on `invoice_id`

#### Table invoice_payments
- **Columns**
  - `id` UUID PRIMARY KEY
  - `invoice_id` UUID NOT NULL REFERENCES invoicing.invoices(id)
  - `payment_id` UUID NOT NULL REFERENCES payments.payments(id)
  - `amount` NUMERIC(30,8)
  - `currency` CHAR(3)
  - `applied_at` TIMESTAMP
- **Indexes**
  - `idx_invoice_payments_invoice` on `invoice_id`

#### Table invoice_templates
- **Columns**
  - `id` UUID PRIMARY KEY
  - `company_id` UUID NOT NULL
  - `name` VARCHAR(128)
  - `template` JSONB
  - `created_at` TIMESTAMP
- **Indexes**
  - `idx_invoice_templates_company` on `company_id`

**Lifecycle diagram summary**
- `draft` → `sent` (email/webhook) → `viewed` → `paid` (via payment) → `overdue` if past `due_date` → `cancelled` or `disputed`.

---

---

### SECTION 8: PAYROLL DOMAIN

**Schema**: `payroll`

#### Table payroll_runs
- **Columns**
  - `id` UUID PRIMARY KEY
  - `company_id` UUID NOT NULL REFERENCES business.companies(id)
  - `run_date` DATE
  - `status` VARCHAR(16) DEFAULT 'scheduled'
  - `total_amount` NUMERIC(30,8)
  - `currency` CHAR(3)
  - `created_at` TIMESTAMP
- **Statuses**
  - `scheduled`, `processing`, `completed`, `failed`, `cancelled`

#### Table payroll_employees
- **Columns**
  - `id` UUID PRIMARY KEY
  - `payroll_run_id` UUID NOT NULL REFERENCES payroll.payroll_runs(id) ON DELETE CASCADE
  - `employee_id` UUID NOT NULL REFERENCES business.employees(id)
  - `gross_pay` NUMERIC(30,8)
  - `taxes` NUMERIC(30,8)
  - `net_pay` NUMERIC(30,8)
  - `payment_method_id` UUID REFERENCES payments.payment_methods(id)
  - `status` VARCHAR(16)
- **Indexes**
  - `idx_payroll_employees_run` on `payroll_run_id`

#### Table payroll_payments
- **Columns**
  - `id` UUID PRIMARY KEY
  - `payroll_run_id` UUID NOT NULL REFERENCES payroll.payroll_runs(id)
  - `payment_id` UUID NOT NULL REFERENCES payments.payments(id)
  - `amount` NUMERIC(30,8)
  - `currency` CHAR(3)
  - `created_at` TIMESTAMP
- **Indexes**
  - `idx_payroll_payments_run` on `payroll_run_id`

#### Table salary_structures
- **Columns**
  - `id` UUID PRIMARY KEY
  - `company_id` UUID NOT NULL
  - `employee_id` UUID NOT NULL
  - `base_salary` NUMERIC(30,8)
  - `allowances` JSONB
  - `deductions` JSONB
  - `effective_from` DATE
  - `effective_to` DATE
- **Constraints**
  - `FOREIGN KEY (employee_id) REFERENCES business.employees(id)`

**Business rules**
- Payroll runs create holds on company wallet accounts via Ledger journals before disbursement.
- Tax calculations are region-specific; store tax breakdown in `payroll_employees` for audit.
- Reversals create reversal journals and payroll adjustments.

---

---

### SECTION 9: FRAUD DOMAIN

**Schema**: `fraud`

#### Table fraud_scores
- **Columns**
  - `id` UUID PRIMARY KEY
  - `entity_type` VARCHAR(16) CHECK(entity_type IN ('user','payment','beneficiary'))
  - `entity_id` UUID NOT NULL
  - `score` NUMERIC(5,4) NOT NULL
  - `model_version` TEXT
  - `features` JSONB
  - `created_at` TIMESTAMP NOT NULL DEFAULT now()
- **Indexes**
  - `idx_fraud_scores_entity` on `(entity_type, entity_id)`
  - Partition by `created_at` for retention

#### Table fraud_rules
- **Columns**
  - `id` UUID PRIMARY KEY
  - `name` VARCHAR(128)
  - `expression` JSONB
  - `severity` VARCHAR(16)
  - `active` BOOLEAN DEFAULT TRUE
  - `created_at` TIMESTAMP
- **Indexes**
  - `idx_fraud_rules_name` on `name`

#### Table fraud_alerts
- **Columns**
  - `id` UUID PRIMARY KEY
  - `entity_type` VARCHAR(16)
  - `entity_id` UUID
  - `score_id` UUID REFERENCES fraud.fraud_scores(id)
  - `rule_hits` JSONB
  - `status` VARCHAR(16) DEFAULT 'open'
  - `assigned_to` UUID
  - `created_at` TIMESTAMP
  - `resolved_at` TIMESTAMP
- **Indexes**
  - `idx_fraud_alerts_status` on `status`

#### Table risk_profiles
- **Columns**
  - `id` UUID PRIMARY KEY
  - `user_id` UUID REFERENCES identity.users(id)
  - `profile` JSONB
  - `updated_at` TIMESTAMP
- **Indexes**
  - `idx_risk_profiles_user` on `user_id`

#### Table behavior_profiles
- **Columns**
  - `id` UUID PRIMARY KEY
  - `user_id` UUID
  - `features` JSONB
  - `last_updated` TIMESTAMP
- **Retention**
  - Keep rolling 2 years of behavior snapshots; aggregate older to monthly summaries.

**Retention and historical analysis**
- Keep raw fraud_scores and features for 2 years for model training; aggregated features retained longer in analytics.

---

---

### SECTION 10: AI DOMAIN

**Schema**: `ai`

#### Table ai_conversations
- **Columns**
  - `id` UUID PRIMARY KEY
  - `user_id` UUID REFERENCES identity.users(id)
  - `context` JSONB
  - `created_at` TIMESTAMP
  - `last_interaction_at` TIMESTAMP
  - `ttl` INTERVAL DEFAULT '90 days'
- **Retention**
  - Default retention 90 days for conversation context; longer retention only with explicit consent.

#### Table ai_messages
- **Columns**
  - `id` UUID PRIMARY KEY
  - `conversation_id` UUID REFERENCES ai.ai_conversations(id) ON DELETE CASCADE
  - `sender` VARCHAR(16) CHECK(sender IN ('user','system','model'))
  - `message` TEXT
  - `metadata` JSONB
  - `created_at` TIMESTAMP
- **Indexes**
  - `idx_ai_messages_conv` on `conversation_id`

#### Table ai_insights
- **Columns**
  - `id` UUID PRIMARY KEY
  - `user_id` UUID
  - `insight_type` VARCHAR(64)
  - `payload` JSONB
  - `source` VARCHAR(64)
  - `created_at` TIMESTAMP
- **Access rules**
  - Only services with `ai_read` role can query; PII redaction applied.

#### Table ai_predictions
- **Columns**
  - `id` UUID PRIMARY KEY
  - `model` VARCHAR(128)
  - `model_version` VARCHAR(64)
  - `input_features` JSONB
  - `prediction` JSONB
  - `confidence` NUMERIC(5,4)
  - `created_at` TIMESTAMP
- **Indexes**
  - `idx_ai_predictions_model` on `model`

#### Table ai_recommendations
- **Columns**
  - `id` UUID PRIMARY KEY
  - `user_id` UUID
  - `recommendation` JSONB
  - `context` JSONB
  - `created_at` TIMESTAMP

**Security and privacy**
- All AI tables encrypted at rest; access logged to `audit.audit_events`. PII redaction and consent flags required for long-term storage.

---

---

### SECTION 11: TREASURY DOMAIN

**Schema**: `treasury`

#### Table cash_positions
- **Columns**
  - `id` UUID PRIMARY KEY
  - `account_id` UUID REFERENCES ledger.ledger_accounts(id)
  - `currency` CHAR(3)
  - `position` NUMERIC(30,8)
  - `as_of` TIMESTAMP
- **Indexes**
  - `idx_cash_positions_account` on `account_id`

#### Table liquidity_forecasts
- **Columns**
  - `id` UUID PRIMARY KEY
  - `forecast_date` DATE
  - `currency` CHAR(3)
  - `predicted_position` NUMERIC(30,8)
  - `confidence` NUMERIC(5,4)
  - `model_version` TEXT
  - `created_at` TIMESTAMP
- **Indexes**
  - `idx_liquidity_forecasts_date` on `forecast_date`

#### Table settlement_recommendations
- **Columns**
  - `id` UUID PRIMARY KEY
  - `recommendation` JSONB
  - `priority` INTEGER
  - `created_at` TIMESTAMP
- **Usage**
  - Generated by Treasury AI and surfaced to Treasury Service for automated sweeps.

#### Table currency_exposure
- **Columns**
  - `id` UUID PRIMARY KEY
  - `currency` CHAR(3)
  - `exposure_amount` NUMERIC(30,8)
  - `as_of` TIMESTAMP

---

---

### SECTION 12: COMPLIANCE DOMAIN

**Schema**: `compliance`

#### Table kyc_profiles
- **Columns**
  - `id` UUID PRIMARY KEY
  - `user_id` UUID REFERENCES identity.users(id)
  - `status` VARCHAR(16) DEFAULT 'pending'
  - `risk_score` NUMERIC(5,4)
  - `data` JSONB
  - `created_at` TIMESTAMP
- **Indexes**
  - `idx_kyc_user` on `user_id`

#### Table kyc_documents
- **Columns**
  - `id` UUID PRIMARY KEY
  - `kyc_profile_id` UUID REFERENCES compliance.kyc_profiles(id) ON DELETE CASCADE
  - `document_type` VARCHAR(64)
  - `s3_key` TEXT
  - `hash` TEXT
  - `uploaded_at` TIMESTAMP
- **Security**
  - S3 objects encrypted; access via signed URLs; metadata stored in DB.

#### Table kyb_profiles
- **Columns**
  - `id` UUID PRIMARY KEY
  - `company_id` UUID REFERENCES business.companies(id)
  - `status` VARCHAR(16)
  - `data` JSONB
  - `created_at` TIMESTAMP

#### Table aml_checks
- **Columns**
  - `id` UUID PRIMARY KEY
  - `entity_type` VARCHAR(16)
  - `entity_id` UUID
  - `check_type` VARCHAR(64)
  - `result` JSONB
  - `created_at` TIMESTAMP
- **Indexes**
  - `idx_aml_checks_entity` on `(entity_type, entity_id)`

#### Table sanctions_checks
- **Columns**
  - `id` UUID PRIMARY KEY
  - `entity_type` VARCHAR(16)
  - `entity_id` UUID
  - `list_name` VARCHAR(128)
  - `match` BOOLEAN
  - `details` JSONB
  - `checked_at` TIMESTAMP

**Workflows**
- KYC/KYB orchestration via `compliance` service; results stored in `kyc_profiles`/`kyb_profiles`. AML checks produce `aml_checks` and create `fraud_alerts` or `compliance_cases` when matches occur.

---

---

### SECTION 13: AUDIT DOMAIN

**Schema**: `audit`

#### Table audit_logs
- **Columns**
  - `id` BIGSERIAL PRIMARY KEY
  - `domain` VARCHAR(64) NOT NULL
  - `entity` VARCHAR(64)
  - `entity_id` UUID
  - `action` VARCHAR(64)
  - `performed_by` UUID
  - `performed_at` TIMESTAMP NOT NULL DEFAULT now()
  - `payload` JSONB
  - `hash` TEXT NOT NULL
- **Immutability**
  - Append-only; no UPDATE/DELETE allowed by application role.
- **Indexes**
  - `idx_audit_domain_time` on `(domain, performed_at)`
  - Partition by `performed_at` monthly for scale.

#### Table audit_events
- **Columns**
  - `id` UUID PRIMARY KEY
  - `log_id` BIGINT REFERENCES audit.audit_logs(id)
  - `event_type` VARCHAR(64)
  - `details` JSONB
  - `created_at` TIMESTAMP

#### Table system_changes
- **Columns**
  - `id` UUID PRIMARY KEY
  - `object_type` VARCHAR(64)
  - `object_id` UUID
  - `change` JSONB
  - `changed_by` UUID
  - `changed_at` TIMESTAMP

**Retention**
- Audit logs retention per jurisdiction; default 7 years for financial events. Older logs archived to WORM S3.

**Tamper evidence**
- Each `audit_logs.hash` computed chaining previous hash per domain to detect tampering.

---

---

### SECTION 14: NOTIFICATION DOMAIN

**Schema**: `notifications`

#### Table notification_templates
- **Columns**
  - `id` UUID PRIMARY KEY
  - `name` VARCHAR(128)
  - `channel` VARCHAR(16) CHECK(channel IN ('email','sms','push','inapp'))
  - `template` JSONB
  - `created_at` TIMESTAMP

#### Table notifications
- **Columns**
  - `id` UUID PRIMARY KEY
  - `recipient_id` UUID
  - `recipient_type` VARCHAR(16)
  - `template_id` UUID REFERENCES notifications.notification_templates(id)
  - `payload` JSONB
  - `status` VARCHAR(16) DEFAULT 'queued'
  - `sent_at` TIMESTAMP
  - `created_at` TIMESTAMP
- **Indexes**
  - `idx_notifications_status` on `status`

#### Table notification_preferences
- **Columns**
  - `id` UUID PRIMARY KEY
  - `user_id` UUID REFERENCES identity.users(id)
  - `preferences` JSONB
  - `updated_at` TIMESTAMP

---

---

### SECTION 15: ANALYTICS DOMAIN

**Schema**: `analytics` (operational analytics) and Data Warehouse (OLAP)

#### Operational analytics tables
- `analytics_events` (event_type, payload JSONB, user_id, created_at) partitioned by day.
- `daily_metrics` (date, tenant_id, metric_name, value)

#### Data warehouse model
- **Staging**: CDC streams from Postgres to DW.
- **Star schema** for BI:

**Fact table** `fact_transactions`
- `transaction_id`, `wallet_account_id`, `amount_base`, `currency`, `transaction_date`, `payment_id`, `company_id`, `user_id`, `ledger_journal_id`

**Dimension tables**
- `dim_date` (date, year, month, day_of_week)
- `dim_user` (user_id, user_tier, country)
- `dim_company` (company_id, industry, size)
- `dim_currency` (currency_code, decimals)
- `dim_provider` (provider_id, name, corridor)

**Aggregates**
- `daily_revenue`, `daily_volume`, `avg_ticket_size`, `failure_rate` precomputed in ClickHouse.

---

---

### SECTION 16: ENTITY RELATIONSHIP DIAGRAM

**Textual ERD summary**
Below is a compact ERD mapping key relationships. Use this as the canonical relationship map for implementation.

```
identity.users 1---* business.company_members *---1 business.companies
identity.users 1---* wallets.wallets *---1 wallets.wallet_accounts 1---1 wallets.wallet_balances
wallets.wallet_accounts 1---* payments.transactions *---1 ledger.journal_entry_lines *---1 ledger.journal_entries
payments.payments 1---* payments.transactions
payments.payments *---1 payments.payment_routes
business.companies 1---* invoicing.invoices 1---* invoicing.invoice_items
invoicing.invoices 1---* invoicing.invoice_payments *---1 payments.payments
payments.payments 1---* fraud.fraud_scores 1---* fraud.fraud_alerts
identity.users 1---* ai.ai_conversations 1---* ai.ai_messages
identity.users 1---* notifications.notifications
compliance.kyc_profiles *---1 identity.users
audit.audit_logs <--- all domain tables (FKs or logged references)
treasury.cash_positions *---1 ledger.ledger_accounts
```

**ERD visual guidance**
- **Primary hubs**: `users`, `wallets.wallet_accounts`, `ledger.ledger_accounts`, `payments.payments`, `business.companies`.
- **Audit trail**: All critical actions write to `audit.audit_logs` with `domain` and `entity_id`.

---

---

### SECTION 17: INDEXING STRATEGY

**Primary indexes**
- Primary keys on all `id` columns (UUID or BIGSERIAL).

**Secondary indexes**
- Frequently queried columns: `users.email`, `wallets.owner`, `payments.status`, `transactions.wallet_account_id`, `ledger.journal_entries.created_at`, `fraud.fraud_scores(entity_type, entity_id)`.

**Composite indexes**
- `payments (initiator_type, initiator_id, idempotency_key)` for idempotency and lookups.
- `invoicing (company_id, status, due_date)` for invoice queries.
- `ledger.journal_entry_lines (account_id, created_at)` partition-friendly index.
- `audit.audit_logs (domain, performed_at)` for fast audit queries.

**Search indexes**
- OpenSearch indices for `invoices`, `beneficiaries`, `kyc_documents` metadata. Use `invoice_number`, `customer_name`, `description` fields.

**Optimization strategies**
- Use partial indexes for active statuses: e.g., `CREATE INDEX idx_payments_pending ON payments (created_at) WHERE status = 'pending'`.
- Use BRIN indexes for very large time-series partitions (audit logs, journal_entry_lines) on `created_at`.

---

---

### SECTION 18: PARTITIONING STRATEGY

**Partition large tables by time and tenant where appropriate**

- **transactions**
  - Partition by `created_at` monthly using declarative partitioning: `transactions_2026_06`, etc.
  - Sub-partition by `region` or `tenant_id` for enterprise tenants with heavy volume.

- **journal_entry_lines**
  - Partition by `created_at` monthly and by `account_id` hash for parallelism.
  - Use `PARTITION BY RANGE (created_at)` and create partitions per month.

- **audit.audit_logs**
  - Partition by `performed_at` monthly; older partitions archived to S3 and optionally moved to read-only storage.

- **analytics.analytics_events**
  - Partition by day; use retention TTL to drop old partitions.

**Benefits**
- Faster vacuuming and maintenance.
- Improved query performance for time-bounded queries.
- Easier archival and compliance retention.

---

---

### SECTION 19: DATA RETENTION POLICIES

**Default retention guidelines** (configurable per jurisdiction)

- **Transactions**: Keep full transactional records and ledger journals for **7 years** (or longer if local law requires). Active partitions online for 2 years; older partitions archived to WORM S3 with fast retrieval.
- **Audit Logs**: Keep online for **7 years**; archive to immutable storage for **10+ years**.
- **AI Conversations**: Default **90 days** unless explicit user consent extends retention; anonymized aggregates retained longer for model training.
- **Notifications**: Keep history **1 year**; templates indefinite.
- **KYC Documents**: Retain per regulatory requirements (commonly **5–10 years** after account closure); store encrypted and access-controlled.
- **Analytics Data**: Raw event data retained in DW for **2 years**; aggregated metrics retained longer (7+ years).
- **Fraud Scores and Features**: Raw features and scores retained **2 years** for model training; aggregated features retained longer.

**Archival**
- Use S3 with object lock (WORM) for compliance. Maintain catalog in Postgres for retrieval.

---

---

### SECTION 20: DATABASE SECURITY

**Encryption**
- **At rest**: Postgres data volumes encrypted using KMS-managed keys.
- **In transit**: TLS for all DB connections; enforce mTLS for service-to-db where supported.
- **Field-level encryption**: PII fields (e.g., `kyc_documents.hash`, `payment_methods.details`) encrypted at application layer or using Postgres `pgcrypto` with keys in Vault.

**Access control**
- **Least privilege**: Each service has a dedicated DB role with minimal privileges.
- **Row-level security**: Use RLS for tenant isolation where multi-tenant DB is used.
- **Audit**: All DB access logged; DDL changes require approval and are logged in `audit.system_changes`.

**Data masking**
- Use views for non-privileged consumers that mask PII (e.g., show last 4 digits of account numbers).

**Secrets management**
- Use Vault for DB credentials rotation and encryption keys. No secrets in code or environment variables.

**Audit controls**
- Immutable audit logs with hash chaining. DDL and schema changes recorded in `audit.system_changes`.

---

---

### SECTION 21: DATABASE SCALABILITY

**Scaling plan by user volume**

- **100K users**
  - Single-region Postgres primary with 1–2 read replicas.
  - Partitioning for transactions monthly.
  - Redis cluster for caching.

- **1M users**
  - Multi-AZ Postgres with synchronous replicas.
  - More partitions and read replicas.
  - Offload analytics to ClickHouse; use Debezium for CDC.

- **10M users**
  - Multi-region active-active for stateless services.
  - Shard Postgres by tenant groups or use Citus for distributed Postgres.
  - Use dedicated DB clusters for ledger and transactional workloads.
  - Increase Kafka cluster size and partitions.

- **100M users**
  - Full sharding strategy: tenant-aware sharding and per-region DB clusters.
  - Consider distributed SQL (CockroachDB) for global consistency or Citus for scale-out Postgres.
  - Use multi-tier storage: hot (online), warm (read-only replicas), cold (archived S3).

**Replication**
- Synchronous replicas in-region for HA; asynchronous cross-region for DR.
- Logical replication for CDC to analytics.

**Read replicas**
- Use read replicas for reporting and read-heavy services; enforce read-only roles.

**Sharding considerations**
- Shard by `tenant_id` for enterprise customers.
- For global users without tenant, use hash-based sharding on `user_id` or `wallet_account_id`.

---

---

### SECTION 22: OUTPUT DELIVERABLES FOR IMPLEMENTATION

**1. PostgreSQL schema recommendations**
- Use separate schemas per domain.
- Use UUIDs for global uniqueness.
- Use `NUMERIC(30,8)` for monetary values.
- Use declarative partitioning for large tables.
- Use `pgcrypto` or application-level encryption for sensitive fields.

**2. Constraints and foreign keys**
- All FK relationships defined in each table section above.
- Use `ON DELETE RESTRICT` for financial tables; use `ON DELETE CASCADE` only for non-financial child records like `invoice_items`.

**3. Unique indexes**
- `users.email`, `wallet_accounts.account_code`, `payments.payment_reference`, `invoices(company_id, invoice_number)`.

**4. Partitioning design**
- Monthly partitions for `transactions`, `journal_entry_lines`, `audit_logs`, `analytics_events`.

**5. Data warehouse model**
- Star schema with `fact_transactions` and dimensions `dim_date`, `dim_user`, `dim_company`, `dim_currency`, `dim_provider`. Use CDC to populate DW.

**6. Service ownership mapping**
- `identity` → Auth Service
- `wallets` → Wallet Service
- `payments` → Payment Service
- `ledger` → Ledger Service
- `business` → Company Service
- `fraud` → Fraud Service
- `ai` → AI Copilot Service
- `compliance` → Compliance Service
- `audit` → Audit Service
- `notifications` → Notification Service
- `analytics` → Analytics Service

**7. Database governance policies**
- **Schema change policy**: All DDL via PRs, reviewed by DBAs, applied via CI with migration tool (Flyway/Liquibase).
- **Access policy**: Role-based DB access; production credentials rotated monthly.
- **Backup policy**: WAL shipping + daily snapshots; test restores quarterly.
- **Change auditing**: All schema and permission changes logged in `audit.system_changes`.
- **Data retention policy**: Enforced via partition drop and archival jobs; legal holds override retention.

---

## Appendix A Sample DDL Snippets

**Example ledger journal and lines DDL**
```sql
CREATE SCHEMA ledger;

CREATE TABLE ledger.ledger_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_code TEXT UNIQUE NOT NULL,
  account_type VARCHAR(32) NOT NULL,
  owner_id UUID,
  currency CHAR(3) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  status VARCHAR(16) DEFAULT 'active'
);

CREATE TABLE ledger.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_type VARCHAR(64) NOT NULL,
  reference_id UUID,
  narration TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID,
  status VARCHAR(16) NOT NULL DEFAULT 'pending',
  hash TEXT NOT NULL,
  previous_hash TEXT
);

CREATE TABLE ledger.journal_entry_lines (
  id BIGSERIAL PRIMARY KEY,
  journal_id UUID NOT NULL REFERENCES ledger.journal_entries(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES ledger.ledger_accounts(id),
  debit NUMERIC(30,8) DEFAULT 0,
  credit NUMERIC(30,8) DEFAULT 0,
  currency CHAR(3) NOT NULL,
  amount NUMERIC(30,8) NOT NULL,
  fx_rate NUMERIC(24,12),
  base_amount NUMERIC(30,8) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  CHECK (debit >= 0 AND credit >= 0)
);
```

**Partition example for journal_entry_lines**
```sql
CREATE TABLE ledger.journal_entry_lines_parent (
  id BIGSERIAL,
  journal_id UUID,
  account_id UUID,
  debit NUMERIC(30,8),
  credit NUMERIC(30,8),
  currency CHAR(3),
  amount NUMERIC(30,8),
  base_amount NUMERIC(30,8),
  created_at TIMESTAMPTZ
) PARTITION BY RANGE (created_at);

CREATE TABLE ledger.journal_entry_lines_2026_06 PARTITION OF ledger.journal_entry_lines_parent
  FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
```

---

## Closing summary

This database architecture and ERD define a target foundation for PaymentFlow AI. The design aims to enforce **financial integrity** through a ledger-first model and support multi-currency, cross-border, AI, fraud, regulatory, and audit use cases. Production readiness remains conditional on implementation, automated invariants, migration testing, security review, load testing, recovery drills, and jurisdiction-specific compliance approval.
