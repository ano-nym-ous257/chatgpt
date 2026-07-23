/**
 * @paymentflow/shared-types — Wallet types
 */

import type { CurrencyCode, MonetaryAmount } from './currency';

export type WalletStatus = 'pending_kyc' | 'active' | 'frozen' | 'closed';
export type WalletType = 'consumer' | 'business';

export interface Wallet {
  id: string;
  ownerId: string;
  type: WalletType;
  status: WalletStatus;
  defaultCurrency: CurrencyCode;
  createdAt: string;
  updatedAt: string;
}

export interface WalletBalance {
  walletId: string;
  currency: CurrencyCode;
  available: MonetaryAmount;
  pending: MonetaryAmount;
  reserved: MonetaryAmount;
}
