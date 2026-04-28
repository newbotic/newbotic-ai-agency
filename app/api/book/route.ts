import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, date, time, source } = await request.json();
    
    console.log('📅 Booking received:', { name, email, date, time, source });
    
    const n8nWebhook = 'https://n8n-railway-production-7fd0.up.railway.app/webhook/booking';
    
    const response = await fetch(n8nWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        date,
        time,
        source: source || 'chat',
        timestamp: new Date().toISOString()
      })
    });
    
    await response.json();
    
    return NextResponse.json({ 
      success: true, 
      message: `Booking confirmed for ${name} on ${date} at ${time}` 
    });
    
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ success: false, error: 'Booking failed' }, { status: 500 });
  }
}
