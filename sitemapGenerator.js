const fs = require('fs');
const axios = require('axios');

(async () => {
  const root = await axios.get('https://mat-rel-api.herokuapp.com/sitemaps/root');
  const users = await axios.get('https://mat-rel-api.herokuapp.com/sitemaps/users');
  const posts = await axios.get('https://mat-rel-api.herokuapp.com/sitemaps/posts');
  fs.writeFileSync('dist/mat-rel/browser/sitemap.txt', root.data);
  fs.writeFileSync('dist/mat-rel/browser/users-sitemap.txt', users.data);
  fs.writeFileSync('dist/mat-rel/browser/posts-sitemap.txt', posts.data);
})();
