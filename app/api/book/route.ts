import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, date, time } = await request.json();
    
    console.log('📅 Booking received:', { name, email, date, time });
    
    // Trimite la n8n pentru procesare
    const n8nWebhook = 'https://n8n-railway-production-7fd0.up.railway.app/webhook/booking';
    
    const response = await fetch(n8nWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        date,
        time,
        source: 'chat',
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      console.error('n8n error:', await response.text());
      return NextResponse.json({ 
        success: false, 
        error: 'Booking service unavailable' 
      }, { status: 500 });
    }
    
    const result = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      message: `Booking confirmed for ${date} at ${time}` 
    });
    
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
