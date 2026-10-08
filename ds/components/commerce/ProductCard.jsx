import React from 'react';
import { Price } from './Price.jsx';
import { Stitched } from '../hardware/Stitched.jsx';
import { Rivet } from '../hardware/Rivet.jsx';
export function ProductCard({ image, hoverImage, name, detail, price, from, tag, onClick, ratio = '4 / 5', tilt = 0 }) {
  const [h, setH] = React.useState(false);
  return (
    <a href="#" onClick={e => { e.preventDefault(); onClick && onClick(); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'block', color: 'var(--ink-900)', transform: h ? 'translateY(-4px) rotate(' + (tilt - 0.6) + 'deg)' : 'rotate(' + tilt + 'deg)', transition: 'transform var(--dur-slow) var(--ease-out)' }}>
      <Stitched surface="bone" padding={14} inset={6} style={{ display: 'grid', gap: 14 }}>
        <Rivet size={9} style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }} />
        <Rivet size={9} style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }} />
        <div style={{ position: 'relative', aspectRatio: ratio, background: 'var(--bone-200)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'url(' + image + ') center/cover', transform: h ? 'scale(1.04)' : 'none', transition: 'transform var(--dur-slow) var(--ease-out), opacity var(--dur)', opacity: h && hoverImage ? 0 : 1 }} />
          {hoverImage && <div style={{ position: 'absolute', inset: 0, background: 'url(' + hoverImage + ') center/cover', opacity: h ? 1 : 0, transition: 'opacity var(--dur)' }} />}
          {tag && <span style={{ position: 'absolute', bottom: 10, left: 10, background: 'var(--fabric-denim)', color: 'var(--bone-100)', padding: '5px 9px', font: 'var(--text-caption)', fontWeight: 500, letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', outline: '1px dashed var(--thread)', outlineOffset: -3 }}>{tag}</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', padding: '0 4px 4px' }}>
          <div style={{ display: 'grid', gap: 4 }}>
            <div style={{ font: 'var(--text-heading-s)' }}>{name}</div>
            {detail && <div style={{ font: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{detail}</div>}
          </div>
          {price != null && <Price amount={price} from={from} />}
        </div>
      </Stitched>
    </a>
  );
}
