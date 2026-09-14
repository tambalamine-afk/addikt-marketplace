import { createClient } from '@supabase/supabase-js';

// Client sans session pour les données publiques lues côté serveur (métadonnées, sitemap).
// Il ne lit pas les cookies : les réponses peuvent être mises en cache.
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
