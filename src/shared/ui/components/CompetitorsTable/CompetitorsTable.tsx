import { type FC, useMemo } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Link,
} from '@components';
import { transformCompetitorsData } from '@shared/utils/competitorsTable.utils';
import type { CompetitorAnalysis, CompetitorFeature } from '@shared/data/competitors/competitors.types';
import { Advantage } from '../CompetitorCells/Advantage';
import { Disadvantage } from '../CompetitorCells/Disadvantage';
import { FeatureStatus } from '../CompetitorCells/FeatureStatus';

export interface CompetitorsTableProps {
  data: CompetitorAnalysis[];
  title?: string;
  className?: string;
}

export const CompetitorsTable: FC<CompetitorsTableProps> = ({
  data,
  title,
}) => {
  const { headerColumns, rows } = useMemo(() => {
    return transformCompetitorsData(data);
  }, [data]);

  return (
    <>
      {title && (
        <Text role="subheading" style={{ marginBottom: 24 }}>
          {title}
        </Text>
      )}

      <Table stickyHeader stickyColumns={1} size="sm">
        <TableHead>
          <TableRow>
            <TableCell width="200px">Функционал / Раздел</TableCell>
            {headerColumns.map((competitorName) => {
              // Ищем URL конкретного конкурента в исходных данных
              const url = data.find(c => c.name === competitorName)?.url;

              return (
                <TableCell key={competitorName} width="250px">
                  {url ? (
                    <Link
                      href={url}
                      phrase={competitorName}
                      invert={true}
                      target="_blank"
                      size="md"
                      accent="default"
                    />
                  ) : (
                    <Text role="body">{competitorName}</Text>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.featureName}>
              {/* Название фичи */}
              <TableCell>
                <Text role="button-md">{row.featureName}</Text>
              </TableCell>

              {/* Данные конкурентов */}
              {headerColumns.map((competitorName) => {
                const featureData = row[competitorName] as CompetitorFeature;

                return (
                  <TableCell key={competitorName} valign="top">
                    <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FeatureStatus status={featureData.has} />
                      <Text role="caption" colorScheme="muted">
                        {featureData.has === true ? 'Есть' : featureData.has === false ? 'Нет' : 'Частично'}
                      </Text>
                    </div>

                    <Advantage>{featureData.advantages}</Advantage>

                    {featureData.advantages && featureData.disadvantages && <div style={{ height: 8 }} />}

                    <Disadvantage>{featureData.disadvantages}</Disadvantage>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
