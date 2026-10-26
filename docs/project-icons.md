# Portfolio project icons

Updated on 2026-10-26. Icons appear at 24 by 24 CSS pixels next to project titles in both main and secondary work lists. They have empty alternative text because the adjacent title identifies the project. No extra frame, background or shadow is added by the portfolio.

| Project | Local asset | Origin |
| --- | --- | --- |
| Design System | `public/projects/design-system/favicon.png` | Existing company design-system repository favicon |
| Notiiv | `public/projects/notiiv/favicon.svg` | Existing portfolio asset, matching the product repository |
| document-workspace | `public/projects/document-workspace/icon.svg` | New portfolio-only vector mark, document with a cell grid |
| Intranet | `public/projects/intranet/icon.png` | Existing app icon in the portfolio |
| Boundra | `public/projects/boundra/icon.svg` | New portfolio-only vector mark, domain boundary and contract |
| OWKR Match | `public/projects/owkr/favicon.webp` | [Repository favicon](https://github.com/Overwatch-KR/owkr-balance/blob/main/public/favicon.webp) |
| 점주로 | `public/projects/jeomjuro/non-favicon.svg` | Existing portfolio asset |
| Marker | `public/projects/marker/icon.png` | [Original repository logo](https://github.com/highthon-12/marker-web/blob/main/public/Logo.png) |
| Rust for TypeScript Developers | `public/projects/rust-with-typescript/favicon.svg` | [Repository favicon](https://github.com/qtaghdi/rust-with-typescript/blob/main/public/favicon.svg) |
| Kivra | `public/projects/kivra/icon.svg` | [Existing plugin icon in the moved repository](https://github.com/Kivra-App/Kivra/blob/main/plugins/jetbrains/src/main/resources/META-INF/pluginIcon.svg) |
| Bigtablet Homepage | `public/projects/design-system/favicon.png` | Existing company mark |
| Echo | `public/projects/echo/icon.svg` | New portfolio-only waveform, original app logo was not located |
| Chorus | `public/projects/chorus/favicon.svg` | [Repository favicon](https://github.com/qtaghdi/chorus/blob/main/src/lib/assets/favicon.svg) |

## Echo asset investigation

The only listed branch was `main`. Its full recursive tree contains fonts and four TSX interface icons under `assets`, but no image files. `app.json` references `assets/images/icon.png` and `assets/images/favicon.png`; fetching both returned 404. The commit history for `assets/images` returned no entries. All 28 commits reachable from main were checked through their recursive trees, and none contained PNG, SVG, ICO, WebP, JPEG, GIF or AVIF files. The app entry and home code did not define a logo.

This establishes that the image was not found in the checked Git history, not that it never existed locally or in a different repository. The replacement waveform is explicitly a portfolio illustration and has not been added to the Echo application repository.

New portfolio marks are editable native SVGs. Existing source icons are preserved rather than recolored or replaced.
