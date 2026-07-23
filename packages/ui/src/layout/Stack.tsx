import type { HTMLAttributes, ReactNode } from 'react';

export type StackDirection = 'vertical' | 'horizontal';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: StackDirection;
  gap?: string;
  align?: string;
  justify?: string;
}

export function Stack({
  children,
  direction = 'vertical',
  gap = '16px',
  align,
  justify,
  style,
  className = '',
  ...rest
}: StackProps) {
  return (
    <div
      className={`stack ${className}`.trim()}
      style={{
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        gap,
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
