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
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    posts: 0,
    bookings: 0,
    conversations: 0
  });

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
        
        // Încarcă doar datele utilizatorului
        const { count: postsCount } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', session.user.id);
        
        const { count: bookingsCount } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', session.user.id);
        
        setStats({
          posts: postsCount || 0,
          bookings: bookingsCount || 0,
          conversations: 0
        });
      }
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <nav className="border-b border-[#00f0ff]/20 bg-[#0a0a0f] px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-lg flex items-center justify-center">
              <span className="font-black text-black text-sm">N</span>
            </div>
            <span className="text-white font-bold text-xl">NEWBOTIC</span>
          </div>
          <div className="flex gap-4">
            <span className="text-[#00f0ff] text-sm">Welcome, {displayName}</span>
            <button onClick={handleLogout} className="text-red-400 text-sm">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <div className="flex gap-2 mb-6 border-b border-gray-800">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 text-sm ${activeTab === 'overview' ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]' : 'text-gray-400'}`}>
            Overview
          </button>
          <button onClick={() => setActiveTab('marketing')} className={`px-4 py-2 text-sm ${activeTab === 'marketing' ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]' : 'text-gray-400'}`}>
            Marketing
          </button>
          <button onClick={() => setActiveTab('chat')} className={`px-4 py-2 text-sm ${activeTab === 'chat' ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]' : 'text-gray-400'}`}>
            Chat
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">📝</div>
              <p className="text-2xl font-bold text-[#00f0ff]">{stats.posts}</p>
              <p className="text-gray-400">Your Posts</p>
            </div>
            <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">📅</div>
              <p className="text-2xl font-bold text-[#00f0ff]">{stats.bookings}</p>
              <p className="text-gray-400">Your Bookings</p>
            </div>
            <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">💬</div>
              <p className="text-2xl font-bold text-[#00f0ff]">{stats.conversations}</p>
              <p className="text-gray-400">Conversations</p>
            </div>
          </div>
        )}

        {activeTab === 'marketing' && <MarketingDashboard />}
        {activeTab === 'chat' && <ChatInterface />}
      </div>
    </div>
  );
}
