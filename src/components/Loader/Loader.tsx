import React, { FC } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

import { colors } from '../../config/colors';

interface IProps {
  isLoading: boolean;
}

export const Loader: FC<IProps> = ({ isLoading }) => {
  return (
    <div aria-hidden="true" className="h-[60px] flex justify-center">
      <PacmanLoader loading={isLoading} color={colors.brand} size="30px" />
    </div>
  );
};
