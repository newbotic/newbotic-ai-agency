export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[#00f0ff]/20 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com/newbotic"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#00f0ff]/20 bg-[#111115] hover:border-[#00f0ff] hover:shadow-[0_0_10px_#00f0ff] transition-all duration-300"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.5"
                className="group-hover:stroke-[#b000ff] transition-colors"
              >
                <rect x="2" y="2" width="20" height="20" rx="4" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="#00f0ff" className="group-hover:fill-[#b000ff] transition-colors" />
              </svg>
              <span className="text-sm text-gray-300 group-hover:text-[#00f0ff] transition-colors">
                @newbotic
              </span>
            </a>

            <a
              href="mailto:hello@newbotic.co.uk"
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[#00f0ff]/20 bg-[#111115] hover:border-[#00f0ff] hover:shadow-[0_0_10px_#00f0ff] transition-all duration-300"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.5"
                className="group-hover:stroke-[#b000ff] transition-colors"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="text-sm text-gray-300 group-hover:text-[#00f0ff] transition-colors">
                Email
              </span>
            </a>
          </div>

          {/* Company info */}
          <div className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} Newbotic Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}