'use client';

import { useState } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBotWrapper from "./components/ChatBotWrapper";
import VoiceAssistantModal from "./components/VoiceAssistantModal";
import ChatModal from "./components/ChatModal";
import MarketingModal from "./components/MarketingModal";

export default function Home() {
  // State pentru modal activ
  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f]">
        {/* HERO Section */}
        <section className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16">
          <div className="container px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              
              {/* TEXT - stânga */}
              <div className="flex-1 lg:flex-1">
                <div className="hero-badge bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm mb-4 sm:mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
                  </span>
                  7 spots left this week
                </div>
                
                <h1 className="font-['Syne'] font-extrabold text-white mb-4 sm:mb-5 leading-[1.2] tracking-[-0.02em]">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl block">
                    AI that runs
                  </span>
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl block mt-1">
                    your business
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-4xl sm:text-5xl md:text-6xl lg:text-7xl block mt-1">
                    24/7
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-6 sm:mb-8 max-w-md">
                  Your Business, On Autopilot — email automation, lead
                  qualification, social media AI. All running while you focus on
                  growth.
                </p>
                <div className="flex flex-wrap gap-3 mb-8 sm:mb-10">
                  <a
                    href="https://calendly.com/hello-newbotic/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_#00f0ff]"
                  >
                    📅 Book Free Strategy Call
                  </a>
                  <a
                    href="https://wa.me/447891897558?text=Hi%2C%20I'm%20interested%20in%20your%20AI%20agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:shadow-[0_0_10px_#00f0ff] font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300"
                  >
                    💬 WhatsApp Us
                  </a>
                </div>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {["15+ businesses", "Ready in 7 days", "50% OFF now"].map((text) => (
                    <span key={text} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]"></span>
                      {text}
                    </span>
                  ))}
                </div>
              </div>

              {/* VIDEO - micșorat și centrat */}
              <div className="flex-1 lg:flex-1 max-w-md lg:max-w-md mx-auto lg:mx-0">
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative overflow-hidden rounded-xl bg-[#111115] border border-[#00f0ff]/20">
                    <div className="bg-gradient-to-br from-[#111115] to-[#0a0a0f] h-40 sm:h-44 md:h-48 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl md:text-5xl mb-2 animate-pulse">🤖</div>
                        <p className="text-xs sm:text-sm font-medium text-[#00f0ff]">Demo Video</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">See AI in action</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00f0ff] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_#00f0ff]">
                        <div className="w-0 h-0 border-t-5 border-b-5 border-l-7 border-transparent border-l-black ml-1"></div>
                      </div>
                    </div>
                    <div className="p-2 sm:p-3 text-center border-t border-[#00f0ff]/10">
                      <p className="text-[10px] sm:text-xs font-medium text-[#00f0ff]">Watch how it works →</p>
                      <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">30-second demo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <div className="bg-[#111115] border-y border-[#00f0ff]/10 py-4 sm:py-6 flex justify-center gap-6 sm:gap-12 flex-wrap">
          {[
            { value: "7", label: "Days delivery" },
            { value: "50%", label: "Off right now" },
            { value: "15+", label: "Clients" },
            { value: "6", label: "AI agents" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-['Syne'] font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b000ff] block">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* MEET THE AI TEAM Section */}
        <section id="agents" className="py-16 sm:py-20">
          <div className="container px-4 sm:px-6">
            <p className="text-[#00f0ff] text-xs sm:text-sm uppercase tracking-wider text-center mb-2">Meet Our AI Team</p>
            <h2 className="font-['Syne'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-3 sm:mb-4">
              Specialized AI agents
              <br />
              ready to work for you
            </h2>
            <p className="text-gray-400 text-sm sm:text-base text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
              Each agent is an expert in their field, working 24/7 to automate your business.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {agents.map((agent) => (
                <div key={agent.name} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-[#111115] rounded-2xl p-5 sm:p-6 border border-[#00f0ff]/20 hover:border-[#00f0ff]/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00f0ff]/10 rounded-xl flex items-center justify-center border border-[#00f0ff]/30">
                        <span className="text-xl sm:text-2xl">{agent.icon}</span>
                      </div>
                      <span className="text-[8px] sm:text-[10px] px-2 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                        {agent.badge}
                      </span>
                    </div>
                    <h3 className="font-['Syne'] font-bold text-lg sm:text-xl text-white mb-2">{agent.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mb-4">{agent.description}</p>
                    <ul className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6">
                      {agent.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-300">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mb-4">
                      <span className="font-['Syne'] font-extrabold text-2xl sm:text-3xl text-white">{agent.price}</span>
                      <span className="text-gray-500 text-xs sm:text-sm ml-1">/month</span>
                    </div>
                    
                    {/* BUTON DIFERIT PENTRU FIECARE TIP DE AGENT */}
                    {agent.name === "KNEXA" && (
                      <button
                        onClick={() => openModal('knexa')}
                        className="w-full text-center border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-bold text-xs sm:text-sm py-2.5 sm:py-3 rounded-full transition-all duration-300"
                      >
                        🎤 Open KNEXA Voice →
                      </button>
                    )}
                    
                    {agent.name === "VYRAL" && (
                      <button
                        onClick={() => openModal('vyral')}
                        className="w-full text-center border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-bold text-xs sm:text-sm py-2.5 sm:py-3 rounded-full transition-all duration-300"
                      >
                        📱 Open VYRAL Marketing →
                      </button>
                    )}
                    
                    {(agent.name === "SELLIX" || agent.name === "OPTIMUS" || agent.name === "METRIX" || agent.name === "APPO") && (
                      <button
                        onClick={() => openModal('chat')}
                        className="w-full text-center border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-bold text-xs sm:text-sm py-2.5 sm:py-3 rounded-full transition-all duration-300"
                      >
                        💬 Chat with {agent.name} →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS Section */}
        <section id="process" className="py-16 sm:py-20 bg-[#0a0a0f]">
          <div className="container px-4 sm:px-6">
            <p className="text-[#00f0ff] text-xs sm:text-sm uppercase tracking-wider text-center mb-2">Process</p>
            <h2 className="font-['Syne'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-3 sm:mb-4">
              Up and running
              <br />
              in 4 simple steps
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
              {[
                { num: "01", title: "Discovery Call", desc: "15-min call to understand your business and goals." },
                { num: "02", title: "AI Analysis", desc: "Our AI agents analyse your requirements and create a custom plan." },
                { num: "03", title: "Build & Design", desc: "We build everything with regular updates." },
                { num: "04", title: "Launch & Support", desc: "Live in 7 days. 30 days support included." },
              ].map((step) => (
                <div key={step.num} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-2xl blur opacity-20 group-hover:opacity-100 transition"></div>
                  <div className="relative bg-[#111115] rounded-2xl p-5 sm:p-6 border border-[#00f0ff]/20">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b000ff] mb-3 sm:mb-4">
                      {step.num}
                    </div>
                    <h3 className="font-['Syne'] font-bold text-base sm:text-xl text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20">
          <div className="container px-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-[#111115] rounded-3xl p-8 sm:p-12 text-center border border-[#00f0ff]/20">
                <h2 className="font-['Syne'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                  Ready to automate your business?
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto">
                  Join 15+ UK businesses already running on AI. Limited spots at 50% off.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="https://calendly.com/hello-newbotic/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                  >
                    📅 Book Free Strategy Call
                  </a>
                  <a
                    href="https://wa.me/447891897558?text=Hi%2C%20I'm%20interested%20in%20your%20AI%20agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-300"
                  >
                    💬 Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBotWrapper />

      {/* MODALS */}
      <VoiceAssistantModal 
        isOpen={activeModal === 'knexa'} 
        onClose={closeModal} 
      />
      <ChatModal 
        isOpen={activeModal === 'chat'} 
        onClose={closeModal} 
      />
      <MarketingModal 
        isOpen={activeModal === 'vyral'} 
        onClose={closeModal} 
      />
    </>
  );
}

// AI Agents Data
const agents = [
  {
    name: "SELLIX",
    icon: "👔",
    badge: "Sales AI",
    price: "£149",
    description: "Your virtual sales representative that never sleeps.",
    features: ["Lead qualification", "Automated follow-ups", "Meeting scheduler"],
  },
  {
    name: "KNEXA",
    icon: "🛟",
    badge: "MOST POPULAR",
    price: "£119",
    description: "Your 24/7 AI support agent. Learns from your documents.",
    features: ["Learns from PDFs & docs", "24/7 chat & WhatsApp", "Smart escalation"],
  },
  {
    name: "VYRAL",
    icon: "📣",
    badge: "Marketing AI",
    price: "£129",
    description: "Your social media manager. Creates and schedules content.",
    features: ["Content creation", "Auto-reply to comments", "Hashtag optimization"],
  },
  {
    name: "OPTIMUS",
    icon: "🧠",
    badge: "Personal AI",
    price: "£99",
    description: "Your personal assistant. Manages calendar, tasks, emails.",
    features: ["Calendar management", "Email summaries", "Voice commands"],
  },
  {
    name: "METRIX",
    icon: "📊",
    badge: "Business AI",
    price: "£199",
    description: "Your business manager. Analyzes KPIs and provides insights.",
    features: ["KPI dashboard", "Anomaly detection", "Predictive analytics"],
  },
  {
    name: "APPO",
    icon: "📅",
    badge: "Booking AI",
    price: "£129",
    description: "Your 24/7 booking assistant. Manages appointments.",
    features: ["24/7 booking", "Auto reminders", "Calendar sync"],
  },
];