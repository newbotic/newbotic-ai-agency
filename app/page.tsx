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
                        href="https://calendly.com/hello-newbotic/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10 font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300"
                      >
                        📅 Book Free Strategy Call
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

              {/* VIDEO */}
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

        {/* Restul secțiunilor (AI Agents, Process, CTA) le păstrăm pe cele existente */}
      </main>
      <Footer />
      <ChatBotWrapper />
    </>
  );
}
