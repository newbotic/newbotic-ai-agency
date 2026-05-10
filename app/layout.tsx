import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from './components/CookieConsent';
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Newbotic AI",
  description: "AI agents for your business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <CookieConsent />
        <Footer />
      </body>
    </html>
  );
}
