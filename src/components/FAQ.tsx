import { useState } from 'react';

const faqs = [
  {
    q: 'What is GitoPrompt?',
    a: 'GitoPrompt is a free tool that reverse-engineers any public GitHub repository into the AI prompt that could have built it. It analyzes the file structure, README, and metadata to generate a detailed, first-person prompt.',
  },
  {
    q: 'Do I need my own API key?',
    a: 'No! GitoPrompt handles all the AI processing for you. You do not need to provide an API key, create an account, or configure anything.',
  },
  {
    q: 'Does this work with private repos?',
    a: 'Currently, GitoPrompt only works with public GitHub repositories. Private repos require authenticated access which is not supported at this time.',
  },
  {
    q: 'How accurate are the generated prompts?',
    a: 'The prompts are AI-generated approximations based on publicly available repository data. They capture the tech stack, architecture, and features but may not perfectly reflect the original developer\'s intent.',
  },
  {
    q: 'Is this free to use?',
    a: 'Yes, GitoPrompt is completely free. We cover the costs of the AI generation to make this tool accessible to the community.',
  },
  {
    q: 'Which AI model does this use?',
    a: 'GitoPrompt currently uses the Qwen 3.5 397B model via the NVIDIA API. The model was chosen for its excellent code understanding and detailed output quality.',
  },
  {
    q: 'Why are some prompts generated instantly?',
    a: 'To keep the service fast and efficient, we securely cache the generated prompts and file structures in our database. If another user has already generated a prompt for the same repository, we instantly deliver the cached version instead of making the AI reprocess the entire codebase.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--yellow)' }} />
            Questions
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div
          className="rounded-2xl border-2 bg-[#1a1a1a] overflow-hidden"
          style={{ 
            borderColor: 'var(--border-strong)',
            boxShadow: '6px 6px 0px 0px var(--red)' 
          }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`border-b border-white/8 last:border-b-0 ${
                  isOpen ? 'bg-white/[0.03]' : ''
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 transition-colors duration-200"
                      style={{
                        background: isOpen ? 'var(--red)' : 'rgba(255,255,255,0.08)',
                        color: isOpen ? 'white' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                      {faq.q}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-white/30 flex-shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-5 pl-[52px]">
                    <p className="text-[13px] text-white/40 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
