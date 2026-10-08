import React from 'react';

const ICONS = {
  zip: a => (<>
    <rect x="8.5" y="2.5" width="7" height="5" rx="1.2" />
    <g style={a('dz-swing 900ms', '12px 7px')}>
      <path d="M10.5 7.5v2.5M13.5 7.5v2.5" />
      <rect x="9" y="10" width="6" height="11.5" rx="1.5" />
      <rect x="11" y="16.5" width="2" height="3" rx="1" />
    </g>
  </>),
  buckle: a => (<>
    <path d="M2 9.5h5M2 14.5h5M17 9.5h5M17 14.5h5" />
    <rect x="7" y="5" width="10" height="14" rx="2" />
    <path d="M9.5 5.5v13" />
    <g style={a('dz-nudge 700ms 2', '0 0')}><path d="M9.5 12h8.5" /></g>
  </>),
  pin: a => (<>
    <circle cx="6" cy="18" r="2.5" />
    <path d="M7.8 16.2 17 7" />
    <path d="M16 6.2 18.2 4a1.8 1.8 0 0 1 2.6 2.6L18.6 9" />
    <g style={a('dz-open 900ms', '6px 18px')}><path d="M8.2 19.4 18.6 9" /></g>
  </>),
  stitch: a => (<>
    <path d="M2 8.5h20" strokeDasharray="3.5 2" style={a('dz-sew 600ms linear infinite')} />
    <path d="M2 15.5h20" strokeDasharray="3.5 2" style={a('dz-sew-rev 600ms linear infinite')} />
  </>),
  rivet: a => (<g style={a('dz-spin 1.2s linear', '12px 12px')}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
  </g>),
  button: a => (<g style={a('dz-spin 1.4s var(--ease-out)', '12px 12px')}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="5.8" />
    <circle cx="10.4" cy="10.4" r=".9" fill="currentColor" stroke="none" />
    <circle cx="13.6" cy="10.4" r=".9" fill="currentColor" stroke="none" />
    <circle cx="10.4" cy="13.6" r=".9" fill="currentColor" stroke="none" />
    <circle cx="13.6" cy="13.6" r=".9" fill="currentColor" stroke="none" />
  </g>),
  needle: a => (<>
    <g style={a('dz-bob 700ms 2', '0 0')}>
      <path d="M4.5 19.5 16.8 7.2" />
      <path d="M16.2 5.3a2 2 0 0 1 2.5 2.5l-1.2 1.2-2.5-2.5z" />
    </g>
    <path d="M18.5 7.5c2.5 3-1 7.5-5.5 7.5S6 17.5 7.5 21" strokeDasharray="2 2" />
  </>),
  hanger: a => (<g style={a('dz-swing 1s', '12px 4px')}>
    <path d="M10 6.5a2 2 0 1 1 3.2 1.6c-.8.6-1.2 1.1-1.2 2v.4" />
    <path d="M12 10.5 2.8 17a1 1 0 0 0 .6 1.8h17.2a1 1 0 0 0 .6-1.8z" />
  </g>),
  tag: a => (<g style={a('dz-swing 1s', '12px 2px')}>
    <path d="M12 2.5v3.3" />
    <path d="M7 9l5-3.2L17 9v12H7z" />
    <circle cx="12" cy="9.5" r="1.2" />
    <path d="M9.5 15h5M9.5 17.5h3.5" />
  </g>),
  scissors: a => (<>
    <g style={a('dz-snip-a 500ms 2', '12px 9.7px')}><circle cx="6" cy="18" r="2.5" /><path d="M7.6 16 16 4" /></g>
    <g style={a('dz-snip-b 500ms 2', '12px 9.7px')}><circle cx="18" cy="18" r="2.5" /><path d="M16.4 16 8 4" /></g>
  </>),
};

export const FASHION_ICON_NAMES = Object.keys(ICONS);

/** Line icons drawn from garment hardware; they animate on hover (or always). */
export function FashionIcon({ name = 'zip', size = 24, stroke = 1.5, color = 'currentColor', animate = 'hover', active, title, style }) {
  const [hover, setHover] = React.useState(false);
  const on = animate === 'always' || (animate === 'hover' && (active ?? hover));
  const a = (anim, origin) => ({ animation: on ? anim : 'none', transformOrigin: origin, transformBox: 'view-box' });
  const draw = ICONS[name] || ICONS.zip;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ display: 'block', flex: 'none', overflow: 'visible', ...style }}>
      {draw(a)}
    </svg>
  );
}
