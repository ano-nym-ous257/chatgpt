import type {
  UserId,
  WalletId,
  PaymentId,
  TransactionId,
  BeneficiaryId,
  AccountId,
  SettlementId,
  ComplianceCaseId,
  NotificationId,
  AuditLogId,
  QuoteId,
  LedgerEntryId,
  ExchangeRateId,
  Money,
  ExchangeRateValue,
  Reference,
  Timestamp,
} from '../value-objects';

import type {
  CurrencyCode,
  UserStatus,
  WalletStatus,
  PaymentStatus,
  TransactionStatus,
  SettlementStatus,
  ComplianceStatus,
  NotificationType,
  LedgerEntryType,
  PaymentMethod,
} from '../enums';

export interface User {
  readonly id: UserId;
  readonly email: string;
  readonly status: UserStatus;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

export interface Wallet {
  readonly id: WalletId;
  readonly userId: UserId;
  readonly currency: CurrencyCode;
  readonly balance: Money;
  readonly status: WalletStatus;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

export interface Account {
  readonly id: AccountId;
  readonly userId: UserId;
  readonly type: string;
  readonly provider: string;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

export interface Beneficiary {
  readonly id: BeneficiaryId;
  readonly userId: UserId;
  readonly name: string;
  readonly accountDetails: string;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

export interface Payment {
  readonly id: PaymentId;
  readonly userId: UserId;
  readonly sourceWalletId: WalletId;
  readonly beneficiaryId: BeneficiaryId;
  readonly amount: Money;
  readonly status: PaymentStatus;
  readonly method: PaymentMethod;
  readonly idempotencyKey: string;
  readonly reference: Reference;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

export interface Transaction {
  readonly id: TransactionId;
  readonly walletId: WalletId;
  readonly paymentId: PaymentId | null;
  readonly amount: Money;
  readonly status: TransactionStatus;
  readonly reference: Reference;
  readonly createdAt: Timestamp;
}

export interface LedgerEntry {
  readonly id: LedgerEntryId;
  readonly transactionId: TransactionId;
  readonly walletId: WalletId;
  readonly type: LedgerEntryType;
  readonly amount: Money;
  readonly balance: Money;
  readonly createdAt: Timestamp;
}

export interface ExchangeRate {
  readonly id: ExchangeRateId;
  readonly rate: ExchangeRateValue;
  readonly createdAt: Timestamp;
}

export interface Quote {
  readonly id: QuoteId;
  readonly userId: UserId;
  readonly sourceAmount: Money;
  readonly targetAmount: Money;
  readonly rate: ExchangeRateValue;
  readonly expiresAt: Timestamp;
  readonly createdAt: Timestamp;
}

export interface Settlement {
  readonly id: SettlementId;
  readonly paymentId: PaymentId;
  readonly status: SettlementStatus;
  readonly amount: Money;
  readonly settledAt: Timestamp | null;
  readonly createdAt: Timestamp;
}

export interface ComplianceCase {
  readonly id: ComplianceCaseId;
  readonly userId: UserId;
  readonly paymentId: PaymentId | null;
  readonly status: ComplianceStatus;
  readonly reason: string;
  readonly createdAt: Timestamp;
  readonly updatedAt: Timestamp;
}

export interface Notification {
  readonly id: NotificationId;
  readonly userId: UserId;
  readonly type: NotificationType;
  readonly title: string;
  readonly message: string;
  readonly read: boolean;
  readonly createdAt: Timestamp;
}

export interface AuditLog {
  readonly id: AuditLogId;
  readonly actor: UserId;
  readonly action: string;
  readonly resource: string;
  readonly resourceId: string;
  readonly metadata: Record<string, unknown>;
  readonly createdAt: Timestamp;
}
