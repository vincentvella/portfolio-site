---
title: 'Caliburr'
status: 'published'
author:
  name: 'Vincent Vella'
  picture: 'https://avatars.githubusercontent.com/u/22749569?v=4'
slug: 'caliburr'
description: 'Crowdsourced coffee dial-in app — grinder + bean + brew method recipe database'
coverImage: '/images/caliburr-cover.png'
stack: [{"label":"Expo","value":"expo"},{"label":"React Native","value":"reactNative"},{"label":"NativeWind","value":"nativewind"},{"label":"Supabase","value":"supabase"},{"label":"Postgres","value":"postgres"},{"label":"TanStack Form","value":"tanstackForm"},{"label":"RevenueCat","value":"revenueCat"},{"label":"Typescript","value":"typescript"}]
bullets: 'Single Expo Router codebase ships to iOS, Android, and the web at caliburr.coffee\n\n
Community-verified equipment database — five independent confirmations flip a Postgres trigger that locks the entry as canonical\n\n
Median + IQR grind-setting aggregation per grinder/brew-method combo so dialing in starts from the crowd, not zero\n\n
Full admin surface: moderation queue, equipment edit review, backer management, push notifications via Expo + Supabase webhooks'
publishedAt: '2026-05-04T00:00:00.000Z'
---

A crowdsourced coffee dial-in app. The premise: every espresso shot or pour-over recipe needs the same handful of variables — grinder, grind setting, dose, yield, brew time, water temp — and that data is way more useful pooled than scattered across forum posts. Caliburr is the pool.

Built on a single Expo Router codebase that ships to iOS, Android, and the web. The data model centres on community-verified equipment: anyone can add a grinder or espresso machine, but it stays unverified (and editable) until five independent users confirm the details, at which point a Postgres trigger flips it read-only and treats it as canonical. The recipe submission flow then aggregates grind settings across users — median plus IQR per grinder/brew-method combo — so a new owner of a Niche Zero starting on a Lelit Bianca gets a real starting point instead of guessing.

Underneath that is the full app surface: Supabase auth with Apple/Google sign-in, RevenueCat subscriptions for backer tier, deep links via universal links and app links, image uploads with Supabase Storage, a complete admin interface for moderation and analytics, and Expo push notifications wired through database webhooks for moderator alerts.
