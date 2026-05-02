import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="mt-4 text-lg text-slate-400">
        This page does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-[#5F8C6B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#4a7a57] transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
