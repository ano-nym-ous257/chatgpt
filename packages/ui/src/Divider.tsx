import type { HTMLAttributes } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation;
}

export function Divider({
  orientation = 'horizontal',
  style,
  className = '',
  ...rest
}: DividerProps) {
  return (
    <hr
      className={`divider divider--${orientation} ${className}`.trim()}
      role="separator"
      aria-orientation={orientation}
      style={{
        border: 'none',
        margin: 0,
        flexShrink: 0,
        ...(orientation === 'horizontal'
          ? { width: '100%', height: '1px' }
          : { width: '1px', height: '100%', alignSelf: 'stretch' }),
        ...style,
      }}
      {...rest}
    />
  );
}
