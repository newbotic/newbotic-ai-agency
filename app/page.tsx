import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatBot from './components/AIChatBot';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white pt-20 md:pt-24">
        
        {/* HERO Section */}
        <section id="hero" className="container py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Logo/Brand Badge */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-lg px-6 py-3 rounded-xl border border-white/20 inline-flex items-center gap-2">
                <span className="text-2xl font-bold">NEWBOTIC</span>
                <span className="text-blue-400 text-sm font-medium">AI</span>
                <span className="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded-full ml-2">Beta</span>
              </div>
            </div>

            {/* Status Badges - Trickle style */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="status-badge status-badge-warning text-sm px-4 py-2">
                🔥 50% OFF - Limited Time
              </span>
              <span className="status-badge status-badge-success text-sm px-4 py-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                7 spots left this week
              </span>
              <span className="status-badge status-badge-info text-sm px-4 py-2">
                ⚡ Ready in 7 days
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI-Powered Website Audit
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                & Web Page Creation
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Professional websites and detailed audits for local businesses.
              <br />
              <span className="text-blue-300 font-medium">Limited 50% OFF - Starting from £125</span>
            </p>

            {/* Timer */}
            <div className="bg-white/5 rounded-xl p-4 mb-8 inline-block border border-slate-700">
              <p className="text-sm text-gray-400 mb-2">⏰ Limited Time Offer</p>
              <div className="flex gap-4 justify-center">
                <div className="text-center">
                  <span className="text-2xl font-bold text-yellow-400">7</span>
                  <span className="text-xs text-gray-500 block">Days</span>
                </div>
                <div className="text-gray-400 text-2xl">:</div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-yellow-400">12</span>
                  <span className="text-xs text-gray-500 block">Hours</span>
                </div>
                <div className="text-gray-400 text-2xl">:</div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-yellow-400">45</span>
                  <span className="text-xs text-gray-500 block">Mins</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://calendly.com/hello-newbotic/30min" 
                target="_blank" 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-green-600/25"
              >
                📅 Book Free Strategy Call
              </a>
              <a 
                href="https://wa.me/447891897558" 
                target="_blank" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-blue-600/25"
              >
                💬 Chat on WhatsApp
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-400">
              <span className="flex items-center gap-1">✅ 15+ Businesses Served</span>
              <span className="flex items-center gap-1">⭐ 5.0 Rating</span>
              <span className="flex items-center gap-1">🔒 100% Satisfaction</span>
            </div>
          </div>
        </section>

        {/* STATS Dashboard Section - Trickle Style */}
        <section className="container py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="stat-card group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">⏱️</span>
                  <span className="status-badge status-badge-success text-xs">Guaranteed</span>
                </div>
                <div className="text-sm text-gray-400 mb-1">Delivery Time</div>
                <div className="text-3xl font-bold">7 days</div>
                <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                  <span>↑</span> 40% faster than industry
                </div>
              </div>

              <div className="stat-card group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">🏷️</span>
                  <span className="status-badge status-badge-warning text-xs">Limited</span>
                </div>
                <div className="text-sm text-gray-400 mb-1">Current Offer</div>
                <div className="text-3xl font-bold text-blue-400">-50%</div>
                <div className="text-xs text-yellow-400 mt-2 flex items-center gap-1">
                  <span>⏰</span> Ends in 7 days
                </div>
              </div>

              <div className="stat-card group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">👥</span>
                  <span className="status-badge status-badge-info text-xs">Growing</span>
                </div>
                <div className="text-sm text-gray-400 mb-1">Clients 2025</div>
                <div className="text-3xl font-bold">15+</div>
                <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                  <span>↑</span> 8 this month
                </div>
              </div>

              <div className="stat-card group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">⭐</span>
                  <span className="status-badge status-badge-purple text-xs">Excellent</span>
                </div>
                <div className="text-sm text-gray-400 mb-1">Success Rate</div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-xs text-purple-400 mt-2 flex items-center gap-1">
                  <span>✓</span> Client satisfaction
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SERVICES Section */}
        <section id="services" className="container py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="status-badge status-badge-warning mb-4">50% OFF LIMITED TIME</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Services</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Professional solutions for local businesses - audit, optimize, and build your online presence
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Website Audit Card */}
              <div className="glass-card p-6 md:p-8 hover-lift relative group border border-slate-700 hover:border-blue-500/50">
                <div className="absolute -top-3 -right-3 z-10">
                  <span className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg animate-pulse">
                    -50%
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="status-badge status-badge-info">Most Popular</span>
                </div>
                
                <div className="text-5xl mb-6 mt-6">🔍</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Website Audit</h3>
                <p className="text-gray-300 mb-6">AI-powered complete analysis with actionable insights</p>
                
                <div className="space-y-3 mb-6">
                  {['Speed performance test', 'Security vulnerability check', 'SEO analysis & recommendations', 'Mobile responsiveness audit', 'Detailed PDF report'].map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm">
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-400">£75</span>
                    <span className="text-lg text-gray-400 line-through">£150</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">One-time investment</div>
                </div>
                
                <a 
                  href="https://calendly.com/hello-newbotic/30min" 
                  target="_blank" 
                  className="block w-full bg-blue-600 hover:bg-blue-700 border border-blue-500 py-3 rounded-xl transition-all duration-300 text-center font-semibold group-hover:scale-[1.02]"
                >
                  Get Free Audit Consultation →
                </a>
              </div>

              {/* Web Creation Card */}
              <div className="glass-card p-6 md:p-8 hover-lift relative group border border-slate-700 hover:border-purple-500/50">
                <div className="absolute -top-3 -right-3 z-10">
                  <span className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg animate-pulse">
                    -50%
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="status-badge status-badge-purple">Best Value</span>
                </div>
                
                <div className="text-5xl mb-6 mt-6">🌐</div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Web Page Creation</h3>
                <p className="text-gray-300 mb-6">Professional, custom-designed website for your business</p>
                
                <div className="space-y-3 mb-6">
                  {['Custom responsive design', 'Mobile-first optimization', 'SEO optimized structure', 'Contact form integration', 'Google Analytics setup'].map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm">
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-purple-400">£175</span>
                    <span className="text-lg text-gray-400 line-through">£350</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">One-time investment</div>
                </div>
                
                <a 
                  href="https://calendly.com/hello-newbotic/30min" 
                  target="_blank" 
                  className="block w-full bg-purple-600 hover:bg-purple-700 border border-purple-500 py-3 rounded-xl transition-all duration-300 text-center font-semibold group-hover:scale-[1.02]"
                >
                  Start Your Website →
                </a>
              </div>
            </div>

            {/* Combo Package */}
            <div className="mt-10 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-white/20 text-center hover-lift">
              <div className="flex justify-center -mt-14 mb-4">
                <span className="bg-gradient-to-r from-red-600 to-red-700 text-white text-sm px-6 py-2 rounded-full font-bold shadow-lg">
                  🎯 BEST DEAL - SAVE £275
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-3 mt-4">Combo Package: Audit + Website</h3>
              <p className="text-gray-300 mb-4 text-lg">Everything you need to succeed online - at the best price</p>
              
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <span className="status-badge status-badge-info">Full Audit</span>
                <span className="text-gray-400">+</span>
                <span className="status-badge status-badge-purple">Custom Website</span>
                <span className="text-gray-400">+</span>
                <span className="status-badge status-badge-success">Priority Support</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline justify-center gap-3">
                  <span className="text-4xl md:text-5xl font-bold text-white">£225</span>
                  <span className="text-xl text-gray-400 line-through">£500</span>
                </div>
                <div className="text-green-400 text-sm mt-2 font-medium">Save £275 - Limited time only</div>
              </div>
              
              <a 
                href="https://calendly.com/hello-newbotic/30min" 
                target="_blank" 
                className="inline-block bg-white text-slate-900 hover:bg-gray-200 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                Book Combo Package →
              </a>
            </div>
          </div>
        </section>

        {/* PROCESS Pipeline Section - Trickle Style */}
        <section id="process" className="container py-16 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI-Powered Process</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                From first contact to final delivery - simple, transparent, and fast
              </p>
            </div>

            <div className="relative">
              {/* Connection line - visible on desktop */}
              <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 opacity-30"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                
                <div className="glass-card p-6 hover-lift">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">1</div>
                    <span className="status-badge status-badge-info">Step 1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Discovery Call</h3>
                  <p className="text-gray-400 text-sm mb-4">15-min call to understand your business needs and goals</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-green-400">Same day booking available</span>
                  </div>
                </div>

                <div className="glass-card p-6 hover-lift">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-xl">2</div>
                    <span className="status-badge status-badge-purple">Step 2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                  <p className="text-gray-400 text-sm mb-4">Our AI agents analyze requirements and create a plan</p>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                    <div className="bg-purple-500 h-1.5 rounded-full w-1/3"></div>
                  </div>
                </div>

                <div className="glass-card p-6 hover-lift">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center font-bold text-xl">3</div>
                    <span className="status-badge status-badge-warning">Step 3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Design & Build</h3>
                  <p className="text-gray-400 text-sm mb-4">I create your website or audit report with regular updates</p>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                    <div className="bg-orange-500 h-1.5 rounded-full w-2/3"></div>
                  </div>
                </div>

                <div className="glass-card p-6 hover-lift">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center font-bold text-xl">4</div>
                    <span className="status-badge status-badge-success">Step 4</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Delivery & Support</h3>
                  <p className="text-gray-400 text-sm mb-4">Final delivery within 7 days + 30 days support included</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-400">100% satisfaction guaranteed</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* RECENT WORK - Activity Feed */}
        <section id="work" className="container py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Work</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Here's what I've been building lately for local businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="glass-card p-5 hover-lift">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏢</span>
                    <span className="text-sm text-gray-400">Local Cafe</span>
                  </div>
                  <span className="status-badge status-badge-success">Completed</span>
                </div>
                <h4 className="font-bold mb-2">Cafe Website with Menu</h4>
                <p className="text-sm text-gray-400 mb-3">Full responsive website with online menu and booking</p>
                <div className="text-xs text-blue-400 flex items-center gap-1">
                  <span>✓</span> Delivered in 5 days
                </div>
              </div>

              <div className="glass-card p-5 hover-lift">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔧</span>
                    <span className="text-sm text-gray-400">Plumbing Service</span>
                  </div>
                  <span className="status-badge status-badge-success">Completed</span>
                </div>
                <h4 className="font-bold mb-2">SEO Audit + Optimization</h4>
                <p className="text-sm text-gray-400 mb-3">Complete technical audit with local SEO strategy</p>
                <div className="text-xs text-blue-400 flex items-center gap-1">
                  <span>✓</span> Delivered in 3 days
                </div>
              </div>

              <div className="glass-card p-5 hover-lift">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🛍️</span>
                    <span className="text-sm text-gray-400">Boutique Shop</span>
                  </div>
                  <span className="status-badge status-badge-warning">In Progress</span>
                </div>
                <h4 className="font-bold mb-2">E-commerce Website</h4>
                <p className="text-sm text-gray-400 mb-3">Custom design with product showcase and contact forms</p>
                <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                  <div className="bg-yellow-500 h-1.5 rounded-full w-3/4"></div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CONTACT Section */}
        <section id="contact" className="container py-16 bg-white/5">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Project Today</h2>
              <p className="text-gray-300 text-lg">Book a call, WhatsApp, or fill the form - I'll reply within 24h</p>
            </div>

            {/* Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              <a href="tel:+4407891897558" className="glass-card p-4 hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <span className="text-xl">📞</span>
                <span className="text-sm">+44 0789 189 7558</span>
              </a>
              <a href="https://wa.me/447891897558" target="_blank" className="glass-card p-4 hover:bg-white/10 transition-all flex items-center justify-center gap-3 border-green-500/30">
                <span className="text-xl">💬</span>
                <span className="text-sm">WhatsApp</span>
              </a>
              <a href="https://instagram.com/newbotic" target="_blank" className="glass-card p-4 hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <span className="text-xl">📷</span>
                <span className="text-sm">@newbotic</span>
              </a>
              <a href="mailto:hello@newbotic.co.uk" className="glass-card p-4 hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <span className="text-xl">✉️</span>
                <span className="text-sm">hello@newbotic.co.uk</span>
              </a>
            </div>

            {/* Contact Form */}
            <form id="contactForm" className="space-y-4">
              <input 
                type="text" 
                name="name" 
                id="name" 
                placeholder="Your name" 
                required 
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all" 
              />
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Your email" 
                required 
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all" 
              />
              <select 
                name="service" 
                id="service" 
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="">Select service</option>
                <option value="audit">Website Audit (£75)</option>
                <option value="website">Web Page Creation (£175)</option>
                <option value="combo">Combo Package (£225)</option>
              </select>
              <textarea 
                name="message" 
                id="message" 
                placeholder="Tell me about your project..." 
                rows={4} 
                required 
                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
              ></textarea>
              <button 
                type="submit" 
                id="submitBtn" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Send Message → I'll reply within 24h
              </button>
            </form>
          </div>
        </section>

        {/* Popup Modal */}
        <div id="popupMessage" className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 hidden transition-all duration-300">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-slate-600">
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-gray-300 mb-6">Thank you for reaching out. I'll reply within 24 hours.</p>
              <button id="closePopup" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition-all">
                Close
              </button>
            </div>
          </div>
        </div>

      </main>
      <Footer />
      <AIChatBot />

      {/* Form submission script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const form = document.getElementById('contactForm');
            const popup = document.getElementById('popupMessage');
            const closeBtn = document.getElementById('closePopup');
            const submitBtn = document.getElementById('submitBtn');
            
            if (!form) return;
            
            form.addEventListener('submit', async function(e) {
              e.preventDefault();
              
              const name = document.getElementById('name')?.value.trim();
              const email = document.getElementById('email')?.value.trim();
              const service = document.getElementById('service')?.value;
              const message = document.getElementById('message')?.value.trim();
              
              if (!name || !email || !service || !message) {
                alert('Please fill in all fields.');
                return;
              }
              
              const emailRegex = /^[^\\s@]+@([^\\s@]+\\.)+[^\\s@]+$/;
              if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
              }
              
              const originalText = submitBtn.innerHTML;
              submitBtn.innerHTML = 'Sending...';
              submitBtn.disabled = true;
              
              const formData = new FormData(form);
              
              try {
                const response = await fetch('https://formspree.io/f/mlgoapje', {
                  method: 'POST',
                  body: formData,
                  headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                  popup.classList.remove('hidden');
                  form.reset();
                } else {
                  alert('Something went wrong. Please email hello@newbotic.co.uk');
                }
              } catch (error) {
                alert('Network error. Please try again or email hello@newbotic.co.uk');
              } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
              }
            });
            
            if (closeBtn) {
              closeBtn.addEventListener('click', () => popup.classList.add('hidden'));
            }
            
            if (popup) {
              popup.addEventListener('click', (e) => {
                if (e.target === popup) popup.classList.add('hidden');
              });
            }
          })();
        `
      }} />
    </>
  );
}