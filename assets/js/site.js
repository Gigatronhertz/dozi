/* ==========================================================================
   DOZI site: catalogue, chrome (nav / footer), bag, search, saved designs
   ========================================================================== */
(function (global) {
  "use strict";

  var DOZI = global.DOZI = global.DOZI || {};
  var IMG = "assets/img/";

  /* ---------- Catalogue (prices are placeholders) ---------- */
  var PRODUCTS = [
    { id: "the-polo", name: "The Polo", price: 68000, cat: "tops", collection: "utility", material: "Navy / Heavy Cotton Piqué", image: "lookbook/polo-model-01.jpg", design: true,
      blurb: "An oversized, heavyweight polo cut as a base. The collar and sleeves zip off, the side seams take panels, the chest takes a pocket and the hem loop takes a charm or a strap." },
    { id: "the-set", name: "The Set", price: 160000, cat: "tops", collection: "corporate", material: "Polo + Wide Trouser", image: "campaign-oxide-pair.jpg",
      blurb: "The Polo with the pleated wide trouser, cut to be worn as one colour or broken up. Both pieces take the same attachments.",
      options: [["Colour", ["Oxide", "Navy", "Burgundy"]], ["Jacket", ["Without", "With jacket"]], ["Tie", ["None", "Matching"]]],
      changes: [["lookbook/polo-model-01.jpg", "Base"], ["campaign-navy-polo.jpg", "Add"], ["campaign-oxide-pair.jpg", "Transform"]] },
    { id: "denim-suit", name: "The Denim Suit", price: 210000, cat: "outerwear", collection: "denim", material: "Raw Indigo / 14oz Denim", image: "lookbook/suit-01.jpg", flat: true,
      blurb: "Tailoring that comes apart. Zip-in welt pockets, a snap-on patch-pocket vest and a trouser that converts to cargo.",
      options: [["Jacket", ["Single-breasted", "Double-breasted", "Utility"]], ["Vest", ["None", "Patch-pocket vest"]], ["Trouser", ["Straight", "Cargo"]]],
      changes: [["lookbook/suit-01.jpg", "Base"], ["lookbook/suit-02.jpg", "Add"], ["lookbook/suit-05.jpg", "Transform"]] },
    { id: "denim-coat", name: "The Denim Coat", price: 240000, cat: "outerwear", collection: "denim", material: "Washed Indigo Denim", image: "lookbook/denim-03.jpg", flat: true,
      blurb: "A long coat with a zip-off skirt, removable belt and snap-on storm flap. Shorten it to a jacket in one zip.",
      options: [["Length", ["Long", "Zip-off jacket"]], ["Belt", ["None", "Self belt"]], ["Collar", ["Notch", "Storm flap"]]],
      changes: [["lookbook/denim-01.jpg", "Base"], ["lookbook/denim-02.jpg", "Add"], ["lookbook/denim-03.jpg", "Transform"]] },
    { id: "denim-utility", name: "The Utility Denim Set", price: 230000, cat: "outerwear", collection: "denim", material: "Indigo / Black Panels", image: "lookbook/denim-05.jpg", flat: true,
      blurb: "Field jacket and wide trouser with zip-in contrast panels, D-rings and buckle straps at the knee and ankle.",
      options: [["Panels", ["Black", "Indigo", "None"]], ["Ankle", ["Open", "Strapped"]]],
      changes: [["lookbook/denim-04.jpg", "Base"], ["lookbook/denim-05.jpg", "Transform"]] },
    { id: "column-dress", name: "The Column Dress", price: 175000, cat: "dresses", collection: "denim", material: "Navy / Cotton Twill", image: "lookbook/dress-01.jpg", flat: true,
      blurb: "One dress, several necklines and two lengths. The skirt zips off to a mini; the harness and cargo pockets snap on.",
      options: [["Neckline", ["Off-shoulder", "Halter", "Straps"]], ["Length", ["Maxi", "Zip-off mini"]], ["Utility", ["None", "Cargo pockets", "Harness"]]],
      changes: [["lookbook/dress-03.jpg", "Base"], ["lookbook/dress-01.jpg", "Add"], ["lookbook/dress-05.jpg", "Transform"]] },
    { id: "denim-carry", name: "The Denim Carry System", price: 150000, cat: "bags", collection: "denim", material: "Patchwork Indigo / Brass", image: "lookbook/lineup-bags.jpg", flat: true,
      blurb: "Pouches, straps and harnesses that move between a backpack, a messenger, a chest rig, a duffel and a tote.",
      options: [["Base", ["Backpack", "Messenger", "Chest rig", "Duffel", "Tote"]], ["Pouches", ["Two", "Four"]]],
      changes: [["lookbook/lineup-bags.jpg", "Base"]] },
    { id: "wide-trouser", name: "The Wide Trouser", price: 92000, cat: "bottoms", collection: "corporate", material: "Chocolate / Wool Twill", image: "look-corporate.jpg",
      blurb: "High-rise and double-pleated, with a hidden rail at the waist for straps, charms and trouser attachments.",
      options: [["Waist", ["Plain", "Belted", "Strap rail"]], ["Attachment", ["None", "Leather strap", "Chain"]], ["Charm", ["None", "DOZI", "Pearl"]]],
      changes: [["look-corporate-side.jpg", "Base"], ["detail-hangtag.jpg", "Add"], ["look-corporate.jpg", "Transform"]] },
    { id: "core-tee", name: "The Core Tee", price: 45000, cat: "tops", collection: "utility", material: "Black / Cotton Jersey", image: "p-core-tee.jpg", flat: true,
      blurb: "The simplest DOZI base. Zip channels at the sides take panels, pockets and straps.",
      options: [["Side panel", ["None", "Olive", "Cream", "Oxide"]], ["Sleeve", ["Short", "Long", "Raglan"]], ["Pocket", ["None", "Clip-on", "Zip-on"]]],
      changes: [["p-core-tee.jpg", "Base"], ["p-panel-tee.jpg", "Add"], ["p-utility-tee.jpg", "Transform"]] },
    { id: "raglan-tee", name: "The Raglan Tee", price: 52000, cat: "tops", collection: "utility", material: "Olive / Oxide Sleeves", image: "p-raglan-tee.jpg", flat: true,
      blurb: "Contrast raglan sleeves that unzip at the seam. Swap them for long sleeves when the weather turns.",
      options: [["Sleeve", ["Oxide", "Black", "Cream"]], ["Length", ["Short", "Long"]]],
      changes: [["p-core-tee.jpg", "Base"], ["p-raglan-tee.jpg", "Add"], ["p-crop-tee.jpg", "Transform"]] },
    { id: "core-jacket", name: "The Core Jacket", price: 185000, cat: "outerwear", collection: "utility", material: "Black / Waxed Cotton", image: "look-jacket.jpg",
      blurb: "One jacket, many versions. Sleeves, hood, pockets and panels all detach, so the jacket can be a vest, a parka or something in between.",
      options: [["Hood", ["None", "Black", "Olive", "Cream"]], ["Sleeves", ["Black", "Olive", "Oxide", "Removed"]], ["Pockets", ["Standard", "Utility", "None"]]],
      changes: [["p-core-jacket.jpg", "Base"], ["look-jacket-back.jpg", "Add"], ["p-custom-jacket.jpg", "Transform"]] },
    { id: "cropped-jacket", name: "The Cropped Jacket", price: 165000, cat: "outerwear", collection: "utility", material: "Stone / Black Panels", image: "look-tops.jpg",
      blurb: "Cropped and built from panels. Remove the sleeves for a vest, add a hood, or cut it back to a top.",
      options: [["Sleeves", ["Long", "Short", "Balloon", "Removed"]], ["Hood", ["None", "Black", "Olive", "Cream"]]],
      changes: [["p-crop-jacket.jpg", "Base"], ["look-tops.jpg", "Add"], ["look-tees.jpg", "Transform"]] },
    { id: "modular-sweatpant", name: "The Modular Sweatpant", price: 78000, cat: "bottoms", collection: "utility", material: "Black / Brushed Fleece", image: "look-sweat.jpg",
      blurb: "Cargo panels, leg extensions and ankle options that change the pant from tapered to wide in a few zips.",
      options: [["Panel", ["Olive", "Oxide", "Black"]], ["Ankle", ["Cuffed", "Straight"]], ["Leg", ["Tapered", "Wide"]]],
      changes: [["p-core-sweat.jpg", "Base"], ["p-contrast-sweat.jpg", "Add"], ["look-sweat.jpg", "Transform"]] },
    { id: "cargo-short", name: "The Cargo Short", price: 62000, cat: "bottoms", collection: "utility", material: "Black / Ripstop", image: "look-shorts.jpg",
      blurb: "Detachable pockets, side panels and zip-off legs that make it a long pant again.",
      options: [["Pockets", ["Black", "Olive", "Cream", "Oxide"]], ["Leg", ["Short", "Zip-on extension"]]],
      changes: [["p-cargo-short.jpg", "Base"], ["p-utility-short.jpg", "Add"], ["look-shorts.jpg", "Transform"]] },
    { id: "backpack", name: "The Backpack", price: 120000, cat: "bags", collection: "carry", material: "Black / Olive Canvas", image: "p-backpack.jpg", flat: true,
      blurb: "Pouches, panels and straps move between every DOZI bag. Carry it as a backpack today and a tote tomorrow.",
      options: [["Pouches", ["Two", "Four", "None"]], ["Front panel", ["Olive", "Black", "Cream"]]],
      changes: [["p-backpack.jpg", "Base"], ["look-bags.jpg", "Add"], ["p-crossbody.jpg", "Transform"]] },
    { id: "crossbody", name: "The Crossbody", price: 85000, cat: "bags", collection: "carry", material: "Black / Oxide Panel", image: "look-bags.jpg",
      blurb: "Compact, with a swappable front panel and a strap that converts it to shoulder or sling.",
      options: [["Front panel", ["Oxide", "Olive", "Black", "Cream"]], ["Strap", ["Crossbody", "Shoulder", "Sling"]]],
      changes: [["p-crossbody.jpg", "Base"], ["detail-zip.jpg", "Add"], ["look-bags.jpg", "Transform"]] },
    { id: "core-sneaker", name: "The Core Sneaker", price: 140000, cat: "footwear", collection: "footwear", material: "Stone / Olive Leather", image: "look-shoes.jpg",
      blurb: "Side panels, heel modules, tongues and laces that change between street, utility and outdoor.",
      options: [["Side panel", ["Olive", "Black", "Cream", "Oxide"]], ["Laces", ["Black", "Olive", "Cream"]], ["Heel", ["Support", "Aesthetic"]]],
      changes: [["p-core-sneaker.jpg", "Base"], ["p-boot.jpg", "Add"], ["look-shoes.jpg", "Transform"]] },
    { id: "high-top-boot", name: "The High-Top Boot", price: 175000, cat: "footwear", collection: "footwear", material: "Olive / Suede", image: "p-boot.jpg", flat: true,
      blurb: "Extended support with two removable straps. Take the collar off and it is a low trail shoe.",
      options: [["Straps", ["Two", "One", "None"]], ["Collar", ["High", "Low"]]],
      changes: [["p-core-sneaker.jpg", "Base"], ["detail-snap.jpg", "Add"], ["p-boot.jpg", "Transform"]] },
    { id: "heel", name: "The Modular Heel", price: 150000, cat: "footwear", collection: "footwear", material: "Burgundy / Black Leather", image: "look-heels.jpg",
      blurb: "Front panels, ankle straps and heel modules that change a sandal into a statement or a boot.",
      options: [["Front", ["Black", "Cream", "Burgundy", "Olive"]], ["Heel", ["Stiletto", "Block", "Sculpted"]], ["Ankle strap", ["None", "Leather", "Chain"]]],
      changes: [["look-heels.jpg", "Base"], ["detail-snap.jpg", "Add"], ["look-heels.jpg", "Transform"]] },
    { id: "fedora", name: "The Fedora", price: 70000, cat: "hats", collection: "hats", material: "Chocolate / Felt", image: "look-hats.jpg",
      blurb: "Bands, pins and feathers that change it from boardroom to Sunday.",
      options: [["Band", ["Black", "Burgundy", "Tan", "Tweed"]], ["Pin", ["None", "Leaf", "Crest", "Pearl"]], ["Accent", ["None", "Feather"]]],
      changes: [["p-fedora.jpg", "Base"], ["detail-snap.jpg", "Add"], ["look-hats.jpg", "Transform"]] }
  ];

  var COLLECTIONS = [
    { id: "denim", name: "Modular Denim", colour: "#2B3A5C", image: "lookbook/suit-04.jpg", line: "Tailoring that comes apart.", body: "Indigo suits, coats, dresses and bags with zip-off lengths, snap-on pockets and convertible hems." },
    { id: "corporate", name: "Modular Corporate", colour: "#6B1F26", image: "campaign-burgundy-suits.jpg", line: "One outfit. Many expressions.", body: "Ties, cuffs, trouser attachments and charms change a shirt and trouser between the boardroom and the evening." },
    { id: "utility", name: "Modular Utility", colour: "#4D4B31", image: "look-sweat.jpg", line: "One garment. Many versions.", body: "Jackets, tees, sweatpants and shorts with zip channels, snap rails and detachable panels." },
    { id: "footwear", name: "Footwear", colour: "#8E3426", image: "look-shoes.jpg", line: "Walk. Detach. Attach.", body: "Sneakers, boots and heels with side panels, heel modules and swappable straps." },
    { id: "carry", name: "Carry", colour: "#B8AEA0", image: "look-bags.jpg", line: "Carry it your way.", body: "Pouches and straps move from bag to bag, so a backpack becomes a tote or a sling." },
    { id: "hats", name: "Hats", colour: "#4A3025", image: "look-hats.jpg", line: "Timeless materials. Modern people.", body: "Fedoras, berets and caps with bands, pins, feathers and veils you swap." }
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
  function itemThumb(it) {
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
        '<div><div class="caps">' + esc(d.name) + '</div><div class="caption" style="margin-top:4px"><span class="price">' + money(designPrice(d.state)) + '</span></div>' +
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
    designPrice: designPrice, designSummary: designSummary,
    money: money, esc: esc, load: load, save: save, mark: mark,
    addToBag: addToBag, toast: toast, open: open, reveals: reveals
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})(window);
