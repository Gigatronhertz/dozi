import React from 'react';
export function OptionChip({ children, selected, disabled, onClick, meta, icon, inverse }) {
  const [h, setH] = React.useState(false);
  const fg = inverse ? 'var(--bone-100)' : 'var(--ink-900)';
  const selBg = inverse ? 'var(--fabric-bone)' : 'var(--ink-900)';
  const selFg = inverse ? 'var(--ink-900)' : 'var(--bone-100)';
  const line = inverse ? 'rgba(201,211,227,.45)' : 'var(--line-strong)';
  return (
    <button type="button" disabled={disabled} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'relative', minHeight: 44, padding: '0 18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, borderRadius: 0, cursor: disabled ? 'not-allowed' : 'pointer',
        background: selected ? selBg : 'transparent', color: selected ? selFg : fg,
        border: (inverse ? '1.5px dashed ' : '1px solid ') + (selected ? 'transparent' : h ? (inverse ? 'var(--thread)' : 'var(--ink-900)') : line),
        font: 'var(--text-label)', letterSpacing: '0.08em', textDecoration: disabled ? 'line-through' : 'none', opacity: disabled ? 0.4 : 1, transition: 'all var(--dur-fast)' }}>
      {selected && inverse && <span aria-hidden="true" style={{ position: 'absolute', inset: 3, border: '1.5px dashed var(--thread)', pointerEvents: 'none' }} />}
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>{icon}{children}</span>
      {meta && <span style={{ opacity: 0.7, font: 'var(--text-caption)' }}>{meta}</span>}
    </button>
  );
}
