import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <div className="mb-6 text-6xl">🏌️</div>
      <h1 className="text-6xl font-bold text-[#E8F0E9]">404</h1>
      <p className="mt-4 text-lg text-[#8FA89A]">
        Looks like this shot landed in the rough.
      </p>
      <p className="mt-2 text-sm text-[#8FA89A]">
        The page you are looking for does not exist.
      </p>

      <nav className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-[#5F8C6B] px-5 py-2.5 text-sm font-semibold text-[#E8F0E9] hover:bg-[#4a7a57] transition-colors"
        >
          Home
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center rounded-lg border border-[#5F8C6B]/15 bg-[#152119] px-5 py-2.5 text-sm font-medium text-[#8FA89A] hover:text-[#E8F0E9] hover:border-[#5F8C6B]/30 transition-colors"
        >
          Blog
        </Link>
        <Link
          href="/cv"
          className="inline-flex items-center rounded-lg border border-[#5F8C6B]/15 bg-[#152119] px-5 py-2.5 text-sm font-medium text-[#8FA89A] hover:text-[#E8F0E9] hover:border-[#5F8C6B]/30 transition-colors"
        >
          CV
        </Link>
      </nav>
    </div>
  );
}
