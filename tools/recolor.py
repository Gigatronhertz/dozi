import numpy as np, cv2, sys
from PIL import Image
# Recolour navy fabric to a target colour while keeping the real fabric shading.
TARGETS = {  # target fabric colour (sRGB) at the garment's mid-tone
 'navy': None,
 'black': (38, 37, 35), 'oxide': (142, 52, 38), 'burgundy': (107, 31, 38), 'olive': (77, 75, 49),
 'chocolate': (74, 48, 37), 'cream': (228, 218, 196), 'cobalt': (44, 70, 140), 'stone': (184, 174, 160),
}
def fabric_mask(rgb):
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV).astype(np.float32)
    h, s, v = hsv[...,0], hsv[...,1], hsv[...,2]
    lab = cv2.cvtColor(rgb, cv2.COLOR_RGB2LAB).astype(np.float32)
    b = lab[...,2] - 128
    # navy: blue-ish (negative b in Lab) and not bright
    m = np.clip((-b - 6) / 10, 0, 1) * np.clip((200 - v) / 40, 0, 1)
    m = np.maximum(m, np.clip((95 - v) / 35, 0, 1))  # deep shadows carry little blue
    m = cv2.GaussianBlur(m, (0, 0), 1.2)
    return np.clip(m, 0, 1)
def recolor(rgb, target, mask=None):
    if target is None: return rgb
    m = fabric_mask(rgb) if mask is None else mask
    lab = cv2.cvtColor(rgb, cv2.COLOR_RGB2LAB).astype(np.float32)
    t = cv2.cvtColor(np.uint8([[target]]), cv2.COLOR_RGB2LAB).astype(np.float32)[0,0]
    L = lab[...,0]
    sel = m > .6
    mean = L[sel].mean() if sel.any() else 60
    std = L[sel].std() if sel.any() else 10
    # keep shading contrast; lighter targets get a slightly stronger spread so folds still read
    light = t[0] > 150
    if light:  # light fabric: soften the knit noise the navy hides, keep the folds
        Ls = cv2.bilateralFilter(L, 0, 6, 5)
        L = Ls
    spread = min(max(t[0] / max(mean, 1), 0.8), 2.0)
    newL = np.clip(t[0] + (L - mean) * spread, 0, 255)
    out = lab.copy()
    out[...,0] = newL; out[...,1] = t[1]; out[...,2] = t[2]
    # keep a little of the original chroma variation for realism
    out[...,1] += (lab[...,1] - lab[...,1][sel].mean()) * .3
    out[...,2] += (lab[...,2] - lab[...,2][sel].mean()) * .3
    res = cv2.cvtColor(np.clip(out,0,255).astype(np.uint8), cv2.COLOR_LAB2RGB).astype(np.float32)
    m3 = m[...,None]
    return (res * m3 + rgb.astype(np.float32) * (1 - m3)).astype(np.uint8)
if __name__ == '__main__':
    src = np.array(Image.open(sys.argv[1]).convert('RGB'))
    tiles = []
    for k, t in TARGETS.items():
        tiles.append(cv2.resize(recolor(src, t), (281, 351), interpolation=cv2.INTER_AREA))
    Image.fromarray(np.hstack(tiles)).save(sys.argv[2])

def brass_mask(rgb):
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV).astype(np.float32)
    h, s, v = hsv[...,0], hsv[...,1], hsv[...,2]
    m = ((h > 8) & (h < 34)).astype(np.float32) * np.clip((s - 55) / 40, 0, 1) * np.clip((v - 50) / 40, 0, 1)
    return np.clip(cv2.GaussianBlur(m, (0, 0), .8), 0, 1)

def rehardware(rgb, kind):
    """Swap brushed brass for silver or gunmetal, keeping the metal's highlights."""
    if kind == 'brass': return rgb
    m = brass_mask(rgb)[..., None]
    g = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY).astype(np.float32)[..., None]
    if kind == 'silver':
        metal = np.concatenate([g * 1.08 + 18, g * 1.08 + 20, g * 1.10 + 24], axis=2)
    else:  # gunmetal
        metal = np.concatenate([g * .62 + 4, g * .63 + 5, g * .66 + 8], axis=2)
    out = rgb.astype(np.float32) * (1 - m) + np.clip(metal, 0, 255) * m
    return out.astype(np.uint8)
