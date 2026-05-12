"use client";

import { useMemo } from "react";
import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";

interface Post {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  metadata?: { readingTime?: number };
  permalink: string;
}

interface RelatedPostsProps {
  currentPost: Post;
  allPosts: Post[];
}

export function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  const relatedPosts = useMemo(() => {
    return allPosts
      .filter((post) => post.slug !== currentPost.slug)
      .map((post) => {
        const sharedTags = post.tags.filter((tag) =>
          currentPost.tags.includes(tag)
        );
        return { post, sharedTagsCount: sharedTags.length };
      })
      .filter((item) => item.sharedTagsCount > 0)
      .sort((a, b) => b.sharedTagsCount - a.sharedTagsCount)
      .slice(0, 2)
      .map((item) => item.post);
  }, [currentPost, allPosts]);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-[#5F8C6B]/15 pt-12">
      <h2 className="mb-8 text-2xl font-bold text-[#E8F0E9]">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {relatedPosts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            description={post.description}
            date={post.date}
            slug={post.slug}
            tags={post.tags}
            readingTime={post.metadata?.readingTime}
          />
        ))}
      </div>
    </section>
  );
}
