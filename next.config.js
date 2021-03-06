module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MongoDB_URL: process.env.MongoDB_URL,
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    NEXT_PUBLIC_API_URL: process.env.API_URL,
  },
  images: {
    domains: ['i.imgur.com'],
  }
}