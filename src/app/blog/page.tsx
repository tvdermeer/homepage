import { Suspense } from "react";
import { posts } from "#site/content";
import { PostCard } from "@/components/blog/post-card";
import { BlogPostList } from "./blog-post-list";

function BlogPostListFallback({
  posts: fallbackPosts,
}: {
  posts: typeof posts;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {fallbackPosts.map((post, index) => (
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
  );
}

export default function BlogPage() {
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#8EBEA8] via-[#5F8C6B] to-[#4a7a57] bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="mt-4 text-lg text-[#8FA89A]">
          Thoughts on artificial intelligence, golf, and everything in between.
        </p>
      </div>

      {publishedPosts.length > 0 ? (
        <Suspense
          fallback={<BlogPostListFallback posts={publishedPosts} />}
        >
          <BlogPostList posts={publishedPosts} />
        </Suspense>
      ) : (
        <div className="rounded-xl border border-[#5F8C6B]/15 bg-[#152119]/50 p-12 text-center">
          <p className="text-[#8FA89A]">No posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
