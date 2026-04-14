export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#1e3a5f]/10 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-[#2a5cff] font-['Syne'] font-bold text-base">&lt;</span>
            <span className="font-['Syne'] font-extrabold text-base text-[#1e3a5f]">
              NEW<span className="text-[#2a5cff]">BOTIC</span>
            </span>
            <span className="text-[#2a5cff] font-['Syne'] font-bold text-base">/&gt;</span>
          </div>
          <ul className="flex gap-6">
            <li><a href="#services" className="text-sm text-[#1e40af] hover:text-[#1e3a5f] transition">Services</a></li>
            <li><a href="#process" className="text-sm text-[#1e40af] hover:text-[#1e3a5f] transition">Process</a></li>
            <li><a href="#contact" className="text-sm text-[#1e40af] hover:text-[#1e3a5f] transition">Contact</a></li>
          </ul>
          <span className="text-sm text-[#1e40af]">
            © {new Date().getFullYear()} NEWBOTIC. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}