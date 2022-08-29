import React, { FC } from 'react';
import { FaStar } from '@react-icons/all-files/fa/FaStar';

import { languageLogoMapping } from '../../config/language-logo-mapping';

interface IProps {
  name: string;
  description: string | null;
  url: string;
  starCount: number;
  language: string | null;
}

export const Repo: FC<IProps> = ({
  name,
  starCount,
  description,
  url,
  language,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      className="flex flex-col justify-between p-2 bg-gray-250 rounded-sm transition-colors hover:bg-gray-300 min-h-[100px]">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-bold md:text-lg pr-2">{name}</h2>
          <span className="flex items-center justify-center flex-shrink-0">
            <span className="mr-1">{starCount}</span>
            <FaStar size="18" />
          </span>
        </div>
        {description && <div className="block text-sm mb-4">{description}</div>}
      </div>
      {language && (
        <div className="text-sm flex items-center">
          {languageLogoMapping[language] && (
            <img
              className="w-5 h-5 mr-1.5"
              aria-hidden="true"
              alt={language}
              src={languageLogoMapping[language]}
            />
          )}
          {language}
        </div>
      )}
    </a>
  );
};
