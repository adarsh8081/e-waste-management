import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders e-waste management heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/E-Waste Management Solutions/i);
  expect(headingElement).toBeInTheDocument();
});
