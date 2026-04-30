import './globals.css'

export const metadata = {
  title: 'Muthos | L\'Indice de la Haute Cuisine',
  description: 'Analyses techniques et sourcing indépendant des machines de cuisine d\'exception.',
  alternates: {
    canonical: 'https://www.muthos-empire.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-[#fdfbf7] text-stone-900 antialiased selection:bg-stone-200">
        {children}
      </body>
    </html>
  )
}
