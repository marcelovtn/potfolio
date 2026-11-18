# marcelotavora.dev

Personal site. One page, three roles and one side project, no framework.

## Why it is built this way

The site argues that I do front-end performance work, so it is held to that claim:

- **Two runtime dependencies** — `react` and `react-dom`. No CSS framework, no UI
  library, no icon package, no animation library, no router.
- **Zero webfonts.** Type is the system serif and system mono stack, so the page
  pays nothing for fonts and has no flash of unstyled text.
- **No images on the critical path.** The recurring graphic is a parametric dot
  field generated as inline SVG, so it costs no request and no image decode.
- **The Tetris board is a separate 2.4 KB chunk**, fetched only on viewports wide
  enough to play it and never under `prefers-reduced-motion`.
- **Bilingual (English / Portuguese)** with no i18n library: two copy bundles and
  one React context. Language follows `navigator.language` and persists.

### Measured against the previous version

Both builds produced with `npm run build` and compared as shipped.

| | Before (forked template) | After |
|---|---|---|
| JavaScript, gzipped | 232 KB | **55 KB** |
| CSS, gzipped | 36 KB | **3.2 KB** |
| Critical path total, gzipped | ~349 KB | **~59 KB** |
| Modules in bundle | 628 | **49** |
| Runtime dependencies | 11 | **2** |
| Webfont requests | 1, cross-origin | **0** |

The previous version carried Bootstrap, `react-tsparticles`, `react-pdf`,
`react-router-dom`, `react-icons`, `react-parallax-tilt`, `typewriter-effect` and
a render-blocking Google Fonts `@import`.

## Design system

Tokens live in `src/styles/tokens.css`. The method — one spacing scale, a
display/mono pairing, zero border radius, two grounds and a single restrained
accent — is carried over from the [Verbalt](https://verbalt.com.br) brand system
I built the landing page for. The palette and typography here are this site's own.

## Structure

```
src/
  content/copy.ts     all page copy and case-study data, in one file
  styles/tokens.css   design tokens
  styles/global.css   reset, primitives, components
  components/         Header
  sections/           Hero, Experience, Projects, About, Contact
```

Editing text means editing `copy.ts` only. Adding a case study means adding an
object to the `cases` array.

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc --noEmit
npm run lint
npm run build
```
