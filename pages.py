"""Render portfolio HTML with no file writes or import side effects."""

from html import escape
from content import ROOT, load_content


def render_pages():
    site_url = 'https://coder4421.github.io/vrund-portfolio'
    theme_init = (ROOT / 'assets' / 'theme-init.js').read_text(encoding='utf-8')
    title = 'AI Learning Artifacts'
    description = 'Four AI learning artifacts by Vrund Patel covering ScreenWise, machine learning and deep learning, AI key concepts, and data challenges.'
    a='''<div class="pagehead learning-head">
<div class="eyebrow">AI coursework · Vrund Patel</div>
<h1>AI Learning <em>Artifacts</em></h1>
<p>A team-built chatbot, a comparison of learning models, a course presentation on AI and leading change, and three data challenge scenarios.</p>
<p class="updated-label">4 artifacts · 11 slides, 9 diagrams · 3 data scenarios</p>
</div>
<nav class="artifact-jumps" aria-label="Artifact sections">
<a href="#artifact-1">Artifact 1</a><a href="#artifact-2">Artifact 2</a><a href="#artifact-3">Artifact 3</a><a href="#artifact-4">Artifact 4</a><a href="#ai-notes">AI notes archive</a>
</nav>
<div class="grid artifact-index">
<a class="card artifact-choice" href="#artifact-1">
<div class="artifact-preview screenwise-preview" aria-hidden="true">
<div><span>Tester input</span><strong>“2 hours, medium energy”</strong></div>
<div><span>Selected quest</span><strong>Create-a-Game Challenge</strong></div>
</div>
<div class="artifact-card-copy"><span class="sectionlabel">Artifact 1</span>
<h2>ScreenWise Family Companion</h2>
<p>Two chatbot modes for children and parents, with a documented offline-game test.</p>
<span class="artifact-choice-link">Read the case study <span aria-hidden="true">↘</span></span></div>
</a>
<a class="card artifact-choice" href="#artifact-2">
<div class="artifact-preview model-preview"><img src="ml-vs-dl-infographic.png" alt=""></div>
<div class="artifact-card-copy"><span class="sectionlabel">Artifact 2</span>
<h2>Machine Learning vs. Deep Learning</h2>
<p>Compare the data, features, and model tradeoffs across two applications.</p>
<span class="artifact-choice-link">Read the comparison <span aria-hidden="true">↘</span></span></div>
</a>
<a class="card artifact-choice" href="#artifact-3">
<div class="artifact-preview deck-preview" aria-hidden="true"><strong>Key Concepts</strong><span>Neural networks · AI ethics · Leading change</span></div>
<div class="artifact-card-copy"><span class="sectionlabel">Artifact 3</span>
<h2>Key Concepts in AI &amp; Machine Learning</h2>
<p>Eleven slides on neural networks, AI ethics, communication, and leading change.</p>
<span class="artifact-choice-link">Explore the slides <span aria-hidden="true">↘</span></span></div>
</a>
<a class="card artifact-choice" href="#artifact-4">
<div class="artifact-preview screenwise-preview" aria-hidden="true">
<div><strong>Split by row</strong><span>Duplicate reviews leak into the test set</span></div>
<div><strong>Split by cluster</strong><span>Related reviews stay together</span></div>
</div>
<div class="artifact-card-copy"><span class="sectionlabel">Artifact 4</span>
<h2>Data Challenge Scenarios</h2>
<p>Explore data quality, bias in hiring models, and privacy in collaborative learning.</p>
<span class="artifact-choice-link">Explore the scenarios <span aria-hidden="true">↘</span></span></div>
</a>
</div>'''
    first=(ROOT/'artifacts'/'screenwise.html').read_text(encoding='utf-8')
    for level in range(3,0,-1):
        first=first.replace(f'<h{level}', f'<h{level+1}').replace(f'</h{level}>', f'</h{level+1}>')
    a+='<section class="first-artifact" id="artifact-1" aria-label="Artifact 1: ScreenWise Family Companion">'+first+'</section>'
    a+=(ROOT/'artifacts'/'ml-vs-dl.html').read_text(encoding='utf-8')
    a+=(ROOT/'artifacts'/'key-concepts.html').read_text(encoding='utf-8')
    a += (ROOT / 'artifacts' / 'data-challenges-overview.html').read_text(encoding='utf-8')
    notes = load_content()["artifact"].replace("<h1>", "<h2>").replace("</h1>", "</h2>")
    body = a + '<section id="ai-notes" aria-label="AI notes archive"><details class="artifact-more"><summary>AI notes archive · 2022–2024</summary>' + notes + '</details></section>'
    html=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="description" content="{escape(description,quote=True)}"><meta name="color-scheme" content="dark light"><meta property="og:type" content="website"><meta property="og:title" content="{escape(title,quote=True)} | Vrund Patel"><meta property="og:description" content="{escape(description,quote=True)}"><meta property="og:url" content="{site_url}/artifact.html"><meta property="og:image" content="{site_url}/portfolio-social.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Vrund Patel’s AI learning artifacts."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{escape(title,quote=True)} | Vrund Patel"><meta name="twitter:description" content="{escape(description,quote=True)}"><meta name="twitter:image" content="{site_url}/portfolio-social.png"><meta name="twitter:image:alt" content="Vrund Patel’s AI learning artifacts."><link rel="canonical" href="{site_url}/artifact.html"><title>{escape(title)} | Vrund Patel</title><script>{theme_init}</script><link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;family=Manrope:wght@400;500;600;700;800&amp;display=swap"><link rel="stylesheet" href="style.css"></head><body class="artifact-page"><div class="safe-area-shield" aria-hidden="true"></div><a class="skip-link" href="#main-content">Skip to content</a><button class="theme-toggle" type="button" aria-label="Switch to light theme" aria-pressed="false">☀</button><main id="main-content" tabindex="-1">{body}</main><footer><span>© 2026 Vrund Patel</span><span>AI Learning Artifacts</span></footer><script src="interactions.js" defer></script><script src="cascading-dots.js" defer></script><script src="key-points-deck.js" defer></script></body></html>'''
    html = html.replace('><', '>\n<') + '\n'
    return {
        'index.html': html,
        'artifact.html': html,
        'data-challenge-scenarios.html': (ROOT / 'artifacts' / 'data-challenge-scenarios.html').read_text(encoding='utf-8'),
    }


if __name__ == "__main__":
    from build import main
    main()
