function Verb({ label, icon }) {
  const [h, setH] = React.useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'default', color: h ? 'var(--thread)' : 'var(--bone-100)', transition: 'color var(--dur-fast)' }}>
      <FashionIcon name={icon} size={26} active={h} />
      <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}
function Pocket() {
  return (
    <div style={{ position: 'relative', width: 'min(360px, 80%)', aspectRatio: '320 / 360', justifySelf: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--fabric-denim-washed)', clipPath: 'polygon(0 0, 100% 0, 96% 78%, 50% 100%, 4% 78%)', filter: 'drop-shadow(0 10px 16px rgba(0,0,0,.6))' }} />
      <svg viewBox="0 0 320 360" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} fill="none" stroke="var(--thread)" strokeWidth="2" strokeDasharray="7 5">
        <polygon points="12,14 308,14 296,276 160,346 24,276" />
        <polygon points="22,24 298,24 287,270 160,334 33,270" />
        <path d="M0 52 H320" strokeDasharray="7 5" />
      </svg>
      <Rivet size={16} style={{ position: 'absolute', left: -4, top: -4 }} />
      <Rivet size={16} style={{ position: 'absolute', right: -4, top: -4 }} />
      <div style={{ position: 'absolute', left: '50%', top: '56%', transform: 'translate(-50%,-50%)', width: '42%' }}>
        <Logo variant="symbol" width="100%" color="var(--thread)" stitched strokeWidth={3} />
      </div>
      <div style={{ position: 'absolute', right: '-14%', top: '8%', transformOrigin: '50% 0', animation: 'dz-sway 3.2s ease-in-out infinite' }}>
        <span style={{ display: 'block', width: 1.5, height: 46, margin: '0 auto', background: 'var(--bone-300)' }} />
        <Stitched surface="bone" padding="26px 16px 18px" inset={5} style={{ width: 118, clipPath: 'polygon(18% 0, 82% 0, 100% 12%, 100% 100%, 0 100%, 0 12%)', display: 'grid', gap: 10, justifyItems: 'center' }}>
          <span style={{ position: 'absolute', top: 9, left: '50%', width: 9, height: 9, marginLeft: -4.5, borderRadius: '50%', background: 'var(--denim-900)' }} />
          <Logo variant="lockup" width={52} color="var(--ink-900)" />
          <span style={{ font: 'var(--text-caption)', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.6 }}>Made by us.<br />Made yours.</span>
        </Stitched>
      </div>
    </div>
  );
}
function Home({ go, openProduct }) {
  const D = window.DOZI_DATA;
  const sectionHead = (eyebrow, title, link) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 24, marginBottom: 'var(--space-7)' }}>
      <div style={{ display: 'grid', gap: 14 }}><Eyebrow color="var(--thread)" rule>{eyebrow}</Eyebrow><h2 style={{ margin: 0, font: 'var(--text-display-m)' }}>{title}</h2></div>
      {link}
    </div>
  );
  return (
    <div style={{ color: 'var(--bone-100)' }}>
      <section className="dz-hero" style={{ background: 'var(--fabric-denim)', minHeight: 'calc(100vh - 76px)', boxSizing: 'border-box', padding: 'var(--space-9) var(--gutter) var(--space-7)', display: 'grid', gridTemplateRows: '1fr auto', gap: 'var(--space-8)' }}>
        <div className="dz-split" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,1fr)', gap: 'var(--space-8)', alignItems: 'center' }}>
          <div style={{ display: 'grid', gap: 28, animation: 'dz-rise 900ms var(--ease-out) both' }}>
            <Eyebrow index="01" rule color="var(--thread)">Chapter — Navy</Eyebrow>
            <h1 style={{ margin: 0, font: 'var(--text-display-xl)', letterSpacing: 'var(--tracking-display)' }}>Design.<br /><em>Made for you.</em></h1>
            <p style={{ margin: 0, font: 'var(--text-body-l)', color: 'var(--text-on-denim-muted)', maxWidth: 440 }}>One base. Worn by one person. Designed by them.</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Button variant="patch" size="lg" onClick={() => go({ page: 'studio' })}>Explore the design</Button>
              <Button variant="thread" size="lg" onClick={() => go({ page: 'shop' })}>Shop the edit</Button>
            </div>
          </div>
          <Pocket />
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, paddingTop: 'var(--space-5)' }}>
          <span style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1.5, background: 'var(--stitch-h)' }} />
          {D.verbs.map(([l, i]) => <Verb key={l} label={l} icon={i} />)}
        </div>
      </section>

      <ZipSeam />

      <section className="dz-split" style={{ background: 'var(--fabric-denim-dark)', padding: 'var(--space-10) var(--gutter)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)', gap: 'var(--space-8)' }}>
        <Eyebrow rule color="var(--thread)">The DOZI Design</Eyebrow>
        <div style={{ display: 'grid', gap: 32 }}>
          <p style={{ margin: 0, font: 'var(--text-display-m)', textWrap: 'pretty' }}>You aren’t browsing clothes. You’re choosing a base, and deciding how it becomes yours.</p>
          <p style={{ margin: 0, font: 'var(--text-body-l)', color: 'var(--text-on-denim-muted)', maxWidth: 560 }}>Every DOZI piece is built from parts: collars, sleeves, panels, straps and charms that cut, overlap, shift and reassemble. We make the base. You make it yours.</p>
        </div>
      </section>

      <Zipper label="The edit" title="Unzip the edit." hint="Pull the zip to open" coverHeight={240}>
        <section style={{ background: 'var(--fabric-denim-washed)', padding: 'var(--space-9) var(--gutter)' }}>
          {sectionHead('The edit', 'Four bases to start from.', <ArrowLink inverse onClick={e => { e.preventDefault(); go({ page: 'shop' }); }}>Shop all</ArrowLink>)}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 'var(--space-6) var(--space-5)' }}>
            {['the-polo', 'jacket', 'dress', 'heel'].map(id => D.products.find(p => p.id === id)).map((p, i) => <ProductCard key={p.id} tilt={[-1, 0.8, -0.5, 1.1][i]} image={p.image} hoverImage={p.hover} name={p.name} detail={p.detail} price={p.price} from={p.from} tag={p.tag} onClick={() => openProduct(p.id)} />)}
          </div>
        </section>
      </Zipper>

      <Zipper label="How it changes" title="Unzip. Remove. Attach. Reassemble." hint="Pull to see how" coverHeight={240} fabric="var(--fabric-denim)">
        <section style={{ background: 'var(--fabric-denim-deep)', padding: 'var(--space-9) var(--gutter)' }}>
          {sectionHead('How it changes', 'Base → Add → Transform.', <ArrowLink inverse onClick={e => { e.preventDefault(); go({ page: 'studio' }); }}>Open the studio</ArrowLink>)}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', gap: 'var(--space-6)', alignItems: 'center', marginBottom: 'var(--space-7)' }}>
            <Stitched surface="bone" padding={16} style={{ display: 'grid', gap: 12 }}><div style={{ aspectRatio: '4/5', background: 'var(--bone-100) url(' + D.products.find(p => p.id === 'jacket').image + ') center/cover' }} /><span style={{ font: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase' }}>Core jacket (standard)</span></Stitched>
            <FashionIcon name="zip" size={44} animate="always" color="var(--thread)" />
            <Stitched surface="bone" padding={16} style={{ display: 'grid', gap: 12 }}><div style={{ aspectRatio: '4/5', background: 'var(--bone-100) url(' + D.products.find(p => p.id === 'jacket').hover + ') center/cover' }} /><span style={{ font: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase' }}>+ Full custom look</span></Stitched>
          </div>
          <div className="dz-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 'var(--space-4)' }}>
            {[['01', 'Unzip', 'zip'], ['02', 'Remove', 'scissors'], ['03', 'Attach', 'button'], ['04', 'Reassemble', 'needle']].map(([n, t, ic]) => (
              <Stitched key={n} surface="dark" padding={24} style={{ display: 'grid', gap: 28 }}>
                <FashionIcon name={ic} size={34} animate="always" color="var(--thread)" />
                <div style={{ display: 'grid', gap: 6 }}><span style={{ font: 'var(--text-caption)', color: 'var(--text-on-denim-muted)' }}>{n}</span><span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' }}>{t}</span></div>
              </Stitched>
            ))}
          </div>
        </section>
      </Zipper>

      <section style={{ background: 'var(--fabric-denim)', padding: 'var(--space-10) var(--gutter)' }}>
        {sectionHead('Cut / Overlap / Shift / Reassemble', 'Key details.')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
          {[[D.img.snap, 'Modular snap', -1.5], [D.img.zip, 'DOZI zip pull', 1], [D.img.label, 'Woven label', -0.6], [D.img.hangtag, 'Made by us. Made yours.', 1.4]].map(([src, t, r]) => (
            <figure key={t} style={{ margin: 0, position: 'relative', transform: 'rotate(' + r + 'deg)' }}>
              <FashionIcon name="pin" size={40} color="var(--bone-200)" stroke={1.8} style={{ position: 'absolute', top: -20, left: '50%', marginLeft: -20, zIndex: 2, transform: 'rotate(-30deg)', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.6))' }} />
              <Stitched surface="bone" padding={12} inset={5} style={{ display: 'grid', gap: 12 }}>
                <div style={{ aspectRatio: '1', background: 'var(--umber-800) url(' + src + ') center/cover' }} />
                <figcaption style={{ font: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', padding: '0 2px 2px' }}>{t}</figcaption>
              </Stitched>
            </figure>
          ))}
        </div>
      </section>

      <ZipSeam />

      <section id="chapters" style={{ background: 'var(--fabric-denim-dark)', padding: 'var(--space-10) var(--gutter)' }}>
        {sectionHead('Chapters', 'One colour per chapter.', <ArrowLink inverse onClick={e => { e.preventDefault(); go({ page: 'shop' }); }}>All collections</ArrowLink>)}
        <div className="dz-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 'var(--space-5)' }}>
          {D.chapters.map(c => <ChapterSwatch key={c.n} c={c} onClick={() => go({ page: c.go[0], id: c.go[1] })} />)}
        </div>
      </section>
    </div>
  );
}
function ChapterSwatch({ c, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <a href="#" onClick={e => { e.preventDefault(); onClick(); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'grid', gap: 14, color: 'var(--bone-100)', transform: h ? 'translateY(-6px)' : 'none', transition: 'transform var(--dur-slow) var(--ease-out)' }}>
      <div style={{ position: 'relative', aspectRatio: '3 / 4', background: 'var(--noise), var(--twill), ' + c.color,
        WebkitMask: 'conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 14px 100%', mask: 'conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 14px 100%', boxShadow: 'var(--shadow-patch)' }}>
        <span style={{ position: 'absolute', inset: '10px 10px 18px', border: '1.5px dashed var(--thread)' }} />
        <span style={{ position: 'absolute', top: 22, left: 22, font: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)' }}>{c.n}</span>
        <Rivet size={12} style={{ position: 'absolute', top: 22, right: 22 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ font: 'var(--text-heading)' }}>{c.name}</span>
        <FashionIcon name="scissors" size={20} active={h} color="var(--thread)" />
      </div>
    </a>
  );
}
