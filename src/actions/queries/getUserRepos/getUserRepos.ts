import axios from 'axios';
import { apiProviderConfig } from '../../../config/apiProviderConfig';
import { IGetUserReposResponse } from '../../../models/repo';

export const getUserRepos = async (
  username: string,
): Promise<IGetUserReposResponse> => {
  const { data } = await axios.get(
    `${apiProviderConfig.baseUrl}/users/${username}/repos`,
  );

  return data;
};
