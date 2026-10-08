import React from 'react';
export function Select({ label, value, onChange, options = [], inverse, style }) {
  const c = inverse ? 'var(--bone-100)' : 'var(--ink-900)';
  return (
    <label style={{ display: 'grid', gap: 8, color: c, ...style }}>
      {label && <span style={{ font: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', opacity: 0.75 }}>{label}</span>}
      <span style={{ position: 'relative', display: 'block' }}>
        <select value={value} onChange={e => onChange && onChange(e.target.value)}
          style={{ appearance: 'none', width: '100%', height: 44, background: 'transparent', border: 0, borderBottom: inverse ? '1.5px dashed var(--thread)' : '1px solid var(--line-strong)', font: 'var(--text-body)', color: c, borderRadius: 0, padding: '0 24px 0 0', outline: 'none' }}>
          {options.map(o => typeof o === 'string' ? <option key={o} style={{ color: '#15110D' }}>{o}</option> : <option key={o.value} value={o.value} style={{ color: '#15110D' }}>{o.label}</option>)}
        </select>
        <span aria-hidden="true" style={{ position: 'absolute', right: 2, top: 12, fontSize: 12, pointerEvents: 'none' }}>↓</span>
      </span>
    </label>
  );
}
