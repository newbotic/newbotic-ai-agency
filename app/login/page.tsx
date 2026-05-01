'use client';

import { useState } from 'react';
import { supabase } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isLogin) {
      // LOGIN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
      }
    } else {
      // SIGNUP
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });
      
      if (error) {
        setError(error.message);
      } else {
        // Creează profilul în tabela profiles
        if (data.user) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            name: name,
            plan: 'starter'
          });
        }
        alert('Account created! Please check your email to confirm.');
        setIsLogin(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111115] rounded-xl border border-[#00f0ff]/30 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="font-black text-2xl text-black">N</span>
          </div>
          <h1 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-gray-400 text-sm mt-2">
            {isLogin ? 'Login to access your dashboard' : 'Start your AI journey today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#00f0ff]"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black font-bold rounded-lg disabled:opacity-50"
          >
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-400 hover:text-[#00f0ff] text-sm transition"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
