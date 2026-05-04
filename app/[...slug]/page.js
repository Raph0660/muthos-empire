import { supabase } from '../../lib/supabase';
import { ProductGridTemplate, ComparisonTemplate } from '../../lib/templates';
import configData from '../../data/page-configs.json'; // AJOUT DU S ICI
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const slugPath = (params.slug || []).join('/');
  const config = configData.pages.find(p => p.slug.join('/') === slugPath);
  if (!config) return { title: "MUTHOS | Expertise Technique" };
  return { title: config.seo.title, description: config.seo.description };
}

export default async function DynamicPage({ params }) {
  const slugPath = (params.slug || []).join('/');
  const config = configData.pages.find(p => p.slug.join('/') === slugPath);
  
  if (!config) return notFound();

  let data = [];

  // Logique de récupération des données
  if (config.template === 'product-grid') {
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('category', config.category_filter)
      .gt('price_current', 0)
      .order('price_current', { ascending: false });
    data = products || [];
    return <ProductGridTemplate products={data} seo={config.seo} />;
  }

  if (config.template === 'comparison') {
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .in('model', config.comparison_models);
    data = products || [];
    return <ComparisonTemplate products={data} seo={config.seo} />;
  }

  return notFound();
}
