import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { brand, industry, tone, platform, count = 3 } = await request.json();

    if (!brand || !platform) {
      return NextResponse.json(
        { error: 'Brand and platform are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are a professional social media marketing assistant.

Create ${count} high-quality social media posts for:

BRAND: ${brand}
INDUSTRY: ${industry || 'Not specified'}
TONE: ${tone || 'Professional, friendly'}
PLATFORM: ${platform}

REQUIREMENTS for each post:
- Must be engaging and native to the platform
- Match the brand tone perfectly
- Include 3-5 relevant hashtags
- For Instagram/TikTok: use emojis naturally
- For LinkedIn: keep professional, no emojis
- For Facebook: friendly, conversational

Return ONLY valid JSON in this exact format:
{
  "posts": [
    {
      "content": "post text here",
      "hashtags": "#tag1 #tag2 #tag3",
      "bestTime": "18:00"
    }
  ]
}

Do not add any text outside the JSON.`;

    // Folosește gemini-2.5-pro (mai nou și disponibil)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });

    const text = response.text;
    console.log('Gemini response:', text);
    
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse Gemini response');
    }

    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      success: true,
      brand,
      platform,
      posts: result.posts,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Generate posts error:', error);
    return NextResponse.json(
      { error: 'Failed to generate posts: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
