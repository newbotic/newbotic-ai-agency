'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [brand, setBrand] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('professional');
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

  const platforms = [
    'instagram', 'facebook', 'linkedin', 'tiktok', 'twitter'
  ];

  const tones = [
    'professional', 'friendly', 'funny', 'inspirational', 'luxury'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#b000ff] bg-clip-text text-transparent">
            AI Marketing Assistant
          </h1>
          <p className="text-gray-400 mt-2">Generate social media posts in seconds</p>
        </div>

        {/* Formular */}
        <div className="bg-[#111115] border border-[#00f0ff]/30 rounded-xl p-6 mb-8">
          <div className="space-y-4">
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-1">Brand name *</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g., Nike, Apple, Aqua Carpatica"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium mb-1">Industry (optional)</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g., Fashion, Tech, FMCG"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium mb-1">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
              >
                {tones.map(t => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-medium mb-1">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
              >
                {platforms.map(p => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
                ❌ {error}
              </div>
            )}

            <button
              onClick={generatePosts}
              disabled={loading || !brand}
              className={`
                w-full py-3 rounded-lg font-bold transition-all
                ${loading || !brand 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black hover:opacity-90'
                }
              `}
            >
              {loading ? '🤖 Generating...' : '✨ Generate Posts'}
            </button>
          </div>
        </div>

        {/* Posts rezultate */}
        {posts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">📝 Generated Posts</h2>
            {posts.map((post: any, idx: number) => (
              <div key={idx} className="bg-[#111115] border border-gray-800 rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-1 rounded">
                    Post {idx + 1}
                  </span>
                  {post.bestTime && (
                    <span className="text-xs text-gray-500">⏰ Best time: {post.bestTime}</span>
                  )}
                </div>
                <p className="text-gray-300 whitespace-pre-wrap mb-3">{post.content}</p>
                {post.hashtags && (
                  <p className="text-[#00f0ff] text-sm mb-3">{post.hashtags}</p>
                )}
                <button
                  onClick={() => copyToClipboard(post.content + '\n\n' + post.hashtags)}
                  className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded transition"
                >
                  📋 Copy
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {posts.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-medium mb-2">Ready to create content?</h3>
            <p className="text-gray-500">Enter your brand details and click "Generate Posts"</p>
          </div>
        )}
      </div>
    </div>
  );
}
