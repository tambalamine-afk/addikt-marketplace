"use client";
import { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppContext } from './Providers';

// Pages accessibles avant d'avoir terminé l'accueil
const ALLOWED_PATHS = ['/onboarding', '/login', '/register', '/phone-login', '/verify-sms', '/forgot-password', '/reset-password', '/terms', '/privacy'];

// Un membre connecté qui n'a pas encore choisi son pseudo est envoyé sur /onboarding,
// puis ramené sur la page qu'il voulait ouvrir.
export default function OnboardingRedirect() {
  const { user, profile } = useContext(AppContext);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // null = accueil à faire ; undefined = colonne absente (migration pas encore appliquée)
    if (!user || !profile || profile.onboarded_at !== null) return;
    if (ALLOWED_PATHS.includes(pathname)) return;

    const next = `${pathname}${window.location.search}`;
    router.replace(`/onboarding?next=${encodeURIComponent(next)}`);
  }, [user, profile, pathname, router]);

  return null;
}
