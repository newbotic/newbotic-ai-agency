export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { href: 'https://wa.me/447891897558', icon: '💬', label: 'WhatsApp', color: 'hover:text-green-400' },
    { href: 'https://instagram.com/newbotic', icon: '📷', label: 'Instagram', color: 'hover:text-pink-400' },
    { href: 'mailto:hello@newbotic.co.uk', icon: '✉️', label: 'Email', color: 'hover:text-blue-400' },
    { href: 'tel:+4407891897558', icon: '📞', label: 'Phone', color: 'hover:text-blue-400' },
  ];

  const quickLinks = [
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#work', label: 'Work' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-slate-900/50 border-t border-slate-800 pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              NEWBOTIC
              <span className="text-blue-400 text-xs ml-1.5 font-normal">AI</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              AI-powered website audits and professional web page creation for local businesses.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${link.color} transition duration-300 text-xl`}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span>📧</span> hello@newbotic.co.uk
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span> +44 0789 189 7558
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span> London, UK
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} NEWBOTIC AI Agency. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            AI-Powered Digital Presence for Local Businesses
          </p>
        </div>
      </div>
    </footer>
  );
}