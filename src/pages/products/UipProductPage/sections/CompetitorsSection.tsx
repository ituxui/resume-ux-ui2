import { type FC } from 'react';
import { CompetitorsTable } from '@components';
import { competitorsData } from '@shared/data/competitors/competitors.data';

export const CompetitorsSection: FC = () => {
  return (
    <CompetitorsTable data={competitorsData} />
  );
};
