---
title: 'Stash Note'
status: 'published'
author:
  name: 'Vincent Vella'
  picture: 'https://avatars.githubusercontent.com/u/22749569?v=4'
slug: 'stash-note'
description: 'Cross-platform rich-text notes, local-first'
coverImage: '/images/stash-note-cover.png'
stack: [{"label":"Expo","value":"expo"},{"label":"React Native","value":"reactNative"},{"label":"NativeWind","value":"nativewind"},{"label":"Supabase","value":"supabase"},{"label":"Typescript","value":"typescript"}]
bullets: 'Lexical-powered rich-text editor reused across web and native via Expo''s web component bridge\n\n
Local-first sync built on LegendState + Supabase — edits land instantly and reconcile in the background\n\n
Nested notes, text formatting, link previews, image support, and inline Excalidraw drawings with edit-in-place\n\n
Ships to iOS, Android, and the web from a single Expo Router codebase'
publishedAt: '2026-05-04T00:00:00.000Z'
accentColor: 'brand-violet'
---

A cross-platform rich-text note app. The premise was to find out how far a single Expo Router codebase could go for a real editing surface — not "render some text" but the full set of conveniences people expect from Bear or Notion: rich formatting, inline code previews, link unfurling, alignment, image embedding, nested notes-within-notes, and inline Excalidraw drawings that round-trip back to an editable canvas.

The interesting part is the editor architecture. The rich text core is Lexical, which is browser-native, so on the web that's straightforward. On iOS and Android the same Lexical editor runs inside Expo's new web-component bridge, with native gestures and inputs handling the parts that need to feel like a real mobile app. The result is one editor implementation across three platforms instead of three diverging ones.

State and persistence are local-first via LegendState backed by Supabase — typing never waits on the network, and sync happens in the background. Auth supports Apple and Google sign-in; storage handles secure keys per-platform with separate web and native implementations.
