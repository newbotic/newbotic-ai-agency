'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [escalations, setEscalations] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        // Verifică dacă e admin - email admin
        const isAdminUser = session.user.email === 'hello@newbotic.co.uk';
        setIsAdmin(isAdminUser);
        
        if (isAdminUser) {
          // Încarcă toți utilizatorii
          const { data: profiles } = await supabase
            .from('profiles')
            .select('*');
          setUsers(profiles || []);
          
          // Încarcă escaladările
          // TODO: adaugă tabela escalations
        }
      }
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to view this page.</p>
          <a href="/dashboard" className="text-[#00f0ff] mt-4 inline-block">← Back to Dashboard</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#b000ff] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Manage users, view escalations, monitor system</p>
          </div>
          <a href="/dashboard" className="text-[#00f0ff] hover:underline">
            ← Back to Dashboard
          </a>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <div className="text-2xl mb-2">👥</div>
            <p className="text-2xl font-bold text-[#00f0ff]">{users.length}</p>
            <p className="text-gray-400 text-sm">Total Users</p>
          </div>
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <div className="text-2xl mb-2">💬</div>
            <p className="text-2xl font-bold text-[#00f0ff]">0</p>
            <p className="text-gray-400 text-sm">Total Conversations</p>
          </div>
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <div className="text-2xl mb-2">🚨</div>
            <p className="text-2xl font-bold text-[#00f0ff]">{escalations.length}</p>
            <p className="text-gray-400 text-sm">Escalations</p>
          </div>
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-2xl font-bold text-[#00f0ff]">0</p>
            <p className="text-gray-400 text-sm">Posts Generated</p>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-[#111115] border border-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">📋 All Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-800">
                <tr>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Plan</th>
                  <th className="pb-2">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800/50">
                    <td className="py-3">{user.name || '-'}</td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3">{user.plan || 'starter'}</td>
                    <td className="py-3">{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Escalations */}
        <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">🚨 Recent Escalations</h2>
          {escalations.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No escalations yet</p>
          ) : (
            <div className="space-y-3">
              {/* List escalations here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
