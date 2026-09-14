import { cache } from 'react';
import { createPublicClient } from './supabase/public';
import { toSearchTerm } from './search';

// Données publiques lues côté serveur : la page arrive déjà remplie dans le navigateur,
// sans attendre le chargement du JavaScript puis des requêtes (utile sur connexion lente).

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Colonnes publiques d'un profil (jamais de donnée privée)
const PUBLIC_PROFILE_COLUMNS = 'id, username, full_name, avatar_url, cover_url, bio, location, rating_avg, rating_count, is_top_boutique, created_at';

// Annonce consultable publiquement (en ligne, réservée ou vendue).
// cache() : une seule requête par rendu, même si generateMetadata et la page la demandent.
export const getPublicListing = cache(async (id) => {
  const supabase = createPublicClient();
  if (!supabase || !UUID_PATTERN.test(id || '')) return null;

  const { data } = await supabase
    .from('listings')
    .select(`*, categories(name, slug), listing_images(url, position), seller:profiles!seller_id(${PUBLIC_PROFILE_COLUMNS})`)
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

// Dernières annonces en ligne (accueil, Fresh DROP)
export async function getRecentListings(limit) {
  const supabase = createPublicClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from('listings')
    .select('id, title, price, size, listing_images (url)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit);

  return data || [];
}

// Boutiques mises en avant sur l'accueil
export async function getTopBoutiques() {
  const supabase = createPublicClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, listings!listings_seller_id_fkey (listing_images (url))')
    .eq('is_top_boutique', true)
    .limit(6);

  return data || [];
}

// Annonces d'une catégorie (slug de base) ; toutes les annonces en ligne si slug est null
export const getCategoryListings = cache(async (slug) => {
  const supabase = createPublicClient();
  if (!supabase) return { category: null, listings: [] };

  let category = null;
  let query = supabase
    .from('listings')
    .select('id, title, price, size, brand, created_at, listing_images (url), categories (name)')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (slug) {
    const { data } = await supabase.from('categories').select('id, name, slug').eq('slug', slug).maybeSingle();
    if (!data) return { category: null, listings: [] };
    category = data;
    query = query.eq('category_id', data.id);
  }

  const { data: listings } = await query;
  return { category, listings: listings || [] };
});

// Résultats d'une recherche, mêmes règles que la recherche dans le navigateur
export async function searchPublicListings(rawQuery) {
  const supabase = createPublicClient();
  const searchTerm = toSearchTerm(rawQuery);
  if (!supabase || !searchTerm) return [];

  const { data } = await supabase
    .from('listings')
    // Lien vendeur précisé : annonces et profils sont aussi reliés par les favoris (PGRST201)
    .select('*, listing_images(url, position), seller:profiles!seller_id(username, avatar_url)')
    .eq('status', 'active')
    .or(`title.ilike."%${searchTerm}%",brand.ilike."%${searchTerm}%"`)
    .order('created_at', { ascending: false })
    .limit(60);

  return data || [];
}

// Profil vendeur public, ses annonces en ligne et son nombre d'abonnés
export const getPublicSeller = cache(async (id) => {
  const supabase = createPublicClient();
  if (!supabase || !UUID_PATTERN.test(id || '')) return null;

  const [{ data: seller }, { data: listings }, { count: followerCount }] = await Promise.all([
    supabase.from('profiles').select(PUBLIC_PROFILE_COLUMNS).eq('id', id).maybeSingle(),
    supabase
      .from('listings')
      .select('id, title, price, size, listing_images (url, position)')
      .eq('seller_id', id)
      .eq('status', 'active')
      .order('created_at', { ascending: false }),
    supabase.from('followers').select('*', { count: 'exact', head: true }).eq('following_id', id),
  ]);

  if (!seller) return null;
  return { seller, listings: listings || [], followerCount: followerCount || 0 };
});
