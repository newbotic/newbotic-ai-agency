import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBotWrapper from "./components/ChatBotWrapper";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="bg-[#f8f8fc]">
        {/* HERO Section */}
        <section className="pt-28 pb-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="hero-badge">
                  <span className="badge-dot"></span>7 spots left this week
                </div>
                <h1 className="font-['Syne'] text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[#1e3a5f] mb-5">
                  AI that runs
                  <br />
                  your business
                  <br />
                  <span className="text-[#2a5cff]">24/7</span>
                </h1>
                <p className="text-lg text-[#1e40af] font-light leading-relaxed mb-8 max-w-md">
                  Your Business, On Autopilot — email automation, lead
                  qualification, social media AI. All running while you focus on
                  growth.
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  <a
                    href="https://calendly.com/hello-newbotic/30min"
                    target="_blank"
                    className="btn-primary bg-[#1e3a5f] hover:bg-[#1e40af]"
                  >
                    Book Free Strategy Call
                  </a>
                  <a
                    href="https://wa.me/447891897558"
                    target="_blank"
                    className="btn-secondary border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white"
                  >
                    WhatsApp Us
                  </a>
                </div>
                <div className="flex flex-wrap gap-6">
                  <span className="flex items-center gap-2 text-sm text-[#7a7a8a]">
                    <span className="w-4 h-4 bg-[#00e5a0] rounded-full flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="#0a0a0f"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    15+ businesses
                  </span>
                  <span className="flex items-center gap-2 text-sm text-[#7a7a8a]">
                    <span className="w-4 h-4 bg-[#00e5a0] rounded-full flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="#0a0a0f"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    Ready in 7 days
                  </span>
                  <span className="flex items-center gap-2 text-sm text-[#7a7a8a]">
                    <span className="w-4 h-4 bg-[#00e5a0] rounded-full flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="#0a0a0f"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    50% OFF now
                  </span>
                </div>
              </div>

              <div className="glass-card">
                <div className="flex justify-between items-center mb-5">
                  <span className="font-['Syne'] font-bold text-sm text-[#1e3a5f]">
                    AI Dashboard
                  </span>
                  <span className="status-badge status-badge-success flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#1a7a3a] rounded-full animate-pulse"></span>
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-[#f8f8fc] rounded-xl p-3 text-center">
                    <span className="font-['Syne'] font-extrabold text-2xl text-[#1e3a5f] block">
                      142
                    </span>
                    <span className="text-xs text-[#7a7a8a] mt-1 block">
                      Leads this week
                    </span>
                  </div>
                  <div className="bg-[#f8f8fc] rounded-xl p-3 text-center">
                    <span className="font-['Syne'] font-extrabold text-2xl text-[#1e3a5f] block">
                      98%
                    </span>
                    <span className="text-xs text-[#7a7a8a] mt-1 block">
                      Reply rate
                    </span>
                  </div>
                  <div className="bg-[#f8f8fc] rounded-xl p-3 text-center">
                    <span className="font-['Syne'] font-extrabold text-2xl text-[#1e3a5f] block">
                      £8.4k
                    </span>
                    <span className="text-xs text-[#7a7a8a] mt-1 block">
                      Revenue
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2.5 bg-[#f8f8fc] rounded-xl">
                    <div className="w-7 h-7 bg-[#eef3ff] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16v16H4z" stroke="#2a5cff" strokeWidth="1.5"/>
                        <path d="M4 8l8 6 8-6" stroke="#2a5cff" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[#1e3a5f] flex-1">
                      Email sent to Sarah M. — Audit inquiry
                    </span>
                    <span className="text-xs text-[#7a7a8a]">2m ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 bg-[#f8f8fc] rounded-xl">
                    <div className="w-7 h-7 bg-[#efffea] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="8" stroke="#1a7a3a" strokeWidth="1.5"/>
                        <path d="M9 12l2 2 4-4" stroke="#1a7a3a" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[#1e3a5f] flex-1">
                      Lead qualified — Plumbing Co. (Hot)
                    </span>
                    <span className="text-xs text-[#7a7a8a]">8m ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 bg-[#f8f8fc] rounded-xl">
                    <div className="w-7 h-7 bg-[#fff0f3] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#a3003a" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[#1e3a5f] flex-1">
                      Instagram DM auto-replied — @lux_cafe
                    </span>
                    <span className="text-xs text-[#7a7a8a]">12m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <div className="bg-[#1e3a5f] py-6 flex justify-center gap-8 flex-wrap">
          <div className="text-center text-white">
            <span className="font-['Syne'] font-extrabold text-2xl block">7</span>
            <span className="text-xs text-white/50">Days delivery</span>
          </div>
          <div className="text-center text-white">
            <span className="font-['Syne'] font-extrabold text-2xl block">50%</span>
            <span className="text-xs text-white/50">Off right now</span>
          </div>
          <div className="text-center text-white">
            <span className="font-['Syne'] font-extrabold text-2xl block">15+</span>
            <span className="text-xs text-white/50">Clients in 2025</span>
          </div>
          <div className="text-center text-white">
            <span className="font-['Syne'] font-extrabold text-2xl block">6</span>
            <span className="text-xs text-white/50">AI agents ready</span>
          </div>
          <div className="text-center text-white">
            <span className="font-['Syne'] font-extrabold text-2xl block">24/7</span>
            <span className="text-xs text-white/50">Always running</span>
          </div>
        </div>

        {/* SERVICES Section */}
        <section id="services" className="py-20">
          <div className="container">
            <p className="section-label text-[#2a5cff]">Services</p>
            <h2 className="section-title text-[#1e3a5f]">
              AI-powered tools
              <br />
              for local businesses
            </h2>
            <p className="section-sub text-[#1e40af]">
              Each agent is built specifically for your business and runs
              automatically from day one.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
              {/* Website Audit */}
              <div className="glass-card relative">
                <span className="status-badge status-badge-info absolute top-4 right-4">Most Popular</span>
                <div className="w-10 h-10 bg-[#eef3ff] rounded-xl flex items-center justify-center mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="#2a5cff" strokeWidth="1.5"/>
                    <path d="M16.5 16.5l4 4" stroke="#2a5cff" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="font-['Syne'] font-bold text-lg text-[#1e3a5f] mb-1">Website Audit</h3>
                <p className="text-sm text-[#1e40af] mb-4">AI-powered analysis with speed, SEO, security, and mobile checks. Full PDF report.</p>
                <ul className="space-y-1.5 mb-5">
                  {["Speed performance", "SEO analysis", "PDF report included"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#1e40af]">
                      <span className="w-3.5 h-3.5 bg-[#eef6ff] rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#2a5cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mb-4">
                  <span className="font-['Syne'] font-extrabold text-2xl text-[#1e3a5f]">£75</span>
                  <span className="text-sm text-[#7a7a8a] line-through ml-2">£150</span>
                </div>
                <a href="https://calendly.com/hello-newbotic/30min" target="_blank" className="block text-center bg-[#f8f8fc] text-[#1e3a5f] font-['Syne'] font-bold text-xs py-2.5 rounded-full border border-[#1e3a5f]/10 hover:bg-[#1e3a5f] hover:text-white transition">
                  Get Audit →
                </a>
              </div>

              {/* Email Marketing AI */}
              <div className="glass-card relative">
                <span className="status-badge status-badge-info absolute top-4 right-4">AI Agent</span>
                <div className="w-10 h-10 bg-[#efffea] rounded-xl flex items-center justify-center mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#1a7a3a" strokeWidth="1.5"/>
                    <path d="M2 8l10 7 10-7" stroke="#1a7a3a" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3 className="font-['Syne'] font-bold text-lg text-[#1e3a5f] mb-1">Email Marketing AI</h3>
                <p className="text-sm text-[#1e40af] mb-4">Automated campaigns that nurture leads and drive sales on autopilot.</p>
                <ul className="space-y-1.5 mb-5">
                  {["AI lead nurturing", "Smart follow-ups", "A/B testing"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#1e40af]">
                      <span className="w-3.5 h-3.5 bg-[#eef6ff] rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#2a5cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mb-4">
                  <span className="font-['Syne'] font-extrabold text-2xl text-[#1e3a5f]">£149</span>
                  <span className="text-xs text-[#7a7a8a] ml-1">/month</span>
                </div>
                <a href="https://calendly.com/hello-newbotic/30min" target="_blank" className="block text-center bg-[#f8f8fc] text-[#1e3a5f] font-['Syne'] font-bold text-xs py-2.5 rounded-full border border-[#1e3a5f]/10 hover:bg-[#1e3a5f] hover:text-white transition">
                  Get Email AI →
                </a>
              </div>

              {/* Web Page Creation */}
              <div className="glass-card relative">
                <span className="status-badge status-badge-best absolute top-4 right-4">Best Value</span>
                <div className="w-10 h-10 bg-[#f5f0ff] rounded-xl flex items-center justify-center mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6a3acf" strokeWidth="1.5"/>
                    <path d="M7 8h10M7 12h7" stroke="#6a3acf" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="font-['Syne'] font-bold text-lg text-[#1e3a5f] mb-1">Web Page Creation</h3>
                <p className="text-sm text-[#1e40af] mb-4">Professional custom-designed website built and live in 7 days.</p>
                <ul className="space-y-1.5 mb-5">
                  {["Custom design", "SEO optimized", "Mobile friendly"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#1e40af]">
                      <span className="w-3.5 h-3.5 bg-[#eef6ff] rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#2a5cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mb-4">
                  <span className="font-['Syne'] font-extrabold text-2xl text-[#1e3a5f]">£175</span>
                  <span className="text-sm text-[#7a7a8a] line-through ml-2">£350</span>
                </div>
                <a href="https://calendly.com/hello-newbotic/30min" target="_blank" className="block text-center bg-[#1e3a5f] text-white font-['Syne'] font-bold text-xs py-2.5 rounded-full hover:bg-[#1e40af] transition">
                  Create Website →
                </a>
              </div>

              {/* Social Media AI */}
              <div className="glass-card relative">
                <span className="status-badge status-badge-info absolute top-4 right-4">AI Agent</span>
                <div className="w-10 h-10 bg-[#fff0f3] rounded-xl flex items-center justify-center mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="2" width="14" height="20" rx="2" stroke="#a3003a" strokeWidth="1.5"/>
                    <circle cx="12" cy="17" r="1" fill="#a3003a"/>
                  </svg>
                </div>
                <h3 className="font-['Syne'] font-bold text-lg text-[#1e3a5f] mb-1">Social Media AI</h3>
                <p className="text-sm text-[#1e40af] mb-4">Auto-reply to comments and DMs on Instagram and Facebook 24/7.</p>
                <ul className="space-y-1.5 mb-5">
                  {["Auto DM replies", "Lead qualification", "Meeting scheduler"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#1e40af]">
                      <span className="w-3.5 h-3.5 bg-[#eef6ff] rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#2a5cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mb-4">
                  <span className="font-['Syne'] font-extrabold text-2xl text-[#1e3a5f]">£129</span>
                  <span className="text-xs text-[#7a7a8a] ml-1">/month</span>
                </div>
                <a href="https://calendly.com/hello-newbotic/30min" target="_blank" className="block text-center bg-[#f8f8fc] text-[#1e3a5f] font-['Syne'] font-bold text-xs py-2.5 rounded-full border border-[#1e3a5f]/10 hover:bg-[#1e3a5f] hover:text-white transition">
                  Get Social AI →
                </a>
              </div>

              {/* Lead Qualifier AI */}
              <div className="glass-card relative">
                <span className="status-badge status-badge-warning absolute top-4 right-4">AI Agent</span>
                <div className="w-10 h-10 bg-[#fffbea] rounded-xl flex items-center justify-center mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="5" stroke="#9a6500" strokeWidth="1.5"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9a6500" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="font-['Syne'] font-bold text-lg text-[#1e3a5f] mb-1">Lead Qualifier AI</h3>
                <p className="text-sm text-[#1e40af] mb-4">Score and prioritize leads automatically so you focus on the best ones.</p>
                <ul className="space-y-1.5 mb-5">
                  {["Lead scoring", "CRM integration", "Instant notifications"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#1e40af]">
                      <span className="w-3.5 h-3.5 bg-[#eef6ff] rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#2a5cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mb-4">
                  <span className="font-['Syne'] font-extrabold text-2xl text-[#1e3a5f]">£99</span>
                  <span className="text-xs text-[#7a7a8a] ml-1">/month</span>
                </div>
                <a href="https://calendly.com/hello-newbotic/30min" target="_blank" className="block text-center bg-[#f8f8fc] text-[#1e3a5f] font-['Syne'] font-bold text-xs py-2.5 rounded-full border border-[#1e3a5f]/10 hover:bg-[#1e3a5f] hover:text-white transition">
                  Get Qualifier AI →
                </a>
              </div>

              {/* AI Chatbot */}
              <div className="glass-card relative">
                <span className="status-badge status-badge-info absolute top-4 right-4">AI Agent</span>
                <div className="w-10 h-10 bg-[#e8f8ff] rounded-xl flex items-center justify-center mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#006fa3" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-['Syne'] font-bold text-lg text-[#1e3a5f] mb-1">AI Chatbot</h3>
                <p className="text-sm text-[#1e40af] mb-4">Custom chatbot trained on your business, live on your site and WhatsApp.</p>
                <ul className="space-y-1.5 mb-5">
                  {["Custom knowledge base", "WhatsApp / Telegram", "Lead capture"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#1e40af]">
                      <span className="w-3.5 h-3.5 bg-[#eef6ff] rounded-full flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#2a5cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mb-4">
                  <span className="font-['Syne'] font-extrabold text-2xl text-[#1e3a5f]">£119</span>
                  <span className="text-xs text-[#7a7a8a] ml-1">/month</span>
                </div>
                <a href="https://calendly.com/hello-newbotic/30min" target="_blank" className="block text-center bg-[#f8f8fc] text-[#1e3a5f] font-['Syne'] font-bold text-xs py-2.5 rounded-full border border-[#1e3a5f]/10 hover:bg-[#1e3a5f] hover:text-white transition">
                  Get Chatbot →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS Section */}
        <section id="process" className="py-20 bg-white">
          <div className="container">
            <p className="section-label text-[#2a5cff]">Process</p>
            <h2 className="section-title text-[#1e3a5f]">Up and running<br />in 4 simple steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 relative">
              <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#1e3a5f]/10 to-transparent -z-0"></div>
              {[
                { num: 1, title: "Discovery Call", desc: "15-min call to understand your business and goals. Same-day booking available." },
                { num: 2, title: "AI Analysis", desc: "Our AI agents analyse your requirements and create a custom plan." },
                { num: 3, title: "Build & Design", desc: "We build everything with regular updates. You see progress every step." },
                { num: 4, title: "Launch & Support", desc: "Live in 7 days. 30 days support included. 100% satisfaction guaranteed." }
              ].map((step) => (
                <div key={step.num} className="glass-card relative z-10">
                  <div className="w-10 h-10 bg-[#1e3a5f] text-white font-['Syne'] font-extrabold text-base rounded-full flex items-center justify-center mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-['Syne'] font-bold text-base text-[#1e3a5f] mb-1">{step.title}</h3>
                  <p className="text-sm text-[#1e40af] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20">
          <div className="container px-4">
            <div className="bg-[#1e3a5f] rounded-2xl md:rounded-3xl p-6 md:p-12 text-center">
              <h2 className="font-['Syne'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-[-0.025em] leading-tight break-words">
                Ready to automate your business?
              </h2>
              <p className="text-white/60 font-light mb-6 text-sm sm:text-base md:text-lg max-w-md mx-auto">
                Join 15+ UK businesses already running on AI. Limited spots at 50% off.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center max-w-sm mx-auto">
                <a href="https://calendly.com/hello-newbotic/30min" target="_blank" className="bg-white text-[#1e3a5f] font-['Syne'] font-bold text-sm px-6 py-3 rounded-full hover:bg-gray-100 transition text-center">
                  Book Free Strategy Call
                </a>
                <a href="https://wa.me/447891897558" target="_blank" className="bg-transparent text-white font-['Syne'] font-bold text-sm px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 transition text-center">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container max-w-3xl">
            <div className="text-center mb-10">
              <p className="section-label text-[#2a5cff]">Contact</p>
              <h2 className="section-title text-[#1e3a5f]">Start Your Project Today</h2>
              <p className="text-[#1e40af]">Book a call, WhatsApp, or fill the form — I&apos;ll reply within 24h</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              <a href="tel:+4407891897558" className="glass-card p-4 flex items-center justify-center gap-3 hover:border-[#1e3a5f] group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="1.5" className="group-hover:stroke-[#2a5cff] transition-colors">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="text-sm text-[#1e3a5f] group-hover:text-[#2a5cff] transition-colors">Call Us</span>
              </a>
              <a href="https://wa.me/447891897558" target="_blank" className="glass-card p-4 flex items-center justify-center gap-3 hover:border-[#1e3a5f] group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="1.5" className="group-hover:stroke-[#2a5cff] transition-colors">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2.05 22l5.32-1.4c1.45.79 3.08 1.21 4.77 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.9-9.91-9.9z"/>
                </svg>
                <span className="text-sm text-[#1e3a5f] group-hover:text-[#2a5cff] transition-colors">WhatsApp</span>
              </a>
              <a href="https://instagram.com/newbotic" target="_blank" className="glass-card p-4 flex items-center justify-center gap-3 hover:border-[#1e3a5f] group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="1.5" className="group-hover:stroke-[#2a5cff] transition-colors">
                  <rect x="2" y="2" width="20" height="20" rx="4" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="#1e3a5f" className="group-hover:fill-[#2a5cff] transition-colors" />
                </svg>
                <span className="text-sm text-[#1e3a5f] group-hover:text-[#2a5cff] transition-colors">@newbotic</span>
              </a>
              <a href="mailto:hello@newbotic.co.uk" className="glass-card p-4 flex items-center justify-center gap-3 hover:border-[#1e3a5f] group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3a5f" strokeWidth="1.5" className="group-hover:stroke-[#2a5cff] transition-colors">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="text-sm text-[#1e3a5f] group-hover:text-[#2a5cff] transition-colors">Email Us</span>
              </a>
            </div>
            <form id="contactForm" className="space-y-4">
              <input type="text" name="name" id="name" placeholder="Your name" required className="w-full p-4 rounded-xl bg-white border border-[#1e3a5f]/10 focus:outline-none focus:border-[#1e3a5f] transition" />
              <input type="email" name="email" id="email" placeholder="Your email" required className="w-full p-4 rounded-xl bg-white border border-[#1e3a5f]/10 focus:outline-none focus:border-[#1e3a5f] transition" />
              <label htmlFor="service" className="sr-only">Select a service</label>
              <select name="service" id="service" required aria-label="Select a service" className="w-full p-4 rounded-xl bg-white border border-[#1e3a5f]/10 focus:outline-none focus:border-[#1e3a5f] transition">
                <option value="">Select service</option>
                <option value="audit">Website Audit (£75)</option>
                <option value="email">Email Marketing AI (£149/mo)</option>
                <option value="website">Web Page Creation (£175)</option>
                <option value="social">Social Media AI (£129/mo)</option>
                <option value="leads">Lead Qualifier AI (£99/mo)</option>
                <option value="chatbot">AI Chatbot (£119/mo)</option>
              </select>
              <textarea name="message" id="message" placeholder="Tell me about your project..." rows={4} required className="w-full p-4 rounded-xl bg-white border border-[#1e3a5f]/10 focus:outline-none focus:border-[#1e3a5f] transition"></textarea>
              <button type="submit" id="submitBtn" className="w-full bg-[#1e3a5f] hover:bg-[#1e40af] text-white font-['Syne'] font-bold text-sm py-4 rounded-full transition">
                Send Message → I'll reply within 24h
              </button>
            </form>
          </div>
        </section>

        {/* Popup Modal */}
        <div id="popupMessage" className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 hidden transition-all duration-300">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-['Syne'] text-2xl font-bold text-[#1e3a5f] mb-2">Message Sent!</h3>
              <p className="text-[#1e40af] mb-6">Thank you for reaching out. I&apos;ll reply within 24 hours.</p>
              <button id="closePopup" className="bg-[#1e3a5f] hover:bg-[#1e40af] text-white font-['Syne'] font-bold text-sm px-8 py-2.5 rounded-full transition">
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Exit Intent Popup - Free Website Audit */}
        <div id="exitPopup" className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 hidden transition-all duration-300">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-[#1e3a5f]/10">
            <div className="text-center">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="font-['Syne'] text-2xl font-bold text-[#1e3a5f] mb-2">Wait! Get a Free Website Audit</h3>
              <p className="text-[#1e40af] mb-6">Enter your website URL and email. We'll send you a professional audit report in 60 seconds.</p>
              
              <form id="exitAuditForm" className="space-y-3">
                <input type="url" name="website" id="exitWebsite" placeholder="https://your-website.com" required className="w-full p-3 rounded-xl bg-[#f8f8fc] border border-[#1e3a5f]/10 text-[#1e3a5f] placeholder-[#7a7a8a] focus:outline-none focus:border-[#1e3a5f] transition" />
                <input type="email" name="email" id="exitEmail" placeholder="Your email" required className="w-full p-3 rounded-xl bg-[#f8f8fc] border border-[#1e3a5f]/10 text-[#1e3a5f] placeholder-[#7a7a8a] focus:outline-none focus:border-[#1e3a5f] transition" />
                <button type="submit" className="w-full bg-[#1e3a5f] hover:bg-[#1e40af] text-white font-['Syne'] font-bold text-sm py-3 rounded-full transition">
                  Get Free Audit Report →
                </button>
              </form>
              
              <p className="text-xs text-[#7a7a8a] mt-4">We'll analyze your site and send the report to your email. No spam.</p>
              
              <button id="closeExitPopup" className="absolute top-4 right-4 text-[#7a7a8a] hover:text-[#1e3a5f] transition">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatBotWrapper />

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
              if (!name || !email || !service || !message) { alert('Please fill in all fields.'); return; }
              const emailRegex = /^[^\\s@]+@([^\\s@]+\\.)+[^\\s@]+$/;
              if (!emailRegex.test(email)) { alert('Please enter a valid email address.'); return; }
              const originalText = submitBtn.innerHTML;
              submitBtn.innerHTML = 'Sending...';
              submitBtn.disabled = true;
              const formData = new FormData(form);
              try {
                const response = await fetch('https://formspree.io/f/mlgoapje', { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
                if (response.ok) { popup.classList.remove('hidden'); form.reset(); }
                else { alert('Something went wrong. Please email hello@newbotic.co.uk'); }
              } catch (error) { alert('Network error. Please try again or email hello@newbotic.co.uk'); }
              finally { submitBtn.innerHTML = originalText; submitBtn.disabled = false; }
            });
            if (closeBtn) { closeBtn.addEventListener('click', () => popup.classList.add('hidden')); }
            if (popup) { popup.addEventListener('click', (e) => { if (e.target === popup) popup.classList.add('hidden'); }); }
          })();
        `
      }} />

      {/* Exit Intent Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const popup = document.getElementById('exitPopup');
            const closeBtn = document.getElementById('closeExitPopup');
            const form = document.getElementById('exitAuditForm');
            let shown = false;
            
            document.addEventListener('mouseleave', function(e) {
              if (e.clientY < 0 && !shown && popup) {
                popup.classList.remove('hidden');
                shown = true;
              }
            });
            
            if (closeBtn) {
              closeBtn.addEventListener('click', function() {
                popup.classList.add('hidden');
              });
            }
            
            if (popup) {
              popup.addEventListener('click', function(e) {
                if (e.target === popup) {
                  popup.classList.add('hidden');
                }
              });
            }
            
            if (form) {
              form.addEventListener('submit', async function(e) {
                e.preventDefault();
                const website = document.getElementById('exitWebsite')?.value;
                const email = document.getElementById('exitEmail')?.value;
                const submitBtn = form.querySelector('button[type="submit"]');
                if (!website || !email) { alert('Please fill in all fields.'); return; }
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Analyzing...';
                submitBtn.disabled = true;
                try {
                  const response = await fetch('https://newbotic.app.n8n.cloud/webhook/exit-audit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ website, email })
                  });
                  if (response.ok) {
                    submitBtn.innerHTML = '✓ Report Sent!';
                    setTimeout(() => {
                      popup.classList.add('hidden');
                      form.reset();
                      submitBtn.innerHTML = originalText;
                      submitBtn.disabled = false;
                    }, 2000);
                  } else { throw new Error('Failed'); }
                } catch (error) {
                  alert('Something went wrong. Please try again.');
                  submitBtn.innerHTML = originalText;
                  submitBtn.disabled = false;
                }
              });
            }
          })();
        `
      }} />
    </>
  );
}