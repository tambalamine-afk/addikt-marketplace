// Vocabulaire et formats partagés par le checkout et les pages commandes.

export const ORDER_STATUS = {
  pending: { label: 'Réservée', className: 'bg-[#FFD700] text-black' },
  paid: { label: 'Payée', className: 'bg-[#FFD700] text-black' },
  shipped: { label: 'Remise', className: 'bg-[#0099FF] text-white' },
  delivered: { label: 'Terminée', className: 'bg-[#dcfce7] text-[#166534]' },
  cancelled: { label: 'Annulée', className: 'bg-surface-container-high text-on-surface-variant' },
};

// Réservée → Remise → Terminée ; « payée » compte comme réservée tant que le paiement en ligne n'existe pas
export const ORDER_STEPS = [
  { key: 'pending', label: 'Réservée' },
  { key: 'shipped', label: 'Remise' },
  { key: 'delivered', label: 'Terminée' },
];

export function orderStepIndex(status) {
  return { pending: 0, paid: 0, shipped: 1, delivered: 2 }[status] ?? 0;
}

export function formatFcfa(amount) {
  return `${(amount ?? 0).toLocaleString('fr-FR')} FCFA`;
}

export function formatOrderDate(value) {
  return new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function listingCover(listing) {
  const images = [...(listing?.listing_images || [])].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  return images[0]?.url || 'https://placehold.co/160x200/eaeaea/a0a0a0?text=Addikt';
}

// Les numéros sénégalais saisis sans indicatif (9 chiffres) reçoivent le +221
export function whatsappLink(phone, text) {
  let digits = (phone || '').replace(/\D/g, '');
  if (digits.length === 9) digits = `221${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

// Les erreurs métier des fonctions SQL (place_order, update_order_status) sont
// rédigées pour l'utilisateur ; les autres erreurs restent techniques.
export function userFacingError(error, fallback) {
  return error?.code === 'P0001' && error.message ? error.message : fallback;
}
