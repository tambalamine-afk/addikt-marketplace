import { createPublicClient } from '../lib/supabase/public';
import { SITE_URL } from '../lib/site';

// Régénéré au plus toutes les heures : les nouvelles annonces y apparaissent sans redéploiement.
export const revalidate = 3600;

const STATIC_PAGES = [
  { path: '', changeFrequency: 'daily', priority: 1 },
  { path: '/fresh-drop', changeFrequency: 'daily', priority: 0.7 },
  { path: '/top-seller', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.1 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.1 },
];

export default async function sitemap() {
  const entries = STATIC_PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));

  const supabase = createPublicClient();
  if (!supabase) return entries;

  const [{ data: categories }, { data: listings }] = await Promise.all([
    supabase.from('categories').select('slug'),
    supabase
      .from('listings')
      .select('id, updated_at')
      .eq('status', 'active')
      .order('updated_at', { ascending: false })
      .limit(5000),
  ]);

  for (const category of categories || []) {
    entries.push({ url: `${SITE_URL}/category/${category.slug}`, changeFrequency: 'daily', priority: 0.7 });
  }
  for (const listing of listings || []) {
    entries.push({
      url: `${SITE_URL}/product/${listing.id}`,
      lastModified: listing.updated_at ? new Date(listing.updated_at) : undefined,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  return entries;
}
