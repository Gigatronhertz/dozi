"""Build DOZI image assets from the source renders/boards.
Usage: python3 build_assets.py studio|parts|lookbook"""
import sys, os, json, numpy as np, cv2
from PIL import Image, ImageDraw, ImageFilter
sys.path.insert(0, os.path.dirname(__file__))
import recolor as rc

HERE = os.path.dirname(os.path.abspath(__file__))
U = os.path.join(HERE, '..', 'assets', 'source') + '/'
OUT = os.path.join(HERE, '..', 'assets', 'img') + '/'
BONE = np.array([243, 239, 231], np.float32)
COLORS = {k: v for k, v in rc.TARGETS.items() if k != 'stone'}
HW = ['brass', 'silver', 'gunmetal']

def load(f): return np.array(Image.open(U + f).convert('RGB'))
def save_jpg(a, path, w=None, q=84):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im = Image.fromarray(a)
    if w and im.width != w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    im.save(path, quality=q, optimize=True, progressive=True)
def save_png(rgba, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    rgba = rgba.copy(); rgba[rgba[..., 3] == 0, :3] = 0  # empty pixels compress to nothing
    Image.fromarray(rgba, 'RGBA').save(path, optimize=True)

def white_balance(a, bg_box=(0, 0, 60, 60)):
    x0, y0, x1, y1 = bg_box
    bg = np.median(a[y0:y1, x0:x1].reshape(-1, 3), axis=0).astype(np.float32)
    return np.clip(a.astype(np.float32) * (BONE / bg), 0, 255).astype(np.uint8)

def enhance(a, amount=.35, radius=1.2):
    """Gentle unsharp mask: crisper knit and stitching without halos."""
    f = a.astype(np.float32)
    blur = cv2.GaussianBlur(f, (0, 0), radius)
    return np.clip(f + (f - blur) * amount, 0, 255).astype(np.uint8)

_sr = {}
def upscale(a, f=2):
    if f not in _sr:
        s = cv2.dnn_superres.DnnSuperResImpl_create()
        s.readModel(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'models', 'EDSR_x%d.pb' % f)); s.setModel('edsr', f)
        _sr[f] = s
    return cv2.cvtColor(_sr[f].upsample(cv2.cvtColor(a, cv2.COLOR_RGB2BGR)), cv2.COLOR_BGR2RGB)

def cutout_solid(a, thresh=30):
    """Alpha for a solid object: the largest region that differs from the background, holes filled."""
    border = np.concatenate([a[:3].reshape(-1, 3), a[-3:].reshape(-1, 3), a[:, :3].reshape(-1, 3), a[:, -3:].reshape(-1, 3)])
    bg = np.median(border, axis=0).astype(np.float32)
    m = (np.abs(a.astype(np.float32) - bg).sum(2) > thresh).astype(np.uint8)
    n, lab, stats, _ = cv2.connectedComponentsWithStats(m)
    keep = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    m = (lab == keep).astype(np.uint8)
    cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    m = np.zeros_like(m); cv2.drawContours(m, cs, -1, 1, -1)
    m = cv2.erode(m, np.ones((3, 3), np.uint8))
    al = cv2.GaussianBlur(m.astype(np.float32), (0, 0), .8)
    return np.dstack([a, (al * 255).astype(np.uint8)])

def cutout(a, thresh=16, soft=24):
    """Alpha from distance to the (light, flat) board background."""
    border = np.concatenate([a[:3].reshape(-1, 3), a[-3:].reshape(-1, 3), a[:, :3].reshape(-1, 3), a[:, -3:].reshape(-1, 3)])
    bg = np.median(border, axis=0).astype(np.float32)
    d = np.abs(a.astype(np.float32) - bg).sum(2)
    al = np.clip((d - thresh) / soft, 0, 1)
    al = cv2.morphologyEx(al, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    al = cv2.GaussianBlur(al, (0, 0), .7)
    return np.dstack([a, (al * 255).astype(np.uint8)])

# ---------------------------------------------------------------- studio
BODY = {'short': 'polo-navy-polo-short.png', 'long': 'polo-navy-crew-long.png'}  # polo-short, crew-long
OV = {}  # overlay manifest: name -> [left, top, width, height] in base pixels (1122x1402)
BASE_W, BASE_H = 1122, 1402

def collar_mask():
    m = Image.new('L', (BASE_W, BASE_H), 0)
    ImageDraw.Draw(m).rounded_rectangle((372, 100, 752, 600), radius=90, fill=255)
    return np.array(m.filter(ImageFilter.GaussianBlur(22)), np.float32)[..., None] / 255

def bases():
    polo, crew = load(BODY['short']), load(BODY['long'])
    m = collar_mask()
    mix = lambda a, b: (a * m + b * (1 - m)).astype(np.uint8)
    return {'polo-short': polo, 'crew-long': crew, 'polo-long': mix(polo, crew), 'crew-short': mix(crew, polo)}

PANEL_POLYS = [[(284, 770), (293, 770), (328, 1206), (262, 1204), (255, 1088)], [(842, 770), (833, 770), (798, 1206), (864, 1204), (871, 1088)]]
def panel_color(c): return 'navy' if c in ('oxide', 'burgundy', 'chocolate', 'olive', 'cobalt') else 'oxide'

def studio():
    bs = {} if os.environ.get('SKIP_BASES') else bases()
    for name, a in bs.items():
        a = white_balance(a)
        for hw in HW:
            ah = rc.rehardware(a, hw)
            for c, t in COLORS.items():
                out = enhance(rc.recolor(ah, t))
                save_jpg(out, OUT + 'studio/base/%s-%s-%s.jpg' % (name, c, hw), w=1000)
        print('base', name, flush=True)
    # side panels: the body's own fabric, recoloured inside the panel shape (shading stays real)
    m = Image.new('L', (BASE_W, BASE_H), 0); d = ImageDraw.Draw(m)
    for p in PANEL_POLYS: d.polygon(p, fill=255)
    pm = np.array(m.filter(ImageFilter.GaussianBlur(1.6)), np.float32) / 255
    x0, y0, x1, y1 = 250, 765, 875, 1210
    OV['panel'] = [x0, y0, x1 - x0, y1 - y0]
    for body in ('short', 'long'):
        a = white_balance(load(BODY[body]))
        fab = rc.fabric_mask(a)
        for c in COLORS:
            pc = rc.recolor(a, COLORS[panel_color(c)], mask=np.clip(fab * pm, 0, 1) if True else None)
            alpha = (np.clip(fab * pm * 1.4, 0, 1) * 255).astype(np.uint8)
            rgba = np.dstack([enhance(pc), alpha])[y0:y1, x0:x1]
            save_png(rgba, OUT + 'studio/overlay/panel-%s-%s.png' % (body, c))
    # utility pocket (board 2) recoloured to match the body
    pocket = load('board-polo-system-b.png')[540:722, 674:830]
    pk = cutout_solid(pocket, thresh=150)
    ys, xs = np.where(pk[..., 3] > 8); pk = pk[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    for hw in HW:
        ph = rc.rehardware(pk[..., :3], hw)
        for c, t in COLORS.items():
            save_png(np.dstack([enhance(rc.recolor(ph, t)), pk[..., 3]]), OUT + 'studio/overlay/pocket-%s-%s.png' % (c, hw))
    OV['pocket'] = [705, 408, 154, round(154 * pk.shape[0] / pk.shape[1])]
    # leaf charm (board 1) and hem strap (board 1, flipped so the hook clips to the hem D-ring)
    charm = cutout(load('board-polo-system-a.png')[812:972, 762:818], thresh=20)
    strap = cutout(load('board-polo-system-a.png')[812:978, 516:618][::-1].copy(), thresh=20)
    for hw in HW:
        save_png(np.dstack([rc.rehardware(charm[..., :3], hw), charm[..., 3]]), OUT + 'studio/overlay/charm-%s.png' % hw)
        save_png(np.dstack([rc.rehardware(strap[..., :3], hw), strap[..., 3]]), OUT + 'studio/overlay/strap-%s.png' % hw)
    OV['charm'] = [818 - 27, 1146, 56, 160]
    OV['strap'] = [818 - 22, 1146, 102, 166]
    json.dump({'size': [BASE_W, BASE_H], 'overlays': OV}, open(OUT + 'studio/overlays.json', 'w'))
    # real fabric swatches for the colour picker
    for c, t in COLORS.items():
        a = rc.recolor(white_balance(load(BODY['short'])), t)[640:760, 470:590]
        save_jpg(enhance(a, .5), OUT + 'studio/swatch/%s.jpg' % c, q=86)
    print('studio done', flush=True)

# ---------------------------------------------------------------- tray parts and details (super-resolved)
B1, B2 = 'board-polo-system-a.png', 'board-polo-system-b.png'
PARTS = {
    'collar-crew': (B2, (832, 72, 1012, 196)), 'collar-polo': (B2, (1014, 56, 1206, 194)),
    'collar-mock': (B2, (832, 238, 1012, 396)), 'collar-detached': (B2, (1020, 232, 1206, 396)),
    'sleeve-short': (B2, (12, 540, 142, 714)), 'sleeve-long': (B2, (142, 538, 264, 714)), 'sleeve-raglan': (B2, (270, 530, 404, 714)),
    'att-pocket': (B2, (684, 550, 820, 714)), 'att-pouch': (B2, (834, 550, 922, 714)), 'att-panel': (B1, (800, 545, 862, 748)),
    'att-charm': (B1, (762, 812, 818, 972)), 'att-strap': (B1, (516, 812, 618, 978)),
    'detail-sleeve-zip': (B2, (416, 547, 526, 712)), 'detail-snap': (B2, (533, 547, 636, 712)),
    'detail-charm-loop': (B2, (882, 815, 998, 976)), 'detail-leaf-charm': (B2, (1005, 815, 1105, 976)),
    'detail-strap-hook': (B2, (1111, 815, 1203, 976)), 'detail-mark': (B2, (762, 1060, 908, 1212)),
    'detail-zip-pull': (B2, (913, 1060, 1010, 1212)), 'detail-zip-track': (B2, (1115, 1060, 1200, 1212)),
    'detail-side-zip': (B2, (300, 803, 420, 983)), 'detail-contrast-panel': (B2, (182, 803, 288, 983)),
    'back': (B1, (512, 36, 832, 484)),
    'torso-standard': (B2, (458, 798, 582, 987)), 'torso-zip-off': (B2, (596, 798, 718, 987)), 'torso-contrast': (B2, (730, 798, 854, 987)),
    'example-base': (B2, (22, 1056, 166, 1224)), 'example-pocket': (B2, (162, 1056, 302, 1224)), 'example-panels': (B2, (298, 1056, 437, 1224)),
    'example-strap': (B2, (433, 1056, 572, 1224)), 'example-long': (B2, (563, 1056, 714, 1224)),
}
def parts(names=None):
    for k, (f, box) in PARTS.items():
        if names and k not in names: continue
        a = load(f)[box[1]:box[3], box[0]:box[2]]
        a = upscale(a, 4 if max(a.shape[:2]) < 260 else 2)
        if k == 'detail-snap':  # hardware finish swatches
            for hw in HW: save_jpg(enhance(rc.rehardware(a, hw), .25), OUT + 'studio/parts/hw-%s.jpg' % hw, q=86)
        save_jpg(enhance(a, .25), OUT + 'studio/parts/%s.jpg' % k, q=86)
        print('part', k, flush=True)

# ---------------------------------------------------------------- lookbook
LOOK = {
    'suit': ('lineup-denim-tailoring.jpg', [(17, 270), (286, 541), (557, 821), (838, 1090), (1109, 1364)], (50, 718)),
    'denim': ('lineup-denim-oversized.jpg', [(8, 289), (289, 560), (560, 823), (823, 1093), (1093, 1370)], (20, 750)),
    'dress': ('lineup-navy-dresses.jpg', [(22, 290), (305, 562), (562, 830), (845, 1095), (1112, 1376)], (22, 732)),
    'polo-model': ('board-polo-on-model.jpg', [(25, 272), (289, 544), (562, 816), (834, 1088), (1106, 1352)], (118, 746)),
}
LINEUPS = {'bags': 'lineup-denim-bags.jpg', 'denim-dresses': 'lineup-denim-dresses.jpg', 'denim-tailoring': 'lineup-denim-tailoring.jpg', 'denim-oversized': 'lineup-denim-oversized.jpg', 'navy-dresses': 'lineup-navy-dresses.jpg'}
def lookbook():
    for k, f in LINEUPS.items():
        a = enhance(white_balance(load(f), (0, 0, 40, 40)) if k != 'polo-model' else load(f), .3)
        save_jpg(a, OUT + 'lookbook/lineup-%s.jpg' % k, q=86)
    for k, (f, cols, (y0, y1)) in LOOK.items():
        src = load(f)
        if k != 'polo-model': src = white_balance(src, (0, 0, 40, 40))
        for i, (x0, x1) in enumerate(cols):
            a = upscale(src[y0:y1, x0:x1], 2)
            save_jpg(enhance(a, .3), OUT + 'lookbook/%s-%02d.jpg' % (k, i + 1), q=86)
            print('look', k, i + 1, flush=True)

if __name__ == '__main__':
    {'studio': studio, 'parts': lambda: parts(sys.argv[2:] or None), 'lookbook': lookbook}[sys.argv[1]]()
