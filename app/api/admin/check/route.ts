import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase/client';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    // Verifică în baza de date dacă e admin
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    // Doar hello@newbotic.co.uk poate fi admin
    const isAdmin = profile?.is_admin === true && user.email === 'hello@newbotic.co.uk';

    return NextResponse.json({ isAdmin, email: user.email });
  } catch (error) {
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}
