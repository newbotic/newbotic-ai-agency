import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, date, time } = body;
    
    console.log('📅 Booking received:', { name, email, date, time });
    
    // Optional: trimite la n8n (nu așteptăm răspuns)
    const n8nWebhook = 'https://n8n-railway-production-7fd0.up.railway.app/webhook/booking';
    
    // Fire and forget - nu folosim await ca să nu blocăm
    fetch(n8nWebhook, {
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
    }).catch(err => console.error('n8n error:', err));
    
    // Return success immediately - NU mai așteptăm response.json()
    return NextResponse.json({ 
      success: true, 
      message: `Booking confirmed for ${date} at ${time}` 
    });
    
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Booking failed' 
    }, { status: 500 });
  }
}
