import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "NewBotic AI Agency | Website Audit & Creation | 50% OFF",
  description: "AI-powered website audits and professional web page creation for local businesses. Limited 50% OFF offer.",
  keywords: "website audit, web design, AI agency, local business website, SEO audit",
  authors: [{ name: "NewBotic" }],
  openGraph: {
    title: "NewBotic AI Agency | 50% OFF Website Services",
    description: "Professional websites and AI-powered audits. Limited time offer.",
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
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}