import sys, os, numpy as np, cv2
from PIL import Image, ImageDraw
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_assets as b
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'img', 'studio', 'mask') + '/'
os.makedirs(OUT, exist_ok=True)
W, H = 1122, 1402
def silhouette(a):
    bg = np.median(a[:40, :40].reshape(-1, 3), axis=0).astype(np.float32)
    m = (np.abs(a.astype(np.float32) - bg).sum(2) > 34).astype(np.uint8)
    m[1250:] = 0  # floor shadow
    n, lab, st, _ = cv2.connectedComponentsWithStats(m)
    m = (lab == 1 + int(np.argmax(st[1:, cv2.CC_STAT_AREA]))).astype(np.uint8)
    cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    m = np.zeros_like(m); cv2.drawContours(m, cs, -1, 1, -1)
    return m
def poly(pts):
    im = Image.new('L', (W, H), 0); ImageDraw.Draw(im).polygon(pts, fill=1); return np.array(im)
def mirror(pts): return [(1126 - x, y) for x, y in pts]
ZONES = {
    'collar-polo': [(392, 128), (732, 128), (742, 250), (705, 345), (612, 305), (512, 305), (420, 345), (382, 250)],
    'collar-crew': [(402, 140), (722, 140), (738, 230), (690, 312), (562, 330), (434, 312), (386, 230)],
}
SL = {'short': [(0, 290), (146, 360), (256, 502), (274, 800), (0, 830)],
      'long': [(0, 290), (146, 360), (256, 502), (266, 800), (250, 1265), (0, 1300)]}
for name, a in b.bases().items():
    collar, sleeve = name.split('-')
    sil = silhouette(a)
    def save(m, k):
        m = cv2.GaussianBlur((m * 255).astype(np.uint8), (0, 0), 1.6)
        al = Image.fromarray(m, 'L').resize((500, round(500 * H / W)), Image.LANCZOS)
        rgba = Image.new('RGBA', al.size, (0, 0, 0, 0)); rgba.putalpha(al); rgba.save(OUT + '%s-%s.png' % (name, k), optimize=True)
    save(sil * poly(ZONES['collar-' + collar]), 'collar')
    save(sil * poly(SL[sleeve]), 'sleeve-l')
    save(sil * poly(mirror(SL[sleeve])), 'sleeve-r')
    print(name)
