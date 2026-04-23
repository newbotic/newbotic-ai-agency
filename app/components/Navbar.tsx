import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#00f0ff]/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-['Syne'] font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b000ff]">
          NEWBOTIC
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-300 hover:text-[#00f0ff] transition duration-300 no-underline visited:text-gray-300">
            Home
          </Link>
          <Link href="#agents" className="text-gray-300 hover:text-[#00f0ff] transition duration-300 no-underline visited:text-gray-300">
            Agents
          </Link>
          <a
            href="https://calendly.com/hello-newbotic/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden group bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black font-bold px-5 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_#00f0ff] no-underline"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-[#00f0ff] hover:text-[#b000ff] transition">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}