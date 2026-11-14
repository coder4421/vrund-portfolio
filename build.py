"""Build the static portfolio from source without modifying it on import."""

import argparse
import json
from pathlib import Path
import shutil
from tempfile import TemporaryDirectory

from content import ROOT, load_content
from pages import render_pages
from validate import validate_site

CSS_FILES = ("base.css", "redesign.css", "glass.css", "fixes.css", "key-points-deck.css", "cursor.css")


def build(output_dir=None):
    """Render and validate everything before publishing generated files."""
    output = (Path(output_dir) if output_dir is not None else ROOT / "dist").resolve()
    if output == ROOT or output in ROOT.parents or (ROOT in output.parents and output != ROOT / "dist"):
        raise ValueError("Choose dist or an output directory outside the source directory.")
    pages = render_pages(load_content())
    css = "\n".join((ROOT / name).read_text(encoding="utf-8") for name in CSS_FILES)
    output.parent.mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory(prefix=".portfolio-build-", dir=output.parent) as temp:
        staged = Path(temp)
        for asset in (ROOT / "assets").iterdir():
            if asset.is_file() and asset.suffix.lower() != ".pdf":
                shutil.copyfile(asset, staged / asset.name)
        (staged / "style.css").write_text(css, encoding="utf-8")
        for filename, html in pages.items():
            (staged / filename).write_text(html, encoding="utf-8")
        validate_site(staged)
        generated = sorted(path.name for path in staged.iterdir())
        manifest = output / ".build-files.json"
        previous = json.loads(manifest.read_text(encoding="utf-8")) if manifest.is_file() else []
        if not isinstance(previous, list) or any(
            not isinstance(name, str) or not name or Path(name).name != name or name in (".", "..")
            for name in previous
        ):
            raise ValueError("Invalid build file manifest; output was not changed.")
        (staged / manifest.name).write_text(json.dumps(generated, indent=2) + "\n", encoding="utf-8")
        output.mkdir(parents=True, exist_ok=True)
        for pdf in output.rglob("*"):
            if pdf.is_file() and pdf.suffix.lower() == ".pdf":
                pdf.unlink()
        for artifact in staged.iterdir():
            artifact.replace(output / artifact.name)
        for name in set(previous) - set(generated):
            retired = output / name
            if retired.is_file() or retired.is_symlink():
                retired.unlink()
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "dist")
    args = parser.parse_args()
    try:
        output = build(args.output)
    except (OSError, ValueError) as error:
        parser.exit(1, f"Build failed: {error}\n")
    print(f"Built and validated five pages in {output}")


if __name__ == "__main__":
    main()
