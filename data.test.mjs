import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
globalThis.window = {};
await import('./data.js');
const F = globalThis.window.FIELDS;
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

test('every field has the full shape', () => {
  for (const f of F) {
    assert.ok(f.d && f.n && f.s && f.p && f.g, f.n);
    assert.equal(f.k.length, 4, `${f.n}: four key ideas`);
    assert.ok(f.p.length > 200, `${f.n}: explanation too short`);
    assert.ok(f.g.length > 40, `${f.n}: gap too short`);
  }
});
test('names and slugs are unique', () => {
  assert.equal(new Set(F.map(f => f.n)).size, F.length);
  assert.equal(new Set(F.map(f => slug(f.n))).size, F.length);
});
test('house voice: no em dashes, no emojis, no AI words', () => {
  const src = readFileSync('data.js', 'utf8');
  assert.doesNotMatch(src, /—/, 'em dash');
  assert.doesNotMatch(src, /[\u{1F300}-\u{1FAFF}]/u, 'emoji');
  assert.doesNotMatch(src, /\b(delve|leverage|seamless|it's not just)\b/i);
});
test('anatomy is covered', () => {
  const a = F.filter(f => f.d === 'Anatomy & Physiology').map(f => f.n.toLowerCase());
  for (const sys of ['skeletal', 'muscular', 'nervous', 'endocrine', 'cardiovascular', 'respiratory', 'digestive', 'urinary', 'reproductive', 'integumentary', 'lymphatic'])
    assert.ok(a.some(n => n.includes(sys)), sys);
});
