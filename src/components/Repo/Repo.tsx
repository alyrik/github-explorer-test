import React, { FC } from 'react';
import { FaStar } from '@react-icons/all-files/fa/FaStar';

interface IProps {
  name: string;
  description: string | null;
  url: string;
  starCount: number;
  language: string;
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
      className="block p-2 bg-gray-250 rounded-sm transition-colors hover:bg-gray-300">
      <span className="flex justify-between">
        <h2 className="font-bold text-lg mb-1">{name}</h2>
        <span className="flex items-center justify-center">
          <span className="mr-1">{starCount}</span>
          <FaStar size="18" />
        </span>
      </span>
      {description && <span className="block text-sm mb-1">{description}</span>}
      <span className="block text-sm">{language}</span>
    </a>
  );
};
