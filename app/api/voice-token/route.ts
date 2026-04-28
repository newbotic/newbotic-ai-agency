import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Folosește variabila existentă NEXT_PUBLIC_GEMINI_API_KEY
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('NEXT_PUBLIC_GEMINI_API_KEY is not configured in .env.local');
      return NextResponse.json({ 
        error: 'API key not configured' 
      }, { status: 500 });
    }
    
    // Pentru testare, returnăm cheia API direct
    // ATENȚIE: Doar pentru dezvoltare! În producție folosește un token JWT temporar
    return NextResponse.json({ token: apiKey });
    
  } catch (error) {
    console.error('Token generation error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate token' 
    }, { status: 500 });
  }
}
