import React from 'react';
export function Swatch({ color, label, selected, onClick, size = 28, inverse }) {
  return (
    <button type="button" title={label} aria-label={label} aria-pressed={!!selected} onClick={onClick}
      style={{ width: size, height: size, borderRadius: 999, background: 'var(--twill), ' + color, border: '1px solid ' + (inverse ? 'rgba(243,239,231,.35)' : 'var(--line-strong)'), padding: 0, cursor: 'pointer',
        outline: selected ? (inverse ? '1.5px dashed var(--thread)' : '1px solid var(--ink-900)') : '1px solid transparent', outlineOffset: 3, transition: 'outline-color var(--dur-fast)' }} />
  );
}
export function SwatchGroup({ options = [], value, onChange, showLabel = true, inverse }) {
  const cur = options.find(o => o.value === value);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {showLabel && <div style={{ font: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', color: inverse ? 'var(--text-on-denim-muted)' : 'var(--text-secondary)' }}>Colour — <span style={{ color: inverse ? 'var(--bone-100)' : 'var(--ink-900)' }}>{cur ? cur.label : ''}</span></div>}
      <div style={{ display: 'flex', gap: 14 }}>{options.map(o => <Swatch key={o.value} inverse={inverse} color={o.color} label={o.label} selected={o.value === value} onClick={() => onChange && onChange(o.value)} />)}</div>
    </div>
  );
}
