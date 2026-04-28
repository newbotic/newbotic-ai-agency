'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import VoiceAssistantModal from './VoiceAssistantModal';

export default function ChatBotWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "👋 *Hi! I'm KNEXA, your AI assistant.*\n\n• Click 📞 below to start a voice conversation\n• Or type your question\n• Say 'book a call' to schedule\n*Go ahead...* 🤖", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  
  const modeRef = useRef<'general' | 'booking'>('general');
  const bookingStepRef = useRef(0);
  const bookingDataRef = useRef({ name: '', date: '', time: '', email: '', availableSlots: [] as string[] });
  
  const [mode, setMode] = useState<'general' | 'booking'>('general');
  const [bookingStep, setBookingStep] = useState(0);
  const [bookingData, setBookingData] = useState({ name: '', date: '', time: '', email: '', availableSlots: [] as string[] });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [messages, isTyping]);

  const updateMode = (newMode: 'general' | 'booking') => {
    modeRef.current = newMode;
    setMode(newMode);
  };
  
  const updateBookingStep = (newStep: number) => {
    bookingStepRef.current = newStep;
    setBookingStep(newStep);
  };
  
  const updateBookingData = (newData: any) => {
    bookingDataRef.current = { ...bookingDataRef.current, ...newData };
    setBookingData(bookingDataRef.current);
  };
  
  const resetBooking = () => {
    modeRef.current = 'general';
    bookingStepRef.current = 0;
    bookingDataRef.current = { name: '', date: '', time: '', email: '', availableSlots: [] };
    setMode('general');
    setBookingStep(0);
    setBookingData({ name: '', date: '', time: '', email: '', availableSlots: [] });
  };

  const checkAvailability = async (date: string): Promise<string[]> => {
    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, duration: 30 })
      });
      const data = await response.json();
      return data.slots || ["10:00 AM", "2:00 PM", "4:00 PM"];
    } catch (error) {
      return ["10:00 AM", "2:00 PM", "4:00 PM"];
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendToN8n = async (text: string): Promise<string> => {
    try {
      const response = await fetch('https://n8n-railway-production-7fd0.up.railway.app/webhook/324430ad-378e-4a17-869b-5bb061de7b45/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: text, sessionId: 'newbotic-chat' })
      });
      const data = await response.json();
      return data.output || data.response || data.message || "Thanks for your message!";
    } catch {
      return "🔌 Connection issue. Please WhatsApp us at +44 7891 897558.";
    }
  };

  const handleBookingFlow = async (text: string) => {
    const currentStep = bookingStepRef.current;
    
    if (currentStep === 1) {
      updateBookingData({ name: text });
      setMessages(prev => [...prev, { text: `✅ Got it! What date works for you?`, isUser: false }]);
      updateBookingStep(2);
      return;
    }
    
    if (currentStep === 2) {
      const slots = await checkAvailability(text);
      updateBookingData({ date: text, availableSlots: slots });
      
      if (slots.length > 0) {
        setMessages(prev => [...prev, { text: `📅 Available slots: ${slots.join(', ')}\n\nWhich time works for you?`, isUser: false }]);
      } else {
        setMessages(prev => [...prev, { text: `😕 No available slots for ${text}. Try a different day?`, isUser: false }]);
      }
      updateBookingStep(3);
      return;
    }
    
    if (currentStep === 3) {
      updateBookingData({ time: text });
      setMessages(prev => [...prev, { text: `⏰ Time noted. What's your email address?`, isUser: false }]);
      updateBookingStep(4);
      return;
    }
    
    if (currentStep === 4) {
      updateBookingData({ email: text });
      setIsTyping(true);
      
      try {
        const response = await fetch('/api/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: bookingDataRef.current.name,
            email: text,
            date: bookingDataRef.current.date,
            time: bookingDataRef.current.time
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          setMessages(prev => [...prev, { text: `🎉 *Booking confirmed!*\n\n📅 ${bookingDataRef.current.date} at ${bookingDataRef.current.time}\n👤 ${bookingDataRef.current.name}`, isUser: false }]);
        } else {
          setMessages(prev => [...prev, { text: `❌ Booking failed. Please try voice 📞`, isUser: false }]);
        }
      } catch (error) {
        setMessages(prev => [...prev, { text: `🔌 Connection issue. Please try voice 📞`, isUser: false }]);
      }
      
      resetBooking();
      setIsTyping(false);
      return;
    }
  };

  const isBookingIntent = (text: string): boolean => {
    const lower = text.toLowerCase();
    return lower.includes('book') || lower.includes('call') || lower.includes('schedule');
  };

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    setMessages(prev => [...prev, { text, isUser: true }]);
    setInputValue('');
    setIsTyping(true);

    if (modeRef.current === 'booking') {
      await handleBookingFlow(text);
      setIsTyping(false);
      return;
    }

    if (isBookingIntent(text)) {
      updateMode('booking');
      updateBookingStep(1);
      setMessages(prev => [...prev, { text: "📅 *Let's schedule a call!*\n\nWhat's your name?", isUser: false }]);
      setIsTyping(false);
      return;
    }

    if (text.toLowerCase().includes('help')) {
      setMessages(prev => [...prev, { text: "📋 Commands: 'book a call', 'agents', 'pricing'", isUser: false }]);
      setIsTyping(false);
      return;
    }

    const response = await sendToN8n(text);
    setMessages(prev => [...prev, { text: response, isUser: false }]);
    setIsTyping(false);
  }, [isTyping]);

  // Voice recognition - fără dependențe problematice
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      
      if (SpeechRecognition && !recognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';
        
        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
          setTimeout(() => {
            if (transcript.trim()) {
              handleSendMessage(transcript);
            }
          }, 100);
        };
        
        recognitionInstance.onerror = () => setIsListening(false);
        recognitionInstance.onend = () => setIsListening(false);
        setRecognition(recognitionInstance);
      }
    }
  }, [recognition, handleSendMessage]);

  const startListening = () => {
    if (recognition) {
      setInputValue('');
      setIsListening(true);
      recognition.start();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 max-h-[550px] bg-[#111115] rounded-2xl border border-[#00f0ff]/30 flex flex-col overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-[#00f0ff] to-[#b000ff] p-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-xl">🤖</div>
              <div>
                <h3 className="font-['Syne'] font-bold text-black">
                  {mode === 'booking' ? '📅 APPO - Booking' : 'KNEXA AI'}
                </h3>
                <p className="text-xs text-black/70">
                  {mode === 'booking' ? 'Setting up...' : 'UK Support • 📞 Voice ready'}
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
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-[#111115] border-t border-[#00f0ff]/20 shrink-0">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type or use voice 📞..."
                className="flex-1 p-2 bg-[#0a0a0f] border border-[#00f0ff]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#00f0ff]"
                disabled={isTyping}
              />
              
              <button
                type="button"
                onClick={() => setIsVoiceModalOpen(true)}
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black hover:opacity-90 transition-all duration-300"
                title="Voice Conversation"
              >
                📞
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
      
      {isVoiceModalOpen && (
        <VoiceAssistantModal 
          isOpen={isVoiceModalOpen} 
          onClose={() => setIsVoiceModalOpen(false)} 
        />
      )}
    </>
  );
}
