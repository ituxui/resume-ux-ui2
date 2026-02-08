import styles from './ArticlesSection.module.scss';
import { Heading, Text } from '@shared/ui/sections';
import { Article } from './components/Article';
import { articlesList } from '@shared/data';


export function ArticlesSection() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading role="section" className={styles.heading}>
            Подарочки для Вас
          </Heading>
          <Text role="caption">Полезные материалы и статьи</Text>
        </div>

        <div className={styles.articles}>
          {articlesList.map((article) => (
            <Article
              key={article.key}
              heading={article.heading}
              description={article.description}
              imageSrc={article.imageSrc}
              to={article.to}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
