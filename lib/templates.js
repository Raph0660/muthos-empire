import React from 'react';

// --- TEMPLATE 1 : LA GRILLE DE PRODUITS ---
export const ProductGridTemplate = ({ products, seo }) => (
  <div className="bg-[#fdfbf7] min-h-screen pb-24">
    <section className="max-w-7xl mx-auto px-6 py-24 border-b border-stone-200">
      <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-6">Expertise MUTHOS</p>
      <h1 className="font-serif text-6xl md:text-8xl mb-12 tracking-tighter leading-none text-[#1a1a1a]">
        {seo.title.split('|')[0]}
      </h1>
      <p className="text-xl text-stone-600 leading-relaxed font-light italic max-w-3xl">{seo.description}</p>
    </section>
    <section className="max-w-7xl mx-auto px-6 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {products?.map((product) => (
          <article key={product.id} className="group">
            <a href={product.source_url} target="_blank" rel="noopener noreferrer">
              <div className="aspect-square bg-white border border-stone-100 mb-8 flex items-center justify-center p-12 overflow-hidden relative transition-all duration-700 group-hover:shadow-2xl">
                <img src={product.image_url} alt={product.model} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-amber-800">{product.brand}</p>
                <h2 className="font-serif text-2xl uppercase tracking-tighter text-[#1a1a1a]">{product.model}</h2>
                <p className="font-serif text-xl text-[#1a1a1a]">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(product.price_current)}
                </p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  </div>
);

// --- TEMPLATE 2 : LE COMPARATIF (VS) ---
export const ComparisonTemplate = ({ products, seo }) => {
  if (!products || products.length < 2) return <div className="p-20 text-center font-serif italic">Données de comparaison insuffisantes...</div>;
  
  const [p1, p2] = products;

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-24 text-[#1a1a1a]">
      <header className="max-w-7xl mx-auto px-6 py-24 text-center border-b border-stone-200">
        <span className="text-[10px] uppercase tracking-[0.4em] text-amber-800 font-bold">Duel Technique</span>
        <h1 className="font-serif text-5xl md:text-7xl my-8 tracking-tighter">
          {p1.model} <span className="text-stone-300 italic">vs</span> {p2.model}
        </h1>
        <p className="text-stone-500 font-light italic max-w-2xl mx-auto">{seo.description}</p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200">
          {[p1, p2].map((p, idx) => (
            <div key={idx} className="bg-white p-12 flex flex-col items-center">
              <div className="h-64 w-full mb-12">
                <img src={p.image_url} alt={p.model} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-amber-800 font-bold mb-2">{p.brand}</p>
              <h2 className="font-serif text-3xl mb-6 uppercase tracking-tighter text-center">{p.model}</h2>
              <p className="text-stone-500 text-sm italic font-light mb-8 text-center line-clamp-3">{p.description}</p>
              <div className="text-2xl font-serif mb-8">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(p.price_current)}
              </div>
              <a href={p.source_url} target="_blank" className="w-full text-center border border-black py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                Vérifier la disponibilité
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
