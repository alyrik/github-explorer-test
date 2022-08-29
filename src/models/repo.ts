export type IGetUserReposResponse = IRepoRaw[];

export interface IRepoRaw {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string;
}

export interface IRepo {
  id: number;
  name: string;
  url: string;
  description: string | null;
  starCount: number;
  language: string;
}
