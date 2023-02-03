import React from "react";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About component", () => {
  it("renders the component", () => {
    render(<About />);
    expect(screen.getByText("What is ELI5-AI?")).toBeInTheDocument();
    expect(screen.getByText("AJ Matula 👋")).toBeInTheDocument();
  });

  it("renders the ELI5-AI card", () => {
    render(<About />);
    expect(screen.getByText("What is ELI5-AI?")).toBeInTheDocument();
    expect(screen.getByText("Latest edition")).toBeInTheDocument();
  });

  it("renders the AJ Matula card", () => {
    render(<About />);
    expect(screen.getByText("AJ Matula 👋")).toBeInTheDocument();
    expect(screen.getByText("Hey everyone! I'm the creator of ELI5-AI. Making the world of tech an easier place to traverse is super important to me. I also enjoy playing the piano in my spare time, and don't get me started on the joys of a good Americano. Currently I'm looking for an awesome software engineering position. Interested in working together?")).toBeInTheDocument();
    expect(screen.getByText("Hire me")).toBeInTheDocument();
  });

  it("renders the Donate card", () => {
    render(<About />);
    expect(screen.queryAllByText("Donate")[1]).toBeInTheDocument();
    expect(screen.getByText("As long as I own ELI5-AI, it will always be ad-free. I'll never try to sell anything to you or use your email for marketing purposes. This project is completely funded from my own pocket and by the generosity of readers who donate. By giving to ELI5-AI, you'll be contributing to the maintainence and continuous growth of the site.")).toBeInTheDocument();
  });
});