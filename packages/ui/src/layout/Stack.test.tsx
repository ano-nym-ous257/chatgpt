import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <span>A</span>
        <span>B</span>
      </Stack>,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('defaults to vertical direction', () => {
    const { container } = render(<Stack>Content</Stack>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.flexDirection).toBe('column');
  });

  it('applies horizontal direction', () => {
    const { container } = render(<Stack direction="horizontal">Content</Stack>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.flexDirection).toBe('row');
  });

  it('applies custom gap', () => {
    const { container } = render(<Stack gap="8px">Content</Stack>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe('8px');
  });

  it('appends custom className', () => {
    const { container } = render(<Stack className="narrow">Content</Stack>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('narrow');
  });
});
