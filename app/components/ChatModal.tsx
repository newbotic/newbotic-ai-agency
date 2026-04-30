'use client';

import { useEffect } from 'react';
import ChatInterface from './ChatInterface';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  // Prevenim scroll în spate când modal e deschis
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-[500px] max-w-full m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#111115] rounded-xl border border-[#00f0ff]/30 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-lg flex items-center justify-center">
                <span className="font-black text-black text-sm">K</span>
              </div>
              <h3 className="text-white font-bold">KNEXA Chat</h3>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white text-xl transition"
            >
              ✕
            </button>
          </div>
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}