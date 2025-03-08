'use client';

import { FaGithub, FaXTwitter } from 'react-icons/fa6';

export default function SocialLinks() {
  return (
    <div className="mt-6 flex justify-center gap-6">
      <a
        href="https://github.com/DomiGames"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 hover:text-gray-600 transition"
      >
        <FaGithub size={32} />
      </a>
      <a
        href="https://x.com/domic137"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 hover:text-gray-600 transition"
      >
        <FaXTwitter size={32} />
      </a>
    </div>
  );
}
