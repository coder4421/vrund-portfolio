"""Generate the bundled résumé using ReportLab's portable, embedded fonts."""

import argparse
from html import escape
from pathlib import Path
from tempfile import NamedTemporaryFile

from content import ROOT, load_content


def generate_resume(output=None, data=None):
    try:
        import reportlab
        from reportlab.lib.colors import HexColor
        from reportlab.lib.styles import ParagraphStyle
        from reportlab.pdfbase import pdfmetrics
        from reportlab.pdfbase.ttfonts import TTFont
        from reportlab.platypus import Paragraph, SimpleDocTemplate
    except ImportError as error:
        raise RuntimeError(
            "Résumé generation needs ReportLab. Install requirements.txt in your Python environment."
        ) from error

    data = load_content() if data is None else data
    destination = Path(output) if output is not None else ROOT / "assets" / "Vrund_Patel_Resume.pdf"
    destination = destination.resolve()
    fonts = Path(reportlab.__file__).resolve().parent / "fonts"
    pdfmetrics.registerFont(TTFont("Resume", str(fonts / "Vera.ttf")))
    pdfmetrics.registerFont(TTFont("ResumeBold", str(fonts / "VeraBd.ttf")))
    styles = {
        key: ParagraphStyle(
            key, fontName=font, fontSize=size, leading=leading,
            spaceAfter=after, spaceBefore=before, textColor=HexColor(color),
            keepWithNext=key in ("section", "role"),
        )
        for key, font, size, leading, after, before, color in (
            ("name", "ResumeBold", 23, 29, 5, 0, "#14263d"),
            ("subtitle", "ResumeBold", 9, 14, 7, 0, "#365b70"),
            ("body", "Resume", 8.5, 12.5, 7, 0, "#243044"),
            ("section", "ResumeBold", 10, 14, 5, 10, "#214c62"),
            ("role", "ResumeBold", 8.6, 13, 3, 7, "#17283c"),
        )
    }
    story = []

    def add(text, style="body"):
        story.append(Paragraph(text, styles[style]))

    add("VRUND PATEL", "name")
    add("JAVA FULL STACK DEVELOPER | HEALTHCARE APPLICATIONS", "subtitle")
    add('<link href="mailto:vrundp149@gmail.com">vrundp149@gmail.com</link> | 219-237-0043')
    add("PROFILE", "section")
    add(
        "Software developer with a career beginning in 2015 and recent experience at Cigna Evernorth, "
        "Centene, and Gentiva Health. Experience in Java/Spring applications, healthcare API integration, "
        "authentication, Python automation, and web interfaces. Currently studying AI and machine learning."
    )
    add("CORE SKILLS", "section")
    add(
        "Java, Spring Boot, Spring MVC, Spring Security, Hibernate/JPA, REST, FHIR, OAuth2/OpenID Connect, "
        "Angular, React, TypeScript, Python, Django, Pandas, Oracle, MySQL, PostgreSQL, MongoDB, AWS, "
        "Docker, Jenkins, Maven, Git, JUnit, Mockito, SonarQube."
    )
    add("PROFESSIONAL EXPERIENCE", "section")
    for job in data["jobs"]:
        add(f'{escape(job["company"])} | {escape(job["role"])}', "role")
        add(f'{escape(job["date"])}<br/>{escape(job["resume_summary"])}')
    add("SELECTED WORK", "section")
    add(
        '<link href="https://coder4421.github.io/vrund-portfolio/artifact.html">'
        'Portfolio: AI Learning Artifacts</link>'
    )
    destination.parent.mkdir(parents=True, exist_ok=True)
    with NamedTemporaryFile(suffix=".pdf", dir=destination.parent, delete=False) as temporary:
        staged = Path(temporary.name)
    try:
        SimpleDocTemplate(
            str(staged), pagesize=(612, 792), leftMargin=42, rightMargin=42,
            topMargin=30, bottomMargin=30, invariant=True,
            title="Vrund Patel - Healthcare Java Developer", author="Vrund Patel",
        ).build(story)
        staged.replace(destination)
    finally:
        staged.unlink(missing_ok=True)
    return destination


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "assets" / "Vrund_Patel_Resume.pdf")
    args = parser.parse_args()
    try:
        destination = generate_resume(args.output)
    except (OSError, ValueError, RuntimeError) as error:
        parser.exit(1, f"Résumé generation failed: {error}\n")
    print(f"Generated private résumé at {destination}. Public builds exclude PDF files.")


if __name__ == "__main__":
    main()
