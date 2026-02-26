import { type FC } from 'react';
import { CompetitorsTable } from '@components';
import { uipCompetitorsData } from '@shared/data/competitors/uipCompetitors.data';

export const CompetitorsSection: FC = () => {
  return (
    <CompetitorsTable data={uipCompetitorsData} />
  );
};
