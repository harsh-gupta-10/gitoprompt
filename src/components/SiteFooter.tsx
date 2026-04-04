import { GithubIcon } from './Icons';

export function SiteFooter() {
  return (
    <footer 
      className="w-full border-t mt-auto relative z-20"
      style={{ 
        background: 'var(--card-bg)',
        borderColor: 'var(--border)'
      }}
    >
      <div className="max-w-[900px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <p className="text-[11px] font-bold text-white/25 tracking-wider order-2 sm:order-1">
          © {new Date().getFullYear()} GitoPrompt. All rights reserved.
        </p>

        {/* Right (Navigation + GitHub) */}
        <nav className="flex items-center gap-6 order-1 sm:order-2">
          {[
            { label: 'About', href: '/about' },
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms of Service', href: '/terms-of-service' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-bold text-white/30 hover:text-white/70 transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
          <div className="w-px h-3 bg-white/10 mx-2 hidden sm:block"></div>
          {/* GitHub link */}
          <a
            href="https://github.com/harsh-gupta-10/gitoprompt"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-lg hover:bg-white/5 transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4 text-white/25 hover:text-white/60 transition-colors" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
