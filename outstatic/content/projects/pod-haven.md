---
title: 'Pod Haven'
status: 'published'
author:
  name: 'Vincent Vella'
  picture: 'https://avatars.githubusercontent.com/u/22749569?v=4'
slug: 'pod-haven'
description: 'Local-first podcast listener'
coverImage: '/images/pod-haven-cover.jpeg'
stack: [{"label":"Expo","value":"expo"},{"label":"React Native","value":"reactNative"},{"label":"NativeWind","value":"nativewind"},{"label":"SQLite","value":"sqlite"},{"label":"Drizzle ORM","value":"drizzle"},{"label":"Typescript","value":"typescript"}]
bullets: 'Local-first by design — feeds, episodes, and play state live in on-device SQLite via Drizzle, no account required\n\n
Built with Expo + NativeWind for a single React Native codebase across iOS and Android\n\n
Minimal surface area on purpose: subscribe, listen, resume — nothing else competing for attention'
publishedAt: '2026-05-04T00:00:00.000Z'
accentColor: 'primary'
---

A minimal local-first podcast listener. Most podcast apps assume an account, a sync service, and a recommendation feed; Pod Haven assumes none of that. Feeds, episodes, and playback state all live in on-device SQLite via Drizzle ORM, which means no sign-up, no server, and no opinions about what you should listen to next.

The app is intentionally small — subscribe, listen, resume where you left off — and the stack matches: Expo + NativeWind for the UI, Drizzle for typed SQL queries against the local database. The result is a podcast app that opens fast and stays out of the way.
