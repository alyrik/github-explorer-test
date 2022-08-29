import { IGetUserReposResponse, IRepo, IRepoRaw } from '../../../models/repo';

const transformRepo = (repo: IRepoRaw): IRepo => ({
  id: repo.id,
  name: repo.name,
  url: repo.html_url,
  description: repo.description,
  starCount: repo.stargazers_count,
  language: repo.language,
});

export const transformResponse = (data: IGetUserReposResponse): IRepo[] =>
  data.map(transformRepo) ?? [];
