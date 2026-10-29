# Chorus catalog repair

Checked on 2026-10-29. Base source: qtaghdi/chorus `232169f`.

The public search endpoint returned 404 for IU and Beatles. Direct iTunes queries returned an empty Korean catalog and valid US results. The original app searched and loaded selected tracks only through the Korean catalog.

`catalog-fallback.patch` contains the reviewable repair against that source. Both search and track lookup try KR then US, distinguish successful empty results from upstream failures, and expose empty/error states in the search UI. The playback control now has an accessible label.

## Verification

- Three catalog tests pass: search and lookup fallback, empty versus unavailable catalogs, and preferred-region success without fallback.
- `pnpm check`: zero errors; one existing warning about the initial Studio controller value.
- Production build passes with the existing Svelte/dependency chunk warnings.
- Local app using real iTunes responses: search Beatles, select Hey Jude, render the 3D editor, start playback and observe the clock advance, edit the message, and download the PNG successfully.
- The downloaded card is the unchanged 350 x 622 PNG in `public/projects/chorus/export.png`. Search and editor captures are from the repaired local app, not the public deployment. The search capture replays the successful real API response to keep the captured result independent of upstream availability.

The patch is not pushed or deployed. The portfolio's direct Chorus service link is withheld until the public search flow is repaired. Its source and local screenshots remain available in the case study.

## Apply to a Chorus checkout

```sh
git apply /absolute/path/to/portfolio/docs/chorus-repair/catalog-fallback.patch
node --test tests/itunes.test.ts
pnpm check
pnpm build
```
