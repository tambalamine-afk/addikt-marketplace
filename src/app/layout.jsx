import './globals.css';
import Providers from '../components/Providers';
import LayoutWrapper from '../components/LayoutWrapper';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '../lib/site';

export const metadata = {
  // Base des liens absolus (images d'aperçu, adresse canonique)
  metadataBase: new URL(SITE_URL),
  title: 'Addikt · Mode de seconde main au Sénégal',
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'fr_SN',
    title: 'Addikt · Mode de seconde main au Sénégal',
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
