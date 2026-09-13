import { redirect } from 'next/navigation';

// Ancienne adresse du profil : renvoie vers la page actuelle
export default function ProfilePage() {
  redirect('/profile/me');
}
