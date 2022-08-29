import { renderHook, waitFor } from '@testing-library/react';

import { QueryClientProviderMock } from '../../../tests/mocks/QueryClientProvider.mock';
import { ReactElement } from 'react';
import * as searchUsersModule from './searchUsers';
import { useSearchUsers } from './useSearchUsers';

const wrapper = ({ children }: { children: ReactElement }) => (
  <QueryClientProviderMock>{children}</QueryClientProviderMock>
);
const searchTerm = 'searchTermTest';

describe('useSearchUsers', () => {
  it('tests response', async () => {
    jest.spyOn(searchUsersModule, 'searchUsers').mockResolvedValue({
      total_count: 123,
      incomplete_results: false,
      items: [{ login: 'login' }],
    });

    const { result } = renderHook(
      () => useSearchUsers(searchTerm, { isEnabled: true }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() =>
      expect(result.current.data).toStrictEqual([{ login: 'login' }]),
    );
  });
});
