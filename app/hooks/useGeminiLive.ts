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
  sampleRate: 16000,
  keepAliveIntervalMs: 20000, // ping every 20s to prevent Railway proxy timeout
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
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isActiveRef = useRef(false);
  const isStartingRef = useRef(false);
  const isSessionReadyRef = useRef(false);

  // ─── Keep-alive ───────────────────────────────────────────────────────────
  const startKeepAlive = useCallback((session: any) => {
    stopKeepAlive();
    keepAliveRef.current = setInterval(() => {
      if (!isActiveRef.current || !isSessionReadyRef.current || !session) {
        stopKeepAlive();
        return;
      }
      try {
        // Silent PCM chunk — 10ms of silence at 16kHz = 160 samples = 320 bytes
        const silence = new Int16Array(160);
        const base64 = btoa(
          String.fromCharCode(...new Uint8Array(silence.buffer))
        );
        session.sendRealtimeInput({
          audio: { data: base64, mimeType: "audio/pcm;rate=16000" },
        });
      } catch (e) {
        console.warn("Keep-alive failed:", e);
      }
    }, CONFIG.keepAliveIntervalMs);
  }, []);

  const stopKeepAlive = useCallback(() => {
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
  }, []);

  // ─── Stop ─────────────────────────────────────────────────────────────────
  const stop = useCallback(async () => {
    if (!isActiveRef.current && !isStartingRef.current) return;

    console.log('🛑 Stopping...');
    isActiveRef.current = false;
    isStartingRef.current = false;
    isSessionReadyRef.current = false;
    setActive(false);

    // 1. Stop keep-alive
    stopKeepAlive();

    // 2. Stop worklet
    if (workletNodeRef.current) {
      workletNodeRef.current.port.onmessage = null;
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }

    // 3. Stop source
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    // 4. Stop player
    if (playerRef.current) {
      await playerRef.current.stop();
      playerRef.current = null;
    }

    // 5. Close AudioContext
    if (audioContextRef.current) {
      try { await audioContextRef.current.close(); } catch (_) {}
      audioContextRef.current = null;
    }

    // 6. Stop microphone
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }

    // 7. Close session
    if (sessionRef.current) {
      try { await sessionRef.current.close(); } catch (_) {}
      sessionRef.current = null;
    }

    setVolume(0);
    console.log('✅ Stopped');
  }, [stopKeepAlive]);

  // ─── Start ────────────────────────────────────────────────────────────────
  const start = useCallback(async () => {
    if (isActiveRef.current || isStartingRef.current) {
      console.log('Already starting or active, skipping');
      return;
    }

    isStartingRef.current = true;
    isSessionReadyRef.current = false;

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is missing');

      playerRef.current = new AudioPlayer();

      const ai = new GoogleGenAI({ apiKey });

      console.log('🔌 Connecting to Gemini...');

      let resolveOpen!: () => void;
      let rejectOpen!: (err: Error) => void;
      const openPromise = new Promise<void>((res, rej) => {
        resolveOpen = res;
        rejectOpen = rej;
      });

      // Timeout: if no onopen within 15s, fail fast
      const openTimeout = setTimeout(() => {
        rejectOpen(new Error('Gemini connection timed out'));
      }, 15000);

      const session = await ai.live.connect({
        model: CONFIG.model,
        config: {
          systemInstruction: CONFIG.systemInstruction,
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: CONFIG.voiceName } },
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
                    name:  { type: Type.STRING, description: "Customer full name" },
                    email: { type: Type.STRING, description: "Customer email address - REQUIRED" },
                    date:  { type: Type.STRING, description: "Appointment date" },
                    time:  { type: Type.STRING, description: "Appointment time" },
                  },
                  required: ["name", "email", "date", "time"],
                },
              },
            ],
          }],
        },

        callbacks: {
          onopen: () => {
            clearTimeout(openTimeout);
            console.log('✅ Gemini connected');
            isSessionReadyRef.current = true;
            startKeepAlive(session);
            resolveOpen();
          },

          onmessage: async (message: any) => {
            if (!isActiveRef.current) return;

            // Audio playback
            const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audio && playerRef.current) {
              await playerRef.current.playChunk(audio);
            }

            // Transcripts
            const userText  = message.inputTranscription?.text;
            const modelText = message.outputTranscription?.text;
            if (userText)  setTranscript(prev => (prev + "\n👤 " + userText).slice(-1000));
            if (modelText) setTranscript(prev => (prev + "\n🤖 " + modelText).slice(-1000));

            // Tool calls
            const toolCalls = message.toolCall?.functionCalls;
            if (toolCalls?.length && sessionRef.current && isActiveRef.current) {
              for (const tool of toolCalls) {
                if (tool.name === 'schedule_appointment') {
                  try {
                    const res = await fetch('/api/book', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ ...tool.args, source: 'voice' }),
                    });
                    const result = await res.json();
                    const reply = result.success
                      ? `Booking confirmed for ${tool.args.name} on ${tool.args.date} at ${tool.args.time}. Email sent to ${tool.args.email}.`
                      : "Booking failed. Please try again.";

                    if (sessionRef.current && isActiveRef.current) {
                      sessionRef.current.sendToolResponse({
                        functionResponses: [{
                          id:       tool.id,
                          name:     tool.name,
                          response: { result: reply },
                        }],
                      });
                    }
                  } catch (err) {
                    console.error('Tool error:', err);
                  }
                }
              }
            }

            // Interrupt — AI was cut off mid-speech
            if (message.serverContent?.interrupted) {
              await playerRef.current?.stop();
            }
          },

          onclose: (e: any) => {
            console.log(`Gemini closed — code: ${e?.code}, reason: ${e?.reason}, clean: ${e?.wasClean}`);
            isSessionReadyRef.current = false;
            stopKeepAlive();
            // Only call stop() if we are (or were) active — prevents double-stop
            if (isActiveRef.current) {
              stop();
            }
          },

          onerror: (err: any) => {
            console.error('Gemini error:', err);
            isSessionReadyRef.current = false;
            stopKeepAlive();
            stop();
          },
        },
      });

      sessionRef.current = session;

      // Wait for onopen (or timeout)
      await openPromise;

      // Bail if stop() was called while we were connecting
      if (!isStartingRef.current) {
        try { await session.close(); } catch (_) {}
        return;
      }

      // ── Microphone ──────────────────────────────────────────────────────
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!isStartingRef.current) {
        stream.getTracks().forEach(t => t.stop());
        return;
      }

      const audioContext = new AudioContext({ sampleRate: CONFIG.sampleRate });
      const source = audioContext.createMediaStreamSource(stream);

      await audioContext.audioWorklet.addModule('/audio-processor.js');
      if (!isStartingRef.current) return;

      const workletNode = new AudioWorkletNode(audioContext, 'pcm-processor');

      streamRef.current       = stream;
      audioContextRef.current = audioContext;
      sourceRef.current       = source;
      workletNodeRef.current  = workletNode;

      const sessionForWorklet = session;

      workletNode.port.onmessage = (event) => {
        if (!isSessionReadyRef.current) return;
        if (!isActiveRef.current)       return;
        if (!sessionForWorklet)         return;

        const inputData: Float32Array = event.data;

        // Volume meter
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
        setVolume(Math.sqrt(sum / inputData.length));

        // Float32 → Int16 PCM
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }

        const base64 = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));

        try {
          sessionForWorklet.sendRealtimeInput({
            audio: { data: base64, mimeType: "audio/pcm;rate=16000" },
          });
        } catch (err) {
          if (err instanceof Error && (err.message.includes('CLOSING') || err.message.includes('closed'))) {
            isSessionReadyRef.current = false;
          }
        }
      };

      source.connect(workletNode);
      await audioContext.resume();

      // ── All good ─────────────────────────────────────────────────────────
      isActiveRef.current  = true;
      isStartingRef.current = false;
      setActive(true);
      console.log('🎤 Fully started!');

    } catch (err) {
      console.error('Start failed:', err);
      isStartingRef.current    = false;
      isSessionReadyRef.current = false;
      stopKeepAlive();
      await stop();
    }
  }, [stop, startKeepAlive, stopKeepAlive]);

  // ─── Cleanup on unmount ───────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stopKeepAlive();
      if (isActiveRef.current || isStartingRef.current) {
        stop();
      }
    };
  }, [stop, stopKeepAlive]);

  return { active, transcript, volume, start, stop };
}