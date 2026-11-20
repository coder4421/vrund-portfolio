(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  function sync() {
    const light = root.dataset.theme === 'light';
    toggle.innerHTML = light
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.7 13A9 9 0 0 1 11 3.3 9 9 0 1 0 20.7 13Z"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>';
    toggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    toggle.setAttribute('aria-pressed', String(light));
  }
  sync();
  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    sync();
    try { localStorage.setItem('vp-theme', root.dataset.theme); } catch {}
  });
})();

const artifactNav = document.querySelector('.artifact-jumps');
if (artifactNav) {
  const links = [...artifactNav.querySelectorAll('a')];
  const sections = links.map((link) => document.getElementById(link.hash.slice(1)));
  const markCurrentArtifact = () => {
    const nav = artifactNav.getBoundingClientRect();
    const readingLine = Math.max(nav.height + 32, window.innerHeight * 0.25);
    let current = -1;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= readingLine) current = index;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      // The last two anchors can share the same scroll position near the footer.
      current = location.hash === links.at(-2).hash ? links.length - 2 : links.length - 1;
    }
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', markCurrentArtifact, {passive:true});
  window.addEventListener('resize', markCurrentArtifact);
  window.addEventListener('hashchange', markCurrentArtifact);
  markCurrentArtifact();
}
