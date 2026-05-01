import { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function useChatAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setLoading(true);
    setMessages(prev => [...prev, {
      role: 'user',
      content: text,
      timestamp: new Date()
    }]);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error('API key missing');
      
      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `You are KNEXA, a helpful AI assistant.\n\nUser: ${text}\nAssistant:`,
      });

      const reply = response.text || "Sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: reply,
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => setMessages([]), []);

  return { messages, loading, sendMessage, clearMessages };
}
