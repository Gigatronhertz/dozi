/* ==========================================================================
   THE DOZI DESIGN — studio (photographic)
   Choose a base, then decide how it becomes yours. Every part on stage is a
   real photograph: collar and sleeve lift off the garment, a component tray
   opens with the photographed parts, and the chosen part clicks back on.
   ========================================================================== */
(function () {
  "use strict";

  var LK = DOZI.look, L = DOZI.LABELS, P = DOZI.DESIGN_PRICES;
  var root = document.querySelector("[data-studio]");
  if (!root) return;

  var PARTS = LK.ROOT + "parts/";
  var COLOR_KEYS = Object.keys(LK.COLORS);

  var STEPS = [
    { key: "base", label: "Base" },
    { key: "fit", label: "Fit" },
    { key: "color", label: "Colour" },
    { key: "collar", label: "Collar" },
    { key: "sleeve", label: "Sleeve" },
    { key: "attach", label: "Attachments" },
    { key: "finish", label: "Finish" }
  ];

  // Component options, each with its real photograph.
  var OPTIONS = {
    base: [
      { v: "polo", label: "The Polo", img: LK.ROOT + "base/polo-short-navy-brass.jpg", note: DOZI.money(P.base) },
    ].concat(DOZI.systems.list.map(function (x) { return { v: x.id, label: x.name, img: DOZI.systems.img(x), note: DOZI.money(x.price) }; })),
    fit: [
      { v: "oversized", label: "Oversized", note: "Boxy, dropped shoulder" },
      { v: "regular", label: "Regular", soon: true },
      { v: "cropped", label: "Cropped", soon: true }
    ],
    collar: [
      { v: "polo", label: "Polo Collar", img: PARTS + "collar-polo.jpg" },
      { v: "crew", label: "Crew Neck", img: PARTS + "collar-crew.jpg" },
      { v: "mock", label: "Mock Neck", img: PARTS + "collar-mock.jpg", soon: true }
    ],
    sleeve: [
      { v: "short", label: "Short", img: PARTS + "sleeve-short.jpg" },
      { v: "long", label: "Long", img: PARTS + "sleeve-long.jpg", note: "+ " + DOZI.money(P.sleeve.long) },
      { v: "raglan", label: "Raglan", img: PARTS + "sleeve-raglan.jpg", soon: true }
    ],
    pocket: [
      { v: false, label: "No pocket" },
      { v: true, label: "Utility Pocket", img: PARTS + "att-pocket.jpg", note: "+ " + DOZI.money(P.pocket) }
    ],
    panels: [
      { v: false, label: "No panels" },
      { v: true, label: "Contrast Panels", img: PARTS + "att-panel.jpg", note: "+ " + DOZI.money(P.panels) }
    ],
    hem: [
      { v: "none", label: "Nothing" },
      { v: "charm", label: "Leaf Charm", img: PARTS + "att-charm.jpg", note: "+ " + DOZI.money(P.hem.charm) },
      { v: "strap", label: "Hem Strap", img: PARTS + "att-strap.jpg", note: "+ " + DOZI.money(P.hem.strap) }
    ],
    hardware: Object.keys(LK.HARDWARE).map(function (k) { return { v: k, label: LK.HARDWARE[k].name, img: PARTS + "hw-" + k + ".jpg" }; }),
    color: COLOR_KEYS.map(function (c) { return { v: c, label: LK.COLORS[c].name, img: LK.ROOT + "swatch/" + c + ".jpg", swatch: true }; })
  };

  // Hotspots on the photograph (percent of the base image) and what each opens.
  var HOT = [
    { part: "collar", box: [36, 9, 28, 21], label: "Change this collar" },
    { part: "pocket", box: [61, 27, 17, 17], label: "Change this pocket" },
    { part: "hem", box: [67, 79, 13, 14], label: "Change what hangs here" },
    { part: "panels", box: [20, 55, 9, 31], label: "Change the side panels" },
    { part: "panels", box: [71, 55, 9, 31], label: "Change the side panels" },
    { part: "sleeve", box: [0, 25, 22, 34], label: "Change this sleeve", long: [0, 25, 22, 64] },
    { part: "sleeve", box: [78, 25, 22, 34], label: "Change this sleeve", long: [78, 25, 22, 64] },
    { part: "color", box: [30, 44, 34, 38], label: "Change the colour" }
  ];
  var PART_STEP = { collar: "collar", sleeve: "sleeve", color: "color", pocket: "attach", panels: "attach", hem: "attach", hardware: "finish" };
  var TRAY_TITLE = { collar: "Swap the collar", sleeve: "Swap the sleeves", color: "Change the colour", pocket: "Chest attachment", panels: "Side panels", hem: "Hem loop", hardware: "Hardware" };

  var SY = DOZI.systems;
  var sys = null; // a photographed system ({base, color, v}); null while designing The Polo
  var SYS_STEPS = [{ key: "base", label: "Base" }, { key: "scolor", label: "Colour" }, { key: "v", label: "Version" }];
  var state = initialState();
  var step = 0;
  var traying = null;

  function initialState() {
    var s = {};
    try { if (location.hash.length > 1) s = JSON.parse(decodeURIComponent(location.hash.slice(1))); } catch (e) { /* ignore a malformed link */ }
    if (s.base && s.base !== "polo" && SY.get(s.base)) sys = SY.normalize(s);
    var q = new URLSearchParams(location.search);
    if (q.get("base") && SY.get(q.get("base"))) sys = SY.normalize({ base: q.get("base"), color: q.get("color"), v: q.get("v") });
    if (q.get("color")) s.color = q.get("color");
    return LK.normalize(s);
  }

  var els = {
    steps: root.querySelector("[data-steps]"),
    stage: root.querySelector("[data-stage]"),
    look: root.querySelector("[data-look]"),
    tag: root.querySelector(".change-tag"),
    tray: root.querySelector(".tray"),
    panel: root.querySelector("[data-panel]"),
    title: root.querySelector("[data-design-title]")
  };

  /* ---------- stage: the photograph ---------- */
  function buildStage() {
    els.look.innerHTML =
      '<img class="look__base" data-base alt="" src="' + LK.baseSrc(state) + '">' +
      '<img class="look__base look__next" data-next alt="">' +
      '<div class="look__layers" data-layers></div>' +
      '<div class="lift lift--collar"><img alt=""></div>' +
      '<div class="lift lift--sleeve-l"><img alt=""></div>' +
      '<div class="lift lift--sleeve-r"><img alt=""></div>' +
      HOT.map(function (h, i) { return '<button class="hot" data-hot="' + i + '" data-part="' + h.part + '" aria-label="' + h.label + '"></button>'; }).join("");
    placeHotspots();
    syncLayers(true);
    els.look.setAttribute("aria-label", LK.describe(state));
  }
  function placeHotspots() {
    els.look.classList.toggle("is-long", state.sleeve === "long");
    HOT.forEach(function (h, i) {
      var b = state.sleeve === "long" && h.long ? h.long : h.box;
      var el = els.look.querySelector('[data-hot="' + i + '"]');
      el.style.cssText = "left:" + b[0] + "%;top:" + b[1] + "%;width:" + b[2] + "%;height:" + b[3] + "%";
    });
  }

  // Attachments are separate photographs: add, swap or remove only what changed.
  function syncLayers(instant) {
    var want = {};
    LK.layers(state).forEach(function (l) { want[l[0] === "charm" || l[0] === "strap" ? "hem" : l[0]] = l; });
    var box = els.look.querySelector("[data-layers]");
    ["panel", "pocket", "hem"].forEach(function (slot) {
      var cur = box.querySelector('[data-slot="' + slot + '"]'), w = want[slot];
      if (cur && (!w || cur.getAttribute("data-kind") !== w[0])) {
        var old = cur; old.removeAttribute("data-slot");
        old.classList.add("is-leaving");
        setTimeout(function () { old.remove(); }, instant ? 0 : 450);
        cur = null;
      }
      if (!w) return;
      if (cur) { if (cur.getAttribute("src") !== w[1]) LK.preload(w[1]).then(function () { cur.src = w[1]; }); return; }
      box.insertAdjacentHTML("beforeend", LK.overlayHtml(w[0], w[1]));
      var el = box.lastElementChild;
      el.setAttribute("data-slot", slot); el.setAttribute("data-kind", w[0]);
      if (!instant) { el.classList.add("is-entering"); LK.preload(w[1]).then(function () { requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.remove("is-entering"); }); }); }); }
    });
  }

  // Swap the base photograph: crossfade for colour/finish, lift-and-reattach for collar/sleeve.
  var swapToken = 0, liftedAt = 0;
  function swapBase(part) {
    var src = LK.baseSrc(state), token = ++swapToken;
    var base = els.look.querySelector("[data-base]"), next = els.look.querySelector("[data-next]");
    LK.preload(src).then(function () {
      if (token !== swapToken) return;
      var lifts = liftsFor(part);
      if (lifts.length && els.look.classList.contains("is-lifted")) {
        // let the part be seen off the garment before the new one clicks back on
        setTimeout(function () {
          if (token !== swapToken) return;
          lifts.forEach(function (l) { l.querySelector("img").src = src; maskLift(l); });
          els.look.classList.remove("is-lifted");
          setTimeout(function () {
            if (token !== swapToken) return;
            base.src = src;
            els.look.classList.remove("is-dim");
            lifts.forEach(function (l) { l.classList.remove("is-on"); });
          }, 650);
        }, Math.max(0, 550 - (Date.now() - liftedAt)));
        return;
      }
      next.src = src; next.classList.add("is-on");
      setTimeout(function () {
        if (token !== swapToken) return;
        base.src = src; next.classList.remove("is-on");
      }, 520);
    });
  }
  function liftsFor(part) {
    if (part === "collar") return [els.look.querySelector(".lift--collar")];
    if (part === "sleeve") return [els.look.querySelector(".lift--sleeve-l"), els.look.querySelector(".lift--sleeve-r")];
    return [];
  }
  // each lifted part is cut from the photograph along the garment's own edge
  function maskLift(l) {
    var which = l.className.match(/lift--([a-z-]+)/)[1];
    var url = "url(" + LK.ROOT + "mask/" + state.collar + "-" + state.sleeve + "-" + which + ".png)";
    var img = l.querySelector("img");
    img.style.webkitMaskImage = url; img.style.maskImage = url;
  }
  function detach(part) {
    var lifts = liftsFor(part), src = els.look.querySelector("[data-base]").getAttribute("src");
    if (lifts.length) {
      lifts.forEach(function (l) { l.querySelector("img").src = src; maskLift(l); l.classList.add("is-on"); });
      els.look.classList.add("is-dim");
      void els.look.offsetWidth; // start from the attached position so the lift animates
      els.look.classList.add("is-lifted");
      liftedAt = Date.now();
    }
    var slot = { pocket: "pocket", panels: "panel", hem: "hem" }[part];
    if (slot) { var l = els.look.querySelector('[data-slot="' + slot + '"]'); if (l) l.classList.add("is-detached"); }
  }
  function reattach() {
    els.look.classList.remove("is-lifted", "is-dim");
    setTimeout(function () { els.look.querySelectorAll(".lift").forEach(function (l) { if (!els.look.classList.contains("is-lifted")) l.classList.remove("is-on"); }); }, 650);
    els.look.querySelectorAll(".is-detached").forEach(function (l) { l.classList.remove("is-detached"); });
  }

  /* ---------- photographed systems ---------- */
  function sysObj() { return SY.get(sys.base); }
  function sysSrc(st) { st = st || sys; return SY.img(SY.get(st.base), st.color, st.v); }
  function buildSysStage() {
    els.look.classList.remove("is-long", "is-lifted", "is-dim");
    els.look.innerHTML = '<img class="look__base sys-img" data-base alt="" src="' + sysSrc() + '">' +
      '<button class="hot hot--all" data-part="version" aria-label="Change this version"></button>';
  }
  // the current version lifts away and the chosen one clicks into place
  function swapSys() {
    var src = sysSrc(), token = ++swapToken;
    LK.preload(src).then(function () {
      if (token !== swapToken) return;
      var old = els.look.querySelector("[data-base]");
      var nu = document.createElement("img");
      nu.className = "look__base sys-img is-in"; nu.alt = ""; nu.src = src; nu.setAttribute("data-base", "");
      old.removeAttribute("data-base"); old.classList.add("is-out");
      els.look.insertBefore(nu, els.look.querySelector(".hot"));
      void nu.offsetWidth; nu.classList.remove("is-in");
      setTimeout(function () { old.remove(); }, 600);
    });
  }
  function sysTray() {
    traying = "version";
    var x = sysObj();
    els.tray.innerHTML = '<div class="tray__head"><span class="caps">Change the version</span><button class="caps-sm" data-tray-close>Done</button></div>' +
      '<div class="tray__items">' + x.versions.map(function (v, i) { return tile("v", { v: i, label: v[0], img: SY.img(x, sys.color, i), note: v[1] }, sys.v === i, "tray__item"); }).join("") + "</div>";
    els.tray.classList.add("is-open");
    els.tag.classList.remove("is-on");
    els.look.classList.add("is-picking");
  }
  function sysStepValue(k) {
    var x = sysObj();
    if (k === "base") return x.name.replace(/^The /, "");
    if (k === "scolor") return SY.COLOURS[sys.color].name;
    return x.versions[sys.v][0];
  }
  function sysPanel() {
    var x = sysObj(), st = SYS_STEPS[step], h = '<div><span class="caps muted">Step 0' + (step + 1) + " / 0" + SYS_STEPS.length + '</span><h2 style="margin-top:10px">' + st.label + "</h2></div>";
    if (st.key === "base") h += group("Choose a base", "base");
    else if (st.key === "scolor") h += '<div class="group"><span class="caps">Colour · ' + SY.COLOURS[sys.color].name + '</span><div class="tiles">' +
      x.colours.map(function (c) { return tile("scolor", { v: c, label: SY.COLOURS[c].name, img: SY.img(x, c, sys.v) }, sys.color === c); }).join("") + "</div>" +
      (x.colours.length < 2 ? '<span class="caps-sm muted">More colours are in sampling.</span>' : "") + "</div>";
    else h += '<div class="group"><span class="caps">From base to fully built</span><div class="tiles">' +
      x.versions.map(function (v, i) { return tile("v", { v: i, label: v[0], img: SY.img(x, sys.color, i), note: v[2] ? "+ " + DOZI.money(v[2]) : v[1] }, sys.v === i); }).join("") + "</div></div>";
    h += '<div class="studio__nav"><button data-prev ' + (step === 0 ? "disabled" : "") + '>← Back</button><button data-next>' + (step === SYS_STEPS.length - 1 ? "Your design ↓" : "Next →") + "</button></div>";
    h += '<div class="summary"><p class="your-design" style="margin:22px 0 10px">Your design</p><dl>' +
      SY.summary(sys).map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + DOZI.esc(r[1]) + "</dd>"; }).join("") + "</dl></div>" +
      '<div class="studio__price"><span class="caps">Total</span><span style="font-size:18px">' + DOZI.money(SY.price(sys)) + "</span></div>" +
      '<button class="btn btn--block" data-add>Add to bag</button>' +
      '<div style="display:flex;justify-content:space-between"><button class="link-arrow" data-save>Save design</button><button class="link-arrow" data-share>Copy link</button></div>' +
      '<span class="caps-sm muted">Made to order in Lagos · ships in 10–14 days</span>';
    els.panel.innerHTML = h;
  }
  function sysSet(key, raw) {
    if (traying) { traying = null; els.tray.classList.remove("is-open"); els.look.classList.remove("is-picking"); }
    var next = Object.assign({}, sys);
    if (key === "base") next = { base: raw, color: null, v: 0 };
    else if (key === "scolor") next.color = raw;
    else if (key === "v") next.v = +raw;
    else return;
    next = SY.normalize(next);
    if (JSON.stringify(next) === JSON.stringify(sys)) return;
    sys = next;
    swapSys();
    afterChange();
  }
  function currentState() { return sys || state; }
  function afterChange() {
    renderSteps(); renderPanel(); updateTitle();
    history.replaceState(null, "", "#" + encodeURIComponent(JSON.stringify(currentState())));
    DOZI.toast("Your design has changed.");
  }
  function switchBase(raw) {
    closeTray(true);
    if (raw === "polo") { if (!sys) return; sys = null; buildStage(); }
    else if (!sys) { sys = SY.normalize({ base: raw }); buildSysStage(); }
    else return sysSet("base", raw);
    afterChange();
  }

  /* ---------- tray (the component drawer, real photographs) ---------- */
  function tile(key, o, pressed, cls) {
    var inner = o.img ? '<span class="tile__img' + (o.swatch ? " tile__img--swatch" : "") + '"><img src="' + o.img + '" alt="" loading="lazy"></span>' : '<span class="tile__img tile__img--none">—</span>';
    return '<button class="tile ' + (cls || "") + '" data-set="' + key + '" data-val="' + String(o.v) + '" aria-pressed="' + pressed + '"' + (o.soon ? ' disabled aria-disabled="true"' : "") + ">" +
      inner + '<span class="tile__label">' + o.label + "</span>" + (o.soon ? '<span class="tile__note">In sampling</span>' : (o.note ? '<span class="tile__note">' + o.note + "</span>" : "")) + "</button>";
  }
  function optionKey(part) { return part === "hardware" ? "hardware" : part; }
  function openTray(part) {
    if (traying) closeTray(true);
    traying = part;
    var key = optionKey(part);
    els.tray.innerHTML = '<div class="tray__head"><span class="caps">' + TRAY_TITLE[part] + '</span><button class="caps-sm" data-tray-close>Done</button></div>' +
      '<div class="tray__items">' + OPTIONS[key].map(function (o) { return tile(key, o, state[key] === o.v, "tray__item"); }).join("") + "</div>";
    els.tray.classList.add("is-open");
    els.tag.classList.remove("is-on");
    detach(part);
  }
  function closeTray(silent) {
    if (!traying) return;
    traying = null;
    els.tray.classList.remove("is-open");
    els.look.classList.remove("is-picking");
    if (sys) return;
    if (!silent) reattach(); else reattach();
  }

  /* ---------- left: steps ---------- */
  function stepValue(k) {
    switch (k) {
      case "base": return "The Polo";
      case "fit": return "Oversized";
      case "color": return LK.COLORS[state.color].name;
      case "collar": return L.collar[state.collar];
      case "sleeve": return L.sleeve[state.sleeve];
      case "attach": var n = (state.pocket ? 1 : 0) + (state.panels ? 1 : 0) + (state.hem !== "none" ? 1 : 0); return n ? n + " added" : "None";
      case "finish": return LK.HARDWARE[state.hardware].name;
    }
  }
  function steps() { return sys ? SYS_STEPS : STEPS; }
  function renderSteps() {
    if (step >= steps().length) step = steps().length - 1;
    els.steps.innerHTML = steps().map(function (s, i) {
      return '<li class="' + (i === step ? "is-active" : "") + '"><button data-step="' + i + '"><span class="n">0' + (i + 1) + '</span><span class="k">' + s.label + '</span><span class="v">' + (sys ? sysStepValue(s.key) : stepValue(s.key)) + "</span></button></li>";
    }).join("");
  }

  /* ---------- right: options for the current step ---------- */
  function group(label, key) {
    return '<div class="group"><span class="caps">' + label + '</span><div class="tiles">' +
      OPTIONS[key].map(function (o) { return tile(key, o, key === "base" ? (sys ? sys.base : "polo") === o.v : state[key] === o.v); }).join("") + "</div></div>";
  }
  function renderPanel() {
    if (sys) return sysPanel();
    var s = STEPS[step], h = '<div><span class="caps muted">Step 0' + (step + 1) + " / 0" + STEPS.length + '</span><h2 style="margin-top:10px">' + s.label + "</h2></div>";
    if (s.key === "base") h += group("Choose a base", "base");
    else if (s.key === "fit") h += group("Fit", "fit");
    else if (s.key === "color") h += group("Colour · " + LK.COLORS[state.color].name, "color");
    else if (s.key === "collar") h += group("Collar", "collar");
    else if (s.key === "sleeve") h += group("Sleeve", "sleeve");
    else if (s.key === "attach") h += group("Chest", "pocket") + group("Sides", "panels") + group("Hem loop", "hem");
    else if (s.key === "finish") h += group("Hardware", "hardware");

    h += '<div class="studio__nav"><button data-prev ' + (step === 0 ? "disabled" : "") + '>← Back</button><button data-next>' + (step === STEPS.length - 1 ? "Your design ↓" : "Next →") + "</button></div>";
    h += '<div class="summary"><p class="your-design" style="margin:22px 0 10px">Your design</p><dl>' +
      DOZI.designSummary(state).map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + DOZI.esc(r[1]) + "</dd>"; }).join("") + "</dl></div>" +
      '<div class="studio__price"><span class="caps">Total</span><span style="font-size:18px">' + DOZI.money(DOZI.designPrice(state)) + "</span></div>" +
      '<button class="btn btn--block" data-add>Add to bag</button>' +
      '<div style="display:flex;justify-content:space-between"><button class="link-arrow" data-save>Save design</button><button class="link-arrow" data-share>Copy link</button></div>' +
      '<span class="caps-sm muted">Made to order in Lagos · ships in 10–14 days</span>';
    els.panel.innerHTML = h;
  }

  /* ---------- state changes ---------- */
  var KEY_PART = { collar: "collar", sleeve: "sleeve", color: "color", hardware: "hardware", pocket: "pocket", panels: "panels", hem: "hem" };
  function parseVal(key, v) { return key === "pocket" || key === "panels" ? v === "true" : v; }
  function set(key, raw) {
    if (key === "base") return switchBase(raw);
    if (sys) return sysSet(key, raw);
    var v = parseVal(key, raw);
    if (!(key in KEY_PART) || state[key] === v) { if (traying) closeTray(); return; }
    var prevBase = LK.baseSrc(state);
    state[key] = v;
    state = LK.normalize(state);
    var part = KEY_PART[key];
    if (LK.baseSrc(state) !== prevBase) {
      if ((part === "collar" || part === "sleeve") && traying !== part) detach(part); // lift it even when chosen from the side panel
      swapBase(part);
    }
    syncLayers(false);
    placeHotspots();
    if (traying) { traying = null; els.tray.classList.remove("is-open"); els.look.querySelectorAll(".is-detached").forEach(function (l) { l.classList.remove("is-detached"); }); }
    renderSteps(); renderPanel(); updateTitle();
    history.replaceState(null, "", "#" + encodeURIComponent(JSON.stringify(state)));
    DOZI.toast("Your design has changed.");
  }
  function updateTitle() {
    if (sys) { els.title.textContent = sysObj().name + " — " + SY.COLOURS[sys.color].name; els.look.setAttribute("aria-label", sysObj().name + ", " + sysObj().versions[sys.v][0]); return; }
    els.title.textContent = "The Polo — " + LK.COLORS[state.color].name;
    els.look.setAttribute("aria-label", LK.describe(state));
  }

  /* ---------- events ---------- */
  root.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-set]"))) { if (!t.disabled) set(t.getAttribute("data-set"), t.getAttribute("data-val")); return; }
    if ((t = e.target.closest("[data-step]"))) { step = +t.getAttribute("data-step"); closeTray(); renderSteps(); renderPanel(); return; }
    if (e.target.closest("[data-next]")) {
      if (step < steps().length - 1) { step++; renderSteps(); renderPanel(); }
      else els.panel.querySelector(".summary").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (e.target.closest("[data-prev]")) { if (step > 0) { step--; renderSteps(); renderPanel(); } return; }
    if (e.target.closest("[data-tray-close]")) { closeTray(); return; }
    if (e.target.closest("[data-add]") && sys) {
      DOZI.addToBag({ name: sysObj().name + " — " + sysObj().versions[sys.v][0], price: SY.price(sys), design: Object.assign({}, sys), spec: SY.summary(sys) });
      return;
    }
    if (e.target.closest("[data-add]")) {
      DOZI.addToBag({ name: "The Polo — Your Design", price: DOZI.designPrice(state), design: JSON.parse(JSON.stringify(state)), spec: DOZI.designSummary(state) });
      return;
    }
    if (e.target.closest("[data-save]")) {
      var list = DOZI.load("saved", []);
      list.unshift(sys ? { name: sysObj().name + " — " + sysObj().versions[sys.v][0], state: Object.assign({}, sys) } : { name: "The Polo — " + LK.COLORS[state.color].name, state: JSON.parse(JSON.stringify(state)) });
      DOZI.save("saved", list.slice(0, 24));
      DOZI.toast("Design saved");
      return;
    }
    if (e.target.closest("[data-share]")) {
      var url = location.href.split("#")[0] + "#" + encodeURIComponent(JSON.stringify(currentState()));
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { DOZI.toast("Link copied"); }, function () { DOZI.toast("Copy the address bar to share"); });
      return;
    }
    var hot = e.target.closest(".hot");
    if (hot) {
      var p = hot.getAttribute("data-part");
      if (sys) { if (traying) closeTray(); else { sysTray(); step = 2; renderSteps(); renderPanel(); } return; }
      if (traying === p) { closeTray(); return; }
      openTray(p);
      var idx = STEPS.map(function (s) { return s.key; }).indexOf(PART_STEP[p]);
      if (idx > -1) { step = idx; renderSteps(); renderPanel(); }
      return;
    }
    if (traying && !e.target.closest(".tray")) closeTray();
  });

  // "CHANGE THIS" — a line appears beside whatever you hover
  els.stage.addEventListener("mousemove", function (e) {
    var hot = e.target.closest && e.target.closest(".hot");
    if (!hot || traying) { els.tag.classList.remove("is-on"); return; }
    var sr = els.stage.getBoundingClientRect();
    els.tag.textContent = sys ? "Change this" : HOT[+hot.getAttribute("data-hot")].label;
    els.tag.style.left = Math.min(e.clientX - sr.left + 16, sr.width - 240) + "px";
    els.tag.style.top = (e.clientY - sr.top - 8) + "px";
    els.tag.classList.add("is-on");
  });
  els.stage.addEventListener("mouseleave", function () { els.tag.classList.remove("is-on"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeTray(); });

  if (sys) buildSysStage(); else buildStage();
  renderSteps(); renderPanel(); updateTitle();
  // warm the cache for the photographs one click away
  ["crew", "polo"].forEach(function (c) { ["short", "long"].forEach(function (sl) { LK.preload(LK.baseSrc(Object.assign({}, state, { collar: c, sleeve: sl }))); }); });
})();
