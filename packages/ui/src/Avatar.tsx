import type { HTMLAttributes } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  name?: string;
  size?: AvatarSize;
  alt?: string;
}

const SIZE_PX: Record<AvatarSize, string> = {
  sm: '32px',
  md: '40px',
  lg: '56px',
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === '') return '';
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return `${parts[0]!.charAt(0)}${parts[parts.length - 1]!.charAt(0)}`.toUpperCase();
}

export function Avatar({
  src,
  name,
  size = 'md',
  alt,
  style,
  className = '',
  ...rest
}: AvatarProps) {
  const dimension = SIZE_PX[size];
  const ariaLabel = alt ?? name ?? 'Avatar';

  return (
    <span
      className={`avatar avatar--${size} ${className}`.trim()}
      role="img"
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dimension,
        height: dimension,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={ariaLabel}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span className="avatar__initials">{name ? getInitials(name) : '?'}</span>
      )}
    </span>
  );
}
