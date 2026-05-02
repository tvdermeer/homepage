import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostCard } from "../post-card";

describe("PostCard", () => {
  const defaultProps = {
    title: "Test Post Title",
    description: "Test post description text",
    date: "2026-01-15",
    slug: "test-post",
    tags: ["AI", "Golf"],
  };

  it("renders title", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("Test post description text")).toBeInTheDocument();
  });

  it("renders formatted date", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("January 15, 2026")).toBeInTheDocument();
  });

  it("renders tags as spans when provided", () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("AI")).toBeInTheDocument();
    expect(screen.getByText("Golf")).toBeInTheDocument();
  });

  it("title links to /blog/{slug}", () => {
    render(<PostCard {...defaultProps} />);
    const titleLink = screen.getByRole("link", { name: /test post title/i });
    expect(titleLink).toHaveAttribute("href", "/blog/test-post");
  });

  it('renders "Read more" text', () => {
    render(<PostCard {...defaultProps} />);
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  it("applies custom className prop", () => {
    const { container } = render(<PostCard {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("handles empty tags array", () => {
    render(<PostCard {...defaultProps} tags={[]} />);
    expect(screen.queryByText("AI")).not.toBeInTheDocument();
    expect(screen.queryByText("Golf")).not.toBeInTheDocument();
  });
});
