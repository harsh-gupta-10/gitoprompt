import { useState } from 'react';
import { GithubIcon } from './Icons';

export function Navbar() {
  const [hovered, setHovered] = useState(false);

  return (
    <nav
      className="flex items-center justify-between px-6 py-5 max-w-[700px] mx-auto w-full anim-fade-down"
      style={{ animationDuration: '0.5s' }}
    >
      {/* Logo */}
      <a
        href="/"
        className="group flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight text-[#1A1A1A] transition-all duration-200"
        style={{ fontFamily: 'var(--font-display)' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Animated logo mark */}
        <span
          className="relative flex items-center justify-center w-7 h-7 rounded-md bg-[#E5342A] text-white text-xs font-black overflow-hidden"
          style={{ transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          <svg
            viewBox="0 0 12 12"
            fill="currentColor"
            className="w-4 h-4"
            style={{
              transform: hovered ? 'scale(1.2) rotate(-8deg)' : 'scale(1) rotate(0deg)',
              transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <path d="M6 0L7 4L11 5L7 6L6 10L5 6L1 5L5 4L6 0Z" />
          </svg>
          {/* Shine sweep */}
          <span
            className="absolute inset-0 bg-white/30"
            style={{
              transform: hovered ? 'translateX(120%) skewX(-20deg)' : 'translateX(-120%) skewX(-20deg)',
              transition: 'transform 0.4s ease',
            }}
          />
        </span>
        <span className="group-hover:opacity-80 transition-opacity">GitoPrompt</span>
      </a>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        {/* Badge */}
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A]/5 border border-[#1A1A1A]/10 text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/50 hover:bg-[#1A1A1A]/8 transition-colors cursor-default select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 anim-heartbeat" />
          NVIDIA AI
        </span>

        {/* GitHub link */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-2 rounded-xl hover:bg-[#1A1A1A] transition-all duration-200 cursor-pointer"
          title="View on GitHub"
        >
          <GithubIcon className="w-5 h-5 text-[#1A1A1A] group-hover:text-white transition-colors duration-200" />
        </a>
      </div>
    </nav>
  );
}
