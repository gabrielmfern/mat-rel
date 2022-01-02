const fs = require('fs');
const axios = require('axios');

(async () => {
  const root = await axios.get('https://mat-rel-api.herokuapp.com/sitemaps/root');
  const users = await axios.get('https://mat-rel-api.herokuapp.com/sitemaps/users');
  const posts = await axios.get('https://mat-rel-api.herokuapp.com/sitemaps/posts');
  fs.writeFileSync('dist/mat-rel/browser/sitemap.txt', root.data);
  console.info('[SITEMAP_GENERATOR] Generated sitemap.txt');
  fs.writeFileSync('dist/mat-rel/browser/users-sitemap.txt', users.data);
  console.info('[SITEMAP_GENERATOR] Generated users-sitemap.txt');
  fs.writeFileSync('dist/mat-rel/browser/posts-sitemap.txt', posts.data);
  console.info('[SITEMAP_GENERATOR] Generated posts-sitemap.txt');
})();
