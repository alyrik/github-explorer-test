import React, { FC, useContext } from 'react';
import Collapsible from 'react-collapsible';
import { FaAngleDown } from '@react-icons/all-files/fa/FaAngleDown';

import { useSearchUsers } from '../../actions/queries/searchUsers/useSearchUsers';
import { SearchContext } from '../../context/SearchContext';
import Message from '../Message/Message';
import { RepoList } from '../RepoList/RepoList';
import { Loader } from '../Loader/Loader';

import './UserList.css';

export const UserList: FC = () => {
  const { searchTerm } = useContext(SearchContext)!;
  const isEnabled = Boolean(searchTerm);
  const { data, isError, isLoading } = useSearchUsers(searchTerm, {
    isEnabled,
  });

  return (
    <div className="flex flex-col gap-2">
      {isEnabled && isLoading && <Loader isLoading={true} />}
      {isError && (
        <Message type="error">
          Sorry, something went wrong. Probably rate limit exceeded.
        </Message>
      )}
      {data?.map((user) => (
        <Collapsible
          key={user.login}
          trigger={
            <span className="flex justify-between w-full">
              <span>{user.login}</span>
              <span className="flex items-center justify-center collapsible-trigger-icon transition-transform">
                <FaAngleDown size="22" />
              </span>
            </span>
          }
          lazyRender={true}
          transitionTime={300}
          tabIndex={0}
          triggerClassName="block p-2 w-full bg-gray-150 rounded-sm transition-colors hover:bg-gray-200"
          triggerOpenedClassName="block p-2 w-full bg-gray-150 rounded-sm transition-colors hover:bg-gray-200 collapsible-trigger-open"
          contentInnerClassName="py-2 min-h-[80px]">
          <RepoList username={user.login} />
        </Collapsible>
      ))}
    </div>
  );
};
