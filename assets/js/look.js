/* ==========================================================================
   DOZI look — builds a real photographic garment from a design state.
   One base photograph (collar × sleeve × colour × hardware) plus real
   photographed attachments layered on top (pocket, side panels, hem charm/strap).
   ========================================================================== */
(function (global) {
  "use strict";

  var DOZI = global.DOZI = global.DOZI || {};
  var ROOT = "assets/img/studio/";
  var SIZE = [1122, 1402];
  // where each photographed attachment sits on the base, in base pixels: left, top, width, height
  var OVERLAYS = {
    panel: [250, 765, 625, 445],
    pocket: [705, 408, 154, 196],
    charm: [791, 1146, 56, 160],
    strap: [796, 1146, 102, 166]
  };

  var COLORS = {
    navy:      { name: "Navy",       hex: "#1F2B4D" },
    black:     { name: "Black",      hex: "#262523" },
    oxide:     { name: "Oxide Red",  hex: "#8E3426" },
    burgundy:  { name: "Burgundy",   hex: "#6B1F26" },
    olive:     { name: "Deep Olive", hex: "#4D4B31" },
    chocolate: { name: "Chocolate",  hex: "#4A3025" },
    cobalt:    { name: "Cobalt",     hex: "#2C468C" },
    cream:     { name: "Cream",      hex: "#E4DAC4" }
  };
  var HARDWARE = { brass: { name: "Brass" }, silver: { name: "Silver" }, gunmetal: { name: "Gunmetal" } };

  // Options that exist as a design but are still being photographed.
  var IN_SAMPLING = { collar: ["mock"], sleeve: ["raglan"], base: ["set"], fit: ["regular", "cropped"] };

  var DEFAULT_STATE = {
    base: "polo", fit: "oversized", collar: "polo", sleeve: "short", color: "navy", hardware: "brass",
    pocket: false, panels: false, hem: "none"
  };

  function normalize(s) {
    s = Object.assign({}, DEFAULT_STATE, s || {});
    if (!COLORS[s.color]) s.color = "navy";
    if (!HARDWARE[s.hardware]) s.hardware = "brass";
    if (s.collar !== "crew") s.collar = "polo";
    if (s.sleeve !== "long") s.sleeve = "short";
    if (["charm", "strap"].indexOf(s.hem) < 0) s.hem = "none";
    s.base = "polo"; s.fit = "oversized";
    return s;
  }

  function baseSrc(s) { return ROOT + "base/" + s.collar + "-" + s.sleeve + "-" + s.color + "-" + s.hardware + ".jpg"; }
  function panelColor(c) { return ["oxide", "burgundy", "chocolate", "olive", "cobalt"].indexOf(c) > -1 ? "navy" : "oxide"; }

  function layers(s) {
    var out = [];
    if (s.panels) out.push(["panel", ROOT + "overlay/panel-" + s.sleeve + "-" + s.color + ".png"]);
    if (s.pocket) out.push(["pocket", ROOT + "overlay/pocket-" + s.color + "-" + s.hardware + ".png"]);
    if (s.hem !== "none") out.push([s.hem, ROOT + "overlay/" + s.hem + "-" + s.hardware + ".png"]);
    return out;
  }

  function boxStyle(k) {
    var b = OVERLAYS[k];
    return "left:" + (b[0] / SIZE[0] * 100).toFixed(3) + "%;top:" + (b[1] / SIZE[1] * 100).toFixed(3) + "%;width:" + (b[2] / SIZE[0] * 100).toFixed(3) + "%;height:" + (b[3] / SIZE[1] * 100).toFixed(3) + "%";
  }

  function overlayHtml(k, src) {
    return '<img class="look__layer look__layer--' + k + '" data-layer="' + k + '" src="' + src + '" alt="" style="' + boxStyle(k) + '">';
  }

  function describe(s) {
    s = normalize(s);
    var bits = [COLORS[s.color].name, s.collar === "crew" ? "crew neck" : "polo collar", s.sleeve + " sleeve"];
    if (s.pocket) bits.push("utility pocket");
    if (s.panels) bits.push("contrast side panels");
    if (s.hem !== "none") bits.push(s.hem === "charm" ? "leaf charm" : "hem strap");
    return "The Polo: " + bits.join(", ");
  }

  // Static composite: used for thumbnails, the bag, saved designs and product previews.
  function html(state, opts) {
    var s = normalize(state);
    opts = opts || {};
    return '<div class="look' + (opts.className ? " " + opts.className : "") + '" role="img" aria-label="' + describe(s) + '">' +
      '<img class="look__base" src="' + baseSrc(s) + '" alt=""' + (opts.eager ? "" : ' loading="lazy"') + ">" +
      layers(s).map(function (l) { return overlayHtml(l[0], l[1]); }).join("") + "</div>";
  }

  function preload(src) {
    return new Promise(function (res) { var i = new Image(); i.onload = i.onerror = function () { res(src); }; i.src = src; });
  }

  // Pricing for the designable polo (placeholders)
  var DESIGN_PRICES = { base: 68000, sleeve: { short: 0, long: 6000 }, pocket: 9500, panels: 7500, hem: { none: 0, charm: 6000, strap: 12000 } };
  DOZI.DESIGN_PRICES = DESIGN_PRICES;
  DOZI.designPrice = function (state) {
    var s = normalize(state);
    return DESIGN_PRICES.base + DESIGN_PRICES.sleeve[s.sleeve] + (s.pocket ? DESIGN_PRICES.pocket : 0) + (s.panels ? DESIGN_PRICES.panels : 0) + DESIGN_PRICES.hem[s.hem];
  };

  DOZI.look = {
    html: html, layers: layers, baseSrc: baseSrc, overlayHtml: overlayHtml, boxStyle: boxStyle,
    normalize: normalize, describe: describe, preload: preload,
    COLORS: COLORS, HARDWARE: HARDWARE, DEFAULT_STATE: DEFAULT_STATE, IN_SAMPLING: IN_SAMPLING,
    SIZE: SIZE, OVERLAYS: OVERLAYS, ROOT: ROOT, panelColor: panelColor
  };
})(window);
