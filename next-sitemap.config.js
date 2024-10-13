/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.lemmaone.com',
  generateRobotsTxt: true,
  outDir: 'build',
}

