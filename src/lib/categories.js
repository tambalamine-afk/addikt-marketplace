// Catégories présentes en base (slug), telles qu'on les reçoit dans l'adresse /category/[id]
const DB_CATEGORY_SLUGS = ['femmes', 'hommes', 'enfants', 'sneakers', 'accessoires', 'beaute', 'marques', 'sports'];

// Slug de base pour un paramètre d'adresse : « Beauté », « beaute » et « beauty » → « beaute ».
// null pour « nouveautes » et les adresses inconnues : toutes les annonces en ligne.
export function dbCategorySlug(param) {
  let value = String(param || '');
  try {
    value = decodeURIComponent(value);
  } catch {
    // Adresse mal encodée : on garde la valeur brute
  }
  const slug = value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  if (slug === 'beauty') return 'beaute';
  return DB_CATEGORY_SLUGS.includes(slug) ? slug : null;
}
