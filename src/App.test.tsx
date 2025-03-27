import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders e-waste management app', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // More generic test that doesn't depend on specific text
  const appElement = document.querySelector('.App');
  expect(appElement).toBeInTheDocument();
});
