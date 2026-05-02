import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#5F8C6B]/10 bg-[#0D1610] py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <p className="text-sm text-[#8FA89A]">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#8FA89A] hover:text-[#8EBEA8] transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#8FA89A] hover:text-[#8EBEA8] transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
