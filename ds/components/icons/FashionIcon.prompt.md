Garment-hardware icons (zip pull, buckle, safety pin, stitch, rivet, button, needle, hanger, hang tag, scissors) that animate on hover — the zip swings, the pin opens, the stitch sews. Use them for nav, verbs and add-ons instead of generic UI icons.
```jsx
<FashionIcon name="zip" />
<FashionIcon name="tag" size={20} active={hovered} />   // parent controls the animation
<FashionIcon name="stitch" animate="always" color="var(--thread)" />
```
Mapping: Shop → hanger · Design → needle · Chapters → scissors · Search → pin · Bag → tag · Detach → zip · Attach → button · Swap → buckle · Adapt → pin · Express → needle.
