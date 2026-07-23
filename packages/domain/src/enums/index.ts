export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CHF'
  | 'CNY'
  | 'INR'
  | 'NGN'
  | 'KES'
  | 'ZAR'
  | 'BRL'
  | 'MXN'
  | 'AED'
  | 'SGD'
  | 'HKD';

export type WalletStatus = 'pending_kyc' | 'active' | 'frozen' | 'closed';

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

export type TransactionStatus = 'pending' | 'confirmed' | 'failed' | 'reversed';

export type SettlementStatus = 'pending' | 'in_progress' | 'settled' | 'failed';

export type ComplianceStatus =
  'pending_review' | 'under_review' | 'approved' | 'rejected' | 'escalated';

export type NotificationType =
  | 'payment_received'
  | 'payment_sent'
  | 'payment_failed'
  | 'wallet_funded'
  | 'wallet_frozen'
  | 'kyc_approved'
  | 'kyc_rejected'
  | 'security_alert';

export type UserStatus = 'pending_verification' | 'active' | 'locked' | 'suspended' | 'closed';

export type LedgerEntryType = 'debit' | 'credit';

export type PaymentMethod = 'bank_transfer' | 'card' | 'wallet' | 'mobile_money';
