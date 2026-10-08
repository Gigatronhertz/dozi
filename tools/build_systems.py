"""Cut the DOZI lineups into studio images: one consistently framed photograph per version.

Every image of one lineup shares a scale and a floor line, so swapping versions in the
studio never makes the garment jump. Output: assets/img/systems/{system}-{colour}-{n}.jpg

    python3 tools/build_systems.py          # fast (Lanczos)
    SR=1 python3 tools/build_systems.py     # super-resolved (slow, needs tools/models)
"""
import os, sys, json, numpy as np, cv2
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'assets', 'source') + '/'
OUT = os.path.join(HERE, '..', 'assets', 'img', 'systems') + '/'
BONE = np.array([243, 239, 231], np.float32)
CW, CH = 1000, 1250          # canvas, 4:5
FLOOR = 0.94                 # floor line as a share of canvas height
FILL = 0.86                  # tallest item fills this share of the canvas

# system -> colour -> (source file, region [x0, y0, x1, y1] or None, number of pieces)
LINEUPS = {
    'jacket':        {'olive':    ('board-jacket-system.webp',      (548, 40, 1505, 282), 5)},
    'tee':           {'mixed':    ('board-tee-system.webp',         (540, 50, 1536, 268), 5)},
    'baggy-trouser': {'navy':     ('lineup-navy-baggy-trousers.jpg', None, 5)},
    'set-trouser':   {'navy':     ('board-set-trouser-system.webp', (18, 772, 905, 975), 7)},
    'dress':         {'navy':     ('lineup-navy-dresses.jpg', None, 5),
                      'burgundy': ('lineup-burgundy-dresses.jpg', None, 5),
                      'denim':    ('lineup-denim-dresses.jpg', None, 5)},
    'zip-dress':     {'navy':     ('lineup-navy-zip-dresses.jpg', None, 5)},
    'two-piece':     {'burgundy': ('lineup-burgundy-two-piece.jpg', None, 5)},
    'heel':          {'navy':     ('lineup-navy-heels.jpg', None, 5)},
    'sneaker':       {'navy':     ('lineup-navy-sneakers.jpg', None, 5)},
    'bag':           {'indigo':   ('lineup-denim-bags.jpg', None, 5)},
    'suit':          {'indigo':   ('lineup-denim-tailoring.jpg', None, 5)},
    'denim-coat':    {'indigo':   ('lineup-denim-oversized.jpg', None, 5)},
}

# fixed cut lines (inside the region) where pieces sit too close for automatic splitting
CUTS = {'jacket': [0, 187, 372, 562, 752, 957], 'tee': [0, 202, 397, 592, 790, 996]}
# board text to paint out (region coordinates)
BLANK = {'jacket': [(890, 0, 957, 50)]}
# footwear: each piece scaled on its own, so a pump is not lost next to a knee boot
INDEPENDENT = {'heel': .5, 'sneaker': .5}

def load(f):
    return np.array(Image.open(SRC + f).convert('RGB'))

def white_balance(a):
    border = np.concatenate([a[:6].reshape(-1, 3), a[:, :6].reshape(-1, 3), a[:, -6:].reshape(-1, 3)])
    bg = np.median(border, axis=0).astype(np.float32)
    return np.clip(a.astype(np.float32) * (BONE / bg), 0, 255).astype(np.uint8)

def foreground(a, thresh=48):
    d = np.abs(a.astype(np.float32) - BONE).sum(2)
    m = (d > thresh).astype(np.uint8)
    return cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))

def split(m, n):
    occ = cv2.GaussianBlur(m.sum(0).astype(np.float32)[None], (0, 0), 3)[0]
    xs = np.where(occ > 1)[0]
    x0, x1 = xs.min(), xs.max()
    pitch = (x1 - x0) / n
    cuts = [0]
    for i in range(1, n):
        c = int(x0 + pitch * i); w = int(pitch * .38)
        cuts.append(c - w + int(np.argmin(occ[c - w:c + w])))
    cuts.append(m.shape[1])
    return cuts

_sr = {}
def upscale(a, f):
    if f not in _sr:
        s = cv2.dnn_superres.DnnSuperResImpl_create()
        s.readModel(os.path.join(HERE, 'models', 'EDSR_x%d.pb' % f)); s.setModel('edsr', f)
        _sr[f] = s
    return cv2.cvtColor(_sr[f].upsample(cv2.cvtColor(a, cv2.COLOR_RGB2BGR)), cv2.COLOR_BGR2RGB)

def sharpen(a, amt=.3):
    f = a.astype(np.float32)
    return np.clip(f + (f - cv2.GaussianBlur(f, (0, 0), 1.1)) * amt, 0, 255).astype(np.uint8)

def build(system, colour, src, region, n, use_sr):
    a = load(src)
    if region:
        x0, y0, x1, y1 = region
        a = a[y0:y1, x0:x1]
    a = white_balance(a)
    for (bx0, by0, bx1, by1) in BLANK.get(system, []):
        a[by0:by1, bx0:bx1] = BONE.astype(np.uint8)
    m = foreground(a)
    m[:4] = 0; m[-2:] = 0
    cuts = CUTS.get(system) or split(m, n)
    pieces = []
    for i in range(n):
        sl = m[:, cuts[i]:cuts[i + 1]]
        # keep only the main piece in this slice: neighbours that spill in are dropped
        blob = cv2.dilate(sl, np.ones((9, 9), np.uint8))
        n_, lab, st, _ = cv2.connectedComponentsWithStats(blob)
        if n_ > 1:
            big = 1 + int(np.argmax(st[1:, cv2.CC_STAT_AREA]))
            keep = (lab == big) | ((st[lab, cv2.CC_STAT_AREA] > st[big, cv2.CC_STAT_AREA] * .25) & (lab > 0) & (np.abs(st[lab, cv2.CC_STAT_LEFT] + st[lab, cv2.CC_STAT_WIDTH] / 2 - sl.shape[1] / 2) < sl.shape[1] * .3))
            stray = (blob > 0) & ~keep
            if stray.any():
                ax = a[:, cuts[i]:cuts[i + 1]]
                ax[cv2.dilate(stray.astype(np.uint8), np.ones((7, 7), np.uint8)) > 0] = BONE.astype(np.uint8)
            sl = (sl * keep).astype(np.uint8)
        ys, xs = np.where(sl > 0)
        # drop thin specks: keep the rows/cols with real mass
        bx0, bx1 = cuts[i] + xs.min(), cuts[i] + xs.max() + 1
        by0, by1 = ys.min(), ys.max() + 1
        pieces.append((bx0, by0, bx1, by1, cuts[i], cuts[i + 1]))
    maxh = max(p[3] - p[1] for p in pieces); maxw = max(p[2] - p[0] for p in pieces)
    s = min(FILL * CH / maxh, .9 * CW / maxw)
    meta = []
    for i, (bx0, by0, bx1, by1, c0, c1) in enumerate(pieces):
        # every piece is centred and fills its frame, so it reads clearly in cards and the studio
        s = min(.84 * CH / (by1 - by0), .84 * CW / (bx1 - bx0))
        # generous crop around the piece, inside its own slice, so shadows come along
        mx = int((bx1 - bx0) * .12) + 6; my = int((by1 - by0) * .06) + 6
        cx0, cx1 = max(c0, bx0 - mx), min(c1, bx1 + mx)
        cy0, cy1 = max(0, by0 - my), min(a.shape[0], by1 + my + 10)
        crop = a[cy0:cy1, cx0:cx1]
        tw, th = max(1, round(crop.shape[1] * s)), max(1, round(crop.shape[0] * s))
        if use_sr:
            f = 4 if s > 2.4 else 2
            crop = upscale(crop, f)
        im = Image.fromarray(crop).resize((tw, th), Image.LANCZOS)
        crop = sharpen(np.array(im), .25 if use_sr else .35)
        # feathered paste onto bone, bottom on the floor line, centred on the piece
        al = np.ones(crop.shape[:2], np.float32)
        fe = max(8, int(min(tw, th) * .06))
        ramp = lambda L: np.clip(np.minimum(np.arange(L), np.arange(L)[::-1]) / fe, 0, 1)
        al = np.outer(ramp(th), ramp(tw))
        canvas = np.tile(BONE, (CH, CW, 1))
        px = round(CW / 2 - ((bx0 + bx1) / 2 - cx0) * s)
        py = round(CH / 2 - ((by0 + by1) / 2 - cy0) * s)
        X0, Y0 = max(0, px), max(0, py)
        X1, Y1 = min(CW, px + tw), min(CH, py + th)
        sub = crop[Y0 - py:Y1 - py, X0 - px:X1 - px].astype(np.float32)
        sa = al[Y0 - py:Y1 - py, X0 - px:X1 - px][..., None]
        canvas[Y0:Y1, X0:X1] = sub * sa + canvas[Y0:Y1, X0:X1] * (1 - sa)
        out = OUT + '%s-%s-%d.jpg' % (system, colour, i + 1)
        Image.fromarray(canvas.astype(np.uint8)).save(out, quality=86, optimize=True, progressive=True)
        meta.append(out)
        print(os.path.basename(out), flush=True)
    return meta

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    only = sys.argv[1:]
    use_sr = bool(os.environ.get('SR'))
    for system, cols in LINEUPS.items():
        if only and system not in only: continue
        for colour, (src, region, n) in cols.items():
            build(system, colour, src, region, n, use_sr)
