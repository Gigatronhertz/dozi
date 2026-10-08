import React from 'react';
export function formatNaira(n) { return '₦' + Number(n).toLocaleString('en-NG'); }
export function Price({ amount, from, style }) {
  return <span style={{ font: 'var(--text-body-s)', letterSpacing: '0.04em', ...style }}>{from && <span style={{ color: 'var(--text-muted)' }}>from </span>}{formatNaira(amount)}</span>;
}
