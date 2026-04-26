import { NextResponse } from "next/server";

let EDGE_TOKEN: string | null = null;
let TOKEN_EXPIRE = 0;

/* ================= TOKEN ================= */

async function getEdgeToken() {
  if (EDGE_TOKEN && Date.now() < TOKEN_EXPIRE) {
    return EDGE_TOKEN;
  }

  const res = await fetch(
    "https://edge.microsoft.com/translate/auth"
  );

  if (!res.ok) {
    throw new Error("Failed to obtain Edge token");
  }

  EDGE_TOKEN = await res.text();

  // valid ~10 min
  TOKEN_EXPIRE = Date.now() + 9 * 60 * 1000;

  return EDGE_TOKEN;
}

/* ================= POST ================= */

export async function POST(request: Request) {
  try {
    const { text, voice, rate } = await request.json();

    if (!text?.trim()) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const token = await getEdgeToken();

    const voiceName = voice || "ro-RO-EmiliaNeural";

    const safeText = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const ssml = `
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ro-RO">
  <voice name="${voiceName}">
    <prosody rate="${rate || "+0%"}" pitch="+0Hz">
      ${safeText}
    </prosody>
  </voice>
</speak>`;

    const response = await fetch(
      "https://speech.platform.bing.com/consumer/speech/synthesize/read/edge/v1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat":
            "audio-24khz-48kbitrate-mono-mp3",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
        body: ssml,
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error(err);
      throw new Error(`TTS API error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("TTS error:", error);

    return NextResponse.json(
      { error: "TTS failed" },
      { status: 500 }
    );
  }
}