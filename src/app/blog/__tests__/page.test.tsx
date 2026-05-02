import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BlogPage from "@/app/blog/page";

vi.mock("#site/content", () => ({
  posts: [
    {
      title: "Test Post One",
      slug: "test-post-one",
      description: "First test post description",
      date: "2026-01-15",
      tags: ["ai", "golf"],
      published: true,
      content: "<p>Test content one</p>",
      metadata: {},
      excerpt: "First test post excerpt",
      permalink: "/blog/test-post-one",
    },
    {
      title: "Test Post Two",
      slug: "test-post-two",
      description: "Second test post description",
      date: "2026-02-20",
      tags: ["ai"],
      published: true,
      content: "<p>Test content two</p>",
      metadata: {},
      excerpt: "Second test post excerpt",
      permalink: "/blog/test-post-two",
    },
    {
      title: "Draft Post",
      slug: "draft-post",
      description: "An unpublished draft",
      date: "2026-03-01",
      tags: [],
      published: false,
      content: "<p>Draft content</p>",
      metadata: {},
      excerpt: "Draft excerpt",
      permalink: "/blog/draft-post",
    },
  ],
}));

describe("blog-page", () => {
  it("renders Blog heading", () => {
    render(<BlogPage />);
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("renders published post titles", () => {
    render(<BlogPage />);
    expect(screen.getByText("Test Post One")).toBeInTheDocument();
    expect(screen.getByText("Test Post Two")).toBeInTheDocument();
  });

  it("filters out unpublished posts", () => {
    render(<BlogPage />);
    expect(screen.queryByText("Draft Post")).not.toBeInTheDocument();
  });

  it("sorts posts by date descending (newest first)", () => {
    render(<BlogPage />);
    const headings = screen.getAllByRole("heading");
    expect(headings[1]).toHaveTextContent("Test Post Two");
    expect(headings[2]).toHaveTextContent("Test Post One");
  });
});
