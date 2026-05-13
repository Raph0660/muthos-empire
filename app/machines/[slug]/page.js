import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import AffiliateButton from '@/components/AffiliateButton';
import { ArrowLeft, ShieldCheck, Gauge, Coffee, Zap } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 86400;

export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('slug').limit(20);
  return products?.map((p) => ({ slug: p.slug })) || [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: product } = await supabase.from('products').select('*').eq('slug', slug).single();
  if (!product) return { title: "Machine introuvable" };
  return { title: `${product.brand} ${product.model} : Prix et Analyse 2026` };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { data: product } = await supabase.from('products').select('*').eq('slug', slug).single();

  if (!product) notFound();

  const hasPromo = product.price_catalog && product.price_catalog > product.price_current;
  const reduction = hasPromo ? Math.round(((product.price_catalog - product.price_current) / product.price_catalog) * 100) : 0;

  let merchantName = "le marchand";
  if (product.source_url?.includes('boulanger')) merchantName = "Boulanger";
  if (product.source_url?.includes('coffee-webstore')) merchantName = "Coffee Webstore";

  return (
    <main className="min-h-screen bg-[#fdfbf7] pb-24">
      <nav className="py-6 px-6 border-b border-stone-200">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-500">
            <ArrowLeft className="w-3 h-3" /> Retour
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 text-left">
        {/* IMAGE SECTION - SIMPLE */}
        <div className="bg-white border border-stone-100 p-8 flex items-center justify-center aspect-square shadow-sm">
          <img src={product.image_url} alt={product.model} className="max-w-full max-h-full object-contain" />
        </div>

        {/* TEXT SECTION */}
        <div>
          <p className="text-[14px] uppercase tracking-widest font-extrabold text-amber-800 mb-4">{product.brand}</p>
          <h1 className="font-serif text-4xl md:text-6xl uppercase mb-8">
            {product.model.length < 12 ? `Machine ${product.model}` : product.model}
          </h1>
          <div className="flex items-baseline gap-4 mb-10 pb-10 border-b border-stone-200">
            <p className="font-serif text-6xl text-red-600">{product.price_current}€</p>
            {hasPromo && <p className="text-2xl text-stone-300 line-through">{product.price_catalog}€</p>}
          </div>
          <div className="mb-12 text-stone-600 text-xl font-light italic">
             {product.description || `Expertise technique de la ${product.brand} ${product.model}.`}
          </div>
          <AffiliateButton url={product.source_url} merchantName={merchantName} price={product.price_current} />
        </div>
      </div>
    </main>
  );
}
