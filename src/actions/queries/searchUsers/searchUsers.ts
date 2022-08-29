import axios from 'axios';
import { ISearchUsersResponse } from '../../../models/user';
import { apiProviderConfig } from '../../../config/apiProviderConfig';

export const searchUsers = async (
  searchTerm: string,
): Promise<ISearchUsersResponse> => {
  const { data } = await axios.get(
    `${apiProviderConfig.baseUrl}/search/users`,
    {
      params: {
        q: `${searchTerm} in:login`,
        per_page: 5,
        type: 'Users',
      },
    },
  );

  return data;
};
