'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifică dacă utilizatorul e logat
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    // Ascultă schimbări de autentificare
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#b000ff] bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Welcome back, {user?.user_metadata?.name || user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-bold text-lg">Conversations</h3>
            <p className="text-gray-400 text-sm mt-2">Your chat history with AI agents</p>
            <button className="mt-4 text-[#00f0ff] text-sm">View all →</button>
          </div>

          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="font-bold text-lg">Posts</h3>
            <p className="text-gray-400 text-sm mt-2">Generated social media content</p>
            <button className="mt-4 text-[#00f0ff] text-sm">View all →</button>
          </div>

          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-bold text-lg">Bookings</h3>
            <p className="text-gray-400 text-sm mt-2">Scheduled appointments</p>
            <button className="mt-4 text-[#00f0ff] text-sm">View all →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
