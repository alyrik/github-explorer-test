import React, { FC } from 'react';

import Message from '../Message/Message';
import { useGetUserRepos } from '../../actions/queries/getUserRepos/useGetUserRepos';
import { Repo } from '../Repo/Repo';
import { Loader } from '../Loader/Loader';

interface IProps {
  username: string;
}

export const RepoList: FC<IProps> = ({ username }) => {
  const { data, isError, isLoading, isSuccess } = useGetUserRepos(username);

  return (
    <div className="flex flex-col gap-2">
      {isLoading && <Loader isLoading={true} />}
      {isError && (
        <Message type="error">
          Sorry, something went wrong. Probably rate limit exceeded.
        </Message>
      )}
      {!data?.length && isSuccess && (
        <Message type="notification">
          This user has no public repositories ¯\_(ツ)_/¯
        </Message>
      )}
      {data?.map((repo) => (
        <div key={repo.id} className="pl-4">
          <Repo
            name={repo.name}
            description={repo.description}
            starCount={repo.starCount}
            url={repo.url}
            language={repo.language}
          />
        </div>
      ))}
    </div>
  );
};
