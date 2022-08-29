import { useQuery } from '@tanstack/react-query';

import { QueryKey } from '..';
import { searchUsers } from './searchUsers';
import { transformResponse } from './transformResponse';

export function useSearchUsers(
  searchTerm: string,
  params: { isEnabled?: boolean },
) {
  return useQuery(
    [QueryKey.SearchUsers, searchTerm],
    () => searchUsers(searchTerm),
    {
      staleTime: Infinity,
      select: transformResponse,
      enabled: params.isEnabled,
      retry: false,
    },
  );
}
