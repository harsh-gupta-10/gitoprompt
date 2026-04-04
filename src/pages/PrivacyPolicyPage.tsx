export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: 'Data Collection',
      content:
        'GitoPrompt does not collect any personal data. We do not use cookies, tracking pixels, analytics, or any form of user tracking. There is no server-side data storage of user information.',
    },
    {
      title: 'Caching & Database Storage',
      content:
        'When you generate a prompt for a repository, the resulting prompt and the repository\'s file structure are securely cached in our database. This ensures that if you or another user requests the same repository again, the prompt is delivered instantly without reprocessing. We do not store any personal data along with this cached content.',
    },
    {
      title: 'Third-Party APIs',
      content:
        'GitoPrompt uses the GitHub API to fetch public repository data and the NVIDIA AI API to generate prompts. These requests are made securely. We do not require or collect your personal API keys.',
    },
    {
      title: 'Cookies & Tracking',
      content:
        'We use zero cookies. We have zero tracking scripts. We have zero analytics. Your privacy is fully respected.',
    },
    {
      title: 'Contact',
      content:
        'If you have any questions about this privacy policy, please contact us at harshgupta24716@yahoo.com.',
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
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)' }} />
            Legal
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            Privacy Policy
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
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                  style={{ background: 'var(--green)' }}
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
