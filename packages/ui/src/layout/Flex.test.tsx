import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders children', () => {
    render(
      <Flex>
        <span>Item</span>
      </Flex>,
    );
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('defaults to row direction', () => {
    const { container } = render(<Flex>Content</Flex>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.flexDirection).toBe('row');
  });

  it('applies gap', () => {
    const { container } = render(<Flex gap="12px">Content</Flex>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe('12px');
  });

  it('applies wrap', () => {
    const { container } = render(<Flex wrap="wrap">Content</Flex>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.flexWrap).toBe('wrap');
  });

  it('appends custom className', () => {
    const { container } = render(<Flex className="toolbar">Content</Flex>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('toolbar');
  });
});
