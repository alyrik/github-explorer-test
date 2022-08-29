import React from 'react';
import { render, screen } from '@testing-library/react';
import { UseQueryResult } from '@tanstack/react-query';

import * as useSearchUsersModule from '../../actions/queries/searchUsers/useSearchUsers';
import { SearchContextProviderMock } from '../../tests/mocks/SearchContextProvider.mock';
import { UserList } from './UserList';
import { IUser } from '../../models/user';

const searchTerm = 'searchTermTest';

describe('UserList', () => {
  const dataStub = [
    {
      login: 'login',
    },
    {
      login: 'login2',
    },
  ];

  it('does not load data if no searchTerm', () => {
    const useSearchUsersSpy = jest
      .spyOn(useSearchUsersModule, 'useSearchUsers')
      .mockReturnValue({} as UseQueryResult<IUser[]>);
    render(
      <SearchContextProviderMock>
        <UserList />
      </SearchContextProviderMock>,
    );

    expect(useSearchUsersSpy).toHaveBeenCalledWith('', {
      isEnabled: false,
    });
  });

  it('loads and shows user list', () => {
    jest.spyOn(useSearchUsersModule, 'useSearchUsers').mockReturnValue({
      data: dataStub,
    } as UseQueryResult<IUser[]>);
    render(
      <SearchContextProviderMock searchTerm={searchTerm}>
        <UserList />
      </SearchContextProviderMock>,
    );

    dataStub.forEach((user) =>
      expect(screen.getByText(user.login)).toBeInTheDocument(),
    );
  });

  it('shows error message on error', () => {
    jest.spyOn(useSearchUsersModule, 'useSearchUsers').mockReturnValue({
      isError: true,
    } as UseQueryResult<IUser[]>);
    render(
      <SearchContextProviderMock searchTerm={searchTerm}>
        <UserList />
      </SearchContextProviderMock>,
    );

    expect(
      screen.getByText(
        'Sorry, something went wrong. Probably rate limit exceeded.',
      ),
    ).toBeInTheDocument();
  });
});
