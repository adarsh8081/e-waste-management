import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders e-waste management heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Revolutionizing E-Waste Management/i);
  expect(headingElement).toBeInTheDocument();
});
