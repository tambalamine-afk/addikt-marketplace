import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Providers from '../components/Providers';

export const metadata = {
  title: 'Addikt Marketplace',
  description: 'Achetez et vendez facilement',
};

export default function RootLayout({ children }) {
  // We cannot easily know the exact path here for conditional Header/Footer display
  // in a standard Server Component layout without using client side path checks.
  // For now, we will render children, and we can make a Client Component Wrapper 
  // if we need conditional rendering based on pathname (like hideCategories on publish/profile).
  return (
    <html lang="fr">
      <body>
        <Providers>
          <div className="app min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
