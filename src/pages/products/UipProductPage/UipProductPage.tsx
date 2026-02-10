import { renderActions, renderDescription, renderMeta, renderScreens } from '@pages/Landing/sections/ProductsSection/ProductsSection.utils';
import { productsSection } from '@pages/Landing/sections/ProductsSection/ProductsSection.data';
import { ProductCard } from '@pages/Landing/sections';
import classNames from 'classnames';
import { Heading, Text } from '@shared/ui';
import styles from './UipProductPage.module.scss';
import { List, ListItem, Persons, Screen, Table, TableBody, TableCell, TableHead, TableRow } from '@components';
import { Gallery } from '@shared/ui/wrappers';
import { uipPersons } from '@shared/data';

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


      <div className={styles.section}>
        <Heading role='section'>
          Кратко
        </Heading>
        <Text role='body'>
          В этом проекте я был ведущим UX UI дизайнером и плотно работал с продуктовым менеджером и программистами.
        </Text>
        <Text role='body'>
          Разработав информационный портал для компании застройщика, мы достигли следующих целей:
        </Text>
        <List role='body'>
          <ListItem>Формирование доверия к бренду через портфолио, отзывы и профессиональный дизайн</ListItem>
          <ListItem>Привлечение потенциальных клиентов тронулось с места, потому что предыдущие лендинги не вызывали доверия</ListItem>
          <ListItem>Сделали удобный и расширяемый портал для компании</ListItem>
        </List>
      </div>


      <div className={styles.section}>

        <Gallery>
          <Screen src="/projects/uip/page/Hero и о застройщике.png" alt="Hero и о застройщике" postfix="Hero и о застройщике" size='1/3' scroll='parallax' />
          <Screen src="/projects/uip/page/ЖК и другие проекты.png" alt="Жилые комплексы и другие проекты" postfix="Жилые комплексы и другие проекты" size='1/3' scroll='parallax' />
          <Screen src="/projects/uip/page/Новости и акции.png" alt="Новости и акции" postfix="Новости и акции" size='1/3' scroll='parallax' />
        </Gallery>
      </div>



      <div className={styles.section}>
        <Heading role='section'>
          Гипотетические прото-персоны на основе экспертных оценок
        </Heading>
        <Text role='body'>
          Основываясь на анализе конкурентов, переговоров с заказчиками и общих знаниях о рынке недвижимости, я выделил 5 ключевых сегментов аудитории, чтобы проверить свои дизайн-решения на разных сценариях
        </Text>
      </div>


      <div className={styles.section}>
        <Persons persons={uipPersons} />
      </div>



      <div className={styles.section}>
        <Heading role='section'>
          Анализ прямых и косвенных конкурентов
        </Heading>
        <Text role='body'>
          Провели анализ, чтобы выявить их сильные и слабые стороны, лучшие практики UX/UI, функционал, структуру и подходы к подаче информации.
        </Text>
      </div>


      <div className={styles.section}>
        <Table stickyHeader stickyColumns={1} size="lg">
          <TableHead>
            <TableRow>
              <TableCell width="40%">Сфера</TableCell>
              <TableCell>IT-Продукты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Text role='table-td'>Cybersecurity Tech</Text>
                <br />
                <Text role='caption'>Access Control Systems, Network Security</Text>
              </TableCell>
              <TableCell><Text role='table-td'>Приложение кибербезопасности (Remote Desktop Protocol)</Text></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>);
}
