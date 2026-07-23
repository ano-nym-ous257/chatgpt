import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'ghost' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button content */
  children: ReactNode;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'btn--primary',
  ghost: 'btn--ghost',
  danger: 'btn--danger',
};

export default function Button({
  variant = 'primary',
  type = 'button',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={`btn ${VARIANT_CLASS[variant]} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
