import type { HTMLAttributes, ReactNode } from 'react';

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  align?: string;
  justify?: string;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string;
}

export function Flex({
  children,
  direction = 'row',
  align,
  justify,
  wrap,
  gap,
  style,
  className = '',
  ...rest
}: FlexProps) {
  return (
    <div
      className={`flex ${className}`.trim()}
      style={{
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap,
        gap,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
