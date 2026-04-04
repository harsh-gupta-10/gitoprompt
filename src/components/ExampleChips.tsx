import { useState } from 'react';

interface ExampleChipsProps {
  onSelect: (repo: string) => void;
}

const EXAMPLES = [
  { label: 'react', repo: 'facebook/react', color: '#61DAFB' },
  { label: 'supabase', repo: 'supabase/supabase', color: '#3ECF8E' },
  { label: 'linux', repo: 'torvalds/linux', color: '#F5C842' },
  { label: 'vite', repo: 'vitejs/vite', color: '#BD34FE' },
  { label: 'next.js', repo: 'vercel/next.js', color: '#E5342A' },
];

export function ExampleChips({ onSelect }: ExampleChipsProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
      <span
        className="text-[11px] font-bold uppercase tracking-widest mr-1 anim-fade-up"
        style={{ animationDelay: '0.1s', color: 'var(--ink-subtle)' }}
      >
        Try:
      </span>
      {EXAMPLES.map((ex, i) => (
        <button
          key={ex.repo}
          onClick={() => {
            setActive(ex.repo);
            onSelect(ex.repo);
            setTimeout(() => setActive(null), 600);
          }}
          className="chip-pop relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer overflow-hidden group"
          style={{ 
            animationDelay: `${0.12 + i * 0.055}s`,
            background: 'var(--chip-bg)',
            border: '1px solid var(--chip-border)',
            color: 'var(--ink-muted)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--chip-hover-border)';
            e.currentTarget.style.color = 'var(--ink)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--chip-border)';
            e.currentTarget.style.color = 'var(--ink-muted)';
          }}
        >
          {/* Hover fill bg */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-full"
            style={{ background: ex.color }}
          />

          {/* Active flash */}
          {active === ex.repo && (
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: ex.color,
                opacity: 0.15,
                animation: 'fade-scale 0.3s ease both',
              }}
            />
          )}

          {/* Color dot */}
          <span
            className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 -mb-px"
            style={{ background: ex.color, boxShadow: `0 0 5px ${ex.color}80` }}
          />
          {ex.label}
        </button>
      ))}
    </div>
  );
}
