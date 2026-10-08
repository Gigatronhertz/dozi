function NavItem({ icon, label, active, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <a href="#" className="dz-nav-item" onClick={e => { e.preventDefault(); onClick(); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 9, color: h ? 'var(--thread)' : 'var(--bone-100)', font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', padding: '8px 0', transition: 'color var(--dur-fast)' }}>
      <FashionIcon name={icon} size={19} active={h} />
      <span className="dz-nav-label">{label}</span>
      {active && <span style={{ position: 'absolute', left: 28, right: 0, bottom: 0, height: 1.5, background: 'var(--stitch-h)' }} />}
    </a>
  );
}
function BeltLoop() {
  return (
    <span aria-hidden="true" className="dz-belt" style={{ position: 'relative', justifySelf: 'center', alignSelf: 'stretch', width: 22, marginBottom: -12, background: 'var(--fabric-denim)', boxShadow: '0 4px 8px rgba(0,0,0,.5)', borderRadius: '0 0 3px 3px' }}>
      <span style={{ position: 'absolute', top: 0, bottom: 4, left: 4, width: 1.5, background: 'var(--stitch-v)' }} />
      <span style={{ position: 'absolute', top: 0, bottom: 4, right: 4, width: 1.5, background: 'var(--stitch-v)' }} />
      <span style={{ position: 'absolute', left: 3, right: 3, bottom: 5, height: 1.5, background: 'var(--stitch-h)' }} />
    </span>
  );
}
function Header({ page, go, bagCount, openBag }) {
  return (
    <header className="dz-header" style={{ position: 'sticky', top: 0, zIndex: 20, height: 76, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 64px auto 64px minmax(0,1fr)', alignItems: 'center', padding: '0 var(--gutter)',
      background: 'var(--fabric-denim-dark)', boxShadow: '0 10px 20px -12px rgba(0,0,0,.8)' }}>
      <span style={{ position: 'absolute', left: 0, right: 0, top: 7, height: 1.5, background: 'var(--stitch-h)' }} />
      <span style={{ position: 'absolute', left: 0, right: 0, bottom: 7, height: 1.5, background: 'var(--stitch-h)' }} />
      <span style={{ position: 'absolute', left: 0, right: 0, bottom: 13, height: 1.5, background: 'var(--stitch-h)' }} />
      <nav style={{ display: 'flex', gap: 26 }} aria-label="Primary">
        <NavItem icon="hanger" label="Shop" active={page === 'shop' || page === 'product'} onClick={() => go({ page: 'shop' })} />
        <NavItem icon="needle" label="Design" active={page === 'studio'} onClick={() => go({ page: 'studio' })} />
        <NavItem icon="scissors" label="Chapters" onClick={() => go({ page: 'home', anchor: 'chapters' })} />
      </nav>
      <BeltLoop />
      <a href="#/" onClick={e => { e.preventDefault(); go({ page: 'home' }); }} aria-label="DOZI home" className="dz-patch" style={{ alignSelf: 'start', marginTop: 10, zIndex: 2 }}>
        <LeatherPatch variant="wordmark" width={124} style={{ padding: '12px 16px' }} />
      </a>
      <BeltLoop />
      <div style={{ display: 'flex', gap: 26, justifyContent: 'flex-end' }}>
        <NavItem icon="pin" label="Search" onClick={() => go({ page: 'shop', search: true })} />
        <NavItem icon="tag" label={'Bag (' + bagCount + ')'} onClick={openBag} />
      </div>
    </header>
  );
}
