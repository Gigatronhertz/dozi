import React from 'react';
import { Rivet } from './Rivet.jsx';
const SURF = {
  bone: ['var(--fabric-bone)', 'var(--ink-900)'],
  denim: ['var(--fabric-denim)', 'var(--text-on-denim)'],
  dark: ['var(--fabric-denim-dark)', 'var(--text-on-denim)'],
  washed: ['var(--fabric-denim-washed)', 'var(--text-on-denim)'],
  leather: ['var(--fabric-leather)', 'var(--bone-100)'],
  paper: ['var(--fabric-pattern-paper)', 'var(--ink-900)'],
};
/** A fabric patch with an inset topstitch. The building block for cards and panels. */
export function Stitched({ surface = 'bone', inset = 7, thread = 'var(--thread)', double = false, rivets = false, padding = 24, raised = true, children, style, onClick, onMouseEnter, onMouseLeave }) {
  const [bg, fg] = SURF[surface] || SURF.bone;
  const line = { position: 'absolute', border: '1.5px dashed ' + thread, borderRadius: 2, pointerEvents: 'none' };
  const r = inset + 3;
  return (
    <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      style={{ position: 'relative', background: bg, color: fg, padding, boxShadow: raised ? 'var(--shadow-patch)' : 'none', ...style }}>
      <span style={{ ...line, inset }} />
      {double && <span style={{ ...line, inset: inset + 6 }} />}
      {rivets && [{ top: r, left: r }, { top: r, right: r }, { bottom: r, left: r }, { bottom: r, right: r }].map((p, i) => <Rivet key={i} size={10} style={{ position: 'absolute', ...p, transform: 'translate(' + (p.left != null ? '-50%' : '50%') + ',' + (p.top != null ? '-50%' : '50%') + ')' }} />)}
      {children}
    </div>
  );
}
