import { createContext, FC, ReactNode, useEffect, useState } from 'react';

export type UpdateSearchTerm = (value: string) => void;

export interface ISearchContext {
  searchTerm: string;
  updateSearchTerm: UpdateSearchTerm;
  isError: boolean;
}

export const SearchContext = createContext<ISearchContext | null>(null);

export const SearchContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const updateSearchTerm: UpdateSearchTerm = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        updateSearchTerm,
        isError: false,
      }}>
      {children}
    </SearchContext.Provider>
  );
};
