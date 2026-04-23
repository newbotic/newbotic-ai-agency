/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' https://n8n-railway-production-7fd0.up.railway.app https://*.railway.app https://*.railway.app; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.chatbotai.cloud https://*.chatbotai.cloud; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; frame-src 'self' https://calendly.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;