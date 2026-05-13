import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

// ISR : Revalidation toutes les 24h
export const revalidate = 86400;

export default async function HomePage() {
  // Récupération des machines
  const { data: latestProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'espresso-premium')
    .gt('price_current', 0)
    .order('last_hunt_at', { ascending: false })
    .limit(12);

  return (
    <div className="bg-[#fdfbf7]">
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 px-6 text-center border-b border-stone-200">
        <span className="text-[10px] uppercase tracking-[0.4em] mb-8 block opacity-50 font-bold text-stone-800">
          Le Guide Indépendant IdeesCasa
        </span>
        <h1 className="font-serif text-5xl md:text-7xl mb-6 tracking-tighter leading-tight text-[#1a1a1a]">
          L'Équipement Premium <br className="hidden md:block" /> au Meilleur Prix
        </h1>
        <p className="text-stone-500 max-w-2xl mx-auto font-light italic text-lg leading-relaxed">
          Votre comparateur d'excellence pour la maison. Nous traquons quotidiennement le marché pour vous dénicher les <strong>machines espresso haute performance</strong> aux tarifs les plus avantageux.
        </p>
      </section>

      {/* 2. PRODUCT GRID SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="font-serif text-4xl tracking-tight uppercase text-[#1a1a1a]">Les Meilleures Offres</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {latestProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {(!latestProducts || latestProducts.length === 0) && (
           <div className="text-center py-20 text-stone-400 font-serif italic">
             Les offres sont en cours d'actualisation...
           </div>
        )}
      </section>

      {/* 3. BLOC CONFIANCE / E-E-A-T */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-stone-100 text-center">
        <h2 className="font-serif text-2xl mb-6 text-[#1a1a1a]">Notre Engagement</h2>
        <p className="text-stone-500 font-light leading-relaxed italic">
          "Chez <strong>IdeesCasa</strong>, nous pensons que l'équipement de la maison doit allier durabilité et performance. 
          Nos analyses de machines espresso ne sont pas de simples fiches techniques : nous agrégeons les retours d'experts et 
          les données du marché pour vous offrir un comparatif impartial. Notre mission est de rendre le café de spécialité 
          accessible à tous les passionnés, au prix le plus juste."
        </p>
      </section>
    </div>
  );
}
