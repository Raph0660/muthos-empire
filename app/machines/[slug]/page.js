import { supabase } from '@/lib/supabase';
import AffiliateButton from '@/components/AffiliateButton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { data: product } = await supabase.from('products').select('*').eq('slug', slug).single();
  if (!product) return null;

  return (
    <main className="min-h-screen bg-[#fdfbf7] p-6">
      <Link href="/" className="flex items-center gap-2 text-xs mb-8 uppercase tracking-widest"><ArrowLeft size={14}/> Retour</Link>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-left">
        <div className="bg-white p-8 border border-stone-100 flex items-center justify-center aspect-square">
          <img src={product.image_url} alt={product.model} className="max-w-full max-h-full object-contain" />
        </div>
        <div>
          <p className="text-amber-800 font-bold uppercase tracking-[0.3em] text-sm mb-2">{product.brand}</p>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 uppercase italic">{product.model}</h1>
          <p className="text-5xl text-red-600 font-serif mb-8">{product.price_current}€</p>
          <div className="text-stone-500 mb-10 italic leading-relaxed">{product.description}</div>
          <AffiliateButton url={product.source_url} merchantName="le marchand" price={product.price_current} />
        </div>
      </div>
    </main>
  );
}
