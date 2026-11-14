/* Additive DOM cursor trail. Native cursor styles are never changed. */
(() => {
  'use strict';
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const COUNT = 14;
  const EASE = 0.34;
  const HEAD_SIZE = 24;
  const TAPER = 0.8;
  let unmount = null;

  function mount() {
    const layer = document.createElement('div');
    layer.className = 'cascading-dots';
    layer.setAttribute('aria-hidden', 'true');
    const nodes = Array.from({ length: COUNT }, (_, index) => {
      const element = document.createElement('span');
      element.className = 'cascading-dot';
      const size = HEAD_SIZE * TAPER ** index;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      layer.append(element);
      return { element, x: 0, y: 0, size };
    });
    document.body.append(layer);
    let width = layer.clientWidth;
    let height = layer.clientHeight;
    let x = 0;
    let y = 0;
    let frame = 0;
    let active = false;
    let initialized = false;

    function draw() {
      frame = 0;
      if (!active) return;
      nodes[0].x = x;
      nodes[0].y = y;
      let unsettled = false;
      nodes.forEach((node, index) => {
        if (index > 0) {
          const ahead = nodes[index - 1];
          node.x += (ahead.x - node.x) * EASE;
          node.y += (ahead.y - node.y) * EASE;
        }
        node.element.style.transform = `translate3d(${node.x - node.size / 2}px,${node.y - node.size / 2}px,0)`;
        if (Math.abs(node.x - x) + Math.abs(node.y - y) > 0.05) unsettled = true;
      });
      layer.classList.add('is-active');
      if (unsettled) frame = requestAnimationFrame(draw);
    }
    function schedule() {
      if (!frame && active) frame = requestAnimationFrame(draw);
    }
    function hide() {
      active = false;
      initialized = false;
      cancelAnimationFrame(frame);
      frame = 0;
      layer.classList.remove('is-active');
    }
    function move(event) {
      if (event.pointerType === 'touch' || document.hidden) return;
      x = Math.max(0, Math.min(event.clientX, width));
      y = Math.max(0, Math.min(event.clientY, height));
      if (!initialized) {
        nodes.forEach(node => { node.x = x; node.y = y; });
        initialized = true;
      }
      active = true;
      schedule();
    }
    function leave(event) {
      if (!event.relatedTarget) hide();
    }
    function visibility() {
      if (document.hidden) hide();
    }
    function resize() {
      width = layer.clientWidth;
      height = layer.clientHeight;
      // Reinitialize on the next move to avoid stale positions after rotation/zoom.
      hide();
    }
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', leave, { passive: true });
    window.addEventListener('pointercancel', hide, { passive: true });
    window.addEventListener('blur', hide);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('pointercancel', hide);
      window.removeEventListener('blur', hide);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
      layer.remove();
    };
  }
  function stop() {
    if (unmount) { unmount(); unmount = null; }
  }
  function sync() {
    const enabled = finePointer.matches && !reducedMotion.matches;
    if (enabled && !unmount) unmount = mount();
    if (!enabled) stop();
  }
  function pagehide(event) {
    stop();
    if (!event.persisted) teardown();
  }
  function pageshow() { sync(); }
  function teardown() {
    stop();
    finePointer.removeEventListener('change', sync);
    reducedMotion.removeEventListener('change', sync);
    window.removeEventListener('pagehide', pagehide);
    window.removeEventListener('pageshow', pageshow);
  }
  finePointer.addEventListener('change', sync);
  reducedMotion.addEventListener('change', sync);
  window.addEventListener('pagehide', pagehide);
  window.addEventListener('pageshow', pageshow);
  sync();
})();
