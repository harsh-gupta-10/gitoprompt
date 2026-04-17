const steps = [
  {
    step: '1',
    title: 'Paste a Repository',
    desc: 'Enter any public GitHub repo URL or owner/repo shorthand into the search bar.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    step: '2',
    title: 'Fetch Repository Data',
    desc: 'We pull the README, recursive file tree, metadata, and language info via the GitHub API.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    step: '3',
    title: 'Generate AI Prompt',
    desc: 'GPT-4o analyzes the codebase and reverse-engineers a detailed, ready-to-use prompt.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 3L14 10L21 12L14 14L12 21L10 14L3 12L10 10L12 3Z" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="w-full py-20 anim-fade-up">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest mb-4"
            style={{ 
              border: '1px solid var(--border)',
              background: 'var(--badge-bg)',
              color: 'var(--ink-muted)'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            Simple & Fast
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1"
              style={{ 
                border: '2px solid var(--border-strong)',
                background: 'var(--bg-3)',
                boxShadow: 'var(--shadow-hard)'
              }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4"
                style={{ background: 'var(--red)' }}
              >
                {item.icon}
              </div>
              <div 
                className="text-[10px] font-black uppercase tracking-widest mb-1"
                style={{ color: 'var(--red)' }}
              >
                Step {item.step}
              </div>
              <h3
                className="text-base font-black mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
              >
                {item.title}
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
