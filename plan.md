# Portfolio polish plan

Ideas to spice up the neobrutalism refresh, ordered roughly by impact-per-effort.

## Quick wins (afternoon each)

### 1. Cursor-tracking shadow on neo cards
The `neo-shadow` is currently static. Wire `--shadow-x` / `--shadow-y` CSS vars
to the cursor position (per-card or per-viewport) so the offset shadow shifts
slightly as the mouse moves. Cards "look toward" the cursor — feels physical
and toy-like, which is the core of brutalism. Pure CSS vars + a small client
component wrapper, no animation library.

### 2. Press-and-release on `neo-press`
On `:active`, snap the card flush with its shadow (translate by the shadow
offset, set shadow to 0); on release, ease back over ~60ms. Makes every link
and card feel tactile.

### 3. Marquee strip of stack badges on the homepage
Horizontally scrolling band of every tech in the stack, alternating accent
colors, all wrapped in `neo-border`. Pure CSS keyframes. Signals breadth at a
glance and adds motion to the landing page without being noisy.

### 4. Stamped page headers
Render the page name (`Projects`, `Resume`) as oversized text rotated -2°,
behind a smaller "real" page title that's straight. Rotated word reads as a
watermark/stamp. Pure CSS.

## Medium effort, big payoff

### 5. Polaroid-style project grid
Replace stacked full-width project rows with a 2- or 3-up grid of polaroid-
shaped cards. Each card lightly rotated (alternating ±1.5°), cover image (or
stack badges) as the photo, title as a handwritten-style caption. On hover the
rotation eases to 0 and the card lifts.

### 6. Animated landing hero
Replace the static avatar block: words drop in one at a time
("Software" / "Engineer" / "Founder" cycling), avatar gets a pulsing offset
shadow, and route transitions into project pages use the View Transitions API
(or framer-motion's LayoutGroup) so the project card morphs into the detail
page header.

### 7. "Currently building" widget on the homepage
Pull from a singleton in outstatic. Render as a stamped sticker:
"CURRENTLY: Caliburr v1.1 + velk MCP server work". Easy to update, keeps the
site feeling alive without needing a blog.

### 8. Per-project hero color
Each project markdown gets an `accentColor` field. The detail page paints the
title bar, badges, and divider lines in that color. Combined with stamped
headers, every project feels like its own zine.

## Ambitious

### 9. "Site sketch" mode toggle
A header button that flips the entire site to wireframe mode — borders thicken,
fills disappear, fonts go monospace, every element gets an annotation arrow
pointing at it ("← header", "← bio"). Stays on-brand for brutalism, the kind of
thing people share.

### 10. Drag-to-rearrange project cards (persisted)
Brutalism likes user agency. Visitors curate their own layout, order saved to
localStorage so it persists for them.

### 11. `/play` route
Single page with three or four small interactive demos — `use-cooldown`-style
hooks, a Lexical mini-editor, a feature flag toggle wired to a hosted togglez
instance. Turns "look at my projects" into "try my projects."

## Working order

Starting with **1 → 2 → 4** as the cheapest combined uplift; they touch every
page and meaningfully change the feel. Then 3, then 5/8 together (project-page
rework), then assess.
