import React, { FC, ReactNode } from 'react';

import { SearchContext, UpdateSearchTerm } from '../../context/SearchContext';

interface IProps {
  children: ReactNode;
  searchTerm?: string;
  updateSearchTerm?: UpdateSearchTerm;
  isError?: boolean;
}

export const SearchContextProviderMock: FC<IProps> = ({
  searchTerm,
  updateSearchTerm,
  isError,
  children,
}) => (
  <SearchContext.Provider
    value={{
      searchTerm: searchTerm ?? '',
      updateSearchTerm: updateSearchTerm || jest.fn(),
      isError: isError ?? false,
    }}>
    {children}
  </SearchContext.Provider>
);
