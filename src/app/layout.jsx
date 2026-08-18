import './globals.css';
import Providers from '../components/Providers';
import LayoutWrapper from '../components/LayoutWrapper';

export const metadata = {
  title: 'Addikt Marketplace',
  description: 'Achetez et vendez facilement',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
