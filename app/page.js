import { supabase } from '../lib/supabase';

// ISR : Revalidation toutes les 24h (86400 secondes) pour économiser les ressources
export const revalidate = 86400;

export default async function HomePage() {
  // On récupère les dernières machines chassées avec une promo ou un prix valide
  const { data: latestProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'espresso-premium')
    .gt('price_current', 0)
    .order('last_hunt_at', { ascending: false })
    .limit(12); // On passe à 12 pour faire une belle grille SEO

  return (
    <div className="bg-[#fdfbf7]">
      {/* Hero Section orientée Prix & Comparatif */}
      <section className="pt-32 pb-20 px-6 text-center border-b border-stone-200">
        <span className="text-[10px] uppercase tracking-[0.4em] mb-8 block opacity-50 font-bold text-stone-800">
          Comparateur Indépendant & Bons Plans
        </span>
        <h1 className="font-serif text-6xl md:text-8xl mb-8 tracking-tighter leading-none text-[#1a1a1a]">
          L'Excellence <br/> au Meilleur Prix
        </h1>
        <p className="text-stone-500 max-w-xl mx-auto font-light italic text-lg leading-relaxed">
          Nous scannons quotidiennement le marché pour vous trouver les meilleures machines espresso premium en promotion.
        </p>
      </section>

      {/* Product Grid (Le Top 12 dynamique) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="font-serif text-4xl tracking-tight uppercase text-[#1a1a1a]">Les Meilleures Offres</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {latestProducts?.map((product) => {
            const hasPromo = product.price_catalog && product.price_catalog > product.price_current;
            const reduction = hasPromo ? Math.round(((product.price_catalog - product.price_current) / product.price_catalog) * 100) : 0;

            return (
              <article key={product.id} className="group">
                {/* CHGT MAJEUR SEO : On pointe vers la page interne générée par le slug 
                  Et non plus vers le lien d'affiliation externe ! 
                */}
                <a href={`/machines/${product.slug}`} className="block">
                  <div className="aspect-[4/5] bg-white border border-stone-100 mb-8 overflow-hidden relative flex items-center justify-center p-12 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-stone-200">
                    
                    {hasPromo && reduction > 0 && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">
                        -{reduction}%
                      </div>
                    )}

                    {product.image_url ? (
                      <img
                        src={product.image_
