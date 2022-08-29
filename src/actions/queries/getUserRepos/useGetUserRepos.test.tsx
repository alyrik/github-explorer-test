import { renderHook, waitFor } from '@testing-library/react';

import { QueryClientProviderMock } from '../../../tests/mocks/QueryClientProvider.mock';
import { ReactElement } from 'react';
import * as getUserReposModule from './getUserRepos';
import { useGetUserRepos } from './useGetUserRepos';

const wrapper = ({ children }: { children: ReactElement }) => (
  <QueryClientProviderMock>{children}</QueryClientProviderMock>
);
const username = 'usernameTest';

describe('useGetUserRepos', () => {
  it('tests response', async () => {
    jest.spyOn(getUserReposModule, 'getUserRepos').mockResolvedValue([
      {
        id: 123,
        language: 'language',
        description: 'description',
        html_url: 'html_url',
        name: 'name',
        stargazers_count: 456,
      },
    ]);

    const { result } = renderHook(() => useGetUserRepos(username), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() =>
      expect(result.current.data).toStrictEqual([
        {
          description: 'description',
          id: 123,
          language: 'language',
          name: 'name',
          starCount: 456,
          url: 'html_url',
        },
      ]),
    );
  });
});
