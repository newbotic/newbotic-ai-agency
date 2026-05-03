'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase/client';

export default function MarketingDashboard() {
  const [brand, setBrand] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('professional');
  const [platform, setPlatform] = useState('instagram');
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Încarcă postările salvate
  useEffect(() => {
    loadSavedPosts();
  }, []);

  const loadSavedPosts = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    
    setSavedPosts(data || []);
  };

  const generatePosts = async () => {
    if (!brand) {
      setError('Brand name is required');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/social/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand, industry, tone, platform, count: 3 })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPosts(data.posts || []);
      setSuccess('Posts generated! Review and save.');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const savePost = async (post: any) => {
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError('Please login first');
      setSaving(false);
      return;
    }

    const { error: saveError } = await supabase
      .from('posts')
      .insert({
        user_id: session.user.id,
        content: post.content,
        hashtags: post.hashtags,
        platform: platform,
        status: 'pending'
      });

    if (saveError) {
      setError('Failed to save post: ' + saveError.message);
    } else {
      setSuccess('Post saved successfully!');
      loadSavedPosts();
      // Elimină postarea din lista temporară
      setPosts(posts.filter((_, i) => _.content !== post.content));
    }
    setSaving(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  const platforms = ['instagram', 'facebook', 'linkedin', 'tiktok'];
  const tones = ['professional', 'friendly', 'funny', 'inspirational', 'luxury'];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📝 Social Media Post Generator</h2>
      
      {/* Formular generare */}
      <div className="bg-[#111115] border border-gray-800 rounded-xl p-5 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Brand name *</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g., Nike, Apple"
              className="w-full p-2 bg-black border border-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Industry</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Fashion, Tech"
              className="w-full p-2 bg-black border border-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-2 bg-black border border-gray-700 rounded-lg text-white"
            >
              {platforms.map(p => (
                <option key={p} value={p}>{p.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-2 bg-black border border-gray-700 rounded-lg text-white"
            >
              {tones.map(t => (
                <option key={t} value={t}>{t.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={generatePosts}
          disabled={loading || !brand}
          className="mt-4 w-full py-2 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black font-bold rounded-lg disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Posts'}
        </button>

        {error && <div className="mt-3 text-red-400 text-sm">{error}</div>}
        {success && <div className="mt-3 text-green-400 text-sm">{success}</div>}
      </div>

      {/* Postări generate (temporare) */}
      {posts.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Generated Posts (Save to continue):</h3>
          {posts.map((post: any, idx: number) => (
            <div key={idx} className="bg-black/50 p-4 rounded-lg border border-gray-800 mb-3">
              <p className="text-sm whitespace-pre-wrap">{post.content}</p>
              {post.hashtags && <p className="text-[#00f0ff] text-xs mt-2">{post.hashtags}</p>}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => copyToClipboard(post.content + '\n\n' + post.hashtags)}
                  className="text-xs bg-gray-800 px-3 py-1 rounded"
                >
                  📋 Copy
                </button>
                <button
                  onClick={() => savePost(post)}
                  disabled={saving}
                  className="text-xs bg-green-600 px-3 py-1 rounded disabled:opacity-50"
                >
                  💾 Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Postări salvate */}
      {savedPosts.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">📌 Saved Posts ({savedPosts.length})</h3>
          {savedPosts.map((post: any) => (
            <div key={post.id} className="bg-[#111115] p-4 rounded-lg border border-gray-800 mb-3">
              <p className="text-sm whitespace-pre-wrap">{post.content}</p>
              {post.hashtags && <p className="text-[#00f0ff] text-xs mt-2">{post.hashtags}</p>}
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Status: {post.status}</span>
                <button
                  onClick={() => copyToClipboard(post.content + '\n\n' + post.hashtags)}
                  className="text-xs bg-gray-800 px-3 py-1 rounded"
                >
                  📋 Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
