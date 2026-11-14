# Vrund Patel Portfolio

A static, five-page website built with HTML, CSS and vanilla JavaScript. No React or npm is needed. The published site is ready to view; Python 3.9 or newer is needed only for authoring.

## Run locally
Open [dist/index.html](dist/index.html) in a browser, or serve the site from this folder:

```sh
python3 -m http.server 8000 --directory dist
```

Visit http://localhost:8000.

## Published files
- [dist/index.html](dist/index.html): healthcare-focused homepage
- [dist/work.html](dist/work.html): three engineering case studies
- [dist/experience.html](dist/experience.html): professional experience
- [dist/skills.html](dist/skills.html): technical expertise
- [dist/artifact.html](dist/artifact.html): ScreenWise team lab, ML/deep-learning comparison, Key Concepts in AI & Machine Learning slide presentation, and dated research notes
- [dist/style.css](dist/style.css): combined styles
- [dist/](dist/): also contains JavaScript, favicon

Host the contents of [dist/](dist/) with any static web host.

## Optional authoring workflow
Edit the source files, then build:

```sh
python3 build.py
```

The build uses only the Python standard library. It creates [dist/](dist/) if missing, renders five pages, copies assets, and checks local links and required files before publishing. Run it from any working directory using the script's absolute path. Use `--output /path/to/output` for a separate output directory. Only the default [dist/](dist/) is allowed inside the source tree; other output directories must be outside it. Source ancestors and symlink aliases into source are rejected. A [.build-files.json](dist/.build-files.json) manifest removes only retired generated files on rebuild, while unrelated author files are kept. Running [pages.py](pages.py) directly also builds the complete site.

| Source | Purpose |
| --- | --- |
| [content-data.json](content-data.json) | Job summaries, bullets, résumé descriptions, expertise groups and trusted AI-notes HTML |
| [pages.py](pages.py) | Page layout, case studies and HTML rendering |
| [base.css](base.css), [redesign.css](redesign.css), [glass.css](glass.css), [fixes.css](fixes.css), [key-points-deck.css](key-points-deck.css), [cursor.css](cursor.css) | Styles in their build order |
| [assets/](assets/) | Source JavaScript, slide diagrams and favicon; the private résumé is generated here only on request |
| [artifacts/key-concepts.html](artifacts/key-concepts.html), [key-points-deck.css](key-points-deck.css) | Artifact 3 presentation and its scoped styles, adapted from the supplied static deck |
| [content.py](content.py) | Content validation shared by the generators |

Jobs are named JSON objects; keep each job's summary, bullets and résumé description together. Plain text is escaped when rendered. The artifact field intentionally contains trusted HTML. Theme selectors use `data-theme` consistently in both source and output CSS.

Edits made directly in [dist/](dist/) are overwritten by the next build. Update source JavaScript and the favicon in [assets/](assets/).

## Regenerate the résumé

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python resume.py
.venv/bin/python build.py
```

On Windows, use `.venv\Scripts\python.exe` for the virtual environment commands. Requirements select ReportLab 4.4.10 on Python 3.9 and ReportLab 5.1 or newer on Python 3.10+. ReportLab supplies the embedded Vera fonts, so no operating-system font installation or path edits are needed. [resume.py](resume.py) updates the bundled PDF in [assets/](assets/); The public build excludes PDF files, so generating a résumé does not publish it. Its optional `--output` argument writes a PDF elsewhere.

## Checks

```sh
python3 validate.py
python3 -m unittest -v
```

[validate.py](validate.py) checks local link targets, fragments, duplicate IDs, page headings, skip-link targets and required assets. It does not make network requests. For the optional PDF text and page-count regression check, install `pypdf` in the same environment as ReportLab, then run `.venv/bin/python -m unittest -v`. Without these dependencies, that PDF check is reported as skipped. An installed dependency that fails to import is a test failure.

For browser logic, run the two small Node.js checks when Node is installed:

```sh
node tests/key-points-deck.test.cjs
node tests/workstation.test.cjs
```

The validator also requires every slide diagram and social-preview asset, including images loaded dynamically by JavaScript.

## Audit and project map

- [AUDIT.md](AUDIT.md): current findings, fixes, cleanup decisions and validation limits.
- [FILE-AUDIT.csv](FILE-AUDIT.csv): every inventoried file, its purpose/category and whether it was retained, changed, added or deleted.
- [project-graph.svg](project-graph.svg): compact architecture overview.
- [graphify-out/GRAPH_REPORT.md](graphify-out/GRAPH_REPORT.md), [graphify-out/graph.html](graphify-out/graph.html): source relationship report and interactive graph.

The local [.sites-review/](.sites-review/) checkout retains the hosting manifest and Git history. Its application source is synchronized after this audit; no deployment is performed. Its private résumé stays out of both public build directories. The stale release archive and unused AppMap/design-gate configuration were removed.

## Accessibility and behavior
The system cursor stays visible. The white dot trail runs only for hover-capable fine pointers and is disabled with reduced motion. Theme preferences are saved locally. Google Fonts loads directly from the page head with preconnected origins; system fonts are the fallback. Touch devices use opaque glass colors without backdrop filtering or hover movement. Desktop glass effects and reduced-motion handling remain available.

No hosting credentials, access tokens or Git history are included.
