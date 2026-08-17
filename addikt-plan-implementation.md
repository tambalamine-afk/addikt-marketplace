# Addikt — Plan d'implémentation complet

## 0. Principes directeurs

- **Mobile-first strict** : la grande majorité des utilisateurs viendront sur smartphone, connexion parfois lente → images optimisées (WebP, lazy loading, formats compressés côté upload), pages légères.
- **Confiance avant tout** : profils, notes, avis et messagerie doivent être solides dès le MVP — c'est ce qui fait qu'un inconnu accepte d'acheter/vendre à un autre inconnu.
- **Paiement pragmatique** : Wave / Orange Money nécessitent un compte marchand (délais d'intégration, KYC). Le MVP doit pouvoir fonctionner avec "remise en main propre / paiement à la livraison" pendant que l'intégration paiement en ligne se met en place en parallèle — ne pas bloquer le lancement dessus.
- **Réutiliser le design system existant** (Google Sans / Zalando Sans Expanded, fond proche du noir, 5 couleurs vives, motif de cartes en éventail) comme base de tokens Tailwind, affiné ensuite par tes captures d'écran.

---

## 1. Architecture technique

```
Next.js 14 (App Router, Server Actions, RSC)
Supabase (Postgres, Auth, Storage, Realtime)
Tailwind CSS (design tokens Addikt)
Vercel (hosting + preview deployments)
```

**Structure de dossiers proposée :**

```
app/
  (marketing)/            → landing page publique
  (app)/
    page.tsx              → fil de découverte
    recherche/
    article/[id]/
    vendre/
    profil/[username]/
    messages/
    messages/[conversationId]/
    favoris/
    panier/
    commandes/
    commandes/[id]/
    parametres/
    connexion/
    inscription/
components/
  ui/                      → Button, Badge, Input, Modal, Toast…
  listing/                 → ListingCard, ListingGrid, ListingForm, ImageUploader
  profile/                 → ProfileHeader, RatingStars, SellerBadge
  messaging/               → ConversationList, MessageThread, MessageInput
  cart/                    → CartItem, CartSummary
  layout/                  → Navbar, BottomNav (mobile), Footer
lib/
  supabase/                → clients (server/client/middleware)
  actions/                 → Server Actions (create-listing, send-message, place-order…)
  validators/              → schémas Zod
  utils/                   → format prix FCFA, dates, etc.
```

**Gestion d'état** : privilégier React Server Components + Server Actions pour les mutations (pas de gros state manager nécessaire). Un state client léger (Zustand ou context) suffit pour panier/favoris en optimistic UI, synchronisé avec Supabase. La messagerie utilise Supabase Realtime (subscriptions) pour le live update des conversations.

---

## 2. Modèle de données (Supabase / Postgres)

| Table | Colonnes clés | Notes |
|---|---|---|
| `profiles` | id (uuid, ref auth.users), username, full_name, avatar_url, bio, phone, location, rating_avg, rating_count, created_at | Créée automatiquement via trigger à l'inscription |
| `categories` | id, name, slug, parent_id, icon | Arbre catégories/sous-catégories |
| `listings` | id, seller_id, title, description, category_id, brand, size, condition, color, price, currency (FCFA), status (`draft`\|`active`\|`reserved`\|`sold`\|`deleted`), created_at, updated_at | |
| `listing_images` | id, listing_id, url, position | Stockées dans Supabase Storage |
| `favorites` | user_id, listing_id, created_at | Clé composite |
| `conversations` | id, listing_id, buyer_id, seller_id, created_at | Une conversation par (article, acheteur) |
| `messages` | id, conversation_id, sender_id, content, created_at, read_at | |
| `addresses` | id, user_id, label, address_line, city, phone, is_default | |
| `orders` | id, buyer_id, seller_id, listing_id, status (`pending`\|`paid`\|`shipped`\|`delivered`\|`cancelled`), total_amount, payment_method (`wave`\|`orange_money`\|`cod`), delivery_address_id, created_at | |
| `payment_transactions` | id, order_id, provider, provider_ref, status, amount, created_at | Journal des paiements/webhooks |
| `reviews` | id, order_id, reviewer_id, reviewed_id, rating, comment, created_at | Note vendeur ET acheteur |
| `reports` | id, listing_id, reporter_id, reason, status, created_at | Signalement / modération |

**Sécurité (RLS)** :
- `listings` : lecture publique si `status = 'active'`, écriture réservée à `seller_id = auth.uid()`.
- `messages` / `conversations` : lecture/écriture réservées aux participants (`buyer_id` ou `seller_id`).
- `orders` : visibles uniquement par `buyer_id` ou `seller_id`.
- `profiles` : lecture publique (infos non sensibles), écriture réservée au propriétaire.
- Bucket Storage `listing-images` : upload réservé aux utilisateurs authentifiés, avec limite de taille/format côté policy.

---

## 3. Phases de développement

### Phase 1 — Fondations UI + données mock
- Init projet Next.js 14, config Tailwind avec tokens de marque (couleurs, typographies, radius, motif cartes en éventail).
- Bibliothèque de composants de base (`ui/`).
- Construction des pages avec données mock locales : fil de découverte, recherche/filtres, fiche article, formulaire de publication, profil, messagerie (UI seule), panier, paramètres.
- Navigation mobile (bottom nav) + navigation desktop.
- Toutes les routes doivent être fonctionnelles avec du contenu factice cohérent.

### Phase 2 — Supabase (données réelles)
- Écriture du schéma + migrations SQL, policies RLS.
- Seed de données de test (catégories, quelques annonces).
- Remplacement des données mock par des requêtes Supabase (Server Components pour lecture, Server Actions pour écriture).
- Tests d'intégration sur les opérations CRUD critiques (créer/modifier/supprimer une annonce).

### Phase 3 — Authentification
- Supabase Auth : email/mot de passe en base, **option recommandée : ajouter l'auth par numéro de téléphone (OTP SMS)**, plus adaptée aux usages locaux que l'email seul.
- Middleware Next.js pour protéger les routes privées (`/vendre`, `/messages`, `/panier`, `/commandes`, `/parametres`).
- Flow d'onboarding après inscription (choix pseudo, photo de profil, ville).

### Phase 4 — Paiement & flux de commande
- MVP : option **"remise en main propre / paiement à la livraison"** activée par défaut.
- En parallèle : intégration Wave Checkout API et/ou Orange Money Web Payment API (nécessite compte marchand + validation KYC côté fournisseur — à lancer tôt car les délais d'approbation peuvent être longs).
- Webhooks de confirmation de paiement → mise à jour `payment_transactions` et `orders.status`.
- Flow complet : panier → adresse/mode de remise → paiement → confirmation → suivi de commande.

### Phase 5 — Landing page
- Page marketing séparée de l'app (accroche, capture d'écran produit, témoignages si disponibles, CTA inscription).
- SEO de base (meta tags, OpenGraph, sitemap).

### Phase 6 — Sécurité, tests, déploiement, re-test
- **Sécurité** : validation stricte des inputs (Zod), limites d'upload (taille/format image), rate limiting sur création d'annonces et envoi de messages (anti-spam), système de signalement (`reports`) pour la modération.
- **Tests** : unitaires (utils, calculs), intégration (Server Actions), end-to-end avec Playwright sur les parcours critiques (inscription → publication → recherche → message → commande → paiement).
- **Déploiement** : projet Vercel, variables d'environnement (clés Supabase, clés fournisseurs de paiement), déploiements de preview par PR.
- **Re-test post-déploiement** : rejouer les parcours critiques en production, vérifier RLS et middleware d'auth en conditions réelles.

---

## 4. Périmètre MVP vs V2

**MVP (lancement)**
Fil de découverte, recherche/filtres, fiche article, publication d'annonce, profil vendeur, messagerie, favoris, commande avec remise en main propre, avis post-transaction.

**V2 (après lancement)**
Paiement en ligne Wave/Orange Money, livraison via partenaire logistique, boost/mise en avant d'annonces payante, notifications push, back-office de modération dédié.

---

## Prochaine étape

Le plan est posé — il ne reste plus qu'à m'envoyer tes captures d'écran d'inspiration et ta charte graphique pour attaquer la Phase 1 (construction des pages avec le design réel).
