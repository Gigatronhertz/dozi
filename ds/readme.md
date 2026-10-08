# DOZI Design System

DOZI is a Lagos fashion house and design studio making **modular apparel**: every piece is a base built from parts (collars, sleeves, panels, hoods, pockets, straps, charms) that detach, attach and swap. The customer chooses a base and decides how it becomes theirs. Collections are released as numbered **Chapters**, each owning one garment colour (01 Navy, 02 Oxide, 03 Burgundy, 04 Deep Olive). Prices are in Naira (₦).

**Product surface:** one marketing + commerce website (home, shop, product, studio/configurator, collections, bag).

## Sources
- Live site: https://dozi-eight.vercel.app/ (pages: `/`, `/design.html`, `/shop.html`, `/product.html?id=…`, `/collections.html`) — copy and campaign photography taken from here.
- Brand boards (uploads/): *DOZI Logo Identity Presentation Board*, *DOZI Modular Jacket Design Board*, *DOZI Modular T‑Shirt Collection*, *The Set: Modular Trouser System*.
- No codebase or Figma was provided. Site CSS/fonts were not readable, so type is a substitution (see below).

## Index
- `styles.css` — entry point (imports only) → `tokens/fonts.css`, `colors.css`, `fabric.css`, `typography.css`, `spacing.css`, `motion.css`, `base.css`
- `assets/logo/` — `dozi-lockup.svg`, `dozi-symbol.svg`, `dozi-wordmark.svg` (vector traces of the identity board, `currentColor`)
- `assets/img/` — packshots and hardware detail crops from the brand boards (no people, by direction)
- `guidelines/` — foundation specimen cards (Brand, Colors, Fabric, Type, Spacing, Imagery)
- `components/` — `brand/Logo` (incl. `stitched`), `hardware/Zipper · ZipSeam · Stitched · Rivet · LeatherPatch`, `icons/FashionIcon`, `core/Button · ArrowLink · Eyebrow · Tag`, `commerce/ProductCard · Swatch(Group) · OptionChip · Price`, `forms/TextField · Select · QuantityStepper`
- `ui_kits/website/` — click-through redesign: Home, Shop, Product, Studio, Bag drawer
- `SKILL.md` — Agent Skill wrapper

Intentional additions (no source component library existed): the whole component set was authored from the boards and site content.

## CONTENT FUNDAMENTALS
- **Voice:** quiet, declarative, confident. Short sentences, full stops. "One base. Many expressions." "Made by us. Made yours."
- **Person:** speaks to *you*; DOZI is *we*. "We make the base. You make it yours." "You aren’t browsing clothes."
- **Verb chains** are a signature: *Cut / Overlap / Shift / Reassemble*; *Detach · Attach · Swap · Adapt · Express*. Use slashes or middots, never commas.
- **Casing:** headlines sentence case in serif; all labels, nav, captions in UPPERCASE tracked sans. Product names title case with "The": *The Polo, The Wide Trouser, The Core Jacket*.
- **Product detail line:** `Colour / Fabric` — "Chocolate / Wool Twill", "Black / Waxed Cotton".
- **Chapters:** "Chapter 02 — Oxide" (em dash, two-digit number).
- **CTAs:** imperative + arrow for links ("Shop all →", "Open the studio →"); buttons uppercase without arrow ("Add to bag", "Explore the design").
- British spelling (colour, customise). No emoji. No exclamation marks. Prices "₦92,000"; configurable bases "from ₦68,000".

## VISUAL FOUNDATIONS
**Core idea: the website is a piece of DOZI clothing.** Pages are cut from denim, joined by zips, finished with topstitching, rivets, a leather back-patch and a selvedge edge. No photography of people.
- **Fabric surfaces:** every surface is a textile, set with `background: var(--fabric-…)`: `denim` (default page), `denim-dark` (waistband/header, alt sections), `denim-deep` (lining, footer), `denim-washed` (lighter feature sections), `bone` (patches/cards/labels), `leather` (brand patch), `pattern-paper` (studio cutting mat). Texture = SVG noise + twill diagonals.
- **Colour:** indigo denim ground with bone (`--bone-100`) text. Copper-gold `--thread` is the accent: stitches, eyebrows, hover, active states. Brass gradients for metal only. Selvedge red appears once, at the page's end. Chapter colours (navy, oxide, burgundy, olive) show as pinked fabric swatches.
- **Stitching replaces borders.** Dividers are `--stitch-h` dashed thread lines (often doubled). Cards are `Stitched` patches with an inset dashed topstitch. Inputs use dashed thread underlines on denim.
- **Zips join sections.** `ZipSeam` is a closed zip between sections. `Zipper` closes a section: the user drags the brass pull (or clicks / presses Enter) and the teeth separate in a V, the flaps part and the content drops open. Use 1–2 per page for discovery moments; small `compact` zips work as accordions.
- **Header = waistband:** dark denim band, triple topstitch, two belt loops, the leather patch as the logo.
- **Footer = hem:** a bone selvedge strip with a red ID line, then deep denim and a stitched wordmark.
- **Type:** light serif display (Cormorant Garamond, substitute) with italic turns; Jost for body; tracked uppercase labels. Bone on denim; ink on bone patches.
- **Imagery:** packshots on bone inside stitched patches; hardware macros (snap, zip, label, hang tag) pinned with safety pins and slightly rotated. **Never people.**
- **Corners:** 0. Pocket/tag shapes come from `clip-path`; pinked edges on fabric swatches use a zigzag mask. Only swatches and rivets are round.
- **Shadows:** `--shadow-patch` makes patches sit on the fabric; drop-shadows under zip flaps and pins. Nothing floats without a reason.
- **Hover:** patches lift 4px and tilt slightly; icons animate (zip pull swings, pin opens, stitch sews, scissors snip, button spins); thread-outline buttons fill with a faint thread wash.
- **Selected:** stitched bone patch (bone fill + inset thread) on denim.
- **Motion:** `--ease-cut` for zips, drawers and flaps (~900ms); `--ease-out` for lifts; idle sway on hang tags and zip pulls. Keyframes live in `tokens/motion.css` (`dz-*`).
- **Layout:** generous section padding (96–144px), two-column editorial splits, card grids with slight resting rotations (±1°) so pieces feel placed by hand.

## ICONOGRAPHY
- **FashionIcon** (`components/icons`) is the icon system: zip, buckle, pin, stitch, rivet, button, needle, hanger, tag, scissors. 24px grid, 1.5px round stroke, `currentColor`. Each has a hover animation tied to how the real object moves.
- Mapping: Shop → hanger · Design → needle · Chapters → scissors · Search → pin · Bag → tag · Detach → zip · Attach → button · Swap → buckle · Adapt → pin · Express → needle.
- Text arrows (→ ←) remain for link CTAs. The leaf symbol can be rendered `stitched` as embroidery (pocket, footer).
- No emoji, no generic UI icon libraries.

## Logo
The lockup, symbol and wordmark were vector-traced from the identity board and overlaid on the source to check fit. The leaf is two shapes split by a diagonal cut; the wordmark is cut by the same angle through the O and Z. Allowed inks: ink, bone, oxide, forest, brass; on taupe use bone-200. Clear space = height of the wordmark's "I" counter-gap; minimum wordmark width 64px.
