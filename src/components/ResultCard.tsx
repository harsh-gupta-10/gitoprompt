import { useState, useRef } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface ResultCardProps {
  prompt: string;
  isLoading?: boolean;
}

export function ResultCard({ prompt, isLoading }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [shining, setShining] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;
  const charCount = prompt.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setShining(true);
    setTimeout(() => setCopied(false), 2200);
    setTimeout(() => setShining(false), 600);
  };

  return (
    <div
      className="w-full bg-[#1a1a1a] rounded-[20px] overflow-hidden shadow-xl anim-fade-scale"
      style={{ animationDuration: '0.55s' }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-6 py-4 border-b border-white/8">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/30">
            Reverse Engineered Prompt
          </span>
          {!isLoading && prompt && (
            <span className="text-[10px] text-white/20 font-mono anim-fade-up" style={{ animationDelay: '0.2s' }}>
              {wordCount.toLocaleString()} words · {charCount.toLocaleString()} chars
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          ref={btnRef}
          onClick={handleCopy}
          disabled={isLoading || !prompt}
          className="relative flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
          style={{
            background: copied ? '#22c55e' : '#F5C842',
            color: '#1A1A1A',
            transform: copied ? 'scale(1.04)' : 'scale(1)',
            boxShadow: copied ? '0 0 14px rgba(34,197,94,0.4)' : 'none',
          }}
        >
          {/* Shine sweep on copy */}
          <span
            className="absolute inset-0 bg-white/40 pointer-events-none"
            style={{
              transform: shining ? 'translateX(120%) skewX(-20deg)' : 'translateX(-120%) skewX(-20deg)',
              transition: 'transform 0.5s ease',
            }}
          />

          {copied ? (
            <>
              <CheckIcon className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Prompt body */}
      <div
        className="max-h-[520px] overflow-y-auto custom-scrollbar px-6 py-5"
      >
        {isLoading ? (
          /* Skeleton shimmer lines */
          <div className="space-y-2.5">
            {[100, 90, 80, 95, 70, 88, 60, 82].map((w, i) => (
              <div
                key={i}
                className="h-3 rounded-full"
                style={{
                  width: `${w}%`,
                  background: 'linear-gradient(90deg, #2a2a2a 25%, #333 50%, #2a2a2a 75%)',
                  backgroundSize: '200% auto',
                  animation: `shimmer 1.5s linear infinite ${i * 0.08}s`,
                }}
              />
            ))}
          </div>
        ) : (
          <pre
            className="whitespace-pre-wrap leading-[1.75] text-gray-300 text-[13px] selection:bg-amber-400 selection:text-black"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {prompt}
          </pre>
        )}
      </div>
    </div>
  );
}
