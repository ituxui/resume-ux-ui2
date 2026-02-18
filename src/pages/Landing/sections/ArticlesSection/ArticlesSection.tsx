import styles from './ArticlesSection.module.scss';
import { Heading, Text } from '@components';
import { Article } from './components/Article';
import { articlesList } from '@shared/data';


export function ArticlesSection() {
  return (
    <div className={styles.wrapper} id="anchor-articles">
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading role="section" className={styles.heading}>
            Полезные материалы и статьи
          </Heading>
          <Text role="caption" className={styles[`heading--caption`]}>Подарочки для Вас</Text>
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
