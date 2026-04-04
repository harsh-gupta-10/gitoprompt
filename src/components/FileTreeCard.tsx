import { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface FileTreeCardProps {
  tree: string;
  isLoading?: boolean;
  autoCollapse?: boolean;
}

export function FileTreeCard({ tree, isLoading, autoCollapse }: FileTreeCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-collapse when prompt result is ready
  useEffect(() => {
    if (autoCollapse) setCollapsed(true);
  }, [autoCollapse]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!tree) return;
    try {
      await navigator.clipboard.writeText(tree);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy tree:', err);
    }
  };

  return (
    <div
      className="w-full bg-[#1a1a1a] rounded-[20px] overflow-hidden shadow-xl anim-fade-scale scan-line-wrapper"
      style={{ animationDuration: '0.5s' }}
    >
      {/* Animated scan line — only while loading */}
      {isLoading && <div className="scan-line" />}

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          {/* Traffic lights */}
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />

          <span className="ml-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/30">
            File Tree
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 cursor-pointer ${
              copied 
                ? 'bg-green-500/10 border-green-500/30 text-green-500' 
                : 'bg-white/5 border-white/8 text-white/40 hover:text-white/70 hover:border-white/20'
            }`}
            title="Copy File Tree"
          >
            {copied ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <CopyIcon className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Toggle Button */}
          <button
            onClick={() => setCollapsed(c => !c)}
            className="text-[10px] font-bold uppercase tracking-wider text-white/30 hover:text-white/60 transition-colors px-3 py-1.5 rounded-lg border border-white/8 hover:border-white/20 cursor-pointer bg-white/5 h-8 flex items-center"
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
      </div>

      {/* Body */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: collapsed ? '0px' : '400px' }}
      >
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar px-6 py-5">
          <pre className="whitespace-pre-wrap leading-[1.7] text-[#F5C842] text-xs font-mono selection:bg-amber-400 selection:text-black">
            {tree || 'No file tree available.'}
          </pre>
        </div>
      </div>
    </div>
  );
}
