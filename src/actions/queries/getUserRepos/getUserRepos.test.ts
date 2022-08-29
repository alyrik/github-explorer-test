import mockAxios from 'jest-mock-axios';

import { getUserRepos } from './getUserRepos';
import { apiProviderConfig } from '../../../config/apiProviderConfig';

const username = 'username';

describe('getUserRepos', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('requests correct URL', async () => {
    mockAxios.get.mockResolvedValue({ data: {} });

    await getUserRepos(username);

    expect(mockAxios.get).toHaveBeenCalledWith(
      `${apiProviderConfig.baseUrl}/users/${username}/repos`,
    );
  });

  it('returns data on success', async () => {
    const expectedData = [{ id: 123 }];
    mockAxios.get.mockResolvedValue({ data: expectedData });

    const data = await getUserRepos(username);

    expect(data).toEqual(expectedData);
  });
});
