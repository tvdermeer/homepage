import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../header";

describe("Header", () => {
  it("renders site name as a link to /", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: /thomas van der meer/i });
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders all navigation links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /blog/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cv/i })).toBeInTheDocument();
  });

  it("each nav link has correct href", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /blog/i })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: /cv/i })).toHaveAttribute("href", "/cv");
  });

  it("site name link has href /", () => {
    render(<Header />);
    const siteNameLink = screen.getByRole("link", { name: /thomas van der meer/i });
    expect(siteNameLink).toHaveAttribute("href", "/");
  });
});
