'use client';

import { useState } from 'react';

export default function MarketingDashboard() {
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

  const platforms = ['instagram', 'facebook', 'linkedin', 'tiktok', 'twitter'];
  const tones = ['professional', 'friendly', 'funny', 'inspirational', 'luxury'];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📝 Social Media Post Generator</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Brand name *</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g., Nike, Apple, Aqua Carpatica"
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Industry</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Fashion, Tech"
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
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
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
            >
              {tones.map(t => (
                <option key={t} value={t}>{t.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={generatePosts}
              disabled={loading || !brand}
              className="w-full py-2 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black font-bold rounded-lg disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Posts'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
            ❌ {error}
          </div>
        )}
      </div>

      {posts.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Generated Posts:</h3>
          {posts.map((post: any, idx: number) => (
            <div key={idx} className="bg-black/50 p-4 rounded-lg border border-gray-800">
              <p className="text-sm whitespace-pre-wrap">{post.content}</p>
              {post.hashtags && (
                <p className="text-[#00f0ff] text-xs mt-2">{post.hashtags}</p>
              )}
              <button
                onClick={() => copyToClipboard(post.content + '\n\n' + post.hashtags)}
                className="mt-2 text-xs bg-gray-800 px-2 py-1 rounded"
              >
                📋 Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
