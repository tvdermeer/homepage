import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// Mock next/image globally
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock next/link globally
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a {...props}>{children}</a>;
  },
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  notFound: () => {
    throw new Error("NOT_FOUND");
  },
  redirect: (url: string) => {
    throw new Error(`REDIRECT:${url}`);
  },
}));

// Mock next/font
vi.mock("next/font/google", () => ({
  Geist: () => ({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  }),
  Geist_Mono: () => ({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  }),
}));

// Mock @tsparticles modules
vi.mock("@tsparticles/react", () => ({
  __esModule: true,
  default: ({ id, className }: { id: string; className: string }) => (
    <div data-testid="particles" id={id} className={className} />
  ),
  initParticlesEngine: vi.fn(() => Promise.resolve()),
}));

vi.mock("@tsparticles/slim", () => ({
  __esModule: true,
  loadSlim: vi.fn(),
}));
