---
title: 'Togglez'
status: 'published'
author:
  name: 'Vincent Vella'
  picture: 'https://avatars.githubusercontent.com/u/22749569?v=4'
slug: 'togglez'
description: 'Self-hosted feature flag service in Go'
coverImage: '/images/togglez-cover.png'
stack: [{"label":"Go","value":"go"},{"label":"Postgres","value":"postgres"}]
bullets: 'Self-hostable feature flag service in Go — Echo for HTTP, GORM on Postgres, Keycloak for auth\n\n
Full multi-tenant model: organizations → projects → environments, with environment-scoped flag configurations\n\n
Typed flags (boolean, string, number, JSON) with variants, plus targeting rules over user attributes and reusable user segments\n\n
HTTP `/evaluate` endpoint so any client in any language gets the same evaluation logic without per-language SDK drift'
publishedAt: '2026-05-04T00:00:00.000Z'
accentColor: 'accent'
---

A self-hosted feature flag service written in Go. Most teams reach for LaunchDarkly or GrowthBook and accept that every user attribute and rollout decision now lives in a vendor's database; Togglez is the alternative for when that tradeoff isn't acceptable.

The data model is the full multi-tenant shape — organizations contain projects, projects contain environments, and a feature flag has a separate configuration per environment so dev/staging/prod can drift safely. Flags are typed (boolean, string, number, JSON) with variants, and targeting works either by raw user-attribute matches or via reusable user segments, so the same audience definition can drive multiple rollouts.

Evaluation is exposed over HTTP rather than a per-language SDK, which sidesteps the usual problem of evaluation logic drifting between Go, JS, and Python clients. Auth is JWT via Keycloak, persistence is GORM on Postgres, audit logs track every change, and the whole thing ships as a single Go binary plus a docker-compose for the surrounding services.
