import Link from "next/link";
import { cn } from "@/lib/utils";

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  className?: string;
}

export function PostCard({ title, description, date, slug, tags, className }: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className={cn(
        "group relative rounded-xl border border-[#5F8C6B]/15 bg-[#152119]/80 backdrop-blur-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#5F8C6B]/30 hover:shadow-xl hover:shadow-[#5F8C6B]/10",
        className
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-sm text-[#8FA89A]">
          <time dateTime={date}>{formattedDate}</time>
          {tags.length > 0 && (
            <>
              <span className="text-[#5F8C6B]/30">·</span>
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#1E2D24] px-2 py-0.5 text-xs font-medium text-[#8FA89A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <h3 className="text-xl font-semibold text-[#E8F0E9] group-hover:text-[#5F8C6B] transition-colors">
          <Link href={`/blog/${slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>

        <p className="text-[#8FA89A] line-clamp-2">{description}</p>

        <div className="mt-2 inline-flex items-center text-sm font-medium text-[#5F8C6B]">
          Read more
          <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </article>
  );
}
