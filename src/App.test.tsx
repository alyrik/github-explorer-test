import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';
import { QueryClientProviderMock } from './tests/mocks/QueryClientProvider.mock';
import { SearchContextProviderMock } from './tests/mocks/SearchContextProvider.mock';

describe('App', () => {
  it('renders main blocks', () => {
    render(
      <QueryClientProviderMock>
        <SearchContextProviderMock>
          <App />
        </SearchContextProviderMock>
      </QueryClientProviderMock>,
    );

    const searchBlock = screen.getByPlaceholderText('Enter username');

    expect(searchBlock).toBeInTheDocument();
  });
});
