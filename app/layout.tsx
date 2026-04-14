import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        {children}
      </body>
      <GoogleAnalytics gaId="G-7K2R84JWGV" />
    </html>
  );
}