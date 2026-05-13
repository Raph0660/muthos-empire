import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';
import AffiliateButton from '../../../components/AffiliateButton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 86400; // 24h

// 1. SEO DYNAMIQUE (Vital pour Google)
export async function generateMetadata({ params }) {
  const { slug } = params;
  const { data: product } = await supabase
    .from('products')
    .select('brand, model, price_current')
    .eq('slug', slug)
    .single();

  if (!product) return { title: "Machine introuvable | Idées Casa" };

  return {
    title: `${product.brand} ${product.model} : Prix, Avis et Test 2026`,
    description: `Découvrez la ${product.brand} ${product.model}. Actuellement au meilleur prix à ${product.price_current}€. Analyse technique indépendante d'Idées Casa.`,
  };
}

// 2. PAGE PRODUIT
export default async function ProductPage({ params }) {
  const { slug } = params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !product) {
    return notFound();
  }

  const hasPromo = product.price_catalog && product.price_catalog > product.price_current;
  const reduction = hasPromo ? Math.round(((product.price_catalog - product.price_current) / product.price_catalog) * 100) : 0;

  // Extraction rapide du marchand depuis l'URL (Boulanger, Coffee Webstore, etc.)
  let merchantName = "notre partenaire";
  if (product.source_url) {
    if (product.source_url.includes('boulanger')) merchantName = "Boulanger";
    if (product.source_url.includes('coffee-webstore')) merchantName = "Coffee Webstore";
    if (product.source_url.includes('maxicoffee')) merchantName = "MaxiCoffee";
  }

  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#1c1917] pb-24 border-t-[12px] border-[#1c1917]">
      <nav className="py-6 px-6 border-b border-stone-200">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 hover:text-stone-900 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Retour aux offres
          </Link>
        </div>
      </nav>

      <article className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Colonne Gauche : Image & Prix */}
        <div>
          <div className="aspect-square bg-white border border-stone-200 p-8 flex items-center justify-center relative mb-8">
            {hasPromo && reduction > 0 && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[12px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                PROMO -{reduction}%
              </div>
            )}
            {product.image_url ? (
              <img src={product.image_url} alt={`${product.brand} ${product.model}`} className="w-full h-full object-contain mix-blend-multiply" />
            ) : (
              <div className="text-stone-300 italic">Visuel en cours de traitement</div>
            )}
          </div>
        </div>

        {/* Colonne Droite : Infos & Conversion */}
        <div className="flex flex-col justify-center">
          <p className="text-[12px] uppercase tracking-widest font-bold text-amber-800 mb-2">{product.brand}</p>
          <h1 className="font-serif text-4xl md:text-5xl uppercase tracking-tighter text-[#1a1a1a] mb-6">
            {product.model}
          </h1>

          <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-stone-200">
            <p className="font-serif text-5xl text-red-600">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(product.price_current)}
            </p>
            {hasPromo && (
              <p className="text-xl text-stone-400 line-through decoration-stone-300">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(product.price_catalog)}
              </p>
            )}
          </div>

          <div className="mb-10 space-y-4">
            <p className="text-stone-600 font-light text-lg leading-relaxed">
              {product.description || `Machine expresso automatique ${product.brand} ${product.model}.`}
            </p>
            <p className="text-[10px] text-stone-400 uppercase tracking-wider">
              * Les caractéristiques techniques (pression, dimensions, contenance) sont sujettes aux mises à jour du fabricant. Veuillez vérifier la fiche technique détaillée chez notre partenaire avant achat.
            </p>
          </div>

          {/* Le fameux bouton d'affiliation */}
          <AffiliateButton 
            url={product.source_url} 
            merchantName={merchantName} 
            price={product.price_current} 
          />
        </div>
      </article>
    </main>
  );
}
