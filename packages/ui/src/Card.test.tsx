import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies glass and elevated classes', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('card--glass');
    expect(card).toHaveClass('card--elevated');
  });

  it('appends custom className', () => {
    const { container } = render(<Card className="custom">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom');
  });

  it('forwards HTML attributes', () => {
    render(
      <Card data-testid="test-card" role="region">
        Content
      </Card>,
    );
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    expect(screen.getByRole('region')).toBeInTheDocument();
  });
});
