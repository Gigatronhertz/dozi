# DOZI — Design. Made for you.

The DOZI website, built on the DOZI design system (`ds/`): the site is cut from denim, joined by zips and finished with topstitching, rivets and a leather patch. Only garment photography is used, with no people.

```sh
npm install        # esbuild + React (for the vendored build)
npm run build      # compiles ds/components + src/ into dist/app.js
python3 -m http.server 8000
```

`dist/app.js` and `vendor/` are committed, so the site deploys as static files with no build step on the host.

| Path | What it is |
|---|---|
| `index.html` | The single-page site. Routes: `#/`, `#/shop[/Category]`, `#/product/<id>`, `#/studio[/<design>]`, `#/chapters` |
| `ds/` | DOZI design system: tokens, components, logo, guidelines |
| `src/` | Site screens: Home, Shop, Product, Studio, Bag drawer, plus data and routing |
| `assets/js/systems.js` | Every photographed piece and its versions (prices are placeholders) |
| `assets/js/look.js` | The Polo, composited from real photographs and attachments |
| `assets/img/` | Studio photographs, version images, details |
| `tools/` | Image pipeline (cutting lineups, recolouring, upscaling) |
| `docs/IMAGE_PROMPTS.md` | Prompts and checklist for the remaining photography |

The old page URLs (`shop.html`, `design.html`, `product.html?id=…`, `collections.html`, `about.html`) redirect into the new routes.
