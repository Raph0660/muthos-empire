import { supabase } from '../lib/supabase';
import Image from 'next/image';

export const revalidate = 3600;

export default async function HomePage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'espresso-premium')
    .gt('price_current', 0)
    .order('last_hunt_at', { ascending: false })
    .limit(6);

  return (
    <div className="bg-[#fdfbf7]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center border-b border-stone-200">
        <span className="text-[10px] uppercase tracking-[0.4em] mb-8 block opacity-50 font-bold">Expertise Technique & Sourcing</span>
        <h1 className="font-serif text-6xl md:text-8xl mb-8 tracking-tighter leading-none text-[#1a1a1a]">
          L'Ingénierie <br/> de l'Exception
        </h1>
        <p className="text-stone-500 max-w-xl mx-auto font-light italic text-lg leading-relaxed">
          Décryptage thermodynamique et verdict indépendant sur les systèmes d'extraction de précision.
        </p>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="font-serif text-4xl tracking-tight uppercase text-[#1a1a1a]">Les Dernières Analyses</h2>
          <a href="/espresso-premium" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">
            Voir tout le catalogue
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {products?.map((product) => (
            <article key={product.id} className="group">
              <a href={product.source_url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="aspect-[4/5] bg-white border border-stone-100 mb-8 overflow-hidden relative flex items-center justify-center p-12 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-stone-200">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.model}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-amber-800">{product.brand}</p>
                  <h3 className="font-serif text-2xl uppercase tracking-tighter text-[#1a1a1a]">{product.model}</h3>
                  <p className="text-stone-400 font-light text-sm line-clamp-2 italic mb-4">{product.description}</p>
                  <p className="font-serif text-xl text-[#1a1a1a]">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(product.price_current)}
                  </p>
                </div>
              </a>
            </article>
          ))}
        </div>
        
        {!products || products.length === 0 && (
           <div className="text-center py-20 text-stone-400 font-serif italic">
             Le Hunter est actuellement en mission de sourcing...
           </div>
        )}
      </section>
    </div>
  );
}
