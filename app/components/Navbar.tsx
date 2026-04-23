"use client";

import { useEffect, useState } from "react";

export default function ChatBotWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "👋 Hi! I'm Newbotic AI. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Style-uri pentru chat
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
      
      .futuristic-chat-messages::-webkit-scrollbar {
        width: 4px;
      }
      .futuristic-chat-messages::-webkit-scrollbar-track {
        background: #1a1a22;
      }
      .futuristic-chat-messages::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #00f0ff, #b000ff);
        border-radius: 4px;
      }
      
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
      
      .futuristic-chat-input button:hover {
        transform: scale(1.02);
      }
      
      .futuristic-chat-input button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      /* Loading dots animation */
      .loading-dots {
        display: flex;
        gap: 4px;
        padding: 8px 12px;
      }
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

    return () => {
      style.remove();
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput("");
    setIsLoading(true);

    // Adaugă un mesaj temporar de "typing"
    setMessages(prev => [...prev, { text: "typing", isUser: false }]);

    try {
      // Înlocuiește URL-ul cu webhook-ul tău din n8n
      const response = await fetch("https://YOUR-N8N-WEBHOOK-URL.com/webhook/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.filter(m => m.text !== "typing").slice(-5) // ultimele 5 mesaje
        }),
      });

      const data = await response.json();
      const botReply = data.reply || "Sorry, I didn't understand that. Could you please rephrase?";

      // Înlocuiește mesajul de "typing" cu răspunsul real
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { text: botReply, isUser: false };
        return newMessages;
      });
    } catch (error) {
      console.error("Chat error:", error);
      // Înlocuiește "typing" cu mesaj de eroare
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = { 
          text: "⚠️ Connection error. Please try again or WhatsApp us at +44 7891 897558", 
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
      <button
        className="futuristic-chat-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>
      
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
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  msg.text
                )}
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