import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders label and input', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('connects label to input via htmlFor', () => {
    render(<Input label="Email" id="email-field" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('id', 'email-field');
  });

  it('shows hint text', () => {
    render(<Input label="Password" hint="At least 12 characters" />);
    expect(screen.getByText('At least 12 characters')).toBeInTheDocument();
  });

  it('shows error with alert role', () => {
    render(<Input label="Email" error="Invalid email address" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email address');
  });

  it('sets aria-invalid when error is present', () => {
    render(<Input label="Email" error="Required" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards input attributes', () => {
    render(<Input label="Email" type="email" placeholder="you@example.com" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'you@example.com');
  });

  it('appends custom className', () => {
    const { container } = render(<Input label="Name" className="compact" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('compact');
  });
});
