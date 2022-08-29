import React from 'react';
import { screen } from '@testing-library/react';

import { SearchContextProviderMock } from '../../tests/mocks/SearchContextProvider.mock';
import { renderWithUserEvent } from '../../tests/utils/renderWithUserEvent';
import { SearchForm } from './SearchForm';

const inputPlaceholderText = 'Enter username';
const buttonText = 'Search';

const getInput = () => screen.getByPlaceholderText(inputPlaceholderText);
const getButton = () => screen.getByText(buttonText);

describe('SearchForm', () => {
  it('changes button disabled state based on input value', async () => {
    const { user } = renderWithUserEvent(
      <SearchContextProviderMock>
        <SearchForm />
      </SearchContextProviderMock>,
    );
    const input = getInput();
    const button = getButton();

    expect(button).toBeDisabled();

    await user.clear(input);
    await user.type(input, 'g');

    expect(button).toBeEnabled();
  });

  it('triggers context callback on submit', async () => {
    const updateSearchTermMock = jest.fn();
    const { user } = renderWithUserEvent(
      <SearchContextProviderMock updateSearchTerm={updateSearchTermMock}>
        <SearchForm />
      </SearchContextProviderMock>,
    );
    const input = getInput();
    const button = getButton();

    await user.clear(input);
    await user.type(input, '  google  ');
    await user.click(button);

    await expect(updateSearchTermMock).toHaveBeenCalledTimes(1);
    await expect(updateSearchTermMock).toHaveBeenCalledWith('google');
  });
});
