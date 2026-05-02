import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotFound from "@/app/not-found";

describe("not-found", () => {
  it("renders 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders fun message", () => {
    render(<NotFound />);
    expect(screen.getByText(/landed in the rough/i)).toBeInTheDocument();
  });

  it("renders sub-message", () => {
    render(<NotFound />);
    expect(screen.getByText(/The page you are looking for does not exist/i)).toBeInTheDocument();
  });

  it('renders Home link with href /', () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveAttribute("href", "/");
  });

  it('renders Blog link with href /blog', () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: "Blog" });
    expect(link).toHaveAttribute("href", "/blog");
  });

  it('renders CV link with href /cv', () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: "CV" });
    expect(link).toHaveAttribute("href", "/cv");
  });
});
