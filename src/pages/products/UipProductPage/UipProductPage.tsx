import { renderActions, renderDescription, renderMeta, renderScreens } from '@pages/Landing/sections/ProductsSection/ProductsSection.utils';
import { productsSection } from '@pages/Landing/sections/ProductsSection/ProductsSection.data';
import { ProductCard } from '@pages/Landing/sections';
import classNames from 'classnames';
import { Heading } from '@shared/ui';
import styles from './UipProductPage.module.scss';

export function UipProductPage() {

  // Добавь для отладки:
  console.log('styles:', styles);
  console.log('wrapper:', styles.wrapper);

  return (
    <div className={classNames(styles.wrapper)}>

      <div className={classNames(styles.hero, styles.section)}>


        <ProductCard
          companyName={"УИП"}
          projectName={"Многостраничный портал застройщика"}
          description={renderDescription(['Многостраничный информационный портал. Предоставляет информацию о жилых комплексах, коммерческих объектах и новостях компании. Включает в себя каталог объектов с фильтрами, страницы отдельных жилых комплексов, новости и акции компании, персональные разделы для каждого объекта недвижимости.'])}
          actions={renderActions(
            {
              actions: productsSection[0].actions,
              innerLink: productsSection[0].innerLink,
              mode: 'page',
            }
          )}
          summaryItems={renderMeta(productsSection[0].meta)}
          gallery={renderScreens(productsSection[0].screens)}
          // projectPageUrl={productsSection[0].projectPageUrl}
          mode="page"
          logo={productsSection[0].logo}
        />

      </div>


      <div className={classNames(styles.section, styles.text)}>
        <Heading role='section'>
          Кратко
        </Heading>
      </div>
    </div>);
}
