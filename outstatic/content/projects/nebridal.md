---
title: 'Northeast Bridal'
status: 'published'
author:
  name: 'Vincent Vella'
  picture: 'https://avatars.githubusercontent.com/u/22749569?v=4'
slug: 'nebridal'
description: 'Marketing site for a traveling bridal hair team'
coverImage: '/images/nebridal-cover.png'
stack: [{"label":"NextJS","value":"nextJs"},{"label":"React","value":"react"},{"label":"Typescript","value":"typescript"},{"label":"Tailwind CSS","value":"tailwind"},{"label":"Vercel","value":"vercel"}]
bullets: 'Full rebuild off WordPress + Bold Page Builder onto a static Next.js 16 App Router site on Vercel\n\n
Inline Calendly booking embed, accessible portfolio gallery with focus-trapping lightbox, rotating testimonials, full blog\n\n
Old WordPress URLs (portfolio-grid, dated permalinks, wp-admin) mapped via next.config redirects so existing inbound links keep working\n\n
BeautySalon JSON-LD on home, BlogPosting JSON-LD on posts, dynamic sitemap + robots, cookieless Vercel Analytics, prefers-reduced-motion respected throughout'
publishedAt: '2026-05-08T00:00:00.000Z'
accentColor: 'primary'
---

A full rebuild of nebridal.com — the marketing site for Northeast Bridal, a traveling bridal hair team serving Long Island, NYC, and the Tristate Area. The previous site was WordPress with a Bold Page Builder theme; the rebuild moves them onto a static Next.js 16 App Router project so every page prerenders, deploys are seconds, and the content stays in plain TypeScript instead of a page-builder UI.

The home page is the content surface — rotating black-and-white hero, an "H/A/I/R" brand grid that mirrors on the services page, premium services with a custom hairdresser icon font, a Long Island spotlight section, an auto-rotating testimonials carousel, and a Calendly inline embed for booking. The portfolio route is a masonry gallery wired to an accessible lightbox: focus trapped within the dialog, ESC and arrow-key navigation, focus restored to the trigger on close, and `prefers-reduced-motion` quietly disables the rise animations and scroll-snap behavior.

Old WordPress URLs are mapped via `next.config.ts` redirects — `/portfolio-grid`, dated permalink patterns like `/2022/03/21/<slug>`, and `/wp-admin` / `/wp-login.php` — so every link out there in the wild still lands somewhere sensible. SEO surface is JSON-LD `BeautySalon` on the home page, `BlogPosting` on each post, dynamically generated `sitemap.xml` and `robots.txt`, and per-page OG/Twitter metadata. Analytics is cookieless via Vercel Analytics; no tracking pixels, no env vars beyond the canonical site URL.
