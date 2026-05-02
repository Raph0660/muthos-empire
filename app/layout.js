import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata = {
  title: 'MUTHOS — L\'Ingénierie de l\'Espresso d\'Exception',
  description: 'Analyses techniques approfondies des machines espresso semi-professionnelles. Verdict ingénierie sans compromis.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#fdfbf7] text-[#1a1a1a] font-sans antialiased">
        <header className="sticky top-0 z-50 bg-[#fdfbf7]/95 backdrop-blur-sm border-b border-stone-200">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <a href="/" className="font-serif text-3xl tracking-tighter uppercase">
              MUTHOS
            </a>
            <div className="flex gap-10 text-[10px] uppercase font-bold tracking-[0.2em]">
              <a href="/espresso-premium" className="hover:opacity-50 transition-opacity">
                Espresso Premium
              </a>
              <a href="/le-verdict" className="hover:opacity-50 transition-opacity">
                Le Verdict
              </a>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="border-t border-stone-200 mt-24 py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="font-serif text-2xl mb-4 tracking-tighter">MUTHOS</p>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-40">L'ingénierie des rituels d'exception</p>
            <p className="mt-12 text-[9px] text-stone-400 max-w-md mx-auto leading-relaxed uppercase tracking-widest">
              Note : Expertise indépendante. Les liens sortants peuvent être affiliés, 
              soutenant ainsi nos recherches en laboratoire sans surcoût pour vous.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
