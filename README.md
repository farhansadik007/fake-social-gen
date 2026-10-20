# Fake Social Gen

A web app for composing believable fake social media posts and exporting them as
high-resolution PNG images.

Pick a platform, fill in the profile, post text, and engagement numbers, watch
the preview update live, then download the result as an image you can share.

> **Note:** This project is for mockups, design work, memes, and testing. Please
> don't use it to impersonate real people or to spread misinformation.

## Features

- **Live preview** — the post card re-renders as you type.
- **PNG export** — download the card at 2× resolution via `html-to-image`.
- **Avatar upload** — upload a file (embedded as a data URL) or paste a URL.
- **Verified badge & affiliation** — optional blue check and a small org badge.
- **Light / dark cards** — export either theme independently of the app UI.
- **Abbreviated counts** — engagement numbers render X-style (`8400` → `8.4K`).
- **Three TikTok views** — video screen, comment sheet, or comments docked
  over the video, sharing one editor state.
- **Multi-platform ready** — the home page and nav are driven by a single
  platform list, so new platforms are easy to add.

Currently supported: **X**, **Instagram**, **LinkedIn**, **TikTok**,
**Facebook**, **Threads**, **Reddit**, and **Discord** — every platform in the
list.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack) with React Compiler enabled
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) for icons
- [html-to-image](https://github.com/bubkoo/html-to-image) for PNG export
- [framer-motion](https://www.framer.com/motion/) (installed, available for animations)

Plain JavaScript (no TypeScript). Path alias `@/*` maps to the project root.

## Getting Started

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The home page lists the available generators;
the editors live at `/x`, `/instagram`, `/linkedin`, `/tiktok`, `/facebook`,
`/threads`, `/reddit`, and `/discord`.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
fake-social-gen/
├─ app/                      # App Router routes
│  ├─ layout.js              # Root layout: fonts, header, global background
│  ├─ globals.css            # Tailwind import
│  ├─ page.js                # Home page — platform picker
│  ├─ x/page.js              # /x route → renders <XTools />
│  ├─ instagram/page.js      # /instagram route → renders <IGTools />
│  ├─ linkedin/page.js       # /linkedin route → renders <LITools />
│  ├─ tiktok/page.js         # /tiktok route → renders <TTTools />
│  ├─ facebook/page.js       # /facebook route → renders <FBTools />
│  ├─ threads/page.js        # /threads route → renders <THTools />
│  ├─ reddit/page.js         # /reddit route → renders <RDTools />
│  └─ discord/page.js        # /discord route → renders <DCTools />
├─ components/
│  ├─ SiteHeader.jsx         # Shared sticky navigation
│  ├─ ui/Controls.jsx        # Reusable form primitives (Field, Button, Toggle…)
│  ├─ X/
│  │  ├─ XTools.jsx          # Client editor: state, controls, PNG export
│  │  └─ XCard.jsx           # Presentational X post card (accepts a ref)
│  ├─ Instagram/
│  │  ├─ IGTools.jsx         # Client editor: state, controls, PNG export
│  │  └─ IGCard.jsx          # Presentational Instagram feed post (accepts a ref)
│  ├─ LinkedIn/
│  │  ├─ LITools.jsx         # Client editor: state, controls, PNG export
│  │  └─ LICard.jsx          # Presentational LinkedIn feed post (accepts a ref)
│  ├─ TikTok/
│  │  ├─ TTTools.jsx         # Client editor: state, 3-way switcher, PNG export
│  │  ├─ TTVideoLayer.jsx    # Shared video bg, tabs, action rail, meta
│  │  ├─ TTVideoCard.jsx     # 9:16 video screen
│  │  ├─ TTOverlayCard.jsx   # Comment sheet docked over the video
│  │  └─ TTCommentsCard.jsx  # Standalone comment sheet + input bar
│  ├─ Facebook/
│  │  ├─ FBTools.jsx         # Client editor: state, controls, PNG export
│  │  └─ FBCard.jsx          # Feed post + reaction artwork + comments
│  ├─ Threads/
│  │  ├─ THTools.jsx         # Client editor: state, controls, PNG export
│  │  └─ THCard.jsx          # Presentational Threads post
│  ├─ Reddit/
│  │  ├─ RDTools.jsx         # Client editor: state, nested comments, PNG export
│  │  └─ RDCard.jsx          # Feed post, vote pill, threaded comments
│  └─ Discord/
│     ├─ DCTools.jsx         # Client editor: messages, reactions, PNG export
│     └─ DCCard.jsx          # Channel header, message list, composer
├─ lib/
│  ├─ platforms.js           # Platform metadata used by home page + nav
│  ├─ formatXDate.js         # "3:04 PM · Oct 20, 2026"
│  ├─ formatXNumber.js       # "8.4K", "1.2M"
│  ├─ formatIGDate.js        # "OCTOBER 20, 2026"
│  ├─ formatIGNumber.js      # "1,284" / "12.4K"
│  ├─ formatLIDate.js        # "2h", "3d", "Jan 15"
│  ├─ formatLINumber.js      # "1,842" / "12.4K"
│  ├─ formatTTTime.js        # "2h", "5d", "3mo"
│  ├─ formatTTNumber.js      # "842" / "128.4K" / "1.2M"
│  ├─ formatFBDate.js        # "2h", "1d", "Jan 15"
│  ├─ formatFBNumber.js      # "4.8K", "1.2M"
│  ├─ formatTHTime.js        # "2h", "3d", "Jan 15"
│  ├─ formatTHNumber.js      # "1,284" / "12.4K"
│  ├─ formatRDDate.js        # "16h ago", "3d ago"
│  ├─ formatRDNumber.js      # "1.2k", "12k"
│  └─ formatDCTime.js        # "Today at 9:14 AM"
└─ public/
   ├─ default-avatar-x.png    # Shared fallback avatar
   └─ facebook/               # Real Facebook reaction artwork (like, love, haha, wow, sad, angry)
```

### How it fits together

Each platform is a route (`app/<platform>/page.js`) that renders a
`<Platform>Tools` editor. The editor holds the post state and renders the
presentational `<Platform>Card`, which is the DOM node exported to PNG. Shared
formatting lives in `lib/`, and shared form controls live in `components/ui/`.

## Adding a New Platform

1. Create the card component, e.g. `components/Instagram/IGCard.jsx`. Keep it
   purely presentational and accept a `ref` on its root element so it can be
   exported.
2. Create the editor, e.g. `components/Instagram/IGTools.jsx`, following
   `XTools.jsx`: `"use client"`, local state, controls, a preview, and an export
   handler using `html-to-image`.
3. Add the route at `app/instagram/page.js`.
4. Flip `available` to `true` for that platform in `lib/platforms.js` — the home
   page and header update automatically.

## Export Notes

`html-to-image` renders the card from the DOM, so images saved as data URLs
(uploads) always export cleanly. External image URLs may fail if the host blocks
cross-origin requests — if an export errors, upload the avatar file instead.
