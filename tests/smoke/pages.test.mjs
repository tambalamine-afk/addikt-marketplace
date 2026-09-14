import { test } from 'node:test';
import assert from 'node:assert/strict';

// Vérifie un site démarré, sans compte :
//   npm run build && npm start        (dans un autre terminal)
//   npm run test:smoke                (http://localhost:3000 par défaut)
// ou contre la production : BASE_URL=https://addikt-marketplace.vercel.app npm run test:smoke
const BASE_URL = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

const get = (path) => fetch(`${BASE_URL}${path}`, { redirect: 'manual' });

const PUBLIC_PAGES = [
  '/',
  '/search?q=robe',
  '/category/femmes',
  '/category/sneakers',
  '/terms',
  '/privacy',
  '/login',
  '/register',
  '/forgot-password',
  '/robots.txt',
  '/sitemap.xml',
];

const PRIVATE_PAGES = ['/messages', '/publish', '/profile/me', '/favorites', '/edit/abc', '/checkout/abc', '/orders', '/orders/abc', '/onboarding'];

for (const path of PUBLIC_PAGES) {
  test(`page publique ${path} : 200`, async () => {
    assert.equal((await get(path)).status, 200);
  });
}

for (const path of PRIVATE_PAGES) {
  test(`page privée ${path} : renvoie vers la connexion puis vers la page demandée`, async () => {
    const res = await get(path);
    assert.equal(res.status, 307);
    const location = new URL(res.headers.get('location'), BASE_URL);
    assert.equal(location.pathname, '/login');
    assert.equal(location.searchParams.get('next'), path);
  });
}

test('une recherche avec virgule et parenthèses affiche la page', async () => {
  assert.equal((await get(`/search?q=${encodeURIComponent('jean, taille (40)')}`)).status, 200);
});

test('robots.txt écarte les pages privées et annonce le sitemap', async () => {
  const text = await (await get('/robots.txt')).text();
  assert.match(text, /Disallow: \/orders/);
  assert.match(text, /Sitemap: \S+\/sitemap\.xml/);
});

test('l\'accueil et Fresh DROP arrivent déjà remplis d\'annonces (rendu serveur)', async (t) => {
  const sitemap = await (await get('/sitemap.xml')).text();
  if (!/\/product\//.test(sitemap)) {
    t.skip('aucune annonce en ligne');
    return;
  }
  for (const path of ['/', '/fresh-drop']) {
    const html = await (await get(path)).text();
    assert.match(html, /href="\/product\/[0-9a-f-]{36}"/, `aucune annonce dans le HTML de ${path}`);
  }
});

test('la recherche arrive déjà remplie de résultats (rendu serveur)', async (t) => {
  const sitemap = await (await get('/sitemap.xml')).text();
  const productUrl = sitemap.match(/<loc>([^<]*\/product\/[^<]+)<\/loc>/)?.[1];
  if (!productUrl) {
    t.skip('aucune annonce en ligne');
    return;
  }
  const productHtml = await (await get(new URL(productUrl).pathname)).text();
  const title = productHtml
    .match(/<meta property="og:title" content="([^"]+?) · [^"]*FCFA"/)?.[1]
    ?.replace(/&#x27;/g, '\'').replace(/&quot;/g, '"').trim();
  const firstWord = title?.match(/[A-Za-zÀ-ÿ0-9]{3,}/)?.[0];
  if (!title || !firstWord || /[&<>]/.test(title)) {
    t.skip('titre d\'annonce inutilisable pour ce test');
    return;
  }
  const html = await (await get(`/search?q=${encodeURIComponent(firstWord)}`)).text();
  assert.ok(html.includes(title), `« ${title} » absent du HTML de la recherche « ${firstWord} »`);
});

test('une fiche produit expose titre, prix et données produit', async (t) => {
  const sitemap = await (await get('/sitemap.xml')).text();
  const productUrl = sitemap.match(/<loc>([^<]*\/product\/[^<]+)<\/loc>/)?.[1];
  if (!productUrl) {
    t.skip('aucune annonce en ligne dans le sitemap');
    return;
  }
  const html = await (await get(new URL(productUrl).pathname)).text();
  assert.match(html, /<meta property="og:title" content="[^"]*FCFA/);
  assert.match(html, /<script type="application\/ld\+json">/);
});
