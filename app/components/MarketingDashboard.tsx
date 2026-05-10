'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase/client';

interface Post {
  id: number;
  content: string;
  hashtags: string;
  platform: string;
  status: string;
  created_at: string;
}

interface Document {
  id: number;
  file_name: string;
  content: string;
}

export default function MarketingDashboard() {
  const [brand, setBrand] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('professional');
  const [platform, setPlatform] = useState('instagram');
  const [context, setContext] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editHashtags, setEditHashtags] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        loadSavedPosts(session);
        loadDocuments(session);
        loadBrandContext(session);
      }
    });
  }, []);

  const loadSavedPosts = async (session: any) => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    
    setSavedPosts(data as Post[] || []);
  };

  const loadDocuments = async (session: any) => {
    const { data } = await supabase
      .from('brand_documents')
      .select('*')
      .eq('user_id', session.user.id);
    
    setDocuments(data as Document[] || []);
  };

  const loadBrandContext = async (session: any) => {
    const { data } = await supabase
      .from('brand_context')
      .select('*')
      .eq('user_id', session.user.id)
      .single();
    
    if (data) {
      setBrand(data.brand_name || '');
      setIndustry(data.industry || '');
      setTone(data.tone || 'professional');
      setContext(data.context || '');
    }
  };

  const saveBrandContext = async () => {
    if (!session) return;
    const { error } = await supabase
      .from('brand_context')
      .upsert({
        user_id: session.user.id,
        brand_name: brand,
        industry: industry,
        tone: tone,
        context: context
      });

    if (error) {
      setError('Failed to save context: ' + error.message);
    } else {
      setSuccess('Brand context saved!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const uploadDocument = async (file: File) => {
    if (!session) return;
    setUploading(true);
    
    const text = await file.text();
    
    const { error } = await supabase
      .from('brand_documents')
      .insert({
        user_id: session.user.id,
        file_name: file.name,
        content: text.substring(0, 5000)
      });

    if (error) {
      setError('Failed to upload: ' + error.message);
    } else {
      setSuccess('Document uploaded!');
      loadDocuments(session);
    }
    setUploading(false);
  };

  const deleteDocument = async (docId: number) => {
    if (!confirm('Are you sure?')) return;
    if (!session) return;
    
    const { error } = await supabase
      .from('brand_documents')
      .delete()
      .eq('id', docId);

    if (error) {
      setError('Failed to delete: ' + error.message);
    } else {
      setSuccess('Document deleted!');
      loadDocuments(session);
    }
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
        body: JSON.stringify({ brand, industry, tone, platform, context })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPosts(data.posts || []);
      setSuccess('Posts generated! Edit and save.');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (post: any, index: number) => {
    setEditingPost(index);
    setEditContent(post.content);
    setEditHashtags(post.hashtags || '');
  };

  const saveEdit = async (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = {
      ...updatedPosts[index],
      content: editContent,
      hashtags: editHashtags
    };
    setPosts(updatedPosts);
    setEditingPost(null);
    setSuccess('Post updated!');
  };

  const cancelEdit = () => {
    setEditingPost(null);
  };

  const savePost = async (post: any) => {
    if (!session) return;
    setSaving(true);

    const { error } = await supabase
      .from('posts')
      .insert({
        user_id: session.user.id,
        content: post.content,
        hashtags: post.hashtags,
        platform: platform,
        status: 'pending'
      });

    if (error) {
      setError('Failed to save: ' + error.message);
    } else {
      setSuccess('Post saved!');
      loadSavedPosts(session);
      setPosts(posts.filter(p => p.content !== post.content));
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
    <div className="space-y-6">
      <h2 className="text-xl font-bold">📝 Social Media Post Generator</h2>
      
      {/* Brand Context Section */}
      <div className="bg-[#111115] border border-gray-800 rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-3">🏢 Brand Context</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Brand name *</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g., Pizza Palace"
              className="w-full p-2 bg-black border border-gray-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Industry</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Restaurant, Tech, Fashion"
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
              {platforms.map(p => <option key={p} value={p}>{p.toUpperCase()}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-2 bg-black border border-gray-700 rounded-lg text-white"
            >
              {tones.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm text-gray-400 mb-1">Brand Description / Context</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Describe your brand, products, services..."
            rows={3}
            className="w-full p-2 bg-black border border-gray-700 rounded-lg text-white"
          />
        </div>
        
        <button
          onClick={saveBrandContext}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
        >
          Save Brand Context
        </button>
      </div>

      {/* RAG Documents Section */}
      <div className="bg-[#111115] border border-gray-800 rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-3">📄 Brand Documents (RAG)</h3>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer bg-[#00f0ff] text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
            <span className="mr-1">📁</span> Upload PDF/TXT
            <input
              type="file"
              accept=".pdf,.txt"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) uploadDocument(e.target.files[0]);
              }}
            />
          </label>
          {uploading && <span className="text-gray-400 text-sm">Uploading...</span>}
        </div>
        
        {documents.length > 0 && (
          <div className="mt-3 space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between gap-2 text-sm text-gray-400 bg-black/50 p-2 rounded">
                <span>📄 {doc.file_name}</span>
                <button onClick={() => deleteDocument(doc.id)} className="text-red-400 hover:text-red-300">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={generatePosts}
        disabled={loading || !brand}
        className="w-full py-3 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black font-bold rounded-lg disabled:opacity-50"
      >
        {loading ? 'Generating...' : '✨ Generate Posts'}
      </button>

      {error && <div className="text-red-400 text-sm">{error}</div>}
      {success && <div className="text-green-400 text-sm">{success}</div>}

      {/* Generated Posts */}
      {posts.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">📝 Generated Posts:</h3>
          {posts.map((post, idx) => (
            <div key={idx} className="bg-black/50 p-4 rounded-lg border border-gray-800 mb-3">
              {editingPost === idx ? (
                <div className="space-y-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-3 bg-black border border-gray-600 rounded-lg text-white text-sm"
                    rows={4}
                  />
                  <input
                    type="text"
                    value={editHashtags}
                    onChange={(e) => setEditHashtags(e.target.value)}
                    placeholder="Hashtags"
                    className="w-full p-2 bg-black border border-gray-600 rounded-lg text-white text-sm"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(idx)} className="text-xs bg-green-600 px-3 py-1 rounded">💾 Save</button>
                    <button onClick={cancelEdit} className="text-xs bg-gray-600 px-3 py-1 rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm whitespace-pre-wrap">{post.content}</p>
                  {post.hashtags && <p className="text-[#00f0ff] text-xs mt-2">{post.hashtags}</p>}
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => startEditing(post, idx)} className="text-xs bg-yellow-600 px-3 py-1 rounded">✏️ Edit</button>
                    <button onClick={() => copyToClipboard(post.content + '\n\n' + post.hashtags)} className="text-xs bg-gray-700 px-3 py-1 rounded">📋 Copy</button>
                    <button onClick={() => savePost(post)} disabled={saving} className="text-xs bg-green-600 px-3 py-1 rounded">💾 Save</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Saved Posts */}
      {savedPosts.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">📌 Saved Posts ({savedPosts.length})</h3>
          {savedPosts.map((post) => (
            <div key={post.id} className="bg-[#111115] p-4 rounded-lg border border-gray-800 mb-3">
              <p className="text-sm whitespace-pre-wrap">{post.content}</p>
              {post.hashtags && <p className="text-[#00f0ff] text-xs mt-2">{post.hashtags}</p>}
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Status: {post.status}</span>
                <button onClick={() => copyToClipboard(post.content + '\n\n' + post.hashtags)} className="text-xs bg-gray-800 px-3 py-1 rounded">📋 Copy</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

      {/* Butoane publicare */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => publishToFacebook(postContent)}
          className="text-xs bg-[#1877F2] text-white px-3 py-1 rounded"
        >
          📘 Facebook
        </button>
        <button
          onClick={() => publishToLinkedIn(postContent)}
          className="text-xs bg-[#0A66C2] text-white px-3 py-1 rounded"
        >
          🔗 LinkedIn
        </button>
      </div>
