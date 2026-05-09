# Homepage Updates & Improvements Plan

**Project:** tvdermeer.nl — Thomas van der Meer Homepage  
**Date:** 2026-05-09  
**Status:** In Progress — Sprint 1 & 2 Complete, Sprint 3 Ready

---

## 1. Current State Snapshot

**Stack:** Next.js 16 (App Router), Tailwind CSS v4, Velite (content), TypeScript, Vitest, Playwright  
**Design System:** Forest Depths (dark green/sage palette) — applied 2026-05-02  
**Pages:** Home, Blog (listing + posts), CV  
**Content:** 6 blog posts, static CV data  
**Features:** tsparticles golf-ball background, staggered animations, responsive layout, tag-based post filtering (client-side), reading time, golf-themed reading progress, blog search, related posts, back-to-top button, contact page with Formspree form, CV PDF download, SEO metadata, sitemap, robots.txt, llms.txt, JSON-LD structured data, full test suite

### What's Working Well
- Cohesive design system with strong visual identity
- Clean component architecture (hero, passion grid, post cards, layout)
- Content pipeline (Velite) for blog posts
- Comprehensive test coverage (unit, integration, e2e)
- Good accessibility basics (aria-labels, semantic HTML)
- LLM/AI discovery optimization (robots.txt, sitemap, llms.txt, structured data)

### Gaps & Opportunities
- Homepage is thin (only hero + 2 passion cards)
- No project/work showcase despite senior engineering background
- Missing table of contents on blog posts
- Missing analytics, RSS, OpenGraph images
- No dark/light mode toggle (locked to dark)

---

## 2. Feature Brainstorm

### Area A — Homepage & Landing Experience
| Feature | Description | Impact |
|---------|-------------|--------|
| A1. Featured Projects Section | Showcase 3–4 key projects (RAG system, agentic backend, golf app?) with tech tags, links, and brief descriptions | High — demonstrates expertise |
| A2. Latest Blog Posts Preview | Pull 2–3 most recent posts onto homepage below passions | Medium — drives content discovery |
| A3. Animated Scroll Reveals | IntersectionObserver-based fade-in-up for sections as user scrolls | Medium — polish & engagement |
| A4. Testimonials / Quotes Carousel | Client/colleague quotes or notable achievements | Low-Medium — social proof |
| A5. Golf Handicap / Stats Widget | Live or manually updated golf stats (handicap, rounds played) | Low — personal brand, fun |

### Area B — Blog Enhancements
| Feature | Description | Impact |
|---------|-------------|--------|
| B1. Tag Filtering (Client-Side) | Filter posts by tag with URL state sync (`?tag=ai`) | High — currently only links to it |
| B2. Search Posts | Full-text search across titles, descriptions, and tags | High — content discovery at scale |
| B3. Reading Time Estimation | Display estimated reading time on post cards and detail | Low-Medium — standard blog UX |
| B4. Related Posts | Show 2 related posts at bottom of blog post (by tag match) | Medium — increases page views |
| B5. Table of Contents | Auto-generated TOC for long blog posts (from headings) | Medium — improves readability |
| B6. RSS Feed | Generate RSS/Atom feed for blog posts | Low — for subscribers |
| B7. OpenGraph Images | Dynamic OG image generation for blog posts | Medium — social sharing |
| B8. Golf-Themed Reading Progress | Scroll-based progress indicator with a golf ball rolling toward a flag/pin at the top of blog posts | Medium — brand personality & UX |
| B9. Back to Top Button | Fixed button on blog posts that appears after scrolling, smooth scrolls to top | Low — convenience & polish |

### Area C — CV / Professional Presence
| Feature | Description | Impact |
|---------|-------------|--------|
| C1. CV Data Externalization | Move experiences, education, skills to JSON/YAML and render dynamically | Medium — easier updates |
| C2. Download PDF Button | Generate or link to downloadable CV PDF | High — standard expectation |
| C3. Timeline Visualization | Visual timeline for career progression | Low — nice to have |

### Area D — Site-Wide Infrastructure
| Feature | Description | Impact |
|---------|-------------|--------|
| D1. Contact Page / Form | Simple contact page with form (Netlify/Formspree/Resend) | High — enables inbound |
| D2. Newsletter Signup | Email capture for new blog post notifications | Medium — audience building |
| D3. Analytics (Privacy-First) | Plausible or Umami analytics | Medium — understand traffic |
| D4. Sitemap & Robots.txt | Auto-generated sitemap.xml | Medium — SEO |
| D5. 404 Page Enhancement | Better 404 with suggested links | Low — polish |
| D6. Loading States / Skeletons | Skeleton screens for blog listing | Low — perceived performance |
| D7. PWA Manifest | Add web app manifest for installability | Low — marginal |

### Area E — Content
| Feature | Description | Impact |
|---------|-------------|--------|
| E1. New Blog Posts | Continue writing (AI governance, golf tech, etc.) | High — content is king |
| E2. Projects Content | Write project case studies as markdown or structured data | High — complements A1 |
| E3. About Page | Dedicated /about with personal story, photos, values | Medium — deeper connection |

---

## 3. Work Categorization

### Category 1: Content (C)
- E1. New Blog Posts
- E2. Projects Content
- E3. About Page
- **Dependencies:** None — can happen in parallel with everything

### Category 2: UI/UX Polish (U)
- A3. Animated Scroll Reveals
- B3. Reading Time
- B5. Table of Contents
- D5. 404 Enhancement
- D6. Loading States
- **Dependencies:** None for most; B5 depends on blog post content structure

### Category 3: Functional Features (F)
- A1. Featured Projects Section
- A2. Latest Blog Posts Preview
- B1. Tag Filtering
- B2. Search Posts
- B4. Related Posts
- B8. Golf-Themed Reading Progress
- C1. CV Data Externalization
- D1. Contact Page / Form
- D2. Newsletter Signup
- **Dependencies:** C1 before C2/C3; B1/B2/B8 can be parallel; A1 needs E2 content

### Category 4: Infrastructure & SEO (I)
- B6. RSS Feed
- B7. OpenGraph Images
- D3. Analytics
- D4. Sitemap
- D7. PWA Manifest
- **Dependencies:** D4 should happen after all major pages are stable

---

## 4. Dependency Graph

```
Phase 1 (Foundation):
├── C1. CV Data Externalization
├── D4. Sitemap & Robots.txt
├── D3. Analytics (can be added anytime)
└── Content: E2. Projects Content, E3. About Page

Phase 2 (Core Features):
├── A1. Featured Projects Section  [needs E2]
├── A2. Latest Blog Posts Preview
├── B1. Tag Filtering
├── B2. Search Posts
├── B4. Related Posts
├── C2. Download PDF Button
└── D1. Contact Page / Form

Phase 3 (Polish & Growth):
├── A3. Animated Scroll Reveals
├── A5. Golf Stats Widget
├── B3. Reading Time
├── B5. Table of Contents
├── B6. RSS Feed
├── B7. OpenGraph Images
├── B8. Golf-Themed Reading Progress
├── D2. Newsletter Signup
└── D5. 404 Enhancement
```

---

## 5. Work Items Status

### ✅ COMPLETED

#### ~~WI-1: Implement Client-Side Tag Filtering on Blog (B1)~~ ✅ DONE 2026-05-02
**Commit:** `5db3eff`  
**Type:** Functional Feature  
**Description:** When a user clicks a tag or visits `/blog?tag=ai`, filter the post list client-side without page reload. Show active tag with clear button.

#### ~~WI-8: Add Reading Time to Blog Posts (B3)~~ ✅ DONE 2026-05-02
**Commit:** `5db3eff`  
**Type:** UI/UX Polish  
**Description:** Calculate and display estimated reading time on post cards and post detail pages.

#### ~~WI-12: Enhance 404 Page (D5)~~ ✅ DONE 2026-05-02
**Commit:** `5db3eff`  
**Type:** UI/UX Polish  
**Description:** Better 404 with suggested links (Home, Blog, CV) and Forest Depths styling.

#### ~~WI-18: Add Golf-Themed Reading Progress Indicator (B8)~~ ✅ DONE 2026-05-02
**Commit:** `5db3eff` (+ refinement `3c3061e`)  
**Type:** UI/UX Polish — *Brand Signature Feature*  
**Description:** Fixed top-bar progress indicator on blog post detail pages. Golf ball rolls across a fairway track as user scrolls.

#### ~~WI-16: Add Sitemap Generation (D4)~~ ✅ DONE 2026-05-09
**Commit:** `dbb8615`  
**Type:** Infrastructure  
**Description:** Auto-generate `sitemap.xml` including all static pages and blog posts via Velite complete hook. Also added `robots.txt` and `llms.txt`.

#### ~~Test Framework & CI~~ ✅ DONE 2026-05-02
**Commits:** `2c65385` through `c8d47a8`  
**Type:** Infrastructure  
**Description:** Vitest config, unit tests, page-level integration tests, Playwright e2e tests, GitHub Actions CI workflow.

#### ~~Forest Depths Design System Migration~~ ✅ DONE 2026-05-02
**Commits:** `8c9abe7` through `5f172ab`  
**Type:** UI/UX Polish  
**Description:** Complete migration to Forest Depths color palette across all pages and components.

#### ~~WI-4: Create Contact Page (D1)~~ ✅ DONE 2026-05-09
**Commit:** `23aee05`  
**Type:** Functional Feature  
**Description:** New `/contact` page with Formspree form integration. Email stays hidden on Formspree servers — never exposed in source code. Includes honeypot spam protection.

#### ~~WI-5: Generate Downloadable CV PDF (C2)~~ ✅ DONE 2026-05-09
**Commit:** `23aee05`  
**Type:** Functional Feature  
**Description:** "Download CV as PDF" button on /cv page using html2pdf.js for client-side generation. Also added `@media print` CSS styles.

#### ~~WI-6: Add Blog Search (B2)~~ ✅ DONE 2026-05-09
**Commit:** `a9933b6`  
**Type:** Functional Feature  
**Description:** Real-time search input on blog page filtering posts by title, description, and tags. Case-insensitive with clear button. Integrates with existing tag filtering.

#### ~~Back to Top Button~~ ✅ DONE 2026-05-09
**Commit:** `a9933b6`  
**Type:** UI/UX Polish  
**Description:** Fixed button on blog post detail pages. Appears after scrolling 500px, smooth scrolls to top on click. Forest Depths styling.

#### ~~WI-9: Externalize CV Data (C1)~~ ✅ DONE 2026-05-09
**Commit:** `72c334b`  
**Type:** Infrastructure  
**Description:** Moved CV experiences, education, and skills from `cv/page.tsx` into `src/data/cv.json` with TypeScript types in `src/data/cv.ts`. Zero visual regression.

#### ~~WI-7: Add Related Posts to Blog Detail (B4)~~ ✅ DONE 2026-05-09
**Commit:** `72c334b`  
**Type:** Functional Feature  
**Description:** Shows 2 related posts at bottom of each blog post based on shared tag overlap. Excludes current post, uses PostCard component.

---

### 🔴 High Priority (Remaining)

None — all high priority items complete.

---

### 🟡 Medium Priority (Remaining)

#### WI-10: Add Auto-Generated Table of Contents (B5)
**Type:** UI/UX Polish  
**Effort:** Medium (2–3 hrs)  
**Status:** NOT STARTED  
**Description:** Extract H2/H3 headings from blog post HTML and render a sticky or inline TOC on blog detail pages.  
**Acceptance Criteria:**
- [ ] TOC renders for posts with 2+ headings
- [ ] Links scroll smoothly to corresponding section
- [ ] Highlights current section on scroll (optional)
- [ ] Collapsible on mobile

---

### 🟢 Low Priority / Backlog

#### WI-2: Add Featured Projects Section to Homepage (A1)
**Type:** Functional + Content  
**Effort:** Medium (3–4 hrs)  
**Status:** NOT STARTED  
**Description:** New section below PassionGrid showcasing 3–4 projects. Each project has title, description, tech stack tags, and optional external link.  
**Acceptance Criteria:**
- [ ] Projects data stored in config or markdown (Velite)
- [ ] Responsive grid layout (1 col mobile, 2–3 col desktop)
- [ ] Consistent with Forest Depths design system
- [ ] Each project card has hover animation
- [ ] Links open externally when applicable

#### WI-3: Add Latest Blog Posts Preview to Homepage (A2)
**Type:** Functional Feature  
**Effort:** Small (1–2 hrs)  
**Status:** NOT STARTED  
**Description:** Section below passions showing 2–3 most recent published blog posts with title, date, and excerpt linking to full post.  
**Acceptance Criteria:**
- [ ] Pulls from same `posts` collection as blog page
- [ ] Shows only published posts, sorted by date desc
- [ ] Links to individual posts and "View all →" links to /blog
- [ ] Responsive and consistent styling

#### WI-11: Add Scroll-Reveal Animations (A3)
**Type:** UI/UX Polish  
**Effort:** Small (1–2 hrs)  
**Status:** NOT STARTED  
**Description:** Use IntersectionObserver to trigger fade-in-up animations as sections enter viewport. Apply to homepage sections, blog cards, CV sections.  
**Acceptance Criteria:**
- [ ] Animations fire once on scroll into view
- [ ] Respects `prefers-reduced-motion`
- [ ] No layout shift

#### WI-13: Add RSS Feed (B6)
**Type:** Infrastructure  
**Effort:** Small (1–2 hrs)  
**Status:** NOT STARTED  
**Description:** Generate `/rss.xml` route with all published blog posts.  
**Acceptance Criteria:**
- [ ] Valid RSS 2.0 or Atom feed
- [ ] Includes title, description, date, link per post
- [ ] Accessible at `/rss.xml`
- [ ] Auto-updates when new posts are added

#### WI-14: Add OpenGraph Image Generation (B7)
**Type:** Infrastructure  
**Effort:** Medium (2–3 hrs)  
**Status:** NOT STARTED  
**Description:** Use `@vercel/og` or Next.js ImageResponse to generate dynamic OG images for blog posts.  
**Acceptance Criteria:**
- [ ] Each blog post has unique OG image
- [ ] Includes post title and site branding
- [ ] Matches Forest Depths color palette

#### WI-15: Add Privacy-First Analytics (D3)
**Type:** Infrastructure  
**Effort:** Small (30–60 min)  
**Status:** NOT STARTED  
**Description:** Add Plausible, Umami, or Cloudflare Web Analytics script.  
**Acceptance Criteria:**
- [ ] Script loads only in production
- [ ] No cookies / GDPR-friendly
- [ ] Tracks page views

#### WI-17: Create About Page (E3)
**Type:** Content  
**Effort:** Medium (content-dependent)  
**Status:** NOT STARTED  
**Description:** New `/about` page with personal story, philosophy, maybe a photo.  
**Acceptance Criteria:**
- [ ] New page at `/about`
- [ ] Added to navigation
- [ ] Content written and formatted

---

## 6. Recommended Execution Order (Updated)

### Sprint 1: Quick Wins ✅ COMPLETE
1. **~~WI-1~~** — Tag Filtering (high user value, small effort) ✅
2. **~~WI-8~~** — Reading Time (polish, tiny effort) ✅
3. **~~WI-12~~** — 404 Enhancement (polish) ✅
4. **~~WI-18~~** — Golf-Themed Reading Progress (brand signature, fun) ✅

### Sprint 2: Core Value ✅ COMPLETE
5. **~~WI-4~~** — Contact Page (enables inbound) ✅
6. **~~WI-5~~** — Download CV PDF (standard professional need) ✅
7. **~~WI-9~~** — Externalize CV Data (enables future features) ✅
8. **~~WI-6~~** — Blog Search (content discovery at scale) ✅

### Sprint 3: Discovery & Polish (Current)
9. **~~WI-7~~** — Related Posts (engagement) ✅
10. **WI-10** — Table of Contents (readability)
11. **WI-11** — Scroll Reveals (polish)
12. **~~WI-16~~** — ~~Sitemap~~ (already done in LLM optimization) ✅

### Sprint 4: Growth & Infrastructure
13. **WI-13** — RSS Feed
14. **WI-14** — OpenGraph Images
15. **WI-15** — Analytics
16. **WI-17** — About Page

### Backlog (Low Priority)
- **WI-2** — Featured Projects (blocked until project content is ready)
- **WI-3** — Latest Blog Posts Preview (can be picked up anytime)

---

## 7. Open Questions

- [x] ~~Preferred contact form backend?~~ **Decided:** Formspree free tier (implemented)
- [ ] Do you want the golf stats widget (A5) to pull from an API (e.g., GHIN) or be manually updated?
- [ ] Should the newsletter (D2) be included in this plan or deferred?
- [ ] Do you have a preferred analytics provider?
- [ ] For WI-2 (Featured Projects): do you have project write-ups ready, or should that stay in backlog until content is written?

---

## 8. Appendix: Tech Notes

- **No new dependencies needed** for most features (search, filtering, scroll reveals, golf progress indicator are vanilla React/TS + CSS)
- `@vercel/og` would be needed for WI-14
- Form backend choice determines implementation for WI-4 and D2
- Velite already parses frontmatter — leverage `posts` collection for all blog-related features
- The `siteConfig` pattern is well-established; extend it for nav, projects, and social links
- **Testing:** Every new feature must include tests following existing patterns (Vitest for units, page-level integration tests, Playwright for e2e)
- **Build verification:** Always run `npm run build` before considering work complete

(End of file - total 441 lines)
