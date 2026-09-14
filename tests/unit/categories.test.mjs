import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dbCategorySlug } from '../../src/lib/categories.js';

test('retrouve le slug de base, accents et majuscules compris', () => {
  assert.equal(dbCategorySlug('femmes'), 'femmes');
  assert.equal(dbCategorySlug('Sneakers'), 'sneakers');
  assert.equal(dbCategorySlug('beauté'), 'beaute');
  assert.equal(dbCategorySlug('beaut%C3%A9'), 'beaute');
  assert.equal(dbCategorySlug('beauty'), 'beaute');
});

test('toutes les annonces pour Nouveautés et les adresses inconnues', () => {
  assert.equal(dbCategorySlug('nouveautes'), null);
  assert.equal(dbCategorySlug('nouveautés'), null);
  assert.equal(dbCategorySlug('inconnue'), null);
  assert.equal(dbCategorySlug('%E0%A4%A'), null);
  assert.equal(dbCategorySlug(undefined), null);
});
