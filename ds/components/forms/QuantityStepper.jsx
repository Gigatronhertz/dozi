import React from 'react';
export function QuantityStepper({ value = 1, onChange, min = 1, max = 9 }) {
  const b = { width: 40, height: 40, background: 'transparent', border: 0, cursor: 'pointer', font: 'var(--text-body)', color: 'var(--ink-900)' };
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--line-strong)' }}>
      <button type="button" aria-label="Decrease" style={b} onClick={() => onChange && onChange(Math.max(min, value - 1))}>−</button>
      <span style={{ minWidth: 28, textAlign: 'center', font: 'var(--text-label)' }}>{value}</span>
      <button type="button" aria-label="Increase" style={b} onClick={() => onChange && onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}
