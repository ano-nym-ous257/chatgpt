import type { HTMLAttributes, ReactNode } from 'react';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  columns?: number | string;
  gap?: string;
  minChildWidth?: string;
}

export function Grid({
  children,
  columns,
  gap = '16px',
  minChildWidth,
  style,
  className = '',
  ...rest
}: GridProps) {
  const templateColumns = minChildWidth
    ? `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`
    : typeof columns === 'number'
      ? `repeat(${String(columns)}, 1fr)`
      : (columns ?? 'repeat(auto-fit, minmax(0, 1fr))');

  return (
    <div
      className={`grid ${className}`.trim()}
      style={{ display: 'grid', gridTemplateColumns: templateColumns, gap, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
