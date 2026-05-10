import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase/client';
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { brand, industry, tone, platform, context, count = 3 } = await request.json();

    if (!brand || !platform) {
      return NextResponse.json(
        { error: 'Brand and platform are required' },
        { status: 400 }
      );
    }

    // Obține user_id dacă există sesiune
    const { data: { session } } = await supabase.auth.getSession();
    
    // Ia documentele utilizatorului pentru RAG
    let ragContext = '';
    if (session) {
      const { data: documents } = await supabase
        .from('brand_documents')
        .select('file_name, content')
        .eq('user_id', session.user.id);
      
      if (documents && documents.length > 0) {
        ragContext = '\n\n## Reference Documents:\n';
        for (const doc of documents) {
          ragContext += `\n--- ${doc.file_name} ---\n${doc.content.substring(0, 1500)}\n`;
        }
      }
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
${context ? `\nBRAND CONTEXT: ${context}\n` : ''}
${ragContext}

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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });

    // Verifică sigur dacă textul există
    const text = response.text;
    if (!text || typeof text !== 'string') {
      console.error('Gemini response text is empty or invalid:', text);
      throw new Error('Empty or invalid response from Gemini');
    }
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Gemini response did not contain valid JSON:', text.substring(0, 500));
      throw new Error('Failed to parse Gemini response as JSON');
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
