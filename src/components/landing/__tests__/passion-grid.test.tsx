import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PassionGrid } from "../passion-grid";

describe("PassionGrid", () => {
  it("renders My Passions heading", () => {
    render(<PassionGrid />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("My Passions");
  });

  it("renders Golf passion card", () => {
    render(<PassionGrid />);
    expect(screen.getByRole("heading", { level: 3, name: "Golf" })).toBeInTheDocument();
  });

  it("renders Artificial Intelligence passion card", () => {
    render(<PassionGrid />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Artificial Intelligence" }),
    ).toBeInTheDocument();
  });

  it("Golf card links to /blog?tag=golf", () => {
    render(<PassionGrid />);
    const golfCard = screen.getByRole("heading", { level: 3, name: "Golf" }).closest("a");
    expect(golfCard).toHaveAttribute("href", "/blog?tag=golf");
  });

  it("AI card links to /blog?tag=ai", () => {
    render(<PassionGrid />);
    const aiCard = screen
      .getByRole("heading", { level: 3, name: "Artificial Intelligence" })
      .closest("a");
    expect(aiCard).toHaveAttribute("href", "/blog?tag=ai");
  });

  it("each card has title, description, and related posts text", () => {
    render(<PassionGrid />);
    expect(screen.getAllByText("Read related posts")).toHaveLength(2);
    expect(screen.getByText(/Fifteen years on the course/i)).toBeInTheDocument();
    expect(screen.getByText(/From neural networks to NLP/i)).toBeInTheDocument();
  });
});
