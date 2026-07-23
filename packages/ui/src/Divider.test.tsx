import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders with separator role', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('defaults to horizontal orientation', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('applies vertical orientation', () => {
    render(<Divider orientation="vertical" />);
    const el = screen.getByRole('separator');
    expect(el).toHaveAttribute('aria-orientation', 'vertical');
    expect(el.style.width).toBe('1px');
  });

  it('sets horizontal dimensions', () => {
    render(<Divider orientation="horizontal" />);
    const el = screen.getByRole('separator');
    expect(el.style.width).toBe('100%');
    expect(el.style.height).toBe('1px');
  });

  it('appends custom className', () => {
    render(<Divider className="thick" />);
    expect(screen.getByRole('separator')).toHaveClass('thick');
  });
});
