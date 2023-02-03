import { render, screen } from "@testing-library/react";
import App from "./App";

describe('App component', () => {
    it('renders the Routes component', () => {
      const { getByTestId } = render(<App />);
      expect(getByTestId('routes')).toBeInTheDocument();
    });
  });