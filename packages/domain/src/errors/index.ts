export class DomainError extends Error {
  readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

export class InsufficientFundsError extends DomainError {
  constructor(message = 'Insufficient funds for this operation') {
    super(message, 'INSUFFICIENT_FUNDS');
  }
}

export class InvalidCurrencyError extends DomainError {
  constructor(message = 'Invalid or unsupported currency') {
    super(message, 'INVALID_CURRENCY');
  }
}

export class ComplianceViolationError extends DomainError {
  constructor(message = 'Operation blocked by compliance policy') {
    super(message, 'COMPLIANCE_VIOLATION');
  }
}

export class DuplicatePaymentError extends DomainError {
  constructor(message = 'Payment with this idempotency key already exists') {
    super(message, 'DUPLICATE_PAYMENT');
  }
}

export class WalletNotFoundError extends DomainError {
  constructor(message = 'Wallet not found') {
    super(message, 'WALLET_NOT_FOUND');
  }
}
