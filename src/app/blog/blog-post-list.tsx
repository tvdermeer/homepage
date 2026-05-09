"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useCallback, useState } from "react";
import { PostCard } from "@/components/blog/post-card";
import { cn } from "@/lib/utils";

interface Post {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  metadata?: { readingTime?: number };
  permalink: string;
}

interface BlogPostListProps {
  posts: Post[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeTag = searchParams.get("tag") ?? "";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeTag) {
      result = result.filter((post) =>
        post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [posts, activeTag, searchQuery]);

  const setTag = useCallback(
    (tag: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (tag) {
        params.set("tag", tag);
      } else {
        params.delete("tag");
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const hasActiveFilters = activeTag || searchQuery.trim();

  return (
    <>
      <div className="mb-8">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8FA89A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full rounded-lg border border-[#5F8C6B]/15 bg-[#152119] py-2.5 pl-10 pr-4 text-sm text-[#E8F0E9] placeholder-[#8FA89A]/50 focus:border-[#5F8C6B] focus:outline-none focus:ring-1 focus:ring-[#5F8C6B] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8FA89A] hover:text-[#E8F0E9] transition-colors"
              aria-label="Clear search"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setTag(
                  activeTag.toLowerCase() === tag.toLowerCase() ? "" : tag
                )
              }
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                activeTag.toLowerCase() === tag.toLowerCase()
                  ? "bg-[#5F8C6B] text-[#E8F0E9]"
                  : "bg-[#152119] text-[#8FA89A] hover:text-[#E8F0E9] border border-[#5F8C6B]/15"
              )}
            >
              {tag}
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setTag("");
                setSearchQuery("");
              }}
              className="ml-2 text-xs font-medium text-[#8FA89A] hover:text-[#5F8C6B] transition-colors cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <div
              key={post.slug}
              className={index === 0 ? "md:col-span-2" : ""}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PostCard
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
                tags={post.tags}
                readingTime={post.metadata?.readingTime}
                className="animate-fade-in-up opacity-0"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#5F8C6B]/15 bg-[#152119]/50 p-12 text-center">
          <p className="text-[#8FA89A] mb-4">
            {searchQuery.trim()
              ? `No posts found for "${searchQuery}".`
              : `No posts found for tag "${activeTag}".`}
          </p>
          <button
            onClick={() => {
              setTag("");
              setSearchQuery("");
            }}
            className="inline-flex items-center rounded-lg bg-[#5F8C6B] px-4 py-2 text-sm font-semibold text-[#E8F0E9] hover:bg-[#4a7a57] transition-colors cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
