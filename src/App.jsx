function App() {
  const [route, setRoute] = React.useState(parseRoute);
  const [bag, setBag] = React.useState(() => loadJSON('dozi:bag', []));
  const [bagOpen, setBagOpen] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const timer = React.useRef(0);
  const toast = m => { setMsg(m); clearTimeout(timer.current); timer.current = setTimeout(() => setMsg(''), 2400); };
  React.useEffect(() => saveJSON('dozi:bag', bag), [bag]);
  React.useEffect(() => {
    const on = () => setRoute(parseRoute());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  React.useEffect(() => {
    if (route.anchor) setTimeout(() => { const el = document.getElementById(route.anchor); if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' }); }, 60);
  }, [route]);
  React.useEffect(() => {
    const p = route.page === 'product' && window.DOZI_DATA.products.find(x => x.id === route.id);
    document.title = p ? p.name + ' — DOZI' : { shop: 'Shop — DOZI', studio: 'The DOZI Design — Studio' }[route.page] || 'DOZI — Design. Made for you.';
  }, [route]);
  const go = r => {
    const hash = routeHash(r);
    if (location.hash !== hash) history.pushState(null, '', hash);
    setRoute({ ...parseRoute(), anchor: r.anchor, search: r.search });
    if (!r.anchor) window.scrollTo(0, 0);
  };
  const openProduct = id => go({ page: 'product', id });
  const addToBag = item => { setBag(b => [...b, { ...item, qty: 1 }]); setBagOpen(true); };
  const setQty = (i, q) => setBag(b => q === 0 ? b.filter((_, j) => j !== i) : b.map((x, j) => j === i ? { ...x, qty: q } : x));
  return (
    <div>
      <Header page={route.page} go={go} bagCount={bag.reduce((s, i) => s + i.qty, 0)} openBag={() => setBagOpen(true)} />
      <main data-screen-label={route.page}>
        {route.page === 'home' && <Home go={go} openProduct={openProduct} />}
        {route.page === 'shop' && <Shop cat={route.cat} search={route.search} go={go} openProduct={openProduct} />}
        {route.page === 'product' && <Product key={route.id} id={route.id} addToBag={addToBag} go={go} toast={toast} />}
        {route.page === 'studio' && <Studio initial={route.state} addToBag={addToBag} go={go} toast={toast} />}
      </main>
      <Footer go={go} toast={toast} />
      <BagDrawer open={bagOpen} items={bag} setQty={setQty} close={() => setBagOpen(false)} toast={toast} />
      <Toast msg={msg} />
    </div>
  );
}
