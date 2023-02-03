import React from "react";
import { render, screen } from "@testing-library/react";
import NavContent from "./NavContent";

describe("NavContent", () => {
test("renders ELI5-AI link", () => {
render(<NavContent />);
const link = screen.getByText("ELI5-AI");
expect(link).toBeInTheDocument();
expect(link.getAttribute("href")).toEqual("/");
});

test("renders ABOUT link", () => {
render(<NavContent />);
const link = screen.getByText("ABOUT");
expect(link).toBeInTheDocument();
expect(link.getAttribute("href")).toEqual("/about");
});

test("renders DONATE link", () => {
render(<NavContent />);
const link = screen.getByText("DONATE");
expect(link).toBeInTheDocument();
expect(link.getAttribute("href")).toEqual("https://paypal.me/AlexanderMatula?country.x=US&locale.x=en_US");
});
});