import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, Type } from "@google/genai";
import { AudioPlayer } from '../lib/audio-player';

const CONFIG = {
  model: "gemini-3.1-flash-live-preview",
  systemInstruction: `You are KNEXA, the voice assistant for Newbotic AI. You are friendly, helpful, and professional.

CRITICAL LANGUAGE RULE:
- You MUST respond in the SAME LANGUAGE as the user
- If user speaks English → respond in English
- If user speaks Romanian → respond in Romanian
- If user speaks Polish → respond in Polish
- If user speaks Spanish → respond in Spanish
- You can understand and speak ALL languages

Your capabilities:
- Answer questions about Newbotic AI agents
- Provide pricing information
- Help schedule appointments

RULES FOR BOOKING:
- When user says "book a call", "schedule appointment", "programează", "rezervă", you MUST ask for: name, date, time, AND email
- DO NOT proceed without email
- Call schedule_appointment ONLY after you have ALL FOUR: name, date, time, email

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
  const playerRef = useRef<AudioPlayer | null>(null);
  
  const isActiveRef = useRef(false);
  const isStartingRef = useRef(false);
  const isSessionReadyRef = useRef(false);

  const stop = useCallback(async () => {
    if (!isActiveRef.current) return;
    
    console.log('🛑 Stopping...');
    isActiveRef.current = false;
    isSessionReadyRef.current = false;
    setActive(false);
    
    // 1. Oprește worklet-ul imediat
    if (workletNodeRef.current) {
      workletNodeRef.current.port.onmessage = null;
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }
    
    // 2. Oprește sursa
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    
    // 3. Oprește player-ul
    if (playerRef.current) {
      await playerRef.current.stop();
      playerRef.current = null;
    }
    
    // 4. Închide AudioContext
    if (audioContextRef.current) {
      try {
        await audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
    
    // 5. Oprește microfonul
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // 6. Închide sesiunea
    if (sessionRef.current) {
      try {
        await sessionRef.current.close();
      } catch (e) {}
      sessionRef.current = null;
    }
    
    setVolume(0);
    console.log('✅ Stopped');
  }, []);

  const start = useCallback(async () => {
    // Prevenire start multiplu
    if (isActiveRef.current || isStartingRef.current) {
      console.log('Already starting or active');
      return;
    }
    
    isStartingRef.current = true;
    isSessionReadyRef.current = false;
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error('API key missing');
      
      // Inițializează player-ul
      playerRef.current = new AudioPlayer();
      
      // Conectează la Gemini
      const ai = new GoogleGenAI({ apiKey });
      
      console.log('Connecting to Gemini...');
      
      // Promise pentru a aștepta deschiderea conexiunii
      let resolveOpen: (value: void) => void;
      const openPromise = new Promise<void>((resolve) => {
        resolveOpen = resolve;
      });
      
      const session = await ai.live.connect({
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
            console.log('✅ Gemini connected');
            isSessionReadyRef.current = true;
            resolveOpen();
          },
          onmessage: async (message: any) => {
            if (!isActiveRef.current) return;
            
            // Audio playback
            const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audio && playerRef.current) {
              await playerRef.current.playChunk(audio);
            }
            
            // Transcript
            const userText = message.inputTranscription?.text;
            const modelText = message.outputTranscription?.text;
            
            if (userText) {
              setTranscript(prev => (prev + "\n👤 " + userText).slice(-1000));
            }
            if (modelText) {
              setTranscript(prev => (prev + "\n🤖 " + modelText).slice(-1000));
            }
            
            // Tool calls
            const toolCalls = message.toolCall?.functionCalls;
            if (toolCalls && toolCalls.length > 0 && sessionRef.current && isActiveRef.current) {
              for (const tool of toolCalls) {
                if (tool.name === 'schedule_appointment') {
                  try {
                    const res = await fetch('/api/book', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ ...tool.args, source: 'voice' })
                    });
                    const result = await res.json();
                    const reply = result.success 
                      ? `Booking confirmed for ${tool.args.name} on ${tool.args.date} at ${tool.args.time}. Email sent to ${tool.args.email}.`
                      : "Booking failed. Please try again.";
                    
                    if (sessionRef.current && isActiveRef.current) {
                      sessionRef.current.sendToolResponse({
                        functionResponses: [{
                          id: tool.id,
                          name: tool.name,
                          response: { result: reply }
                        }]
                      });
                    }
                  } catch (err) {
                    console.error('Tool error:', err);
                  }
                }
              }
            }
            
            // Interrupt
            if (message.serverContent?.interrupted) {
              await playerRef.current?.stop();
            }
          },
          onclose: (e: any) => {
            console.log('Gemini closed', e?.code, e?.reason);
            isSessionReadyRef.current = false;
            if (isActiveRef.current) {
              stop();
            }
          },
          onerror: (err: any) => {
            console.error('Gemini error:', err);
            isSessionReadyRef.current = false;
            stop();
          }
        }
      });
      
      sessionRef.current = session;
      
      // Așteaptă să fie deschisă conexiunea
      await openPromise;
      
      if (!isStartingRef.current || !isSessionReadyRef.current) {
        await session.close();
        return;
      }
      
      // Pornește microfonul
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!isStartingRef.current) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      
      const audioContext = new AudioContext({ sampleRate: CONFIG.sampleRate });
      const source = audioContext.createMediaStreamSource(stream);
      
      // Încarcă worklet-ul
      await audioContext.audioWorklet.addModule('/audio-processor.js');
      if (!isStartingRef.current) return;
      
      const workletNode = new AudioWorkletNode(audioContext, 'pcm-processor');
      
      // Salvează referințe
      streamRef.current = stream;
      audioContextRef.current = audioContext;
      sourceRef.current = source;
      workletNodeRef.current = workletNode;
      
      // Activează worklet-ul DOAR după ce sesiunea e gata
      const sessionForWorklet = session;
      
      workletNode.port.onmessage = (event) => {
        // Verificări: sesiunea trebuie să fie gata ȘI activă
        if (!isSessionReadyRef.current) return;
        if (!isActiveRef.current) return;
        if (!sessionForWorklet) return;
        
        const inputData = event.data;
        
        // Volum
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) {
          sum += inputData[i] * inputData[i];
        }
        setVolume(Math.sqrt(sum / inputData.length));
        
        // Conversie la PCM
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        
        // Trimite audio
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
        
        try {
          sessionForWorklet.sendRealtimeInput({
            audio: { data: base64Data, mimeType: "audio/pcm;rate=16000" }
          });
        } catch (err) {
          // La eroare, dezactivăm flag-ul
          if (err instanceof Error && err.message.includes('CLOSING')) {
            isSessionReadyRef.current = false;
          }
        }
      };
      
      // Conectează totul
      source.connect(workletNode);
      await audioContext.resume();
      
      // Activează flag-urile
      isActiveRef.current = true;
      setActive(true);
      isStartingRef.current = false;
      
      console.log('🎤 Fully started!');
      
    } catch (err) {
      console.error('Start failed:', err);
      isStartingRef.current = false;
      isSessionReadyRef.current = false;
      await stop();
    }
  }, [stop]);
  
  // Cleanup la unmount
  useEffect(() => {
    return () => {
      if (isActiveRef.current) {
        stop();
      }
    };
  }, [stop]);

  return { active, transcript, volume, start, stop };
}