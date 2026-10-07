/* ==========================================================================
   DOZI garment renderer
   Draws a technical flat of THE POLO (and THE SET) from a design state.
   Used by the Design Studio, product pages, the bag and the homepage.
   ========================================================================== */
(function (global) {
  "use strict";

  var DOZI = global.DOZI = global.DOZI || {};

  var COLORS = {
    navy:      { name: "Navy",      hex: "#1F2B4D" },
    cobalt:    { name: "Cobalt",    hex: "#2A4597" },
    oxide:     { name: "Oxide Red", hex: "#8E3426" },
    burgundy:  { name: "Burgundy",  hex: "#6B1F26" },
    olive:     { name: "Deep Olive",hex: "#4D4B31" },
    chocolate: { name: "Chocolate", hex: "#4A3025" },
    cream:     { name: "Cream",     hex: "#E4DAC6" },
    black:     { name: "Black",     hex: "#1E1D1B" }
  };
  var HARDWARE = {
    brass:    { name: "Brass",    hex: "#B08A4A" },
    gunmetal: { name: "Gunmetal", hex: "#55534F" },
    silver:   { name: "Silver",   hex: "#BDBBB4" }
  };
  var LEATHER = "#4A2A1C";
  var INK = "#171614";

  var DEFAULT_STATE = {
    base: "set",
    fit: "oversized",
    color: "navy",
    bottomColor: "navy",
    collar: "round",
    sleeve: "short",
    sleeveColor: "match",
    attachments: ["strap"],
    hardware: "brass",
    label: "woven"
  };

  /* ---------- colour helpers ---------- */
  function hexToRgb(h) {
    h = h.replace("#", "");
    return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
  }
  function rgbToHex(r) {
    return "#" + r.map(function (v) {
      v = Math.max(0, Math.min(255, Math.round(v)));
      return (v < 16 ? "0" : "") + v.toString(16);
    }).join("");
  }
  // amt > 0 lightens, < 0 darkens
  function shade(hex, amt) {
    var c = hexToRgb(hex);
    return rgbToHex(c.map(function (v) { return amt < 0 ? v * (1 + amt) : v + (255 - v) * amt; }));
  }
  function luminance(hex) {
    var c = hexToRgb(hex);
    return (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255;
  }
  function col(key) { return (COLORS[key] || COLORS.navy).hex; }

  /* ---------- geometry ---------- */
  var CX = 300;
  function fitGeom(s) {
    var g = { regular: { W: 116, Sy: 92, hem: 400 }, oversized: { W: 146, Sy: 104, hem: 428 }, cropped: { W: 122, Sy: 92, hem: 300 } }[s.fit] || { W: 146, Sy: 104, hem: 428 };
    g = { W: g.W, Sy: g.Sy, hem: g.hem };
    g.Uy = g.Sy + 116;
    g.tucked = s.base === "set" && s.fit !== "cropped";
    if (g.tucked) g.hem = 462;
    return g;
  }
  function pt(x, y) { return x.toFixed(1) + " " + y.toFixed(1); }
  function along(a, b, d) {
    var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.sqrt(dx * dx + dy * dy);
    return [a[0] + dx / l * d, a[1] + dy / l * d];
  }

  var uid = 0;

  function leafPath(x, y, s) {
    // DOZI leaf: a rounded leaf cut by an S-curve. Drawn at (x,y) centre, size s.
    var k = s / 100;
    function P(px, py) { return (x + (px - 50) * k).toFixed(1) + " " + (y + (py - 50) * k).toFixed(1); }
    return {
      a: "M" + P(12, 92) + "C" + P(2, 60) + " " + P(18, 14) + " " + P(70, 8) + "L" + P(84, 8) + "C" + P(66, 30) + " " + P(40, 58) + " " + P(12, 92) + "Z",
      b: "M" + P(24, 96) + "C" + P(54, 66) + " " + P(74, 40) + " " + P(92, 12) + "C" + P(100, 50) + " " + P(84, 92) + " " + P(24, 96) + "Z"
    };
  }

  function stroke(w) { return ' stroke="' + INK + '" stroke-width="' + (w || 1.3) + '" stroke-linejoin="round" stroke-linecap="round"'; }

  /* ---------- parts ---------- */
  function sleeveShape(s, g) {
    var S = [CX - g.W + 6, g.Sy], U = [CX - g.W, g.Uy];
    var A, B, cuff;
    if (s.sleeve === "long") {
      A = [S[0] - 64, S[1] + 322]; B = [U[0] - 18, U[1] + 214]; cuff = 20;
    } else {
      A = [S[0] - 80, S[1] + 92]; B = [U[0] - 40, U[1] + 30]; cuff = 10;
    }
    var N = [CX - 40, 76];
    var d;
    if (s.sleeve === "raglan") {
      d = "M" + pt(N[0], N[1]) + "L" + pt(S[0] + 6, S[1] - 6) + "L" + pt(A[0], A[1]) + "L" + pt(B[0], B[1]) + "L" + pt(U[0], U[1]) + "Q" + pt(U[0] + 30, U[1] - 70) + " " + pt(N[0], N[1]) + "Z";
    } else {
      d = "M" + pt(S[0], S[1]) + "Q" + pt((S[0] + A[0]) / 2 - 4, (S[1] + A[1]) / 2 - 4) + " " + pt(A[0], A[1]) + "L" + pt(B[0], B[1]) + "Q" + pt((B[0] + U[0]) / 2 + 2, (B[1] + U[1]) / 2 + 2) + " " + pt(U[0], U[1]) + "Q" + pt(U[0] + 6, (S[1] + U[1]) / 2) + " " + pt(S[0], S[1]) + "Z";
    }
    var a2 = along(A, s.sleeve === "raglan" ? [S[0] + 6, S[1] - 6] : S, cuff), b2 = along(B, U, cuff);
    return { d: d, cuff: "M" + pt(a2[0], a2[1]) + "L" + pt(b2[0], b2[1]), A: A, B: B };
  }

  function bodyPath(g) {
    var L = CX - g.W, R = CX + g.W;
    var taper = g.tucked ? 8 : 2;
    return "M" + pt(CX - 42, 72) +
      "L" + pt(L + 6, g.Sy) +
      "Q" + pt(L - 2, (g.Sy + g.Uy) / 2) + " " + pt(L, g.Uy) +
      "L" + pt(L + taper, g.hem) +
      "Q" + pt(CX, g.hem + 8) + " " + pt(R - taper, g.hem) +
      "L" + pt(R, g.Uy) +
      "Q" + pt(R + 2, (g.Sy + g.Uy) / 2) + " " + pt(R - 6, g.Sy) +
      "L" + pt(CX + 42, 72) +
      "Q" + pt(CX, 112) + " " + pt(CX - 42, 72) + "Z";
  }

  function collarSvg(s, base) {
    var dark = shade(base, -0.38), rib = shade(base, -0.12), out = "";
    var inner = '<path d="M' + pt(CX - 42, 72) + "Q" + pt(CX, 86) + " " + pt(CX + 42, 72) + "Q" + pt(CX, 110) + " " + pt(CX - 42, 72) + 'Z" fill="' + dark + '"' + stroke(1.1) + "/>";
    if (s.collar === "mock") {
      out += '<path d="M' + pt(CX - 40, 76) + "L" + pt(CX - 38, 46) + "Q" + pt(CX, 38) + " " + pt(CX + 38, 46) + "L" + pt(CX + 40, 76) + "Q" + pt(CX, 92) + " " + pt(CX - 40, 76) + 'Z" fill="' + rib + '"' + stroke() + "/>";
      out += '<path d="M' + pt(CX - 38, 46) + "Q" + pt(CX, 58) + " " + pt(CX + 38, 46) + "Q" + pt(CX, 38) + " " + pt(CX - 38, 46) + 'Z" fill="' + dark + '"' + stroke(1.1) + "/>";
      for (var i = -3; i <= 3; i++) out += '<path d="M' + pt(CX + i * 10, 52 + Math.abs(i)) + "L" + pt(CX + i * 10.5, 82 - Math.abs(i) * 1.6) + '" stroke="' + INK + '" stroke-opacity=".18" stroke-width=".8"/>';
    } else if (s.collar === "polo") {
      out += inner;
      out += '<rect x="' + (CX - 10) + '" y="96" width="20" height="74" fill="' + base + '"' + stroke(1.1) + "/>";
      out += '<circle cx="' + CX + '" cy="122" r="3" fill="' + shade(base, -0.25) + '"' + stroke(.8) + '/><circle cx="' + CX + '" cy="148" r="3" fill="' + shade(base, -0.25) + '"' + stroke(.8) + "/>";
      out += '<path d="M' + pt(CX - 44, 70) + "L" + pt(CX - 4, 100) + "L" + pt(CX - 26, 140) + "L" + pt(CX - 70, 106) + 'Z" fill="' + rib + '"' + stroke() + "/>";
      out += '<path d="M' + pt(CX + 44, 70) + "L" + pt(CX + 4, 100) + "L" + pt(CX + 26, 140) + "L" + pt(CX + 70, 106) + 'Z" fill="' + rib + '"' + stroke() + "/>";
      out += '<path d="M' + pt(CX - 44, 70) + "Q" + pt(CX, 58) + " " + pt(CX + 44, 70) + '" fill="none"' + stroke(1.1) + "/>";
    } else {
      out += inner;
      out += '<path d="M' + pt(CX - 42, 72) + "Q" + pt(CX, 112) + " " + pt(CX + 42, 72) + '" fill="none" stroke="' + rib + '" stroke-width="10" stroke-linecap="round"/>';
      out += '<path d="M' + pt(CX - 46, 70) + "Q" + pt(CX, 118) + " " + pt(CX + 46, 70) + '" fill="none"' + stroke(1.1) + "/>";
      out += '<path d="M' + pt(CX - 37, 74) + "Q" + pt(CX, 104) + " " + pt(CX + 37, 74) + '" fill="none"' + stroke(.9) + "/>";
    }
    return out;
  }

  function trouserSvg(s, hw, id) {
    var c = col(s.bottomColor), top = 432, band = 24, hem = 900, o = "";
    var legs = "M" + pt(CX - 104, top + band) + "L" + pt(CX - 140, hem) + "L" + pt(CX - 10, hem) + "L" + pt(CX, 596) + "L" + pt(CX + 10, hem) + "L" + pt(CX + 140, hem) + "L" + pt(CX + 104, top + band) + "Z";
    o += '<path d="' + legs + '" fill="' + c + '"' + stroke() + "/>";
    o += '<path d="' + legs + '" fill="url(#vol' + id + ')"/>';
    // pleats, creases, pockets, fly, hem
    [-1, 1].forEach(function (m) {
      o += '<path d="M' + pt(CX + m * 58, top + band) + "Q" + pt(CX + m * 62, 600) + " " + pt(CX + m * 74, hem) + '" fill="none" stroke="' + INK + '" stroke-opacity=".35" stroke-width="1"/>';
      o += '<path d="M' + pt(CX + m * 38, top + band) + "L" + pt(CX + m * 42, 520) + '" fill="none" stroke="' + INK + '" stroke-opacity=".3" stroke-width="1"/>';
      o += '<path d="M' + pt(CX + m * 96, top + band + 4) + "L" + pt(CX + m * 80, 530) + '" fill="none"' + stroke(1) + "/>";
      o += '<path d="M' + pt(CX + m * 8, hem - 16) + "L" + pt(CX + m * 138, hem - 16) + '" fill="none" stroke="' + INK + '" stroke-opacity=".4" stroke-width=".9" stroke-dasharray="3 3"/>';
    });
    o += '<path d="M' + pt(CX + 2, top + band) + "L" + pt(CX + 2, 540) + "Q" + pt(CX + 2, 556) + " " + pt(CX - 12, 556) + '" fill="none"' + stroke(1) + "/>";
    o += '<rect x="' + (CX - 104) + '" y="' + top + '" width="208" height="' + band + '" fill="' + shade(c, -0.05) + '"' + stroke() + "/>";
    // belt
    o += '<rect x="' + (CX - 106) + '" y="' + (top + 6) + '" width="212" height="12" fill="' + LEATHER + '"' + stroke(1) + "/>";
    o += '<path d="M' + pt(CX - 104, top + 12) + "L" + pt(CX + 104, top + 12) + '" stroke="#C9A27A" stroke-opacity=".5" stroke-width=".8" stroke-dasharray="2 3"/>';
    o += '<rect x="' + (CX - 16) + '" y="' + (top + 2) + '" width="22" height="20" rx="2" fill="none" stroke="' + hw + '" stroke-width="3.2"/>';
    [-84, -50, 50, 84].forEach(function (x) { o += '<rect x="' + (CX + x - 3) + '" y="' + (top - 1) + '" width="6" height="26" fill="' + shade(c, -0.08) + '"' + stroke(.9) + "/>"; });
    return o;
  }

  function attachmentsSvg(s, g, hw, base) {
    var a = s.attachments || [], o = "";
    var has = function (k) { return a.indexOf(k) > -1; };
    if (has("pocket")) {
      var px = CX - g.W + 40, pw = 64, py = 166;
      var pc = shade(base, luminance(base) > .6 ? -0.08 : 0.07);
      o += '<g class="att-pocket"><rect x="' + px + '" y="' + py + '" width="' + pw + '" height="74" rx="2" fill="' + pc + '"' + stroke() + "/>";
      o += '<path d="M' + pt(px - 2, py) + "L" + pt(px + pw + 2, py) + "L" + pt(px + pw + 2, py + 24) + "L" + pt(px - 2, py + 24) + 'Z" fill="' + shade(pc, -0.1) + '"' + stroke() + "/>";
      o += '<rect x="' + (px + 4) + '" y="' + (py + 28) + '" width="' + (pw - 8) + '" height="42" fill="none" stroke="' + INK + '" stroke-opacity=".35" stroke-width=".8" stroke-dasharray="3 2.5"/>';
      o += '<circle cx="' + (px + pw / 2) + '" cy="' + (py + 14) + '" r="5" fill="' + hw + '"' + stroke(.9) + "/></g>";
    }
    if (has("strap")) {
      var x1 = CX - 30, y1 = 70, x2 = CX + g.W - 6, y2 = s.base === "set" ? 444 : g.hem - 50;
      var dx = x2 - x1, dy = y2 - y1, l = Math.sqrt(dx * dx + dy * dy), nx = -dy / l * 8, ny = dx / l * 8;
      o += '<g class="att-strap"><path d="M' + pt(x1 + nx, y1 + ny) + "L" + pt(x2 + nx, y2 + ny) + "L" + pt(x2 - nx, y2 - ny) + "L" + pt(x1 - nx, y1 - ny) + 'Z" fill="' + LEATHER + '"' + stroke(1.1) + "/>";
      o += '<path d="M' + pt(x1 + nx * .6, y1 + ny * .6) + "L" + pt(x2 + nx * .6, y2 + ny * .6) + "M" + pt(x1 - nx * .6, y1 - ny * .6) + "L" + pt(x2 - nx * .6, y2 - ny * .6) + '" stroke="#C9A27A" stroke-opacity=".55" stroke-width=".8" stroke-dasharray="2.5 3"/>';
      var mx = x1 + dx * .42, my = y1 + dy * .42, ang = Math.atan2(dy, dx) * 180 / Math.PI;
      o += '<g transform="translate(' + mx.toFixed(1) + " " + my.toFixed(1) + ") rotate(" + ang.toFixed(1) + ')"><rect x="-14" y="-12" width="28" height="24" rx="3" fill="none" stroke="' + hw + '" stroke-width="3.6"/><rect x="-3" y="-12" width="3" height="24" fill="' + hw + '"/></g>';
      o += '<rect x="' + (x2 - 9) + '" y="' + (y2 - 8) + '" width="18" height="16" rx="2" fill="none" stroke="' + hw + '" stroke-width="3"/></g>';
    }
    if (has("charm")) {
      var cx = s.base === "set" ? CX + 64 : CX + g.W - 34, cy = s.base === "set" ? 452 : g.hem - 4;
      var leaf = leafPath(cx, cy + 46, 15);
      o += '<g class="att-charm"><path d="M' + pt(cx, cy) + "L" + pt(cx, cy + 30) + '" stroke="' + hw + '" stroke-width="2.4" stroke-dasharray="3.5 2"/>';
      o += '<circle cx="' + cx + '" cy="' + cy + '" r="4" fill="none" stroke="' + hw + '" stroke-width="2"/>';
      o += '<rect x="' + (cx - 12) + '" y="' + (cy + 31) + '" width="24" height="30" rx="3" fill="' + hw + '"' + stroke(.9) + "/>";
      o += '<path d="' + leaf.a + leaf.b + '" fill="' + shade(hw, -0.45) + '"/></g>';
    }
    return o;
  }

  /* ---------- main ---------- */
  function render(state, opts) {
    var s = Object.assign({}, DEFAULT_STATE, state || {});
    opts = opts || {};
    var id = ++uid;
    var g = fitGeom(s);
    var base = col(s.color);
    var sleeveCol = s.sleeveColor && s.sleeveColor !== "match" ? col(s.sleeveColor) : (s.sleeve === "raglan" ? (s.color === "oxide" ? col("cream") : col("oxide")) : base);
    var hw = (HARDWARE[s.hardware] || HARDWARE.brass).hex;
    var set = s.base === "set";
    var vb = opts.viewBox || (set ? "40 24 520 900" : "40 24 520 " + (s.sleeve === "long" ? 440 : Math.max(330, g.hem - 10)));
    var part = function (cls, key, inner) {
      return opts.interactive ? '<g class="part ' + cls + '" data-part="' + key + '">' + inner + "</g>" : "<g>" + inner + "</g>";
    };

    var defs = '<defs><linearGradient id="vol' + id + '" x1="0" x2="1" y1="0" y2="0">' +
      '<stop offset="0" stop-color="#fff" stop-opacity=".10"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/>' +
      '<stop offset=".8" stop-color="#000" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient></defs>';

    var out = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" role="img" aria-label="' + describe(s) + '"' + (opts.className ? ' class="' + opts.className + '"' : "") + ">" + defs;

    // ground shadow
    var gy = set ? 908 : (s.sleeve === "long" ? 452 : g.hem + 22);
    if (!opts.mini) out += '<ellipse cx="' + CX + '" cy="' + gy + '" rx="' + (set ? 170 : 190) + '" ry="7" fill="#000" opacity=".06"/>';

    // bottom (drawn first only when the tee is cropped so the crop sits over the waist)
    var bottom = set ? part("part-bottom", "bottom", trouserSvg(s, hw, id)) : "";
    if (set && !g.tucked) out += bottom;

    // body
    var body = '<path d="' + bodyPath(g) + '" fill="' + base + '"' + stroke() + "/>";
    body += '<path d="' + bodyPath(g) + '" fill="url(#vol' + id + ')"/>';
    if (!g.tucked) body += '<path d="M' + pt(CX - g.W + 4, g.hem - 12) + "Q" + pt(CX, g.hem - 4) + " " + pt(CX + g.W - 4, g.hem - 12) + '" fill="none" stroke="' + INK + '" stroke-opacity=".4" stroke-width=".9" stroke-dasharray="3 3"/>';
    // soft drape folds
    body += '<path d="M' + pt(CX - g.W * .45, g.Uy + 30) + "Q" + pt(CX - g.W * .4, (g.Uy + g.hem) / 2) + " " + pt(CX - g.W * .5, g.hem - 20) + '" fill="none" stroke="' + INK + '" stroke-opacity=".12" stroke-width="1.2"/>';
    body += '<path d="M' + pt(CX + g.W * .5, g.Uy + 50) + "Q" + pt(CX + g.W * .42, (g.Uy + g.hem) / 2 + 20) + " " + pt(CX + g.W * .55, g.hem - 16) + '" fill="none" stroke="' + INK + '" stroke-opacity=".12" stroke-width="1.2"/>';
    if ((s.attachments || []).indexOf("panel") > -1) {
      var pc = s.color === "oxide" ? col("cream") : (s.color === "cream" ? col("chocolate") : col("oxide"));
      [-1, 1].forEach(function (m) {
        var x0 = CX + m * g.W, x1 = CX + m * (g.W - 28), hb = g.tucked ? g.hem : g.hem + 2;
        body += '<path d="M' + pt(x0, g.Uy) + "L" + pt(x1, g.Uy + 4) + "L" + pt(x1 + m * -2, hb - 2) + "L" + pt(x0 - m * 2, hb - 4) + 'Z" fill="' + pc + '"' + stroke(1.1) + "/>";
        body += '<path d="M' + pt(x1 - m * 4, g.Uy + 8) + "L" + pt(x1 - m * 5, hb - 8) + '" stroke="' + hw + '" stroke-width="1.6" stroke-dasharray="1.5 2"/>';
      });
    }
    if (s.label !== "none") {
      var lf = leafPath(CX + (s.collar === "polo" ? 46 : 0), s.collar === "polo" ? 158 : 150, 16);
      var lc = s.label === "tonal" ? shade(base, luminance(base) > .5 ? -0.14 : 0.16) : (luminance(base) > .5 ? INK : "#E9E2D4");
      body += '<path d="' + lf.a + lf.b + '" fill="' + lc + '"/>';
    }
    out += part("part-body", "color", body);

    // sleeves
    var sl = sleeveShape(s, g);
    var sleeve = '<path d="' + sl.d + '" fill="' + sleeveCol + '"' + stroke() + '/><path d="' + sl.d + '" fill="url(#vol' + id + ')"/>' +
      '<path d="' + sl.cuff + '" fill="none" stroke="' + INK + '" stroke-opacity=".5" stroke-width=".9"' + (s.sleeve === "long" ? "" : ' stroke-dasharray="3 3"') + "/>";
    out += part("part-sleeve-l", "sleeve", sleeve);
    out += part("part-sleeve-r", "sleeve", '<g transform="translate(600 0) scale(-1 1)">' + sleeve.replace(/url\(#vol(\d+)\)/g, "url(#vol$1)") + "</g>");

    // collar
    out += part("part-collar", "collar", collarSvg(s, base));

    // trouser over a tucked tee
    if (set && g.tucked) out += bottom;

    // attachments sit on top of everything
    var att = attachmentsSvg(s, g, hw, base);
    if (att) out += part("part-attach", "attachments", att);

    return out + "</svg>";
  }

  function describe(s) {
    s = Object.assign({}, DEFAULT_STATE, s || {});
    return (s.base === "set" ? "The Set" : "The Polo") + " in " + (COLORS[s.color] || COLORS.navy).name;
  }

  DOZI.garment = {
    render: render,
    describe: describe,
    COLORS: COLORS,
    HARDWARE: HARDWARE,
    DEFAULT_STATE: DEFAULT_STATE,
    leafPath: leafPath
  };
})(window);
