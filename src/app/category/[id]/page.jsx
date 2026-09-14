import Category from '../../../views/Category';
import { dbCategorySlug } from '../../../lib/categories';
import { getCategoryListings } from '../../../lib/listings';
import { SITE_NAME } from '../../../lib/site';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const slug = dbCategorySlug(id);
  const { category } = await getCategoryListings(slug);
  const name = category?.name || 'Nouveautés';

  return {
    title: `${name} · ${SITE_NAME}`,
    description: `${name} de seconde main et neufs entre particuliers au Sénégal, sur ${SITE_NAME}.`,
  };
}

export default async function Page({ params, searchParams }) {
  const { id } = await params;
  const { search } = await searchParams;

  // Recherche dans la catégorie : filtrée dans le navigateur, comme avant
  const { listings } = search ? { listings: null } : await getCategoryListings(dbCategorySlug(id));

  return <Category key={id} initialProducts={listings} />;
}
