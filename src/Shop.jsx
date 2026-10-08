function Shop({ cat, search, go, openProduct }) {
  const D = window.DOZI_DATA;
  const [q, setQ] = React.useState('');
  const [sort, setSort] = React.useState('Newest');
  const ref = React.useRef(null);
  React.useEffect(() => { if (search && ref.current) { const i = ref.current.querySelector('input'); i && i.focus(); } }, [search]);
  let list = D.products.filter(p => (cat === 'All' || p.cat === cat) && (!q || (p.name + ' ' + p.detail + ' ' + p.cat).toLowerCase().includes(q.toLowerCase())));
  if (sort === 'Price: low to high') list = list.slice().sort((a, b) => a.price - b.price);
  if (sort === 'Price: high to low') list = list.slice().sort((a, b) => b.price - a.price);
  return (
    <div style={{ background: 'var(--fabric-denim)', color: 'var(--bone-100)', padding: 'var(--space-8) var(--gutter) var(--space-10)' }}>
      <div style={{ display: 'grid', gap: 20, marginBottom: 'var(--space-7)' }}>
        <Eyebrow rule color="var(--thread)">Shop</Eyebrow>
        <h1 style={{ margin: 0, font: 'var(--text-display-l)' }}>Choose a base.</h1>
      </div>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 24, padding: 'var(--space-5) 0', marginBottom: 'var(--space-7)' }}>
        <span style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1.5, background: 'var(--stitch-h)' }} />
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1.5, background: 'var(--stitch-h)' }} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{D.cats.map(([c, ic]) => <OptionChip key={c} inverse selected={cat === c} icon={<FashionIcon name={ic} size={16} />} onClick={() => go({ page: 'shop', cat: c })}>{c}</OptionChip>)}</div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'end', flexWrap: 'wrap' }}>
          <div ref={ref}><TextField inverse label="Search" placeholder="Jacket, dress, heel…" value={q} onChange={setQ} style={{ width: 200 }} /></div>
          <span style={{ ...caps, color: 'var(--text-on-denim-muted)', paddingBottom: 14 }}>{list.length} pieces</span>
          <Select inverse value={sort} onChange={setSort} options={['Newest', 'Price: low to high', 'Price: high to low']} style={{ width: 200 }} />
        </div>
      </div>
      {!list.length && <p style={{ font: 'var(--text-heading)' }}>Nothing here yet. Try another base.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--space-7) var(--space-5)' }}>
        {list.map((p, i) => <ProductCard key={p.id} tilt={[-0.8, 0.6, -0.3, 0.9, -0.6, 0.4][i % 6]} image={p.image} hoverImage={p.hover} name={p.name} detail={p.detail} price={p.price} from={p.from} tag={p.tag} onClick={() => openProduct(p.id)} />)}
      </div>
    </div>
  );
}
