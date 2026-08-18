import { Suspense } from 'react';
import SearchPage from '../../views/SearchPage';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-20 text-center flex justify-center"><div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div></div>}>
      <SearchPage />
    </Suspense>
  );
}
