'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [brand, setBrand] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header NEWBOTIC */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] p-4 rounded-2xl mb-4">
            <span className="font-black text-3xl text-black">NEWBOTIC</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#b000ff] bg-clip-text text-transparent">
            AI Marketing Assistant
          </h1>
          <p className="text-gray-400 mt-2">Generate social media posts for ANY brand in seconds</p>
        </div>
        
        <div className="bg-[#111115] border border-[#00f0ff]/30 rounded-xl p-6 mb-8">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Brand name *</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g., Aqua Carpatica, QuickFix Auto, or your brand"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Industry (optional)</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g., FMCG, Auto Service, Beauty"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tone (optional)</label>
              <input
                type="text"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                placeholder="e.g., Professional, Friendly, Funny, Inspirational"
                className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
              >
                <option value="instagram">📸 Instagram</option>
                <option value="facebook">📘 Facebook</option>
                <option value="linkedin">💼 LinkedIn</option>
                <option value="tiktok">🎵 TikTok</option>
              </select>
            </div>
            
            {error && <div className="text-red-400 text-sm">{error}</div>}
            
            <button
              onClick={generatePosts}
              disabled={loading || !brand}
              className="py-3 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black font-bold rounded-lg disabled:opacity-50 transition hover:opacity-90"
            >
              {loading ? '🤖 Generating...' : '✨ Generate Posts'}
            </button>
          </div>
        </div>

        {posts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">📝 Generated Posts for {brand}</h2>
            <div className="space-y-4">
              {posts.map((post: any, idx: number) => (
                <div key={idx} className="bg-[#111115] border border-gray-800 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-1 rounded">
                      Post {idx + 1}
                    </span>
                    {post.bestTime && (
                      <span className="text-xs text-gray-500">
                        ⏰ Best time: {post.bestTime}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 whitespace-pre-wrap mb-3">
                    {post.content}
                  </p>
                  
                  {post.hashtags && (
                    <p className="text-[#00f0ff] text-sm mb-3">
                      {post.hashtags}
                    </p>
                  )}
                  
                  <button
                    onClick={() => copyToClipboard(post.content + '\n\n' + post.hashtags)}
                    className="mt-2 text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded transition"
                  >
                    📋 Copy to clipboard
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-medium mb-2">Ready to create content?</h3>
            <p className="text-gray-500">
              Enter any brand name and click "Generate Posts"
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Try: "Aqua Carpatica" or "QuickFix Auto" or your own brand
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
