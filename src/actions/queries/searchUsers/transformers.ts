import { IUser, IUserRaw, ISearchUsersResponse } from '../../../models/user';

const transformUser = (user: IUserRaw): IUser => ({
  login: user.login,
});

export const transformResponse = (data: ISearchUsersResponse): IUser[] =>
  data?.items.map(transformUser) ?? [];
