# Vrund Patel Portfolio

A static AI learning artifact collection built with HTML, CSS and vanilla JavaScript. The public site uses the Python static build. Python 3.9 or newer is required to regenerate it.

## Run locally
Open [dist/index.html](dist/index.html) in a browser, or serve the site from this folder:

```sh
python3 -m http.server 8000 --directory dist
```

Visit http://localhost:8000.

## Published files
- [dist/index.html](dist/index.html): the artifact collection homepage
- [dist/artifact.html](dist/artifact.html): ScreenWise team lab, ML/deep-learning comparison, Key Concepts in AI & Machine Learning slide presentation, also available through this instructor link
- [dist/style.css](dist/style.css): combined styles
- [dist/](dist/): also contains JavaScript, favicon

Host the contents of [dist/](dist/) with any static web host.

## GitHub Pages hosting

The portfolio's GitHub Pages address is https://coder4421.github.io/vrund-portfolio/.
The artifacts page is https://coder4421.github.io/vrund-portfolio/artifact.html.

[The Pages workflow](.github/workflows/pages.yml) runs the Python and JavaScript tests, builds into a clean temporary directory, validates the output, and publishes only those public files when `main` changes. Pull requests run the checks without deploying. In repository **Settings → Pages**, the publishing source must be **GitHub Actions**. You can also deploy the latest `main` from the workflow's **Run workflow** button. To roll back, revert the relevant commit on `main`; the same checks run before publishing the previous content.

PDFs, source files, project reports and the local Site checkout are not uploaded to Pages. Navigation and assets use relative links so the repository URL works without path rewrites. The previous ChatGPT-hosted site is retained separately; this workflow does not update or remove it.

## Authoring
Edit the source files, then build:

```sh
python3 build.py
```

The build uses only the Python standard library. It creates [dist/](dist/) if missing, renders the collection at both URLs, copies assets, and checks local links and required files before publishing. Run it from any working directory using the script's absolute path. Use `--output /path/to/output` for a separate output directory. Only the default [dist/](dist/) is allowed inside the source tree; other output directories must be outside it. Source ancestors and symlink aliases into source are rejected. A [.build-files.json](dist/.build-files.json) manifest removes only retired generated files on rebuild, while unrelated author files are kept. Running [pages.py](pages.py) directly also builds the complete site.

| Source | Purpose |
| --- | --- |
| [content-data.json](content-data.json) | Job summaries, bullets, résumé descriptions, expertise groups and trusted AI-notes HTML |
| [pages.py](pages.py) | Artifact collection layout and HTML rendering |
| [base.css](base.css), [redesign.css](redesign.css), [glass.css](glass.css), [fixes.css](fixes.css), [key-points-deck.css](key-points-deck.css), [cursor.css](cursor.css) | Styles in their build order |
| [assets/](assets/) | Source JavaScript, slide diagrams and favicon; the private résumé is generated here only on request |
| [artifacts/key-concepts.html](artifacts/key-concepts.html), [key-points-deck.css](key-points-deck.css) | Artifact 3 presentation and its scoped styles, adapted from the supplied static deck |
| [content.py](content.py) | Private résumé data validation and the project root path |

The artifact pages use the three HTML files in [artifacts/](artifacts/). The résumé generator uses the job entries in [content-data.json](content-data.json). The earlier AI notes and expertise data remain in the source archive. Theme styles use `data-theme`.

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

[validate.py](validate.py) checks local link targets, fragments, duplicate IDs, page headings, skip-link targets, required assets and unexpected HTML pages. It does not make network requests. For the optional PDF text and page-count regression check, install `pypdf` in the same environment as ReportLab, then run `.venv/bin/python -m unittest -v`. Without these dependencies, that PDF check is reported as skipped. An installed dependency that fails to import is a test failure.

For the deck and the archived workstation script, run the Node.js checks:

```sh
node tests/key-points-deck.test.cjs
node tests/workstation.test.cjs
```

The validator also requires every slide diagram and social-preview asset, including images loaded dynamically by JavaScript.

## Audit and project map

- [AUDIT.md](AUDIT.md): current findings, fixes, cleanup decisions and validation limits.
- [FILE-AUDIT.csv](FILE-AUDIT.csv): every inventoried file, its purpose/category and whether it was retained, changed, added or deleted.
- [Project graph](project-graph.svg) shows the current build and deployment flow. The [Graphify snapshot](graphify-out/GRAPH_REPORT.md) documents the November 13, 2026 architecture with separate career pages.

The deck advances every four seconds while visible. Visitors can pause it or use its manual controls. Keyboard focus pauses autoplay, and reduced-motion settings disable autoplay and slide animation.

## Accessibility and behavior
The system cursor stays visible. The white dot trail runs only for hover-capable fine pointers and is disabled with reduced motion. Theme preferences are saved locally. Google Fonts loads directly from the page head with preconnected origins; system fonts are the fallback. Touch devices use opaque glass colors without backdrop filtering or hover movement. Desktop glass effects and reduced-motion handling remain available.

No hosting credentials, access tokens or Git history are included.
