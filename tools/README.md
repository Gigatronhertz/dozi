# DOZI image tools

These scripts turn the source renders in `assets/source/` into the images the site uses.

```sh
pip install opencv-contrib-python-headless pillow numpy
mkdir -p tools/models
curl -sSL -o tools/models/EDSR_x2.pb https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x2.pb
curl -sSL -o tools/models/EDSR_x4.pb https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x4.pb

python3 tools/build_assets.py studio     # 96 base photos (4 shapes × 8 colours × 3 hardware) + attachment overlays + swatches
python3 tools/masks.py                   # cut-out masks used when a collar or sleeve lifts off in the studio
python3 tools/build_assets.py parts      # component and detail photos, super-resolved (slow: ~1 min each on CPU)
python3 tools/build_assets.py lookbook   # denim / dress / on-model crops, super-resolved
```

| Script | What it does |
|---|---|
| `recolor.py` | Recolours the navy fabric to another colour while keeping the real folds and knit. Also swaps brass hardware for silver or gunmetal. |
| `build_assets.py` | White-balances everything to the site's bone (#F3EFE7), sharpens gently, builds the studio images, cuts the attachments out of the boards and crops the lineups. |
| `masks.py` | Builds the collar and sleeve masks that let the studio lift a real part off the photograph. |

**Two shapes are composites.** `polo-long` and `crew-short` are made by swapping the collar area between the two real photographs (`polo-navy-polo-short.png` and `polo-navy-crew-long.png`), which share the same framing. Once real photographs of those two combinations exist, drop them into `assets/source/` and point `bases()` at them.
