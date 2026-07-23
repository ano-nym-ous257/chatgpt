import type { HTMLAttributes, ElementType, ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  padding?: string;
  as?: ElementType;
}

export function Section({
  children,
  padding = '32px 0',
  as: Component = 'section',
  style,
  className = '',
  ...rest
}: SectionProps) {
  return (
    <Component className={`section ${className}`.trim()} style={{ padding, ...style }} {...rest}>
      {children}
    </Component>
  );
}
