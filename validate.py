"""Check generated HTML, local links, and required assets without network access."""

import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

from content import ROOT

PUBLIC_PAGES = {"index.html", "artifact.html", "data-challenge-scenarios.html"}

PUBLIC_ASSETS = (
    "theme-init.js", "interactions.js", "cascading-dots.js", "data-challenge-scenarios.js",
    "favicon.svg",
    "key-points-deck.js", "portfolio-social.png", "ml-vs-dl-infographic.png", "ml-vs-dl-preview.jpg",
    *(f"key-points-{name}.png" for name in (
        "activations", "ann", "ethics", "fit_danger", "gan", "overlap", "rnn",
    )),
)

REQUIRED = (*sorted(PUBLIC_PAGES), "style.css", *PUBLIC_ASSETS)


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []
        self.errors = []
        self.h1_count = 0

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        identifier = values.get("id")
        if identifier:
            if identifier in self.ids:
                self.errors.append(f"Duplicate id: {identifier}")
            self.ids.add(identifier)
        if tag == "h1":
            self.h1_count += 1
        for attribute in ("href", "src"):
            if values.get(attribute):
                self.links.append(values[attribute])


def validate_site(directory):
    directory = Path(directory).resolve()
    errors = []
    public_names = {path.relative_to(directory).as_posix() for path in directory.rglob("*") if path.is_file()}
    for name in REQUIRED:
        path = directory / name
        if name not in public_names or not path.is_file() or path.stat().st_size == 0:
            errors.append(f"Missing or empty asset: {name}")
    parsed = {}
    public_html = {name for name in public_names if Path(name).suffix.lower() == ".html"}
    for name in sorted(public_html - PUBLIC_PAGES):
        errors.append(f"Unexpected public page: {name}")
    for path in directory.glob("*.html"):
        parser = PageParser()
        parser.feed(path.read_text(encoding="utf-8"))
        parser.close()
        parsed[path] = parser
        errors.extend(f"{path.name}: {error}" for error in parser.errors)
        if parser.h1_count != 1:
            errors.append(f"{path.name}: expected one h1, found {parser.h1_count}")
        if "main-content" not in parser.ids:
            errors.append(f"{path.name}: missing skip-link target")
    for path, parser in parsed.items():
        for link in parser.links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                if url.scheme != "https" or not url.hostname:
                    errors.append(f"{path.name}: expected HTTPS for external link: {link}")
                continue
            target = (path.parent / unquote(url.path)).resolve() if url.path else path
            if directory not in target.parents:
                errors.append(f"{path.name}: local link escapes output: {link}")
            elif target.relative_to(directory).as_posix() not in public_names or not target.is_file():
                errors.append(f"{path.name}: missing link target: {link}")
            elif url.fragment and target in parsed and unquote(url.fragment) not in parsed[target].ids:
                errors.append(f"{path.name}: missing fragment: {link}")
    for pdf in directory.rglob("*"):
        if pdf.is_file() and pdf.suffix.lower() == ".pdf":
            errors.append(f"PDF files are not allowed in the public build: {pdf.relative_to(directory)}")
    if errors:
        raise ValueError("\n".join(errors))
    return len(parsed)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", nargs="?", type=Path, default=ROOT / "dist")
    args = parser.parse_args()
    try:
        count = validate_site(args.directory)
    except (OSError, ValueError) as error:
        parser.exit(1, f"Validation failed: {error}\n")
    print(f"Validated {count} pages and their local links and assets.")
