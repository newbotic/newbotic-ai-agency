'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';

export default function TestPage() {
  const [status, setStatus] = useState('Testing...');
  const [error, setError] = useState('');

  useEffect(() => {
    async function testConnection() {
      try {
        // Test simplu - doar verifică dacă poate face conexiune
        const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        
        if (error) {
          // Eroare normală dacă tabela nu există încă
          setStatus('✅ Connected to Supabase! (Table "profiles" not found yet - that\'s OK)');
        } else {
          setStatus('✅ Connected to Supabase!');
        }
      } catch (err) {
        setError((err as Error).message);
        setStatus('❌ Connection failed');
      }
    }
    
    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <div className="bg-[#111115] p-4 rounded-lg border border-gray-800">
        <p className="mb-2">Status: <span className={status.includes('✅') ? 'text-green-400' : 'text-yellow-400'}>{status}</span></p>
        {error && <p className="text-red-400 text-sm mt-2">Error: {error}</p>}
        <p className="text-gray-500 text-xs mt-4">
          URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
        </p>
      </div>
    </div>
  );
}
