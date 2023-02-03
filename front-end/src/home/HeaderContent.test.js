import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HeaderContent from './HeaderContent';

describe('HeaderContent component', () => {
  test('renders header without typist', () => {
    const { getByText } = render(<HeaderContent typist={false} />);
    expect(getByText(/Welcome to ELI5-AI, a bi-weekly newsletter about AI, created by AI./i)).toBeInTheDocument();
  });
});