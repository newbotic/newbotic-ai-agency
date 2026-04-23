'use client';

import { useState } from 'react';

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "👋 Hi! I'm KNEXA, your AI support assistant. Ask me anything about the documents you've uploaded!", isUser: false }
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
      const assistantResponse = data.output || data.response || data.message || "I couldn't find that information in the documents.";
      
      setMessages(prev => [...prev, { text: assistantResponse, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having connection issues. Please try again in a moment.", 
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
        className="fixed bottom-6 right-6 z-[9999] bg-[#1e3a5f] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:bg-[#1e40af] transition-all duration-300"
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

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] w-80 sm:w-96 max-h-[80vh] bg-white rounded-2xl shadow-xl border border-[#1e3a5f]/10 flex flex-col overflow-hidden">
          <div className="bg-[#1e3a5f] p-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl">      
                🤖
              </div>
              <div>
                <h3 className="font-['Syne'] font-bold text-white">KNEXA AI</h3>
                <p className="text-xs text-white/70">Online • Usually replies instantly</p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-[#f8f8fc]">
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

          <div className="p-3 bg-white border-t border-[#1e3a5f]/10 shrink-0">
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