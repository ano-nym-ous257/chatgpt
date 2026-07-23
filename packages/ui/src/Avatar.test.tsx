import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials from name', () => {
    render(<Avatar name="Alice Johnson" />);
    expect(screen.getByText('AJ')).toBeInTheDocument();
  });

  it('renders single initial for single name', () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    const { container } = render(<Avatar src="/photo.jpg" name="Alice" />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/photo.jpg');
  });

  it('uses role="img" with aria-label', () => {
    render(<Avatar name="Bob" />);
    expect(screen.getByRole('img', { name: 'Bob' })).toBeInTheDocument();
  });

  it('applies size styles', () => {
    const { container } = render(<Avatar name="X" size="lg" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('56px');
    expect(el.style.height).toBe('56px');
  });

  it('appends custom className', () => {
    const { container } = render(<Avatar name="X" className="bordered" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('bordered');
  });
});
