/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Uncomment and set basePath if deploying to GitHub Pages with a repository name
  // basePath: '/portfolio',
}

module.exports = nextConfig
