'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';
import MarketingDashboard from '../components/MarketingDashboard';
import ChatInterface from '../components/ChatInterface';

const N8N_WEBHOOK = 'https://n8n.up.railway.app/webhook/facebook-publish';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [publishing, setPublishing] = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
        await loadPosts(session.user.id);
        await loadBookings(session.user.id);
      }
      setLoading(false);
    });
  }, [router]);

  const loadPosts = async (userId: string) => {
    const { data } = await supabase.from('posts').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    setPosts(data || []);
  };

  const loadBookings = async (userId: string) => {
    const { data } = await supabase.from('bookings').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    setBookings(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const updatePostStatus = async (postId: number, status: string) => {
    await supabase.from('posts').update({ status }).eq('id', postId);
    await loadPosts(user.id);
  };

  const deletePost = async (postId: number) => {
    if (confirm('Delete this post?')) {
      await supabase.from('posts').delete().eq('id', postId);
      await loadPosts(user.id);
    }
  };

  const publishToFacebook = async (postId: number) => {
    setPublishing(postId);
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) throw new Error('Post not found');

      const res = await fetch(N8N_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: post.content,
          hashtags: post.hashtags || ''
        })
      });

      await supabase
        .from('posts')
        .update({ status: 'published', published_at: new Date().toISOString() })
        .eq('id', postId);
      
      await loadPosts(user.id);
      alert('✅ Posted to Facebook!');
      
    } catch (error) {
      alert('Error publishing post');
    } finally {
      setPublishing(null);
    }
  };

  const displayName = user?.email?.split('@')[0];

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#b000ff] bg-clip-text text-transparent">Dashboard</h1>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-lg">Logout</button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-800">
          <button onClick={() => setActiveTab('posts')} className={`px-4 py-2 text-sm ${activeTab === 'posts' ? 'text-[#00f0ff] border-b-2' : 'text-gray-400'}`}>Posts ({posts.length})</button>
          <button onClick={() => setActiveTab('marketing')} className={`px-4 py-2 text-sm ${activeTab === 'marketing' ? 'text-[#00f0ff] border-b-2' : 'text-gray-400'}`}>Marketing</button>
          <button onClick={() => setActiveTab('bookings')} className={`px-4 py-2 text-sm ${activeTab === 'bookings' ? 'text-[#00f0ff] border-b-2' : 'text-gray-400'}`}>Bookings ({bookings.length})</button>
          <button onClick={() => setActiveTab('chat')} className={`px-4 py-2 text-sm ${activeTab === 'chat' ? 'text-[#00f0ff] border-b-2' : 'text-gray-400'}`}>Chat</button>
        </div>

        {activeTab === 'posts' && (
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            {posts.length === 0 ? <p className="text-center py-8">No posts yet.</p> : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="border border-gray-800 rounded-lg p-4">
                    <p className="text-sm mb-2">{post.content}</p>
                    {post.hashtags && <p className="text-[#00f0ff] text-xs mb-3">{post.hashtags}</p>}
                    
                    {post.status === 'pending' && (
                      <div className="flex gap-2 mb-3">
                        <button onClick={() => updatePostStatus(post.id, 'approved')} className="text-xs bg-green-600 px-3 py-1 rounded">✅ Approve</button>
                        <button onClick={() => updatePostStatus(post.id, 'rejected')} className="text-xs bg-red-600 px-3 py-1 rounded">❌ Reject</button>
                      </div>
                    )}
                    
                    {post.status === 'approved' && (
                      <div className="flex gap-2 mb-3">
                        <button onClick={() => publishToFacebook(post.id)} disabled={publishing === post.id} className="text-xs bg-[#1877F2] text-white px-3 py-1 rounded">
                          {publishing === post.id ? 'Publishing...' : '📘 Facebook'}
                        </button>
                      </div>
                    )}
                    
                    <button onClick={() => deletePost(post.id)} className="text-xs bg-gray-700 px-3 py-1 rounded">🗑️ Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'marketing' && <MarketingDashboard />}
        {activeTab === 'bookings' && (
          <div className="bg-[#111115] border border-gray-800 rounded-xl p-6">
            {bookings.length === 0 ? <p className="text-center py-8">No bookings yet.</p> : (
              bookings.map((booking) => (
                <div key={booking.id} className="border border-gray-800 rounded-lg p-4 mb-3">
                  <p><strong>{booking.customer_name}</strong> - {booking.booking_date} at {booking.booking_time}</p>
                  <p className="text-sm text-gray-400">{booking.customer_email}</p>
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === 'chat' && <ChatInterface />}
      </div>
    </div>
  );
}
