import React from 'react';
import { render, screen } from '@testing-library/react';
import BottomFooter from './BottomFooter';

describe('BottomFooter', () => {
  it('renders the footer text', () => {
    render(<BottomFooter />);
    const footerText = screen.getByText('Website by AJ Matula. All Rights Reserved');
    expect(footerText).toBeInTheDocument();
  });

  it('renders two links', () => {
    render(<BottomFooter />);
    const githubLink = screen.getByText('Github');
    const disclaimerLink = screen.getByText('Disclaimer');
    expect(githubLink).toBeInTheDocument();
    expect(disclaimerLink).toBeInTheDocument();
  });
});