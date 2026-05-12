import Link from "next/link";

function GolfIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function AIIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

const passions = [
  {
    title: "Golf",
    description:
      "Fifteen years on the course. I believe golf is the ultimate test of focus, patience, and continuous improvement — principles that translate directly into building great software.",
    icon: GolfIcon,
    accent: "text-[#5F8C6B]",
    border: "border-[#5F8C6B]/20",
    hover: "hover:border-[#5F8C6B]/40 hover:shadow-[#5F8C6B]/10",
    tag: "golf",
  },
  {
    title: "Artificial Intelligence",
    description:
      "From neural networks to NLP, I build intelligent systems that solve real problems. I am passionate about making AI accessible, ethical, and impactful.",
    icon: AIIcon,
    accent: "text-[#8EBEA8]",
    border: "border-[#8EBEA8]/20",
    hover: "hover:border-[#8EBEA8]/40 hover:shadow-[#8EBEA8]/10",
    tag: "ai",
  },
];

export function PassionGrid() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          My Passions
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          Two worlds, one mindset: precision, patience, and the pursuit of excellence.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {passions.map((passion) => {
          const Icon = passion.icon;
          return (
            <Link
              key={passion.title}
              href={`/blog?tag=${passion.tag}`}
              className={`group relative rounded-2xl border ${passion.border} bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 ${passion.hover} hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className={`mb-4 ${passion.accent}`}>
                <Icon className="h-10 w-10" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">{passion.title}</h3>
              <p className="text-slate-400 leading-relaxed">{passion.description}</p>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                Read related posts
                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
