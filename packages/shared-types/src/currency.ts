/**
 * @paymentflow/shared-types — Currency types
 *
 * ISO 4217 currency codes and related types used across services.
 */

/** Supported ISO 4217 currency codes */
export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'NGN'
  | 'GHS'
  | 'KES'
  | 'ZAR'
  | 'CAD'
  | 'AUD'
  | 'JPY'
  | 'CNY'
  | 'INR';

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  /** Number of decimal places (e.g. 2 for USD, 0 for JPY) */
  decimalPlaces: number;
}

/**
 * Monetary amount stored as a string to avoid floating-point issues.
 * All financial values must use this type — never bare `number`.
 */
export interface MonetaryAmount {
  /** Decimal string (e.g. "1234.56") */
  amount: string;
  currency: CurrencyCode;
}
