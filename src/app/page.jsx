import LandingPage from '../views/LandingPage';
import { getMemberAvatars, getRecentListings, getTopBoutiques } from '../lib/listings';

// Page servie depuis le cache et régénérée au plus toutes les minutes
export const revalidate = 60;

export default async function Home() {
  const [recentListings, topBoutiques, memberAvatars] = await Promise.all([
    getRecentListings(10),
    getTopBoutiques(),
    getMemberAvatars(3),
  ]);

  return (
    <LandingPage
      initialRecentListings={recentListings}
      initialTopBoutiques={topBoutiques}
      initialMemberAvatars={memberAvatars}
    />
  );
}
