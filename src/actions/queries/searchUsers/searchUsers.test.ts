import mockAxios from 'jest-mock-axios';

import { searchUsers } from './searchUsers';
import { apiProviderConfig } from '../../../config/apiProviderConfig';

const searchTerm = 'searchTermTest';

describe('searchUsers', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('requests correct URL', async () => {
    mockAxios.get.mockResolvedValue({ data: {} });

    await searchUsers(searchTerm);

    expect(mockAxios.get).toHaveBeenCalledWith(
      `${apiProviderConfig.baseUrl}/search/users`,
      { params: { per_page: 5, q: 'searchTermTest in:login', type: 'Users' } },
    );
  });

  it('returns data on success', async () => {
    const expectedData = {
      total_count: 100,
      incomplete_results: false,
      items: [{ login: 'login' }],
    };
    mockAxios.get.mockResolvedValue({ data: expectedData });

    const data = await searchUsers(searchTerm);

    expect(data).toEqual(expectedData);
  });
});
