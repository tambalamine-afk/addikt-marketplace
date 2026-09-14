import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toSearchTerm } from '../../src/lib/search.js';

test('garde virgules et parenthèses, utiles dans une recherche', () => {
  assert.equal(toSearchTerm('jean, taille (40)'), 'jean, taille (40)');
});

test('neutralise les jokers et caractères d\'échappement du filtre', () => {
  assert.equal(toSearchTerm('100% coton "neuf"'), '100 coton neuf');
  assert.equal(toSearchTerm('robe_*wax\\'), 'robe wax');
});

test('gère les recherches vides', () => {
  assert.equal(toSearchTerm(''), '');
  assert.equal(toSearchTerm(null), '');
  assert.equal(toSearchTerm('   '), '');
});
