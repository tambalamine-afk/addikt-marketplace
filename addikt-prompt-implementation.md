Tu es un architecte logiciel et designer produit senior de classe mondiale
avec plus de 15 ans d'experience dans la conception de marketplaces C2C
(type Vinted, Depop, Poshmark) et de plateformes e-commerce a grande
echelle. Tu as concu des produits pour des entreprises de premier plan
dans ce secteur.

On veut construire Addikt, une marketplace C2C full-stack dediee a la
mode, neuve et de seconde main, pensee pour Dakar, le marche senegalais
et ivoirien / ouest-africain, avec une identite visuelle "cool" forte et
differenciante (typographies Google Sans / Zalando Sans Expanded,
fonds proche du noir, palette de 5 couleurs vives, motif de cartes en
eventail). Depop est la reference UX principale. C'est tres important
que tu fasses ca bien — c'est un produit que de vrais utilisateurs vont
utiliser pour acheter et vendre des vetements, donc la confiance
(paiement, communication, transactions) est essentielle.

En tant qu'utilisateur, on veut pouvoir :

* Parcourir un fil de decouverte / accueil avec des articles mis en
* avant, tendances, nouveautes
* Rechercher et filtrer les articles (categorie, taille, marque, prix,
* etat, couleur)
* Voir la fiche detaillee d'un article (photos multiples, description,
* taille, etat, prix en FCFA, profil du vendeur)
* Publier une annonce facilement (upload multi-photos, titre,
* description, categorie, taille, marque, etat, prix)
* Gerer mon profil (statistiques de vente, followers/following, note,
* articles en vente, articles vendus)
* Contacter un vendeur / acheteur via une messagerie integree liee a
* un article
* Ajouter des articles a mes favoris / liste de souhaits
* Ajouter au panier et passer commande, avec paiement via Wave /
* Orange Money (et eventuellement paiement a la livraison)
* Suivre le statut de mes commandes (en attente, expediee / a
* recuperer, livree, annulee)
* Noter et laisser un avis apres une transaction (vendeur et acheteur)
* Gerer les parametres de mon compte (infos perso, adresse, moyens de
* paiement, notifications)
* Tout ce qu'une marketplace C2C de mode moderne inclurait
* habituellement (moderation des annonces, signalement, etc.)

La plateforme doit utiliser Next.js 14 (App Router), Supabase pour la
base de donnees, l'authentification et le stockage des images, et
Tailwind CSS. On deploiera sur Vercel.

Je definirai l'UX via des captures d'ecran et ma charte graphique
existante (typographies, couleurs, motif de cartes en eventail), donc
ne t'inquiete pas des details de design pour l'instant. Le flux sera :

* D'abord, on construira les fonctionnalites principales en utilisant
* les captures d'ecran comme inspiration de design. Tu prendras le
* style de design des captures, et tu l'utiliseras pour construire
* toutes les pages connectees.
* Ensuite, on le rendra interactif avec des donnees locales (mock) et
* on s'assurera que les routes fonctionnent.
* Ensuite, on ajoutera la base de donnees et les tests avec Supabase.
* Ensuite, on ajoutera l'authentification.
* Ensuite, on integrera le paiement (Wave / Orange Money) et le flux
* de commande complet.
* Ensuite, on fera une landing page.
* Finalement, on fera un passage de bout en bout et on s'assurera que
* tout fonctionne, incluant le middleware d'authentification, la
* securite, les tests, etc., puis on deploiera et on retestera.

Reflechis extremement fort et genere un plan d'implementation complet
et detaille. Une fois que tu en as developpe un qui est solide, reviens
ici et je te fournirai les captures d'ecran d'inspiration ainsi que ma
charte graphique.
