/* ==========================================================================
   THE DOZI DESIGN — studio
   Choose a base, then decide how it becomes yours.
   ========================================================================== */
(function () {
  "use strict";

  var G = DOZI.garment, L = DOZI.LABELS, P = DOZI.DESIGN_PRICES;
  var root = document.querySelector("[data-studio]");
  if (!root) return;

  var COLOR_KEYS = Object.keys(G.COLORS);

  var STEPS = [
    { key: "base", label: "Base" },
    { key: "fit", label: "Fit" },
    { key: "color", label: "Colour" },
    { key: "collar", label: "Collar" },
    { key: "sleeve", label: "Sleeve" },
    { key: "attachments", label: "Attachments" },
    { key: "finish", label: "Finish" }
  ];

  // which step / tray each clickable part of the garment opens
  var PART_TRAY = { sleeve: "sleeve", collar: "collar", color: "color", bottom: "bottom", attachments: "attachments" };
  var PART_CLASS = { sleeve: ["part-sleeve-l", "part-sleeve-r"], collar: ["part-collar"], color: ["part-body"], bottom: ["part-bottom"], attachments: ["part-attach"] };

  var state = initialState();
  var step = 0;

  function initialState() {
    var s = Object.assign({}, G.DEFAULT_STATE, { attachments: G.DEFAULT_STATE.attachments.slice() });
    try {
      if (location.hash.length > 1) Object.assign(s, JSON.parse(decodeURIComponent(location.hash.slice(1))));
    } catch (e) { /* ignore a malformed link */ }
    var q = new URLSearchParams(location.search);
    if (q.get("base")) s.base = q.get("base") === "set" ? "set" : "polo";
    if (q.get("color") && G.COLORS[q.get("color")]) { s.color = q.get("color"); s.bottomColor = q.get("color"); }
    return s;
  }

  var els = {
    steps: root.querySelector("[data-steps]"),
    stage: root.querySelector("[data-stage]"),
    svgWrap: root.querySelector("[data-svg]"),
    tag: root.querySelector(".change-tag"),
    tray: root.querySelector(".tray"),
    panel: root.querySelector("[data-panel]"),
    title: root.querySelector("[data-design-title]")
  };

  /* ---------- helpers ---------- */
  function delta(n) { return n ? "+ " + DOZI.money(n) : ""; }
  function stepValue(k) {
    switch (k) {
      case "base": return L.base[state.base];
      case "fit": return L.fit[state.fit];
      case "color": return G.COLORS[state.color].name;
      case "collar": return L.collar[state.collar];
      case "sleeve": return L.sleeve[state.sleeve];
      case "attachments": return state.attachments.length ? state.attachments.length + " added" : "None";
      case "finish": return G.HARDWARE[state.hardware].name;
    }
  }
  function swatchRow(key, includeMatch) {
    var keys = includeMatch ? ["match"].concat(COLOR_KEYS) : COLOR_KEYS;
    return '<div class="swatches">' + keys.map(function (c) {
      var bg = c === "match" ? "linear-gradient(135deg," + G.COLORS[state.color].hex + " 50%, #F3EFE7 50%)" : G.COLORS[c].hex;
      var name = c === "match" ? "Match body" : G.COLORS[c].name;
      return '<button class="sw" style="background:' + bg + '" data-set="' + key + '" data-val="' + c + '" aria-pressed="' + (state[key] === c) + '" title="' + name + '" aria-label="' + name + '"></button>';
    }).join("") + "</div>";
  }
  function choice(key, val, label, note, pressed) {
    return '<button class="choice" data-set="' + key + '" data-val="' + val + '" aria-pressed="' + pressed + '"><span>' + label + "</span><small>" + (note || "") + "</small></button>";
  }

  /* ---------- left: steps ---------- */
  function renderSteps() {
    els.steps.innerHTML = STEPS.map(function (s, i) {
      return '<li class="' + (i === step ? "is-active" : "") + '"><button data-step="' + i + '"><span class="n">0' + (i + 1) + '</span><span class="k">' + s.label + '</span><span class="v">' + stepValue(s.key) + "</span></button></li>";
    }).join("");
  }

  /* ---------- centre: stage ---------- */
  function renderStage(changedPart) {
    els.svgWrap.innerHTML = G.render(state, { interactive: true, className: "stage-svg" });
    if (changedPart && PART_CLASS[changedPart]) {
      var nodes = [];
      PART_CLASS[changedPart].forEach(function (c) { els.svgWrap.querySelectorAll("." + c).forEach(function (n) { nodes.push(n); }); });
      nodes.forEach(function (n) { n.style.transition = "none"; n.classList.add("is-detached"); });
      // force layout, then let the part click back into place
      void els.svgWrap.offsetWidth;
      requestAnimationFrame(function () {
        nodes.forEach(function (n) { n.style.transition = ""; n.classList.remove("is-detached"); });
      });
    }
  }

  /* ---------- right: options for the current step ---------- */
  function renderPanel() {
    var s = STEPS[step], h = "";
    h += '<div><span class="caps muted">Step 0' + (step + 1) + " / 0" + STEPS.length + '</span><h2 style="margin-top:10px">' + s.label + "</h2></div>";
    if (s.key === "base") {
      h += group("Choose a base", '<div class="choices">' +
        choice("base", "polo", "The Polo", DOZI.money(P.base.polo), state.base === "polo") +
        choice("base", "set", "The Set", "Polo + trouser · " + DOZI.money(P.base.set), state.base === "set") + "</div>");
    } else if (s.key === "fit") {
      h += group("Fit", '<div class="choices">' + ["regular", "oversized", "cropped"].map(function (f) { return choice("fit", f, L.fit[f], "", state.fit === f); }).join("") + "</div>");
    } else if (s.key === "color") {
      h += group("Polo · " + G.COLORS[state.color].name, swatchRow("color"));
      if (state.base === "set") h += group("Trouser · " + G.COLORS[state.bottomColor].name, swatchRow("bottomColor") + '<button class="link-arrow" style="justify-self:start;margin-top:4px" data-set="bottomColor" data-val="' + state.color + '">Match the polo</button>');
    } else if (s.key === "collar") {
      h += group("Collar", '<div class="choices">' + ["round", "polo", "mock"].map(function (c) { return choice("collar", c, L.collar[c], delta(P.collar[c]), state.collar === c); }).join("") + "</div>");
    } else if (s.key === "sleeve") {
      h += group("Sleeve", '<div class="choices">' + ["short", "long", "raglan"].map(function (c) { return choice("sleeve", c, L.sleeve[c], delta(P.sleeve[c]), state.sleeve === c); }).join("") + "</div>");
      h += group("Sleeve colour", swatchRow("sleeveColor", true));
    } else if (s.key === "attachments") {
      h += group("Attach any", '<div class="choices">' + ["strap", "pocket", "panel", "charm"].map(function (a) {
        return choice("attachments", a, L.attachments[a], "+ " + DOZI.money(P.attachments[a]), state.attachments.indexOf(a) > -1);
      }).join("") + "</div>");
    } else if (s.key === "finish") {
      h += group("Hardware", '<div class="choices">' + Object.keys(G.HARDWARE).map(function (k) { return choice("hardware", k, G.HARDWARE[k].name, "", state.hardware === k); }).join("") + "</div>");
      h += group("Mark", '<div class="choices">' + ["woven", "tonal", "none"].map(function (k) { return choice("label", k, L.label[k], "", state.label === k); }).join("") + "</div>");
    }

    h += '<div class="studio__nav"><button data-prev ' + (step === 0 ? "disabled" : "") + '>← Back</button><button data-next>' + (step === STEPS.length - 1 ? "Your design ↓" : "Next →") + "</button></div>";

    h += '<div class="summary"><p class="your-design" style="margin:22px 0 10px">Your design</p><dl>' +
      DOZI.designSummary(state).map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + DOZI.esc(r[1]) + "</dd>"; }).join("") + "</dl></div>" +
      '<div class="studio__price"><span class="caps">Total</span><span style="font-size:18px">' + DOZI.money(DOZI.designPrice(state)) + "</span></div>" +
      '<button class="btn btn--block" data-add>Add to bag</button>' +
      '<div style="display:flex;justify-content:space-between"><button class="link-arrow" data-save>Save design</button><button class="link-arrow" data-share>Copy link</button></div>' +
      '<span class="caps-sm muted">Made to order in Lagos · ships in 10–14 days</span>';
    els.panel.innerHTML = h;
  }
  function group(label, inner) { return '<div class="group"><span class="caps">' + label + "</span>" + inner + "</div>"; }

  /* ---------- tray (the component drawer) ---------- */
  var trayPart = null;
  function openTray(part) {
    trayPart = part;
    var key = PART_TRAY[part], items = "", title = "";
    var mini = function (patch, vb) { return G.render(Object.assign({}, state, { base: "polo" }, patch), { mini: true, viewBox: vb }); };
    if (key === "sleeve") {
      title = "Swap the sleeve";
      items = ["short", "long", "raglan"].map(function (v) { return trayItem("sleeve", v, L.sleeve[v], mini({ sleeve: v, attachments: [] }, "40 24 520 440"), state.sleeve === v); }).join("");
    } else if (key === "collar") {
      title = "Swap the collar";
      items = ["round", "polo", "mock"].map(function (v) { return trayItem("collar", v, L.collar[v], mini({ collar: v, attachments: [], label: "none" }, "200 30 200 140"), state.collar === v); }).join("");
    } else if (key === "color" || key === "bottom") {
      var k = key === "color" ? "color" : "bottomColor";
      title = key === "color" ? "Change the colour" : "Change the trouser";
      items = COLOR_KEYS.map(function (c) {
        return trayItem(k, c, G.COLORS[c].name, '<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="22" fill="' + G.COLORS[c].hex + '" stroke="rgba(0,0,0,.15)"/></svg>', state[k] === c);
      }).join("");
    } else if (key === "attachments") {
      title = "Attach or remove";
      items = ["strap", "pocket", "panel", "charm"].map(function (a) {
        return trayItem("attachments", a, L.attachments[a], mini({ attachments: [a], label: "none" }), state.attachments.indexOf(a) > -1);
      }).join("");
    }
    els.tray.innerHTML = '<div class="tray__head"><span class="caps">' + title + '</span><button class="caps-sm" data-tray-close>Done</button></div><div class="tray__items">' + items + "</div>";
    els.tray.classList.add("is-open");
    PART_CLASS[part].forEach(function (c) { els.svgWrap.querySelectorAll("." + c).forEach(function (n) { n.classList.add("is-detached"); }); });
    els.tag.classList.remove("is-on");
  }
  function trayItem(key, val, label, svg, pressed) {
    return '<button class="tray__item" data-set="' + key + '" data-val="' + val + '" data-from-tray aria-pressed="' + pressed + '">' + svg + "<span>" + label + "</span></button>";
  }
  function closeTray() {
    if (!trayPart) return;
    els.tray.classList.remove("is-open");
    PART_CLASS[trayPart].forEach(function (c) { els.svgWrap.querySelectorAll("." + c).forEach(function (n) { n.classList.remove("is-detached"); }); });
    trayPart = null;
  }

  /* ---------- state changes ---------- */
  var PART_FOR_KEY = { sleeve: "sleeve", sleeveColor: "sleeve", collar: "collar", color: "color", fit: "color", label: "color", bottomColor: "bottom", base: "bottom", attachments: "attachments", hardware: "attachments" };
  function set(key, val) {
    if (key === "attachments") {
      var i = state.attachments.indexOf(val);
      state.attachments = state.attachments.slice();
      if (i > -1) state.attachments.splice(i, 1); else state.attachments.push(val);
    } else {
      if (state[key] === val && key !== "bottomColor") return;
      if (key === "color" && state.bottomColor === state.color) state.bottomColor = val; // keep a matched set matched
      state[key] = val;
    }
    var part = PART_FOR_KEY[key];
    var hadTray = trayPart;
    if (hadTray) { trayPart = null; els.tray.classList.remove("is-open"); }
    renderAll(part);
    history.replaceState(null, "", "#" + encodeURIComponent(JSON.stringify(state)));
    DOZI.toast("Your design has changed.");
  }

  function renderAll(changedPart) {
    renderSteps();
    renderStage(changedPart);
    renderPanel();
    els.title.textContent = L.base[state.base] + " — " + G.COLORS[state.color].name;
  }

  /* ---------- events ---------- */
  root.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-set]"))) { set(t.getAttribute("data-set"), t.getAttribute("data-val")); return; }
    if ((t = e.target.closest("[data-step]"))) { step = +t.getAttribute("data-step"); closeTray(); renderSteps(); renderPanel(); return; }
    if (e.target.closest("[data-next]")) {
      if (step < STEPS.length - 1) { step++; renderSteps(); renderPanel(); }
      else els.panel.querySelector(".summary").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (e.target.closest("[data-prev]")) { if (step > 0) { step--; renderSteps(); renderPanel(); } return; }
    if (e.target.closest("[data-tray-close]")) { closeTray(); return; }
    if (e.target.closest("[data-add]")) {
      DOZI.addToBag({ name: L.base[state.base] + " — Your Design", price: DOZI.designPrice(state), design: JSON.parse(JSON.stringify(state)), spec: DOZI.designSummary(state) });
      return;
    }
    if (e.target.closest("[data-save]")) {
      var list = DOZI.load("saved", []);
      list.unshift({ name: L.base[state.base] + " — " + G.COLORS[state.color].name, state: JSON.parse(JSON.stringify(state)) });
      DOZI.save("saved", list.slice(0, 24));
      DOZI.toast("Design saved");
      return;
    }
    if (e.target.closest("[data-share]")) {
      var url = location.href.split("#")[0] + "#" + encodeURIComponent(JSON.stringify(state));
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { DOZI.toast("Link copied"); }, function () { DOZI.toast("Copy the address bar to share"); });
      return;
    }
    var part = e.target.closest(".part");
    if (part) {
      var p = part.getAttribute("data-part");
      if (trayPart === p) { closeTray(); return; }
      closeTray();
      openTray(p);
      var idx = STEPS.map(function (s) { return s.key; }).indexOf(p === "bottom" ? "color" : p);
      if (idx > -1) { step = idx; renderSteps(); renderPanel(); }
      return;
    }
    if (trayPart && !e.target.closest(".tray")) closeTray();
  });

  // "CHANGE THIS" — a line appears beside whatever you hover
  els.stage.addEventListener("mousemove", function (e) {
    var part = e.target.closest && e.target.closest(".part");
    if (!part || trayPart) { els.tag.classList.remove("is-on"); return; }
    var sr = els.stage.getBoundingClientRect();
    var x = e.clientX - sr.left + 14, y = e.clientY - sr.top - 6;
    var names = { sleeve: "Change this sleeve", collar: "Change this collar", color: "Change this colour", bottom: "Change this trouser", attachments: "Change these attachments" };
    els.tag.textContent = names[part.getAttribute("data-part")] || "Change this";
    els.tag.style.left = Math.min(x, sr.width - 220) + "px";
    els.tag.style.top = y + "px";
    els.tag.classList.add("is-on");
  });
  els.stage.addEventListener("mouseleave", function () { els.tag.classList.remove("is-on"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeTray(); });

  renderAll();
})();
