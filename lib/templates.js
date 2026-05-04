import React from 'react';

// --- TEMPLATE 1 : GRILLE PRODUITS ---
export const ProductGridTemplate = ({ products, seo }) => (
  <div className="bg-[#fdfbf7] min-h-screen pb-24">
    <section className="max-w-7xl mx-auto px-6 py-24 border-b border-stone-200">
      <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-6">Expertise MUTHOS</p>
      <h1 className="font-serif text-6xl md:text-8xl mb-12 tracking-tighter text-[#1a1a1a] leading-none">
        {seo?.title?.split('|')[0] || "Catalogue"}
      </h1>
      <p className="text-xl text-stone-600 italic max-w-3xl font-light">{seo?.description}</p>
    </section>
    <section className="max-w-7xl mx-auto px-6 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {products?.map(p => (
          <article key={p.id} className="group bg-white border border-stone-100 p-8 hover:shadow-2xl transition-all duration-500">
            <a href={p.source_url} target="_blank" rel="noopener noreferrer">
              <div className="aspect-square mb-8 overflow-hidden">
                <img src={p.image_url} alt={p.model} className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110 duration-700" />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-amber-800">{p.brand}</p>
              <h2 className="font-serif text-2xl uppercase tracking-tighter text-[#1a1a1a]">{p.model}</h2>
              <p className="font-serif text-xl text-[#1a1a1a] mb-4">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(p.price_current)}
              </p>
              <p className="text-sm text-stone-500 italic font-light line-clamp-2 border-t border-stone-50 pt-4">{p.description}</p>
            </a>
          </article>
        ))}
      </div>
    </section>
  </div>
);

// --- TEMPLATE 2 : COMPARATIF (VS) ---
export const ComparisonTemplate = ({ products, seo }) => {
  if (!products || products.length < 2) return <div className="p-20 text-center italic font-serif">Données insuffisantes...</div>;
  const [p1, p2] = products;
  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24 text-[#1a1a1a]">
      <header className="max-w-7xl mx-auto px-6 py-24 text-center border-b border-stone-200">
        <span className="text-[10px] uppercase tracking-[0.4em] text-amber-800 font-bold">Duel Technique</span>
        <h1 className="font-serif text-5xl md:text-7xl my-8 tracking-tighter">{p1.model} <span className="text-stone-300 italic">vs</span> {p2.model}</h1>
        <p className="text-stone-500 italic max-w-2xl mx-auto">{seo?.description}</p>
      </header>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 mt-12 border border-stone-200">
        {[p1, p2].map((p, i) => (
          <div key={i} className="bg-white p-12 flex flex-col items-center">
             <img src={p.image_url} className="h-64 object-contain mb-8 mix-blend-multiply" />
             <p className="text-[10px] uppercase tracking-widest text-amber-800 font-bold mb-2">{p.brand}</p>
             <h2 className="font-serif text-3xl mb-4 uppercase tracking-tighter">{p.model}</h2>
             <p className="text-2xl font-serif mb-8 text-stone-900">{p.price_current}€</p>
             <a href={p.source_url} target="_blank" className="w-full text-center border border-black py-4 uppercase text-[10px] font-bold tracking-widest hover:bg-black hover:text-white transition-all">Vérifier la disponibilité</a>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- TEMPLATE 3 : TOP 10 RANKING ---
export const TopListTemplate = ({ products, seo }) => (
  <div className="bg-[#fdfbf7] min-h-screen pb-24">
    <section className="max-w-4xl mx-auto px-6 py-24 text-center">
      <p className="text-[10px] uppercase tracking-[0.4em] text-amber-800 font-bold mb-6">Classement Officiel 2026</p>
      <h1 className="font-serif text-5xl md:text-7xl mb-8 tracking-tighter leading-tight text-[#1a1a1a]">
        {seo?.title?.split('|')[0]}
      </h1>
      <div className="h-px w-24 bg-amber-800 mx-auto mb-8"></div>
      <p className="text-xl text-stone-500 italic font-light leading-relaxed">{seo?.description}</p>
    </section>
    <section className="max-w-5xl mx-auto px-6 space-y-12">
      {products?.map((p, index) => (
        <article key={p.id} className="relative bg-white border border-stone-200 overflow-hidden flex flex-col md:flex-row items-stretch group hover:border-amber-800 transition-colors duration-500">
          <div className="absolute top-0 left-0 bg-[#1a1a1a] text-white w-12 h-12 flex items-center justify-center font-serif text-xl z-10">{index + 1}</div>
          <div className="md:w-1/3 bg-stone-50 p-12 flex items-center justify-center">
            <img src={p.image_url} alt={p.model} className="max-h-64 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="md:w-2/3 p-12 flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-widest font-bold text-amber-800 mb-2">{p.brand}</p>
            <h2 className="font-serif text-4xl tracking-tighter text-[#1a1a1a] uppercase mb-4">{p.model}</h2>
            <p className="text-stone-600 font-light italic mb-8">{p.description}</p>
            <div className="flex items-center justify-between pt-8 border-t border-stone-100">
              <p className="font-serif text-3xl text-[#1a1a1a]">{Math.round(p.price_current)}€</p>
              <a href={p.source_url} target="_blank" className="bg-[#1a1a1a] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-900 transition-colors">Vérifier le stock</a>
            </div>
          </div>
        </article>
      ))}
    </section>
  </div>
);

// --- TEMPLATE 4 : ARTICLE / GUIDE ---
export const ArticleTemplate = ({ article }) => (
  <article className="bg-[#fdfbf7] min-h-screen pb-24">
    <header className="max-w-4xl mx-auto px-6 pt-32 pb-16 text-center">
      <p className="text-[10px] uppercase tracking-[0.5em] text-amber-800 font-bold mb-8 italic">Le Verdict Muthos</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tighter text-[#1a1a1a] mb-12">{article?.theme}</h1>
      <div className="w-20 h-px bg-stone-300 mx-auto"></div>
    </header>
    <section className="max-w-2xl mx-auto px-6">
      <div className="prose prose-stone prose-lg font-light leading-relaxed text-stone-800 prose-headings:font-serif prose-h2:text-3xl prose-h2:mt-16 prose-h2:border-b prose-h2:pb-4" dangerouslySetInnerHTML={{ __html: article?.content }} />
    </section>
  </article>
);

// --- TEMPLATE 5 : FAQ ---
export const FAQTemplate = ({ faqs, seo }) => (
  <div className="bg-[#fdfbf7] min-h-screen py-32 text-[#1a1a1a]">
    <div className="max-w-3xl mx-auto px-6">
      <span className="text-[10px] uppercase tracking-[0.4em] text-amber-800 font-bold mb-6 block">Questions Techniques</span>
      <h1 className="font-serif text-5xl mb-16 tracking-tighter">{seo?.title}</h1>
      <div className="space-y-12">
        {faqs?.map((f, i) => (
          <div key={i} className="border-b border-stone-200 pb-8">
            <h3 className="font-serif text-2xl mb-4">{f.question}</h3>
            <p className="text-stone-600 leading-relaxed italic font-light">{f.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
