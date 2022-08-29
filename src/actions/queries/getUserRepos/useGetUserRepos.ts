import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '..';
import { getUserRepos } from './getUserRepos';
import { transformResponse } from './transformers';

export function useGetUserRepos(username: string) {
  return useQuery(
    [QueryKey.GetUserRepos, username],
    () => getUserRepos(username),
    {
      staleTime: Infinity,
      select: transformResponse,
      retry: false,
    },
  );
}
