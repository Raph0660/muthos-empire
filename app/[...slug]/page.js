import { supabase } from '@/lib/supabase';
import { ProductGridTemplate } from '@/lib/templates'; // On pointe vers templates.js
import configData from '@/data/page-config.json';    // On pointe vers page-config.json
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const slugArray = params.slug || [];
  const slugPath = slugArray.join('/');
  
  // On cherche la page dans le fichier JSON
  const config = configData.pages.find(p => p.slug.join('/') === slugPath);
  
  if (!config) return { title: "Expertise Technique | MUTHOS" };

  return {
    title: config.seo.title,
    description: config.seo.description,
  };
}

export default async function DynamicPage({ params }) {
  const slugArray = params.slug || [];
  const slugPath = slugArray.join('/');
  
  const config = configData.pages.find(p => p.slug.join('/') === slugPath);
  
  if (!config) {
    return notFound();
  }

  let data = [];
  if (config.data_source === 'supabase') {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', config.category_filter)
      .gt('price_current', 0)
      .order('price_current', { ascending: false });
    
    if (error) console.error('Erreur Supabase:', error);
    data = products || [];
  }

  if (config.template === 'product-grid') {
    return <ProductGridTemplate products={data} seo={config.seo} />;
  }

  return notFound();
}
