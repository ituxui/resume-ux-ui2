import type {
  CompetitorAnalysis,
  TransformedCompetitorRow,

} from '@shared/data/competitors/competitors.types';

interface TransformResult {
  headerColumns: string[]; // Имена конкурентов
  rows: TransformedCompetitorRow[];
}

export const transformCompetitorsData = (competitors: CompetitorAnalysis[]): TransformResult => {
  const headerColumns = competitors.map(c => c.name);
  const allFeatureNames = new Set<string>();
  const featureCountMap = new Map<string, number>();

  // 1. Сбор всех уникальных фич
  competitors.forEach((competitor) => {
    competitor.features.forEach((feature) => {
      allFeatureNames.add(feature.name);

      const currentCount = featureCountMap.get(feature.name) || 0;
      featureCountMap.set(feature.name, currentCount + 1);
    });
  });

  // 2. Проверка целостности данных (Логгирование)
  const totalCompetitors = competitors.length;
  const warnings: string[] = [];

  featureCountMap.forEach((count, featureName) => {
    if (count !== totalCompetitors) {
      // Ищем, у кого есть эта фича, а у кого нет
      const have = competitors
        .filter(c => c.features.some(f => f.name === featureName))
        .map(c => c.name);

      const missing = competitors
        .filter(c => !c.features.some(f => f.name === featureName))
        .map(c => c.name);

      warnings.push(
        `⚠️ Несоответствие колонок! Фича "${featureName}"\n   - Присутствует у: ${have.join(', ')}\n   - Отсутствует у: ${missing.join(', ')}`
      );
    }
  });

  if (warnings.length > 0) {
    console.group('Competitors Data Analysis Report');
    console.warn(`Найдено ${warnings.length} несоответствий в структуре таблиц.`);
    warnings.forEach(w => console.log(w));
    console.groupEnd();
  } else {
    console.log('✅ Competitors Data Analysis: Структура данных идеальна (все фичи присутствуют у всех конкурентов).');
  }

  // 3. Создание строк таблицы (Pivot Data)
  const rows: TransformedCompetitorRow[] = Array.from(allFeatureNames).map((featureName) => {
    const row: TransformedCompetitorRow = { featureName };

    competitors.forEach((competitor) => {
      const featureData = competitor.features.find(f => f.name === featureName);
      // Если фичи нет у конкурента, мы можем положить заглушку или null
      // Но по типам таблицы ожидаем CompetitorFeature.
      // Создадим "пустую" фичу если данных нет, чтобы таблица не упала.
      row[competitor.name] = featureData || {
        name: featureName,
        has: false,
        advantages: '',
        disadvantages: 'Нет данных в исходном массиве'
      };
    });

    return row;
  });

  return { headerColumns, rows };
};
