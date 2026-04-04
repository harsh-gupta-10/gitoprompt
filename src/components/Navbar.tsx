import { useState } from 'react';
import { GithubIcon, SunIcon, MoonIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';

export function Navbar() {
  const [hovered, setHovered] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="flex items-center justify-between px-6 py-5 max-w-[700px] mx-auto w-full anim-fade-down"
      style={{ animationDuration: '0.5s' }}
    >
      {/* Logo */}
      <a
        href="/"
        className="group flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight transition-all duration-200"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Animated logo mark */}
        <span
          className="relative flex items-center justify-center w-7 h-7 rounded-md text-white text-xs font-black overflow-hidden"
          style={{ 
            background: 'var(--red)',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' 
          }}
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
      <div className="flex items-center gap-2">
        {/* Badge */}
        <span 
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors cursor-default select-none"
          style={{ 
            background: 'var(--badge-bg)', 
            border: '1px solid var(--border)',
            color: 'var(--ink-muted)' 
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 anim-heartbeat" />
          NVIDIA AI
        </span>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="relative p-2 rounded-xl transition-all duration-200 cursor-pointer group"
          style={{ 
            background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'transparent'
          }}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <div className="relative w-5 h-5">
            {/* Sun icon */}
            <SunIcon 
              className="w-5 h-5 absolute inset-0 transition-all duration-300"
              style={{
                color: 'var(--ink)',
                opacity: theme === 'light' ? 1 : 0,
                transform: theme === 'light' ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.5)',
              }}
            />
            {/* Moon icon */}
            <MoonIcon 
              className="w-5 h-5 absolute inset-0 transition-all duration-300"
              style={{
                color: 'var(--ink)',
                opacity: theme === 'dark' ? 1 : 0,
                transform: theme === 'dark' ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.5)',
              }}
            />
          </div>
        </button>

        {/* GitHub link */}
        <a
          href="https://github.com/harsh-gupta-10/gitoprompt"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-2 rounded-xl transition-all duration-200 cursor-pointer"
          style={{ 
            ['--hover-bg' as string]: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'var(--ink)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'var(--ink)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          title="View on GitHub"
        >
          <GithubIcon 
            className="w-5 h-5 transition-colors duration-200" 
            style={{ color: 'var(--ink)' }}
          />
        </a>
      </div>
    </nav>
  );
}
