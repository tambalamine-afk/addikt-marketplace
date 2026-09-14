import FreshDropPage from '../../views/FreshDropPage';
import { getRecentListings } from '../../lib/listings';

export const metadata = {
  title: 'Fresh DROP · Addikt',
  description: 'Découvrez les dernières pépites vintage et les nouvelles arrivées sur Addikt.',
};

// Page servie depuis le cache et régénérée au plus toutes les minutes
export const revalidate = 60;

export default async function Page() {
  const listings = await getRecentListings(30);
  return <FreshDropPage initialListings={listings} />;
}
