import React, { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';

import { SearchContext } from '../../context/SearchContext';

const isValueValid = (value: string) => {
  const trimmedValue = value.trim();
  return trimmedValue.length >= 3;
};

const prepareValue = (value: string) => {
  return [(value: string) => value.trim()].reduce(
    (value, transformer) => transformer(value),
    value,
  );
};

export const SearchForm: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { updateSearchTerm, isError } = useContext(SearchContext)!;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isValueValid(inputValue)) {
      updateSearchTerm(prepareValue(inputValue));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setInputValue(value);
    setIsButtonDisabled(!isValueValid(value));
  };

  return (
    <form noValidate={true} onSubmit={handleFormSubmit}>
      <div className="flex flex-col gap-2">
        <input
          id="search-input"
          className={`flex-1 border p-2 bg-gray-100 rounded-sm transition-colors
        ${
          isError
            ? 'border-red-600 focus:border-red-600 focus:outline-red-600 text-black'
            : 'border-gray-300 focus:border-brand-500 focus:outline-brand-500'
        }`}
          type="text"
          title="Enter GitHub username"
          placeholder="Enter username"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={isButtonDisabled}
          className="w-full p-2 bg-brand-500 text-white font-bold disabled:bg-gray-300 disabled:cursor-not-allowed rounded-sm transition-colors hover:bg-brand-800 focus:bg-brand-800">
          Search
        </button>
      </div>
    </form>
  );
};
