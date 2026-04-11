'use client';

import dynamic from 'next/dynamic';

// Lazy load AIChatBot - se încarcă doar când e nevoie (după încărcarea paginii)
const AIChatBot = dynamic(() => import('./AIChatBot'), {
  ssr: false,
  loading: () => null
});

export default function ChatBotWrapper() {
  return <AIChatBot />;
}