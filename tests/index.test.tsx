import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/components/app/App';

test('renders Search text', () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/search/i);
  expect(textElement).toBeInTheDocument();
});
