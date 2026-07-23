import type { UserId, WalletId, PaymentId, Money, Timestamp } from '../value-objects';
import type { CurrencyCode } from '../enums';

export interface WalletCreated {
  readonly type: 'WalletCreated';
  readonly walletId: WalletId;
  readonly userId: UserId;
  readonly currency: CurrencyCode;
  readonly occurredAt: Timestamp;
}

export interface WalletFunded {
  readonly type: 'WalletFunded';
  readonly walletId: WalletId;
  readonly amount: Money;
  readonly occurredAt: Timestamp;
}

export interface WalletDebited {
  readonly type: 'WalletDebited';
  readonly walletId: WalletId;
  readonly amount: Money;
  readonly occurredAt: Timestamp;
}

export interface PaymentInitiated {
  readonly type: 'PaymentInitiated';
  readonly paymentId: PaymentId;
  readonly userId: UserId;
  readonly amount: Money;
  readonly occurredAt: Timestamp;
}

export interface PaymentCompleted {
  readonly type: 'PaymentCompleted';
  readonly paymentId: PaymentId;
  readonly occurredAt: Timestamp;
}

export interface PaymentFailed {
  readonly type: 'PaymentFailed';
  readonly paymentId: PaymentId;
  readonly reason: string;
  readonly occurredAt: Timestamp;
}

export interface ExchangeRateUpdated {
  readonly type: 'ExchangeRateUpdated';
  readonly from: CurrencyCode;
  readonly to: CurrencyCode;
  readonly rate: string;
  readonly occurredAt: Timestamp;
}

export interface UserRegistered {
  readonly type: 'UserRegistered';
  readonly userId: UserId;
  readonly email: string;
  readonly occurredAt: Timestamp;
}

export type DomainEvent =
  | WalletCreated
  | WalletFunded
  | WalletDebited
  | PaymentInitiated
  | PaymentCompleted
  | PaymentFailed
  | ExchangeRateUpdated
  | UserRegistered;
