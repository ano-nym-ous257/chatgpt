import type { HTMLAttributes, ReactNode } from 'react';

export type AlertVariant = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant: AlertVariant;
  title?: string;
}

const VARIANT_CLASS: Record<AlertVariant, string> = {
  success: 'alert--success',
  warning: 'alert--warning',
  error: 'alert--error',
  info: 'alert--info',
};

export function Alert({ children, variant, title, className = '', ...rest }: AlertProps) {
  const role = variant === 'error' ? 'alert' : 'status';

  return (
    <div className={`alert ${VARIANT_CLASS[variant]} ${className}`.trim()} role={role} {...rest}>
      {title && <p className="alert__title">{title}</p>}
      <div className="alert__content">{children}</div>
    </div>
  );
}
