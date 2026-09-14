import { SITE_URL } from '../lib/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Pages privées : inutiles dans les résultats de recherche
      disallow: ['/messages', '/publish', '/profile', '/favorites', '/edit', '/checkout', '/orders', '/reset-password', '/onboarding'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
