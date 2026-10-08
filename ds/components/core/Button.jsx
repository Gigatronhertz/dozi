import React from 'react';
const V = {
  primary: { background: 'var(--ink-900)', color: 'var(--bone-100)', border: '1px solid var(--ink-900)' },
  secondary: { background: 'transparent', color: 'var(--ink-900)', border: '1px solid var(--ink-900)' },
  inverse: { background: 'var(--bone-100)', color: 'var(--ink-900)', border: '1px solid var(--bone-100)' },
  ghost: { background: 'transparent', color: 'currentColor', border: '1px solid transparent' },
  patch: { background: 'var(--fabric-bone)', color: 'var(--ink-900)', border: '0', boxShadow: 'var(--shadow-patch)' },
  thread: { background: 'transparent', color: 'var(--bone-100)', border: '1.5px dashed var(--thread)' },
};
const S = { sm: { height: 36, padding: '0 16px' }, md: { height: 48, padding: '0 28px' }, lg: { height: 60, padding: '0 40px' } };
export function Button({ variant = 'primary', size = 'md', full, disabled, children, onClick, style, ...rest }) {
  const [h, setH] = React.useState(false);
  const base = V[variant] || V.primary;
  let hover = {};
  if (h && !disabled) {
    if (variant === 'primary') hover = { background: 'var(--umber-800)' };
    else if (variant === 'inverse') hover = { background: 'var(--bone-50)' };
    else if (variant === 'patch') hover = { transform: 'translateY(-2px) rotate(-0.4deg)' };
    else if (variant === 'thread') hover = { background: 'rgba(212,154,72,.14)' };
    else hover = { background: 'var(--ink-900)', color: 'var(--bone-100)', borderColor: 'var(--ink-900)' };
  }
  return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'relative', ...S[size], ...base, ...hover, width: full ? '100%' : undefined, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', borderRadius: 0, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1, transition: 'background var(--dur) var(--ease-out), color var(--dur) var(--ease-out), transform var(--dur) var(--ease-out)', ...style }} {...rest}>
      {variant === 'patch' && <span aria-hidden="true" style={{ position: 'absolute', inset: 4, border: '1.5px dashed var(--thread)', pointerEvents: 'none' }} />}
      {children}
    </button>
  );
}
