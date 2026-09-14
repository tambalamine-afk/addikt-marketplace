// Seules les photos stockées sur Supabase passent par l'optimiseur d'images de Next
// (redimensionnement, WebP/AVIF) : c'est le seul hôte autorisé dans next.config.mjs.
// Les autres sources (images de démonstration, aperçus locaux blob:) restent telles quelles.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function isOptimizableImage(src) {
  return typeof src === 'string'
    && Boolean(SUPABASE_URL)
    && src.startsWith(`${SUPABASE_URL}/storage/v1/object/public/`);
}
