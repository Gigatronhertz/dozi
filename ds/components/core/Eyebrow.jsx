import React from 'react';
export function Eyebrow({ children, index, rule, color, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, font: 'var(--text-eyebrow)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: color || 'currentColor', ...style }}>
      {index && <span style={{ opacity: 0.6 }}>{index}</span>}
      <span>{children}</span>
      {rule && <span style={{ flex: '0 0 32px', height: 1, background: 'currentColor', opacity: 0.5 }} />}
    </div>
  );
}
