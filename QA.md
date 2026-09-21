# AUREL — QA record

Checked on 21 September 2026 in the connected Chromium preview.

## Verified

- Responsive document widths: 390, 430, 768, 1024, 1280, 1440 and 1920 pixels. No document-level horizontal overflow in the measured states.
- Desktop and 390-pixel hero visually inspected and revised. Story, menu and dish display inspected.
- Mobile navigation opens and gallery action works.
- Reservation CTA opens the fictional-concept disclosure; Escape and close controls work.
- Four menu-item buttons open the corresponding dish detail.
- Eight gallery entries cycle in the correct sequence, with captions; Escape closes.
- Cutaway button activates; arrow key updates lens coordinates; Escape closes.
- Dish selector changes dish counter, name, description, imagery and color; WebGL canvas reaches ready state.
- Motion off removes the enhanced choreography and persists across reload. Motion on can be restored.
- Story navigation lands below the fixed header when the browser is visible.
- Experience panel expansion works.
- Browser error/warning logs were empty during the successful interaction pass.
- Static production checks passed: 35 HTML asset references, 14 anchors, 16 image elements with alternative text and dimensions; no duplicate IDs.
- Both authored JavaScript files pass syntax checks.
- Palette contrast: primary text 12.33:1, muted text on paper 5.27:1, primary button 8.61:1.
- All primary images and fonts are local, WebP variants are responsive, noncritical images are lazy, and Three.js loads near its viewport. Rendering is demand-driven and pauses offscreen/when hidden.
- Initial application + GSAP + ScrollTrigger scripts total about 51 KB gzip. Total static site is about 4.73 MB uncompressed, including lazy Three.js and all image variants.

## Corrections after critique

- Added cache versions to prevent an earlier local script being reused during preview.
- Fixed stale scroll-trigger state after switching desktop to mobile.
- Increased small metadata sizes to 12 pixels.
- Confined the cutaway variant to the food region to avoid a mismatched plate perimeter.
- Kept fictional status visible and removed any expectation of a real booking or location.

## Not verified or incomplete

- Cooking video is absent because the connected generator requires a paid plan. No video-performance or playback claim is made.
- WebGL food uses photography on a shallow ceramic model; it is not a fully modeled dish.
- Touch input has Pointer Events support in code; physical iOS/Android touch testing was not performed.
- No Lighthouse score, real-user Core Web Vitals, cross-browser audit or assistive-technology certification is claimed.
- System reduced-motion handling is implemented; browser testing covered the manual motion control and persistence, not an OS preference change.
- Cutaway alignment is close rather than pixel-perfect; the original plate is retained outside the central food mask and circular lens.
