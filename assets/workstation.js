(() => {
  const scene = document.querySelector('.workstation');
  if (!scene) return;
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function reset() {
    scene.style.removeProperty('--scene-x');
    scene.style.removeProperty('--scene-y');
  }
  scene.addEventListener('pointermove', event => {
    if (!fine.matches || reduced.matches || event.pointerType === 'touch') return;
    const bounds = scene.getBoundingClientRect();
    scene.style.setProperty('--scene-x', `${-8 - (event.clientY - bounds.top) / bounds.height * 6}deg`);
    scene.style.setProperty('--scene-y', `${-23 + (event.clientX - bounds.left) / bounds.width * 16}deg`);
  });
  scene.addEventListener('pointerleave', reset);
  fine.addEventListener('change', reset);
  reduced.addEventListener('change', reset);
})();
