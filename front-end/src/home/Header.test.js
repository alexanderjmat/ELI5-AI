import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders HeaderContent component', () => {
    render(<Header />);
    expect(screen.getByTestId('header-content')).toBeInTheDocument();
  });
});