import { createContext, FC, ReactNode, useState } from 'react';

export type UpdateSearchTerm = (value: string) => void;

export interface ISearchContext {
  searchTerm: string;
  updateSearchTerm: UpdateSearchTerm;
}

export const SearchContext = createContext<ISearchContext | null>(null);

export const SearchContextProvider: FC<{
  children: ReactNode;
  searchTerm?: string;
}> = ({ children, searchTerm }) => {
  const [searchTermLocal, setSearchTerm] = useState(searchTerm ?? '');
  const updateSearchTerm: UpdateSearchTerm = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm: searchTermLocal,
        updateSearchTerm,
      }}>
      {children}
    </SearchContext.Provider>
  );
};
