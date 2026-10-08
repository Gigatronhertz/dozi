import React from 'react';
/** Brass rivet / stud. */
export function Rivet({ size = 12, style }) {
  return (
    <span aria-hidden="true" style={{ display: 'inline-grid', placeItems: 'center', width: size, height: size, borderRadius: '50%', background: 'var(--brass-rivet)', boxShadow: '0 1px 2px rgba(0,0,0,.6), inset 0 0 0 1px rgba(0,0,0,.25)', flex: 'none', ...style }}>
      <span style={{ width: size * 0.34, height: size * 0.34, borderRadius: '50%', background: 'radial-gradient(circle at 60% 60%, #F6DFA6, #7E5A25)', boxShadow: 'inset 0 1px 1px rgba(0,0,0,.45)' }} />
    </span>
  );
}
