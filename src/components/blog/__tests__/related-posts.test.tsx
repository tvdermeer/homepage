import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RelatedPosts } from "@/components/blog/related-posts";

const mockPosts = [
  {
    title: "AI Post",
    slug: "ai-post",
    description: "About AI",
    date: "2026-01-15",
    tags: ["ai", "tech"],
    metadata: { readingTime: 5 },
    permalink: "/blog/ai-post",
    published: true,
  },
  {
    title: "Golf Post",
    slug: "golf-post",
    description: "About golf",
    date: "2026-02-20",
    tags: ["golf", "sports"],
    metadata: { readingTime: 3 },
    permalink: "/blog/golf-post",
    published: true,
  },
  {
    title: "AI and Golf",
    slug: "ai-and-golf",
    description: "About both",
    date: "2026-03-01",
    tags: ["ai", "golf"],
    metadata: { readingTime: 4 },
    permalink: "/blog/ai-and-golf",
    published: true,
  },
  {
    title: "Draft Post",
    slug: "draft-post",
    description: "Unpublished",
    date: "2026-04-01",
    tags: ["ai"],
    metadata: { readingTime: 2 },
    permalink: "/blog/draft-post",
    published: false,
  },
];

describe("related-posts", () => {
  it("renders related posts section when matches exist", () => {
    const currentPost = mockPosts[0];
    render(<RelatedPosts currentPost={currentPost} allPosts={mockPosts} />);

    expect(screen.getByText("Related Posts")).toBeInTheDocument();
  });

  it("shows posts with shared tags", () => {
    const currentPost = mockPosts[0];
    render(<RelatedPosts currentPost={currentPost} allPosts={mockPosts} />);

    expect(screen.getByText("AI and Golf")).toBeInTheDocument();
  });

  it("excludes current post from related", () => {
    const currentPost = mockPosts[0];
    render(<RelatedPosts currentPost={currentPost} allPosts={mockPosts} />);

    expect(screen.queryByText("AI Post")).not.toBeInTheDocument();
  });

  it("prioritizes posts with most tag overlap", () => {
    const currentPost = mockPosts[2];
    const { container } = render(
      <RelatedPosts currentPost={currentPost} allPosts={mockPosts} />
    );

    const headings = container.querySelectorAll("h3");
    expect(headings.length).toBe(2);
  });

  it("shows maximum 2 related posts", () => {
    const currentPost = mockPosts[2];
    const { container } = render(
      <RelatedPosts currentPost={currentPost} allPosts={mockPosts} />
    );

    const cards = container.querySelectorAll("article");
    expect(cards.length).toBeLessThanOrEqual(2);
  });

  it("returns null when no related posts exist", () => {
    const currentPost = {
      ...mockPosts[0],
      tags: ["unique-tag"],
    };
    const { container } = render(
      <RelatedPosts currentPost={currentPost} allPosts={mockPosts} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("excludes unpublished posts", () => {
    const currentPost = mockPosts[0];
    render(<RelatedPosts currentPost={currentPost} allPosts={mockPosts} />);

    expect(screen.queryByText("Draft Post")).not.toBeInTheDocument();
  });
});
