/**
 * @paymentflow/shared-types — Payment types
 */

import type { CurrencyCode, MonetaryAmount } from './currency';

export type PaymentStatus =
  | 'created'
  | 'pending_fraud_check'
  | 'fraud_approved'
  | 'fraud_declined'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export type PaymentMethod =
  | 'wallet_transfer'
  | 'bank_transfer'
  | 'card'
  | 'mobile_money';

export type PaymentDirection = 'inbound' | 'outbound';

export interface Payment {
  id: string;
  idempotencyKey: string;
  sourceWalletId: string;
  destinationWalletId?: string;
  beneficiaryId?: string;
  amount: MonetaryAmount;
  fee: MonetaryAmount;
  sourceCurrency: CurrencyCode;
  destinationCurrency: CurrencyCode;
  method: PaymentMethod;
  direction: PaymentDirection;
  status: PaymentStatus;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
