"""Regression checks for standalone builds, content edits, and failed builds."""

import importlib
import importlib.util
import json
import re
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

from build import build
from content import load_content
from pages import render_pages
from validate import validate_site


class PortfolioBuildTests(unittest.TestCase):
    def test_clean_build_is_complete_and_repeatable(self):
        with TemporaryDirectory() as temp:
            output = Path(temp) / "site"
            build(output)
            self.assertEqual(validate_site(output), 3)
            first = {path.name: path.read_bytes() for path in output.iterdir()}
            build(output)
            self.assertEqual(first, {path.name: path.read_bytes() for path in output.iterdir()})
            self.assertFalse((output / "workstation.js").exists())
            self.assertNotIn("body.light", (output / "style.css").read_text(encoding="utf-8"))

    def test_imports_do_not_write_files(self):
        with patch.object(Path, "write_text", side_effect=AssertionError("Import wrote a file")):
            for name in ("content", "pages", "resume", "build"):
                importlib.reload(importlib.import_module(name))

    def test_build_rejects_outputs_that_can_destroy_source_pdfs(self):
        with TemporaryDirectory() as temp:
            root = (Path(temp) / "source").resolve()
            assets = root / "assets"
            assets.mkdir(parents=True)
            private = assets / "private.pdf"
            private.write_bytes(b"private source")
            alias = Path(temp) / "assets-alias"
            alias.symlink_to(assets, target_is_directory=True)
            with patch("build.ROOT", root), patch("build.render_pages", side_effect=AssertionError("Unsafe output reached source loading")) as load:
                for output in (root, root.parent, assets, assets / "public", alias,
                               root / "artifacts", root / ".venv", root / ".sites-review"):
                    with self.subTest(output=output):
                        with self.assertRaisesRegex(ValueError, "source"):
                            build(output)
                load.assert_not_called()
            self.assertEqual(private.read_bytes(), b"private source")

    def test_rebuild_removes_only_retired_managed_files(self):
        with TemporaryDirectory() as temp:
            output = build(Path(temp) / "site")
            retired = output / "retired-script.js"
            retired.write_text("old generated code", encoding="utf-8")
            keep = output / "author-note.txt"
            keep.write_text("keep", encoding="utf-8")
            manifest = output / ".build-files.json"
            owned = json.loads(manifest.read_text(encoding="utf-8"))
            manifest.write_text(json.dumps(owned + [retired.name]), encoding="utf-8")
            build(output)
            self.assertFalse(retired.exists())
            self.assertEqual(keep.read_text(encoding="utf-8"), "keep")

    def test_unsafe_manifest_does_not_delete_files_or_publish(self):
        with TemporaryDirectory() as temp:
            output = build(Path(temp) / "site")
            outside = Path(temp) / "private.txt"
            outside.write_text("private", encoding="utf-8")
            (output / ".build-files.json").write_text('["../private.txt"]', encoding="utf-8")
            before = {path.name: path.read_bytes() for path in output.iterdir()}
            with self.assertRaisesRegex(ValueError, "manifest"):
                build(output)
            self.assertEqual(outside.read_text(encoding="utf-8"), "private")
            self.assertEqual(before, {path.name: path.read_bytes() for path in output.iterdir()})

    def test_missing_dynamic_diagram_is_reported(self):
        with TemporaryDirectory() as temp:
            output = build(Path(temp) / "site")
            (output / "key-points-ann.png").unlink()
            with self.assertRaisesRegex(ValueError, "key-points-ann.png"):
                validate_site(output)

    def test_public_pdfs_are_rejected_and_removed_on_rebuild(self):
        with TemporaryDirectory() as temp:
            output = build(Path(temp) / "site")
            (output / "archive").mkdir()
            pdfs = [output / "Vrund_Patel_Resume.pdf", output / "archive" / "old-resume.PDF"]
            for pdf in pdfs:
                pdf.write_bytes(b"%PDF-1.4\n")
                with self.assertRaisesRegex(ValueError, "PDF files are not allowed"):
                    validate_site(output)
                pdf.unlink()
            keep = output / "archive" / "keep.txt"
            keep.write_text("Keep this file.", encoding="utf-8")
            for pdf in pdfs:
                pdf.write_bytes(b"%PDF-1.4\n")
            build(output)
            self.assertTrue(all(not pdf.exists() for pdf in pdfs))
            self.assertEqual(keep.read_text(encoding="utf-8"), "Keep this file.")
            self.assertEqual(validate_site(output), 3)

    def test_home_and_instructor_link_show_only_the_collection(self):
        pages = render_pages()
        self.assertEqual(set(pages), {"index.html", "artifact.html", "data-challenge-scenarios.html"})
        self.assertEqual(pages["index.html"], pages["artifact.html"])
        for page in pages.values():
            self.assertIn('href="#main-content"', page)
            self.assertRegex(page, r'<main[^>]*id="main-content" tabindex="-1"')
        self.assertIn('href="#proof-title"', pages["artifact.html"])
        self.assertRegex(pages["artifact.html"], r'<h3 id="proof-title" tabindex="-1"')
        self.assertRegex(pages["artifact.html"], r'<img src="ml-vs-dl-preview.jpg" alt="[^"]+"')
        self.assertIn('href="data-challenge-scenarios.html"', pages["artifact.html"])
        scenarios = pages["data-challenge-scenarios.html"]
        for section in ("s1", "s2", "s3", "artifact-info", "references"):
            self.assertIn(f'id="{section}"', scenarios)
        self.assertIn('href="artifact.html"', scenarios)
        labels = ["Title", "Introduction", "Description", "Objective", "Process",
                  "Tools and Technologies Used", "Value Proposition", "Unique Value",
                  "Relevance", "References"]
        blocks = re.findall(r'<details class="artifact-more artifact-information">(.*?)</details>',
                            pages["artifact.html"], re.S)
        self.assertEqual(len(blocks), 3)
        self.assertIn('<details class="info"><summary>Coursework details</summary>', scenarios)
        self.assertEqual(pages["artifact.html"].count('src="ml-vs-dl-infographic.png"'), 1)
        self.assertEqual(pages["artifact.html"].count('class="artifact-choice-link">View artifact'), 4)
        for link in re.findall(r'<a\b[^>]*target="_blank"[^>]*>.*?</a>', pages["artifact.html"], re.S):
            self.assertRegex(link, r'opens in new tab|in a new tab')
        for block in blocks:
            self.assertEqual(re.findall(r'<dt>(.*?)</dt>', block), labels)
            descriptions = re.findall(r'<dd>(.*?)</dd>', block, re.S)
            self.assertEqual(len(descriptions), len(labels))
            self.assertTrue(all(description.strip() for description in descriptions))
        self.assertNotRegex(pages["artifact.html"], r'(?i)portfolio reflection|2026-11-05')
        self.assertNotRegex(pages["artifact.html"], r'href="https?://(?:www\.)?(?:github|linkedin)\.com/')
        nav = re.search(r'<nav class="artifact-jumps".*?</nav>', pages["artifact.html"], re.S)
        self.assertIsNotNone(nav)
        self.assertEqual(re.findall(r'href="#([^"]+)"', nav.group()), [
            "artifact-1", "artifact-2", "artifact-3", "artifact-4", "ai-notes",
        ])
        for section in ('artifact-4', 'ai-notes'):
            self.assertIn(f'id="{section}"', pages["artifact.html"])
            self.assertIn(f'href="#{section}"', pages["artifact.html"])
        for extra in ('work.html', 'experience.html', 'skills.html'):
            self.assertNotIn(extra, pages["index.html"])

    def test_invalid_links_do_not_overwrite_published_files(self):
        with TemporaryDirectory() as temp:
            output = Path(temp) / "site"
            build(output)
            before = {path.name: path.read_bytes() for path in output.iterdir()}
            pages = render_pages()
            pages["index.html"] += '<a href="missing.html">Broken</a>'
            with patch("build.render_pages", return_value=pages):
                with self.assertRaisesRegex(ValueError, "missing.html"):
                    build(output)
            self.assertEqual(before, {path.name: path.read_bytes() for path in output.iterdir()})

    def test_unexpected_public_page_is_reported(self):
        with TemporaryDirectory() as temp:
            output = build(Path(temp) / "site")
            (output / "archive").mkdir()
            (output / "archive" / "work.html").touch()
            with self.assertRaisesRegex(ValueError, "Unexpected public page: archive/work.html"):
                validate_site(output)

    def test_missing_fragment_is_reported(self):
        with TemporaryDirectory() as temp:
            output = build(Path(temp) / "site")
            index = output / "index.html"
            index.write_text(index.read_text(encoding="utf-8") + '<a href="artifact.html#missing">Link</a>', encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "missing fragment"):
                validate_site(output)

    def test_bad_content_has_an_actionable_error(self):
        data = load_content()
        del data["jobs"][0]["company"]
        with TemporaryDirectory() as temp:
            source = Path(temp) / "data.json"
            source.write_text(json.dumps(data), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "Job 1.*company"):
                load_content(source)

    def test_resume_is_readable_one_page_and_keeps_each_job(self):
        if any(importlib.util.find_spec(name) is None for name in ("pypdf", "reportlab")):
            self.skipTest("Optional PDF check needs ReportLab and pypdf")
        from pypdf import PdfReader
        import reportlab
        from resume import generate_resume
        data = load_content()
        data["jobs"].reverse()
        data["jobs"][0]["company"] = "EPU & Example <Services>"
        with TemporaryDirectory() as temp:
            pdf = PdfReader(generate_resume(Path(temp) / "resume.pdf", data))
            self.assertEqual(len(pdf.pages), 1)
            text = pdf.pages[0].extract_text()
            normalized = " ".join(text.split())
            links = [ref.get_object()["/A"]["/URI"] for ref in pdf.pages[0]["/Annots"]]
            self.assertIn("https://coder4421.github.io/vrund-portfolio/artifact.html", links)
            for job in data["jobs"]:
                self.assertIn(job["company"], text)
                self.assertIn(job["date"], text)
                self.assertIn(job["resume_summary"], normalized)


if __name__ == "__main__":
    unittest.main()
