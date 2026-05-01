'use client';

import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBotWrapper from "./components/ChatBotWrapper";
import { supabase } from './lib/supabase/client';

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Navbar user={user} />
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
                  {!user ? (
                    <>
                      <a
                        href="/login"
                        className="bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-105"
                      >
                        Get Started →
                      </a>
                      <a
                        href="/login"
                        className="border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10 font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300"
                      >
                        Login
                      </a>
                    </>
                  ) : (
                    <a
                      href="/dashboard"
                      className="bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-105"
                    >
                      Go to Dashboard →
                    </a>
                  )}
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

              {/* RIGHT SIDE - AI Features Cards */}
              <div className="flex-1 lg:flex-1 max-w-md lg:max-w-md mx-auto lg:mx-0">
                <div className="grid gap-4">
                  <div className="bg-[#111115] border border-[#00f0ff]/20 rounded-xl p-4 hover:border-[#00f0ff]/50 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#00f0ff]/10 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🎤</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm">Voice Assistant</h3>
                        <p className="text-gray-400 text-xs">24/7 customer support</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#111115] border border-[#00f0ff]/20 rounded-xl p-4 hover:border-[#00f0ff]/50 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#00f0ff]/10 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📱</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm">Social Media AI</h3>
                        <p className="text-gray-400 text-xs">Auto-generate posts</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#111115] border border-[#00f0ff]/20 rounded-xl p-4 hover:border-[#00f0ff]/50 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#00f0ff]/10 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm">Smart Analytics</h3>
                        <p className="text-gray-400 text-xs">KPI tracking & insights</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#111115] border border-[#00f0ff]/20 rounded-xl p-4 hover:border-[#00f0ff]/50 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#00f0ff]/10 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🤖</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm">6 Specialised Agents</h3>
                        <p className="text-gray-400 text-xs">Sales, Support, Marketing & more</p>
                      </div>
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

        {/* AI AGENTS Section - British English */}
        <section id="agents" className="py-16 sm:py-20">
          <div className="container px-4 sm:px-6">
            <p className="text-[#00f0ff] text-xs sm:text-sm uppercase tracking-wider text-center mb-2">Meet Our AI Team</p>
            <h2 className="font-['Syne'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-3 sm:mb-4">
              Specialised AI agents
              <br />
              ready to work for you
            </h2>
            <p className="text-gray-400 text-sm sm:text-base text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
              Each agent is an expert in their field, working 24/7 to automate your business.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {agents.map((agent, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-[#111115] rounded-2xl p-5 sm:p-6 border border-[#00f0ff]/20 hover:border-[#00f0ff]/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#00f0ff]/10 rounded-xl flex items-center justify-center border border-[#00f0ff]/30">
                        <span className="text-xl sm:text-2xl">{agent.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-['Syne'] font-bold text-lg sm:text-xl text-white">{agent.name}</h3>
                        <p className="text-gray-400 text-xs">{agent.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-4">{agent.description}</p>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {agent.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-300">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBotWrapper />
    </>
  );
}

// AI Agents Data - British English
const agents = [
  {
    name: "SELLIX",
    icon: "👔",
    role: "Sales AI",
    description: "Your virtual sales representative that never sleeps.",
    features: [
      "Lead qualification", 
      "Automated follow-ups", 
      "Meeting scheduler",
      "🚀 Can close deals up to £500"
    ],
  },
  {
    name: "KNEXA",
    icon: "🛟",
    role: "Support AI",
    description: "Your 24/7 AI support agent. Learns from your documents.",
    features: ["Learns from PDFs & docs", "24/7 chat & WhatsApp", "Smart escalation"],
  },
  {
    name: "VYRAL",
    icon: "📣",
    role: "Marketing AI",
    description: "Your social media manager. Creates and schedules content.",
    features: ["Content creation", "Auto-reply to comments", "Hashtag optimisation"],
  },
  {
    name: "OPTIMUS",
    icon: "🧠",
    role: "Personal AI",
    description: "Your personal assistant. Manages calendar, tasks, emails.",
    features: ["Calendar management", "Email summaries", "Voice commands"],
  },
  {
    name: "METRIX",
    icon: "📊",
    role: "Business AI",
    description: "Your business manager. Analyses KPIs and provides insights.",
    features: ["KPI dashboard", "Anomaly detection", "Predictive analytics"],
  },
  {
    name: "APPO",
    icon: "📅",
    role: "Booking AI",
    description: "Your 24/7 booking assistant. Manages appointments.",
    features: ["24/7 booking", "Auto reminders", "Calendar sync"],
  },
];
