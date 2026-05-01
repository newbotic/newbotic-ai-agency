'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';

export default function TestDBPage() {
  const [status, setStatus] = useState('Testing...');
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    async function testTables() {
      const tablesList = ['profiles', 'conversations', 'posts', 'bookings'];
      const existing: string[] = [];
      
      for (const table of tablesList) {
        const { error } = await supabase.from(table).select('count', { count: 'exact', head: true });
        if (!error) {
          existing.push(table);
        }
      }
      
      setTables(existing);
      setStatus(`✅ Connected! Tables found: ${existing.length}/4`);
    }
    
    testTables();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <div className="bg-[#111115] p-4 rounded-lg border border-gray-800">
        <p className="mb-2">Status: <span className="text-green-400">{status}</span></p>
        <p className="text-gray-400 text-sm">Tables found: {tables.join(', ') || 'none'}</p>
      </div>
    </div>
  );
}
