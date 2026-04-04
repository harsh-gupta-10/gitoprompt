export interface GitHubRepoData {
  name: string;
  description: string;
  language: string;
  stars: number;
  fileTree: string;
  readme: string;
}

export interface ParsedRepo {
  owner: string;
  repo: string;
}
