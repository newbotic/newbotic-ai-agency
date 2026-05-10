'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setIsVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 text-center z-50">
      <p className="text-sm inline-block mr-4">We use cookies.</p>
      <button onClick={accept} className="bg-green-600 px-3 py-1 rounded text-sm mr-2">Accept</button>
      <button onClick={decline} className="bg-gray-600 px-3 py-1 rounded text-sm">Decline</button>
    </div>
  );
}
