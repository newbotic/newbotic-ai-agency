import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { reason, timestamp, source } = await request.json();
    
    console.log('🚨 ESCALATION NEEDED:', { reason, timestamp, source });
    
    // Poți trimite notificare pe:
    // 1. WhatsApp Business API
    // 2. Email
    // 3. Slack
    // 4. Google Sheets
    
    // Exemplu: trimite email la echipă
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Newbotic AI <escalations@newbotic.co.uk>',
        to: ['hello@newbotic.co.uk'],
        subject: '🚨 Escalation Required - Gemini Live Voice',
        html: `
          <h2>Escalation Request</h2>
          <p><strong>Reason:</strong> ${reason}</p>
          <p><strong>Time:</strong> ${timestamp}</p>
          <p><strong>Source:</strong> ${source}</p>
          <p>Please contact the customer immediately.</p>
        `
      })
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Escalation error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
