function Footer({ go, toast }) {
  const [email, setEmail] = React.useState('');
  const col = (t, items) => (
    <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
      <Eyebrow color="var(--thread)">{t}</Eyebrow>
      {items.map(([label, r]) => <a key={label} href={r ? routeHash(r) : '#'} onClick={e => { e.preventDefault(); r ? go(r) : toast('Coming with launch'); }} style={{ color: 'var(--bone-100)', font: 'var(--text-body-s)' }}>{label}</a>)}
    </div>
  );
  return (
    <footer style={{ background: 'var(--fabric-denim-deep)', color: 'var(--bone-100)' }}>
      <div aria-hidden="true" style={{ position: 'relative', height: 26, background: 'var(--fabric-bone)' }}>
        <span style={{ position: 'absolute', left: 0, right: 0, top: 11, height: 3, background: 'var(--selvedge)' }} />
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: 'repeating-linear-gradient(90deg, rgba(21,17,13,.25) 0 1px, transparent 1px 3px)' }} />
      </div>
      <div style={{ padding: 'var(--space-9) var(--gutter) var(--space-6)' }}>
        <div className="dz-footer-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) repeat(3, minmax(0,1fr))', gap: 'var(--space-7)' }}>
          <form onSubmit={e => { e.preventDefault(); if (/\S+@\S+/.test(email)) { setEmail(''); toast('You are on the list'); } }} style={{ display: 'grid', gap: 28, alignContent: 'start', maxWidth: 360 }}>
            <div style={{ font: 'var(--text-display-m)', fontSize: 40 }}>Made by us.<br />Made yours.</div>
            <TextField inverse type="email" label="New chapters, first" placeholder="Email address" value={email} onChange={setEmail} />
          </form>
          {col('Shop', [['All', { page: 'shop' }], ['Outerwear', { page: 'shop', cat: 'Outerwear' }], ['Tops', { page: 'shop', cat: 'Tops' }], ['Trousers', { page: 'shop', cat: 'Trousers' }], ['Dresses', { page: 'shop', cat: 'Dresses' }], ['Footwear', { page: 'shop', cat: 'Footwear' }]])}
          {col('DOZI', [['The DOZI Design', { page: 'studio' }], ['Chapters', { page: 'home', anchor: 'chapters' }], ['Care & repair'], ['Journal']])}
          {col('Help', [['Shipping'], ['Returns'], ['Size guide'], ['Contact']])}
        </div>
        <div style={{ marginTop: 'var(--space-9)', display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 24, paddingTop: 'var(--space-6)', position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1.5, background: 'var(--stitch-h)' }} />
          <Logo variant="wordmark" width={260} color="var(--thread)" stitched strokeWidth={1.6} style={{ maxWidth: '70vw', height: 'auto' }} />
          <span style={{ ...caps, color: 'var(--text-on-denim-muted)' }}>Lagos · © 2026 DOZI</span>
        </div>
      </div>
    </footer>
  );
}
