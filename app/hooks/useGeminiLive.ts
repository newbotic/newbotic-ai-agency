import { useState, useCallback, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { AudioPlayer } from '../lib/audio-player';

const CONFIG = {
  model: "gemini-3.1-flash-live-preview",
  systemInstruction: `You are KNEXA, the AI voice assistant for Newbotic AI. You are friendly, helpful, and professional.

Your capabilities:
- Answer questions about Newbotic AI agents (SELLIX, KNEXA, VYRAL, OPTIMUS, METRIX, APPO)
- Provide pricing information
- Help schedule appointments

Rules:
- Be concise and natural for voice conversation
- Always be helpful and warm.`,
  voiceName: "Zephyr",
  sampleRate: 16000
};

export function useGeminiLive() {
  const [active, setActive] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [volume, setVolume] = useState(0);

  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const startedRef = useRef(false);
  const playerRef = useRef<AudioPlayer | null>(null);

  const stop = useCallback(async () => {
    setActive(false);
    setVolume(0);
    startedRef.current = false;
    
    if (playerRef.current) {
      await playerRef.current.stop();
      playerRef.current = null;
    }
    
    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }
    
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      await audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
  }, []);

  const start = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('NEXT_PUBLIC_GEMINI_API_KEY not configured');
      }
      
      playerRef.current = new AudioPlayer();
      
      const ai = new GoogleGenAI({ apiKey });

      const sessionPromise = ai.live.connect({
        model: CONFIG.model,
        config: { 
          systemInstruction: CONFIG.systemInstruction,
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: CONFIG.voiceName } }
          },
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            console.log('✅ Gemini Live connected');
            setActive(true);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              await playerRef.current?.playChunk(base64Audio);
            }

            const userText = (message as any).inputTranscription?.text;
            const modelText = (message as any).outputTranscription?.text;

            if (userText) {
              setTranscript(prev => (prev + "\nUser: " + userText).slice(-1500));
            }
            if (modelText) {
              setTranscript(prev => (prev + "\nKNEXA: " + modelText).slice(-1500));
            }

            if (message.serverContent?.interrupted) {
              await playerRef.current?.stop();
            }
          },
          onclose: () => {
            console.log('Gemini Live disconnected');
            stop();
          },
          onerror: (err) => {
            console.error("Gemini Live Error:", err);
            stop();
          }
        }
      });

      const session = await sessionPromise;
      sessionRef.current = session;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      audioContextRef.current = new AudioContext({ sampleRate: CONFIG.sampleRate });
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      await audioContextRef.current.audioWorklet.addModule('/audio-processor.js');
      const workletNode = new AudioWorkletNode(audioContextRef.current, 'pcm-processor');
      workletNodeRef.current = workletNode;
      
      workletNode.port.onmessage = (event) => {
        if (!sessionRef.current) return;
        
        const inputData = event.data;
        
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) {
          sum += inputData[i] * inputData[i];
        }
        setVolume(Math.sqrt(sum / inputData.length));
        
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
        session.sendRealtimeInput({
          audio: {
            data: base64Data,
            mimeType: "audio/pcm;rate=16000"
          }
        });
      };
      
      sourceRef.current.connect(workletNode);
      
    } catch (err) {
      console.error("Failed to start:", err);
      stop();
    }
  }, [stop]);

  return { active, transcript, volume, start, stop };
}
