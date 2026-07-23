import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('has status role', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default aria-label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('accepts custom label', () => {
    render(<Spinner label="Processing payment" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Processing payment');
  });

  it('applies size styles', () => {
    const { container } = render(<Spinner size="lg" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('40px');
    expect(el.style.height).toBe('40px');
  });

  it('appends custom className', () => {
    const { container } = render(<Spinner className="centered" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('centered');
  });
});
