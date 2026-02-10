export type CompetitorFeatureStatus = boolean | 'exclamationMark';

export interface CompetitorFeature {
  name: string;
  has: CompetitorFeatureStatus;
  advantages: string;
  disadvantages: string;
}

export interface CompetitorAnalysis {
  name: string;
  url: string;
  features: CompetitorFeature[];
}

// Тип для строки таблицы после трансформации
export interface TransformedCompetitorRow {
  featureName: string;
  // Ключ - имя конкурента, Значение - данные фичи
  [competitorName: string]: string | CompetitorFeature;
}
