import { supabase } from '../../lib/supabase';
import { ProductGridTemplate } from '../../lib/page-templates';
import pageConfigs from '../../data/page-configs.json';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const slugPath = params.slug.join('/');
  const config = pageConfigs.pages.find(p => p.slug.join('/') === slugPath);
  
  if (!config) return { title: "MUTHOS | Intelligence Artificielle & Café" };

  return {
    title: config.seo.title,
    description: config.seo.description,
  };
}

export default async function DynamicPage({ params }) {
  const slugPath = params.slug.join('/');
  
  // 1. Trouver la config de la page
  const config = pageConfigs.pages.find(p => p.slug.join('/') === slugPath);
  
  if (!config) {
    return notFound();
  }

  // 2. Récupérer les données selon la source
  let data = [];
  if (config.data_source === 'supabase') {
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('category', config.category_filter)
      .gt('price_current', 0)
      .order('price_current', { ascending: false });
    data = products;
  }

  // 3. Afficher le bon template
  if (config.template === 'product-grid') {
    return <ProductGridTemplate products={data} seo={config.seo} />;
  }

  return notFound();
}
