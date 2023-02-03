import React from 'react';
import { render, screen } from '@testing-library/react';
import Navigation from './Navigation'

describe('Navigation', () => {
  it('renders NavigationContent component', () => {
    render(<Navigation />);
    expect(screen.getByTestId('nav-content')).toBeInTheDocument();
  });
});