import Link from 'next/link';
import LegalPage, { LegalList, LegalSection } from '../../components/LegalPage';
import { LEGAL_CONTACT_EMAIL } from '../../lib/legal';

export const metadata = {
  title: "Conditions d'utilisation · Addikt",
  description: "Les règles d'utilisation de la marketplace Addikt.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Conditions d'utilisation" updatedAt="13 septembre 2026">
      <LegalSection title="Ce qu'est Addikt">
        <p>
          Addikt est une plateforme qui met en relation des particuliers pour acheter et vendre des articles de mode,
          sneakers, beauté et accessoires, neufs ou de seconde main. Addikt n'est ni le vendeur ni l'acheteur des articles :
          la vente se conclut directement entre les membres.
        </p>
        <p>En créant un compte ou en utilisant le site, tu acceptes les présentes conditions.</p>
      </LegalSection>

      <LegalSection title="Ton compte">
        <LegalList>
          <li>Tu fournis des informations exactes et tu les tiens à jour.</li>
          <li>Tu gardes ton mot de passe et tes codes de connexion secrets : tu es responsable de ce qui est fait depuis ton compte.</li>
          <li>Un compte correspond à une seule personne. Les faux profils et l'usurpation d'identité sont interdits.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Publier une annonce">
        <LegalList>
          <li>Tu ne vends que des articles que tu possèdes et que tu peux remettre à l'acheteur.</li>
          <li>Les photos montrent l'article réel, la description et l'état indiqué sont honnêtes, le prix est affiché en FCFA.</li>
          <li>
            Sont interdits : les contrefaçons, les objets volés, les produits dangereux ou illégaux, les cosmétiques
            périmés, ainsi que tout contenu offensant, discriminatoire ou trompeur.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Acheter et vendre entre membres">
        <p>
          Le prix, la remise de l'article et le paiement se règlent entre l'acheteur et le vendeur. Addikt ne perçoit
          pas de paiement pour le moment. Pour une remise en main propre :
        </p>
        <LegalList>
          <li>donne rendez-vous dans un lieu public et fréquenté ;</li>
          <li>vérifie l'article avant de payer ;</li>
          <li>ne paie jamais d'avance via un lien ou un numéro envoyé par un inconnu.</li>
        </LegalList>
        <p>
          Quand tu réserves un article, il est retiré de la vente le temps de la remise. L'acheteur et le vendeur peuvent
          annuler tant que l'article n'a pas été remis. Une fois l'article en main, l'acheteur confirme la réception, ce
          qui termine la commande et permet à chacun de laisser un avis.
        </p>
      </LegalSection>

      <LegalSection title="Messagerie et avis">
        <p>
          La messagerie sert à échanger à propos d'un article. Le spam, le harcèlement et les tentatives d'arnaque sont
          interdits. Les avis sont réservés aux membres ayant réellement conclu une transaction et doivent refléter
          honnêtement leur expérience.
        </p>
      </LegalSection>

      <LegalSection title="Modération">
        <p>
          Addikt peut retirer une annonce, un message ou un avis, et suspendre ou fermer un compte qui ne respecte pas
          ces conditions ou qui met en danger d'autres membres.
        </p>
        <p>
          Pour limiter le spam et les abus, le nombre d'annonces, de nouvelles conversations, de messages, de
          réservations et de signalements est plafonné sur une période donnée, plus strictement pendant les 30 premiers
          jours d'un compte. Un message t'indique quand une limite est atteinte.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          Addikt met la plateforme à disposition et fait son possible pour qu'elle fonctionne correctement et en
          sécurité. Addikt ne garantit pas la qualité, la conformité ou l'authenticité des articles vendus par les
          membres, et n'est pas partie aux ventes conclues entre eux.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          La façon dont tes données sont utilisées et protégées est décrite dans la{' '}
          <Link href="/privacy" className="text-primary font-bold underline">politique de confidentialité</Link>.
        </p>
      </LegalSection>

      <LegalSection title="Évolution des conditions">
        <p>
          Ces conditions peuvent évoluer avec le service. La date de mise à jour figure en haut de cette page. En
          continuant à utiliser Addikt après une modification, tu acceptes la nouvelle version.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>Les présentes conditions sont soumises au droit sénégalais.</p>
      </LegalSection>

      {LEGAL_CONTACT_EMAIL && (
        <LegalSection title="Contact">
          <p>
            Pour toute question sur ces conditions :{' '}
            <a href={`mailto:${LEGAL_CONTACT_EMAIL}`} className="text-primary font-bold underline">{LEGAL_CONTACT_EMAIL}</a>.
          </p>
        </LegalSection>
      )}
    </LegalPage>
  );
}
