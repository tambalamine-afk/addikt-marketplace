import Link from 'next/link';
import LegalPage, { LegalList, LegalSection } from '../../components/LegalPage';
import { LEGAL_CONTACT_EMAIL } from '../../lib/legal';

export const metadata = {
  title: 'Politique de confidentialité · Addikt',
  description: 'Quelles données Addikt collecte, pourquoi, qui peut les voir et quels sont tes droits.',
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité" updatedAt="13 septembre 2026">
      <LegalSection title="Les données que nous utilisons">
        <LegalList>
          <li><b>Ton compte</b> : adresse email ou numéro de téléphone de connexion, pseudo, nom, ville ou quartier, photo de profil et de couverture, bio.</li>
          <li><b>Ton numéro WhatsApp</b>, si tu choisis de le renseigner dans ton profil.</li>
          <li><b>Ton activité</b> : annonces et photos publiées, messages, favoris, abonnements à d'autres boutiques, avis.</li>
          <li><b>Tes commandes</b> et les adresses de remise que tu enregistres.</li>
          <li><b>Des données techniques</b> nécessaires à ta connexion (session sécurisée).</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Pourquoi">
        <LegalList>
          <li>faire fonctionner ton compte, tes annonces et la messagerie ;</li>
          <li>mettre en relation acheteurs et vendeurs ;</li>
          <li>prévenir les fraudes et protéger les membres ;</li>
          <li>améliorer le service.</li>
        </LegalList>
        <p>Tes données ne sont pas vendues.</p>
      </LegalSection>

      <LegalSection title="Qui peut voir quoi">
        <LegalList>
          <li><b>Tout le monde</b> : ton pseudo, ta photo, ta bio, ta ville ou ton quartier, ta note, tes annonces en ligne et les avis reçus.</li>
          <li><b>Les membres connectés</b> : ton numéro WhatsApp, si tu l'as renseigné, uniquement depuis tes annonces en ligne.</li>
          <li><b>Toi et ton interlocuteur</b> : vos messages.</li>
          <li><b>Toi et l'autre partie</b> : les commandes qui vous concernent.</li>
          <li><b>Toi seul</b> : tes favoris et tes adresses enregistrées.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Nos prestataires">
        <p>Pour faire fonctionner Addikt, nous faisons appel à :</p>
        <LegalList>
          <li>Supabase : base de données, authentification et stockage des photos ;</li>
          <li>Vercel : hébergement du site ;</li>
          <li>Google : connexion avec un compte Google si tu la choisis, et chargement de polices d'icônes ;</li>
          <li>un prestataire d'envoi de SMS pour les codes de connexion par téléphone.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Cookies et stockage local">
        <p>
          Addikt utilise uniquement les cookies nécessaires pour garder ta session ouverte. Ton panier est enregistré
          dans ton navigateur, sur ton appareil.
        </p>
      </LegalSection>

      <LegalSection title="Sécurité">
        <p>
          Les accès sont limités par des règles strictes : par exemple, personne d'autre que les participants ne peut
          lire une conversation. Les mots de passe ne sont jamais stockés en clair.
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Tes données sont conservées tant que ton compte est actif. Après la suppression de ton compte, elles sont
          effacées dans un délai raisonnable, sauf celles que la loi impose de garder.
        </p>
      </LegalSection>

      <LegalSection title="Tes droits">
        <p>
          Conformément à la loi sénégalaise n° 2008-12 du 25 janvier 2008 sur la protection des données à caractère
          personnel, tu peux accéder à tes données, les faire corriger ou supprimer, et t'opposer à leur utilisation.
        </p>
        <p>
          Tu peux modifier la plupart de tes informations dans les{' '}
          <Link href="/profile/settings" className="text-primary font-bold underline">paramètres de ton compte</Link>.
          {LEGAL_CONTACT_EMAIL && (
            <>
              {' '}Pour toute autre demande, écris-nous à{' '}
              <a href={`mailto:${LEGAL_CONTACT_EMAIL}`} className="text-primary font-bold underline">{LEGAL_CONTACT_EMAIL}</a>.
            </>
          )}
        </p>
        <p>
          Tu peux aussi adresser une réclamation à la Commission de Protection des Données Personnelles (CDP) du Sénégal.
        </p>
      </LegalSection>

      <LegalSection title="Évolution de cette politique">
        <p>
          Cette politique peut évoluer avec le service ; la date de mise à jour figure en haut de cette page. Voir aussi
          les <Link href="/terms" className="text-primary font-bold underline">conditions d'utilisation</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
