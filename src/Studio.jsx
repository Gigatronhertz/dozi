// The DOZI Design studio: the kit's cutting-mat layout, driven by the real photographed pieces.
function Studio({ initial, addToBag, go, toast }) {
  const D = window.DOZI_DATA, SYS = window.DOZI.systems, LK = window.DOZI.look, P = window.DOZI.DESIGN_PRICES;
  const fromInitial = i => (i && i.base && i.base !== 'polo' && SYS.get(i.base)) ? SYS.normalize(i) : { base: 'polo', ...LK.normalize(i || {}) };
  const [cfg, setCfg] = React.useState(() => fromInitial(initial));
  const [step, setStep] = React.useState(0);
  const [picking, setPicking] = React.useState(false);
  const polo = cfg.base === 'polo';
  const s = polo ? null : SYS.get(cfg.base);
  React.useEffect(() => { history.replaceState(null, '', routeHash({ page: 'studio', state: cfg })); }, [cfg]);

  const steps = polo
    ? [{ k: 'base', t: 'Base', ic: 'hanger' }, { k: 'colour', t: 'Colour', ic: 'button' }, { k: 'collar', t: 'Collar', ic: 'scissors' }, { k: 'sleeve', t: 'Sleeve', ic: 'zip' }, { k: 'attach', t: 'Attach', ic: 'buckle' }, { k: 'finish', t: 'Finish', ic: 'needle' }]
    : [{ k: 'base', t: 'Base', ic: 'hanger' }, { k: 'colour', t: 'Colour', ic: 'button' }, { k: 'version', t: 'Version', ic: 'zip' }];
  const cur = steps[Math.min(step, steps.length - 1)];
  const set = patch => {
    setCfg(c => {
      if (patch.base && patch.base !== c.base) return patch.base === 'polo' ? { base: 'polo', ...LK.normalize({}) } : SYS.normalize({ base: patch.base });
      const n = { ...c, ...patch };
      return n.base === 'polo' ? { base: 'polo', ...LK.normalize(n) } : SYS.normalize(n);
    });
    setPicking(false);
    toast('Your design has changed.');
  };
  const price = polo ? window.DOZI.designPrice(cfg) : SYS.price(cfg);
  const name = polo ? 'The Polo' : s.name;
  const colourName = polo ? LK.COLORS[cfg.color].name : SYS.COLOURS[cfg.color].name;
  const tags = polo ? [LK.describe(cfg).split(': ')[1].split(', ').slice(1)].flat() : [s.versions[cfg.v][0], s.versions[cfg.v][1]];
  const image = polo ? LK.baseSrc(cfg) : SYS.img(s, cfg.color, cfg.v);

  const patch = (key, label, img, selected, onClick, note, disabled) => (
    <button key={key} onClick={onClick} disabled={disabled} style={{ position: 'relative', background: 'var(--fabric-bone)', border: 0, padding: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .45 : 1, display: 'grid', gap: 8, textAlign: 'left', alignContent: 'start', boxShadow: 'var(--shadow-patch)', outline: selected ? '2px solid var(--thread)' : 'none', outlineOffset: 3 }}>
      <span style={{ position: 'absolute', inset: 4, border: '1.5px dashed var(--thread)', pointerEvents: 'none' }} />
      {img ? <div style={{ aspectRatio: '1', background: 'var(--bone-100) url(' + img + ') center/cover no-repeat' }} /> : <div style={{ aspectRatio: '1', display: 'grid', placeItems: 'center', color: 'var(--taupe-500)', font: 'var(--text-heading)' }}>—</div>}
      <span style={{ ...caps, color: 'var(--ink-900)' }}>{label}</span>
      {note && <span style={{ ...caps, fontSize: 10, color: 'var(--text-secondary)' }}>{note}</span>}
    </button>
  );
  const grid = children => <div className="dz-patches" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>{children}</div>;
  const parts = LK.ROOT + 'parts/';

  // what to show for the current step
  let body = null;
  if (cur.k === 'base') body = grid(D.products.map(p => patch(p.id, p.name.replace(/^The /, ''), p.image, (polo ? 'the-polo' : cfg.base) === p.id, () => set({ base: p.id === 'the-polo' ? 'polo' : p.id }), formatNaira(p.price))));
  else if (cur.k === 'colour') body = polo
    ? <SwatchGroup inverse options={Object.keys(LK.COLORS).map(c => ({ value: c, label: LK.COLORS[c].name, color: LK.COLORS[c].hex }))} value={cfg.color} onChange={v => set({ color: v })} />
    : <div style={{ display: 'grid', gap: 18 }}>
        <SwatchGroup inverse options={s.colours.map(c => ({ value: c, label: SYS.COLOURS[c].name, color: D.swatch[c] }))} value={cfg.color} onChange={v => set({ color: v })} />
        {s.colours.length < 2 && <span style={{ ...caps, color: 'var(--text-on-denim-muted)' }}>More colours are in sampling.</span>}
      </div>;
  else if (cur.k === 'version') body = grid(s.versions.map((v, i) => patch(i, v[0], SYS.img(s, cfg.color, i), cfg.v === i, () => set({ v: i }), v[2] ? '+' + formatNaira(v[2]) : v[1])));
  else if (cur.k === 'collar') body = grid([['polo', 'Polo collar'], ['crew', 'Crew neck'], ['mock', 'Mock neck']].map(([v, l]) => patch(v, l, parts + 'collar-' + v + '.jpg', cfg.collar === v, () => set({ collar: v }), v === 'mock' ? 'In sampling' : null, v === 'mock')));
  else if (cur.k === 'sleeve') body = grid([['short', 'Short'], ['long', 'Long'], ['raglan', 'Raglan']].map(([v, l]) => patch(v, l, parts + 'sleeve-' + v + '.jpg', cfg.sleeve === v, () => set({ sleeve: v }), v === 'raglan' ? 'In sampling' : (P.sleeve[v] ? '+' + formatNaira(P.sleeve[v]) : null), v === 'raglan')));
  else if (cur.k === 'attach') body = <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 8 }}>
    {[['pocket', !cfg.pocket, 'Utility pocket', P.pocket, 'button', cfg.pocket], ['panels', !cfg.panels, 'Side panels', P.panels, 'zip', cfg.panels],
      ['hem', cfg.hem === 'charm' ? 'none' : 'charm', 'Leaf charm', P.hem.charm, 'pin', cfg.hem === 'charm'], ['hem', cfg.hem === 'strap' ? 'none' : 'strap', 'Hem strap', P.hem.strap, 'buckle', cfg.hem === 'strap']]
      .map(([k, val, l, v, ic, on]) => <OptionChip inverse key={l} selected={on} icon={<FashionIcon name={ic} size={16} active={on} />} meta={'+' + formatNaira(v)} onClick={() => set({ [k]: val })}>{l}</OptionChip>)}
  </div>;
  else if (cur.k === 'finish') body = grid(Object.keys(LK.HARDWARE).map(k => patch(k, LK.HARDWARE[k].name, parts + 'hw-' + k + '.jpg', cfg.hardware === k, () => set({ hardware: k }))));

  // touch the garment: the polo's parts open their own step; a photographed piece opens its versions
  const hot = (k, box, label) => <button key={label} aria-label={label} title={label} onClick={() => { setStep(steps.findIndex(x => x.k === k)); setPicking(true); }}
    className="dz-hot" style={{ position: 'absolute', left: box[0] + '%', top: box[1] + '%', width: box[2] + '%', height: box[3] + '%', background: 'transparent', border: 0, cursor: 'pointer' }} />;

  return (
    <div className="dz-studio" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', minHeight: 'calc(100vh - 76px)', color: 'var(--bone-100)' }}>
      <div style={{ position: 'relative', background: 'var(--fabric-pattern-paper)', display: 'grid', placeItems: 'center', padding: 'var(--space-9) var(--space-8) var(--space-10)', color: 'var(--ink-900)', boxShadow: 'inset -12px 0 24px -16px rgba(0,0,0,.4)', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30, background: 'linear-gradient(90deg, rgba(21,17,13,.55) 1px, transparent 1px) 0 100%/12px 8px repeat-x, linear-gradient(90deg, rgba(21,17,13,.7) 1px, transparent 1px) 0 100%/60px 16px repeat-x, #E9D9A8', borderBottom: '1px solid rgba(21,17,13,.25)' }} />
        <div style={{ position: 'relative', width: '62%', maxWidth: 480, mixBlendMode: 'multiply', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 2%, #000 98%, transparent), linear-gradient(transparent, #000 3%, #000 97%, transparent)', WebkitMaskComposite: 'source-in', maskImage: 'linear-gradient(90deg, transparent, #000 2%, #000 98%, transparent), linear-gradient(transparent, #000 3%, #000 97%, transparent)', maskComposite: 'intersect', transform: picking ? 'translateY(-10px) scale(.98)' : 'none', transition: 'transform var(--dur-slow) var(--ease-out)' }}>
          {polo ? <PoloLook state={cfg} animate style={{ width: '100%' }} />
            : <img key={image} src={image} alt={name + ', ' + s.versions[cfg.v][0]} style={{ display: 'block', width: '100%', aspectRatio: '4 / 5', animation: 'dz-rise 600ms var(--ease-out) both' }} />}
          {polo ? [hot('collar', [34, 8, 32, 20], 'Change the collar'), hot('sleeve', [0, 24, 22, 36], 'Change the sleeves'), hot('sleeve', [78, 24, 22, 36], 'Change the sleeves'),
              hot('attach', [58, 27, 22, 20], 'Change the attachments'), hot('attach', [62, 78, 20, 16], 'Change what hangs here'), hot('colour', [28, 45, 34, 36], 'Change the colour')]
            : hot('version', [10, 4, 80, 90], 'Change the version')}
        </div>
        <Stitched surface="denim" padding="16px 20px" style={{ position: 'absolute', left: 'var(--space-6)', bottom: 'var(--space-6)', right: 'var(--space-6)', maxWidth: 420, display: 'grid', gap: 8, color: 'var(--bone-100)' }}>
          <Eyebrow color="var(--thread)">Your design</Eyebrow>
          <div style={{ font: 'var(--text-heading-s)' }}>{name} · {colourName}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{tags.filter(Boolean).map(a => <Tag key={a} tone="brass">{a}</Tag>)}</div>
        </Stitched>
        <span style={{ position: 'absolute', right: 'var(--space-6)', top: 52, font: 'var(--text-eyebrow)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Touch any part to change it</span>
      </div>
      <aside style={{ minWidth: 0, background: 'var(--fabric-denim)', padding: 'var(--space-7) var(--gutter)', display: 'grid', alignContent: 'start', gap: 32 }}>
        <div style={{ display: 'grid', gap: 16 }}>
          <Eyebrow rule color="var(--thread)">The DOZI Design</Eyebrow>
          <h1 style={{ margin: 0, font: 'var(--text-display-m)' }}>Choose a base.<br /><em>Decide how it becomes yours.</em></h1>
        </div>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(' + steps.length + ',1fr)' }}>
          <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1.5, background: 'var(--stitch-h)', opacity: .5 }} />
          {steps.map((x, i) => (
            <button key={x.k} onClick={() => { setStep(i); setPicking(false); }} style={{ position: 'relative', background: 'none', border: 0, padding: '0 0 14px', textAlign: 'left', cursor: 'pointer', display: 'grid', gap: 8, color: x === cur ? 'var(--thread)' : 'var(--text-on-denim-muted)' }}>
              <FashionIcon name={x.ic} size={22} active={x === cur} />
              <span style={{ display: 'grid', gap: 2, font: 'var(--text-label)', letterSpacing: '0.12em', textTransform: 'uppercase' }}><span style={{ font: 'var(--text-caption)', opacity: .7 }}>0{i + 1}</span><span className="dz-step-t">{x.t}</span></span>
              {x === cur && <span style={{ position: 'absolute', left: 0, right: 8, bottom: -1, height: 3, background: 'var(--thread)' }} />}
            </button>
          ))}
        </div>
        <div style={{ minHeight: 200, maxHeight: cur.k === 'base' ? '52vh' : undefined, overflowY: cur.k === 'base' ? 'auto' : undefined, padding: 4 }}>{body}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...caps }}><span>Total</span><Price amount={price} style={{ font: 'var(--text-body-l)' }} /></div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="thread" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</Button>
          {step < steps.length - 1 ? <Button variant="patch" style={{ flex: 1 }} onClick={() => setStep(step + 1)}>Next — {steps[step + 1].t}</Button>
            : <Button variant="patch" style={{ flex: 1 }} onClick={() => addToBag({ id: 'studio-' + cfg.base, name: name + ' — Your design', detail: polo ? tags.join(', ') : s.versions[cfg.v][0], colour: colourName, price, image, state: cfg })}>Add your design to bag</Button>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <ArrowLink inverse onClick={e => { e.preventDefault(); navigator.clipboard && navigator.clipboard.writeText(location.href).then(() => toast('Link copied')); }}>Copy link to this design</ArrowLink>
          <ArrowLink inverse onClick={e => { e.preventDefault(); go({ page: 'product', id: polo ? 'the-polo' : cfg.base }); }}>View the base</ArrowLink>
        </div>
      </aside>
    </div>
  );
}
