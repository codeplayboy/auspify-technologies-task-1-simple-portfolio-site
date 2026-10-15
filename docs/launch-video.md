# ARUN.S launch film

## Purpose

This 25-second product-launch video presents the assigned Auspify Technologies Task 1 project as a real product story rather than a generic portfolio slideshow.

## Story beats

1. The problem: portfolios can flatten the work into a list.
2. The assignment: Auspify Technologies Task 1 and the ARUN.S concept.
3. The build: editorial cover, interactive Three.js/GLB character, skills, experience, and CV flow.
4. The proof: Atlas Ledger, Northstar LMS, and Registrar project concepts.
5. The resolution: responsive, documented, publicly shipped, with thanks to Auspify Technologies.

## Motion system

- Remotion frame-driven composition at 30fps and 1920×1080.
- Motion-design timing uses spring entrances, staggered table rows, floating character-card motion, rotating editorial markers, image drift, and integrated narration callouts.
- Captions are placed per narration beat, with different positions, sizes, alignments, colors, and entry choreography so they belong to the composition instead of behaving like a fixed subtitle track.
- The character beat uses the actual `arun-pole-reader-hq.png` asset from the portfolio's Three.js/GLB experience.

## Re-render

```bash
cd video/arun-launch-film
npm install
npm run render
```

The source composition is in `video/arun-launch-film/src/index.jsx`. The final delivery is `docs/media/arun-s-launch-film.mp4` with poster `docs/media/arun-s-launch-film-poster.jpg`.

## Audio and claims

The narration describes only verified portfolio sections and implemented demo functionality. Fictional companies and mock projects remain identified as fictional/mock in the portfolio documentation. The closing message is:

> Special thanks to Auspify Technologies for this opportunity.
>
> Built with curiosity. Driven by engineering. Inspired to keep learning.
