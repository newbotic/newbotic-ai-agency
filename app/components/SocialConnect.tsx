'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase/client';

export default function SocialConnect() {
  const [connected, setConnected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data } = await supabase
        .from('user_social_tokens')
        .select('platform')
        .eq('user_id', session.user.id);
      setConnected(data?.map(t => t.platform) || []);
    }
    setLoading(false);
  };

  const connect = (platform: string) => {
    window.location.href = `/api/social/connect/${platform}`;
  };

  if (loading) return <div className="text-gray-400">Loading...</div>;

  return (
    <div className="bg-[#111115] border border-gray-800 rounded-xl p-5">
      <h3 className="text-lg font-semibold mb-4">🔗 Connect Social Accounts</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1877F2] rounded-lg flex items-center justify-center text-white">f</div>
            <span>Facebook Page</span>
          </div>
          {connected.includes('facebook') ? (
            <span className="text-green-400 text-sm">✅ Connected</span>
          ) : (
            <button onClick={() => connect('facebook')} className="text-sm bg-[#1877F2] text-white px-3 py-1 rounded">Connect</button>
          )}
        </div>

        <div className="flex justify-between items-center p-3 bg-black/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0A66C2] rounded-lg flex items-center justify-center text-white">in</div>
            <span>LinkedIn</span>
          </div>
          {connected.includes('linkedin') ? (
            <span className="text-green-400 text-sm">✅ Connected</span>
          ) : (
            <button onClick={() => connect('linkedin')} className="text-sm bg-[#0A66C2] text-white px-3 py-1 rounded">Connect</button>
          )}
        </div>
      </div>
    </div>
  );
}
