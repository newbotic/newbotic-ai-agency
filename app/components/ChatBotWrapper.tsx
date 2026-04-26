'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatBotWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "👋 *Hi! I'm KNEXA, your AI assistant.*\n\n💡 *I understand natural language!*\n\n• Ask me anything about Newbotic AI\n• Just say 'book a call' or 'schedule meeting'\n• Type 'help' to see what I can do\n• Click the 🎙️ button to use voice!\n\n*Go ahead, ask me anything...* 🤖", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Voice input states
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  
  const [mode, setMode] = useState<'general' | 'booking'>('general');
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({ name: '', date: '', time: '', email: '' });
  
  // Ref pentru scroll automat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automat la ultimul mesaj
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize voice recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'ro-RO';
        
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };
        
        recognitionInstance.onerror = () => {
          setIsListening(false);
        };
        
        recognitionInstance.onend = () => {
          setIsListening(false);
        };
        
        setRecognition(recognitionInstance);
      }
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  // Detect booking intent from natural language
  const isBookingIntent = (text: string): boolean => {
    const lower = text.toLowerCase();
    const keywords = [
      'book', 'booking', 'appointment', 'schedule', 'meeting', 'call',
      'programare', 'programeaza', 'rezervare', 'rezerva', 'intalnire'
    ];
    return keywords.some(k => lower.includes(k));
  };

  // Detect help intent
  const isHelpIntent = (text: string): boolean => {
    const lower = text.toLowerCase();
    const keywords = ['help', 'commands', 'what can you do', 'how to use', 'guide'];
    return keywords.some(k => lower.includes(k));
  };

  // Detect agents intent
  const isAgentsIntent = (text: string): boolean => {
    const lower = text.toLowerCase();
    const keywords = ['agents', 'ai team', 'what agents', 'list agents', 'sellix', 'knexa', 'vyral', 'optimus', 'metrix', 'appo'];
    return keywords.some(k => lower.includes(k));
  };

  // Detect pricing intent
  const isPricingIntent = (text: string): boolean => {
    const lower = text.toLowerCase();
    const keywords = ['price', 'pricing', 'cost', 'how much', '£', 'pounds', 'monthly'];
    return keywords.some(k => lower.includes(k));
  };

  const handleBookingFlow = async (text: string) => {
    if (bookingStep === 1) {
      setBookingData({ ...bookingData, name: text });
      setMessages(prev => [...prev, { text: `✅ Got it! What date works for you? (e.g., tomorrow, Friday, 20 May)`, isUser: false }]);
      setBookingStep(2);
      return;
    }
    
    if (bookingStep === 2) {
      setBookingData({ ...bookingData, date: text });
      setMessages(prev => [...prev, { text: `📅 Date noted: ${text}. What time? (e.g., 10am, 14:30)`, isUser: false }]);
      setBookingStep(3);
      return;
    }
    
    if (bookingStep === 3) {
      setBookingData({ ...bookingData, time: text });
      setMessages(prev => [...prev, { text: `⏰ Time noted: ${text}. What's your email address?`, isUser: false }]);
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
          setMessages(prev => [...prev, { text: `🎉 *Booking confirmed!*\n\n📅 ${bookingData.date} at ${bookingData.time}\n👤 ${bookingData.name}\n📧 ${text}\n\nYou'll receive a calendar invite.\n\nType anything to continue.`, isUser: false }]);
        } else {
          setMessages(prev => [...prev, { text: `❌ Booking failed. Please use Calendly: https://calendly.com/hello-newbotic/30min`, isUser: false }]);
        }
      } catch (error) {
        setMessages(prev => [...prev, { text: `🔌 Connection issue. Please book directly: https://calendly.com/hello-newbotic/30min`, isUser: false }]);
      }
      
      setMode('general');
      setBookingStep(0);
      setBookingData({ name: '', date: '', time: '', email: '' });
      setIsTyping(false);
      return;
    }
  };

  const sendToN8n = async (text: string): Promise<string> => {
    try {
      const webhookUrl = 'https://n8n-railway-production-7fd0.up.railway.app/webhook/324430ad-378e-4a17-869b-5bb061de7b45/chat';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: text, sessionId: 'newbotic-chat' })
      });
      const data = await response.json();
      return data.output || data.response || data.message || "Thanks for your message! How can I help?";
    } catch (error) {
      return "🔌 Connection issue. Please WhatsApp us at +44 7891 897558.";
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputValue('');
    setIsTyping(true);

    // Handle booking flow
    if (mode === 'booking') {
      await handleBookingFlow(text);
      setIsTyping(false);
      return;
    }

    // Detect help intent
    if (isHelpIntent(text)) {
      setMessages(prev => [...prev, { 
        text: "📋 *What I can do for you:*\n\n" +
          "• Ask me about our AI agents (e.g., 'What is SELLIX?')\n" +
          "• Ask about pricing (e.g., 'How much does KNEXA cost?')\n" +
          "• Schedule a call (e.g., 'book a call', 'schedule meeting')\n" +
          "• General questions about Newbotic AI\n\n" +
          "💬 You can also WhatsApp us at +44 7891 897558\n" +
          "📧 Email: hello@newbotic.co.uk",
        isUser: false 
      }]);
      setIsTyping(false);
      return;
    }

    // Detect agents intent
    if (isAgentsIntent(text)) {
      setMessages(prev => [...prev, { 
        text: "🤖 *Our AI Agents Team*\n\n" +
          "• **SELLIX** (£149/mo) - Sales AI: Lead qualification, follow-ups\n" +
          "• **KNEXA** (£119/mo) - Support AI: Learns from docs, 24/7 chat\n" +
          "• **VYRAL** (£129/mo) - Marketing AI: Content creation, scheduling\n" +
          "• **OPTIMUS** (£99/mo) - Personal AI: Calendar, tasks, emails\n" +
          "• **METRIX** (£199/mo) - Business AI: KPIs, analytics, reports\n" +
          "• **APPO** (£129/mo) - Booking AI: Appointments, reminders\n\n" +
          "Want to hire an agent? Just say 'book a call'!",
        isUser: false 
      }]);
      setIsTyping(false);
      return;
    }

    // Detect pricing intent
    if (isPricingIntent(text)) {
      setMessages(prev => [...prev, { 
        text: "💰 *Pricing Plans*\n\n" +
          "• **SELLIX** - £149/month\n" +
          "• **KNEXA** - £119/month *(Most Popular!)*\n" +
          "• **VYRAL** - £129/month\n" +
          "• **OPTIMUS** - £99/month\n" +
          "• **METRIX** - £199/month\n" +
          "• **APPO** - £129/month\n\n" +
          "🎉 *Special offer:* 50% OFF your first month!\n\n" +
          "To get started, just say 'book a call' for a free consultation!",
        isUser: false 
      }]);
      setIsTyping(false);
      return;
    }

    // Detect booking intent - start APPO flow
    if (isBookingIntent(text)) {
      setMode('booking');
      setBookingStep(1);
      setMessages(prev => [...prev, { text: "📅 *Let's schedule a call!*\n\nWhat's your name?", isUser: false }]);
      setIsTyping(false);
      return;
    }

    // General chat - send to KNEXA (n8n)
    const response = await sendToN8n(text);
    setMessages(prev => [...prev, { text: response, isUser: false }]);
    setIsTyping(false);
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
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 max-h-[550px] bg-[#111115] rounded-2xl border border-[#00f0ff]/30 flex flex-col overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00f0ff] to-[#b000ff] p-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-xl">🤖</div>
              <div>
                <h3 className="font-['Syne'] font-bold text-black">
                  {mode === 'booking' ? '📅 APPO - Booking' : 'KNEXA AI'}
                </h3>
                <p className="text-xs text-black/70">
                  {mode === 'booking' ? 'Setting up your call...' : 'UK Support • 24/7 • 🎙️ Voice ready'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages with auto-scroll */}
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
            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Field with Voice Button */}
          <div className="p-3 bg-[#111115] border-t border-[#00f0ff]/20 shrink-0">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={mode === 'booking' ? "Type your answer..." : "Ask me anything..."}
                className="flex-1 p-2 bg-[#0a0a0f] border border-[#00f0ff]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_10px_#00f0ff]"
                disabled={isTyping}
              />
              
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={startListening}
                disabled={isListening || !recognition}
                className={`w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-[#1a1a22] border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/10'
                }`}
                title="Voice input (click and speak)"
              >
                {isListening ? '🎤' : '🎙️'}
              </button>
              
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