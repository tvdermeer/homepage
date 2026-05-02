import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotFound from "@/app/not-found";

describe("not-found", () => {
  it("renders 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders 'This page does not exist.' text", () => {
    render(<NotFound />);
    expect(screen.getByText("This page does not exist.")).toBeInTheDocument();
  });

  it('renders "Go back home" link with href /', () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: "Go back home" });
    expect(link).toHaveAttribute("href", "/");
  });
});
