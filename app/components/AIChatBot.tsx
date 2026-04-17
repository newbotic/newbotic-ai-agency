'use client';

import { useState } from 'react';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "👋 Hi! I'm the NewBotic AI assistant. How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "📊 Website Audit",
    "🌐 Web Creation",
    "💰 Pricing",
    "📅 Book Call"
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Adaugă mesajul utilizatorului
    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputValue('');
    setIsTyping(true);

    try {
      // API Key din variabila de mediu
      const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      if (!GEMINI_API_KEY) {
        console.error('❌ GEMINI_API_KEY is missing in .env.local');
        throw new Error('API key not configured');
      }
      
      console.log('🔑 Using Gemini API Key:', GEMINI_API_KEY.substring(0, 10) + '...');
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are NewBotic AI assistant, an AI automation agency for local businesses in the UK.

OUR SERVICES:
- Website Audit: £75 (50% off from £150) - AI-powered analysis with speed, SEO, security checks
- Email Marketing AI: £149/month - automated campaigns, smart follow-ups
- Web Page Creation: £175 (50% off from £350) - custom design, mobile friendly, SEO
- Social Media AI: £129/month - auto-reply to comments and DMs 24/7
- Lead Qualifier AI: £99/month - score and prioritize leads automatically
- AI Chatbot: £119/month - custom chatbot for website and WhatsApp
- AI Suite Complete: £499/month - all 6 agents together

Keep responses friendly, professional, and under 3 sentences. If asked something you don't know, say: "I'll have a team member reach out to you about that."

Customer question: ${text}`
              }]
            }]
          })
        }
      );
      
      const data = await response.json();
      
      // Verifică dacă există eroare
      if (data.error) {
        console.error('❌ Gemini API error:', data.error);
        throw new Error(`API Error: ${data.error.message}`);
      }
      
      // Verifică dacă răspunsul e valid
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const reply = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { text: reply, isUser: false }]);
      } else {
        console.error('❌ Unexpected response structure');
        throw new Error('Invalid response structure');
      }
      
    } catch (error) {
      console.error('❌ Chat error:', error);
      
      // Fallback la răspunsuri predefinite
      let response = "";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes("audit")) {
        response = "Our Website Audit service (50% OFF - £75) includes speed test, security check, SEO analysis, and mobile responsiveness. Would you like to book a free call?";
      } else if (lowerText.includes("website") || lowerText.includes("creation")) {
        response = "Our Web Page Creation service (50% OFF - £175) includes custom design, mobile optimization, SEO setup, and Google Analytics. Ready in 7 days!";
      } else if (lowerText.includes("price") || lowerText.includes("cost")) {
        response = "🎉 Limited 50% OFF offer:\n• Website Audit: £75 (was £150)\n• Web Creation: £175 (was £350)";
      } else if (lowerText.includes("book") || lowerText.includes("call")) {
        response = "Great! You can book a free 15-min call here: https://calendly.com/hello-newbotic/30min";
      } else {
        response = "Thanks for your message! Would you like to know about our Website Audit, Web Creation services, or book a free consultation call?";
      }
      
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Button - Navy Blue */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#1e3a5f] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:bg-[#1e40af] transition-all duration-300"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window - Light Theme with Navy Accents */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#1e3a5f]/10 overflow-hidden">
          {/* Header - Navy Blue */}
          <div className="bg-[#1e3a5f] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl">
                🤖
              </div>
              <div>
                <h3 className="font-['Syne'] font-bold text-white">NewBotic AI</h3>
                <p className="text-xs text-white/70">Online • Powered by Gemini</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-[#f8f8fc]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    msg.isUser
                      ? 'bg-[#2a5cff] text-white rounded-br-none'
                      : 'bg-white text-[#1e3a5f] rounded-bl-none border border-[#1e3a5f]/10'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-xl rounded-bl-none border border-[#1e3a5f]/10">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#1e3a5f]/40 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#1e3a5f]/40 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-[#1e3a5f]/40 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          <div className="p-2 bg-white border-t border-[#1e3a5f]/10 flex flex-wrap gap-1">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSendMessage(reply)}
                className="text-xs bg-[#f8f8fc] hover:bg-[#eef3ff] text-[#1e3a5f] px-3 py-1.5 rounded-full transition border border-[#1e3a5f]/10"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-[#1e3a5f]/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 bg-[#f8f8fc] border border-[#1e3a5f]/10 rounded-lg text-[#1e3a5f] text-sm focus:outline-none focus:border-[#2a5cff]"
                aria-label="Chat message"
              />
              <button
                type="submit"
                className="bg-[#1e3a5f] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                aria-label="Send message"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}