/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Adaugă CSP headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              connect-src 'self' 
                https://brxiqehwzziwvhghmqnf.supabase.co 
                https://*.supabase.co 
                wss://*.supabase.co
                https://generativelanguage.googleapis.com 
                wss://generativelanguage.googleapis.com
                https://n8n-railway-production-7fd0.up.railway.app 
                https://*.railway.app;
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self' data:;
              frame-src 'self' https://*.supabase.co;
            `.replace(/\s{2,}/g, ' ').trim()
          }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
