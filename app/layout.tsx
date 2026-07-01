import type { Metadata } from 'next';
import { Orbitron, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'KeshCore — Premium Gaming & Tech Store UK',
    template: '%s | KeshCore',
  },
  description:
    'Premium gaming peripherals, PC components, SSDs, and accessories. Next-day delivery across the UK. Official warranties. Shop the future at KeshCore.',
  keywords: [
    'gaming peripherals UK',
    'PC components UK',
    'SSD UK',
    'gaming keyboard',
    'gaming mouse',
    'RGB gaming',
    'tech store UK',
  ],
  metadataBase: new URL('https://www.keshcore.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.keshcore.com',
    siteName: 'KeshCore',
    title: 'KeshCore — Premium Gaming & Tech Store UK',
    description: 'Premium gaming peripherals, PC components, SSDs, and accessories. Next-day UK delivery.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KeshCore — Premium Gaming & Tech Store UK',
    description: 'Premium gaming peripherals, PC components, SSDs, and accessories.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-cyber-black text-cyber-text font-space antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
