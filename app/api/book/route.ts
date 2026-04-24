import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, date, time } = await request.json();
    
    // Validare date
    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    // 1. Trimite la n8n workflow (creează eveniment Google Calendar + email)
    const n8nWebhook = 'https://n8n-railway-production-7fd0.up.railway.app/webhook/booking';
    
    const n8nResponse = await fetch(n8nWebhook, {
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
    
    if (!n8nResponse.ok) {
      console.error('n8n error:', await n8nResponse.text());
    }
    
    // 2. Salvează în Google Sheets (backup)
    // TODO: Adaugă Google Sheets API
    
    return NextResponse.json({ 
      success: true, 
      message: `Booking confirmed for ${date} at ${time}` 
    });
    
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
