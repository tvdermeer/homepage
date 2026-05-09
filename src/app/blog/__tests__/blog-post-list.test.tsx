import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BlogPostList } from "@/app/blog/blog-post-list";

const mockPosts = [
  {
    title: "Test Post One",
    slug: "test-post-one",
    description: "First test post description",
    date: "2026-01-15",
    tags: ["ai", "golf"],
    metadata: { readingTime: 5 },
    permalink: "/blog/test-post-one",
  },
  {
    title: "Test Post Two",
    slug: "test-post-two",
    description: "Second test post description about machine learning",
    date: "2026-02-20",
    tags: ["ai"],
    metadata: { readingTime: 3 },
    permalink: "/blog/test-post-two",
  },
  {
    title: "Golf Tips",
    slug: "golf-tips",
    description: "Improve your swing",
    date: "2026-03-01",
    tags: ["golf", "sports"],
    metadata: { readingTime: 2 },
    permalink: "/blog/golf-tips",
  },
];

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => "",
    toString: () => "",
  }),
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/blog",
}));

describe("blog-post-list-search", () => {
  it("renders search input", () => {
    render(<BlogPostList posts={mockPosts} />);
    expect(
      screen.getByPlaceholderText("Search posts...")
    ).toBeInTheDocument();
  });

  it("filters posts by title search", () => {
    render(<BlogPostList posts={mockPosts} />);
    const searchInput = screen.getByPlaceholderText("Search posts...");

    fireEvent.change(searchInput, { target: { value: "Tips" } });

    expect(screen.getByText("Golf Tips")).toBeInTheDocument();
    expect(screen.queryByText("Test Post One")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Post Two")).not.toBeInTheDocument();
  });

  it("filters posts by description search", () => {
    render(<BlogPostList posts={mockPosts} />);
    const searchInput = screen.getByPlaceholderText("Search posts...");

    fireEvent.change(searchInput, { target: { value: "machine learning" } });

    expect(screen.getByText("Test Post Two")).toBeInTheDocument();
    expect(screen.queryByText("Test Post One")).not.toBeInTheDocument();
    expect(screen.queryByText("Golf Tips")).not.toBeInTheDocument();
  });

  it("filters posts by tag search", () => {
    render(<BlogPostList posts={mockPosts} />);
    const searchInput = screen.getByPlaceholderText("Search posts...");

    fireEvent.change(searchInput, { target: { value: "sports" } });

    expect(screen.getByText("Golf Tips")).toBeInTheDocument();
    expect(screen.queryByText("Test Post One")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Post Two")).not.toBeInTheDocument();
  });

  it("search is case-insensitive", () => {
    render(<BlogPostList posts={mockPosts} />);
    const searchInput = screen.getByPlaceholderText("Search posts...");

    fireEvent.change(searchInput, { target: { value: "GOLF" } });

    expect(screen.getByText("Golf Tips")).toBeInTheDocument();
    expect(screen.getByText("Test Post One")).toBeInTheDocument();
  });

  it("shows no results message when search matches nothing", () => {
    render(<BlogPostList posts={mockPosts} />);
    const searchInput = screen.getByPlaceholderText("Search posts...");

    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    expect(screen.getByText(/No posts found for/)).toBeInTheDocument();
  });

  it("shows clear button when search has text", () => {
    render(<BlogPostList posts={mockPosts} />);
    const searchInput = screen.getByPlaceholderText("Search posts...");

    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(
      screen.getByRole("button", { name: "Clear search" })
    ).toBeInTheDocument();
  });

  it("clears search when clear button is clicked", () => {
    render(<BlogPostList posts={mockPosts} />);
    const searchInput = screen.getByPlaceholderText("Search posts...");

    fireEvent.change(searchInput, { target: { value: "test" } });
    const clearButton = screen.getByRole("button", { name: "Clear search" });
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue("");
    expect(screen.getByText("Test Post One")).toBeInTheDocument();
    expect(screen.getByText("Test Post Two")).toBeInTheDocument();
    expect(screen.getByText("Golf Tips")).toBeInTheDocument();
  });

  it("shows all posts when search is empty", () => {
    render(<BlogPostList posts={mockPosts} />);

    expect(screen.getByText("Test Post One")).toBeInTheDocument();
    expect(screen.getByText("Test Post Two")).toBeInTheDocument();
    expect(screen.getByText("Golf Tips")).toBeInTheDocument();
  });
});
