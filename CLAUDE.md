# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is a **design portfolio prototype** for demonstrating past work in a design interview. The goal is:
- **Good usability and visual design** — the UI should look polished and professional
- **Appearance over functionality** — the UI only needs to *look* functional, not actually work
- **Mock data is preferred** — use fake/hardcoded data freely; no backend required unless absolutely necessary

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Generate coverage report |

## Architecture

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4

**Component Libraries:**
- **shadcn/ui** (`src/components/ui/`) — Base UI components (Button, Select, Dialog, etc.)
- **Subframe** (`src/subframe/ui/`) — Design system components synced from Subframe app
- Use existing components from these libraries; avoid creating new base components

**Key Directories:**
```
src/
├── app/                    # Next.js routes and globals.css (theme)
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── dashboard/          # Dashboard feature components
│   ├── experiments/        # Experiments feature components
│   └── layout/             # Sidebar, Header
├── subframe/ui/            # Subframe design system (do not edit directly)
└── lib/
    ├── constants.ts        # Design tokens, navigation, filter options
    ├── types.ts            # TypeScript interfaces
    ├── mock-data.ts        # All mock/fake data
    └── utils.ts            # cn() utility for classnames
```

## Theming — Single Source of Truth

**All theme changes must be made in `src/app/globals.css`:**
- **Colors:** Brand (indigo), Neutral, Error, Warning, Success — all have 50-900 shades
- **Typography:** Use existing classes: `text-caption`, `text-body`, `text-body-bold`, `text-heading-1/2/3`, `text-monospace`
- **Font family:** Geist Sans and Geist Mono (change `--font-family-sans` and `--font-family-mono` to swap fonts)
- **Shadows:** `shadow-sm`, `shadow-default`, `shadow-md`, `shadow-lg`, `shadow-overlay`
- **Border radius:** `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`, `radius-2xl`, `radius-full`

**To change the color scheme globally:** Modify the brand color palette (brand-50 through brand-900) in globals.css.

## Constants Over Magic Numbers

Always use centralized constants from `src/lib/constants.ts`:
- `NAV_ITEMS` — Navigation configuration
- `STATUS_COLORS` — Badge colors for different statuses
- `DURATION_OPTIONS`, `REGIONS`, `CITIES`, `VENDOR_CHAINS`, `VERTICAL_TYPES` — Filter dropdowns
- `FADE_IN`, `SLIDE_UP`, `STAGGER_CHILDREN` — Framer Motion animation variants
- `ROWS_PER_PAGE_OPTIONS` — Table pagination

## Consistency — Critical for Design Quality

**Consistency is paramount.** This is a design portfolio project — visual inconsistencies will be noticed and reflect poorly. Every element of the same type must look identical.

**Follow established patterns:** The design is evolving. When a pattern has been established (e.g., how a card looks, how a button is styled), follow that pattern exactly. Observe what exists in the codebase and match it — don't invent new styles for components that already have a defined look.

### Visual Consistency Rules

1. **Same purpose = same appearance**
   - Two buttons that do the same thing must look identical (same size, color, padding, font)
   - All "primary action" buttons use the same variant; all "secondary" buttons use another
   - Don't mix styles for similar elements across different pages

2. **Strict font size discipline**
   - Use ONLY the predefined typography classes: `text-caption`, `text-body`, `text-body-bold`, `text-heading-1/2/3`
   - Never use arbitrary font sizes like `text-[13px]` or `text-sm` when a defined class exists
   - All elements of the same type must use the same font size

3. **Spacing must be uniform**
   - Cards should have consistent padding (e.g., always `p-4` or always `p-6`)
   - Gaps between elements of the same type should be identical
   - Page margins should be consistent across all pages

4. **Colors only from the theme**
   - Use semantic colors: `text-neutral-*`, `bg-brand-*`, `border-neutral-*`
   - Never use arbitrary colors like `text-gray-500` or `bg-[#4F46E5]`
   - Status indicators always use `STATUS_COLORS` from constants

5. **Reuse existing components**
   - Before creating anything new, check `src/components/ui/` and `src/subframe/ui/`
   - If a component exists, use it — don't create a similar one with slight differences
   - Extend existing components via props, not by duplicating code

### Data & Code Consistency

6. **Mock data in one place** — All fake data lives in `src/lib/mock-data.ts`
7. **Types in one place** — All interfaces go in `src/lib/types.ts`
8. **Constants over magic values** — Numbers, strings, and options go in `src/lib/constants.ts`

## Subframe Integration

Subframe components are synced via the Subframe CLI. Configuration is in `.subframe/sync.json`:
- **Project ID:** `597845b27e4d`
- **Import alias:** `@/subframe/*`
- **Do not manually edit** files in `src/subframe/ui/` — they are overwritten on sync

## Animation Pattern

Use Framer Motion with predefined variants from constants:
```tsx
import { motion } from "framer-motion"
import { FADE_IN, SLIDE_UP, STAGGER_CHILDREN } from "@/lib/constants"

<motion.div {...FADE_IN} transition={{ duration: 0.3 }}>
```

## Path Aliases

- `@/*` → `./src/*`
- `@/subframe/*` → `./src/subframe/ui/*`

## After Each Change

Provide a tabular summary of what was changed in each file and why.
