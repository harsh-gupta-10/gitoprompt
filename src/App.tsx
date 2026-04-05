import { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ResultCard } from './components/ResultCard';
import { ExampleChips } from './components/ExampleChips';
import { FileTreeCard } from './components/FileTreeCard';
import { Sparkles } from './components/Sparkles';
import { FloatingBMC } from './components/FloatingBMC';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { SiteFooter } from './components/SiteFooter';
import { fetchGitHubData, callAI, fetchRepoPushedAt } from './services/api';
import { parseRepoInput } from './utils/repoParser';
import { STORAGE_KEY } from './constants';
import { supabase } from './lib/supabase';

// Animated loading stage indicator
const STAGES = [
  'Checking database cache...',
  'Verifying repo freshness...',
  'Fetching repository data from GitHub...',
  'Generating prompt with NVIDIA AI...',
];

function LoadingStage({ stage }: { stage: string }) {
  const idx = STAGES.indexOf(stage);
  return (
    <div className="w-full mb-8 anim-fade-down" key={stage}>
      {/* Steps row */}
      <div className="flex items-center justify-center gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
        {STAGES.map((s, i) => (
          <div key={s} className="flex items-center gap-2 shrink-0">
            <div
              className="flex items-center gap-1.5 transition-all duration-300"
              style={{ opacity: i > idx ? 0.3 : 1 }}
            >
              <span
                className="w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center transition-all duration-300 shrink-0"
                style={{
                  background: i < idx ? 'var(--green)' : i === idx ? 'var(--red)' : 'var(--border)',
                  color: i <= idx ? 'white' : 'var(--ink)',
                  transform: i === idx ? 'scale(1.15)' : 'scale(1)',
                  flex: '0 0 auto'
                }}
              >
                {i < idx ? '✓' : i + 1}
              </span>
              <span
                className="text-[10px] font-bold uppercase tracking-wider hidden sm:block"
                style={{ color: i === idx ? 'var(--red)' : i < idx ? 'var(--green)' : 'var(--ink)' }}
              >
                {s.replace('...', '').split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <div
                className="w-6 h-px transition-all duration-300"
                style={{ background: i < idx ? 'var(--green)' : 'var(--border)' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Active label + dot loader */}
      <div className="flex items-center justify-center gap-2.5" style={{ color: 'var(--red)' }}>
        <div className="dot-loader flex gap-1">
          <span /><span /><span />
        </div>
        <p className="text-xs font-bold uppercase tracking-wider">{stage}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [apiKey] = useState(() => {
    const envKey = import.meta.env.VITE_NVIDA_API_KEY;
    if (envKey && envKey !== '' && envKey !== 'your_nvidia_api_key_here') return envKey;
    return localStorage.getItem(STORAGE_KEY) || '';
  });

  const [repoInput, setRepoInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [repoTree, setRepoTree] = useState('');
  const [error, setError] = useState('');
  const [loadingStage, setLoadingStage] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  // Ref to always have latest repoInput without re-creating the callback
  const repoInputRef = useRef(repoInput);
  repoInputRef.current = repoInput;

  const handleGenerate = useCallback(async (inputOverride?: string) => {
    const input = inputOverride || repoInputRef.current;
    if (!input) return;

    if (!apiKey) {
      setError('NVIDIA API key is missing. Please set VITE_NVIDA_API_KEY in your .env file.');
      return;
    }

    const parsed = parseRepoInput(input);
    if (!parsed) {
      setError('Invalid input. Use "owner/repo" or a full GitHub URL.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');
    setRepoTree('');

    try {
      const repoIdentifier = `${parsed.owner}/${parsed.repo}`;

      // ── Step 1: Check database cache ──
      setLoadingStage('Checking database cache...');
      const { data: cached } = await supabase
        .from('repo_prompts')
        .select('prompt_text, file_tree, pushed_at')
        .eq('repo_name', repoIdentifier)
        .single();

      if (cached && cached.prompt_text) {
        // ── Step 2: Verify repo freshness against cached pushed_at ──
        setLoadingStage('Verifying repo freshness...');
        let isStale = false;

        try {
          const currentPushedAt = await fetchRepoPushedAt(parsed.owner, parsed.repo);
          if (currentPushedAt && cached.pushed_at) {
            // Repo has been updated since we cached the prompt
            isStale = new Date(currentPushedAt).getTime() > new Date(cached.pushed_at).getTime();
          } else if (currentPushedAt && !cached.pushed_at) {
            // Old cache entry without pushed_at — treat as stale to backfill
            isStale = true;
          }
          // If we couldn't fetch pushed_at (rate limit, etc.), serve cache
        } catch {
          console.warn('Freshness check failed, serving cached prompt.');
        }

        if (!isStale) {
          // Cache is fresh — serve it directly
          if (cached.file_tree) setRepoTree(cached.file_tree);
          setResult(cached.prompt_text);
          window.history.pushState({}, '', `/${repoIdentifier}`);
          return;
        }

        // Cache is stale — fall through to regenerate
        console.log(`Cache stale for ${repoIdentifier}, regenerating...`);
      }

      // ── Step 3: Fetch full repo data from GitHub ──
      setLoadingStage('Fetching repository data from GitHub...');
      const repoData = await fetchGitHubData(parsed.owner, parsed.repo);
      setRepoTree(repoData.fileTree);

      // ── Step 4: Generate prompt with AI ──
      setLoadingStage('Generating prompt with NVIDIA AI...');
      const promptResult = await callAI(apiKey, repoData);
      setResult(promptResult.text);

      // ── Step 5: Save / update cache in Supabase ──
      if (cached) {
        // Update existing row (cache was stale)
        const { error: updateError } = await supabase
          .from('repo_prompts')
          .update({
            prompt_text: promptResult.text,
            raw_json: promptResult.raw,
            file_tree: repoData.fileTree,
            pushed_at: repoData.pushedAt || null,
          })
          .eq('repo_name', repoIdentifier);
        if (updateError) console.error('Cache update error:', updateError);
      } else {
        // Insert new row
        const { error: insertError } = await supabase.from('repo_prompts').insert({
          repo_name: repoIdentifier,
          prompt_text: promptResult.text,
          raw_json: promptResult.raw,
          file_tree: repoData.fileTree,
          pushed_at: repoData.pushedAt || null,
        });
        if (insertError) console.error('Cache save error:', insertError);
      }

      window.history.pushState({}, '', `/${repoIdentifier}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setLoadingStage('');
    }
  }, [apiKey]); // No repoInput dependency — uses ref instead

  // Auto-fill from URL path on mount only
  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, '');
    if (path) {
      const parsed = parseRepoInput(path);
      if (parsed) {
        const repo = `${parsed.owner}/${parsed.repo}`;
        setRepoInput(repo);
        handleGenerate(repo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Clear everything: input, results, URL
  const handleClear = useCallback(() => {
    setRepoInput('');
    setResult('');
    setRepoTree('');
    setError('');
    window.history.pushState({}, '', '/');
  }, []);

  const showResults = result || loading;
  const isHeroMode = !showResults;

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden w-full bg-grid"
      style={{ background: 'var(--bg)', fontFamily: 'var(--font-body)' }}
    >
      {/* Floating decorative sparkles */}
      <Sparkles />

      {/* Subtle radial glow behind hero */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          background: `radial-gradient(circle, var(--glow-color) 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />

      <Navbar />

      <main
        className={`max-w-[720px] mx-auto px-6 flex flex-col relative w-full items-center transition-all duration-500 z-10 ${
          isHeroMode ? 'pt-16 pb-20' : 'pt-8 pb-32 flex-grow justify-start'
        }`}
      >
        {/* ── Hero ── */}
        <div
          className={`text-center mb-10 relative w-full flex flex-col items-center transition-all duration-500 ${
            !isHeroMode ? 'mb-8' : ''
          }`}
        >
          {/* Corner sparkles */}
          <div className="absolute -top-6 left-0 sm:left-6 anim-float" style={{ opacity: 0.7 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" fill="#E5342A" />
              <path d="M6 3L7 8L12 9L7 10L6 15L5 10L0 9L5 8L6 3Z" fill="#ff7da7" opacity="0.7" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 sm:right-4 anim-float-2" style={{ opacity: 0.65 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="#22c55e" />
              <path d="M18 14L18.5 17.5L22 18L18.5 18.5L18 22L17.5 18.5L14 18L17.5 17.5L18 14Z" fill="#F5C842" />
            </svg>
          </div>

          {/* Badge */}
          <div 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest mb-5 anim-fade-down" 
            style={{ 
              animationDelay: '0.1s',
              border: '1px solid var(--border)',
              background: 'var(--badge-bg)',
              color: 'var(--ink-muted)'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full anim-heartbeat" style={{ background: 'var(--red)' }} />
            NVIDIA AI
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl sm:text-6xl font-black leading-[1.05] tracking-tight mb-4 anim-fade-up"
            style={{ animationDelay: '0.15s', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
          >
            Repo
            <span className="relative mx-2 inline-block">
              <span
                className="relative z-10"
                style={{ color: 'var(--red)' }}
              >
                to
              </span>
            </span>
            Prompt ✨
          </h1>

          <p
            className="text-sm sm:text-[15px] max-w-[380px] mx-auto leading-relaxed font-medium anim-fade-up"
            style={{ animationDelay: '0.22s', color: 'var(--ink-muted)' }}
          >
            Reverse-engineer any GitHub repository into the AI prompt that created it.
          </p>
        </div>

        {/* ── Input Section ── */}
        <section
          className="w-full mb-10 anim-fade-up"
          style={{ animationDelay: '0.28s' }}
        >
          <div
            className="w-full rounded-[24px] p-5 transition-all duration-300"
            style={{
              background: 'var(--bg-2)',
              border: '2px solid var(--border-strong)',
              boxShadow: inputFocused
                ? '4px 4px 0px 0px var(--red)'
                : 'var(--shadow-hard)',
            }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  id="repo-input"
                  placeholder="github.com/owner/repo"
                  value={repoInput}
                  onChange={(e) => setRepoInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  autoComplete="off"
                  spellCheck={false}
                  disabled={loading}
                  className="w-full px-5 py-4 pr-16 rounded-xl focus:outline-none text-[13px] placeholder:opacity-40 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed font-bold"
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--ink)'
                  }}
                />

                {/* Clear button — shown when there's text and not loading */}
                {repoInput && !loading && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-150 cursor-pointer"
                    style={{ background: 'var(--border)' }}
                    title="Clear"
                  >
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" style={{ color: 'var(--ink-muted)' }}>
                      <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}

                {/* Keyboard hint — shown when input is empty */}
                {!repoInput && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 pointer-events-none">
                    <kbd 
                      className="text-[9px] font-black px-1.5 py-0.5 rounded"
                      style={{ 
                        border: '1px solid var(--border)',
                        color: 'var(--ink-subtle)',
                        background: 'var(--bg)'
                      }}
                    >↵</kbd>
                  </div>
                )}
              </div>

              {/* CTA button */}
              <button
                id="get-prompt-btn"
                onClick={() => handleGenerate()}
                disabled={loading}
                className="relative px-8 py-4 rounded-xl font-black text-white text-sm uppercase tracking-wider overflow-hidden cursor-pointer transition-all duration-150 whitespace-nowrap disabled:cursor-wait active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                style={{
                  background: loading ? 'var(--red)' : 'var(--red)',
                  opacity: loading ? 0.7 : 1,
                  border: '1px solid var(--border-strong)',
                  boxShadow: loading ? 'none' : 'var(--shadow-btn)',
                }}
              >
                {/* Shine layer */}
                <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                {loading ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                      style={{ animation: 'spin-slow 0.6s linear infinite' }}
                    />
                    Working
                  </span>
                ) : (
                  'GET PROMPT'
                )}
              </button>
            </div>

            <ExampleChips onSelect={(repo) => {
              setRepoInput(repo);
              setTimeout(() => handleGenerate(repo), 50);
            }} />
          </div>
        </section>

        {/* ── Loading Stages ── */}
        {loadingStage && <LoadingStage stage={loadingStage} />}

        {/* ── Error ── */}
        {error && (
          <div
            className="w-full bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 font-bold text-sm text-center mb-8 anim-shake"
            style={{ animationDuration: '0.35s' }}
          >
            <span className="mr-2">⚠</span>{error}
          </div>
        )}

        {/* ── File Tree ── */}
        {repoTree && (result || loading) && (
          <div
            className="w-full mb-5"
            style={{
              opacity: loading && !result ? 0.75 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            <FileTreeCard tree={repoTree} isLoading={loading} autoCollapse={!!result} />
          </div>
        )}

        {/* ── Result ── */}
        {(result || loading) && (
          <div
            className="w-full"
            style={{
              opacity: loading ? 0.6 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            <ResultCard prompt={result || ''} isLoading={loading} />
          </div>
        )}
      </main>

      {/* ── Homepage sections — only in hero mode ── */}
      {isHeroMode && (
        <>
          <HowItWorks />
          <FAQ />
        </>
      )}

      {/* ── Global site footer ── */}
      <SiteFooter />

      {/* ── Floating BMC ── */}
      <FloatingBMC />
    </div>
  );
}
