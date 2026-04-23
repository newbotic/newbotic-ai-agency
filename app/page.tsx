import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBotWrapper from "./components/ChatBotWrapper";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0a0a0f]">
        {/* HERO Section */}
        <section className="pt-28 pb-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="hero-badge bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
                  </span>
                  7 spots left this week
                </div>
                <h1 className="font-['Syne'] text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white mb-5">
                  AI that runs
                  <br />
                  your business
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b000ff]">
                    24/7
                  </span>
                </h1>
                <p className="text-lg text-gray-300 font-light leading-relaxed mb-8 max-w-md">
                  Your Business, On Autopilot — email automation, lead
                  qualification, social media AI. All running while you focus on
                  growth.
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  <a
                    href="https://calendly.com/hello-newbotic/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden group bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_#00f0ff]"
                  >
                    📅 Book Free Strategy Call
                  </a>
                  <a
                    href="https://wa.me/447891897558?text=Hi%2C%20I'm%20interested%20in%20your%20AI%20agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:shadow-[0_0_10px_#00f0ff] font-bold py-3 px-6 rounded-full transition-all duration-300"
                  >
                    💬 WhatsApp Us
                  </a>
                </div>
                <div className="flex flex-wrap gap-6">
                  {["15+ businesses", "Ready in 7 days", "50% OFF now"].map((text) => (
                    <span key={text} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="w-2 h-2 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]"></span>
                      {text}
                    </span>
                  ))}
                </div>
              </div>

              {/* VIDEO DEMO THUMBNAIL - futurist */}
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative glass-card-futuristic p-0 overflow-hidden rounded-xl bg-[#111115] border border-[#00f0ff]/20">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-[#111115] to-[#0a0a0f] h-64 rounded-t-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-3 animate-pulse">🤖</div>
                        <p className="text-sm font-medium text-[#00f0ff]">Demo Video</p>
                        <p className="text-xs text-gray-500 mt-1">See AI in action</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-16 h-16 bg-[#00f0ff] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_#00f0ff]">
                        <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-black ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-center border-t border-[#00f0ff]/10">
                    <p className="text-sm font-medium text-[#00f0ff]">Watch how it works →</p>
                    <p className="text-xs text-gray-500 mt-1">30-second demo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR - futurist */}
        <div className="bg-[#111115] border-y border-[#00f0ff]/10 py-6 flex justify-center gap-12 flex-wrap">
          {[
            { value: "7", label: "Days delivery" },
            { value: "50%", label: "Off right now" },
            { value: "15+", label: "Clients in 2025" },
            { value: "6", label: "AI agents" },
            { value: "24/7", label: "Always running" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-['Syne'] font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b000ff] block">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* MEET THE AI TEAM Section */}
        <section id="agents" className="py-20">
          <div className="container">
            <p className="text-[#00f0ff] text-sm uppercase tracking-wider text-center mb-2">Meet Our AI Team</p>
            <h2 className="font-['Syne'] text-4xl lg:text-5xl font-bold text-center text-white mb-4">
              Specialized AI agents
              <br />
              ready to work for you
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Each agent is an expert in their field, working 24/7 to automate your business.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {agents.map((agent, idx) => (
                <div key={agent.name} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-[#111115] rounded-2xl p-6 border border-[#00f0ff]/20 hover:border-[#00f0ff]/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-[#00f0ff]/10 rounded-xl flex items-center justify-center border border-[#00f0ff]/30">
                        <span className="text-2xl">{agent.icon}</span>
                      </div>
                      <span className="text-[10px] px-2 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                        {agent.badge}
                      </span>
                    </div>
                    <h3 className="font-['Syne'] font-bold text-xl text-white mb-2">{agent.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{agent.description}</p>
                    <ul className="space-y-2 mb-6">
                      {agent.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs text-gray-300">
                          <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full shadow-[0_0_6px_#00f0ff]"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mb-4">
                      <span className="font-['Syne'] font-extrabold text-3xl text-white">{agent.price}</span>
                      <span className="text-gray-500 ml-1">/month</span>
                    </div>
                    <a
                      href="https://calendly.com/hello-newbotic/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black font-bold text-sm py-3 rounded-full transition-all duration-300"
                    >
                      Hire {agent.name} →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS Section - futurist */}
        <section id="process" className="py-20 bg-[#0a0a0f]">
          <div className="container">
            <p className="text-[#00f0ff] text-sm uppercase tracking-wider text-center mb-2">Process</p>
            <h2 className="font-['Syne'] text-4xl lg:text-5xl font-bold text-center text-white mb-4">
              Up and running
              <br />
              in 4 simple steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { num: "01", title: "Discovery Call", desc: "15-min call to understand your business and goals." },
                { num: "02", title: "AI Analysis", desc: "Our AI agents analyse your requirements and create a custom plan." },
                { num: "03", title: "Build & Design", desc: "We build everything with regular updates." },
                { num: "04", title: "Launch & Support", desc: "Live in 7 days. 30 days support included." },
              ].map((step) => (
                <div key={step.num} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-2xl blur opacity-20 group-hover:opacity-100 transition"></div>
                  <div className="relative bg-[#111115] rounded-2xl p-6 border border-[#00f0ff]/20">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b000ff] mb-4">
                      {step.num}
                    </div>
                    <h3 className="font-['Syne'] font-bold text-xl text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - futurist */}
        <section className="py-20">
          <div className="container px-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-[#111115] rounded-3xl p-12 text-center border border-[#00f0ff]/20">
                <h2 className="font-['Syne'] text-3xl md:text-5xl font-bold text-white mb-4">
                  Ready to automate your business?
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Join 15+ UK businesses already running on AI. Limited spots at 50% off.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://calendly.com/hello-newbotic/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                  >
                    📅 Book Free Strategy Call
                  </a>
                  <a
                    href="https://wa.me/447891897558?text=Hi%2C%20I'm%20interested%20in%20your%20AI%20agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10 px-8 py-3 rounded-full transition-all duration-300"
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
    features: ["24/7 appointment booking", "Automatic reminders", "Calendar sync"],
  },
];