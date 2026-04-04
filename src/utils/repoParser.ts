import type { ParsedRepo } from '../types';

export function parseRepoInput(input: string): ParsedRepo | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // matches: owner/repo
  const slashMatch = trimmed.match(/^([^/]+)\/([^/]+)$/);
  if (slashMatch && !trimmed.includes('github.com')) {
    return { owner: slashMatch[1], repo: slashMatch[2] };
  }

  // matches: github.com/owner/repo or https://github.com/owner/repo
  try {
    const cleanUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    const url = new URL(cleanUrl);
    if (url.hostname.includes('github.com')) {
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        return { owner: parts[0], repo: parts[1] };
      }
    }
  } catch {
    // invalid URL
  }

  return null;
}
