import SearchPage from '../../views/SearchPage';
import { searchPublicListings } from '../../lib/listings';

export default async function Page({ searchParams }) {
  const { q } = await searchParams;
  const query = typeof q === 'string' ? q : '';
  const results = query ? await searchPublicListings(query) : [];

  return <SearchPage key={query} initialQuery={query} initialResults={results} />;
}
