export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#0a0a0f]/10 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-['Syne'] font-extrabold text-base text-[#0a0a0f]">
            NEW<span className="text-[#2a5cff]">BOTIC</span>
          </div>
          <ul className="flex gap-6">
            <li><a href="#services" className="text-sm text-[#7a7a8a] hover:text-[#0a0a0f] transition">Services</a></li>
            <li><a href="#process" className="text-sm text-[#7a7a8a] hover:text-[#0a0a0f] transition">Process</a></li>
            <li><a href="#contact" className="text-sm text-[#7a7a8a] hover:text-[#0a0a0f] transition">Contact</a></li>
          </ul>
          <span className="text-sm text-[#7a7a8a]">
            © {new Date().getFullYear()} NEWBOTIC. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}