# DOZI — Design. Made for you.

The DOZI website: a fashion house that is also a design studio.
**Editorial × Design studio × Fashion.** The site stays neutral, and the clothes bring the colour.

Plain static HTML/CSS/JS. There is no build step.

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Campaign hero, manifesto, a Base → Add → Transform demo, an editorial edit, a full-bleed campaign, key details and colour chapters |
| Shop | `shop.html` | Editorial grid with mixed image scales and campaign breaks. Filters by `#tops`, `#bottoms`, `#outerwear`, `#footwear`, `#bags` and `#hats` |
| Design | `design.html` | **The DOZI Design studio.** Steps: Base → Fit → Colour → Collar → Sleeve → Attachments → Finish. Hover any part of the garment to see *CHANGE THIS*. Click it and the part detaches and a component tray opens. Pick a part and it clicks back in with *YOUR DESIGN HAS CHANGED.* Designs can be added to the bag, saved, or shared as a link |
| Product | `product.html?id=…` | Large photograph on the left. On the right: name, price, material and a *Design it* table. Below that, *How it changes*. The Polo and The Set redraw live as you choose |
| Collections | `collections.html` | Chapters: Modular Corporate, Modular Utility, Footwear, Carry, Hats |
| About | `about.html` | Method (Cut / Overlap / Shift / Reassemble), the leaf mark, the photography standard |

## Structure

```
assets/css/dozi.css    design tokens (bone #F3EFE7, ink #171614, stone #B8AEA0, oxide #8E3426) and all styles
assets/js/garment.js   SVG technical-flat renderer for The Polo / The Set (one state → one drawing)
assets/js/site.js      catalogue, nav/footer, bag, search, saved designs, toast
assets/js/studio.js    the Design studio
assets/img/            campaign photography and product shots cut from the brand boards
```

- **Catalogue and prices** are in `PRODUCTS` in `site.js`. The studio pricing is in `DESIGN_PRICES`. **All prices are placeholders.**
- **Bag and saved designs** live in the browser's `localStorage` until a real commerce backend is wired in. Checkout is a stub.
- **Photography:** the images are placeholders cut from the concept boards. Before launch, replace them with real shoots that meet the standard on the About page: real skin, fabric, hair, hardware and light. File names map one to one, so drop-in replacements are enough.
