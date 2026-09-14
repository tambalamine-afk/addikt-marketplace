import LandingPage from '../views/LandingPage';
import { getRecentListings, getTopBoutiques } from '../lib/listings';

// Page servie depuis le cache et régénérée au plus toutes les minutes
export const revalidate = 60;

export default async function Home() {
  const [recentListings, topBoutiques] = await Promise.all([getRecentListings(10), getTopBoutiques()]);
  return <LandingPage initialRecentListings={recentListings} initialTopBoutiques={topBoutiques} />;
}
