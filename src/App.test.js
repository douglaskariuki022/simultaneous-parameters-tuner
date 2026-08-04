import { render, screen } from '@testing-library/react';
import App from './App';
import { calculateMse, formatEquation } from './utils/regression';

test('renders the regression tuner controls', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /interactive linear regression tuner/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/slope \(m\)/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/y-intercept \(b\)/i)).toBeInTheDocument();
  expect(screen.getByText(/mean squared error/i)).toBeInTheDocument();
});

test('formats regression output and computes mean squared error', () => {
  const data = [{ x: 1, y: 2 }, { x: 2, y: 4 }];

  expect(formatEquation(1.5, -2)).toBe('y = 1.50x - 2.00');
  expect(calculateMse(data, 1, 2)).toBeCloseTo(2, 5);
});
