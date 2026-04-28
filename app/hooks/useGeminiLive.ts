import { useState, useCallback, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { AudioPlayer } from '../lib/audio-player';

const CONFIG = {
  model: "gemini-3.1-flash-live-preview",
  systemInstruction: `You are KNEXA, the AI voice assistant for Newbotic AI. You are friendly, helpful, and professional.

## YOUR CAPABILITIES:
- Answer questions about Newbotic AI agents (SELLIX, KNEXA, VYRAL, OPTIMUS, METRIX, APPO)
- Provide pricing information
- Book appointments using the schedule_appointment function
- Check document knowledge base for company info
- Escalate to human when user requests

## WHEN TO USE TOOLS:

1. **schedule_appointment** - Call this when user wants to book a call/appointment
   - Required: name, date, time
   - Optional: email, phone, reason

2. **escalate_to_human** - Call this when:
   - User says "talk to a human", "operator", "real person", "speak to someone"
   - User is frustrated or angry
   - User asks for something you cannot help with

## RULES:
- Be concise and natural for voice conversation
- After booking, confirm the details
- If user asks about company documents, use your knowledge base
- Always be helpful and warm

## KNOWLEDGE BASE:
- You have access to company documents in Google Drive
- Use this information to answer questions about Newbotic

## CONTACT INFO:
- WhatsApp: +44 7891 897558
- Email: hello@newbotic.co.uk
- Calendly: https://calendly.com/hello-newbotic/30min`,
  voiceName: "Zephyr",
  sampleRate: 16000
};

// Funcția pentru booking (APPO)
async function handleBooking(args: any) {
  try {
    const response = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: args.name,
        email: args.email || 'customer@example.com',
        date: args.date,
        time: args.time,
        phone: args.phone || '',
        notes: args.reason || 'Booking via voice'
      })
    });
    
    const result = await response.json();
    return result.success ? `Booking confirmed for ${args.date} at ${args.time}` : 'Booking failed';
  } catch (error) {
    console.error('Booking error:', error);
    return 'There was an issue with booking. Please try again or use Calendly.';
  }
}

// Funcția pentru escalare la om
async function handleEscalation(reason: string) {
  try {
    await fetch('/api/escalate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reason: reason,
        timestamp: new Date().toISOString(),
        source: 'Gemini Live Voice'
      })
    });
    
    return "I'm connecting you with a human agent right now. They will contact you shortly via WhatsApp or email.";
  } catch (error) {
    console.error('Escalation error:', error);
    return "I'll have someone contact you as soon as possible. Please WhatsApp us at +44 7891 897558 for immediate assistance.";
  }
}

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
                description: "Schedule an appointment in Google Calendar",
                parameters: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING", description: "Customer full name" },
                    email: { type: "STRING", description: "Customer email address" },
                    date: { type: "STRING", description: "Appointment date (YYYY-MM-DD)" },
                    time: { type: "STRING", description: "Appointment time (HH:MM)" },
                    phone: { type: "STRING", description: "Customer phone number" },
                    reason: { type: "STRING", description: "Reason for appointment" }
                  },
                  required: ["name", "date", "time"]
                }
              },
              {
                name: "escalate_to_human",
                description: "Escalate conversation to a human agent",
                parameters: {
                  type: "OBJECT",
                  properties: {
                    reason: { type: "STRING", description: "Reason for escalation" }
                  },
                  required: ["reason"]
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
            // Audio playback
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              await playerRef.current?.playChunk(base64Audio);
            }

            // Transcript
            const userText = (message as any).inputTranscription?.text;
            const modelText = (message as any).outputTranscription?.text;

            if (userText) {
              setTranscript(prev => (prev + "\nUser: " + userText).slice(-1500));
            }
            if (modelText) {
              setTranscript(prev => (prev + "\nKNEXA: " + modelText).slice(-1500));
            }

            // 🔥 Tool calls - args este deja obiect, nu trebuie parsat
            if (message.toolCall?.functionCalls) {
              for (const toolCall of message.toolCall.functionCalls) {
                console.log('🔧 Tool call:', toolCall.name, toolCall.args);
                
                let result = '';
                
                if (toolCall.name === 'schedule_appointment') {
                  // toolCall.args este deja un obiect!
                  const args = toolCall.args;
                  result = await handleBooking(args);
                }
                
                if (toolCall.name === 'escalate_to_human') {
                  const args = toolCall.args;
                  result = await handleEscalation(args.reason);
                }
                
                // Trimite răspunsul înapoi
                if (sessionRef.current && result) {
                  sessionRef.current.sendToolResponse({
                    functionResponses: [{
                      id: toolCall.id,
                      name: toolCall.name,
                      response: { result }
                    }]
                  });
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

      // Configurare microfon
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
