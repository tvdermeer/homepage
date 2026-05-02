import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "#site/content";
import { ReadingProgress } from "@/components/blog/reading-progress";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article id="blog-post-article" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <ReadingProgress />
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center text-sm font-medium text-[#8FA89A] hover:text-[#5F8C6B] transition-colors"
      >
        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to blog
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex items-center gap-3 text-sm text-[#8FA89A]">
          <time dateTime={post.date}>{formattedDate}</time>
          {typeof post.metadata?.readingTime === "number" && (
            <>
              <span>·</span>
              <span>{post.metadata.readingTime} min read</span>
            </>
          )}
          {post.tags.length > 0 && (
            <>
              <span>·</span>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-[#152119] px-2 py-0.5 text-xs font-medium text-[#8FA89A] hover:text-[#E8F0E9] transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#E8F0E9] sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-[#8FA89A]">{post.description}</p>
      </header>

      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
