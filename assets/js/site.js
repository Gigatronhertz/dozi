/* ==========================================================================
   DOZI site: catalogue, chrome (nav / footer), bag, search, saved designs
   ========================================================================== */
(function (global) {
  "use strict";

  var DOZI = global.DOZI = global.DOZI || {};
  var IMG = "assets/img/";

  /* ---------- Catalogue (prices are placeholders) ---------- */
  // The Polo is designed part by part; every other piece is a photographed system of versions.
  var PRODUCTS = [
    { id: "the-polo", name: "The Polo", price: 68000, cat: "tops", collection: "utility", material: "Navy / Heavy Cotton Piqué", image: "studio/base/polo-short-navy-brass.jpg", flat: true, design: true,
      blurb: "An oversized, heavyweight polo cut as a base. The collar and sleeves zip off, the side seams take panels, the chest takes a pocket and the hem loop takes a charm or a strap." }
  ].concat(DOZI.systems.list.map(function (x) {
    return { id: x.id, name: x.name, price: x.price, cat: x.cat, collection: x.collection, material: x.material, blurb: x.blurb,
      image: "systems/" + x.id + "-" + x.colours[0] + "-1.jpg", hero: "systems/" + x.id + "-" + x.colours[0] + "-" + x.versions.length + ".jpg", flat: true, system: true };
  }));

  var COLLECTIONS = [
    { id: "utility", name: "Modular Utility", colour: "#3F3D2C", image: "systems/jacket-olive-5.jpg", line: "One garment. Many versions.", body: "The Polo, the Core Jacket, the Core Tee and the Baggy Trouser: zip channels, snap rails and parts that move between them." },
    { id: "dresses", name: "Dresses", colour: "#6B1F26", image: "systems/dress-burgundy-2.jpg", line: "One dress. Many expressions.", body: "Navy, burgundy and washed denim dresses with zip-off skirts, changing necklines, cargo pockets and harnesses." },
    { id: "denim", name: "Modular Denim", colour: "#22304F", image: "systems/suit-indigo-4.jpg", line: "Tailoring that comes apart.", body: "Indigo suits and coats with zip-off hems, snap-on vests and clip-on pocket rigs." },
    { id: "footwear", name: "Footwear", colour: "#1F2B4D", image: "systems/heel-navy-3.jpg", line: "Walk. Detach. Attach.", body: "A pump that becomes a knee boot, a sneaker that becomes a utility boot: shafts, straps and pouches zip and buckle on." },
    { id: "carry", name: "Carry", colour: "#22304F", image: "systems/bag-indigo-1.jpg", line: "Carry it your way.", body: "Pouches and straps move from bag to bag: backpack, messenger, chest rig, duffel, tote." },
    { id: "corporate", name: "The Set", colour: "#1F2B4D", image: "systems/set-trouser-navy-1.jpg", line: "One trouser. Seven versions.", body: "The wide pleated trouser with a strap rail, D-rings, zip-off legs, contrast panels and cuffs." }
  ];

  /* ---------- Pricing for the designable polo (placeholders) ---------- */
  var DESIGN_PRICES = {
    base: 68000,
    sleeve: { short: 0, long: 6000 },
    pocket: 9500, panels: 7500,
    hem: { none: 0, charm: 6000, strap: 12000 }
  };
  function designPrice(state) {
    var s = DOZI.look.normalize(state);
    return DESIGN_PRICES.base + DESIGN_PRICES.sleeve[s.sleeve] + (s.pocket ? DESIGN_PRICES.pocket : 0) +
      (s.panels ? DESIGN_PRICES.panels : 0) + DESIGN_PRICES.hem[s.hem];
  }
  var LABELS = {
    collar: { polo: "Polo Collar", crew: "Crew Neck", mock: "Mock Neck" },
    sleeve: { short: "Short", long: "Long", raglan: "Raglan" },
    hem: { none: "None", charm: "Leaf Charm", strap: "Hem Strap" }
  };
  function designSummary(state) {
    var s = DOZI.look.normalize(state), L = DOZI.look;
    var att = [];
    if (s.pocket) att.push("Utility Pocket");
    if (s.panels) att.push("Side Panels");
    if (s.hem !== "none") att.push(LABELS.hem[s.hem]);
    return [
      ["Base", "The Polo"],
      ["Fit", "Oversized"],
      ["Colour", L.COLORS[s.color].name],
      ["Collar", LABELS.collar[s.collar]],
      ["Sleeve", LABELS.sleeve[s.sleeve]],
      ["Attach", att.length ? att.join(", ") : "None"],
      ["Finish", L.HARDWARE[s.hardware].name]
    ];
  }

  function money(n) { return "₦" + Number(n).toLocaleString("en-NG"); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- Storage (per-viewer conveniences only) ---------- */
  function load(key, fallback) {
    try { var v = localStorage.getItem("dozi:" + key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, val) { try { localStorage.setItem("dozi:" + key, JSON.stringify(val)); } catch (e) { /* storage unavailable */ } }

  /* ---------- Logo ---------- */
  function mark(cls) {
    return '<svg class="' + (cls || "mark") + '" viewBox="0 0 100 100" aria-hidden="true">' +
      '<path fill="currentColor" d="M12 92C2 60 18 14 70 8L84 8C66 30 40 58 12 92Z"/>' +
      '<path fill="currentColor" d="M24 96C54 66 74 40 92 12C100 50 84 92 24 96Z"/></svg>';
  }

  /* ---------- Chrome ---------- */
  function navHtml(active) {
    var link = function (key, href, label) { return '<a href="' + href + '" data-key="' + key + '"' + (active === key ? ' aria-current="page"' : "") + ">" + label + "</a>"; };
    return '<header class="nav">' +
      '<button class="nav__menu caps" data-open="menu" aria-label="Menu">Menu</button>' +
      '<a class="nav__brand wordmark" href="index.html" aria-label="DOZI home">' + mark() + "<span>DOZI</span></a>" +
      '<nav class="nav__center nav__primary" aria-label="Primary">' +
        link("shop", "shop.html", "Shop") + link("design", "design.html", "Design") + link("collections", "collections.html", "Collections") + link("about", "about.html", "About") +
      "</nav>" +
      '<div class="nav__utility">' +
        '<button data-open="search">Search</button><button data-open="account">Account</button>' +
        '<button data-open="bag">Bag <span class="bag-count">(0)</span></button>' +
      "</div></header>" +
      '<div class="menu" id="menu">' +
        link("shop", "shop.html", "Shop") + link("design", "design.html", "Design") + link("collections", "collections.html", "Collections") + link("about", "about.html", "About") +
        '<button data-open="search">Search</button><button data-open="account">Saved designs</button>' +
        '<span class="caps muted">Design — Made for you.</span></div>';
  }

  function footerHtml() {
    return '<footer class="footer"><div class="footer__grid">' +
      '<div><a class="wordmark" href="index.html">' + mark() + "<span>DOZI</span></a>" +
        '<p class="footer__sign">Made by us.<br>Made yours.</p>' +
        '<form class="newsletter" onsubmit="event.preventDefault();DOZI.toast(\'You are on the list\');this.reset();">' +
        '<input type="email" required placeholder="Email for new chapters" aria-label="Email"><button class="caps-sm" type="submit">Join</button></form></div>' +
      '<div><h4 class="caps">Shop</h4><ul><li><a href="shop.html">All</a></li><li><a href="shop.html#tops">Tops</a></li><li><a href="shop.html#bottoms">Bottoms</a></li><li><a href="shop.html#outerwear">Outerwear</a></li><li><a href="shop.html#footwear">Footwear</a></li><li><a href="shop.html#bags">Bags</a></li></ul></div>' +
      '<div><h4 class="caps">Studio</h4><ul><li><a href="design.html">The DOZI Design</a></li><li><a href="product.html?id=the-polo">The Polo</a></li><li><a href="collections.html">Collections</a></li><li><button data-open="account">Saved designs</button></li></ul></div>' +
      '<div><h4 class="caps">House</h4><ul><li><a href="about.html">About</a></li><li><a href="about.html#standard">Photography standard</a></li><li><a href="about.html#care">Care &amp; repair</a></li><li><a href="mailto:studio@dozi.design">Contact</a></li></ul></div>' +
      '</div><div class="footer__base caps-sm"><span>© DOZI Design</span><span>Lagos — Worldwide</span><span>Cut / Overlap / Shift / Reassemble</span></div></footer>';
  }

  function panelsHtml() {
    return '<div class="scrim" data-close></div>' +
      '<aside class="panel" id="bag" aria-label="Bag"><div class="panel__head"><span class="caps">Bag</span><button class="caps-sm" data-close>Close</button></div>' +
        '<div class="panel__body" data-bag-body></div><div class="panel__foot" data-bag-foot></div></aside>' +
      '<aside class="panel" id="account" aria-label="Saved designs"><div class="panel__head"><span class="caps">Saved designs</span><button class="caps-sm" data-close>Close</button></div>' +
        '<div class="panel__body" data-saved-body></div><div class="panel__foot"><a class="btn btn--ghost btn--block" href="design.html">Start a new design</a></div></aside>' +
      '<aside class="panel panel--top" id="search" aria-label="Search"><div class="wrap" style="padding-top:28px;padding-bottom:36px">' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:18px"><span class="caps muted">Search DOZI</span><button class="caps-sm" data-close>Close</button></div>' +
        '<input class="search-input" type="search" placeholder="Polo, jacket, oxide…" data-search-input aria-label="Search">' +
        '<div class="search-results" data-search-results></div></div></aside>' +
      '<div class="toast" role="status" aria-live="polite"></div>';
  }

  /* ---------- Panels ---------- */
  var openPanel = null;
  function open(id) {
    if (id === "menu") { document.getElementById("menu").classList.toggle("is-open"); return; }
    closeAll();
    var p = document.getElementById(id);
    if (!p) return;
    if (id === "bag") renderBag();
    if (id === "account") renderSaved();
    if (id === "search") { renderSearch(""); setTimeout(function () { p.querySelector("input").focus(); }, 300); }
    p.classList.add("is-open");
    document.querySelector(".scrim").classList.add("is-open");
    openPanel = p;
  }
  function closeAll() {
    document.querySelectorAll(".panel.is-open, .scrim.is-open, .menu.is-open").forEach(function (el) { el.classList.remove("is-open"); });
    openPanel = null;
  }

  /* ---------- Bag ---------- */
  function bag() { return load("bag", []); }
  function updateCount() {
    var n = bag().length;
    document.querySelectorAll(".bag-count").forEach(function (el) { el.textContent = "(" + n + ")"; });
  }
  function addToBag(item) {
    var b = bag(); b.push(Object.assign({ key: Date.now() + "-" + Math.random().toString(36).slice(2, 7) }, item)); save("bag", b);
    updateCount();
    open("bag");
  }
  function isSystem(st) { return st && st.base && st.base !== "polo" && DOZI.systems.get(st.base); }
  function anyPrice(st) { return isSystem(st) ? DOZI.systems.price(st) : designPrice(st); }
  function itemThumb(it) {
    if (it.design && isSystem(it.design)) { var n = DOZI.systems.normalize(it.design); return '<div class="frame frame--flat"><img src="' + DOZI.systems.img(DOZI.systems.get(n.base), n.color, n.v) + '" alt=""></div>'; }
    if (it.design) return '<div class="frame frame--look">' + DOZI.look.html(it.design) + "</div>";
    return '<div class="frame' + (it.flat ? " frame--flat" : "") + '"><img src="' + IMG + it.image + '" alt=""></div>';
  }
  function renderBag() {
    var b = bag(), body = document.querySelector("[data-bag-body]"), foot = document.querySelector("[data-bag-foot]");
    if (!b.length) {
      body.innerHTML = '<p class="empty">Your bag is empty.<br><em>Start with a base.</em></p>';
      foot.innerHTML = '<a class="btn btn--block" href="design.html">Explore the design</a>';
      return;
    }
    var total = 0;
    body.innerHTML = b.map(function (it) {
      total += it.price;
      var dl = (it.spec || []).map(function (r) { return "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("");
      return '<div class="line-item">' + itemThumb(it) +
        '<div><div class="caps">' + esc(it.name) + '</div><div class="caption" style="margin-top:4px"><span class="price">' + money(it.price) + "</span></div><dl>" + dl + "</dl></div>" +
        '<button class="remove" data-remove="' + it.key + '">Remove</button></div>';
    }).join("");
    foot.innerHTML = '<div class="total caps"><span>Total</span><span>' + money(total) + '</span></div>' +
      '<button class="btn btn--block" onclick="DOZI.toast(\'Checkout opens with launch\')">Checkout</button>' +
      '<span class="caps-sm muted" style="text-align:center">Every DOZI piece is made to order in Lagos</span>';
  }

  /* ---------- Saved designs ---------- */
  function renderSaved() {
    var list = load("saved", []), body = document.querySelector("[data-saved-body]");
    if (!list.length) { body.innerHTML = '<p class="empty">No saved designs yet.<br><em>Make one yours.</em></p>'; return; }
    body.innerHTML = list.map(function (d, i) {
      return '<div class="line-item">' + itemThumb({ design: d.state }) +
        '<div><div class="caps">' + esc(d.name) + '</div><div class="caption" style="margin-top:4px"><span class="price">' + money(anyPrice(d.state)) + '</span></div>' +
        '<a class="link-arrow" style="margin-top:12px" href="design.html#' + encodeURIComponent(JSON.stringify(d.state)) + '">Open in studio</a></div>' +
        '<button class="remove" data-unsave="' + i + '">Remove</button></div>';
    }).join("");
  }

  /* ---------- Search ---------- */
  function renderSearch(q) {
    q = q.trim().toLowerCase();
    var res = PRODUCTS.filter(function (p) { return !q || (p.name + " " + p.material + " " + p.cat + " " + p.collection).toLowerCase().indexOf(q) > -1; });
    document.querySelector("[data-search-results]").innerHTML = res.length ? res.map(cardMini).join("") : '<p class="muted">Nothing yet. Try “jacket” or “oxide”.</p>';
  }
  function cardMini(p) {
    return '<a href="product.html?id=' + p.id + '"><div class="frame' + (p.flat ? " frame--flat" : "") + '"><img loading="lazy" src="' + IMG + p.image + '" alt="' + esc(p.name) + '"></div>' +
      '<div class="caption"><span class="name">' + esc(p.name) + '</span><span class="price">' + money(p.price) + "</span></div></a>";
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = document.querySelector(".toast"); if (!t) return;
    t.textContent = msg; t.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("is-on"); }, 2600);
  }

  /* ---------- Reveal on scroll ---------- */
  function reveals() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in global)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Boot ---------- */
  function boot() {
    var active = document.body.getAttribute("data-page");
    document.body.insertAdjacentHTML("afterbegin", navHtml(active));
    if (!document.body.hasAttribute("data-no-footer")) document.body.insertAdjacentHTML("beforeend", footerHtml());
    document.body.insertAdjacentHTML("beforeend", panelsHtml());
    document.querySelectorAll("[data-mark]").forEach(function (el) { el.innerHTML = mark(el.getAttribute("data-mark") || "mark"); });

    document.addEventListener("click", function (e) {
      var o = e.target.closest("[data-open]");
      if (o) { e.preventDefault(); open(o.getAttribute("data-open")); return; }
      if (e.target.closest("[data-close]")) { closeAll(); return; }
      var r = e.target.closest("[data-remove]");
      if (r) { save("bag", bag().filter(function (it) { return it.key !== r.getAttribute("data-remove"); })); updateCount(); renderBag(); return; }
      var u = e.target.closest("[data-unsave]");
      if (u) { var l = load("saved", []); l.splice(+u.getAttribute("data-unsave"), 1); save("saved", l); renderSaved(); }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });
    document.querySelector("[data-search-input]").addEventListener("input", function (e) { renderSearch(e.target.value); });
    updateCount();
    reveals();
  }

  Object.assign(DOZI, {
    IMG: IMG, PRODUCTS: PRODUCTS, COLLECTIONS: COLLECTIONS, LABELS: LABELS, DESIGN_PRICES: DESIGN_PRICES,
    product: function (id) { return PRODUCTS.filter(function (p) { return p.id === id; })[0]; },
    designPrice: designPrice, designSummary: designSummary, anyPrice: anyPrice,
    money: money, esc: esc, load: load, save: save, mark: mark,
    addToBag: addToBag, toast: toast, open: open, reveals: reveals
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})(window);
