import type { GitHubRepoData } from '../types';
import { SYSTEM_PROMPT } from '../constants';

export async function fetchGitHubData(owner: string, repo: string): Promise<GitHubRepoData> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token && token !== 'your_github_token_here' && token !== '') {
    headers.Authorization = `token ${token}`;
  }

  // Fetch repo metadata
  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  if (!repoRes.ok) {
    if (repoRes.status === 404) throw new Error('Repository not found.');
    if (repoRes.status === 403) throw new Error('GitHub API rate limit reached. Try again later or add a GitHub token to your .env.');
    throw new Error(`GitHub API error: ${repoRes.status}`);
  }
  const repoJson = await repoRes.json();

  // Fetch full recursive file tree via Git Trees API
  let fileTree = '';
  try {
    // Get the default branch's tree SHA
    const defaultBranch = repoJson.default_branch || 'main';
    const treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
      { headers }
    );

    if (treeRes.ok) {
      const treeJson = await treeRes.json();
      const items: { path: string; type: string }[] = treeJson.tree || [];

      // Filter out deep nesting (max depth 5) and limit total entries
      const MAX_DEPTH = 5;
      const MAX_ITEMS = 500;
      const filtered = items
        .filter((item: any) => {
          const depth = item.path.split('/').length;
          // Skip hidden dirs, node_modules, etc.
          if (item.path.startsWith('.git/')) return false;
          if (item.path.includes('node_modules')) return false;
          return depth <= MAX_DEPTH;
        })
        .slice(0, MAX_ITEMS);

      // Build a nested tree structure
      interface TreeNode {
        name: string;
        isDir: boolean;
        children: Map<string, TreeNode>;
      }

      const root: TreeNode = { name: '', isDir: true, children: new Map() };

      for (const item of filtered) {
        const parts = item.path.split('/');
        let current = root;
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (!current.children.has(part)) {
            current.children.set(part, {
              name: part,
              isDir: i < parts.length - 1 || item.type === 'tree',
              children: new Map(),
            });
          }
          current = current.children.get(part)!;
          // Mark as directory if we're traversing through it
          if (i < parts.length - 1) current.isDir = true;
        }
      }

      // Render tree with indentation characters
      function renderTree(node: TreeNode, prefix: string = ''): string {
        const entries = Array.from(node.children.values());
        // Sort: folders first, then alphabetical
        entries.sort((a, b) => {
          if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
          return a.name.localeCompare(b.name);
        });

        const lines: string[] = [];
        entries.forEach((entry, i) => {
          const isLast = i === entries.length - 1;
          const connector = isLast ? '└── ' : '├── ';
          const icon = entry.isDir ? '📁' : '📄';
          lines.push(`${prefix}${connector}${icon} ${entry.name}`);
          if (entry.isDir && entry.children.size > 0) {
            const childPrefix = prefix + (isLast ? '    ' : '│   ');
            lines.push(renderTree(entry, childPrefix));
          }
        });
        return lines.join('\n');
      }

      fileTree = renderTree(root);

      if (treeJson.truncated) {
        fileTree += '\n\n... (tree truncated — repository is very large)';
      }
    }
  } catch (e) {
    console.error('Failed to fetch tree:', e);
    fileTree = 'Could not fetch file tree.';
  }

  // Fetch README
  const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers });
  let readme = '';
  if (readmeRes.ok) {
    const readmeJson = await readmeRes.json();
    readme = atob(readmeJson.content);
  }

  return {
    name: repoJson.full_name,
    description: repoJson.description || 'No description provided.',
    language: repoJson.language || 'Unknown language',
    stars: repoJson.stargazers_count,
    fileTree,
    readme,
    pushedAt: repoJson.pushed_at || '',
  };
}

/**
 * Lightweight call — fetches only the repo metadata to check `pushed_at`.
 * Uses minimal bandwidth compared to the full fetchGitHubData.
 */
export async function fetchRepoPushedAt(owner: string, repo: string): Promise<string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token && token !== 'your_github_token_here' && token !== '') {
    headers.Authorization = `token ${token}`;
  }

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  if (!res.ok) {
    // If we can't check, treat cache as valid to avoid breaking the flow
    console.warn(`Could not check repo freshness: ${res.status}`);
    return '';
  }
  const json = await res.json();
  return json.pushed_at || '';
}

export async function callAI(apiKey: string, repoData: GitHubRepoData) {
  const trimmedFiles = repoData.fileTree.split('\n').slice(0, 80).join('\n');
  const trimmedReadme = repoData.readme.slice(0, 4000);

  const userPrompt = `${SYSTEM_PROMPT}\n\nDraft a detailed prompt for this repository:\nRepo: ${repoData.name}\nDescription: ${repoData.description}\nLanguage: ${repoData.language}\nFile structure:\n${trimmedFiles}\n\nREADME:\n${trimmedReadme}`;

  // Hackclub API via Vite proxy to avoid CORS
  const url = '/api/hackclub/proxy/v1/chat/completions';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        max_tokens: 4000,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('AI Error Response:', errorData);
      throw new Error(errorData.error?.message || errorData.detail || `AI API Error: ${res.status}`);
    }

    const data = await res.json();
    const rawResponse = JSON.stringify(data);

    // Standard OpenAI chat response: choices[0].message.content
    const text = data.choices?.[0]?.message?.content?.trim();

    if (!text) {
      console.log('Could not extract text from:', rawResponse.slice(0, 500));
      throw new Error('No readable response from the AI.');
    }

    return {
      text,
      raw: rawResponse,
    };
  } catch (err: any) {
    if (err.message === 'Failed to fetch') {
      throw new Error("Network error: Could not reach the AI API. Make sure your dev server is running with the proxy configured.");
    }
    throw err;
  }
}
