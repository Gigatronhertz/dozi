import React from 'react';

/**
 * A working zip. Drag (or click / press Enter on) the pull to unzip:
 * teeth separate in a V behind the slider, the two fabric flaps part,
 * and the section underneath is revealed at its natural height.
 */
export function Zipper({ label = 'Unzip', title, hint = 'Pull the zip to open', coverHeight = 220, fabric = 'var(--fabric-denim-dark)', compact = false, defaultOpen = false, onOpen, pitch = 9, children, style }) {
  const wrap = React.useRef(null);
  const cover = React.useRef(null);
  const inner = React.useRef(null);
  const topF = React.useRef(null);
  const botF = React.useRef(null);
  const teethEl = React.useRef(null);
  const pullEl = React.useRef(null);
  const x = React.useRef(28);
  const raf = React.useRef(0);
  const drag = React.useRef(null);
  const [w, setW] = React.useState(0);
  const [h, setH] = React.useState(0);
  const [open, setOpen] = React.useState(defaultOpen);
  const [touched, setTouched] = React.useState(false);

  const mid = coverHeight / 2;
  const cap = mid * 0.88;
  const k = compact ? 0.18 : 0.28;
  const run = cap / k;

  React.useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (wrap.current) setW(wrap.current.offsetWidth);
      if (inner.current) setH(inner.current.offsetHeight);
    });
    ro.observe(wrap.current);
    ro.observe(inner.current);
    return () => { ro.disconnect(); cancelAnimationFrame(raf.current); };
  }, []);

  const paint = v => {
    if (topF.current) topF.current.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, ' + v + 'px 100%, ' + (v - run) + 'px ' + (mid - cap) + 'px, 0 ' + (mid - cap) + 'px)';
    if (botF.current) botF.current.style.clipPath = 'polygon(0 ' + cap + 'px, ' + (v - run) + 'px ' + cap + 'px, ' + v + 'px 0, 100% 0, 100% 100%, 0 100%)';
    if (pullEl.current) pullEl.current.style.left = v + 'px';
    if (teethEl.current) {
      const kids = teethEl.current.children;
      for (let i = 0; i < kids.length; i++) {
        const el = kids[i], L = +el.dataset.l, off = Math.min(cap, Math.max(0, v - L) * k);
        el.style.transform = 'translateY(' + (el.dataset.r === 't' ? -off : off) + 'px)';
      }
    }
  };
  const setX = v => { x.current = v; paint(v); };
  React.useLayoutEffect(() => { paint(x.current); });
  const finish = () => { setOpen(true); onOpen && onOpen(); };
  const animateTo = (target, done) => {
    cancelAnimationFrame(raf.current);
    const from = x.current, t0 = performance.now(), dur = 900;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      setX(from + (target - from) * e);
      if (p < 1) raf.current = requestAnimationFrame(step); else done && done();
    };
    raf.current = requestAnimationFrame(step);
  };
  const onDown = e => {
    e.preventDefault(); setTouched(true);
    cancelAnimationFrame(raf.current);
    drag.current = { sx: e.clientX, x0: x.current, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = e => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.sx;
    if (Math.abs(dx) > 3) d.moved = true;
    setX(Math.max(12, Math.min(w - 12, d.x0 + dx)));
  };
  const onUp = () => {
    const d = drag.current; drag.current = null; if (!d) return;
    if (!d.moved || x.current > w * 0.55) animateTo(w + run, finish);
  };
  const onKey = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTouched(true); animateTo(w + run, finish); } };

  const n = Math.ceil(w / pitch) + 1;
  const teeth = [];
  for (let i = 0; i < n; i++) {
    const L = i * pitch;
    const tooth = { position: 'absolute', width: pitch * 0.62, height: 8, background: 'var(--brass-metal)', borderRadius: 1.5, boxShadow: '0 1px 1px rgba(0,0,0,.45)' };
    teeth.push(<span key={'t' + i} data-l={L} data-r="t" style={{ ...tooth, left: L, top: mid - 7 }} />);
    teeth.push(<span key={'b' + i} data-l={L + pitch / 2} data-r="b" style={{ ...tooth, left: L + pitch / 2, top: mid - 1 }} />);
  }

  const stitch = (pos) => <span style={{ position: 'absolute', left: 0, right: 0, height: 1.5, background: 'var(--stitch-h)', opacity: 0.85, ...pos }} />;
  const flapBase = { position: 'absolute', left: 0, right: 0, height: mid, background: fabric, transition: 'transform 900ms var(--ease-cut), opacity 300ms 600ms, visibility 0s 900ms' };
  const caps = { font: 'var(--text-eyebrow)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase' };

  return (
    <div ref={wrap} style={{ position: 'relative', overflow: 'hidden', height: open ? h : coverHeight, transition: 'height 900ms var(--ease-cut)', background: 'var(--denim-950)', ...style }}>
      <div ref={inner} style={{ minHeight: coverHeight }} aria-hidden={!open}>{children}</div>
      <div ref={cover} style={{ position: 'absolute', inset: 0, pointerEvents: open ? 'none' : 'auto' }}>
        <div style={{ position: 'absolute', inset: 0, filter: 'drop-shadow(0 6px 8px rgba(0,0,0,.55))' }}>
          <div ref={topF} style={{ ...flapBase, top: 0, transform: open ? 'translateY(-102%)' : 'none', opacity: open ? 0 : 1, visibility: open ? 'hidden' : 'visible' }}>
            <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 12, background: 'rgba(0,0,0,.28)' }} />
            {stitch({ bottom: 18 })}{stitch({ bottom: 24 })}
            {compact
              ? <div style={{ position: 'absolute', left: 'var(--gutter)', right: 'var(--gutter)', top: 0, bottom: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-on-denim)' }}>
                  <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' }}>{label}</span>
                  <span style={{ ...caps, fontSize: 10, color: 'var(--text-on-denim-muted)' }}>Unzip →</span>
                </div>
              : <div style={{ position: 'absolute', left: 'var(--gutter)', right: 'var(--gutter)', bottom: 44, display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 24, color: 'var(--text-on-denim)' }}>
                  <div style={{ display: 'grid', gap: 10 }}>
                    <span style={{ ...caps, color: 'var(--thread)' }}>{label}</span>
                    {title && <span style={{ font: 'var(--text-display-m)' }}>{title}</span>}
                  </div>
                </div>}
          </div>
          <div ref={botF} style={{ ...flapBase, top: mid, transform: open ? 'translateY(102%)' : 'none', opacity: open ? 0 : 1, visibility: open ? 'hidden' : 'visible' }}>
            <span style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 12, background: 'rgba(0,0,0,.28)' }} />
            {stitch({ top: 18 })}{stitch({ top: 24 })}
            {!compact && <div style={{ position: 'absolute', right: 'var(--gutter)', top: 44, ...caps, color: 'var(--text-on-denim-muted)' }}>{hint} →</div>}
          </div>
        </div>
        <div ref={teethEl} style={{ position: 'absolute', inset: 0, opacity: open ? 0 : 1, transition: 'opacity 300ms', pointerEvents: 'none' }}>{teeth}</div>
        <div ref={pullEl} role="button" tabIndex={0} aria-label={'Unzip ' + label} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onKeyDown={onKey}
          style={{ position: 'absolute', left: 28, top: mid, width: 34, transform: 'translate(-50%, -11px)', cursor: 'grab', touchAction: 'none', outline: 'none',
            opacity: open ? 0 : 1, transition: 'opacity 300ms', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ width: 30, height: 20, background: 'var(--brass-metal)', borderRadius: '4px 4px 6px 6px', boxShadow: '0 2px 3px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.4)' }} />
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transformOrigin: '50% 0', animation: touched ? 'none' : 'dz-sway 2.4s ease-in-out infinite' }}>
            <span style={{ width: 10, height: 6, background: '#8E6628' }} />
            <span style={{ width: compact ? 18 : 22, height: compact ? 22 : 40, background: 'var(--brass-metal)', borderRadius: 4, boxShadow: '0 3px 5px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.35)', display: 'grid', placeItems: 'center' }}>
              <span style={{ width: 6, height: compact ? 6 : 10, borderRadius: 3, background: 'rgba(60,40,10,.55)', boxShadow: 'inset 0 1px 1px rgba(0,0,0,.4)' }} />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
