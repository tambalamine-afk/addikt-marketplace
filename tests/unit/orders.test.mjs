import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ORDER_STATUS,
  ORDER_STEPS,
  formatFcfa,
  listingCover,
  orderStepIndex,
  userFacingError,
  whatsappLink,
} from '../../src/lib/orders.js';

test('affiche les prix en FCFA avec séparateur de milliers', () => {
  assert.match(formatFcfa(15000), /^15\s000 FCFA$/u);
  assert.equal(formatFcfa(0), '0 FCFA');
  assert.equal(formatFcfa(undefined), '0 FCFA');
});

test('place chaque statut sur la bonne étape Réservée → Remise → Terminée', () => {
  assert.equal(ORDER_STEPS.length, 3);
  assert.equal(orderStepIndex('pending'), 0);
  assert.equal(orderStepIndex('paid'), 0);
  assert.equal(orderStepIndex('shipped'), 1);
  assert.equal(orderStepIndex('delivered'), 2);
  assert.equal(orderStepIndex('inconnu'), 0);
});

test('chaque statut de la base a un libellé', () => {
  for (const status of ['pending', 'paid', 'shipped', 'delivered', 'cancelled']) {
    assert.ok(ORDER_STATUS[status]?.label, `libellé manquant pour ${status}`);
  }
});

test('ajoute l\'indicatif +221 aux numéros sénégalais saisis sans', () => {
  assert.equal(whatsappLink('77 123 45 67', 'Bonjour').split('?')[0], 'https://wa.me/221771234567');
  assert.equal(whatsappLink('+221 77 123 45 67', 'x').split('?')[0], 'https://wa.me/221771234567');
  assert.ok(whatsappLink('771234567', 'Commande « veste »').endsWith(`?text=${encodeURIComponent('Commande « veste »')}`));
});

test('n\'affiche que les erreurs métier rédigées pour l\'utilisateur', () => {
  assert.equal(userFacingError({ code: 'P0001', message: 'Cet article n\'est plus disponible.' }, 'repli'), 'Cet article n\'est plus disponible.');
  assert.equal(userFacingError({ code: '42501', message: 'permission denied for table orders' }, 'repli'), 'repli');
  assert.equal(userFacingError(null, 'repli'), 'repli');
});

test('prend la photo en première position comme couverture', () => {
  const listing = { listing_images: [{ url: 'b.jpg', position: 1 }, { url: 'a.jpg', position: 0 }] };
  assert.equal(listingCover(listing), 'a.jpg');
  assert.match(listingCover({ listing_images: [] }), /^https:\/\/placehold\.co\//);
  assert.match(listingCover(null), /^https:\/\/placehold\.co\//);
});
