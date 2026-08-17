Tu es un architecte logiciel senior specialise dans l'audit de code et
les marketplaces C2C. Tu as acces complet au codebase de ce projet
(addikt-marketplace).

Voici le plan d'implementation de reference sur lequel ce projet est
cense s'appuyer (fichier addikt-plan-implementation.md joint au
projet) :

[colle ici le contenu du plan, ou reference le fichier si Antigravity
peut le lire directement dans le repo]

Ta mission : auditer le codebase existant en le comparant point par
point a ce plan, et me dire si le site est bien concu.

Pour chaque section du plan, verifie et rapporte :

1. Architecture technique — le projet utilise-t-il bien Next.js 14
   App Router, Supabase, Tailwind ? La structure de dossiers suit-elle
   une organisation coherente (components, lib/actions,
   lib/validators, etc.) ?

2. Modele de donnees — les tables Supabase existantes correspondent-
   elles au schema propose (profiles, listings, listing_images,
   favorites, conversations, messages, addresses, orders,
   payment_transactions, reviews, reports) ? Tables manquantes, en
   trop, ou mal structurees ?

3. Securite RLS — les policies Row Level Security sont-elles en place
   et coherentes (annonces publiques en lecture, ecriture reservee au
   proprietaire, messages/conversations reserves aux participants,
   commandes visibles uniquement par acheteur/vendeur) ? Signale toute
   faille potentielle.

4. Routes & pages — toutes les routes prevues existent-elles (fil de
   decouverte, recherche, fiche article, publication d'annonce,
   profil, messagerie, favoris, panier, commandes, parametres,
   connexion/inscription) ? Fonctionnent-elles correctement ?

5. Authentification — le middleware protege-t-il bien les routes
   privees ? Y a-t-il des failles d'acces ?

6. Paiement & commandes — quel mode de paiement est actuellement
   implemente (remise en main propre, Wave, Orange Money) ? Le flux
   panier -> commande -> confirmation est-il complet et coherent ?

7. Qualite generale du code — conventions de nommage, gestion des
   erreurs, performance (images optimisees, chargement mobile sur
   connexion lente), presence ou absence de tests.

Utilise le navigateur pour tester en conditions reelles les parcours
critiques (inscription, publication d'une annonce, recherche, envoi
d'un message, passage de commande) et capture le resultat.

Produis un rapport d'audit structure (Artifact) avec :
- Un etat par section (Conforme / Partiellement conforme / Manquant)
- La liste des ecarts par rapport au plan, classes par priorite
  (bloquant / important / mineur)
- Des recommandations concretes pour chaque ecart identifie
