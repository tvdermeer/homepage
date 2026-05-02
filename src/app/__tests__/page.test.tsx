import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("homepage", () => {
  it("renders the Hero component with site name heading", () => {
    render(<Home />);
    expect(screen.getByText("Thomas van der Meer")).toBeInTheDocument();
  });

  it("renders the PassionGrid component with 'My Passions' heading", () => {
    render(<Home />);
    expect(screen.getByText("My Passions")).toBeInTheDocument();
  });
});
