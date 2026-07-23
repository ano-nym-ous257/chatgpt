import type { HTMLAttributes, ElementType, ReactNode } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  maxWidth?: string;
  padding?: string;
  as?: ElementType;
}

export function Container({
  children,
  maxWidth = '1200px',
  padding = '0 16px',
  as: Component = 'div',
  style,
  className = '',
  ...rest
}: ContainerProps) {
  return (
    <Component
      className={`container ${className}`.trim()}
      style={{ maxWidth, padding, marginInline: 'auto', width: '100%', ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
}
