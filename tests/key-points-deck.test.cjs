const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('assets/key-points-deck.js', 'utf8');
const elements = Object.fromEntries(['slide', 'dots', 'counter', 'progress', 'prev', 'next'].map(id => [id, {
  style: {}, events: {}, attributes: {},
  addEventListener(name, handler) { this.events[name] = handler; },
  setAttribute(name, value) { this.attributes[name] = value; },
}]));
const buttons = Array.from({ length: 11 }, (_, i) => ({
  dataset: { i: String(i) }, attributes: {},
  classList: { toggle() {} },
  setAttribute(name, value) { this.attributes[name] = value; },
}));
elements.dots.querySelectorAll = () => buttons;
const deck = {
  events: {},
  querySelector: selector => elements[selector.slice(1)],
  addEventListener(name, handler) { this.events[name] = handler; },
};
vm.runInNewContext(source, { document: { getElementById: () => deck } });
assert.equal(elements.counter.textContent, '1 / 11');
assert.equal(elements.prev.disabled, true);
const images = new Set();
for (let i = 1; i <= 11; i++) {
  assert.equal(elements.counter.textContent, `${i} / 11`);
  for (const match of elements.slide.innerHTML.matchAll(/src="([^"]+)"/g)) {
    assert.ok(fs.existsSync(`assets/${match[1]}`), `Missing diagram: ${match[1]}`);
    images.add(match[1]);
  }
  if (i < 11) elements.next.events.click();
}
assert.equal(images.size, 7);
assert.match(elements.slide.innerHTML, /Four portfolio entries/);
assert.equal(elements.next.disabled, true);
elements.dots.events.click({ target: { closest: () => buttons[5] } });
assert.equal(elements.counter.textContent, '6 / 11');
assert.match(elements.slide.innerHTML, /key-points-activations.png/);
assert.match(elements.slide.innerHTML, /<figcaption>Horizontal axis:/);
assert.equal(buttons[5].attributes['aria-current'], 'true');
let prevented = 0;
const key = (value, onButton = false, ctrlKey = false) => deck.events.keydown({
  key: value, ctrlKey, target: { closest: () => onButton ? buttons[5] : null },
  preventDefault: () => prevented++,
});
key(' ' , true);
key('ArrowRight', false, true);
assert.equal(elements.counter.textContent, '6 / 11');
assert.equal(prevented, 0);
key('ArrowRight');
assert.equal(elements.counter.textContent, '7 / 11');
key('Home');
assert.equal(elements.counter.textContent, '1 / 11');
key('End');
assert.equal(elements.counter.textContent, '11 / 11');
assert.equal(prevented, 3);
vm.runInNewContext(source, { document: { getElementById: () => null } });
const motion = { matches: false, addEventListener(_, handler) { this.change = handler; } };
let observer, tick;
elements.autoplay = { events: {}, addEventListener: elements.prev.addEventListener };
elements.nav = { events: {}, addEventListener: elements.prev.addEventListener };
vm.runInNewContext(source, {
  document: { getElementById: () => deck, addEventListener() {} },
  window: { IntersectionObserver: true },
  matchMedia: () => motion,
  IntersectionObserver: class {
    constructor(callback) { observer = callback; }
    observe(target) { assert.equal(target, deck); }
  },
  clearInterval() { tick = undefined; },
  setInterval(callback, duration) {
    assert.equal(duration, 4000);
    tick = callback;
    return 1;
  },
});
assert.equal(tick, undefined);
observer([{ intersectionRatio: 1 }]);
assert.equal(tick, undefined);
assert.equal(elements.autoplay.textContent, "Play slides");
elements.autoplay.events.click();
tick();
assert.equal(elements.counter.textContent, '2 / 11');
elements.autoplay.events.click();
assert.equal(tick, undefined);
elements.autoplay.events.click();
assert.equal(typeof tick, 'function');
elements.nav.events.click({target: {closest: selector => selector === 'button'}});
assert.equal(tick, undefined);
elements.autoplay.events.click();
deck.matches = () => true;
deck.events.focusin();
assert.equal(tick, undefined);
elements.autoplay.events.click();
observer([{ intersectionRatio: 0 }]);
assert.equal(tick, undefined);
observer([{ intersectionRatio: 1 }]);
motion.matches = true;
motion.change();
assert.equal(tick, undefined);
assert.equal(elements.autoplay.hidden, true);
console.log('All 11 slides, 9 diagrams (7 image files and 2 HTML diagrams), navigation, focus-safe keys, and absent-deck checks passed.');
