import { useState, useCallback } from 'react';
import { AgentType, agents, detectIntent, canTransfer, getEscalationPath } from '../lib/agentRouter';

interface ConversationState {
  currentAgent: AgentType;
  history: AgentType[];
  intent: string;
  escalated: boolean;
}

export function useAgentRouter() {
  const [state, setState] = useState<ConversationState>({
    currentAgent: 'knexa',
    history: [],
    intent: '',
    escalated: false
  });
  
  const [messages, setMessages] = useState<Array<{role: string, content: string, agent?: string}>>([]);
  const [loading, setLoading] = useState(false);

  // Procesează mesajul și decide rutarea
  const processMessage = useCallback(async (text: string) => {
    setLoading(true);
    
    // Detectează intenția
    const intent = detectIntent(text);
    const intendedAgent = intent;
    
    // Adaugă mesajul utilizatorului
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    
    // Verifică dacă poate transfera
    let targetAgent = state.currentAgent;
    
    if (canTransfer(state.currentAgent, intendedAgent)) {
      targetAgent = intendedAgent;
      setState(prev => ({
        ...prev,
        currentAgent: targetAgent,
        history: [...prev.history, prev.currentAgent],
        intent: intendedAgent
      }));
      
      // Adaugă mesaj de transfer
      setMessages(prev => [...prev, {
        role: 'system',
        content: `🔄 Transferring to ${agents[targetAgent].name} (${agents[targetAgent].description})...`,
        agent: targetAgent
      }]);
    }
    
    // Apelează agentul corespunzător
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey });
      
      const agentPrompt = getAgentPrompt(targetAgent, text);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: agentPrompt,
      });
      
      const reply = response.text;
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: reply,
        agent: targetAgent
      }]);
      
      // Verifică dacă utilizatorul cere escaladare la om
      if (text.toLowerCase().includes('human') || text.toLowerCase().includes('operator') || 
          text.toLowerCase().includes('talk to person') || text.toLowerCase().includes('escalate')) {
        
        const escalationPath = getEscalationPath(targetAgent, 'human');
        
        if (escalationPath.includes('human')) {
          setMessages(prev => [...prev, {
            role: 'system',
            content: `⚠️ Escalating to Human Operator. Please wait...\n\nA human will respond shortly. This is a demo mode. In production, a live agent would be notified.`,
            agent: 'human'
          }]);
          setState(prev => ({ ...prev, escalated: true, currentAgent: 'human' }));
        }
      }
      
    } catch (error) {
      console.error('Agent error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        agent: targetAgent
      }]);
    } finally {
      setLoading(false);
    }
  }, [state.currentAgent]);
  
  const resetConversation = useCallback(() => {
    setState({
      currentAgent: 'knexa',
      history: [],
      intent: '',
      escalated: false
    });
    setMessages([]);
  }, []);
  
  return { messages, loading, currentAgent: state.currentAgent, processMessage, resetConversation };
}

function getAgentPrompt(agent: string, userMessage: string): string {
  const prompts: Record<string, string> = {
    sellix: `You are SELLIX, a professional sales AI agent for Newbotic AI. Your role is to qualify leads and help with sales.
User: ${userMessage}
Respond professionally, ask qualifying questions (budget, timeline, needs), and be persuasive.`,
    
    knexa: `You are KNEXA, a friendly customer support AI agent for Newbotic AI. Your role is to help users with problems and questions.
User: ${userMessage}
Respond helpfully, be empathetic, and solve issues.`,
    
    vyral: `You are VYRAL, a creative marketing AI agent. Your role is to help with social media content and marketing strategies.
User: ${userMessage}
Respond with creative ideas, content suggestions, and marketing tips.`,
    
    optimus: `You are OPTIMUS, a personal AI assistant. Your role is to manage calendars, tasks, and reminders.
User: ${userMessage}
Respond with task management, scheduling suggestions, and productivity tips.`,
    
    appo: `You are APPO, a booking AI agent. Your role is to schedule appointments and meetings.
User: ${userMessage}
Respond by asking for date, time, and details to book appointments.`,
    
    metrix: `You are METRIX, a business analytics AI agent. Your role is to provide insights and KPI analysis.
User: ${userMessage}
Respond with data-driven insights, business recommendations, and strategic advice.`,
    
    human: `[DEMO MODE] You are a Human Operator simulation. In production, this would trigger a real human.
User: ${userMessage}
Acknowledge the escalation and explain that a human will respond shortly.`
  };
  
  return prompts[agent] || prompts.knexa;
}
