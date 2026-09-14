import SellerProfile from '../../../views/Profile/SellerProfile';
import { getPublicSeller } from '../../../lib/listings';
import { SITE_NAME } from '../../../lib/site';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getPublicSeller(id);

  if (!data) {
    return { title: `Profil introuvable · ${SITE_NAME}`, robots: { index: false } };
  }

  const { seller, listings } = data;
  const name = seller.full_name || seller.username;
  return {
    title: `@${seller.username} · ${SITE_NAME}`,
    description: `${name} vend ${listings.length} article${listings.length > 1 ? 's' : ''} sur ${SITE_NAME}${seller.location ? `, ${seller.location}` : ''}.`,
    openGraph: seller.avatar_url ? { images: [{ url: seller.avatar_url, alt: name }] } : undefined,
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const data = await getPublicSeller(id);

  return (
    <SellerProfile
      key={id}
      sellerId={id}
      initialSeller={data?.seller ?? null}
      initialListings={data?.listings ?? []}
      initialFollowerCount={data?.followerCount ?? 0}
    />
  );
}
