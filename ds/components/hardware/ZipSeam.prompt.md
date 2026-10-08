Hardware & fabric primitives that make the site feel like a garment.

**Zipper** — sections are closed by a real zip. Drag the pull, click it, or press Enter.
```jsx
<Zipper label="The edit" title="Choose a base." hint="Pull to open the edit">
  <section style={{ background: 'var(--fabric-denim-washed)', padding: 64 }}>…</section>
</Zipper>
<Zipper compact coverHeight={64} label="Fabric & care"><p>…</p></Zipper>
```
**ZipSeam** — a closed zip as a static divider between sections: `<ZipSeam />`.

**Stitched** — fabric patch with topstitch. Surfaces: bone, denim, dark, washed, leather, paper.
```jsx
<Stitched surface="bone" rivets double>…</Stitched>
```
**Rivet** — `<Rivet size={12} />` for patch corners.

**LeatherPatch** — debossed brand patch: `<LeatherPatch width={240} tagline="Made by us. Made yours." />`.
