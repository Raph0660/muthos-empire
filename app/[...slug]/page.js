import { supabase } from '../../lib/supabase';
import { ProductGridTemplate, ComparisonTemplate, ArticleTemplate } from '../../lib/templates';
import configData from '../../data/page-configs.json';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const slugPath = (params.slug || []).join('/');
  
  // 1. Chercher dans le JSON (Pages système)
  const config = configData.pages.find(p => p.slug.join('/') === slugPath);
  if (config) {
    return { title: config.seo.title, description: config.seo.description };
  }

  // 2. Chercher dans Supabase (Articles de blog)
  const { data: article } = await supabase
    .from('articles')
    .select('theme, slug')
    .eq('slug', slugPath)
    .single();

  if (article) {
    return { title: `${article.theme} | MUTHOS`, description: `Analyse approfondie sur ${article.theme}.` };
  }

  return { title: "Expertise Technique | MUTHOS" };
}

export default async function DynamicPage({ params }) {
  const slugPath = (params.slug || []).join('/');
  
  // LOGIQUE A : Pages définies dans le JSON
  const config = configData.pages.find(p => p.slug.join('/') === slugPath);
  
  if (config) {
    let data = [];
    if (config.template === 'product-grid') {
      const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('category', config.category_filter)
        .gt('price_current', 0)
        .order('price_current', { ascending: false });
      return <ProductGridTemplate products={products || []} seo={config.seo} />;
    }

    if (config.template === 'comparison') {
      const { data: products } = await supabase
        .from('products')
        .select('*')
        .in('model', config.comparison_models);
      return <ComparisonTemplate products={products || []} seo={config.seo} />;
    }
  }

  // LOGIQUE B : Articles de blog dans Supabase
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slugPath)
    .single();

  if (article) {
    return <ArticleTemplate article={article} />;
  }

  return notFound();
}
