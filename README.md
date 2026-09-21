# AUREL

An original, fictional premium restaurant portfolio concept inspired by open-fire cooking, warm stone and intimate evening light.

The static production website is in `dist/`. Serve that directory over HTTP. All fonts, photographs and libraries are local; the application has no database, forms, payments, booking integration or analytics. The only local storage entry remembers motion preference.

## Design

Warm ivory, charcoal and oxblood; DM Serif Display and DM Sans; cinematic generated food and interior photography. Desktop has a scroll-pinned hero and a four-dish rotation. Mobile has a deliberately stacked hero, simplified motion and a persistent reservation action. Navigation, gallery, dish details, cutaway lens, experience panels and policy dialogs work with keyboard controls.

## Asset sources

Nine original images were generated using the built-in imagegen tool. Full prompts are in `artwork/prompts.json`, originals in `artwork/`, and optimized WebP variants in `dist/assets/`. Run `optimize-assets.py` to regenerate the WebP variants. Font licenses are included alongside the fonts. GSAP retains its embedded license notices; Three.js includes its license file.

## Important scope limits

- The requested cooking film was not generated. Higgsfield returned “Requires plus plan or higher.” The craft section uses the generated kitchen photograph, with no false play button or video claim.
- The WebGL composition is a modeled ceramic plate with a photographic food surface. It is a shallow 3D composition, not a fully modeled food asset or a 360-degree scan.
- The cutaway is a generated interpretation with approximate ingredient alignment. Its edge is masked to preserve the original plate, and the circular lens leaves the original image unchanged outside the lens.
- AUREL is not a real restaurant. Booking and location actions disclose this. There are no invented prices, address, phone, hours, reviews or awards. Search indexing is disabled and structured data describes a website, not an operating Restaurant.

## Validation

Run `validate.py` for local asset references, section links, image metadata and palette contrast. JavaScript files pass Node syntax validation. See `QA.md` for browser checks and remaining verification limits.

Next production step for a real restaurant: obtain verified business content and a real booking destination, replace illustrative content, commission or supply a licensed cooking film, and run real-device and field-performance testing.
