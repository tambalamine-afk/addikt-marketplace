import { Suspense } from 'react';
import VerifySMS from '../../views/Auth/VerifySMS';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <VerifySMS />
    </Suspense>
  );
}
