import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spacer } from './Spacer';

describe('Spacer', () => {
  it('renders with specified size', () => {
    const { container } = render(<Spacer size="24px" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('24px');
    expect(el.style.height).toBe('24px');
  });

  it('is hidden from accessibility tree', () => {
    const { container } = render(<Spacer size="16px" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('appends custom className', () => {
    const { container } = render(<Spacer size="8px" className="gap" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('gap');
  });
});
