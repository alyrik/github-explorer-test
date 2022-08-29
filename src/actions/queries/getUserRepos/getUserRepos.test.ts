import mockAxios from 'jest-mock-axios';

import { getUserRepos } from './getUserRepos';
import { apiProviderConfig } from '../../../config/apiProviderConfig';

const searchTerm = 'searchTermTest';
// TODO:
describe('searchUsers', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('requests correct URL', async () => {
    mockAxios.get.mockResolvedValue({ data: { status: 'success' } });

    await getUserRepos(searchTerm);

    expect(mockAxios.get).toHaveBeenCalledWith(
      `${apiProviderConfig.baseUrl}/${searchTerm}`,
    );
  });

  it('returns data on success', async () => {
    const expectedData = { status: 'success', query: '111.111.111.111' };
    mockAxios.get.mockResolvedValue({ data: expectedData });

    const data = await getUserRepos(searchTerm);

    expect(data).toEqual(expectedData);
  });
});
