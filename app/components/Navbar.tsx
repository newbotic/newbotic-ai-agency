'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-[#1e3a5f]/10 py-3' 
        : 'bg-white border-b border-[#1e3a5f]/10 py-4'
    }`}>
      <div className="container">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-['Syne'] font-extrabold text-xl tracking-tight text-[#1e3a5f]">
            NEW<span className="text-[#2a5cff]">BOTIC</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-sm text-[#1e40af] hover:text-[#1e3a5f] transition font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://calendly.com/hello-newbotic/30min"
              target="_blank"
              className="bg-[#1e3a5f] text-white font-['Syne'] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#1e40af] transition"
            >
              Book Free Call →
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1e3a5f] p-2 focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-[#1e3a5f]/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-[#1e40af] hover:text-[#1e3a5f] transition text-sm font-medium py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-[#1e3a5f]/10">
                <a
                  href="https://calendly.com/hello-newbotic/30min"
                  target="_blank"
                  className="block w-full text-center bg-[#1e3a5f] text-white font-['Syne'] font-bold text-sm px-5 py-3 rounded-full hover:bg-[#1e40af] transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Free Call →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}