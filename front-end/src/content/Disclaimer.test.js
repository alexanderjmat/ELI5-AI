import React from 'react';
import { render } from '@testing-library/react';
import Disclaimer from './Disclaimer';

describe('Disclaimer', () => {
  it('renders the header', () => {
    const { getByText, getAllByText } = render(<Disclaimer />);
    const header = getAllByText(/Disclaimer/i);
    expect(header[0]).toBeInTheDocument();
  });

  it('renders the disclaimer text', () => {
    const { getByText } = render(<Disclaimer />);
    const text = getByText(/The content of ELI5-AI newsletter is generated by artificial intelligence/i);
    expect(text).toBeInTheDocument();
  });

  it('renders a link to reach out over email', () => {
    const { getByText } = render(<Disclaimer />);
    const link = getByText(/reach out over email/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'mailto: eli5.ai.news@gmail.com');
  });
});
