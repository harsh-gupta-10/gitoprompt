export default function AboutPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg)', fontFamily: 'var(--font-body)' }}
    >
      <main className="flex-grow max-w-[720px] mx-auto px-6 py-16 w-full">
        {/* Page heading */}
        <div className="mb-16 anim-fade-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#1A1A1A]/12 bg-white/60 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/50 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5342A]" />
            About
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight text-[#1A1A1A] mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What is <span style={{ color: '#E5342A' }}>GitoPrompt</span>?
          </h1>
          <p className="text-[15px] text-black/50 leading-relaxed max-w-[560px]">
            GitoPrompt reverse-engineers any public GitHub repository into the AI prompt
            that could have built it. Paste a repo URL and get back a detailed, first-person
            prompt ready to feed into your favorite AI coding assistant.
          </p>
        </div>

        {/* How it works — 3 steps */}
        <div className="mb-16 anim-fade-up" style={{ animationDelay: '0.1s' }}>
          <h2
            className="text-2xl font-black tracking-tight text-[#1A1A1A] mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                step: '1',
                title: 'Paste a Repo',
                desc: 'Enter any public GitHub repository URL or owner/repo shorthand.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                ),
              },
              {
                step: '2',
                title: 'Fetch Data',
                desc: 'We pull the README, file tree, metadata, and language info via the GitHub API.',
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
                title: 'Generate Prompt',
                desc: 'AI analyzes the codebase and generates a comprehensive reverse-engineered prompt.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M12 3L14 10L21 12L14 14L12 21L10 14L3 12L10 10L12 3Z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl border-2 border-[#1A1A1A] bg-white transition-all duration-200 hover:-translate-y-1"
                style={{ boxShadow: '4px 4px 0px 0px rgba(26,26,26,1)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#E5342A] flex items-center justify-center text-white mb-4">
                  {item.icon}
                </div>
                <div className="text-[10px] font-black text-[#E5342A] uppercase tracking-widest mb-1">
                  Step {item.step}
                </div>
                <h3 className="text-base font-black text-[#1A1A1A] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {item.title}
                </h3>
                <p className="text-[13px] text-black/45 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Built by */}
        <div
          className="p-8 rounded-2xl border-2 border-[#1A1A1A] bg-[#1a1a1a] text-white anim-fade-up"
          style={{ animationDelay: '0.2s', boxShadow: '6px 6px 0px 0px rgba(229,52,42,1)' }}
        >
          <h2
            className="text-xl font-black tracking-tight mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Built by Harsh Gupta
          </h2>
          <p className="text-sm text-white/50 leading-relaxed mb-4">
            GitoPrompt is an open-source tool crafted with React, TypeScript, Tailwind CSS, and
            powered by NVIDIA AI. It was built to help developers understand existing codebases
            and create better AI prompts.
          </p>
          <a
            href="https://github.com/harsh-gupta-10/gitoprompt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E5342A] hover:text-[#ff6b6b] transition-colors"
          >
            View on GitHub →
          </a>
        </div>
      </main>
    </div>
  );
}
