import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "NewBotic | AI Automation for Local Businesses",
  description: "AI-powered website audits, email marketing, social media automation, and lead qualification for local businesses. 50% OFF limited offer.",
  keywords: "AI automation, website audit, email marketing AI, social media AI, lead qualifier, chatbot, local business UK",
  authors: [{ name: "NewBotic" }],
  openGraph: {
    title: "NewBotic | AI That Runs Your Business 24/7",
    description: "Email automation, lead qualification, social media AI — all running in the background while you focus on growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        
        {/* Preconnect pentru font-uri și resurse externe */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload font-uri critice */}
        <link rel="preload" as="font" href="https://fonts.gstatic.com/s/syne/v22/8vIH7w4qzmVxm2NL9G78HEZnMg.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="https://fonts.gstatic.com/s/dmsans/v15/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu6-K6z9mXgjU0.woff2" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-7K2R84JWGV" />
    </html>
  );
}