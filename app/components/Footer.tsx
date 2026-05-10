'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#00f0ff]/20 bg-[#0a0a0f] py-4 text-center text-gray-500 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-6">
          <Link href="/privacy" className="hover:text-[#00f0ff] transition">Privacy</Link>
          <Link href="/terms" className="hover:text-[#00f0ff] transition">Terms</Link>
          <a href="mailto:hello@newbotic.co.uk" className="hover:text-[#00f0ff] transition">Contact</a>
        </div>
        <p className="mt-2">© {new Date().getFullYear()} Newbotic</p>
      </div>
    </footer>
  );
}
