import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App Dashboard", () => {
  it("renders dashboard title correctly", () => {
    render(<App />);
    // Using getAllByText in case multiple header/nav items match, or use queryByText
    const headingElements = screen.getAllByText(/Dashboard Overview/i);
    expect(headingElements.length).toBeGreaterThan(0);
  });
});
