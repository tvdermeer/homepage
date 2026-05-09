import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BlogPostPage from "@/app/blog/[slug]/page";

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
  ],
}));

describe("blog-post-page", () => {
  it("renders post title when slug matches", async () => {
    const jsx = await BlogPostPage({ params: Promise.resolve({ slug: "test-post-one" }) });
    render(jsx);
    expect(screen.getByText("Test Post One")).toBeInTheDocument();
  });

  it("renders formatted date", async () => {
    const jsx = await BlogPostPage({ params: Promise.resolve({ slug: "test-post-one" }) });
    render(jsx);
    expect(screen.getByText("January 15, 2026")).toBeInTheDocument();
  });

  it("renders post tags", async () => {
    const jsx = await BlogPostPage({ params: Promise.resolve({ slug: "test-post-one" }) });
    render(jsx);
    expect(screen.getAllByText("ai").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("golf")).toBeInTheDocument();
  });

  it('renders "Back to blog" link', async () => {
    const jsx = await BlogPostPage({ params: Promise.resolve({ slug: "test-post-one" }) });
    render(jsx);
    expect(screen.getByRole("link", { name: /back to blog/i })).toHaveAttribute("href", "/blog");
  });

  it("throws NOT_FOUND for non-existent slug", async () => {
    await expect(
      BlogPostPage({ params: Promise.resolve({ slug: "non-existent" }) })
    ).rejects.toThrow("NOT_FOUND");
  });
});
