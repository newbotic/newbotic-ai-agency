"use client";

import { useEffect, useState } from "react";

export default function ChatBotWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "👋 Hi! I'm Newbotic AI. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .futuristic-chat-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00f0ff, #b000ff);
        border: none;
        cursor: pointer;
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
        transition: all 0.3s ease;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
      }
      .futuristic-chat-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 0 30px rgba(0, 240, 255, 0.8);
      }
      .futuristic-chat-window {
        position: fixed;
        bottom: 100px;
        right: 20px;
        width: 380px;
        height: 500px;
        background: #111115;
        border: 1px solid rgba(0, 240, 255, 0.3);
        border-radius: 16px;
        box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 9998;
        backdrop-filter: blur(10px);
      }
      .futuristic-chat-header {
        background: linear-gradient(135deg, #00f0ff, #b000ff);
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .futuristic-chat-header h3 {
        color: #0a0a0f;
        font-family: 'Syne', sans-serif;
        font-weight: bold;
        margin: 0;
        font-size: 16px;
      }
      .futuristic-chat-header button {
        background: rgba(0,0,0,0.3);
        border: none;
        color: white;
        cursor: pointer;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        font-size: 16px;
      }
      .futuristic-chat-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .futuristic-chat-messages::-webkit-scrollbar { width: 4px; }
      .futuristic-chat-messages::-webkit-scrollbar-track { background: #1a1a22; }
      .futuristic-chat-messages::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #00f0ff, #b000ff); border-radius: 4px; }
      .message-user {
        align-self: flex-end;
        background: linear-gradient(135deg, #00f0ff, #b000ff);
        color: #0a0a0f;
        padding: 8px 12px;
        border-radius: 18px 18px 4px 18px;
        max-width: 80%;
        font-size: 14px;
      }
      .message-bot {
        align-self: flex-start;
        background: #1a1a22;
        border: 1px solid rgba(0, 240, 255, 0.2);
        color: #e0e0ff;
        padding: 8px 12px;
        border-radius: 18px 18px 18px 4px;
        max-width: 80%;
        font-size: 14px;
      }
      .futuristic-chat-input {
        display: flex;
        padding: 12px;
        gap: 8px;
        border-top: 1px solid rgba(0, 240, 255, 0.2);
        background: #0a0a0f;
      }
      .futuristic-chat-input input {
        flex: 1;
        background: #0a0a0f;
        border: 1px solid rgba(0, 240, 255, 0.3);
        border-radius: 12px;
        padding: 10px 12px;
        color: #e0e0ff;
        font-size: 14px;
        outline: none;
      }
      .futuristic-chat-input input::placeholder {
        color: #6b7280;
      }
      .futuristic-chat-input input:focus {
        border-color: #00f0ff;
        box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
      }
      .futuristic-chat-input button {
        background: linear-gradient(135deg, #00f0ff, #b000ff);
        border: none;
        border-radius: 12px;
        width: 44px;
        height: 40px;
        color: #0a0a0f;
        font-weight: bold;
        font-size: 18px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .futuristic-chat-input button:hover { transform: scale(1.02); }
      .futuristic-chat-input button:disabled { opacity: 0.5; cursor: not-allowed; }
      .loading-dots { display: flex; gap: 4px; padding: 8px 12px; }
      .loading-dots span {
        width: 8px;
        height: 8px;
        background: #00f0ff;
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out both;
      }
      .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
      .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
      @keyframes bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }
      @media (max-width: 480px) {
        .futuristic-chat-window {
          width: calc(100vw - 40px);
          right: 20px;
          left: 20px;
          height: 60vh;
        }
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput("");
    setIsLoading(true);
    setMessages(prev => [...prev, { text: "typing", isUser: false }]);

    try {
      // URL-ul tău real de la n8n
      const N8N_WEBHOOK_URL = "https://n8n-railway-production-7fd0.up.railway.app/webhook/324430ad-378e-4a17-869b-5bb061de7b45/chat";
      
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          sessionId: sessionId,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const botReply = data.reply || data.output || data.message || "Thanks for your message! I'll connect you with our team. Would you like to book a call?";
      
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { text: botReply, isUser: false };
        return newMessages;
      });
    } catch (error) {
      console.error("n8n chat error:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          text: "🔌 Connection issue. Please WhatsApp us at +44 7891 897558 or book a call via Calendly. Our team will reply within 2 hours.", 
          isUser: false 
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="futuristic-chat-btn" onClick={() => setIsOpen(!isOpen)}>💬</button>
      {isOpen && (
        <div className="futuristic-chat-window">
          <div className="futuristic-chat-header">
            <h3>🤖 Newbotic AI Assistant</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="futuristic-chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.isUser ? "message-user" : "message-bot"}>
                {msg.text === "typing" ? (
                  <div className="loading-dots"><span></span><span></span><span></span></div>
                ) : msg.text}
              </div>
            ))}
          </div>
          <div className="futuristic-chat-input">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === "Enter" && !isLoading && sendMessage()} 
              placeholder="Type your message..." 
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading}>
              {isLoading ? "⏳" : "→"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}