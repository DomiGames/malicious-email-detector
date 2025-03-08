'use client';

import { useEffect } from 'react';

export default function BuyMeACoffee() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js';
    script.async = true;
    script.onload = () => {
      console.log('Buy Me a Coffee script loaded.');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <a
        href="https://www.buymeacoffee.com/dominio"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-5 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition"
      >
        ☕ Buy me a coffee
      </a>
    </div>
  );
}
