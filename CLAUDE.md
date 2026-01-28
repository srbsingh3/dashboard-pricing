# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

This is a **design portfolio prototype** for a design interview. The goal is:
- **Good usability and visual design** — polished and professional
- **Appearance over functionality** — it only needs to *look* functional
- **Mock data is fine** — no backend needed

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (port 3000) |
| `npm run lint` | Check for consistency issues |
| `npm run lint -- --fix` | Auto-fix styling issues |
| `npm run test:run` | Run tests once |

## Key Files

- **Theme**: `src/app/globals.css` — all colors, typography, shadows, radius
- **Constants**: `src/lib/constants.ts` — reusable values (no magic numbers)
- **Mock data**: `src/lib/mock-data.ts` — all fake data goes here
- **Types**: `src/lib/types.ts` — TypeScript interfaces
- **Components**: `src/components/ui/` (shadcn) and `src/subframe/ui/` (Subframe — do not edit)

## Theming — Single Source of Truth

All theme changes go in `src/app/globals.css`:
- **Colors**: `brand-*`, `neutral-*`, `error-*`, `warning-*`, `success-*` (50-900 shades)
- **Typography**: `text-caption`, `text-body`, `text-body-bold`, `text-heading-1/2/3`
- **Font**: Change `--font-family-sans` to swap fonts globally
- **Shadows**: `shadow-sm`, `shadow-default`, `shadow-md`, `shadow-lg`
- **Radius**: `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`, `radius-full`

To change the color scheme globally, modify the brand palette (brand-50 through brand-900).

## Visual Consistency — Critical

**Before changing anything, study how similar elements are already styled and match them exactly.** The design is evolving — when a pattern exists, follow it.

### Rules

1. **Same purpose = same appearance**
   - Two buttons doing the same thing must look identical (size, color, padding, font)
   - Don't mix styles for similar elements across different pages

2. **Use theme colors only**
   - Use `text-neutral-*`, `bg-brand-*`, `border-neutral-*`
   - Never use arbitrary colors like `text-gray-500` or `bg-[#4F46E5]`

3. **Use defined typography only**
   - Use only: `text-caption`, `text-body`, `text-body-bold`, `text-heading-1/2/3`
   - Never use arbitrary sizes like `text-[13px]` or `text-sm`

4. **Uniform spacing**
   - Cards should have consistent padding (e.g., always `p-4` or always `p-6`)
   - Gaps between similar elements should be identical
   - Page margins should be consistent across pages

5. **Reuse existing components**
   - Check `src/components/ui/` and `src/subframe/ui/` before creating new ones
   - If a component exists, use it — don't create a similar one with slight differences

## Constants Over Magic Values

Always use `src/lib/constants.ts` instead of hardcoded values:
- `STATUS_COLORS` — badge colors for statuses
- `FADE_IN`, `SLIDE_UP`, `STAGGER_CHILDREN` — animation variants
- `DURATION_OPTIONS`, `REGIONS`, `CITIES` — filter dropdowns
- `NAV_ITEMS` — navigation configuration

## After Each Code Change

1. Run `npm run lint` — fix all errors
2. Run `npm run test:run` — ensure tests pass
3. Provide a table summarizing what changed and why

## Design Context

### Users
**Pricing Analysts** — data-savvy business users who analyze A/B experiment results and optimize delivery fees for a food delivery platform. They work with complex data tables, charts, and experiment configurations. Their context is focused, analytical work where they need to make confident decisions based on the data presented.

### Brand Personality
**Modern, Precise, Capable** — the interface should feel like a sophisticated tool built by experts for experts. Every pixel should feel intentional. The design communicates competence through restraint and attention to detail.

### Emotional Goals
- **Confident & In Control** — users feel empowered to make data-driven decisions
- **Efficient & Productive** — users can accomplish tasks quickly without friction

### Aesthetic Direction
**Reference**: Linear — clean, fast, keyboard-first. The dashboard should feel like a precision instrument.

**Visual Tone**: Professional B2B SaaS with a modern edge. Data-dense but never cluttered. Subtle sophistication over flashy effects.

**Anti-references** (what to avoid):
- Consumer/playful apps (Slack, Discord) — no rounded everything, excessive color, or emoji
- Generic Bootstrap look — no templated, personality-free designs
- Over-designed dashboards — no gratuitous gradients, animations, or visual noise
- Heavy enterprise tools (SAP, Oracle) — no dated, cluttered complexity

### Design Principles

1. **Precision over decoration** — every element earns its place. No ornamental flourishes. If it doesn't serve the user's task, remove it.

2. **Data density with clarity** — show rich information without overwhelming. Use hierarchy, whitespace, and subtle dividers to organize. Tables and charts should be scannable at a glance.

3. **Consistent rhythm** — uniform spacing, predictable patterns, same solution for same problems. Visual consistency builds trust and reduces cognitive load.

4. **Subtle feedback** — hover states, transitions, and focus indicators should be present but restrained. Animations serve function (guiding attention, confirming actions), never decoration.

5. **Typography as structure** — the limited type scale (caption/body/heading-1/2/3) creates hierarchy. Let weight and size do the work; avoid adding colors or effects to text for emphasis.
