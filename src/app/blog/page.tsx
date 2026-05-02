import Link from "next/link";
import { posts } from "#site/content";
import { PostCard } from "@/components/blog/post-card";

export default function BlogPage() {
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white">Blog</h1>
        <p className="mt-4 text-lg text-slate-400">
          Thoughts on artificial intelligence, golf, and everything in between.
        </p>
      </div>

      {publishedPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {publishedPosts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              slug={post.slug}
              tags={post.tags}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-12 text-center">
          <p className="text-slate-400">No posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
