'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Trash2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

type AgentType = 'sellix' | 'knexa' | 'vyral' | 'optimus' | 'appo' | 'metrix' | 'human';

const agents = {
  sellix: { name: 'SELLIX', role: 'Sales AI', icon: '👔', prompt: 'You are SELLIX, a professional sales AI. Help users with sales inquiries, lead qualification, and product information. Be persuasive and ask qualifying questions.' },
  knexa: { name: 'KNEXA', role: 'Support AI', icon: '🛟', prompt: 'You are KNEXA, a friendly customer support AI. Help users with problems, questions, and technical issues. Be helpful and empathetic.' },
  vyral: { name: 'VYRAL', role: 'Marketing AI', icon: '📣', prompt: 'You are VYRAL, a creative marketing AI. Help with social media content, marketing strategies, and brand promotion.' },
  optimus: { name: 'OPTIMUS', role: 'Personal AI', icon: '🧠', prompt: 'You are OPTIMUS, a personal AI assistant. Help with calendar management, tasks, reminders, and productivity.' },
  appo: { name: 'APPO', role: 'Booking AI', icon: '📅', prompt: 'You are APPO, a booking AI. Help schedule appointments, meetings, and manage calendars. Ask for date, time, and details.' },
  metrix: { name: 'METRIX', role: 'Supervisor AI', icon: '📊', prompt: 'You are METRIX, a business supervisor AI. Analyze KPIs, provide business insights, and handle complex escalations.' },
  human: { name: 'HUMAN', role: 'Live Operator', icon: '👤', prompt: '[ESCALATION] You are a human operator. Acknowledge that you are a real person and help resolve the issue.' }
};

// Cuvinte cheie pentru fiecare agent
const agentKeywords: Record<AgentType, string[]> = {
  sellix: ['buy', 'price', 'cost', 'purchase', 'sales', 'lead', 'quote', 'invest', 'subscription', 'plan'],
  knexa: ['help', 'support', 'problem', 'issue', 'error', 'broken', 'not working', 'fix', 'trouble'],
  vyral: ['post', 'social', 'marketing', 'content', 'ad', 'instagram', 'facebook', 'tiktok', 'hashtag'],
  optimus: ['calendar', 'task', 'reminder', 'schedule', 'todo', 'meeting', 'event', 'deadline'],
  appo: ['book', 'appointment', 'meeting', 'call with', 'reserve', 'schedule call', 'programare', 'rezervare'],
  metrix: ['business', 'kpi', 'analytics', 'report', 'metric', 'data', 'performance', 'dashboard', 'insight'],
  human: ['human', 'operator', 'person', 'real person', 'talk to human', 'agent', 'escalate', 'speak to human']
};

function detectIntent(message: string): AgentType {
  const lower = message.toLowerCase();
  
  // Verifică fiecare agent
  for (const [agent, keywords] of Object.entries(agentKeywords)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return agent as AgentType;
      }
    }
  }
  
  return 'knexa'; // default
}

export default function SmartChatInterface() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{role: string, content: string, agent?: string}>>([]);
  const [loading, setLoading] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<AgentType>('knexa');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processMessage = async (text: string) => {
    setLoading(true);
    
    // Adaugă mesajul utilizatorului
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    
    // Detectează intenția
    const intent = detectIntent(text);
    console.log('Intent detected:', intent);
    console.log('Current agent:', currentAgent);
    
    // Verifică dacă trebuie să facă transfer
    let targetAgent = currentAgent;
    let transferMessage = '';
    
    if (intent !== currentAgent) {
      targetAgent = intent;
      transferMessage = `🔄 Transferring from ${agents[currentAgent].name} to ${agents[targetAgent].name} (${agents[targetAgent].role})...`;
      setCurrentAgent(targetAgent);
      
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: transferMessage,
        agent: targetAgent 
      }]);
    }
    
    // Apelează Gemini cu agentul corect
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error('API key missing');
      
      const ai = new GoogleGenAI({ apiKey });
      
      // Construiește contextul conversației
      const conversationHistory = messages.slice(-5).map(m => 
        `${m.role === 'user' ? 'User' : agents[m.agent as AgentType]?.name || 'Assistant'}: ${m.content}`
      ).join('\n');
      
      const fullPrompt = `${agents[targetAgent].prompt}

Previous conversation:
${conversationHistory}

User: ${text}

${agents[targetAgent].name}:`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: fullPrompt,
      });
      
      const reply = response.text;
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: reply, 
        agent: targetAgent 
      }]);
      
    } catch (error) {
      console.error('Agent error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `🤖 ${agents[targetAgent].name} is currently unavailable. Please try again in a moment.`,
        agent: targetAgent 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const text = input;
    setInput('');
    await processMessage(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setCurrentAgent('knexa');
  };

  return (
    <div className="flex flex-col h-[550px] bg-[#111115]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-lg flex items-center justify-center">
            <span className="text-lg">{agents[currentAgent].icon}</span>
          </div>
          <div>
            <h3 className="text-white font-bold">{agents[currentAgent].name}</h3>
            <p className="text-[10px] text-gray-400">{agents[currentAgent].role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] text-gray-600 px-2 py-1 bg-gray-800 rounded">
            Current: {currentAgent.toUpperCase()}
          </span>
          <button onClick={resetConversation} className="text-gray-400 hover:text-red-400 transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <div className="text-4xl mb-3">🎮</div>
            <p className="text-sm">Hierarchical AI Agent System</p>
            <p className="text-xs mt-2">Try any of these commands:</p>
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">"I want to buy" → SELLIX</span>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">"I need support" → KNEXA</span>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">"Book appointment" → APPO</span>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">"Business report" → METRIX</span>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">"Talk to human" → HUMAN</span>
            </div>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : msg.role === 'system' ? 'justify-center' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg ${
              msg.role === 'user' ? 'bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black' :
              msg.role === 'system' ? 'bg-gray-800/50 text-gray-400 text-xs italic' : 'bg-gray-800 text-white'
            }`}>
              {msg.agent && msg.role === 'assistant' && (
                <div className="text-[10px] text-[#00f0ff] mb-1 flex items-center gap-1">
                  <span>{agents[msg.agent as AgentType]?.icon}</span>
                  <span>{msg.agent?.toUpperCase()}</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... Try 'Book appointment' or 'Talk to human'"
            className="flex-1 bg-black border border-gray-700 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#00f0ff]"
            rows={1}
            style={{ minHeight: '40px', maxHeight: '100px' }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black p-2 rounded-lg disabled:opacity-50 transition hover:opacity-90"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-600">
          <span>Enter to send</span>
          <div className="flex gap-3">
            <span className="text-[#00f0ff]">👔 Sellix</span>
            <span>→</span>
            <span className="text-[#00f0ff]">🛟 KNEWA</span>
            <span>→</span>
            <span className="text-[#00f0ff]">📊 Metrix</span>
            <span>→</span>
            <span className="text-yellow-400">👤 Human</span>
          </div>
        </div>
      </div>
    </div>
  );
}
