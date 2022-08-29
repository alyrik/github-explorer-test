import React, { FC, useContext } from 'react';
import { screen } from '@testing-library/react';

import { SearchContext, SearchContextProvider } from './SearchContext';
import { renderWithUserEvent } from '../tests/utils/renderWithUserEvent';

const searchTerm = 'searchTermTest';
const updatedSearchTerm = 'updatedSearchTermTest';
const buttonText = 'Button';

export const Consumer: FC = () => {
  const { searchTerm, updateSearchTerm } = useContext(SearchContext)!;

  return (
    <>
      <span>{searchTerm}</span>
      <button onClick={() => updateSearchTerm(updatedSearchTerm)}>
        {buttonText}
      </button>
    </>
  );
};

const getButton = () => screen.getByText(buttonText);

describe('SearchContext', () => {
  it('provides searchTerm to children', () => {
    renderWithUserEvent(
      <SearchContextProvider searchTerm={searchTerm}>
        <Consumer />
      </SearchContextProvider>,
    );

    expect(screen.getByText(searchTerm)).toBeInTheDocument();
  });

  it('triggers context callback on submit', async () => {
    const { user } = renderWithUserEvent(
      <SearchContextProvider>
        <Consumer />
      </SearchContextProvider>,
    );

    const button = getButton();

    await user.click(button);

    expect(screen.getByText(updatedSearchTerm)).toBeInTheDocument();
  });
});
