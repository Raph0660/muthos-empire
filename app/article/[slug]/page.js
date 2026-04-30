import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Clock, ArrowLeft } from 'lucide-react';

async function getArticles() {
  const SHEET_ID = '1AY7skQKYPST-CczQFQTtu99HUuIjxFHypETfiqDIs1Q';
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
  const response = await fetch(url, { next: { revalidate: 3600 } });
  const text = await response.text();
  const rows = text.split('\n').slice(1); 
  return rows.map(row => {
    const columns = row.split(',"').map(col => col.replace(/"/g, ''));
    const theme = columns[0] || "";
    const content = columns[1] || "";
    return {
      theme,
      text: content,
      readTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
      slug: theme.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    };
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = await params; 
  const articles = await getArticles();
  const article = articles.find(a => a.slug === slug);

  // Sécurité : Si l'article n'existe pas, on arrête tout ici
  if (!article) return <div className="p-20 text-center font-serif text-stone-400">Édition introuvable...</div>;

  // Génération du JSON-LD pour Google
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": article.theme,
    "author": { "@type": "Organization", "name": "La Rédaction de Tif" },
    "datePublished": new Date().toISOString(),
    "description": `Découvrez notre recette exclusive de ${article.theme} pour un succès garanti en cuisine.`,
    "prepTime": `PT${article.readTime}M`,
    "recipeCategory": "Gastronomie",
    "publisher": {
      "@type": "Organization",
      "name": "Tif & ses Gourmandises",
      "logo": { "@type": "ImageObject", "url": "https://www.tifetsesgourmandises.fr/logo.png" }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#fdfbf7] text-[#1c1917] pb-24 border-t-[12px] border-[#1c1917]/5">
        <nav className="py-6 px-6 border-b border-stone-200 sticky top-0 bg-[#fdfbf7]/90 backdrop-blur-sm z-50">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 hover:text-stone-900 transition-colors">
              <ArrowLeft className="w-3 h-3" /> Retour aux éditions
            </Link>
            <span className="font-serif tracking-widest text-sm opacity-80 underline underline-offset-4 decoration-stone-200">TIF & GOURMANDISES</span>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-6 mt-16 md:mt-24">
          <header className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a48437] mb-8">
              <span>Gastronomie</span>
              <span className="w-1 h-1 rounded-full bg-stone-300"></span>
              <span className="text-stone-500 font-normal flex items-center gap-1">
                <Clock className="w-3 h-3"/> {article.readTime} min de lecture
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl mb-12 leading-tight uppercase tracking-tight text-stone-900">
              {article.theme}
            </h1>
            <div className="w-24 h-px bg-stone-300 mx-auto"></div>
          </header>

          <div className="font-light leading-relaxed text-[18px] md:text-[20px] text-stone-800 space-y-8 
            [&>p:first-of-type::first-letter]:float-left [&>p:first-of-type::first-letter]:text-7xl [&>p:first-of-type::first-letter]:pr-3 [&>p:first-of-type::first-letter]:font-serif [&>p:first-of-type::first-letter]:text-stone-700
            [&>blockquote]:text-center [&>blockquote]:italic [&>blockquote]:text-2xl [&>blockquote]:py-10 [&>blockquote]:border-y [&>blockquote]:border-stone-200 [&>blockquote]:my-12 [&>blockquote]:text-stone-600
            [&>h2]:text-3xl [&>h2]:font-serif [&>h2]:mt-16 [&>h2]:text-stone-900
            [&>ul]:list-disc [&>ul]:pl-6"
          >
            <ReactMarkdown>{article.text}</ReactMarkdown>
          </div>

          <footer className="mt-24 pt-12 border-t border-stone-200 text-center">
            <p className="font-serif italic text-stone-400 text-lg mb-8">L'élégance du goût, chaque jour.</p>
            <Link href="/" className="inline-block px-8 py-3 border border-stone-900 text-[10px] uppercase font-bold tracking-widest hover:bg-stone-900 hover:text-white transition-all">
              Toutes les éditions
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}
