import type { HTMLAttributes } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  label?: string;
}

const SIZE_PX: Record<SpinnerSize, string> = {
  sm: '16px',
  md: '24px',
  lg: '40px',
};

export function Spinner({
  size = 'md',
  label = 'Loading',
  style,
  className = '',
  ...rest
}: SpinnerProps) {
  const dimension = SIZE_PX[size];

  return (
    <span
      className={`spinner spinner--${size} ${className}`.trim()}
      role="status"
      aria-label={label}
      style={{
        display: 'inline-block',
        width: dimension,
        height: dimension,
        ...style,
      }}
      {...rest}
    >
      <span className="spinner__track" aria-hidden="true" />
    </span>
  );
}
