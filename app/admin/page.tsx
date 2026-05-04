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

      // Verifică în tabela profiles dacă e admin
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      const isAdminUser = profile?.is_admin === true;
      setIsAdmin(isAdminUser);

      if (isAdminUser) {
        const { data: profiles } = await supabase.from('profiles').select('*');
        const { data: allPosts } = await supabase.from('posts').select('*');
        const { data: allBookings } = await supabase.from('bookings').select('*');
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
      <div className="border-b border-red-500 bg-[#111115] px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <span className="text-white font-bold text-xl">⚡ ADMIN PANEL</span>
            <p className="text-red-400 text-sm">Administrator Access</p>
          </div>
          <button onClick={handleLogout} className="text-red-400 text-sm">Logout</button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-red-400">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111115] border border-red-500/30 rounded-xl p-6">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-3xl font-bold text-red-400">{users.length}</p>
            <p className="text-gray-400">Total Users</p>
          </div>
          <div className="bg-[#111115] border border-red-500/30 rounded-xl p-6">
            <div className="text-3xl mb-2">📝</div>
            <p className="text-3xl font-bold text-red-400">{posts.length}</p>
            <p className="text-gray-400">All Posts</p>
          </div>
          <div className="bg-[#111115] border border-red-500/30 rounded-xl p-6">
            <div className="text-3xl mb-2">📅</div>
            <p className="text-3xl font-bold text-red-400">{bookings.length}</p>
            <p className="text-gray-400">All Bookings</p>
          </div>
        </div>

        <div className="bg-[#111115] border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-red-400">📋 Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-800">
                <tr><th className="pb-2">Name</th><th className="pb-2">Email</th><th className="pb-2">Plan</th></tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-800/50">
                    <td className="py-2">{user.name || '-'}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">{user.plan || 'starter'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-red-400">📝 Recent Posts</h2>
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="border-b border-gray-800 py-2 text-sm">
                <p className="text-gray-400 truncate">{post.content?.substring(0, 80)}...</p>
                <span className="text-xs text-gray-500">Status: {post.status}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-red-400">📅 Recent Bookings</h2>
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="border-b border-gray-800 py-2 text-sm">
                <p className="text-gray-400">{booking.customer_name} - {booking.booking_date}</p>
                <span className="text-xs text-gray-500">Status: {booking.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
