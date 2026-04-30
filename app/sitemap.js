async function getArticles() {
  const SHEET_ID = '1AY7skQKYPST-CczQFQTtu99HUuIjxFHypETfiqDIs1Q';
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
  const response = await fetch(url);
  const text = await response.text();
  const rows = text.split('\n').slice(1);
  return rows.map(row => {
    const theme = row.split(',"')[0].replace(/"/g, '');
    return theme.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  });
}

export default async function sitemap() {
  const slugs = await getArticles();
  const articles = slugs.map((slug) => ({
    url: `https://www.tifetsesgourmandises.fr/article/${slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: 'https://www.tifetsesgourmandises.fr', lastModified: new Date() },
    ...articles,
  ];
}
