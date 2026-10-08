import React from 'react';
import { Stitched } from './Stitched.jsx';
import { Logo } from '../brand/Logo.jsx';
/** Debossed leather brand patch — the DOZI "back patch". */
export function LeatherPatch({ width = 220, variant = 'lockup', tagline, rotate = 0, style }) {
  return (
    <Stitched surface="leather" inset={6} thread="#C99A5A" padding={Math.round(width * 0.11)} style={{ width, boxSizing: 'border-box', transform: rotate ? 'rotate(' + rotate + 'deg)' : undefined, display: 'grid', justifyItems: 'center', gap: width * 0.05, ...style }}>
      <Logo variant={variant} width={variant === 'lockup' ? width * 0.48 : width * 0.62} color="var(--leather-deep)" style={{ filter: 'drop-shadow(0 1px 0 rgba(255,220,180,.22)) drop-shadow(0 -1px 0 rgba(0,0,0,.35))' }} />
      {tagline && <span style={{ font: 'var(--text-caption)', fontSize: Math.max(8, width * 0.04), letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--leather-deep)', textShadow: '0 1px 0 rgba(255,220,180,.2)', textAlign: 'center' }}>{tagline}</span>}
    </Stitched>
  );
}
