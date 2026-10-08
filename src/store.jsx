// Routing (hash URLs, so links can be shared), the bag, toasts and The Polo's photo composite.
function parseRoute() {
  const h = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  const [page, ...rest] = h.split('/');
  const arg = rest.join('/');
  if (page === 'shop') return { page: 'shop', cat: arg || 'All' };
  if (page === 'product') return { page: 'product', id: arg };
  if (page === 'studio') { let state = null; try { state = arg ? JSON.parse(arg) : null; } catch (e) {} return { page: 'studio', state }; }
  return { page: 'home', anchor: page === 'chapters' ? 'chapters' : null };
}
function routeHash(r) {
  if (r.page === 'shop') return '#/shop' + (r.cat && r.cat !== 'All' ? '/' + r.cat : '');
  if (r.page === 'product') return '#/product/' + r.id;
  if (r.page === 'studio') return '#/studio' + (r.state ? '/' + encodeURIComponent(JSON.stringify(r.state)) : '');
  return '#/';
}

function loadJSON(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
function saveJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

/** The Polo as a real photograph: base photo (collar × sleeve × colour × hardware) + photographed attachments. */
function PoloLook({ state, style, animate }) {
  const L = window.DOZI.look;
  const s = L.normalize(state);
  const src = L.baseSrc(s);
  return (
    <div className="look" style={{ position: 'relative', aspectRatio: '1122 / 1402', ...style }} role="img" aria-label={L.describe(s)}>
      <img key={animate ? src : 'base'} src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: animate ? 'dz-rise 520ms var(--ease-out) both' : undefined }} />
      {L.layers(s).map(([k, url]) => {
        const b = L.OVERLAYS[k], W = L.SIZE[0], H = L.SIZE[1];
        return <img key={k + url} src={url} alt="" style={{ position: 'absolute', left: b[0] / W * 100 + '%', top: b[1] / H * 100 + '%', width: b[2] / W * 100 + '%', height: b[3] / H * 100 + '%', animation: animate ? 'dz-drop 520ms cubic-bezier(.3,1.4,.45,1) both' : undefined }} />;
      })}
    </div>
  );
}

function Toast({ msg }) {
  return (
    <div aria-live="polite" style={{ position: 'fixed', left: '50%', bottom: 28, zIndex: 60, transform: 'translate(-50%,' + (msg ? '0' : '20px') + ')', opacity: msg ? 1 : 0, transition: 'all var(--dur) var(--ease-out)', pointerEvents: 'none' }}>
      <Stitched surface="bone" padding="14px 24px" inset={4} style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{msg}</Stitched>
    </div>
  );
}

const caps = { font: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase' };
