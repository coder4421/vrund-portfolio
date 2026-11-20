# AI Learning Artifacts audit

## November 19, 2026 release audit

Reviewed the tracked workspace against `8d507a2`, including source HTML and CSS, browser scripts, build and validation code, the optional résumé generator, regression tests, the generated public files, the GitHub Pages workflow, and graph artifacts. [FILE-AUDIT.csv](FILE-AUDIT.csv) records each tracked path, its release disposition, and hashes of the final files. The inventory omits its own hash because it is self-referential. The earlier snapshots passed 13 Python tests. The release added a regression for the public asset allowlist and symlink rejection, bringing the total to 14. The Graphify release refresh supersedes the historical 245-node, 370-edge snapshot with 317 nodes and 417 links.

| Area | Finding and resolution |
| --- | --- |
| Public file exposure | The build could publish any ordinary file dropped into `assets/`. The export now copies only explicitly allowlisted assets and rejects symlinks in that list. The clean release retires the two original slide PNGs replaced by HTML diagrams. Their originals remain in source. |
| Browser policy | All three public pages now apply a content policy that restricts scripts to the same origin and blocks inline script execution, external connections, form submissions, and base URL overrides. Theme initialization and the split-demo handlers run from local scripts. Inline styles and the two Google Fonts origins are allowed for the existing design. |
| Deployment supply chain | The Pages workflow pins all six directly invoked Actions to full commits resolved from their official release tags and disables checkout credential persistence. Deploy permissions stay at the deploy job. |
| Link validation | The validator checks exact-case local paths and HTTPS for external links. It validates the lightweight overview thumbnail alongside the full-size detail image. |
| Structure and design | The four cards share preview dimensions. Artifact 4 uses a train/test table preview. The detailed artifact H3s have an H2 parent, and their sections derive accessible names from those headings. ScreenWise’s disclosure contains its design-process list directly. New-tab cues precede decorative arrows. |

### Verification

- A clean export matched `dist/` byte for byte. The homepage and instructor page are identical. The release contains three public HTML routes and excludes PDFs, private source files, and audit artifacts.
- All 14 Python tests and both Node suites passed. Tracked raster images, JSON and SVG files parsed. Git integrity and installed package compatibility checks passed.
- Chrome checked all three routes at 320, 390, 768, and 1440 CSS pixels, including touch emulation at the two phone widths. Expanded disclosures fit without horizontal overflow in both themes. Verified all five collection jump links, all 11 slides, the two split-demo states, and image decoding. No console warnings or errors appeared. Keyboard focus and the accessible link names were also checked in the preceding release preflight.
- The tracked working tree scan found no matches for common private-key or API-token patterns. OSV returned no known advisories for the checked optional PDF dependency versions. This was a point-in-time advisory check, not a guarantee for future resolutions of dependency ranges.
- Eight external links returned HTTP 200 after following redirects. Automated requests to Poe and OpenAI returned HTTP 403. A post-deploy Chrome session loaded the shared ScreenWise page and OpenAI’s announcement. Availability on restricted networks and to crawlers can differ.
- Refreshed the Graphify code extraction and verified the overview, thumbnail, and standalone Artifact 4 source links. The graph contains 317 nodes and 417 resolved links. Other document and image semantics carry forward from the previous snapshot.

### Live verification

GitHub Pages deployed `7e43a0d`. Every published file matched the release export. In live Chrome, the collection and standalone Artifact 4 shared the saved theme even with the browser emulating the opposite system preference. Changing the theme in Artifact 4 carried back to the collection. At 320 and 390 CSS pixels, the train/test preview fit inside its 132 px frame without horizontal overflow. Keyboard Enter opened Coursework details on both routes. Chrome’s accessibility tree exposed expanded disclosure states, labeled jump navigation, and new-tab link names.

### Boundaries

The public site is static and has no account system, data submission, or backend API. GitHub Pages provides HTTPS and HSTS. The content policy is delivered in HTML. Host-level response-header configuration and frame-embedding restrictions are outside this repository’s deployment control. The review did not inspect historical Git objects, private ignored files, physical devices, screen-reader speech, or third-party dependency internals.

## Historical follow-up · November 19, 2026

Reviewed the local four-artifact update. The homepage and instructor page contain the same collection, and Artifact 4 opens at its own validated route. The four cards use a single column on narrow screens and two columns on wider screens. Chrome checks at 320, 390, 768, and 1440 CSS pixels found no horizontal page overflow. The collection theme switch and 44-pixel navigation targets worked, and the preview images decoded. At this checkpoint, Artifact 4 followed the system theme independently. The published release now shares the saved collection theme. Its split demo and five navigation targets passed the earlier Chrome review at 320, 390, 761, and 1440 pixels.

The build and link validator passed for all three public routes. All 13 Python tests passed with the optional PDF dependencies available, along with both Node suites. The architecture SVG now includes the fourth source and public route. Graphify refreshed code extraction and includes manually verified Artifact 4 HTML relationships. The inventory has since been refreshed for the current release.

This follow-up covered the local build. Physical devices, assistive technology, and live deployment were outside its scope.

## Historical baseline · November 17, 2026

This section records completed findings and verification as of November 17, 2026 against commit `c7577b3`. Current release status appears above. The public site is an artifact collection built with Python and served by GitHub Pages. Its homepage and instructor URL serve the same three artifacts. The baseline inventoried 75 paths. The [current file inventory](FILE-AUDIT.csv) now covers the release audit. The earlier inventory remains in Git history.

### Findings and fixes

| Priority | Finding | Resolution |
| --- | --- | --- |
| High | The release tests counted the artifact information blocks but could miss a missing or mislabeled field. The validator also accepted additional HTML pages. | Tests now verify all ten ordered labels and nonempty descriptions in each of the three blocks. The validator rejects extra HTML routes, including nested files. |
| Medium | Social previews still advertised healthcare career pages. | The 1200 × 630 preview now identifies Vrund Patel’s AI learning collection and its three artifacts. |
| Low | The output shipped an unused workstation script and a menu handler for a removed header. | The build retires the public workstation copy through its manifest. The original workstation source and test remain available. The active interaction script handles theme switching. |
| Low | Authoring notes and diagrams mixed the old career portfolio and the current collection. | The README now documents the artifact-only build and deck behavior. The standalone SVG shows the current build and deployment flow. The November 13 Graphify snapshot is labeled historical in the README. |
| Low | Local editor MCP configuration could be staged accidentally. | The exact local configuration path is ignored. Its contents were outside the audit scope. |

### Verification

- The Python build and site validator passed for both public entry points. The exported HTML files are byte-identical. Exported assets matched their source copies, and no public PDFs were present.
- All 13 Python tests passed, including the private résumé regression. Both Node test suites passed, covering the 11-slide deck, nine diagrams, keyboard navigation, four-second autoplay, pause, focus, reduced motion, and the archived workstation logic.
- Chrome verified the theme switch, three artifact anchors, and ten fields per artifact at 320, 768, and 1440 CSS pixels. There was no horizontal overflow at those widths. All 11 slides and nine diagrams loaded, with no console errors during that check.
- Tracked PNGs decoded, JSON and SVG files parsed, and Git integrity and installed dependency metadata checks passed. A targeted scan found no common private-key or GitHub-token signatures in the reviewed application paths. This was a limited local scan.

### Open evidence gaps

- The supplied patch and React deck were absent at review. The current release uses the approved Python build. The source deck labels the reported 99.8% spirals result as 32+32 hidden units. The alternate 8+8 result and 4+4 seed-sensitivity claim still need source evidence.
- Physical devices, assistive technology sessions, live Poe behavior, third-party reference availability, dependency source internals, and historical Git object content were outside the audit scope.
- GitHub Actions builds a clean export on `main`. To roll back a release, revert its commit on `main` and let the workflow publish the reverted output. The [repository Actions history](https://github.com/coder4421/vrund-portfolio/actions) records build and deploy results.

### Follow-up review of unchanged files

| File | Evidence and disposition |
| --- | --- |
| `.github/workflows/pages.yml` | Reviewed the clean export and permissions. Pull requests run the checks, and only `main` can deploy. The workflow passed on commit `32f766d`. |
| `graphify-out/` | Parsed the JSON files and confirmed all 370 saved edges resolve to the 245 saved nodes. Retained as a dated historical snapshot. Its HTML viewer references a CDN, which was outside this check. |
| `PONYTAIL-LICENSE.txt` | Confirmed the MIT text and attribution are present. Kept the license intact. |
| `base.css` | Reviewed base layout and mobile gutters. Checked that the collection fits desktop and mobile in Chrome. |
| `redesign.css` | Reviewed the responsive defaults and verified the artifact selectors override the legacy palette in the combined build. |
| `glass.css` | Reviewed the theme and transparency fallbacks. In Chrome the cards use blur on desktop and disable it for a coarse pointer. |
| `cursor.css` | Confirmed the native cursor remains visible. The trail was present on desktop and absent with touch emulation. |
| `content-data.json` | Loaded with the real content validator and exercised the job entries through the private résumé test. Historical notes and expertise remain outside the public build. |
| `content.py` | Checked the schema validation and reran the regression for a missing job field. The public build imports the project root without loading archived résumé data. |
| `requirements.txt` | Installed dependencies passed `pip check`. The PDF test ran with Python 3.9.5 and ReportLab 4.4.10. The newer Python marker was reviewed, but dependency installation on that branch was outside this follow-up. |
| `resume.py` | Replaced its legacy work-page URL with the current artifact collection. The PDF test verifies the new hyperlink, one-page output, escaped text and job details. PDFs remain outside the export. |
