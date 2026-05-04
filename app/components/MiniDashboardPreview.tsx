'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase/client';

export default function MiniDashboardPreview() {
  const [demoMode, setDemoMode] = useState(false);
  
  // Date demo (frumoase, atractive)
  const demoData = {
    leads: 12,
    chats: 45,
    posts: 23,
    bookings: 8,
    activity: [
      "Generated 3 posts for Instagram - Today",
      "New booking from Alex Popescu - Yesterday",
      "Chat with KNEXA about pricing - 2 days ago",
      "Posted on Facebook - 3 days ago"
    ]
  };

  const handleVoiceDemo = () => {
    alert("🎤 Voice Demo: 'Book a call tomorrow at 10am'");
  };

  const handlePostsDemo = () => {
    alert("📱 Marketing Demo: Generate posts for your brand");
  };

  return (
    <div className="bg-[#111115] border border-[#00f0ff]/30 rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">LIVE DEMO</span>
        </div>
        <span className="text-[10px] text-[#00f0ff]">Updated just now</span>
      </div>

      <h3 className="text-lg font-bold text-white mb-4 text-center">
        📊 Your Dashboard Preview
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-black/50 rounded-xl p-3 text-center border border-gray-800">
          <div className="text-2xl mb-1">👔</div>
          <div className="text-xl font-bold text-[#00f0ff]">{demoData.leads}</div>
          <div className="text-[10px] text-gray-500">SELLIX Leads</div>
        </div>
        <div className="bg-black/50 rounded-xl p-3 text-center border border-gray-800">
          <div className="text-2xl mb-1">🛟</div>
          <div className="text-xl font-bold text-[#00f0ff]">{demoData.chats}</div>
          <div className="text-[10px] text-gray-500">KNEXA Chats</div>
        </div>
        <div className="bg-black/50 rounded-xl p-3 text-center border border-gray-800">
          <div className="text-2xl mb-1">📣</div>
          <div className="text-xl font-bold text-[#00f0ff]">{demoData.posts}</div>
          <div className="text-[10px] text-gray-500">VYRAL Posts</div>
        </div>
        <div className="bg-black/50 rounded-xl p-3 text-center border border-gray-800">
          <div className="text-2xl mb-1">📅</div>
          <div className="text-xl font-bold text-[#00f0ff]">{demoData.bookings}</div>
          <div className="text-[10px] text-gray-500">APPO Bookings</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-black/30 rounded-xl p-4 mb-6">
        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          🔥 <span>Recent Activity</span>
        </p>
        <div className="space-y-2">
          {demoData.activity.map((activity, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
              <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full"></span>
              {activity}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleVoiceDemo}
          className="flex-1 bg-gradient-to-r from-[#00f0ff] to-[#b000ff] text-black font-bold py-2.5 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          🎤 Try Voice Demo
        </button>
        <button
          onClick={handlePostsDemo}
          className="flex-1 border border-[#00f0ff]/50 text-[#00f0ff] font-bold py-2.5 rounded-lg hover:bg-[#00f0ff]/10 transition flex items-center justify-center gap-2"
        >
          📱 Generate Posts
        </button>
      </div>

      {/* Footer CTA */}
      <div className="mt-6 pt-4 border-t border-gray-800 text-center">
        <p className="text-[10px] text-gray-500 mb-2">Join 15+ businesses already using Newbotic AI</p>
        <div className="flex justify-center gap-3">
          <a href="/signup" className="text-xs text-[#00f0ff] hover:underline">Sign Up Free →</a>
          <a href="/login" className="text-xs text-gray-400 hover:text-white">Login</a>
        </div>
      </div>
    </div>
  );
}
