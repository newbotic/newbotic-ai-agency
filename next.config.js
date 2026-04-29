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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.chatbotai.cloud https://*.chatbotai.cloud https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://n8n-railway-production-7fd0.up.railway.app https://*.railway.app wss://generativelanguage.googleapis.com https://generativelanguage.googleapis.com wss://*.generativelanguage.googleapis.com https://*.googleapis.com wss://*.googleapis.com https://region1.google-analytics.com https://*.google-analytics.com; media-src 'self' blob: data:; frame-src 'self' https://calendly.com; img-src 'self' data: https://*.googleapis.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;