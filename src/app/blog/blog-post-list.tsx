"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useCallback } from "react";
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

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
    );
  }, [posts, activeTag]);

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

  return (
    <>
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
          {activeTag && (
            <button
              onClick={() => setTag("")}
              className="ml-2 text-xs font-medium text-[#8FA89A] hover:text-[#5F8C6B] transition-colors cursor-pointer"
            >
              Clear filter
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
            No posts found for tag &quot;{activeTag}&quot;.
          </p>
          <button
            onClick={() => setTag("")}
            className="inline-flex items-center rounded-lg bg-[#5F8C6B] px-4 py-2 text-sm font-semibold text-[#E8F0E9] hover:bg-[#4a7a57] transition-colors cursor-pointer"
          >
            Clear filter
          </button>
        </div>
      )}
    </>
  );
}
