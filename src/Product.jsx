function Product({ id, addToBag, go, toast }) {
  const D = window.DOZI_DATA, SYS = window.DOZI.systems, LK = window.DOZI.look;
  const p = D.products.find(x => x.id === id) || D.products[0];
  const s = p.system;
  const [st, setSt] = React.useState(() => s ? SYS.normalize({ base: s.id }) : LK.normalize({}));
  const [size, setSize] = React.useState('M');
  const [view, setView] = React.useState(-1); // -1 = the garment, otherwise a detail photo
  React.useEffect(() => { setSt(s ? SYS.normalize({ base: s.id }) : LK.normalize({})); setView(-1); }, [id]);
  const change = patch => { setSt(x => s ? SYS.normalize({ ...x, ...patch }) : LK.normalize({ ...x, ...patch })); setView(-1); toast('Your design has changed.'); };
  const total = s ? SYS.price(st) : window.DOZI.designPrice(st);
  
  const colourOpts = s ? s.colours.map(c => ({ value: c, label: SYS.COLOURS[c].name, color: D.swatch[c] }))
    : Object.keys(LK.COLORS).map(c => ({ value: c, label: LK.COLORS[c].name, color: LK.COLORS[c].hex }));
  const P = window.DOZI.DESIGN_PRICES;
  const poloParts = [
    ['collar', st.collar === 'crew' ? 'polo' : 'crew', 'Crew neck', 0, 'button', st.collar === 'crew'],
    ['sleeve', st.sleeve === 'long' ? 'short' : 'long', 'Long sleeves', P.sleeve.long, 'zip', st.sleeve === 'long'],
    ['pocket', !st.pocket, 'Utility pocket', P.pocket, 'button', st.pocket],
    ['panels', !st.panels, 'Contrast side panels', P.panels, 'zip', st.panels],
    ['hem', st.hem === 'charm' ? 'none' : 'charm', 'Leaf charm', P.hem.charm, 'pin', st.hem === 'charm'],
    ['hem', st.hem === 'strap' ? 'none' : 'strap', 'Hem strap', P.hem.strap, 'buckle', st.hem === 'strap'],
  ];
  const detail = s ? SYS.COLOURS[st.color].name + ' / ' + s.versions[st.v][0] : LK.COLORS[st.color].name + ' / ' + LK.HARDWARE[st.hardware].name;
  const image = s ? SYS.img(s, st.color, st.v) : LK.baseSrc(st);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))', color: 'var(--bone-100)', background: 'var(--fabric-denim)' }}>
      <div style={{ background: 'var(--fabric-denim-washed)', padding: 'var(--space-7) var(--gutter)', display: 'grid', gap: 'var(--space-5)', alignContent: 'start' }}>
        <Stitched surface="bone" padding={18} double rivets style={{ display: 'grid' }}>
          <div style={{ position: 'relative', aspectRatio: '5 / 4', background: 'var(--bone-100)', overflow: 'hidden' }}>
            {s ? <img key={image} src={image} alt={p.name + ', ' + s.versions[st.v][0]} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', animation: 'dz-rise 520ms var(--ease-out) both' }} />
              : <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center' }}><PoloLook state={st} animate style={{ height: '100%', width: 'auto' }} /></div>}
          </div>
        </Stitched>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {(s ? s.versions.map((v, i) => [SYS.img(s, st.color, i), () => change({ v: i }), st.v === i, v[0]])
              : [['polo', 'short', 'Polo collar, short'], ['polo', 'long', 'Polo collar, long'], ['crew', 'short', 'Crew neck, short'], ['crew', 'long', 'Crew neck, long']]
                .map(([c, sl, l]) => [LK.baseSrc({ ...st, collar: c, sleeve: sl }), () => change({ collar: c, sleeve: sl }), st.collar === c && st.sleeve === sl, l]))
            .map(([g, fn, on, label], i) => (
              <button key={i} onClick={fn} title={label} aria-label={label} style={{ width: 76, height: 76, padding: 0, border: 0, cursor: 'pointer', background: 'var(--bone-100) url(' + g + ') center/cover', outline: on ? '1.5px dashed var(--thread)' : '1px solid rgba(243,239,231,.25)', outlineOffset: 3 }} />
            ))}
        </div>
      </div>
      <aside style={{ minWidth: 0, position: 'sticky', top: 76, alignSelf: 'start', padding: 'var(--space-7) var(--gutter)', display: 'grid', gap: 30 }}>
        <a href={routeHash({ page: 'shop', cat: p.cat })} onClick={e => { e.preventDefault(); go({ page: 'shop', cat: p.cat }); }} style={{ ...caps, color: 'var(--text-on-denim-muted)' }}>← Shop / {p.cat}</a>
        <div style={{ display: 'grid', gap: 12 }}>
          {p.tag && <div><Tag tone="brass">{p.tag}</Tag></div>}
          <h1 style={{ margin: 0, font: 'var(--text-display-m)' }}>{p.name}</h1>
          <span style={{ ...caps, color: 'var(--text-on-denim-muted)' }}>{detail}</span>
          <Price amount={total} style={{ font: 'var(--text-body-l)' }} />
        </div>
        <p style={{ margin: 0, font: 'var(--text-body)', color: 'var(--text-on-denim-muted)' }}>{p.blurb}</p>
        <SwatchGroup inverse options={colourOpts} value={st.color} onChange={v => change({ color: v })} />
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><Eyebrow>Size</Eyebrow><a href="#" onClick={e => { e.preventDefault(); toast('Size guide coming with launch'); }} style={{ ...caps, textDecoration: 'underline' }}>Size guide</a></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{['XS', 'S', 'M', 'L', 'XL'].map(z => <OptionChip inverse key={z} selected={size === z} onClick={() => setSize(z)}>{z}</OptionChip>)}</div>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          <Eyebrow color="var(--thread)">Make it yours</Eyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))', gap: 8 }}>
            {s ? s.versions.map((v, i) => <OptionChip inverse key={i} selected={st.v === i} icon={<FashionIcon name={['hanger', 'zip', 'button', 'buckle', 'pin', 'needle', 'stitch'][i % 7]} size={16} active={st.v === i} />} meta={v[2] ? '+' + formatNaira(v[2]) : null} onClick={() => change({ v: i })}>{v[0]}</OptionChip>)
              : poloParts.map(([k, val, l, v, ic, on]) => <OptionChip inverse key={l} selected={on} icon={<FashionIcon name={ic} size={16} active={on} />} meta={v ? '+' + formatNaira(v) : null} onClick={() => change({ [k]: val })}>{l}</OptionChip>)}
          </div>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          <Button full size="lg" variant="patch" onClick={() => addToBag({ id: p.id, name: p.name, detail, price: total, colour: s ? SYS.COLOURS[st.color].name : LK.COLORS[st.color].name, size, image, state: st })}>Add to bag — {formatNaira(total)}</Button>
          <Button full variant="thread" onClick={() => go({ page: 'studio', state: s ? st : { base: 'polo', ...st } })}>Open in the studio</Button>
        </div>
        <div style={{ display: 'grid', gap: 2 }}>
          {[['How the parts attach', 'Every DOZI part fixes with one of three systems: the modular snap, the DOZI zip channel or the strap rail. Parts from one piece fit every other piece that shares the system.'],
            ['Fabric & care', 'Cold wash with every part removed. Hang to dry. Leather and brass are wiped clean, never washed.'],
            ['Delivery & returns', 'Made to order in Lagos and shipped in 10–14 days. Parts can be added to your piece later.']].map(([t, body], i) => (
            <Zipper key={t} compact coverHeight={64} label={t} autoOpen={700 + i * 500} autoOnMount>
              <div style={{ background: 'var(--fabric-denim-deep)', padding: '20px 18px', minHeight: 64, boxSizing: 'border-box', font: 'var(--text-body-s)', color: 'var(--text-on-denim-muted)' }}>{body}</div>
            </Zipper>
          ))}
        </div>
      </aside>
    </div>
  );
}
