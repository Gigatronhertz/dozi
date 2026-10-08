function BagDrawer({ open, items, setQty, close, toast }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: open ? 'auto' : 'none' }}>
      <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(10,14,24,.55)', opacity: open ? 1 : 0, transition: 'opacity var(--dur)' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(460px, 100%)', background: 'var(--fabric-denim-dark)', color: 'var(--bone-100)', transform: open ? 'none' : 'translateX(100%)', transition: 'transform var(--dur-slow) var(--ease-cut)', display: 'grid', gridTemplateRows: 'auto 1fr auto', boxShadow: '-20px 0 40px -20px rgba(0,0,0,.8)' }}>
        <span style={{ position: 'absolute', top: 0, bottom: 0, left: 8, width: 1.5, background: 'var(--stitch-v)' }} />
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 76, padding: '0 var(--space-6)' }}>
          <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1.5, background: 'var(--stitch-h)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><FashionIcon name="tag" size={20} animate="always" color="var(--thread)" /><Eyebrow>Bag ({items.length})</Eyebrow></div>
          <Button variant="ghost" size="sm" onClick={close}>Close</Button>
        </div>
        <div style={{ overflow: 'auto', padding: 'var(--space-5) var(--space-6)', display: 'grid', alignContent: 'start', gap: 16 }}>
          {items.length === 0 && <p style={{ font: 'var(--text-heading-s)', margin: 0 }}>Nothing yet. Choose a base.</p>}
          {items.map((it, i) => (
            <Stitched key={i} surface="bone" padding={12} inset={5} style={{ display: 'grid', gridTemplateColumns: '84px 1fr', gap: 14 }}>
              <div style={{ aspectRatio: '4 / 5', background: 'var(--bone-100) url(' + it.image + ') center/cover' }} />
              <div style={{ display: 'grid', gap: 6, alignContent: 'start' }}>
                <div style={{ font: 'var(--text-heading-s)', fontSize: 19 }}>{it.name}</div>
                <div style={{ font: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{[it.colour, it.size, it.detail].filter(Boolean).join(' / ')}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}><QuantityStepper value={it.qty} onChange={q => setQty(i, q)} min={0} /><Price amount={it.price * it.qty} /></div>
              </div>
            </Stitched>
          ))}
        </div>
        <div style={{ position: 'relative', padding: 'var(--space-5) var(--space-6)', display: 'grid', gap: 16 }}>
          <span style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1.5, background: 'var(--stitch-h)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' }}><span>Subtotal</span><span>{formatNaira(total)}</span></div>
          <Button full size="lg" variant="patch" disabled={!items.length} onClick={() => toast('Checkout opens with launch')}>Checkout</Button>
          <span style={{ ...caps, color: 'var(--text-on-denim-muted)', textAlign: 'center' }}>Made to order in Lagos · 10–14 days</span>
        </div>
      </div>
    </div>
  );
}
