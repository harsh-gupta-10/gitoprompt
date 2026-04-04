export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content:
        'By accessing and using GitoPrompt, you accept and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, do not use the service.',
    },
    {
      title: 'Service Description',
      content:
        'GitoPrompt is a free, open-source tool that reverse-engineers public GitHub repositories into AI prompts. The tool is provided "as-is" without warranty of any kind, express or implied.',
    },
    {
      title: 'Acceptable Use',
      content:
        'Do not use GitoPrompt for scraping, automated bulk requests, or any abuse of the service. Do not use the service for any illegal, harmful, or malicious purpose. Respect our fair use limits to ensure the service remains available for everyone.',
    },
    {
      title: 'Disclaimers',
      content:
        'GitoPrompt is not affiliated with, endorsed by, or sponsored by GitHub, Google, NVIDIA, or any other third party. The generated prompts are AI-generated approximations and may not accurately reflect the original development intent.',
    },
    {
      title: 'Limitation of Liability',
      content:
        'In no event shall GitoPrompt or its contributors be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of this service.',
    },
    {
      title: 'Contact',
      content:
        'For questions about these terms, please contact us at harshgupta24716@yahoo.com.',
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg)', fontFamily: 'var(--font-body)' }}
    >
      <main className="flex-grow max-w-[720px] mx-auto px-6 py-16 w-full">
        <div className="mb-10 anim-fade-up">
          <div 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest mb-5"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--badge-bg)',
              color: 'var(--ink-muted)'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--yellow)' }} />
            Legal
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            Terms of Service
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--ink-subtle)' }}>
            Last updated: April 4, 2026
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <div
              key={section.title}
              className="p-6 rounded-2xl anim-fade-up"
              style={{ 
                animationDelay: `${0.05 * (i + 1)}s`,
                border: '2px solid var(--border)',
                background: 'var(--bg-3)'
              }}
            >
              <h2
                className="text-base font-black mb-2 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
              >
                <span 
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-black text-[10px] font-black flex-shrink-0"
                  style={{ background: 'var(--yellow)' }}
                >
                  {i + 1}
                </span>
                {section.title}
              </h2>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
