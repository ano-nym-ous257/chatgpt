import type { CurrencyCode } from '../enums';

declare const __brand: unique symbol;
type Brand<T, B extends string> = T & { readonly [__brand]: B };

export type UserId = Brand<string, 'UserId'>;
export type WalletId = Brand<string, 'WalletId'>;
export type PaymentId = Brand<string, 'PaymentId'>;
export type TransactionId = Brand<string, 'TransactionId'>;
export type BeneficiaryId = Brand<string, 'BeneficiaryId'>;
export type AccountId = Brand<string, 'AccountId'>;
export type SettlementId = Brand<string, 'SettlementId'>;
export type ComplianceCaseId = Brand<string, 'ComplianceCaseId'>;
export type NotificationId = Brand<string, 'NotificationId'>;
export type AuditLogId = Brand<string, 'AuditLogId'>;
export type QuoteId = Brand<string, 'QuoteId'>;
export type LedgerEntryId = Brand<string, 'LedgerEntryId'>;
export type ExchangeRateId = Brand<string, 'ExchangeRateId'>;
export type Reference = Brand<string, 'Reference'>;

export interface Money {
  readonly amount: string;
  readonly currency: CurrencyCode;
}

export interface ExchangeRateValue {
  readonly from: CurrencyCode;
  readonly to: CurrencyCode;
  readonly rate: string;
  readonly timestamp: Timestamp;
}

export type Timestamp = Brand<string, 'Timestamp'>;
