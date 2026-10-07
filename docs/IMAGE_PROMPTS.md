# DOZI — Image generation prompts

These prompts produce the photography the site needs. The most important set is the **real garment images for the Design Studio**, which replace the SVG drawings.

---

## 0. How to run these (read first)

1. **Paste the Master Style block in front of every prompt.** It keeps lighting, colour and realism the same across the whole set.
2. **Lock the framing.** Generate image `S-01` first. When it looks right, upload it as a **reference image** for every other studio shot and add:
   *"Match the reference image exactly: same camera angle, same distance, same garment scale and position in frame, same lighting, same background. Change only what is described."*
   The studio swaps images in place. If the framing drifts between images, the garment will jump on screen.
3. **Aspect ratios:** studio garments **4:5** (e.g. 1600×2000). Component flat-lays **1:1**. Campaign **3:2 landscape** and **2:3 portrait**. Use the largest size your generator allows.
4. **Use one seed for the whole studio set**, if your tool supports seeds.
5. **Transparent background:** for the component tray (Section 2), ask for a *transparent PNG background* if your tool supports it. Otherwise use plain bone paper and I'll cut them out.
6. **Name each file with the code given** (e.g. `S-polo-navy-round-short.jpg`) so I can drop it straight into the site.
7. Reject any image with waxy skin, fused fingers, warped hardware, melted text or blurry stitching. Regenerate it. The rule is: **no AI-looking images.**

---

## MASTER STYLE (prefix for every prompt)

```
Ultra-realistic high-end fashion photography, shot on a medium-format camera (Hasselblad X2D, 80mm lens, f/8), true-to-life colour, natural fabric texture visible at close range: real cotton weave, real wool twill, visible stitching, believable fabric weight and drape, real creases. Hardware is solid brushed metal with physically correct reflections. Soft directional studio light from the upper left, gentle natural shadows with physical logic. Restrained, quiet, editorial luxury: in the spirit of The Row, Lemaire, Jil Sander and Bottega Veneta lookbooks. No text, no watermark, no logos except the DOZI leaf mark where specified. No CGI look, no plastic sheen, no over-sharpening, no HDR, no AI artefacts.
```

**The DOZI leaf mark** (use this wording wherever the mark appears):
`a small minimalist leaf emblem, a single rounded leaf split diagonally by a thin S-shaped curved cut into two pieces`

**Colour names to use in prompts:**
| Code | Prompt wording |
|---|---|
| navy | deep navy blue (#1F2B4D) |
| oxide | oxide red, a deep brick rust red (#8E3426) |
| burgundy | dark burgundy wine red (#6B1F26) |
| olive | deep olive green (#4D4B31) |
| cream | warm cream ivory (#E4DAC6) |
| black | soft washed black (#1E1D1B) |
| chocolate | dark chocolate brown (#4A3025) |
| cobalt | cobalt blue (#2A4597) |

---

## MODULAR CONSTRUCTION (paste after the Master Style in every garment, product and campaign prompt)

Every DOZI piece is built from parts that detach and reattach. The joins must be **visible but refined**, so a viewer can see that the piece comes apart.

```
The garment is visibly modular, built from separate parts that detach and reattach: clean, precise joins where each part meets the base: a fine tonal zip or a row of small flat brushed-brass snaps stamped with the leaf mark, sitting along the seam line. The joins look intentional and well-engineered, finished like quality tailoring, not costume or techwear gimmick. Each detachable part has a slightly different seam line so the construction can be read at a glance.
```

**Where the joins go on each piece:**
| Piece | Detachable parts and how they attach |
|---|---|
| The Polo | sleeves: tonal zip around each armhole · collar: tonal zip around the neckline base · side panels: zip channel down each side seam · chest: two flat brass snaps for the pocket · right hem: small brass loop for a charm |
| Wide Trouser | strap rail: a thin leather-trimmed rail along the waistband · two brass D-rings at the hips for straps and charms · a zip at each hem for leg extensions or cuffs |
| Jackets | sleeves: zip around each armhole (vest when removed) · hood: zip along the collar · pockets: snap-on, on chest and sleeves · front and back panels: zip-in |
| Tees | side panels: zip channel down each side · sleeves: zip at the shoulder (raglan seam on the Raglan Tee) · pockets: clip-on loops |
| Sweatpant / Cargo Short | cargo pockets: snap-on on the thighs · side panels: zip-in · legs: zip above the knee (converts short ↔ long) · ankle: swappable cuffs |
| Bags | pouches: snap and strap-loop on the sides · front panel: snap-on · strap: brass clips at both ends (backpack ↔ shoulder ↔ crossbody) |
| Sneakers / Boots | side panels: snap-on · heel module: clip-in at the back · tongue: swappable with a pouch version · boot collar and straps: removable |
| Heels | front panel: snap-on · ankle strap: buckle-on · heel module: twist-lock |
| Hats | band: snap-closed and swappable · pin and feather: clip-on · veil: snap-on at the band |

---

## 1. DESIGN STUDIO — the garment (most important)

The studio shows **one real garment** in the centre. Each choice (colour, collar, sleeve) swaps the photograph for the matching version.

### S-01 · The base image (generate this first, then use it as the reference)

```
[MASTER STYLE] Ghost-mannequin (invisible mannequin) product photograph of an oversized heavyweight cotton polo-style T-shirt in deep navy blue (#1F2B4D), front view, perfectly centred and symmetrical, shoulders level, dropped shoulder seam, boxy relaxed fit, hem straight, short sleeves ending above the elbow, round crew neck with a 2cm ribbed collar band. The garment is visibly modular: each sleeve attaches with a fine tonal zip that runs all the way around the armhole, the collar attaches with a fine tonal zip around the base of the neckline, a thin tonal zip channel runs down each side seam for zip-in panels, two small flat brushed-brass snaps stamped with the leaf mark sit on the left chest for a snap-on pocket, and a small brass loop at the right hem holds a charm. The joins are clean and precise, finished like quality tailoring. A small tonal embroidered DOZI leaf mark on the centre chest [leaf mark wording]. Hollow neck opening showing the inside back collar and the woven label. The garment fills 70% of the frame height with even margins. Plain seamless warm bone-white paper background (#F3EFE7), soft floor shadow. 4:5 vertical.
```
File: `S-polo-navy-round-short.jpg`

### S-02 · Collar variants (same reference, change only the collar)

| File | Replace the collar description with |
|---|---|
| `S-polo-navy-round-short.jpg` | round crew neck with a 2cm ribbed band *(the base, S-01)* |
| `S-polo-navy-polo-short.jpg` | a classic two-button polo collar with flat knitted collar points lying neatly, a short button placket with two tonal horn buttons |
| `S-polo-navy-mock-short.jpg` | a 4cm ribbed mock-neck stand collar that rises around the neck |

### S-03 · Sleeve variants (same reference, change only the sleeves)

| File | Sleeve description |
|---|---|
| `…-short.jpg` | short sleeves ending above the elbow *(base)* |
| `…-long.jpg` | long sleeves with ribbed cuffs, the sleeves hanging naturally down the sides |
| `…-raglan.jpg` | short raglan sleeves in a contrasting oxide red (#8E3426), the raglan seam running diagonally from neck to underarm with a visible tonal zip along the seam |

Repeat each collar × sleeve combination for each colour you want to offer. Name them `S-polo-{colour}-{collar}-{sleeve}.jpg`.

**How many images:**
| Tier | Colours | Images |
|---|---|---|
| Launch (recommended) | navy, oxide, cream, black | 4 × 3 collars × 3 sleeves = **36** |
| Minimum to test the idea | navy only | **9** |
| Full | all 8 colours | **72** |

### S-04 · Fit variants (navy, round neck, short sleeve only)

- `S-polo-navy-fit-regular.jpg`: *"…regular fit, sleeves ending mid-bicep, hem at the hip, shoulder seam on the shoulder."*
- `S-polo-navy-fit-oversized.jpg`: the base, S-01.
- `S-polo-navy-fit-cropped.jpg`: *"…cropped boxy fit, hem ending at the waist, width unchanged."*

### S-05 · The Set: wide trouser (same camera and scale as the polo, so it can sit underneath it)

```
[MASTER STYLE] Ghost-mannequin product photograph of high-waisted, double-pleated wide-leg trousers in deep navy blue (#1F2B4D) wool-cotton twill, front view, perfectly centred, full length from waistband to hem, legs falling straight and very wide with a sharp front crease, slightly pooling at the hem. A dark brown leather belt with a brushed brass square buckle threaded through wide belt loops. A thin hidden strap rail along the waistband. Same lighting, background and camera distance as the reference image. The waistband sits at the top 10% of the frame. Plain seamless warm bone-white paper background (#F3EFE7). 4:5 vertical.
```
Files: `S-trouser-{colour}.jpg`, one per colour.

### S-06 · The polo with attachments (worn on the garment, same reference)

Use the navy, round-neck, short-sleeve base and add one attachment each:

| File | Add to the prompt |
|---|---|
| `S-polo-navy-att-strap.jpg` | a dark brown leather strap worn diagonally across the chest from the left shoulder to the right hip, with a brushed-brass square buckle halfway and contrast stitching |
| `S-polo-navy-att-pocket.jpg` | a detachable utility pocket snapped onto the left chest: a rectangular navy canvas pocket with a flap and a brushed-brass DOZI snap |
| `S-polo-navy-att-panel.jpg` | contrast oxide-red side panels zipped into both side seams, from the underarm to the hem |
| `S-polo-navy-att-charm.jpg` | a small brushed-brass DOZI leaf charm on a short chain, hanging from the right hem |
| `S-polo-navy-att-all.jpg` | all four of the above together |

---

## 2. DESIGN STUDIO — the component tray (one part per image)

These appear in the tray that slides up when you click "CHANGE THIS".

```
[MASTER STYLE] Overhead flat-lay product photograph of a single detachable garment component, perfectly centred, shot straight down, laid neatly on a plain warm bone-white paper background (#F3EFE7) [or: transparent background], soft even light, subtle contact shadow, 1:1 square. The component: ______.
```

| File | Component |
|---|---|
| `C-collar-round.jpg` | a detachable navy ribbed crew-neck collar band, shown as a ring with a thin zip along its base |
| `C-collar-polo.jpg` | a detachable navy knitted polo collar with a two-button placket strip |
| `C-collar-mock.jpg` | a detachable navy ribbed mock-neck collar |
| `C-sleeve-short.jpg` | a pair of detachable navy short sleeves, laid side by side, with a zip along each shoulder edge |
| `C-sleeve-long.jpg` | a pair of detachable navy long sleeves with ribbed cuffs |
| `C-sleeve-raglan.jpg` | a pair of detachable oxide-red raglan sleeves |
| `C-att-strap.jpg` | a dark brown leather strap coiled loosely, with a brushed-brass square buckle and two DOZI snap ends |
| `C-att-pocket.jpg` | a detachable navy canvas utility pocket with a flap and a brass DOZI snap |
| `C-att-panel.jpg` | two oxide-red zip-in side panels |
| `C-att-charm.jpg` | a brushed-brass DOZI leaf charm on a short chain with a lobster clasp |
| `C-hw-brass.jpg` / `C-hw-gunmetal.jpg` / `C-hw-silver.jpg` | a set of DOZI hardware: one round snap stamped with the leaf mark, one zip pull, one square buckle, in brushed brass / gunmetal / brushed silver |
| `C-mark-woven.jpg` / `C-mark-tonal.jpg` | a small woven DOZI leaf label in cream thread on navy / in tonal navy thread on navy |

Colour swatches in the studio don't need images. I'll render those.

---

## 3. HOMEPAGE & CAMPAIGN (people)

In every campaign shot, at least one modular detail must be clearly visible: a zip-on sleeve in a contrast colour, a snap-on pocket, a strap clipped to a D-ring, a charm on its loop. The clothes should read as *built from parts* at a glance.

Add this realism block to every prompt with a model:
```
Real person, not a model-agency stereotype: natural skin with visible pores and texture, natural hair with flyaways, real hands with correct anatomy, relaxed, unposed expression. Natural late-afternoon sunlight, long soft shadows, architecture of pale stone and concrete columns. Shot on 35mm film-look medium format, subtle grain, no retouching gloss.
```

| File | Ratio | Prompt |
|---|---|---|
| `H-hero-navy-polo.jpg` | 3:2 landscape **and** 2:3 portrait | A Black man in his late twenties with short coily hair and a trimmed goatee walking towards the camera across a polished stone plaza. He wears the DOZI oversized navy polo (round neck) tucked into high-waisted navy pleated wide-leg trousers, a dark brown leather belt with a brass buckle, burgundy leather loafers, and a brown leather shoulder bag. Full body, camera at hip height, a lot of negative space on the left for typography. |
| `H-campaign-oxide.jpg` | 3:2 landscape | Two people, a man and a woman, standing apart before monumental stone columns. He wears an oxide-red oversized blazer, white shirt, oxide-red tie and wide trousers. She wears a cream oversized shirt with oxide-red high-waisted wide trousers and carries a structured oxide leather bag. Low camera angle, full body, a lot of sky and stone above. |
| `H-campaign-burgundy.jpg` | 3:2 landscape | The same two people in matching dark burgundy oversized suits with wide pleated trousers, white shirts, a burgundy tie on him, a burgundy leather tote in her hand. |
| `H-campaign-olive.jpg` | 2:3 portrait | A man in a deep olive modular utility jacket with detachable sleeves and chest pockets, olive wide cargo trousers, against raw concrete. |
| `H-campaign-cream.jpg` | 2:3 portrait | A woman in a cream oversized polo with a mock neck and cream wide trousers, a brown leather strap worn diagonally across the chest with a brass buckle, a brass DOZI leaf charm at her belt. |
| `H-studio-hands.jpg` | 3:2 | Close-up of real hands unzipping a navy sleeve from the shoulder of a DOZI polo laid on a bone-coloured table. Shallow depth of field, the brass zip pull with the leaf mark in focus. (For the "How it changes" section.) |

---

## 4. KEY DETAILS (macro, 1:1)

```
[MASTER STYLE] Extreme macro close-up, shallow depth of field, ______. 1:1 square.
```
`D-snap.jpg`: a brushed-brass round snap with the DOZI leaf mark debossed, on navy cotton twill
`D-zip.jpg`: a brushed-brass DOZI zip pull, a small rectangular tag with the leaf mark cut out, on a black zip
`D-label.jpg`: a woven cream DOZI leaf label stitched onto black twill
`D-buckle.jpg`: a brushed-brass square buckle on a dark brown leather strap with contrast stitching
`D-charm.jpg`: a brass DOZI leaf charm hanging from a trouser belt loop
`D-hangtag.jpg`: a kraft-paper hang tag with the DOZI leaf and the words "MADE BY US. MADE YOURS." in small spaced capitals

---

## 5. SHOP — product pages (ghost mannequin, 4:5, bone background)

Use the S-01 style (ghost mannequin, centred, bone background) plus the **Modular Construction** block for each item. Describe its parts using the table under Modular Construction. For example:

```
[MASTER STYLE] [MODULAR CONSTRUCTION] Ghost-mannequin product photograph of the DOZI Core Jacket in soft washed black waxed cotton, front view, centred. The sleeves attach with fine zips around each armhole, one sleeve shown partly unzipped to reveal the join. The hood is zipped onto the collar. Two snap-on chest pockets with brushed-brass leaf snaps, one sleeve pocket. Plain seamless warm bone-white paper background (#F3EFE7). 4:5 vertical.
```

Items: `P-core-jacket`, `P-cropped-jacket`, `P-core-tee`, `P-raglan-tee`, `P-sweatpant`, `P-cargo-short`, `P-wide-trouser-chocolate`, `P-backpack`, `P-crossbody`, `P-core-sneaker` (3/4 side view), `P-boot`, `P-heel`, `P-fedora`.

**Show one part partly detached** (a sleeve half-unzipped, a pocket lifted off its snaps, a strap unclipped) in each `P-` image. Only the product shots do this; the studio images stay fully assembled so they swap cleanly.

For each one, also make **one on-model shot** (`L-…`, 2:3 portrait) using the realism block in Section 3. These fill the large tiles in the shop's editorial grid.

---

## Delivery checklist

- [ ] S-01 approved first; everything in Sections 1–2 generated using it as the reference
- [ ] Files named with the codes above
- [ ] Largest resolution available (at least 1600px on the long side)
- [ ] Send them in a zip, or commit them to `assets/img/source/`. I'll handle the crop, colour-match, retouch, compression and WebP export.
