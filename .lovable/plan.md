## Goal
Build only the hero carousel section, matching the: a centered banner card with the previous/next slides peeking on either side as tilted/angled cards, smooth slide transitions, prev/next arrow buttons, diamond-shaped dot indicators, and auto-advance. Fully responsive (desktop shows side peeks; mobile shows just the active card with a small peek edge, like the mobile screenshot).

## Behavior
- 3–4 banner slides with placeholder jewelry imagery (generated, pink/rose theme matching the reference).
- Center slide is fully visible, flat, and prominent.
- Previous slide peeks on the left, next slide peeks on the right — both slightly scaled down, rotated outward (~6–10°), and partially clipped.
- Clicking next: center slides left, right neighbor rotates flat into center, a new slide appears on the right. Smooth eased transition (~600ms).
- Auto-advance every ~5s, pauses on hover.
- Arrow buttons (circular, white, shadow) on left/right, vertically centered.
- Diamond dot indicators below the carousel; active dot is filled/larger.
- Responsive:
  - Desktop (≥1024px): side peeks visible (~12–15% of each neighbor showing).
  - Tablet (≥640px): smaller peeks (~6–8%).
  - Mobile (<640px): only active card centered with a tiny edge hint, arrows shrink, dots remain.

## Technical Plan
- New route content in `src/routes/index.tsx` rendering a single `<HeroCarousel />`.
- New component `src/components/HeroCarousel.tsx` — self-contained, uses React state + `setInterval` for auto-play; CSS transforms for the tilt/peek effect.
- Use Tailwind for layout/responsiveness; transforms via inline style for dynamic rotation/translate per slide based on its offset from the active index.
- Generate 3 banner images (pink "Save in Style", "Rhapsody of Colours" style) into `src/assets/` and import them.
- Add hero-specific CSS tokens (rose/pink background gradient for the section) in `src/styles.css` if needed; no global theme changes.
- Update `<head>` meta in the route for SEO (title/description for the hero/landing).

## Out of scope
Header, nav, search, category section, footer, login, cart, live chat, gold price widget — not built.

## Files
- `src/routes/index.tsx` — replace placeholder with hero section wrapper + `<HeroCarousel />`.
- `src/components/HeroCarousel.tsx` — new.
- `src/assets/hero-slide-1.jpg`, `hero-slide-2.jpg`, `hero-slide-3.jpg` — generated.
- `src/styles.css` — minor additions only if needed for custom keyframes.
