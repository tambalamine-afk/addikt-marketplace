import { test } from 'node:test';
import assert from 'node:assert/strict';

// La variable doit exister avant le chargement du module
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://projet.supabase.co';
const { isOptimizableImage } = await import('../../src/lib/imageUrl.js');

test('optimise uniquement les photos publiques Supabase', () => {
  assert.equal(isOptimizableImage('https://projet.supabase.co/storage/v1/object/public/listing-images/a/0.webp'), true);
});

test('laisse les autres images telles quelles', () => {
  for (const src of [
    'https://placehold.co/400x500',
    'https://projet.supabase.co.site-pirate.com/storage/v1/object/public/x.jpg',
    'https://projet.supabase.co/storage/v1/object/sign/listing-images/a.jpg',
    'blob:http://localhost:3000/1234',
    '/assets/fit_check.png',
    undefined,
  ]) {
    assert.equal(isOptimizableImage(src), false, `optimisée à tort : ${src}`);
  }
});
