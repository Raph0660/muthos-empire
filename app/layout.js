import './globals.css'

export const metadata = {
  title: 'Tif & ses Recettes en Cuisine | Le Magazine Culinaire',
  description: 'Découvrez les meilleures recettes et astuces de Tif pour réussir tous vos plats en cuisine. Passion, gourmandise et partage.',
  alternates: {
    canonical: 'https://www.tifetsesgourmandises.fr',
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
