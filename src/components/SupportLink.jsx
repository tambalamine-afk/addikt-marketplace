import { LEGAL_CONTACT_EMAIL } from '../lib/legal';

// Lien « aide » vers l'adresse de contact d'Addikt ; masqué si aucune adresse n'est configurée
export default function SupportLink({ children, className, style, onClick }) {
  if (!LEGAL_CONTACT_EMAIL) return null;

  return (
    <a
      href={`mailto:${LEGAL_CONTACT_EMAIL}?subject=${encodeURIComponent('Aide Addikt')}`}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
