import React from 'react';

/**
 * Card wrapper (starter)
 * Props: children, className
 */
export default function Card({ children, className = '', ...rest }) {
  return (
    <div className={`card--glass card--elevated ${className}`} {...rest}>
      {children}
    </div>
  );
}
