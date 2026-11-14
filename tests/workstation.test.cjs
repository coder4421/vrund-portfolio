const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('assets/workstation.js', 'utf8');
const events = {};
const values = new Map();
const scene = {
  style: { setProperty: (k, v) => values.set(k, v), removeProperty: k => values.delete(k) },
  addEventListener: (k, fn) => events[k] = fn,
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 400, height: 300 }),
};
const fine = { matches: true, addEventListener: (_, fn) => fine.change = fn };
const reduced = { matches: false, addEventListener: (_, fn) => reduced.change = fn };
vm.runInNewContext(source, {
  document: { querySelector: () => scene },
  matchMedia: query => query.includes('reduced') ? reduced : fine,
});
const move = pointerType => events.pointermove({ clientX: 200, clientY: 150, pointerType });
move('mouse');
assert.equal(values.get('--scene-y'), '-15deg');
assert.equal(values.get('--scene-x'), '-11deg');
events.pointerleave();
assert.equal(values.size, 0);
move('touch');
assert.equal(values.size, 0);
reduced.matches = true;
move('mouse');
assert.equal(values.size, 0);
reduced.matches = false;
fine.matches = false;
move('mouse');
assert.equal(values.size, 0);
fine.matches = true;
move('mouse');
reduced.change();
assert.equal(values.size, 0);
vm.runInNewContext(source, { document: { querySelector: () => null } });
console.log('Workstation pointer, touch, reduced-motion, reset, and absent-scene checks passed.');
