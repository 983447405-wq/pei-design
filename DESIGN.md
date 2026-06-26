# AI Product Designer Portfolio Design System

This project uses `awesome-design-md` as a design reference library. The current direction is derived from:

- Primary influence: `awesome-design-md/design-md/linear.app/DESIGN.md`
- Secondary influence: `awesome-design-md/design-md/raycast/DESIGN.md` and `awesome-design-md/design-md/vercel/DESIGN.md`
- Motion influence: selected restraint from `awesome-design-md/design-md/framer/DESIGN.md`

## Visual Direction

- Dark canvas first: `#010102` with a Linear-style surface ladder.
- Use near-black, charcoal panels, off-white text, and 1px hairline borders as the core system.
- Use lavender-blue (`#5e6ad2` / `#828fff`) as the single chromatic accent for focus, links, icons, and measured motion highlights.
- Product UI mockups, command-palette panels, and project asset cards are the primary visuals.
- Keep cards compact, sharp, calm, and product-like. Motion should clarify hierarchy and orientation.

## Motion Principles

1. **Entrance motion is quiet**
   - Use fade + vertical lift.
   - Duration: 600-900ms.
   - Easing: cubic-bezier(0.16, 1, 0.3, 1).
   - No bouncing, spinning, or layout shifts.

2. **Cards feel alive, not playful**
   - Use subtle hover translate: -2px to -4px.
   - Use a controlled border/glow increase on hover.
   - Keep scale small: 1.01 maximum.

3. **Spotlight surfaces move slowly**
   - Gradient spotlight animation: 8-14s.
   - Motion should be ambient, not attention-seeking.
   - Use background-position drift and opacity breathing.

4. **Interaction feedback is immediate**
   - Buttons and links: 160-220ms transitions.
   - Focus rings use lavender-blue signal color.
   - Primary CTA uses a compact white or lavender-tinted button with 8px radius.

5. **Respect reduced motion**
   - Disable ambient gradient movement.
   - Replace entrance animation with static visible state.

## Motion Tokens

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-soft: cubic-bezier(0.65, 0, 0.35, 1);
--duration-fast: 180ms;
--duration-med: 700ms;
--duration-slow: 12s;
```

## Implementation Classes

- `.motion-rise`: entrance fade/lift.
- `.motion-card`: hoverable card movement.
- `.motion-spotlight`: slow Framer-style gradient drift.
- `.motion-sheen`: small CTA/card highlight sweep.

## Do

- Keep motion tied to product hierarchy.
- Make scroll and hover states feel premium but restrained.
- Use one or two gradient spotlight cards per viewport at most.

## Don't

- Do not add a loading animation.
- Do not animate layout properties like width, height, top, or left.
- Do not use full-section gradients everywhere.
- Do not make motion compete with portfolio content.
