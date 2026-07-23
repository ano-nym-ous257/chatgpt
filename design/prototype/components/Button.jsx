import React from 'react';

/**
 * Button component (starter)
 * Props: variant: 'primary' | 'ghost' | 'danger', type, children, className, onClick
 */
export default function Button({ variant = 'primary', type = 'button', children, className = '', ...rest }) {
  const base = 'btn';
  const variantClass = variant === 'primary' ? 'btn--primary' : variant === 'danger' ? 'btn--danger' : 'btn--ghost';

  return (
    <button type={type} className={`${base} ${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  );
}
