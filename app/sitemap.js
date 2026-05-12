import { supabase } from '../lib/supabase';

export default async function sitemap() {
  // L'URL de ton site (mise à jour avec muthos-empire.com)
  const baseUrl = 'https://www.muthos-empire.com';

  // 1. Récupération dynamique des produits (Les machines)
  let productRoutes = [];
  try {
    const { data: products } = await supabase
      .from('products')
      .select('slug, last_hunt_at')
      .not('slug', 'is', null);

    if (products) {
      productRoutes = products.map((product) => ({
        url: `${baseUrl}/machines/${product.slug}`,
        lastModified: product.last_hunt_at ? new Date(product.last_hunt_at) : new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      }));
    }
  } catch (e) {
    console.error("Sitemap: Erreur récupération produits", e);
  }

  // 2. Récupération dynamique des articles (Le blog/Lexique)
  let articleRoutes = [];
  try {
    const { data: articles } = await supabase
      .from('articles')
      .select('slug, created_at')
      .not('slug', 'is', null);

    if (articles) {
      articleRoutes = articles.map((article) => ({
        url: `${baseUrl}/article/${article.slug}`,
        lastModified: article.created_at ? new Date(article.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error("Sitemap: Erreur récupération articles", e);
  }

  // 3. Route statique (La page d'accueil)
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // On assemble le tout pour Google
  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
