'use client';

import { useState } from 'react';

export default function ChatBotWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "👋 Hi! I'm KNEXA, your AI support assistant. How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputValue('');
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
      const assistantResponse = data.output || data.response || data.message || "Thanks for your message! Our team will contact you shortly.";
      
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
                <h3 className="font-['Syne'] font-bold text-black">KNEXA AI</h3>
                <p className="text-xs text-black/70">Online • 24/7 Support</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0a0f] min-h-[300px] max-h-[350px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
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
                placeholder="Type your message..."
                className="flex-1 p-2 bg-[#0a0a0f] border border-[#00f0ff]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_10px_#00f0ff]"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300"
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