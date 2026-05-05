# Portfolio polish plan

Ideas to spice up the neobrutalism refresh, ordered roughly by impact-per-effort.
All eight items below shipped on `feat/neobrutalism-design-refresh`.

## Quick wins (afternoon each)

### 1. Cursor-tracking shadow on neo cards ✓
The `neo-shadow` is currently static. Wire `--shadow-x` / `--shadow-y` CSS vars
to the cursor position (per-card or per-viewport) so the offset shadow shifts
slightly as the mouse moves. Cards "look toward" the cursor — feels physical
and toy-like, which is the core of brutalism. Pure CSS vars + a small client
component wrapper, no animation library.

### 2. Press-and-release on `neo-press` ✓
On `:active`, snap the card flush with its shadow (translate by the shadow
offset, set shadow to 0); on release, ease back over ~60ms. Makes every link
and card feel tactile.

### 3. Marquee strip of stack badges on the homepage ✓
Horizontally scrolling band of every tech in the stack, alternating accent
colors, all wrapped in `neo-border`. Pure CSS keyframes. Signals breadth at a
glance and adds motion to the landing page without being noisy.

### 4. Stamped page headers ✓
Render the page name (`Projects`, `Resume`) as oversized text rotated -2°,
behind a smaller "real" page title that's straight. Rotated word reads as a
watermark/stamp. Pure CSS.

## Medium effort, big payoff

### 5. Polaroid-style project grid ✓
Replace stacked full-width project rows with a 2- or 3-up grid of polaroid-
shaped cards. Each card lightly tilted, cover image (or stack badges) as the
photo, title as caption. Torn-tape sticker pinning the top edge in the
project's accent color. On hover the tilt eases to 0 and the card lifts.

### 6. Animated landing hero ✓
Cycling role tagline under the name (5 roles, 2.8s rotation, slide+fade) and
a pulsing offset shadow on the avatar. View Transitions piece deferred —
not needed right now.

### 7. "Currently building" widget on the homepage ✓
Pulled from a `currently` resume-section in outstatic. Rendered as a stamped
sticker. Easy to update via the CMS, keeps the site feeling alive without
needing a blog.

### 8. Per-project hero color ✓
Each project has an `accentColor` field flowing through to the list card
header, the detail page title bar, the divider under "Stack", and the
torn-tape sticker on the polaroid.
