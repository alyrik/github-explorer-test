import React, { FC, ReactNode } from 'react';

import { SearchContext, UpdateSearchTerm } from '../../context/SearchContext';

interface IProps {
  children: ReactNode;
  searchTerm?: string;
  updateSearchTerm?: UpdateSearchTerm;
}

export const SearchContextProviderMock: FC<IProps> = ({
  searchTerm,
  updateSearchTerm,
  children,
}) => (
  <SearchContext.Provider
    value={{
      searchTerm: searchTerm ?? '',
      updateSearchTerm: updateSearchTerm || jest.fn(),
    }}>
    {children}
  </SearchContext.Provider>
);
