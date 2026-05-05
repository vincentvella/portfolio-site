---
title: 'Velk'
status: 'published'
author:
  name: 'Vincent Vella'
  picture: 'https://avatars.githubusercontent.com/u/22749569?v=4'
slug: 'velk'
description: 'Zig terminal AI harness with MCP, vim mode, and multi-provider support'
stack: [{"label":"Zig","value":"zig"},{"label":"Anthropic API","value":"anthropic"},{"label":"OpenAI API","value":"openai"},{"label":"MCP","value":"mcp"}]
bullets: 'Terminal AI harness written in Zig 0.16 — no runtime, no GC, single static binary\n\n
Pluggable provider layer for Anthropic and OpenAI behind a shared streaming interface\n\n
First-class MCP support so the same tool servers used by Claude Code and other clients work here\n\n
Modal vim editor inside the prompt and OSC-52 clipboard so it behaves correctly over SSH'
publishedAt: '2026-05-04T00:00:00.000Z'
---

A terminal-native AI harness written in Zig 0.16. The goal was a single static binary that starts instantly, has no runtime to manage, and treats the terminal as a real interaction surface rather than a transport for someone else's UI.

Providers (Anthropic and OpenAI) sit behind a shared streaming interface so the rest of the app doesn't care which one is responding. MCP support is built in — the same tool servers that work with Claude Code and other MCP clients plug straight in, which makes it useful for actual work instead of just chat. The prompt itself is a modal vim-style editor, and OSC-52 clipboard escapes mean copy/paste works cleanly even when running over SSH on a remote box.

Distributed via a Homebrew tap so installing it is `brew install vincentvella/velk/velk`.
