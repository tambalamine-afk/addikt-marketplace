import './globals.css';
import Providers from '../components/Providers';
import LayoutWrapper from '../components/LayoutWrapper';

export const metadata = {
  title: 'Addikt Marketplace',
  description: 'Achetez et vendez facilement',
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
