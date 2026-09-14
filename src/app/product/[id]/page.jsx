import ProductPage from '../../../views/ProductPage';
import { getPublicListing, sortedImageUrls } from '../../../lib/listings';
import { formatFcfa } from '../../../lib/orders';
import { SITE_NAME, SITE_URL } from '../../../lib/site';

// Titre, prix et photo lus côté serveur : c'est ce qu'affichent Google et les
// aperçus de lien (WhatsApp, Facebook…), qui n'exécutent pas le JavaScript de la page.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const listing = await getPublicListing(id);

  if (!listing) {
    return { title: `Annonce introuvable · ${SITE_NAME}`, robots: { index: false } };
  }

  const price = formatFcfa(listing.price);
  const details = [listing.size && `Taille ${listing.size}`, listing.brand, listing.condition].filter(Boolean).join(' · ');
  const description = [price, details, listing.description?.replace(/\s+/g, ' ')]
    .filter(Boolean)
    .join(' — ')
    .slice(0, 200);
  const [image] = sortedImageUrls(listing);
  const title = `${listing.title} · ${price}`;
  const path = `/product/${listing.id}`;

  return {
    title: `${title} · ${SITE_NAME}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'fr_SN',
      url: path,
      title,
      description,
      images: image ? [{ url: image, alt: listing.title }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

const AVAILABILITY = {
  active: 'https://schema.org/InStock',
  reserved: 'https://schema.org/OutOfStock',
  sold: 'https://schema.org/SoldOut',
};

export default async function Page({ params }) {
  const { id } = await params;
  const listing = await getPublicListing(id);

  // Données produit structurées pour Google (prix, disponibilité, état)
  const productJsonLd = listing && {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: listing.title,
    description: listing.description || undefined,
    image: sortedImageUrls(listing),
    brand: listing.brand ? { '@type': 'Brand', name: listing.brand } : undefined,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${listing.id}`,
      price: listing.price,
      priceCurrency: 'XOF',
      availability: AVAILABILITY[listing.status],
      itemCondition: listing.condition === 'Neuf avec étiquette'
        ? 'https://schema.org/NewCondition'
        : 'https://schema.org/UsedCondition',
    },
  };

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, '\\u003c') }}
        />
      )}
      <ProductPage key={id} initialListing={listing} />
    </>
  );
}
