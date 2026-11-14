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
assert.equal(images.size, 9);
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
console.log('All 11 slides, 9 diagrams, navigation, focus-safe keys, and absent-deck checks passed.');
