import React from 'react';
export function TextField({ label, value, onChange, placeholder, type = 'text', error, inverse, style }) {
  const [f, setF] = React.useState(false);
  const c = inverse ? 'var(--bone-100)' : 'var(--ink-900)';
  return (
    <label style={{ display: 'grid', gap: 8, color: c, ...style }}>
      {label && <span style={{ font: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', opacity: 0.75 }}>{label}</span>}
      <input type={type} value={value} placeholder={placeholder} onChange={e => onChange && onChange(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ height: 44, background: 'transparent', border: 0, borderBottom: '1px solid ' + (error ? 'var(--error)' : f ? c : (inverse ? 'var(--line-inverse)' : 'var(--line-strong)')), color: c, font: 'var(--text-body)', outline: 'none', padding: 0, borderRadius: 0 }} />
      {error && <span style={{ font: 'var(--text-caption)', color: 'var(--error)' }}>{error}</span>}
    </label>
  );
}
