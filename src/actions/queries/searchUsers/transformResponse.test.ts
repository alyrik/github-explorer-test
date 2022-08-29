import { transformResponse } from './transformResponse';

describe('transformResponse: searchUsers', () => {
  it('transforms response', async () => {
    const data = transformResponse({
      total_count: 100,
      incomplete_results: false,
      items: [{ login: 'login' }, { login: 'login2' }],
    });

    expect(data).toStrictEqual([{ login: 'login' }, { login: 'login2' }]);
  });
});
