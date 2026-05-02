# Test Framework Documentation

## Overview

This project uses a two-tier testing strategy:

1. **Unit & Component Tests** — Vitest + React Testing Library for fast, isolated tests of utilities, components, and pages.
2. **End-to-End Tests** — Playwright for full-browser acceptance tests against the statically exported site.

Both run in CI before any deployment to Cloudflare Pages.

---

## Stack

| Layer | Tool | Version |
|-------|------|---------|
| Unit runner | Vitest | 4.x |
| Component testing | @testing-library/react | 16.x |
| DOM environment | jsdom | 26.x |
| Assertions | @testing-library/jest-dom | 6.x |
| E2E | @playwright/test | 1.52.x |
| Static server | serve | (npx) |
| Coverage | @vitest/coverage-v8 | 3.x |

---

## File Structure

```
homepage/
├── vitest.config.ts              # Vitest configuration
├── vitest.setup.tsx              # Global mocks (next/*, @tsparticles)
├── playwright.config.ts          # Playwright configuration
├── e2e/                          # E2E test specs
│   ├── home.spec.ts
│   ├── navigation.spec.ts
│   ├── blog.spec.ts
│   ├── cv.spec.ts
│   ├── 404.spec.ts
│   └── mobile.spec.ts
├── src/
│   ├── lib/__tests__/            # Utility tests
│   ├── config/__tests__/         # Config tests
│   ├── components/
│   │   ├── blog/__tests__/       # Blog component tests
│   │   ├── landing/__tests__/    # Landing component tests
│   │   ├── layout/__tests__/     # Layout component tests
│   │   └── backgrounds/__tests__/ # Background component tests
│   ├── app/
│   │   ├── __tests__/            # Page tests (home, 404)
│   │   ├── blog/__tests__/       # Blog listing page tests
│   │   ├── blog/[slug]/__tests__/ # Blog detail page tests
│   │   └── cv/__tests__/         # CV page tests
│   └── test/__mocks__/
│       └── content.ts            # Mock Velite post data
```

---

## Unit & Component Tests

### What We Test

#### Utilities (`src/lib/__tests__/utils.test.ts`)

Tests for the `cn()` utility (clsx + tailwind-merge):

- Merging multiple class strings
- Conditional classes (`condition && "class"`)
- Tailwind class deduplication (`px-2 px-4` → `px-4`)
- Graceful handling of `undefined`, `null`, `false`
- Array input merging

#### Config (`src/config/__tests__/site.test.ts`)

Tests for `siteConfig`:

- Required properties exist (name, title, description, url, author)
- Social links are valid HTTPS URLs
- Navigation array has correct shape (label + href)
- Nav items match expected pages (Home, Blog, CV)

#### Components

| Component | File | Coverage |
|-----------|------|----------|
| Header | `src/components/layout/__tests__/header.test.tsx` | Site name, nav links, hrefs |
| Footer | `src/components/layout/__tests__/footer.test.tsx` | Copyright, social links, external link attributes |
| PostCard | `src/components/blog/__tests__/post-card.test.tsx` | Title, description, date formatting, tags, slug link, className prop |
| Hero | `src/components/landing/__tests__/hero.test.tsx` | Heading, subtitle, CTA links, social icons |
| PassionGrid | `src/components/landing/__tests__/passion-grid.test.tsx` | Section heading, two cards, tag links |
| GolfBallBackground | `src/components/backgrounds/__tests__/golf-ball-background.test.tsx` | Null before init, Particles render after init |

#### Pages

| Page | File | Coverage |
|------|------|----------|
| Homepage | `src/app/__tests__/page.test.tsx` | Hero + PassionGrid composition |
| 404 | `src/app/__tests__/not-found.test.tsx` | Heading, message, home link |
| Blog listing | `src/app/blog/__tests__/page.test.tsx` | Published post filtering, date sorting, empty state |
| Blog detail | `src/app/blog/[slug]/__tests__/page.test.tsx` | Post render, date, tags, back link, notFound for missing slug |
| CV | `src/app/cv/__tests__/page.test.tsx` | Name, role, experience, education, skills, social links |

### How We Test

- **Render**: `render()` from `@testing-library/react`
- **Queries**: `screen.getByText()`, `screen.getByRole()`, `screen.queryByText()`
- **Async components**: Call async page components directly (`await BlogPostPage({ params })`) then render the returned JSX
- **Mocking**: Global mocks in `vitest.setup.tsx` for `next/image`, `next/link`, `next/navigation`, `next/font/google`, `@tsparticles/react`, `@tsparticles/slim`
- **Data mocking**: `vi.mock("#site/content", ...)` with `mockPosts` from `src/test/__mocks__/content.ts`

### Running Unit Tests

```bash
npm run test          # Watch mode
npm run test:run      # Single run (CI)
npm run test:coverage # With coverage report
```

---

## End-to-End Tests

### What We Test

E2E tests run against the fully built static site (`npm run build && npx serve out -l 3000`).

| Spec | Tests |
|------|-------|
| `home.spec.ts` | Homepage heading, hero subtitle, CTA links, passion cards, tag filter links |
| `navigation.spec.ts` | Header nav links, footer content, click-through navigation between pages |
| `blog.spec.ts` | Blog heading, post listing, clicking post navigates to detail, back link, 404 for missing slug |
| `cv.spec.ts` | Name and role, experience/education/skills sections, LinkedIn/GitHub links |
| `404.spec.ts` | Non-existent URLs show 404, "Go back home" link works |
| `mobile.spec.ts` | Homepage, blog, and CV render correctly at 375×667 mobile viewport |

### How We Test

- **Browser**: Chromium (headless) and Mobile Chrome (Pixel 5 viewport)
- **Server**: Auto-started by Playwright via `webServer` config (`npm run build && npx serve out`)
- **Selectors**: `page.getByRole()`, `page.getByText()`, `page.locator()`
- **Navigation**: `page.goto()`, `page.click()`, `expect(page).toHaveURL()`
- **Artifacts**: Screenshots on failure, traces on first retry, HTML report

### Running E2E Tests

```bash
npm run test:e2e      # Headless run
npm run test:e2e:ui   # Interactive UI mode
```

---

## Configuration

### Vitest (`vitest.config.ts`)

- `environment: "jsdom"` — Browser-like DOM for component tests
- `setupFiles: ["./vitest.setup.tsx"]` — Global mocks loaded before each test file
- `include: ["src/**/*.{test,spec}.{ts,tsx}"]` — Test file glob
- `coverage.provider: "v8"` — Built-in coverage via V8 engine

### Playwright (`playwright.config.ts`)

- `testDir: "./e2e"` — E2E spec location
- `projects`: Desktop Chrome + Mobile Chrome (Pixel 5)
- `webServer`: Builds and serves static export on port 3000
- `reporter`: GitHub annotations in CI, list + HTML locally
- `trace: "on-first-retry"`, `screenshot: "only-on-failure"`

---

## CI Integration

The GitHub workflow (`.github/workflows/deploy.yml`) runs three jobs:

1. **unit-tests** — `npm ci && npm run test:run`
2. **e2e-tests** — `npm ci && npx playwright install --with-deps chromium && npm run build && npx playwright test --project=chromium`
3. **deploy** — Runs only if both test jobs pass and the branch is `main`

E2E tests upload the Playwright HTML report as an artifact on every run (retained for 30 days).

---

## Identified Gaps

The following areas are **not yet covered** and are documented here for future engineers to pick up:

### 1. Accessibility (a11y) Tests

**Gap**: No automated accessibility checks.
**Suggested approach**: Add `@axe-core/playwright` to E2E tests or `@axe-core/react` to component tests. Run axe on each page after load:

```ts
import { injectAxe, checkA11y } from "axe-playwright";
// In test: await injectAxe(page); await checkA11y(page);
```

### 2. Visual Regression Tests

**Gap**: No screenshot comparison to catch unintended visual changes.
**Suggested approach**: Use Playwright's `expect(page).toHaveScreenshot()` for full-page snapshots of key pages (home, blog, cv, 404). Store baselines in `e2e/__screenshots__/`. Run in CI with `npx playwright test --update-snapshots` on intentional changes.

### 3. Performance Budget Tests

**Gap**: No automated performance assertions.
**Suggested approach**: Use Playwright's `page.evaluate()` to measure Web Vitals (LCP, FID, CLS) or integrate Lighthouse CI. Set budgets: e.g., LCP < 2.5s, total JS < 200KB.

### 4. Cross-Browser E2E

**Gap**: Only Chromium is tested. Firefox and WebKit are not.
**Suggested approach**: Add `firefox` and `webkit` projects to `playwright.config.ts`. Note: Safari (WebKit) may reveal CSS/layout issues that Chromium misses, especially with Tailwind CSS v4.

### 5. API/Integration Tests

**Gap**: The site is fully static (no API routes), but if any serverless functions or API routes are added later, they will have no test coverage.
**Suggested approach**: Add a separate `tests/api/` directory with Vitest tests for any Next.js API routes or edge functions.

### 6. Component Interaction Tests

**Gap**: No tests for user interactions (hover states, focus management, keyboard navigation).
**Suggested approach**: Use `@testing-library/user-event` in component tests to simulate tab navigation, hover, and keyboard input. Test that focus is visible and interactive elements are keyboard-accessible.

### 7. Error Boundary Tests

**Gap**: No tests for React error boundaries or unexpected runtime errors.
**Suggested approach**: Add tests that throw errors inside components and verify the error boundary renders the fallback UI correctly.

### 8. SEO & Meta Tag Tests

**Gap**: `generateMetadata` in blog posts is not tested.
**Suggested approach**: In E2E tests, use `page.evaluate(() => document.title)` and check `<meta name="description">` tags. Alternatively, test `generateMetadata` directly by calling the exported async function.

### 9. Velite Content Pipeline Tests

**Gap**: The Velite build pipeline and content transformation are not tested.
**Suggested approach**: Add a test that runs `velite` and asserts the generated `.velite/posts.json` has the expected shape and that all required fields are present.

### 10. Rate Limiting / DDoS Resilience

**Gap**: No load or security tests.
**Suggested approach**: If the site moves to a dynamic hosting model, add k6 or Artillery load tests. For static sites on Cloudflare Pages, this is less critical.

---

## Adding New Tests

### Component Test Template

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MyComponent } from "@/components/my-component";

describe("my-component", () => {
  it("renders the expected content", () => {
    render(<MyComponent prop="value" />);
    expect(screen.getByText("Expected")).toBeInTheDocument();
  });
});
```

### E2E Test Template

```ts
import { test, expect } from "@playwright/test";

test.describe("Feature", () => {
  test("description of behavior", async ({ page }) => {
    await page.goto("/route/");
    await expect(page.getByRole("heading", { name: "Title" })).toBeVisible();
  });
});
```

### Mocking `#site/content`

For any test that imports from `#site/content`:

```ts
import { vi } from "vitest";
import { mockPosts } from "@/test/__mocks__/content";

vi.mock("#site/content", () => ({
  posts: mockPosts,
}));
```

---

## Troubleshooting

### `libnspr4.so` missing (E2E)

Run `npx playwright install-deps chromium` to install system libraries for the browser.

### JSX parse error in `vitest.setup.ts`

The setup file must use `.tsx` extension because it contains JSX. The vitest config references `./vitest.setup.tsx`.

### Async Server Component renders as empty

Do not pass an async component directly to `render()`. Call it first:

```tsx
const jsx = await BlogPostPage({ params: Promise.resolve({ slug: "test" }) });
render(jsx);
```

### Playwright strict mode violations

Use `exact: true` or `first()` when selectors match multiple elements:

```ts
page.getByRole("link", { name: "Blog", exact: true })
page.locator("article").first()
```
