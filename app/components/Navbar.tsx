'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-[#0a0a0f]/10 py-3' 
        : 'bg-white border-b border-[#0a0a0f]/10 py-4'
    }`}>
      <div className="container">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-['Syne'] font-extrabold text-xl tracking-tight text-[#0a0a0f]">
            NEW<span className="text-[#2a5cff]">BOTIC</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-[#3a3a4a] hover:text-[#0a0a0f] transition font-medium">Services</a>
            <a href="#process" className="text-sm text-[#3a3a4a] hover:text-[#0a0a0f] transition font-medium">Process</a>
            <a href="#contact" className="text-sm text-[#3a3a4a] hover:text-[#0a0a0f] transition font-medium">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://calendly.com/hello-newbotic/30min"
              target="_blank"
              className="bg-[#0a0a0f] text-white font-['Syne'] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#3a3a4a] transition"
            >
              Book Free Call →
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}