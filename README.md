# Nostalgia Radio

A single-page nostalgia music player. Next.js App Router, TypeScript, Tailwind v4.

## Setup

```bash
npm install
```

Drop your two background images into `public/bg/`:
- `scene-wide.png` (landscape)
- `scene-tall.png` (portrait, separately composed)

```bash
npm run dev
```

## How it works

- **Playback**: songs play via the YouTube IFrame Player API (audio only — the
  iframe is rendered at 0×0 and hidden). `app/lib/use-youtube-player.ts` wraps
  the player, exposing play/pause/seek and polling the current time.
- **Playlist**: `app/lib/tracks.ts` — 166 tracks parsed from your list, in the
  original order. `next`/`prev` cycle through it; the track ends and advances
  automatically.
- **Player UI**: `app/components/Player.tsx` renders two independent layouts —
  a horizontal glass pill (`hidden sm:flex`) and a stacked mobile card
  (`sm:hidden`) — sharing the `Vinyl`, `SeekBar`, and `Transport` subcomponents.
- **Background**: `.hero-bg` in `app/globals.css` swaps between
  `scene-wide.png` and `scene-tall.png` on `@media (orientation: portrait)`.
- **Grain**: a small inline `feTurbulence` SVG data-URI, blended with
  `mix-blend-mode: overlay` at low opacity.
- **Safe areas**: every fixed edge uses `max(1rem, env(safe-area-inset-*))` so
  content clears notches/home indicators; `viewport.viewportFit = "cover"` in
  `app/layout.tsx` is required for `env()` to report real values on iOS.

## Notes

- No album art was supplied, so the vinyl disc is drawn with CSS (radial
  gradients + grooves) rather than using cover images. Swap in real artwork in
  `app/components/Vinyl.tsx` if you have it per-track.
- The "listener count" is a simulated ambient number (drifts every few
  seconds) — there's no real analytics backend wired up.
