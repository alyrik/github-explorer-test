export interface ISearchUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: IUserRaw[];
}

export interface IUserRaw {
  login: string;
}

export interface IUser {
  login: string;
}
