// Tests des règles d’accès de la base, sur un vrai Postgres embarqué (PGlite) :
// les migrations de supabase/migrations sont jouées sur une base simulée, jamais sur la prod.
// Lancer : npm run test:db
import { PGlite } from '@electric-sql/pglite';
import { uuid_ossp } from '@electric-sql/pglite/contrib/uuid_ossp';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const MIG = fileURLToPath(new URL('../migrations', import.meta.url));
const files = fs.readdirSync(MIG).filter((f) => f.endsWith('.sql')).sort();
const [baseline, hardening, ...laterMigrations] = files.map((f) => fs.readFileSync(`${MIG}/${f}`, 'utf8'));

const db = new PGlite({ extensions: { uuid_ossp } });

// --- Simulation minimale de l'environnement Supabase ---
await db.exec(`
  CREATE ROLE anon NOLOGIN;
  CREATE ROLE authenticated NOLOGIN;
  CREATE SCHEMA auth;
  CREATE TABLE auth.users (id uuid PRIMARY KEY, email text, phone text, raw_user_meta_data jsonb DEFAULT '{}');
  CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS
    $$ SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  GRANT USAGE ON SCHEMA auth, public TO anon, authenticated;
  GRANT EXECUTE ON FUNCTION auth.uid() TO anon, authenticated;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon, authenticated;
  CREATE PUBLICATION supabase_realtime;
  CREATE SCHEMA storage;
  CREATE TABLE storage.buckets (id text PRIMARY KEY, name text, public boolean DEFAULT true, file_size_limit bigint, allowed_mime_types text[]);
  INSERT INTO storage.buckets (id, name) VALUES ('listing-images', 'listing-images'), ('avatars', 'avatars');
`);

const id = {
  alice: '11111111-1111-1111-1111-111111111111', // vendeuse
  bob: '22222222-2222-2222-2222-222222222222',   // acheteur
  eve: '33333333-3333-3333-3333-333333333333',   // attaquante
  orphan: '44444444-4444-4444-4444-444444444444',
  phoneUser: '55555555-5555-5555-5555-555555555555',
  dupAlice: '66666666-6666-6666-6666-666666666666',
  dupBob: '77777777-7777-7777-7777-777777777777',
  L1: 'aaaaaaaa-0000-0000-0000-000000000001', // annonce active d'alice, 10 000 FCFA
  L2: 'aaaaaaaa-0000-0000-0000-000000000002', // brouillon d'alice
  C1: 'cccccccc-0000-0000-0000-000000000001', // conversation bob → alice
  M1: 'dddddddd-0000-0000-0000-000000000001', // message de bob
  O1: 'eeeeeeee-0000-0000-0000-000000000001',
  A_bob: 'ffffffff-0000-0000-0000-000000000001',
  A_eve: 'ffffffff-0000-0000-0000-000000000002',
  IMG: '99999999-0000-0000-0000-000000000001',
};

let passed = 0;
const failures = [];
const pass = (label) => { passed++; console.log(`  ok   ${label}`); };
const fail = (label, why) => { failures.push(label); console.log(`  FAIL ${label}\n       → ${why}`); };

async function as(who, sql, params = []) {
  await db.exec('RESET ROLE');
  // « postgres » simule le service Addikt : aucune session utilisateur
  await db.query(`SELECT set_config('request.jwt.claim.sub', $1, false)`, [who === 'anon' || who === 'postgres' ? '' : id[who]]);
  if (who === 'postgres') return db.query(sql, params);
  await db.exec(`SET ROLE ${who === 'anon' ? 'anon' : 'authenticated'}`);
  try { return await db.query(sql, params); } finally { await db.exec('RESET ROLE'); }
}
async function allowed(label, who, sql, params, check) {
  try {
    const r = await as(who, sql, params);
    if (check && !check(r)) throw new Error(`résultat inattendu rows=${JSON.stringify(r.rows)} affected=${r.affectedRows}`);
    pass(label);
  } catch (e) { fail(label, e.message); }
}
async function denied(label, who, sql, params) {
  try {
    const r = await as(who, sql, params);
    if (/^\s*(update|delete)/i.test(sql) && r.affectedRows === 0) return pass(`${label} (0 ligne touchée)`);
    fail(label, `autorisé à tort : rows=${JSON.stringify(r.rows)} affected=${r.affectedRows}`);
  } catch (e) { pass(`${label} — ${e.message.split('\n')[0]}`); }
}

// --- 1. Migration initiale + données représentatives de la prod ---
await db.exec(baseline);
await db.exec(`
  INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES
    ('${id.alice}', 'alice@example.com', '{"username":"alice","full_name":"Alice"}'),
    ('${id.bob}', 'bob@example.com', '{"username":"bob"}'),
    ('${id.eve}', 'eve@example.com', '{}');
  UPDATE profiles SET phone = '+221770000001', rating_avg = 4.9, rating_count = 120 WHERE id = '${id.alice}';
  INSERT INTO listings (id, seller_id, title, price, status) VALUES
    ('${id.L1}', '${id.alice}', 'Boubou brodé', 10000, 'active'),
    ('${id.L2}', '${id.alice}', 'Brouillon', 5000, 'draft'),
    ('aaaaaaaa-0000-0000-0000-000000000003', '${id.alice}', 'Ancienne annonce à 0', 0, 'draft');
  INSERT INTO conversations (id, listing_id, buyer_id, seller_id) VALUES ('${id.C1}', '${id.L1}', '${id.bob}', '${id.alice}');
  INSERT INTO messages (id, conversation_id, sender_id, content) VALUES ('${id.M1}', '${id.C1}', '${id.bob}', 'Toujours dispo ?');
  INSERT INTO addresses (id, user_id, address_line, city, phone) VALUES ('${id.A_eve}', '${id.eve}', 'Rue 1', 'Dakar', '0');
`);

console.log('\nAvant correctif');
await denied('B5 inscription par téléphone échoue avec l\'ancien trigger', 'postgres',
  `INSERT INTO auth.users (id, phone) VALUES ('${id.phoneUser}', '221770000009')`);

// Compte créé sans profil (simule un échec passé de l'ancien trigger)
await db.exec(`ALTER TABLE auth.users DISABLE TRIGGER on_auth_user_created;
  INSERT INTO auth.users (id, email) VALUES ('${id.orphan}', 'fatou@example.com');
  ALTER TABLE auth.users ENABLE TRIGGER on_auth_user_created;`);

// --- 2. Migration de durcissement, jouée deux fois ---
console.log('\nMigration');
await allowed('durcissement appliqué', 'postgres', 'SELECT 1');
try { await db.exec(hardening); pass('1re exécution'); } catch (e) { fail('1re exécution', e.message); process.exit(1); }
try { await db.exec(hardening); pass('2e exécution (rejouable)'); } catch (e) { fail('2e exécution (rejouable)', e.message); }
for (const sql of laterMigrations) {
  for (const run of ['1re', '2e']) {
    try { await db.exec(sql); pass(`migration étape 2, ${run} exécution`); } catch (e) { fail(`migration étape 2, ${run} exécution`, e.message); }
  }
}

console.log('\nB5 · Inscription');
await allowed('inscription par téléphone crée un profil', 'postgres',
  `INSERT INTO auth.users (id, phone) VALUES ('${id.phoneUser}', '221770000009')`);
await allowed('pseudo par défaut « membre »', 'postgres',
  `SELECT username FROM profiles WHERE id = '${id.phoneUser}'`, [], (r) => /^membre(_[0-9a-f]{4})?$/.test(r.rows[0]?.username));
await allowed('pseudo déjà pris → suffixé', 'postgres',
  `INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES ('${id.dupAlice}', 'x@example.com', '{"username":"Alice"}')`);
await allowed('… alice_xxxx', 'postgres', `SELECT username FROM profiles WHERE id = '${id.dupAlice}'`, [], (r) => /^alice_[0-9a-f]{4}$/.test(r.rows[0]?.username));
await allowed('même début d\'email (bob@yahoo.fr) → suffixé', 'postgres',
  `INSERT INTO auth.users (id, email) VALUES ('${id.dupBob}', 'bob@yahoo.fr')`);
await allowed('quartier enregistré', 'postgres',
  `INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES (gen_random_uuid(), 'k@example.com', '{"location":"Médina"}') RETURNING id`);
await allowed('… location = Médina', 'postgres', `SELECT 1 FROM profiles WHERE location = 'Médina'`, [], (r) => r.rows.length === 1);
await allowed('compte orphelin rattrapé', 'postgres', `SELECT username FROM profiles WHERE id = '${id.orphan}'`, [], (r) => r.rows[0]?.username === 'fatou');

console.log('\nI1 · Téléphones');
await denied('anonyme ne lit plus profiles.phone', 'anon', `SELECT phone FROM profiles`);
await denied('anonyme ne lit pas profile_private', 'anon', `SELECT * FROM profile_private`);
await allowed('numéro existant migré', 'alice', `SELECT phone FROM profile_private WHERE id = '${id.alice}'`, [], (r) => r.rows[0]?.phone === '+221770000001');
await allowed('bob ne voit pas le numéro d\'alice dans la table', 'bob', `SELECT phone FROM profile_private WHERE id = '${id.alice}'`, [], (r) => r.rows.length === 0);
await allowed('bob connecté obtient le WhatsApp via l\'annonce active', 'bob', `SELECT public.get_seller_phone($1) AS p`, [id.L1], (r) => r.rows[0].p === '+221770000001');
await allowed('… mais pas pour un brouillon', 'bob', `SELECT public.get_seller_phone($1) AS p`, [id.L2], (r) => r.rows[0].p === null);
await denied('anonyme ne peut pas appeler get_seller_phone', 'anon', `SELECT public.get_seller_phone($1)`, [id.L1]);
await allowed('alice enregistre son numéro (upsert du web)', 'alice',
  `INSERT INTO profile_private (id, phone) VALUES ($1, '+221770000002') ON CONFLICT (id) DO UPDATE SET phone = EXCLUDED.phone`, [id.alice]);
await denied('eve ne peut pas écrire le numéro d\'alice', 'eve',
  `INSERT INTO profile_private (id, phone) VALUES ($1, '0') ON CONFLICT (id) DO UPDATE SET phone = EXCLUDED.phone`, [id.alice]);

console.log('\nB2 · Profils');
await allowed('notes gonflées remises à zéro', 'postgres', `SELECT rating_avg, rating_count FROM profiles WHERE id = '${id.alice}'`, [], (r) => Number(r.rows[0].rating_avg) === 0 && r.rows[0].rating_count === 0);
await denied('alice ne peut pas se mettre 5 étoiles', 'alice', `UPDATE profiles SET rating_avg = 5 WHERE id = '${id.alice}'`);
await denied('alice ne peut pas s\'attribuer Top boutique', 'alice', `UPDATE profiles SET is_top_boutique = true WHERE id = '${id.alice}'`);
await allowed('alice modifie sa bio, son pseudo, son avatar (web + mobile)', 'alice',
  `UPDATE profiles SET bio = 'Vintage Dakar', username = 'alice_dk', avatar_url = 'x', full_name = 'A', location = 'Plateau', cover_url = 'y' WHERE id = '${id.alice}'`, [], (r) => r.affectedRows === 1);
await denied('eve ne modifie pas le profil d\'alice', 'eve', `UPDATE profiles SET bio = 'arnaque' WHERE id = '${id.alice}'`);
await denied('un utilisateur ne crée pas de profil à la main', 'eve', `INSERT INTO profiles (id, username) VALUES ('${id.eve}', 'fake')`);

console.log('\nI4 · Conversations');
await denied('eve ne cible pas bob comme « vendeur » de l\'annonce d\'alice', 'eve',
  `INSERT INTO conversations (listing_id, buyer_id, seller_id) VALUES ($1, $2, $3)`, [id.L1, id.eve, id.bob]);
await denied('alice ne se contacte pas elle-même', 'alice',
  `INSERT INTO conversations (listing_id, buyer_id, seller_id) VALUES ($1, $2, $2)`, [id.L1, id.alice]);
await allowed('eve contacte la vraie vendeuse (flux web + mobile)', 'eve',
  `INSERT INTO conversations (listing_id, buyer_id, seller_id) VALUES ($1, $2, $3)`, [id.L1, id.eve, id.alice]);

console.log('\nB1 · Messages');
await denied('eve n\'écrit pas dans la conversation bob ↔ alice', 'eve',
  `INSERT INTO messages (conversation_id, sender_id, content) VALUES ($1, $2, 'Payez sur ce lien')`, [id.C1, id.eve]);
await denied('eve ne se fait pas passer pour bob', 'eve',
  `INSERT INTO messages (conversation_id, sender_id, content) VALUES ($1, $2, 'x')`, [id.C1, id.bob]);
await allowed('alice répond à bob', 'alice',
  `INSERT INTO messages (conversation_id, sender_id, content) VALUES ($1, $2, 'Oui !')`, [id.C1, id.alice]);
await allowed('eve ne lit pas la conversation', 'eve', `SELECT * FROM messages WHERE conversation_id = $1`, [id.C1], (r) => r.rows.length === 0);
await allowed('alice marque le message de bob comme lu', 'alice', `UPDATE messages SET read_at = now() WHERE id = $1`, [id.M1], (r) => r.affectedRows === 1);
await denied('bob ne marque pas son propre message comme lu', 'bob', `UPDATE messages SET read_at = now() WHERE id = $1`, [id.M1]);
await denied('alice ne réécrit pas le contenu d\'un message', 'alice', `UPDATE messages SET content = 'modifié' WHERE id = $1`, [id.M1]);

console.log('\nB4 · Commandes');
await allowed('bob crée son adresse (mobile)', 'bob',
  `INSERT INTO addresses (id, user_id, address_line, city, phone, is_default) VALUES ($1, $2, 'Rue 10', 'Dakar', '77', true)`, [id.A_bob, id.bob]);
const order = (o) => [o.id ?? null, o.buyer ?? id.bob, o.seller ?? id.alice, o.listing ?? id.L1, o.status ?? 'pending', o.amount ?? 10000, o.addr ?? id.A_bob];
const orderSql = `INSERT INTO orders (id, buyer_id, seller_id, listing_id, status, total_amount, payment_method, delivery_address_id)
                  VALUES (coalesce($1::uuid, gen_random_uuid()), $2, $3, $4, $5, $6, 'cod', $7)`;
await denied('montant de 1 FCFA refusé', 'bob', orderSql, order({ amount: 1 }));
await denied('statut « paid » refusé', 'bob', orderSql, order({ status: 'paid' }));
await denied('faux vendeur refusé', 'bob', orderSql, order({ seller: id.eve }));
await denied('adresse d\'un autre refusée', 'bob', orderSql, order({ addr: id.A_eve }));
await denied('commande d\'un brouillon refusée', 'bob', orderSql, order({ listing: id.L2, amount: 5000 }));
await denied('alice n\'achète pas sa propre annonce', 'alice', orderSql, order({ buyer: id.alice, addr: null }));
await denied('eve ne passe pas commande au nom de bob', 'eve', orderSql, order({}));
await allowed('commande correcte (payload exact du checkout mobile)', 'bob', orderSql, order({ id: id.O1 }));
await denied('bob ne passe pas sa commande en « delivered »', 'bob', `UPDATE orders SET status = 'delivered' WHERE id = $1`, [id.O1]);

console.log('\nB3 · Avis');
const reviewSql = `INSERT INTO reviews (order_id, reviewer_id, reviewed_id, rating) VALUES ($1, $2, $3, $4)`;
await denied('avis refusé tant que la commande n\'est pas livrée', 'bob', reviewSql, [id.O1, id.bob, id.alice, 5]);
await db.exec(`UPDATE orders SET status = 'delivered' WHERE id = '${id.O1}'`);
await denied('eve ne note pas alice sans transaction', 'eve', reviewSql, [id.O1, id.eve, id.alice, 1]);
await denied('bob ne se note pas lui-même', 'bob', reviewSql, [id.O1, id.bob, id.bob, 5]);
await denied('bob ne note pas un tiers', 'bob', reviewSql, [id.O1, id.bob, id.eve, 1]);
await allowed('bob note alice après livraison', 'bob', reviewSql, [id.O1, id.bob, id.alice, 4]);
await allowed('alice note bob après livraison', 'alice', reviewSql, [id.O1, id.alice, id.bob, 5]);
await allowed('note d\'alice recalculée automatiquement (4.00, 1 avis)', 'postgres',
  `SELECT rating_avg, rating_count FROM profiles WHERE id = '${id.alice}'`, [], (r) => Number(r.rows[0].rating_avg) === 4 && r.rows[0].rating_count === 1);

console.log('\nI3 · Photos d\'annonce');
await denied('eve n\'ajoute pas de photo à l\'annonce d\'alice', 'eve',
  `INSERT INTO listing_images (listing_id, url) VALUES ($1, 'x')`, [id.L1]);
await allowed('alice ajoute une photo', 'alice', `INSERT INTO listing_images (id, listing_id, url) VALUES ($1, $2, 'x')`, [id.IMG, id.L1]);
await denied('eve ne supprime pas la photo d\'alice', 'eve', `DELETE FROM listing_images WHERE id = $1`, [id.IMG]);
await allowed('alice supprime sa photo (EditAd)', 'alice', `DELETE FROM listing_images WHERE id = $1`, [id.IMG], (r) => r.affectedRows === 1);

console.log('\nNon-régression');
await allowed('anonyme voit toujours les annonces actives', 'anon', `SELECT id FROM listings`, [], (r) => r.rows.length === 1);
await allowed('anonyme voit toujours pseudo, avatar et note', 'anon', `SELECT username, avatar_url, rating_avg, is_top_boutique FROM profiles`, [], (r) => r.rows.length > 0);
await allowed('favoris inchangés', 'bob', `INSERT INTO favorites (user_id, listing_id) VALUES ($1, $2)`, [id.bob, id.L1]);

console.log('\nÉtape 2 · Catégories, prix, brouillon, suppression, photos');
const L9 = 'aaaaaaaa-0000-0000-0000-000000000009';
await allowed('catégories Sneakers et Accessoires présentes, sans doublon', 'anon',
  `SELECT slug FROM categories WHERE slug IN ('sneakers', 'accessoires')`, [], (r) => r.rows.length === 2);
await denied('prix à 0 refusé', 'bob', `INSERT INTO listings (seller_id, title, price) VALUES ($1, 'Gratuit', 0)`, [id.bob]);
await denied('prix négatif refusé', 'bob', `INSERT INTO listings (seller_id, title, price) VALUES ($1, 'Négatif', -500)`, [id.bob]);
await allowed('publication en brouillon (PublishAd)', 'bob',
  `INSERT INTO listings (id, seller_id, title, price, status) VALUES ($1, $2, 'Air Max', 25000, 'draft')`, [L9, id.bob]);
await allowed('… brouillon invisible pour les visiteurs', 'anon', `SELECT id FROM listings WHERE id = $1`, [L9], (r) => r.rows.length === 0);
await allowed('… photos ajoutées au brouillon', 'bob', `INSERT INTO listing_images (listing_id, url, position) VALUES ($1, 'x', 0)`, [L9]);
await allowed('… mise en ligne par le vendeur', 'bob', `UPDATE listings SET status = 'active' WHERE id = $1`, [L9], (r) => r.affectedRows === 1);
await allowed('… visible une fois en ligne', 'anon', `SELECT id FROM listings WHERE id = $1`, [L9], (r) => r.rows.length === 1);
await denied('eve ne supprime pas l\'annonce d\'alice', 'eve', `UPDATE listings SET status = 'deleted' WHERE id = $1`, [id.L1]);
await allowed('alice supprime son annonce (suppression logique, retour du .select)', 'alice',
  `UPDATE listings SET status = 'deleted' WHERE id = $1 RETURNING id`, [id.L1], (r) => r.rows.length === 1);
await allowed('… annonce supprimée invisible pour les visiteurs', 'anon', `SELECT id FROM listings WHERE id = $1`, [id.L1], (r) => r.rows.length === 0);
await allowed('… conversations et commande conservées', 'postgres',
  `SELECT (SELECT count(*) FROM conversations WHERE listing_id = $1) AS c, (SELECT count(*) FROM orders WHERE listing_id = $1) AS o`,
  [id.L1], (r) => Number(r.rows[0].c) >= 1 && Number(r.rows[0].o) === 1);
await allowed('limites des buckets photos : 10 Mo, JPEG/PNG/WebP', 'postgres',
  `SELECT file_size_limit, allowed_mime_types FROM storage.buckets`, [],
  (r) => r.rows.length === 2 && r.rows.every((b) => Number(b.file_size_limit) === 10485760 && b.allowed_mime_types.join(',') === 'image/jpeg,image/png,image/webp'));

console.log('\nÉtape 3 · Commandes');
const L20 = 'aaaaaaaa-0000-0000-0000-000000000020';
const L21 = 'aaaaaaaa-0000-0000-0000-000000000021';
await db.exec(`RESET ROLE; INSERT INTO listings (id, seller_id, title, price, status) VALUES
  ('${L20}', '${id.alice}', 'Veste en jean', 15000, 'active'),
  ('${L21}', '${id.alice}', 'Sac wax', 8000, 'active');`);
const rpcOrder = `SELECT public.place_order($1, $2, $3) AS order_id`;
const rpcStatus = `SELECT public.update_order_status($1, $2) AS s`;
const listingStatus = (listingId, expected) => ['postgres', `SELECT status FROM listings WHERE id = $1`, [listingId], (r) => r.rows[0]?.status === expected];

await denied('un visiteur ne peut pas réserver', 'anon', rpcOrder, [L20, null, 'cod']);
await denied('Wave pas encore disponible', 'bob', rpcOrder, [L20, id.A_bob, 'wave']);
await denied('adresse d\'un autre membre refusée', 'bob', rpcOrder, [L20, id.A_eve, 'cod']);
await denied('alice ne réserve pas sa propre annonce', 'alice', rpcOrder, [L20, null, 'cod']);
let O20 = null;
await allowed('bob réserve la veste (checkout web)', 'bob', rpcOrder, [L20, id.A_bob, 'cod'], (r) => { O20 = r.rows[0]?.order_id; return !!O20; });
await allowed('… prix et vendeuse imposés par l\'annonce', 'postgres', `SELECT total_amount, seller_id, status FROM orders WHERE id = $1`, [O20],
  (r) => r.rows[0].total_amount === 15000 && r.rows[0].seller_id === id.alice && r.rows[0].status === 'pending');
await allowed('… annonce passée en « réservée »', ...listingStatus(L20, 'reserved'));
await allowed('… toujours visible pour les visiteurs, marquée réservée', 'anon', `SELECT status FROM listings WHERE id = $1`, [L20], (r) => r.rows[0]?.status === 'reserved');
await denied('eve ne peut plus la réserver', 'eve', rpcOrder, [L20, null, 'cod']);
await denied('… ni via l\'insertion directe de l\'app mobile', 'eve',
  `INSERT INTO orders (buyer_id, seller_id, listing_id, status, total_amount, payment_method) VALUES ($1, $2, $3, 'pending', 15000, 'cod')`, [id.eve, id.alice, L20]);
await allowed('alice voit le lieu de remise de bob pour sa vente', 'alice', `SELECT address_line FROM addresses WHERE id = $1`, [id.A_bob], (r) => r.rows.length === 1);
await allowed('eve ne le voit pas', 'eve', `SELECT address_line FROM addresses WHERE id = $1`, [id.A_bob], (r) => r.rows.length === 0);
await allowed('bob obtient le WhatsApp de la vendeuse malgré la réservation', 'bob', `SELECT public.get_seller_phone($1) AS p`, [L20], (r) => !!r.rows[0].p);
await allowed('eve non', 'eve', `SELECT public.get_seller_phone($1) AS p`, [L20], (r) => r.rows[0].p === null);
await allowed('bob et alice voient la commande avec ses jointures (page commande)', 'bob',
  `SELECT o.id, l.title, a.address_line FROM orders o LEFT JOIN listings l ON l.id = o.listing_id LEFT JOIN addresses a ON a.id = o.delivery_address_id WHERE o.id = $1`, [O20],
  (r) => r.rows[0]?.title === 'Veste en jean' && r.rows[0]?.address_line === 'Rue 10');

await denied('bob ne peut pas marquer « remis » (rôle vendeur)', 'bob', rpcStatus, [O20, 'shipped']);
await denied('eve n\'annule pas la commande des autres', 'eve', rpcStatus, [O20, 'cancelled']);
await allowed('alice marque l\'article comme remis', 'alice', rpcStatus, [O20, 'shipped'], (r) => r.rows[0].s === 'shipped');
await denied('alice ne confirme pas la réception à la place de bob', 'alice', rpcStatus, [O20, 'delivered']);
await denied('plus d\'annulation après la remise', 'bob', rpcStatus, [O20, 'cancelled']);
await denied('statut inconnu refusé', 'bob', rpcStatus, [O20, 'paid']);
await allowed('bob confirme la réception', 'bob', rpcStatus, [O20, 'delivered'], (r) => r.rows[0].s === 'delivered');
await allowed('… annonce passée en « vendue »', ...listingStatus(L20, 'sold'));
await allowed('bob laisse un avis sur alice', 'bob', `INSERT INTO reviews (order_id, reviewer_id, reviewed_id, rating, comment) VALUES ($1, $2, $3, 5, 'Parfait')`, [O20, id.bob, id.alice]);
await allowed('alice laisse un avis sur bob', 'alice', `INSERT INTO reviews (order_id, reviewer_id, reviewed_id, rating) VALUES ($1, $2, $3, 4)`, [O20, id.alice, id.bob]);

const O21 = 'eeeeeeee-0000-0000-0000-000000000021';
await allowed('eve réserve le sac via l\'app mobile (insertion directe)', 'eve',
  `INSERT INTO orders (id, buyer_id, seller_id, listing_id, status, total_amount, payment_method) VALUES ($1, $2, $3, $4, 'pending', 8000, 'cod')`, [O21, id.eve, id.alice, L21]);
await allowed('… annonce réservée aussi par ce chemin', ...listingStatus(L21, 'reserved'));
await denied('une seule commande en cours par annonce (même sans les règles)', 'postgres',
  `INSERT INTO orders (buyer_id, seller_id, listing_id, status, total_amount, payment_method) VALUES ($1, $2, $3, 'pending', 8000, 'cod')`, [id.bob, id.alice, L21]);
await allowed('eve annule sa réservation', 'eve', rpcStatus, [O21, 'cancelled'], (r) => r.rows[0].s === 'cancelled');
await allowed('… annonce remise en vente', ...listingStatus(L21, 'active'));
await allowed('bob peut maintenant la réserver', 'bob', rpcOrder, [L21, null, 'cod'], (r) => !!r.rows[0].order_id);
await allowed('la vendeuse peut annuler une réservation', 'alice',
  `SELECT public.update_order_status((SELECT id FROM orders WHERE listing_id = $1 AND status = 'pending'), 'cancelled') AS s`, [L21], (r) => r.rows[0].s === 'cancelled');
await allowed('… annonce de nouveau en vente', ...listingStatus(L21, 'active'));

console.log('\nÉtape 3 · Annonces, signalements, paiements');
await denied('alice ne transfère pas son annonce à bob', 'alice', `UPDATE listings SET seller_id = $1 WHERE id = $2`, [id.bob, L21]);
await denied('une annonce ne peut pas être créée directement « vendue »', 'bob', `INSERT INTO listings (seller_id, title, price, status) VALUES ($1, 'x', 100, 'sold')`, [id.bob]);
await allowed('app mobile : publication directe en ligne toujours possible', 'bob', `INSERT INTO listings (seller_id, title, price, status) VALUES ($1, 'Casquette', 3000, 'active')`, [id.bob]);

const reportSql = `INSERT INTO reports (listing_id, reporter_id, reason, details) VALUES ($1, $2, $3, $4)`;
await allowed('bob signale une annonce', 'bob', reportSql, [L21, id.bob, 'counterfeit', 'Logo douteux']);
await denied('… une seule fois par annonce', 'bob', reportSql, [L21, id.bob, 'scam', null]);
await denied('eve ne signale pas au nom de bob', 'eve', reportSql, [L21, id.bob, 'other', null]);
await denied('motif inconnu refusé', 'eve', reportSql, [L21, id.eve, 'nimporte', null]);
await denied('un visiteur ne signale pas', 'anon', reportSql, [L21, id.bob, 'other', null]);
await allowed('bob retrouve son signalement', 'bob', `SELECT id FROM reports`, [], (r) => r.rows.length === 1);
await allowed('eve ne voit pas les signalements des autres', 'eve', `SELECT id FROM reports`, [], (r) => r.rows.length === 0);
await allowed('la vendeuse signalée ne sait pas qui l\'a signalée', 'alice', `SELECT id FROM reports`, [], (r) => r.rows.length === 0);
await denied('bob ne clôt pas lui-même son signalement', 'bob', `UPDATE reports SET status = 'resolved'`);

await denied('un membre n\'écrit pas de transaction de paiement', 'bob',
  `INSERT INTO payment_transactions (order_id, provider, status, amount) VALUES ($1, 'wave', 'succeeded', 15000)`, [O20]);
await db.exec(`RESET ROLE; INSERT INTO payment_transactions (order_id, provider, provider_ref, status, amount) VALUES ('${O20}', 'cod', 'remise-1', 'succeeded', 15000);`);
await allowed('la vendeuse voit le paiement de sa commande', 'alice', `SELECT id FROM payment_transactions`, [], (r) => r.rows.length === 1);
await allowed('eve ne le voit pas', 'eve', `SELECT id FROM payment_transactions`, [], (r) => r.rows.length === 0);

console.log('\nNotifications de commande dans la messagerie');
const L30 = 'aaaaaaaa-0000-0000-0000-000000000030';
const L31 = 'aaaaaaaa-0000-0000-0000-000000000031';
await db.exec(`RESET ROLE; INSERT INTO listings (id, seller_id, title, price, status) VALUES
  ('${L30}', '${id.alice}', 'Robe wax', 12500, 'active'),
  ('${L31}', '${id.alice}', 'Sandales', 6000, 'active');`);
const orderMessages = (listingId) => `SELECT m.content, m.sender_id, m.order_id, m.read_at
  FROM messages m JOIN conversations c ON c.id = m.conversation_id
  WHERE c.listing_id = '${listingId}' AND m.kind = 'order'
  ORDER BY m.created_at`;

let O30 = null;
await allowed('bob réserve la robe', 'bob', rpcOrder, [L30, id.A_bob, 'cod'], (r) => { O30 = r.rows[0]?.order_id; return !!O30; });
await allowed('… la vendeuse reçoit un message de réservation, non lu, avec le prix', 'alice', orderMessages(L30), [],
  (r) => r.rows.length === 1 && r.rows[0].sender_id === id.bob && r.rows[0].order_id === O30 && r.rows[0].read_at === null && r.rows[0].content.includes('12 500 FCFA'));
await allowed('… une seule conversation pour cet article', 'postgres', `SELECT count(*)::int AS n FROM conversations WHERE listing_id = $1`, [L30], (r) => r.rows[0].n === 1);
await allowed('… eve ne voit pas ce message', 'eve', orderMessages(L30), [], (r) => r.rows.length === 0);
await allowed('alice indique la remise', 'alice', rpcStatus, [O30, 'shipped'], (r) => r.rows[0].s === 'shipped');
await allowed('bob confirme la réception', 'bob', rpcStatus, [O30, 'delivered'], (r) => r.rows[0].s === 'delivered');
await allowed('… 3 messages, chacun au nom de la personne qui a agi', 'bob', orderMessages(L30), [],
  (r) => r.rows.length === 3
    && r.rows[0].sender_id === id.bob
    && r.rows[1].sender_id === id.alice && r.rows[1].content.includes('remis')
    && r.rows[2].sender_id === id.bob && r.rows[2].content.includes('avis'));

await allowed('eve écrit d\'abord à la vendeuse des sandales', 'eve', `INSERT INTO conversations (listing_id, buyer_id, seller_id) VALUES ($1, $2, $3)`, [L31, id.eve, id.alice]);
const O31 = 'eeeeeeee-0000-0000-0000-000000000031';
await allowed('eve réserve via l\'app mobile (insertion directe)', 'eve',
  `INSERT INTO orders (id, buyer_id, seller_id, listing_id, status, total_amount, payment_method) VALUES ($1, $2, $3, $4, 'pending', 6000, 'cod')`, [O31, id.eve, id.alice, L31]);
await allowed('… le message arrive dans la conversation existante', 'postgres',
  `SELECT count(DISTINCT c.id)::int AS convs, count(m.id)::int AS msgs FROM conversations c LEFT JOIN messages m ON m.conversation_id = c.id AND m.kind = 'order' WHERE c.listing_id = $1`,
  [L31], (r) => r.rows[0].convs === 1 && r.rows[0].msgs === 1);
await allowed('la vendeuse annule la vente', 'alice', rpcStatus, [O31, 'cancelled'], (r) => r.rows[0].s === 'cancelled');
await allowed('… eve reçoit le message d\'annulation de la vendeuse', 'eve', orderMessages(L31), [],
  (r) => r.rows.length === 2 && r.rows[1].sender_id === id.alice && r.rows[1].content.includes('annulé la vente'));

const conversationL31 = `(SELECT id FROM conversations WHERE listing_id = '${L31}')`;
await denied('un membre ne fabrique pas de faux message de commande', 'eve',
  `INSERT INTO messages (conversation_id, sender_id, content, kind) VALUES (${conversationL31}, $1, 'Commande payée', 'order')`, [id.eve]);
await denied('… ni un message rattaché à une commande', 'eve',
  `INSERT INTO messages (conversation_id, sender_id, content, order_id) VALUES (${conversationL31}, $1, 'x', $2)`, [id.eve, O31]);
await allowed('les messages ordinaires fonctionnent toujours (site et app)', 'eve',
  `INSERT INTO messages (conversation_id, sender_id, content) VALUES (${conversationL31}, $1, 'Merci quand même')`, [id.eve]);

console.log('\nIndex et date de modification');
const expectThat = (label, condition, detail) => (condition ? pass(label) : fail(label, detail));
const indexCount = await as('postgres', `SELECT count(*)::int AS n FROM pg_indexes WHERE schemaname = 'public' AND indexname LIKE '%\\_idx' ESCAPE '\\'`);
expectThat('20 index de performance créés', indexCount.rows[0].n >= 20, `${indexCount.rows[0].n} index`);
await db.exec(`RESET ROLE; SET session_replication_role = replica; UPDATE listings SET updated_at = '2000-01-01' WHERE id = '${L30}'; SET session_replication_role = origin;`);
await allowed('alice modifie son annonce', 'alice', `UPDATE listings SET title = 'Robe wax brodée' WHERE id = $1`, [L30], (r) => r.affectedRows === 1);
await allowed('… sa date de modification est mise à jour', 'postgres', `SELECT updated_at > '2001-01-01' AS fresh FROM listings WHERE id = $1`, [L30], (r) => r.rows[0].fresh === true);

console.log('\nLimites anti-abus');
async function attempts(who, count, statementFor) {
  let accepted = 0;
  let lastError = null;
  for (let i = 0; i < count; i++) {
    try {
      await as(who, ...statementFor(i));
      accepted++;
    } catch (e) {
      lastError = e.message;
    }
  }
  return { accepted, lastError };
}
const countOf = async (sql, params) => Number((await as('postgres', sql, params)).rows[0].n);

// Deux paliers : nina a un compte récent, vera un compte de plus de 30 jours
id.nina = '99999999-0000-0000-0000-000000000001';
id.vera = '99999999-0000-0000-0000-000000000002';
await db.exec(`RESET ROLE; SELECT set_config('request.jwt.claim.sub', '', false);
  INSERT INTO auth.users (id, email, raw_user_meta_data) VALUES
    ('${id.nina}', 'nina@example.com', '{"username":"nina"}'),
    ('${id.vera}', 'vera@example.com', '{"username":"vera"}');
  UPDATE profiles SET created_at = now() - interval '60 days' WHERE id = '${id.vera}';`);
await denied('un membre ne peut pas vieillir son compte pour échapper aux limites', 'bob', `UPDATE profiles SET created_at = '2000-01-01' WHERE id = $1`, [id.bob]);

// Annonces : 5 par 24 h pour un compte récent, 20 ensuite
const listingsToday = (who) => countOf(`SELECT count(*) AS n FROM listings WHERE seller_id = $1 AND created_at > now() - interval '24 hours'`, [id[who]]);
const publishMany = (who) => attempts(who, 25, (i) => [`INSERT INTO listings (seller_id, title, price) VALUES ($1, $2, 1000)`, [id[who], `Lot ${i}`]]);
const bobPublish = await publishMany('bob');
const bobListings = await listingsToday('bob');
expectThat('compte récent (bob) : 5 annonces par 24 h', bobListings === 5 && /5 annonces/.test(bobPublish.lastError || ''),
  `${bobListings} annonces, dernière erreur : ${bobPublish.lastError}`);
await denied('… même en antidatant l\'annonce', 'bob', `INSERT INTO listings (seller_id, title, price, created_at) VALUES ($1, 'Antidatée', 1000, '2000-01-01')`, [id.bob]);
const veraPublish = await publishMany('vera');
const veraListings = await listingsToday('vera');
expectThat('compte de plus de 30 jours (vera) : 20 annonces par 24 h', veraListings === 20 && /20 annonces/.test(veraPublish.lastError || ''),
  `${veraListings} annonces, dernière erreur : ${veraPublish.lastError}`);
await allowed('le service Addikt n\'est pas plafonné', 'postgres', `INSERT INTO listings (seller_id, title, price) VALUES ($1, 'Import', 1000)`, [id.bob]);

// Messages : 30 en 10 minutes
const messageRun = await attempts('eve', 40, (i) => [`INSERT INTO messages (conversation_id, sender_id, content) VALUES (${conversationL31}, $1, $2)`, [id.eve, `Message ${i}`]]);
const eveRecentMessages = await countOf(`SELECT count(*) AS n FROM messages WHERE sender_id = $1 AND kind = 'user' AND created_at > now() - interval '10 minutes'`, [id.eve]);
expectThat('eve plafonnée à 30 messages en 10 minutes', eveRecentMessages === 30 && /beaucoup de messages/.test(messageRun.lastError || ''),
  `${eveRecentMessages} messages, dernière erreur : ${messageRun.lastError}`);
const L32 = 'aaaaaaaa-0000-0000-0000-000000000032';
await db.exec(`RESET ROLE; INSERT INTO listings (id, seller_id, title, price, status) VALUES ('${L32}', '${id.alice}', 'Ceinture', 4000, 'active');`);
await allowed('… sa réservation passe quand même', 'eve', rpcOrder, [L32, null, 'cod'], (r) => !!r.rows[0].order_id);
await allowed('… avec son message automatique pour la vendeuse', 'alice', orderMessages(L32), [], (r) => r.rows.length === 1);

// Réservations : compte récent 3 en cours et 5 par 24 h ; ensuite 5 en cours et 15 par 24 h
const createListingsFor = (ids, label) => db.exec(`RESET ROLE; SELECT set_config('request.jwt.claim.sub', '', false);
  INSERT INTO listings (id, seller_id, title, price, status) VALUES ${ids.map((lid, i) => `('${lid}', '${id.alice}', '${label} ${i}', 2000, 'active')`).join(', ')};`);
async function reserveUntilLimits(who, targets) {
  const firstRun = await attempts(who, targets.length, (i) => [rpcOrder, [targets[i], null, 'cod']]);
  // Réserver puis annuler en boucle jusqu'à la limite quotidienne
  let dailyError = null;
  for (let i = 0; i < 20 && !dailyError; i++) {
    const open = await as(who, `SELECT id, listing_id FROM orders WHERE buyer_id = $1 AND status = 'pending' ORDER BY created_at LIMIT 1`, [id[who]]);
    await as(who, rpcStatus, [open.rows[0].id, 'cancelled']);
    try {
      await as(who, rpcOrder, [open.rows[0].listing_id, null, 'cod']);
    } catch (e) {
      dailyError = e.message;
    }
  }
  const today = await countOf(`SELECT count(*) AS n FROM orders WHERE buyer_id = $1 AND created_at > now() - interval '24 hours'`, [id[who]]);
  return { firstRun, dailyError, today };
}
const ninaTargets = Array.from({ length: 4 }, (_, i) => `aaaaaaaa-0000-0000-0000-0000000000${50 + i}`);
const veraTargets = Array.from({ length: 6 }, (_, i) => `aaaaaaaa-0000-0000-0000-0000000000${40 + i}`);
await createListingsFor(ninaTargets, 'Article nina');
await createListingsFor(veraTargets, 'Article vera');

const ninaOrders = await reserveUntilLimits('nina', ninaTargets);
expectThat('compte récent (nina) : 3 réservations en cours au maximum', ninaOrders.firstRun.accepted === 3 && /3 réservations en cours/.test(ninaOrders.firstRun.lastError || ''),
  `${ninaOrders.firstRun.accepted} réservations, dernière erreur : ${ninaOrders.firstRun.lastError}`);
expectThat('… et 5 réservations créées par 24 h', ninaOrders.today === 5 && /aujourd'hui/.test(ninaOrders.dailyError || ''),
  `${ninaOrders.today} réservations sur 24 h, erreur : ${ninaOrders.dailyError}`);

const veraOrders = await reserveUntilLimits('vera', veraTargets);
expectThat('compte de plus de 30 jours (vera) : 5 réservations en cours au maximum', veraOrders.firstRun.accepted === 5 && /5 réservations en cours/.test(veraOrders.firstRun.lastError || ''),
  `${veraOrders.firstRun.accepted} réservations, dernière erreur : ${veraOrders.firstRun.lastError}`);
expectThat('… et 15 réservations créées par 24 h', veraOrders.today === 15 && /aujourd'hui/.test(veraOrders.dailyError || ''),
  `${veraOrders.today} réservations sur 24 h, erreur : ${veraOrders.dailyError}`);

// Signalements : 3 par 24 h pour un compte récent, 10 ensuite
const reportTargets = [...veraTargets, L20, L21, L30, L31, L32];
const reportMany = (who) => attempts(who, reportTargets.length, (i) => [reportSql, [reportTargets[i], id[who], 'other', null]]);
const eveReports = await reportMany('eve');
expectThat('compte récent (eve) : 3 signalements par 24 h', eveReports.accepted === 3 && /signalements/.test(eveReports.lastError || ''),
  `${eveReports.accepted} signalements, dernière erreur : ${eveReports.lastError}`);
const veraReports = await reportMany('vera');
expectThat('compte de plus de 30 jours (vera) : 10 signalements par 24 h', veraReports.accepted === 10 && /signalements/.test(veraReports.lastError || ''),
  `${veraReports.accepted} signalements, dernière erreur : ${veraReports.lastError}`);

// Nouvelles conversations : 10 par 24 h pour un compte récent, 20 ensuite
const contactTargets = Array.from({ length: 25 }, (_, i) => `aaaaaaaa-0000-0000-0000-0000000001${String(i).padStart(2, '0')}`);
await db.exec(`RESET ROLE; SELECT set_config('request.jwt.claim.sub', '', false);
  INSERT INTO listings (id, seller_id, title, price, status) VALUES ${contactTargets.map((lid, i) => `('${lid}', '${id.alice}', 'Pièce ${i}', 1500, 'active')`).join(', ')};`);
async function contactMany(who) {
  const run = await attempts(who, contactTargets.length, (i) => [`INSERT INTO conversations (listing_id, buyer_id, seller_id) VALUES ($1, $2, $3)`, [contactTargets[i], id[who], id.alice]]);
  const today = await countOf(`SELECT count(*) AS n FROM conversations WHERE buyer_id = $1 AND created_at > now() - interval '24 hours'`, [id[who]]);
  return { ...run, today };
}
const eveContacts = await contactMany('eve');
expectThat('compte récent (eve) : 10 nouvelles conversations par 24 h', eveContacts.today === 10 && /beaucoup de vendeurs/.test(eveContacts.lastError || ''),
  `${eveContacts.today} conversations, dernière erreur : ${eveContacts.lastError}`);
const veraContacts = await contactMany('vera');
expectThat('compte de plus de 30 jours (vera) : 20 nouvelles conversations par 24 h', veraContacts.today === 20 && /beaucoup de vendeurs/.test(veraContacts.lastError || ''),
  `${veraContacts.today} conversations, dernière erreur : ${veraContacts.lastError}`);

console.log(`\n${passed} réussis, ${failures.length} échoués`);
if (failures.length) { console.log('Échecs :\n - ' + failures.join('\n - ')); process.exit(1); }
