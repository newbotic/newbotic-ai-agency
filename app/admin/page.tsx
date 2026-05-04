'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push('/login');
        return;
      }

      // Verifică admin
      const isAdminUser = session.user.email === 'hello@newbotic.co.uk';
      setIsAdmin(isAdminUser);

      if (isAdminUser) {
        const { data: profiles } = await supabase.from('profiles').select('*');
        const { data: allPosts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        const { data: allBookings } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });

        setUsers(profiles || []);
        setPosts(allPosts || []);
        setBookings(allBookings || []);
      }
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Access Denied</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#b000ff] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage users, posts, bookings</p>
          </div>
          <button onClick={handleLogout} className="text-red-400">Logout</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-2xl font-bold text-[#00f0ff]">{users.length}</p>
            <p className="text-gray-400">Total Users</p>
          </div>
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-2">📝</div>
            <p className="text-2xl font-bold text-[#00f0ff]">{posts.length}</p>
            <p className="text-gray-400">Total Posts</p>
          </div>
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <div className="text-3xl mb-2">📅</div>
            <p className="text-2xl font-bold text-[#00f0ff]">{bookings.length}</p>
            <p className="text-gray-400">Total Bookings</p>
          </div>
        </div>

        <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">📋 All Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-800">
                <tr><th className="pb-2">Name</th><th className="pb-2">Email</th><th className="pb-2">Plan</th></tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800/50">
                    <td className="py-3">{user.name || '-'}</td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3">{user.plan || 'starter'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
