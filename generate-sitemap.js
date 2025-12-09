// generate-sitemap.js
// Simple sitemap generator for screentest.run

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://screentest.run';

const urls = [
  { loc: '/', priority: 1.0, changefreq: 'daily' },
  { loc: '/screen-refresh-rate-test', priority: 0.9, changefreq: 'weekly' },
  { loc: '/white-screen', priority: 0.8, changefreq: 'weekly' },
  { loc: '/black-screen', priority: 0.8, changefreq: 'weekly' }
];

// lastmod: use today's date in YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.join(__dirname, 'sitemap.xml');

fs.writeFileSync(outputPath, xml.trim() + '\n', 'utf8');

console.log(`sitemap.xml generated at: ${outputPath}`);
