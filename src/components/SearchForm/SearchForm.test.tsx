import React from 'react';
import { render, screen } from '@testing-library/react';

import { SearchContextProviderMock } from '../../tests/mocks/SearchContextProvider.mock';
import { renderWithUserEvent } from '../../tests/utils/renderWithUserEvent';
import { SearchForm } from './SearchForm';

const inputPlaceholderText = 'IP or domain name';
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

    await user.type(input, 'google');

    expect(button).toBeDisabled();

    await user.clear(input);
    await user.type(input, 'google.com');

    expect(button).toBeEnabled();
  });

  describe('Successful search', () => {
    it('triggers context callback on submit', async () => {
      let calledTimes = 0;
      const updateSearchTermMock = jest.fn();
      const { user } = renderWithUserEvent(
        <SearchContextProviderMock updateSearchTerm={updateSearchTermMock}>
          <SearchForm />
        </SearchContextProviderMock>,
      );
      const input = getInput();
      const button = getButton();

      const testData = [
        ['  google.com  ', 'google.com'],
        ['https://amazon.com/test', 'amazon.com'],
        ['123.123.123.123  ', '123.123.123.123'],
        ['http://123.123.123.123  ', '123.123.123.123'],
      ];

      for (const [inputData, expectedData] of testData) {
        await user.clear(input);
        await user.type(input, inputData);
        await user.click(button);

        await expect(updateSearchTermMock).toHaveBeenCalledTimes(++calledTimes);
        await expect(updateSearchTermMock).toHaveBeenCalledWith(expectedData);
      }
    });
  });

  it('styles input properly on error', async () => {
    render(
      <SearchContextProviderMock isError={true}>
        <SearchForm />
      </SearchContextProviderMock>,
    );
    const input = getInput();

    expect(input).toHaveClass(
      'border-red-600 focus:border-red-600 focus:outline-red-600',
    );
  });
});
