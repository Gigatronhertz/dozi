import React from 'react';
export function ArrowLink({ href = '#', children, inverse, onClick, style }) {
  const [h, setH] = React.useState(false);
  const c = inverse ? 'var(--bone-100)' : 'var(--ink-900)';
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: h ? 14 : 10, color: c, font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase', paddingBottom: 4, borderBottom: '1px solid ' + (h ? c : 'transparent'), transition: 'gap var(--dur) var(--ease-out), border-color var(--dur)', ...style }}>
      {children}<span aria-hidden="true">→</span>
    </a>
  );
}
