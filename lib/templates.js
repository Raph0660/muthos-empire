import React from 'react';

// --- TEMPLATE 1 : GRILLE PRODUITS (Marques, Catégories) ---
export const ProductGridTemplate = ({ products, seo }) => (
  <div className="bg-[#fdfbf7] min-h-screen pb-24">
    <section className="max-w-7xl mx-auto px-6 py-24 border-b border-stone-200">
      <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-6">Verticale MUTHOS</p>
      <h1 className="font-serif text-6xl md:text-8xl mb-12 tracking-tighter text-[#1a1a1a]">{seo.title?.split('|')[0]}</h1>
      <p className="text-xl text-stone-600 italic max-w-3xl">{seo.description}</p>
    </section>
    <section className="max-w-7xl mx-auto px-6 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {products?.map(p => (
          <article key={p.id} className="group">
            <a href={p.source_url} target="_blank">
              <div className="aspect-square bg-white border border-stone-100 mb-8 flex items-center justify-center p-12 overflow-hidden transition-all group-hover:shadow-2xl">
                <img src={p.image_url} alt={p.model} className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110" />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-amber-800">{p.brand}</p>
              <h2 className="font-serif text-2xl uppercase tracking-tighter">{p.model}</h2>
              <p className="font-serif text-xl">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(p.price_current)}</p>
            </a>
          </article>
        ))}
      </div>
    </section>
  </div>
);

// --- TEMPLATE 2 : COMPARATIF (VS) ---
export const ComparisonTemplate = ({ products, seo }) => {
  if (!products || products.length < 2) return <div className="p-20 text-center italic">Données insuffisantes...</div>;
  const [p1, p2] = products;
  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24 text-[#1a1a1a]">
      <header className="max-w-7xl mx-auto px-6 py-24 text-center border-b border-stone-200">
        <h1 className="font-serif text-5xl md:text-7xl mb-8 tracking-tighter">{p1.model} vs {p2.model}</h1>
        <p className="text-stone-500 italic max-w-2xl mx-auto">{seo.description}</p>
      </header>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 mt-12">
        {[p1, p2].map((p, i) => (
          <div key={i} className="bg-white p-12 flex flex-col items-center">
             <img src={p.image_url} className="h-64 object-contain mb-8 mix-blend-multiply" />
             <h2 className="font-serif text-3xl mb-4 uppercase">{p.model}</h2>
             <p className="text-2xl font-serif mb-8">{p.price_current}€</p>
             <a href={p.source_url} className="w-full text-center border border-black py-4 uppercase text-[10px] font-bold tracking-widest hover:bg-black hover:text-white">Acheter</a>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- TEMPLATE 3 : ARTICLE / GUIDE (Le contenu de Claude va ici) ---
export const ArticleTemplate = ({ article }) => (
  <article className="bg-[#fdfbf7] min-h-screen pb-24">
    <header className="max-w-4xl mx-auto px-6 pt-32 pb-16">
      <p className="text-[10px] uppercase tracking-[0.5em] text-amber-800 font-bold mb-8 italic text-center">Expertise MUTHOS</p>
      <h1 className="font-serif text-5xl md:text-8xl leading-none tracking-tighter text-[#1a1a1a] text-center mb-16">{article.theme}</h1>
    </header>
    <section className="max-w-2xl mx-auto px-6">
      <div 
        className="prose prose-stone prose-lg first-letter:text-7xl first-letter:font-serif first-letter:float-left first-letter:mr-3 prose-h2:font-serif prose-h2:text-4xl prose-h2:mt-16 prose-h2:border-b prose-h2:pb-4"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
    </section>
  </article>
);

// --- TEMPLATE 4 : FAQ (Pour les Rich Snippets) ---
export const FAQTemplate = ({ faqs, seo }) => (
  <div className="bg-[#fdfbf7] min-h-screen py-32">
    <div className="max-w-3xl mx-auto px-6">
      <h1 className="font-serif text-5xl mb-16 tracking-tighter">{seo.title}</h1>
      <div className="space-y-12">
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-stone-200 pb-8">
            <h3 className="font-serif text-2xl mb-4 text-[#1a1a1a]">{f.question}</h3>
            <p className="text-stone-600 leading-relaxed italic">{f.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
