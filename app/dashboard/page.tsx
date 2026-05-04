'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';
import MarketingDashboard from '../components/MarketingDashboard';
import ChatInterface from '../components/ChatInterface';

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('marketing');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header simplu */}
      <div className="border-b border-gray-800 bg-[#111115] px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <span className="text-white font-bold text-xl">NEWBOTIC</span>
            <p className="text-gray-500 text-sm">Welcome, {user?.email?.split('@')[0]}</p>
          </div>
          <button onClick={handleLogout} className="text-red-400 text-sm">Logout</button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Tabs simple */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab('marketing')} className={`px-4 py-2 rounded-lg ${activeTab === 'marketing' ? 'bg-[#00f0ff] text-black' : 'bg-gray-800 text-white'}`}>
            📱 Marketing Posts
          </button>
          <button onClick={() => setActiveTab('chat')} className={`px-4 py-2 rounded-lg ${activeTab === 'chat' ? 'bg-[#00f0ff] text-black' : 'bg-gray-800 text-white'}`}>
            💬 Chat
          </button>
        </div>

        {/* Content */}
        {activeTab === 'marketing' && <MarketingDashboard />}
        {activeTab === 'chat' && <ChatInterface />}
      </div>
    </div>
  );
}
