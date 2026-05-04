import { supabase } from '../../lib/supabase';
import { ProductGridTemplate } from '../../lib/page-templates';
import pageConfigs from '../../data/page.configs.json'; // Mis à jour avec le point .
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const slugArray = params.slug || [];
  const slugPath = slugArray.join('/');
  
  // On cherche dans la liste des pages du JSON
  const config = pageConfigs.pages.find(p => p.slug.join('/') === slugPath);
  
  if (!config) return { title: "Analyse Technique | MUTHOS" };

  return {
    title: config.seo.title,
    description: config.seo.description,
  };
}

export default async function DynamicPage({ params }) {
  const slugArray = params.slug || [];
  const slugPath = slugArray.join('/');
  
  // 1. Trouver la configuration dans ton JSON
  const config = pageConfigs.pages.find(p => p.slug.join('/') === slugPath);
  
  if (!config) {
    return notFound();
  }

  // 2. Récupérer les données Supabase si besoin
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

  // 3. Rendu via le Template centralisé
  if (config.template === 'product-grid') {
    return <ProductGridTemplate products={data} seo={config.seo} />;
  }

  return notFound();
}
