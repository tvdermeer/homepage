<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-conventions -->
# Project: Thomas van der Meer Homepage (tvdermeer.nl)

## Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 with `@import "tailwindcss"` and `@theme inline` block
- **Content**: Velite (markdown → static pages)
- **Fonts**: Geist Sans + Geist Mono via `next/font`
- **Particles**: `@tsparticles/react` for golf ball background
- **Package Manager**: npm (NOT bun — `bun` not available in env)
- **Build**: `npm run build` (runs `velite && next build`)

## Forest Depths Design System (ACTIVE — applied 2026-05-02)

This is the canonical color palette. **NEVER revert to emerald/slate/purple/blue — the owner hates those.**

| Role | Hex | Tailwind Usage |
|------|-----|----------------|
| Base Background | `#0D1610` | `bg-[#0D1610]` |
| Surface / Cards | `#152119` | `bg-[#152119]` |
| Surface Raised | `#1E2D24` | `bg-[#1E2D24]` |
| Primary Accent (sage) | `#5F8C6B` | `text-[#5F8C6B]`, `bg-[#5F8C6B]`, `border-[#5F8C6B]/15` |
| Primary Accent Hover | `#4a7a57` | `hover:bg-[#4a7a57]` |
| Secondary Accent (mint) | `#8EBEA8` | `text-[#8EBEA8]`, hover states, highlights |
| Text Primary | `#E8F0E9` | `text-[#E8F0E9]` |
| Text Secondary | `#8FA89A` | `text-[#8FA89A]` |
| Border | `rgba(95,140,107,0.12)` | `border-[#5F8C6B]/15` |

### Background Atmosphere
```css
body {
  background: radial-gradient(ellipse at 20% 0%, rgba(95, 140, 107, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 100%, rgba(142, 190, 168, 0.04) 0%, transparent 40%),
              #0D1610;
}
```

### Design Principles
- **No pure black (#000) or pure white (#FFF)** — always use palette values
- **Depth through lightness elevation**, not heavy shadows
- **Forest canopy atmosphere** — radial gradients mimic light filtering through trees
- **Soft transitions** — `transition-colors` on interactive elements, not harsh changes
- **Glow, don't shadow** — hover effects use `shadow-[#5F8C6B]/10` not dark shadows

## File Structure
```
src/
├── app/
│   ├── globals.css          # CSS variables, prose theme, animations
│   ├── layout.tsx           # Root layout (Geist fonts, Header, Footer, GolfBallBackground)
│   ├── page.tsx             # Homepage (Hero + PassionGrid)
│   ├── not-found.tsx        # 404 page
│   ├── blog/
│   │   ├── page.tsx         # Blog listing (asymmetric grid, staggered animations)
│   │   └── [slug]/page.tsx  # Blog post detail (prose rendering)
│   └── cv/page.tsx          # CV/resume page
├── components/
│   ├── backgrounds/golf-ball-background.tsx  # tsparticles golf balls
│   ├── blog/post-card.tsx                    # Blog post card (accepts className)
│   ├── landing/
│   │   ├── hero.tsx         # Homepage hero section
│   │   └── passion-grid.tsx # Golf + AI passion cards
│   └── layout/
│       ├── header.tsx       # Sticky nav header
│       └── footer.tsx       # Site footer
├── config/site.ts           # Site metadata, nav links, social URLs
└── lib/utils.ts             # cn() classname merger
```

## Component Patterns

### PostCard — accepts `className` prop for composition
```tsx
<PostCard className="animate-fade-in-up opacity-0" ... />
```
The `className` prop is merged via `cn()` at the root element. This is the pattern for adding animation or layout overrides from parent components.

### Asymmetric Grid (blog listing)
First post spans full width (`md:col-span-2`), remaining posts fill 2-column grid. Posts wrapped in `<div>` for animation delay via `style={{ animationDelay }}`.

### Staggered Animations
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
```
Applied per-card with `style={{ animationDelay: \`${index * 100}ms\` }}`.

## What to NEVER Do
- ❌ Reintroduce emerald (`#34d399`), violet, purple, or blue accent colors
- ❌ Use `bg-slate-950`, `bg-slate-900`, or any slate background class
- ❌ Use `text-slate-*` for text (use `#E8F0E9` / `#8FA89A` instead)
- ❌ Use pure white text (`text-white`) — use `text-[#E8F0E9]`
- ❌ Add new dependencies without explicit need
- ❌ Change the Velite content pipeline or site config data structure
- ❌ Use `bun` commands — use `npm` in this environment

## What to ALWAYS Do
- ✅ Use `bg-[#0D1610]`, `bg-[#152119]`, `bg-[#1E2D24]` for backgrounds
- ✅ Use `text-[#5F8C6B]` for accent/links, `text-[#8EBEA8]` for hovers
- ✅ Use `text-[#E8F0E9]` for primary text, `text-[#8FA89A]` for secondary
- ✅ Use `border-[#5F8C6B]/15` for subtle borders
- ✅ Use `hover:shadow-[#5F8C6B]/10` for glow hover effects
- ✅ Verify with `npm run build` after changes
- ✅ Use `cn()` from `@/lib/utils` for className merging

## Verification Commands
```bash
npm run build    # Full production build (velite + next build with TypeScript check)
```
<!-- END:project-conventions -->
