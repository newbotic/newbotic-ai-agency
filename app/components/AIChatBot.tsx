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
    
    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes("audit")) {
        response = "Our Website Audit service (50% OFF - £75) includes speed test, security check, SEO analysis, and mobile responsiveness. Would you like to book a free call?";
      } else if (lowerText.includes("website") || lowerText.includes("creation")) {
        response = "Our Web Page Creation service (50% OFF - £175) includes custom design, mobile optimization, SEO setup, and Google Analytics. Ready in 7 days!";
      } else if (lowerText.includes("price") || lowerText.includes("cost")) {
        response = "🎉 Limited 50% OFF offer:\n• Website Audit: £75 (was £150)\n• Web Creation: £175 (was £350)\n• Combo: £225 (was £500)";
      } else if (lowerText.includes("book") || lowerText.includes("call")) {
        response = "Great! You can book a free 15-min call here: https://calendly.com/hello-newbotic/30min";
      } else {
        response = "Thanks for your message! Would you like to know about our Website Audit, Web Creation services, or book a free consultation call?";
      }
      
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse-glow"
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

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-white">NewBotic AI</h3>
                <p className="text-xs text-white/80">Online • Usually replies instantly</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-800">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    msg.isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-700 text-white rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700 p-3 rounded-xl rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          <div className="p-2 bg-slate-850 border-t border-slate-700 flex flex-wrap gap-1">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSendMessage(reply)}
                className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-full transition"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-900 border-t border-slate-700">
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
                className="flex-1 p-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
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