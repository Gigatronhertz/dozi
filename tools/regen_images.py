"""Regenerate DOZI garment photos at high resolution with OpenAI's image model.

Each current crop is sent as a reference; the model remakes exactly that garment as a sharp
ghost-mannequin packshot on bone. Results go to assets/img/regen/ for review first.

    OPENAI_API_KEY=... python3 tools/regen_images.py              # the 10-image test set
    OPENAI_API_KEY=... python3 tools/regen_images.py heel-navy-3  # specific files
Then, after checking them:  python3 tools/regen_images.py --apply
"""
import os, sys, json, base64, urllib.request, uuid, shutil
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SYS = os.path.join(HERE, '..', 'assets', 'img', 'systems')
OUT = os.path.join(HERE, '..', 'assets', 'img', 'regen')
BONE = (243, 239, 231)

TEST_SET = ['jacket-olive-1', 'jacket-olive-5', 'tee-mixed-4', 'baggy-trouser-navy-2', 'set-trouser-navy-1',
            'dress-burgundy-2', 'heel-navy-3', 'sneaker-navy-1', 'bag-indigo-1', 'suit-indigo-4']

PROMPT = ("Recreate exactly the garment shown in the reference image as an ultra-realistic, high-end ghost-mannequin "
          "product photograph. Keep the identical design, cut, colour, fabric, every zip, snap, strap, pocket and brass "
          "hardware detail and their positions. Real fabric texture and weave visible, crisp stitching, believable drape, "
          "physically correct metal reflections. Front three-quarter or straight front view as in the reference, perfectly "
          "centred, filling about 85% of the frame, with even margins. Plain seamless warm bone-white background (#F3EFE7), "
          "soft directional studio light, gentle natural floor shadow. Shot on a medium-format camera, sharp focus throughout. "
          "Only this one item: no other garments, no people, no mannequin visible, no text, no logos except the existing DOZI leaf mark.")


def call(name, key):
    src = os.path.join(SYS, name + '.jpg')
    png = Image.open(src).convert('RGB')
    tmp = os.path.join(OUT, '_ref.png'); png.save(tmp)
    b = uuid.uuid4().hex
    fields = {'model': 'gpt-image-1', 'prompt': PROMPT, 'size': '1024x1536', 'quality': 'high', 'n': '1'}
    body = b''
    for k, v in fields.items():
        body += ('--%s\r\nContent-Disposition: form-data; name="%s"\r\n\r\n%s\r\n' % (b, k, v)).encode()
    body += ('--%s\r\nContent-Disposition: form-data; name="image"; filename="ref.png"\r\nContent-Type: image/png\r\n\r\n' % b).encode()
    body += open(tmp, 'rb').read() + ('\r\n--%s--\r\n' % b).encode()
    req = urllib.request.Request('https://api.openai.com/v1/images/edits', data=body, method='POST',
                                 headers={'Authorization': 'Bearer ' + key, 'Content-Type': 'multipart/form-data; boundary=' + b})
    with urllib.request.urlopen(req, timeout=300) as r:
        data = json.load(r)
    raw = base64.b64decode(data['data'][0]['b64_json'])
    out = os.path.join(OUT, name + '.png')
    open(out, 'wb').write(raw)
    # match the site's 1000x1250 frame on bone
    im = Image.open(out).convert('RGB')
    im.thumbnail((1000, 1250), Image.LANCZOS)
    canvas = Image.new('RGB', (1000, 1250), BONE)
    canvas.paste(im, ((1000 - im.width) // 2, (1250 - im.height) // 2))
    canvas.save(os.path.join(OUT, name + '.jpg'), quality=90, optimize=True, progressive=True)
    print('done', name, flush=True)


def apply():
    for f in sorted(os.listdir(OUT)):
        if f.endswith('.jpg'):
            shutil.copy(os.path.join(OUT, f), os.path.join(SYS, f)); print('applied', f)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    if '--apply' in sys.argv: apply(); sys.exit()
    key = os.environ.get('OPENAI_API_KEY')
    if not key: sys.exit('Set OPENAI_API_KEY in the environment settings.')
    for n in (sys.argv[1:] or TEST_SET):
        try: call(n, key)
        except Exception as e: print('failed', n, e, flush=True)
