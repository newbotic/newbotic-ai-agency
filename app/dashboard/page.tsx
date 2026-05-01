'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';
import MarketingDashboard from '../components/MarketingDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    conversations: 0,
    posts: 0,
    bookings: 0,
    leads: 0
  });

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
        
        // Verifică dacă există profil, dacă nu, creează unul
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', session.user.id)
          .single();
        
        if (profileError || !profileData) {
          // Creează profilul dacă nu există
          const userName = session.user.user_metadata?.full_name || session.user.email?.split('@')[0];
          await supabase.from('profiles').insert({
            id: session.user.id,
            name: userName,
            email: session.user.email
          });
        }
        
        // Încarcă statisticile din baza de date
        const { count: convCount } = await supabase
          .from('conversations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', session.user.id);
        
        const { count: postsCount } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', session.user.id);
        
        const { count: bookingsCount } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', session.user.id);
        
        setStats({
          conversations: convCount || 0,
          posts: postsCount || 0,
          bookings: bookingsCount || 0,
          leads: 0
        });
      }
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  // Obține numele din mai multe surse
  const displayName = user?.user_metadata?.full_name || 
                       user?.user_metadata?.name ||
                       user?.email?.split('@')[0] ||
                       'User';

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#b000ff] bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Welcome back, <span className="text-[#00f0ff] font-medium">{displayName}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === 'overview' 
                ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('marketing')}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === 'marketing' 
                ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Marketing Generator
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' ? (
          <>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#111115] border border-gray-800 rounded-xl p-6 hover:border-[#00f0ff]/30 transition">
                <div className="text-3xl mb-3">👔</div>
                <h3 className="font-bold text-lg">SELLIX</h3>
                <p className="text-2xl font-bold text-[#00f0ff] mt-2">{stats.leads}</p>
                <p className="text-gray-500 text-sm">Total leads</p>
                <p className="text-green-400 text-xs mt-2">+0 this week</p>
              </div>

              <div className="bg-[#111115] border border-gray-800 rounded-xl p-6 hover:border-[#00f0ff]/30 transition">
                <div className="text-3xl mb-3">🛟</div>
                <h3 className="font-bold text-lg">KNEXA</h3>
                <p className="text-2xl font-bold text-[#00f0ff] mt-2">{stats.conversations}</p>
                <p className="text-gray-500 text-sm">Conversations</p>
                <p className="text-green-400 text-xs mt-2">Resolved: 92%</p>
              </div>

              <div className="bg-[#111115] border border-gray-800 rounded-xl p-6 hover:border-[#00f0ff]/30 transition">
                <div className="text-3xl mb-3">📣</div>
                <h3 className="font-bold text-lg">VYRAL</h3>
                <p className="text-2xl font-bold text-[#00f0ff] mt-2">{stats.posts}</p>
                <p className="text-gray-500 text-sm">Posts generated</p>
                <p className="text-green-400 text-xs mt-2">Engagement: 4.2%</p>
              </div>

              <div className="bg-[#111115] border border-gray-800 rounded-xl p-6 hover:border-[#00f0ff]/30 transition">
                <div className="text-3xl mb-3">📅</div>
                <h3 className="font-bold text-lg">APPO</h3>
                <p className="text-2xl font-bold text-[#00f0ff] mt-2">{stats.bookings}</p>
                <p className="text-gray-500 text-sm">Bookings</p>
                <p className="text-green-400 text-xs mt-2">Confirmed: 85%</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">🚀 Quick Actions</h2>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => alert('Open KNEXA Voice - coming soon')}
                  className="px-4 py-2 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black font-bold rounded-lg hover:opacity-90 transition"
                >
                  🎤 Open KNEXA Voice
                </button>
                <button 
                  onClick={() => setActiveTab('marketing')}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  📱 Generate Posts
                </button>
                <button 
                  onClick={() => alert('Smart Chat - coming soon')}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  💬 Smart Chat
                </button>
                <button 
                  onClick={() => alert('Book Appointment - coming soon')}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  📅 Book Appointment
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🔥 Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Today - Logged into dashboard</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-[#00f0ff] rounded-full"></span>
                  <span>Connected to Supabase</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Account created</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <MarketingDashboard />
        )}
      </div>
    </div>
  );
}
