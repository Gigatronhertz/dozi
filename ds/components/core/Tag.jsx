import React from 'react';
export function Tag({ children, tone = 'outline', style }) {
  const t = { outline: { border: '1px solid var(--line-strong)', color: 'var(--ink-900)' }, ink: { background: 'var(--ink-900)', color: 'var(--bone-100)' }, brass: { background: 'var(--brass)', color: 'var(--ink-900)' } }[tone];
  return <span style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 10px', font: 'var(--text-caption)', fontWeight: 500, letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', ...t, ...style }}>{children}</span>;
}
