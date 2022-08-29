import React from 'react';
import { render, screen } from '@testing-library/react';
import { UseQueryResult } from '@tanstack/react-query';

import * as useGetUserReposModule from '../../actions/queries/getUserRepos/useGetUserRepos';
import { RepoList } from './RepoList';
import { IRepo } from '../../models/repo';

const username = 'usernameText';

describe('RepoList', () => {
  const dataStub = [
    {
      description: 'description',
      id: 123,
      language: 'language',
      name: 'name',
      starCount: 456,
      url: 'html_url',
    },
    {
      description: 'description2',
      id: 678,
      language: 'language2',
      name: 'name2',
      starCount: 901,
      url: 'html_url2',
    },
  ];

  it('loads and shows repo list', () => {
    jest.spyOn(useGetUserReposModule, 'useGetUserRepos').mockReturnValue({
      data: dataStub,
    } as UseQueryResult<IRepo[]>);
    render(<RepoList username={username} />);

    dataStub.forEach((repo) =>
      expect(screen.getByText(repo.name)).toBeInTheDocument(),
    );
  });

  it('shows message if user has no repos', () => {
    jest.spyOn(useGetUserReposModule, 'useGetUserRepos').mockReturnValue({
      isSuccess: true,
    } as UseQueryResult<IRepo[]>);
    render(<RepoList username={username} />);

    expect(
      screen.getByText('This user has no public repositories ¯\\_(ツ)_/¯'),
    ).toBeInTheDocument();
  });

  it('shows error message on error', () => {
    jest.spyOn(useGetUserReposModule, 'useGetUserRepos').mockReturnValue({
      isError: true,
    } as UseQueryResult<IRepo[]>);
    render(<RepoList username={username} />);

    expect(
      screen.getByText(
        'Sorry, something went wrong. Probably rate limit exceeded.',
      ),
    ).toBeInTheDocument();
  });
});
