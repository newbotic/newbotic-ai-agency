'use client';

export default function Footer() {
  return (
    <footer className="border-t border-[#00f0ff]/20 bg-[#0a0a0f] py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Newbotic. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs mt-1">
          AI agents for modern businesses
        </p>
      </div>
    </footer>
  );
}
