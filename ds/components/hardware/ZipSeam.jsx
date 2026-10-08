import React from 'react';
/** Closed decorative zip used as a seam between sections. */
export function ZipSeam({ tape = 'var(--fabric-denim-deep)', style }) {
  const row = (top, shift) => ({ position: 'absolute', left: 0, right: 0, top, height: 8, background: 'repeating-linear-gradient(90deg, #C9994D 0 5.5px, transparent 5.5px 9px)', backgroundPosition: shift + 'px 0', filter: 'drop-shadow(0 1px 0 rgba(0,0,0,.5))' });
  return (
    <div aria-hidden="true" style={{ position: 'relative', height: 40, background: tape, ...style }}>
      <span style={{ position: 'absolute', left: 0, right: 0, top: 5, height: 1.5, background: 'var(--stitch-h)' }} />
      <span style={{ ...row(12, 0) }} />
      <span style={{ ...row(18, 4.5) }} />
      <span style={{ position: 'absolute', left: 0, right: 0, bottom: 5, height: 1.5, background: 'var(--stitch-h)' }} />
    </div>
  );
}
