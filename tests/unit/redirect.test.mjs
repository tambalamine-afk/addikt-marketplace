import { test } from 'node:test';
import assert from 'node:assert/strict';
import { safeNextPath } from '../../src/lib/redirect.js';

test('conserve les chemins internes après connexion', () => {
  assert.equal(safeNextPath('/messages/123'), '/messages/123');
  assert.equal(safeNextPath('/search?q=robe'), '/search?q=robe');
});

test('refuse les adresses externes et les valeurs invalides', () => {
  for (const value of ['//site-pirate.com', '/\\site-pirate.com', 'https://site-pirate.com', 'javascript:alert(1)', '', null, undefined, 42]) {
    assert.equal(safeNextPath(value), '/', `valeur acceptée à tort : ${String(value)}`);
  }
});

test('utilise la page de repli fournie', () => {
  assert.equal(safeNextPath('https://site-pirate.com', '/profile/me'), '/profile/me');
});
