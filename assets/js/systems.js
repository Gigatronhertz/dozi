/* ==========================================================================
   DOZI systems — every modular piece other than The Polo.
   Each system is one base photographed in several versions (base → fully built).
   Images: assets/img/systems/{id}-{colour}-{n}.jpg, all framed identically.
   Prices are placeholders.
   ========================================================================== */
(function (global) {
  "use strict";
  var DOZI = global.DOZI = global.DOZI || {};
  var ROOT = "assets/img/systems/";

  var C = {
    navy: { name: "Navy", hex: "#1F2B4D" }, burgundy: { name: "Burgundy", hex: "#6B1F26" },
    denim: { name: "Washed Denim", hex: "#3E5A80" }, indigo: { name: "Raw Indigo", hex: "#22304F" },
    olive: { name: "Olive / Black", hex: "#3F3D2C" }, mixed: { name: "Black / Stone", hex: "#2A2826" }
  };

  var SYSTEMS = [
    { id: "jacket", name: "The Core Jacket", cat: "outerwear", collection: "utility", price: 185000, colours: ["olive"],
      material: "Waxed Cotton / Brass",
      blurb: "One jacket, many versions. The hood zips on at the collar, the sleeves zip off at the shoulder, pockets snap on at the chest and hip.",
      versions: [["Core Jacket", "The base"], ["+ Hood", "Zip-on hood", 22000], ["+ Alternate Sleeves", "Oxide sleeves", 26000], ["+ Utility Attachments", "Snap-on pockets", 30000], ["Full Custom", "Hood, panels, sleeves, pockets", 64000]] },
    { id: "tee", name: "The Core Tee", cat: "tops", collection: "utility", price: 45000, colours: ["mixed"],
      material: "Heavy Cotton Jersey",
      blurb: "The simplest DOZI base. Zip channels at the sides take panels, the shoulders take sleeves, and the chest takes a clip-on pocket.",
      versions: [["Core Tee", "The base"], ["Panel Tee", "Zip-in side panels", 9000], ["Utility Tee", "Straps and clip-on pocket", 14000], ["Raglan Tee", "Contrast raglan sleeves", 9000], ["Crop Tee", "Zip-off hem, adjustable straps", 12000]] },
    { id: "baggy-trouser", name: "The Baggy Trouser", cat: "bottoms", collection: "utility", price: 88000, colours: ["navy"],
      material: "Heavy Navy Twill / Brass",
      blurb: "A voluminous base with zip side seams. Add cargo pouches, zip the legs off at the knee, cinch the ankles, or load it with harness straps.",
      versions: [["Base Baggy", "Side-seam zips"], ["Tactical Cargo", "Snap-on pouches and straps", 34000], ["Convertible Short", "Zip-off lower legs", 0], ["Cinched Jogger", "Knee and ankle straps", 12000], ["Fully Loaded", "Suspenders, pouches, panels", 58000]] },
    { id: "set-trouser", name: "The Set Trouser", cat: "bottoms", collection: "corporate", price: 92000, colours: ["navy"],
      material: "Navy Wool-Cotton Twill",
      blurb: "The wide pleated trouser from The Set. A strap rail at the waist, D-rings at the hips, zip-off lower legs and snap-on pouches.",
      versions: [["Base", "Belt and strap rail"], ["With Pouch", "Snap-on utility pouch", 9500], ["With Strap", "Hip strap on the D-rings", 12000], ["Zip-off Lower", "Wide short", 0], ["Contrast Panels", "Oxide side panels", 14000], ["Multi Attachment", "Pouches, charm, strap", 28000], ["Cuffed", "Drawstring cuffs", 6000]] },
    { id: "dress", name: "The Utility Dress", cat: "dresses", collection: "dresses", price: 175000, colours: ["navy", "burgundy", "denim"],
      material: "Cotton Twill / Brass",
      blurb: "One dress in three cloths. Necklines change, the skirt zips off to a mini, and cargo pockets and a harness snap on.",
      versions: [["Off-shoulder", "Zip front, cargo pockets"], ["Halter", "Laced corset bodice", 22000], ["Zip-off Mini", "Skirt zips off at the hem", 0], ["Ruched", "Drawcord ruching", 12000], ["Harness", "Straps, pockets, D-rings", 38000]] },
    { id: "zip-dress", name: "The Zip Dress", cat: "dresses", collection: "dresses", price: 158000, colours: ["navy"],
      material: "Navy Cotton Twill",
      blurb: "A shirt dress built on zips: zip-open hem slits, a vest of pockets, a zip-off skirt and an overall harness.",
      versions: [["Shirt Dress", "Zip slits, drawstring waist"], ["Utility Vest", "Pocket vest and D-rings", 26000], ["Zip-off Mini", "Separates at the waist", 0], ["Ruched", "Side drawcords", 10000], ["Overall", "Straps and cargo pockets", 36000]] },
    { id: "two-piece", name: "The Two-Piece", cat: "dresses", collection: "dresses", price: 132000, colours: ["burgundy"],
      material: "Burgundy Cotton Twill",
      blurb: "A top and skirt that change together: zip, laced, cropped, asymmetric or fully harnessed.",
      versions: [["Zip Set", "Zip top, slit skirt"], ["Laced", "Corset top, cargo skirt", 18000], ["Crop + Leg", "Zip-on leg warmers", 12000], ["Asymmetric", "Ruched skirt, pocket", 10000], ["Harness", "Utility top, strap skirt", 34000]] },
    { id: "heel", name: "The Modular Heel", cat: "footwear", collection: "footwear", price: 150000, colours: ["navy"],
      material: "Navy Leather / Canvas / Brass",
      blurb: "A pump that builds up: an ankle strap with a pouch, a zip shaft that makes it a bootie, buckled straps, and a knee boot of pockets.",
      versions: [["Pump", "D-ring trim"], ["Ankle Strap", "Strap and snap pouch", 18000], ["Zip Bootie", "Zip-on shaft, lug sole", 42000], ["Strapped Bootie", "Buckled harness", 52000], ["Utility Knee Boot", "Pocket shaft", 88000]] },
    { id: "sneaker", name: "The Core Sneaker", cat: "footwear", collection: "footwear", price: 140000, colours: ["navy"],
      material: "Navy Canvas / Leather / Brass",
      blurb: "A low sneaker that grows: a zip-on high-top collar with a pouch, a gaiter shaft, a strapped boot and a lugged utility boot.",
      versions: [["Low", "The base"], ["High-top", "Zip collar and pouch", 22000], ["Gaiter Boot", "Zip-on canvas shaft", 38000], ["Strapped Boot", "Wrap straps and buckles", 52000], ["Utility Boot", "Pockets and lug sole", 76000]] },
    { id: "bag", name: "The Carry System", cat: "bags", collection: "carry", price: 120000, colours: ["indigo"],
      material: "Patchwork Indigo Denim / Brass",
      blurb: "Pouches, straps and harnesses move between a backpack, a messenger, a chest rig, a duffel and a tote.",
      versions: [["Backpack", "Roll-top, two pouches"], ["Messenger", "Shoulder strap, two pouches", 0], ["Chest Rig", "Harness and pouches", 0], ["Duffel", "Three zip pouches", 20000], ["Tote", "Clip-on pouches", 0]] },
    { id: "suit", name: "The Denim Suit", cat: "outerwear", collection: "denim", price: 210000, colours: ["indigo"],
      material: "Raw Indigo / 14oz Denim",
      blurb: "Tailoring that comes apart: zip welt pockets, a snap-on patch vest, a zip-off coat hem and utility pockets that clip on.",
      versions: [["Single-breasted", "Zip welt pockets"], ["Vest", "Patch-pocket vest", 18000], ["Zip Coat", "Zip-off long hem", 46000], ["Double-breasted", "Brass buttons, zip welts", 24000], ["Utility", "Clip-on pocket rig", 38000]] },
    { id: "denim-coat", name: "The Denim Coat", cat: "outerwear", collection: "denim", price: 240000, colours: ["indigo"],
      material: "Washed Indigo Denim",
      blurb: "Oversized denim layers: zip sleeves, a removable vest, a belted trench and field jackets with ankle-strapped trousers.",
      versions: [["Oversized Suit", "Zip-detail blazer"], ["Long Coat + Vest", "Cargo trouser", 30000], ["Belted Trench", "Self belt", 20000], ["Panel Field Jacket", "Zip sleeves, knee panels", 40000], ["Utility Field Set", "Strapped knees and ankles", 52000]] }
  ];

  function sys(id) { return SYSTEMS.filter(function (s) { return s.id === id; })[0]; }
  function img(s, colour, v) { return ROOT + s.id + "-" + (colour || s.colours[0]) + "-" + ((v || 0) + 1) + ".jpg"; }
  function normalize(st) {
    var s = sys(st && st.base) || SYSTEMS[0];
    var colour = s.colours.indexOf(st && st.color) > -1 ? st.color : s.colours[0];
    var v = Math.max(0, Math.min(s.versions.length - 1, +(st && st.v) || 0));
    return { base: s.id, color: colour, v: v };
  }
  function price(st) { st = normalize(st); var s = sys(st.base); return s.price + (s.versions[st.v][2] || 0); }
  function summary(st) {
    st = normalize(st); var s = sys(st.base), v = s.versions[st.v];
    return [["Base", s.name], ["Colour", C[st.color].name], ["Version", v[0]], ["Adds", v[1]]];
  }

  DOZI.systems = { list: SYSTEMS, get: sys, img: img, normalize: normalize, price: price, summary: summary, COLOURS: C, ROOT: ROOT };
})(window);
