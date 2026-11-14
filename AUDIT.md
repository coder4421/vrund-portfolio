What this repo does: Python renders five static portfolio pages from shared content, three learning artifacts, six stylesheets and browser assets. Visitors read the work, switch themes and navigate an 11-slide presentation. This audit assumes one author and ordinary static hosting.

Reviewed November 13, 2026 (America/Chicago). This replaces the November 7 report. No deployment is authorized or performed by this audit.

## File-by-file coverage

The initial census covered **2,168 files / 57,763,401 bytes**, including hidden files, the deployment checkout, generated output, graph caches and the Python environment. Every file was inventoried and hashed, or recorded as a symlink. The complete disposition list is [FILE-AUDIT.csv](FILE-AUDIT.csv).

All project-owned Python, JavaScript, HTML, CSS, JSON, documentation and configuration were reviewed. Generated pages were checked against fresh output and exercised in a browser. All eleven PNG assets were decoded and verified; the SVGs were parsed. The private PDF in the deployment checkout was checked for readable text and retained. Dependency metadata passed `pip check`, and the checkout passed `git fsck`.

The 1,934 environment files were inventoried as installed runtime/dependency files, not treated as dead project code. Their upstream implementations and Git object contents were not line-by-line security audited. Git integrity and application behavior were checked separately.

## Must fix — completed

1. **Build output could still target source subfolders** ([build.py](build.py), [test_build.py](test_build.py)).
   - What this is: The builder writes generated files and removes PDFs from its output.
   - Problem: Although the source root and assets were protected, output inside other source folders could still reach private files or tooling.
   - Fix: Only the default `dist` is allowed inside source; other destinations must be outside source. Regressions reject artifacts, environment and deployment-checkout destinations, including symlink aliases, before reading or writing source.
   - If skipped: An incorrect output argument can damage source/private files.

2. **Missing slide diagrams could pass validation** ([validate.py](validate.py), [test_build.py](test_build.py)).
   - What this is: Slide images are loaded by JavaScript rather than static image tags.
   - Problem: HTML link validation alone did not see those nine images. Social-preview and workstation/deck scripts were also absent from the required-asset check.
   - Fix: Require all nine diagrams, both scripts and the social/ML images. A regression deletes a built diagram and verifies validation fails. The Node deck suite also traverses all eleven slides and checks diagram paths.
   - If skipped: A build can appear valid while an artifact or social preview is broken.

## Should fix — completed

3. **Retired generated files survived rebuilds** ([build.py](build.py), [test_build.py](test_build.py)).
   - What this is: The previous builder overwrote current output without tracking retired output.
   - Problem: The rejected `artifact-tilt.js` and its associated license remained in the public build after their source files were removed.
   - Fix: Removed those stale files. Builds now record their own filenames in [dist/.build-files.json](dist/.build-files.json), and remove only previously generated files that are no longer produced. Unrelated author files remain untouched. Unsafe manifest paths are rejected without publishing or deleting anything.
   - If skipped: Old effects/assets can be accidentally shipped again, and output grows indefinitely.

4. **Stale scratch files and an obsolete release archive** ([FILE-AUDIT.csv](FILE-AUDIT.csv), [.gitignore](.gitignore)).
   - What this is: Old release, design-gate, AppMap and bytecode files remained in the project.
   - Problem: The archive predates Artifact 3, the failed design-gate state has no active consumer, and the project AppMap servers referenced absent recordings/configuration.
   - Fix: Removed **27 obsolete project/scratch files / 2,667,048 bytes**: the old archive; two rejected effect files; two design-gate JSON files; the unused AppMap configuration; and 21 cached bytecode files across the source/deployment checkout. Empty scratch folders were removed. Orphaned graph cache entries are pruned separately and listed in the CSV. Added ignore rules for local runtimes, bytecode, staging and private memory. Also removed four CSS rules for classes absent from all project sources.
   - If skipped: Stale files remain easy to mistake for a current release or active check.

5. **Slide wording mixed source claims with current evidence** ([assets/key-points-deck.js](assets/key-points-deck.js), [artifacts/key-concepts.html](artifacts/key-concepts.html)).
   - What this is: The supplied course deck includes numerical experiment results and references to other planned artifacts.
   - Problem: The experiment code/data are not present, old progress counts no longer match this portfolio, and several technical statements were too absolute.
   - Fix: Label the scores as source-deck results; correct the progress count; remove misleading planned-artifact references; clarify ReLU, max pooling, recurrent-network gates and GAN training. Supply readable captions for information clipped in three original diagrams. Preserve all eleven slides, nine source diagrams, the exact Artifact 3 heading and the requested entrance animation.
   - If skipped: Readers can mistake a source-deck claim for a reproduced result or read an oversimplification as a guarantee.
   - References: [TensorFlow ReLU](https://www.tensorflow.org/api_docs/python/tf/nn/relu), [TensorFlow RNN guide](https://www.tensorflow.org/guide/keras/working_with_rnns), [MIT convolution/pooling chapter](https://visionbook.mit.edu/convolutional_neural_nets.html), [original GAN paper](https://arxiv.org/abs/1406.2661).

6. **The graph and maintenance documents described an older portfolio** ([README.md](README.md), [project-graph.svg](project-graph.svg), [graphify-out/GRAPH_REPORT.md](graphify-out/GRAPH_REPORT.md)).
   - What this is: The old map and release notes described two artifacts and nine Python tests.
   - Problem: They omitted Artifact 3, the workstation, slide behavior tests and later source changes. Old release notes still described publication as pending after the historical release had succeeded.
   - Fix: Refresh the source map, architecture SVG, audit, file census and authoring documentation from current files. Preserve hosting identity and Git history in the local deployment checkout and synchronize current application source before rebuilding it. Remove the old archive instead of leaving a misleading release candidate.
   - If skipped: Later maintenance or deployment can use an obsolete copy or misleading graph.

## Files deliberately retained

- All six CSS files participate in the existing cascade; deleting any whole stylesheet would alter the approved design. A broad style rewrite was not justified.
- [resume.py](resume.py) and [requirements.txt](requirements.txt) support the documented private résumé workflow and its regression. They are not unused merely because the website does not run Python in visitors' browsers.
- [.venv/](.venv/) is the active authoring/test environment.
- [.sites-review/](.sites-review/) contains the only local Git history, hosting identity and an existing private résumé. Its unique private file and Git metadata were preserved; it is an intentional deployment checkout, not disposable duplicate history.
- [.ecc/memory/project/](.ecc/memory/project/) is explicitly required project memory. Historical records are context, not current instructions or deployment authorization.
- [PONYTAIL-LICENSE.txt](PONYTAIL-LICENSE.txt) is required attribution for the instruction adapter.
- Graph outputs, manifests and extraction caches support navigation and future updates. Graph scope and extraction limits are stated in the graph report; generated output, environments and private memory are excluded from the semantic corpus.

## Validation

- Fresh build and local link/asset validation pass for all five pages.
- **12 Python tests pass**, including readable one-page private PDF output, path safety, invalid-link non-publication, managed-file cleanup and diagram validation.
- **Two Node.js behavior suites pass**, covering the full deck, all nine diagram paths, keyboard scope/focus and workstation pointer/touch/reduced-motion behavior.
- Python dependency consistency and JavaScript syntax checks pass; no credential-pattern matches were found in project-owned executable/content source.
- All five pages pass layout/landmark/heading/navigation checks at **320, 390, 768, 1024 and 1440 pixels**: no horizontal document overflow or duplicate IDs.
- All eleven slides pass five-width checks (**55 rendered slide cases**) with decoded images and no observed new page errors or overflow.
- Mobile menu opening/Escape closing, saved theme across navigation, keyboard skip-link focus, focus-preserving slide controls, reduced-motion handling and native-pointer behavior were checked.
- External HEAD requests: **nine HTTP 200 responses**; OpenAI and Poe return **403 to automation**. Those two links were retained because this does not prove the destination is broken. Python's local CA configuration rejected HTTPS verification, so the checks used the system curl trust store without disabling TLS verification.
- Graph refresh: **245 nodes, 370 resolved relationship records, 14 communities** across 34 detected files plus seven manually indexed CSS/ignore files. The interactive overview has 328 combined edges. The extractor left 30 unresolved and six external raw AST relations; these were not promoted to verified facts. All retained edge endpoints exist and all 41 recorded source hashes match.
- Source manifest freshness reports zero changed or deleted files after refresh. Root and deployment-checkout public builds match byte-for-byte, including the generated file manifest.

## Preserved product behavior

The glass layout and straight homepage panel, original navigation, ScreenWise team credits, first two artifact sources, exact Artifact 3 title, all nine supplied deck images, reduced-motion rules and touch exclusions remain. Public builds contain no PDFs or résumé downloads. No employment outcomes or model-performance results were invented. Touch devices retain opaque glass without backdrop filtering. Direct page-head font discovery and origin preconnections remain. Optional PDF tests skip only absent packages; installed dependency import failures still fail the suite.

## Limits

Original educational raster images retain source cropping; captions recover the missing labels and explain the CNN equivariance distinction. Source-deck numerical scores remain attributed and were not reproduced without their code/data. These are provenance limits, not claims of independently verified experiments.

Not checked: physical phones, Safari, screen-reader speech output, field Core Web Vitals, upstream dependency source audits, live model behavior, authentication-gated content, or a post-deployment site. Browser emulation does not establish real-device performance. No production deployment occurred.

Verdict: the verified build, cleanup, asset-validation and stale-documentation defects are fixed. The remaining limits are listed explicitly above.
