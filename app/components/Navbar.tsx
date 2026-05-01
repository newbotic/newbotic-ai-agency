'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/app/lib/supabase/client';

interface NavbarProps {
  user?: any;
}

export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="border-b border-[#00f0ff]/20 bg-[#0a0a0f]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-lg flex items-center justify-center">
              <span className="font-black text-black text-sm">N</span>
            </div>
            <span className="text-white font-bold text-xl">NEWBOTIC</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/#agents" className="text-gray-300 hover:text-[#00f0ff] transition text-sm">
              AI Agents
            </Link>
            <Link href="/#process" className="text-gray-300 hover:text-[#00f0ff] transition text-sm">
              Process
            </Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="text-[#00f0ff] text-sm font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-400 text-sm hover:text-red-300 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="text-[#00f0ff] text-sm font-medium">
                Login
              </Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-800 flex flex-col gap-3">
            <Link href="/#agents" className="text-gray-300 py-2" onClick={() => setIsOpen(false)}>
              AI Agents
            </Link>
            <Link href="/#process" className="text-gray-300 py-2" onClick={() => setIsOpen(false)}>
              Process
            </Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="text-[#00f0ff] py-2" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="text-red-400 text-left py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="text-[#00f0ff] py-2" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
