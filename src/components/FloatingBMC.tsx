export function FloatingBMC() {
  return (
    <a 
      href="https://www.buymeacoffee.com/HarshGupta10" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-14 h-14 bg-[#FFDD00] rounded-full border-[2.5px] border-black text-black transition-all duration-300 transform hover:-translate-y-1.5 active:translate-y-0 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
      title="Buy me a coffee"
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        className="w-6 h-6 flex-shrink-0"
        strokeLinecap="round" 
        strokeLinejoin="round" 
      >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
      
      {/* Tooltip on hover */}
      <div className="absolute right-[calc(100%+12px)] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap bg-black text-white text-xs font-bold px-3 py-2 rounded-lg" style={{ fontFamily: 'var(--font-body)' }}>
        Buy me a coffee
        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-black transform -translate-y-1/2 rotate-45" />
      </div>
    </a>
  );
}
