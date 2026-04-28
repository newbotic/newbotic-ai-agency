'use client';

import { useState, useEffect } from 'react';
import { useGeminiLive } from '../hooks/useGeminiLive';
import { Mic, MicOff, Terminal, X } from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  // initialMessage este opțional, nu afectează funcționalitatea
  initialMessage?: string | null;
}

export default function VoiceAssistantModal({ isOpen, onClose, initialMessage }: VoiceAssistantModalProps) {
  const { active, transcript, volume, start, stop } = useGeminiLive();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (isOpen && !active && !isConnecting) {
      setIsConnecting(true);
      start().finally(() => setIsConnecting(false));
    }
    
    if (!isOpen && active) {
      stop();
    }
    
    return () => {
      if (active) {
        stop();
      }
    };
  }, [isOpen, active, isConnecting, start, stop]);

  const volumePercent = Math.min(100, volume * 200);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111115] rounded-2xl border border-[#00f0ff]/30 p-6 w-96 max-w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-xl flex items-center justify-center">
              <span className="font-black text-xl text-black">K</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">KNEXA Voice</h3>
              <p className="text-xs text-gray-500">
                {active ? '🟢 Connected' : isConnecting ? '🟡 Connecting...' : '⚫ Disconnected'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00f0ff] to-[#b000ff] transition-all duration-100"
              style={{ width: `${volumePercent}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-500 text-center mt-1">Voice level</p>
        </div>

        <div className="bg-black/30 rounded-lg p-3 mb-3 min-h-[120px] max-h-40 overflow-y-auto border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-3 h-3 text-[#00f0ff]" />
            <span className="text-[9px] text-gray-500 uppercase tracking-wider">Live Transcript</span>
          </div>
          <p className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
            {transcript || (active ? "Listening... Speak now" : "Press Start to speak")}
          </p>
        </div>

        <button
          onClick={active ? stop : () => start()}
          disabled={isConnecting}
          className={`w-full py-3 rounded-full font-bold transition-all flex items-center justify-center gap-2 ${
            active 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black hover:opacity-90'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {active ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {active ? 'Stop Conversation' : 'Start Voice Conversation'}
        </button>
      </div>
    </div>
  );
}
