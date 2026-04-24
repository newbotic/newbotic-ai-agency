'use client';

import { useState } from 'react';

export default function ChatBotWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "👋 Hi! I'm KNEXA, your AI assistant.\n\n💡 *Quick commands:*\n• `/book` - Schedule a call\n• `/help` - See all commands", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Stare pentru APPO
  const [mode, setMode] = useState<'general' | 'booking'>('general');
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({ name: '', date: '', time: '', email: '' });

  const routeIntent = (text: string): 'booking' | 'general' => {
    const lowerText = text.toLowerCase();
    if (lowerText === '/book' || lowerText === '/book call') return 'booking';
    if (lowerText.includes('programează') || lowerText.includes('rezervă') ||
        lowerText.includes('întâlnire') || lowerText.includes('meeting')) return 'booking';
    return 'general';
  };

  const handleBookingFlow = async (text: string) => {
    if (bookingStep === 1) {
      setBookingData({ ...bookingData, name: text });
      setMessages(prev => [...prev, { text: `✅ Got it! Your name is ${text}. What date works for you? (e.g., tomorrow, Friday, or 20 May)`, isUser: false }]);
      setBookingStep(2);
      return;
    }
    
    if (bookingStep === 2) {
      setBookingData({ ...bookingData, date: text });
      setMessages(prev => [...prev, { text: `📅 Date noted: ${text}. What time? (e.g., 10am, 14:30, or morning)`, isUser: false }]);
      setBookingStep(3);
      return;
    }
    
    if (bookingStep === 3) {
      setBookingData({ ...bookingData, time: text });
      setMessages(prev => [...prev, { text: `⏰ Time noted: ${text}. What's your email address for the calendar invite?`, isUser: false }]);
      setBookingStep(4);
      return;
    }
    
    if (bookingStep === 4) {
      setBookingData({ ...bookingData, email: text });
      setIsTyping(true);
      
      try {
        const response = await fetch('/api/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: bookingData.name,
            email: text,
            date: bookingData.date,
            time: bookingData.time
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          setMessages(prev => [...prev, { text: `🎉 *Booking confirmed!*\n\n📅 ${bookingData.date} at ${bookingData.time}\n👤 ${bookingData.name}\n📧 ${text}\n\nYou'll receive a calendar invite and a reminder 24h before.\n\nType anything to continue with general chat.`, isUser: false }]);
        } else {
          setMessages(prev => [...prev, { text: `❌ Booking failed. Please use Calendly: https://calendly.com/hello-newbotic/30min`, isUser: false }]);
        }
      } catch (error) {
        console.error('Booking error:', error);
        setMessages(prev => [...prev, { text: `🔌 Connection issue. Please book directly: https://calendly.com/hello-newbotic/30min`, isUser: false }]);
      }
      
      setMode('general');
      setBookingStep(0);
      setBookingData({ name: '', date: '', time: '', email: '' });
      setIsTyping(false);
      return;
    }
  };

  const handleGeneralChat = async (text: string) => {
    setIsTyping(true);
    
    try {
      const webhookUrl = 'https://n8n-railway-production-7fd0.up.railway.app/webhook/324430ad-378e-4a17-869b-5bb061de7b45/chat';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chatInput: text,
          sessionId: 'newbotic-chat'
        })
      });

      const data = await response.json();
      const assistantResponse = data.output || data.response || data.message || "Thanks for your message! How can I help?";
      
      setMessages(prev => [...prev, { text: assistantResponse, isUser: false }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        text: "🔌 Connection issue. Please WhatsApp us at +44 7891 897558 or book a call via Calendly.", 
        isUser: false 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputValue('');

    if (mode === 'booking') {
      await handleBookingFlow(text);
      return;
    }

    const intent = routeIntent(text);
    
    if (intent === 'booking') {
      setMode('booking');
      setBookingStep(1);
      setMessages(prev => [...prev, { text: "📅 *Let's schedule a call!*\n\nWhat's your name?", isUser: false }]);
      return;
    }

    await handleGeneralChat(text);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-[0_0_20px_#00f0ff] transition-all duration-300"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 max-h-[500px] bg-[#111115] rounded-2xl border border-[#00f0ff]/30 flex flex-col overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-[#00f0ff] to-[#b000ff] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-xl">🤖</div>
              <div>
                <h3 className="font-['Syne'] font-bold text-black">
                  {mode === 'booking' ? '📅 APPO - Booking' : 'KNEXA AI'}
                </h3>
                <p className="text-xs text-black/70">
                  {mode === 'booking' ? 'Setting up your call...' : 'Online • 24/7 Support'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0a0f] min-h-[300px] max-h-[350px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-wrap ${
                  msg.isUser
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black rounded-br-none'
                    : 'bg-[#1a1a22] text-gray-200 rounded-bl-none border border-[#00f0ff]/20'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a22] p-3 rounded-xl rounded-bl-none border border-[#00f0ff]/20">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#00f0ff]/60 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#00f0ff]/60 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-[#00f0ff]/60 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#111115] border-t border-[#00f0ff]/20">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={mode === 'booking' ? "Type your answer..." : "Type /book to schedule a call..."}
                className="flex-1 p-2 bg-[#0a0a0f] border border-[#00f0ff]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_10px_#00f0ff]"
                disabled={isTyping}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300"
                disabled={isTyping}
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
