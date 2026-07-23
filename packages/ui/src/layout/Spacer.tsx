import type { HTMLAttributes } from 'react';

export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  size: string;
}

export function Spacer({ size, style, className = '', ...rest }: SpacerProps) {
  return (
    <div
      className={`spacer ${className}`.trim()}
      aria-hidden="true"
      style={{ flexShrink: 0, width: size, height: size, ...style }}
      {...rest}
    />
  );
}
