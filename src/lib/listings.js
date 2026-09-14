import { cache } from 'react';
import { createPublicClient } from './supabase/public';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Annonce consultable publiquement (en ligne, réservée ou vendue), lue côté serveur
// pour les métadonnées et le référencement. cache() : une seule requête par rendu,
// même si generateMetadata et la page la demandent toutes les deux.
export const getPublicListing = cache(async (id) => {
  const supabase = createPublicClient();
  if (!supabase || !UUID_PATTERN.test(id || '')) return null;

  const { data } = await supabase
    .from('listings')
    .select('id, title, description, price, status, brand, size, condition, listing_images(url, position), seller:profiles!seller_id(username)')
    .eq('id', id)
    .in('status', ['active', 'reserved', 'sold'])
    .maybeSingle();

  return data;
});

export function sortedImageUrls(listing) {
  return [...(listing?.listing_images || [])]
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((image) => image.url);
}
