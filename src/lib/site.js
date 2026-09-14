// Adresse publique du site, utilisée pour les liens absolus (métadonnées, sitemap, robots).
// NEXT_PUBLIC_SITE_URL permet d'imposer un domaine personnalisé ; sinon Vercel fournit
// l'adresse de production, et en local on reste sur localhost.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  || 'http://localhost:3000'
).replace(/\/$/, '');

export const SITE_NAME = 'Addikt';

export const SITE_DESCRIPTION = 'Achète et vends mode, sneakers, beauté et accessoires entre particuliers au Sénégal.';
