module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MongoDB_URL: process.env.MongoDB_URL,
    NEXT_PUBLIC_API_URL: process.env.API_URL_HOST,
    // NEXT_PUBLIC_API_URL: process.env.API_URL_LOCAL,
  },
  images: {
    domains: ['i.imgur.com'],
  }
}