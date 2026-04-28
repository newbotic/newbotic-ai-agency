import { useState, useCallback, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage, Type } from "@google/genai";
import { AudioPlayer } from '../lib/audio-player';

const CONFIG = {
  model: "gemini-3.1-flash-live-preview",
  systemInstruction: `You are KNEXA, the voice assistant for Newbotic AI. You are friendly, helpful, and professional.

Your capabilities:
- Answer questions about Newbotic AI agents
- Provide pricing information
- Help schedule appointments

RULES FOR BOOKING:
- When user says "book a call" or "schedule appointment", you MUST ask for: name, date, time, AND email
- DO NOT proceed without email
- Ask for email after getting name, date, and time
- Call schedule_appointment ONLY after you have ALL FOUR: name, date, time, email

Example flow:
1. User: "book a call"
2. You: "What's your name?"
3. User: "John"
4. You: "What date works for you?"
5. User: "tomorrow"
6. You: "What time?"
7. User: "10am"
8. You: "What's your email address?"
9. User: "john@example.com"
10. Call schedule_appointment

Always be concise and natural for voice conversation.`,
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
          tools: [{
            functionDeclarations: [
              {
                name: "schedule_appointment",
                description: "Schedule an appointment. Call ONLY when you have name, date, time, AND email.",
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Customer full name" },
                    email: { type: Type.STRING, description: "Customer email address - REQUIRED" },
                    date: { type: Type.STRING, description: "Appointment date" },
                    time: { type: Type.STRING, description: "Appointment time" }
                  },
                  required: ["name", "email", "date", "time"]
                }
              }
            ]
          }]
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
              setTranscript(prev => (prev + "\n👤 " + userText).slice(-1500));
            }
            if (modelText) {
              setTranscript(prev => (prev + "\n🤖 " + modelText).slice(-1500));
            }

            if (message.toolCall?.functionCalls) {
              for (const toolCall of message.toolCall.functionCalls) {
                console.log('🔧 Tool call:', toolCall.name, toolCall.args);
                
                if (toolCall.name === 'schedule_appointment') {
                  const args = toolCall.args;
                  console.log('📅 Booking with email:', args.email);
                  
                  const response = await fetch('/api/book', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: args.name,
                      email: args.email,
                      date: args.date,
                      time: args.time,
                      source: 'voice'
                    })
                  });
                  const result = await response.json();
                  const reply = result.success 
                    ? `Booking confirmed for ${args.name} on ${args.date} at ${args.time}. A confirmation email has been sent to ${args.email}.` 
                    : "Booking failed. Please try again.";
                  
                  if (sessionRef.current) {
                    sessionRef.current.sendToolResponse({
                      functionResponses: [{
                        id: toolCall.id,
                        name: toolCall.name,
                        response: { result: reply }
                      }]
                    });
                  }
                }
              }
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
