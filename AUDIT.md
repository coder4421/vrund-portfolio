# AI Learning Artifacts audit

Reviewed November 17, 2026 against commit `c7577b3`. The public site is an artifact collection built with Python and served by GitHub Pages. Its homepage and instructor URL serve the same three artifacts. The [file inventory](FILE-AUDIT.csv) covers all 75 paths tracked at the start, including generated files and the historical graph snapshot. It records changes, removals, sizes, and SHA-256 hashes.

## Findings and fixes

| Priority | Finding | Resolution |
| --- | --- | --- |
| High | The release tests counted the artifact information blocks but could miss a missing or mislabeled field. The validator also accepted additional HTML pages. | Tests now verify all ten ordered labels and nonempty descriptions in each of the three blocks. The validator rejects extra HTML routes, including nested files. |
| Medium | Social previews still advertised healthcare career pages. | The 1200 × 630 preview now identifies Vrund Patel’s AI learning collection and its three artifacts. |
| Low | The output shipped an unused workstation script and a menu handler for a removed header. | The build retires the public workstation copy through its manifest. The original workstation source and test remain available. The active interaction script handles theme switching. |
| Low | Authoring notes and diagrams mixed the old career portfolio and the current collection. | The README now documents the artifact-only build and deck behavior. The November 13 architecture snapshot is labeled historical. |
| Low | Local editor MCP configuration could be staged accidentally. | The exact local configuration path is ignored. Its contents were outside the audit scope. |

## Verification

- The Python build and site validator passed for both public entry points. The exported HTML files are byte-identical. Exported assets matched their source copies, and no public PDFs were present.
- All 13 Python tests passed, including the private résumé regression. Both Node test suites passed, covering the 11-slide deck, nine diagrams, keyboard navigation, four-second autoplay, pause, focus, reduced motion, and the archived workstation logic.
- Chrome verified the theme switch, three artifact anchors, and ten fields per artifact at 320, 768, and 1440 CSS pixels. There was no horizontal overflow at those widths. All 11 slides and nine diagrams loaded, with no console errors during that check.
- Tracked PNGs decoded, JSON and SVG files parsed, and Git integrity and installed dependency metadata checks passed. A targeted scan found no common private-key or GitHub-token signatures in the reviewed application paths. This was a limited local scan.

## Open evidence gaps

- The supplied patch and React deck were absent at review. The current release uses the approved Python build. The source deck labels the reported 99.8% spirals result as 32+32 hidden units. The alternate 8+8 result and 4+4 seed-sensitivity claim still need source evidence.
- Physical devices, assistive technology sessions, live Poe behavior, third-party reference availability, dependency source internals, and historical Git object content were outside the audit scope.
- GitHub Actions builds a clean export on `main`. To roll back a release, revert its commit on `main` and let the workflow publish the reverted output. The [repository Actions history](https://github.com/coder4421/vrund-portfolio/actions) records build and deploy results.
