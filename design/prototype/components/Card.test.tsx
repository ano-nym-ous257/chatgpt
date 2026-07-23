import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>,
    );
    expect(screen.getByText('Card content')).toBeDefined();
  });

  it('applies glass and elevated classes', () => {
    const { container } = render(<Card>Content</Card>);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('card--glass');
    expect(wrapper.className).toContain('card--elevated');
  });

  it('passes extra className', () => {
    const { container } = render(<Card className="custom">Content</Card>);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('custom');
  });

  it('spreads additional HTML attributes', () => {
    render(
      <Card data-testid="my-card" role="region">
        Content
      </Card>,
    );
    expect(screen.getByTestId('my-card')).toBeDefined();
    expect(screen.getByRole('region')).toBeDefined();
  });
});
