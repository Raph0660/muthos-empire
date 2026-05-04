import { supabase } from '../lib/supabase';
import configData from '../data/page-configs.json'; // VÉRIFIE LE S ICI

export default async function sitemap() {
  const baseUrl = 'https://www.muthos-empire.com';

  let articlePages = [];
  try {
    const { data: articles } = await supabase.from('articles').select('slug');
    if (articles) {
      articlePages = articles.map((article) => ({
        url: `${baseUrl}/article/${article.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error("Sitemap: Erreur Supabase", e);
  }

  const configPages = (configData.pages || []).map((page) => ({
    url: `${baseUrl}/${page.slug.join('/')}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  const staticPages = [{ url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 }];

  return [...staticPages, ...configPages, ...articlePages];
}
