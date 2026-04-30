'use client';

import { useState, useEffect } from 'react';

interface MarketingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MarketingModal({ isOpen, onClose }: MarketingModalProps) {
  const [brand, setBrand] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('professional');
  const [platform, setPlatform] = useState('instagram');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset state când se închide modalul
  useEffect(() => {
    if (!isOpen) {
      setBrand('');
      setIndustry('');
      setPosts([]);
      setError('');
    }
  }, [isOpen]);

  // Prevenim scroll în spate
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-[600px] max-w-full m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#111115] rounded-xl border border-[#00f0ff]/30 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-lg flex items-center justify-center">
                <span className="font-black text-black text-sm">V</span>
              </div>
              <h3 className="text-white font-bold">VYRAL Marketing</h3>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-white text-xl transition"
            >
              ✕
            </button>
          </div>
          
          <div className="p-5">
            <p className="text-gray-400 text-sm mb-4">Generate social media posts in seconds</p>
            
            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Brand name *"
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#00f0ff]"
              />
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Industry (optional)"
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#00f0ff]"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="px-3 py-2 bg-black border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#00f0ff]"
                >
                  <option value="instagram">📸 Instagram</option>
                  <option value="facebook">📘 Facebook</option>
                  <option value="linkedin">💼 LinkedIn</option>
                  <option value="tiktok">🎵 TikTok</option>
                </select>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="px-3 py-2 bg-black border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#00f0ff]"
                >
                  <option value="professional">💼 Professional</option>
                  <option value="friendly">😊 Friendly</option>
                  <option value="funny">😂 Funny</option>
                  <option value="luxury">✨ Luxury</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-2 text-red-400 text-xs mb-3">
                ❌ {error}
              </div>
            )}

            <button
              onClick={generatePosts}
              disabled={loading || !brand}
              className="w-full py-2 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black font-bold rounded-lg disabled:opacity-50 text-sm transition hover:opacity-90"
            >
              {loading ? '🤖 Generating...' : '✨ Generate Posts'}
            </button>

            {posts.length > 0 && (
              <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
                {posts.map((post: any, idx: number) => (
                  <div key={idx} className="bg-black/50 p-3 rounded-lg border border-gray-800">
                    <p className="text-xs whitespace-pre-wrap">{post.content}</p>
                    {post.hashtags && (
                      <p className="text-[#00f0ff] text-xs mt-2">{post.hashtags}</p>
                    )}
                    <button
                      onClick={() => copyToClipboard(post.content + '\n\n' + post.hashtags)}
                      className="mt-2 text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded transition"
                    >
                      📋 Copy
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}