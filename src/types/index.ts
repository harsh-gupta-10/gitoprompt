export interface GitHubRepoData {
  name: string;
  description: string;
  language: string;
  stars: number;
  fileTree: string;
  readme: string;
  pushedAt: string; // ISO timestamp of last push — used for cache invalidation
}

export interface ParsedRepo {
  owner: string;
  repo: string;
}
