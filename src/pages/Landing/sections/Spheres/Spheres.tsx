import { type FC, type ReactNode } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Link,
  HeadingMainPage,
} from '@components';
// Импортируем RouteKey
import { routeMap, type RouteKey } from '@shared/routes';
import { itSpheresData, type ProductTuple } from '@shared/data/itSpheres.data';
import styles from './Spheres.module.scss';
import { ProductCardOther } from '../ProductCard/ProductCardOther';

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

const renderProduct = (product: ProductTuple, index: number): ReactNode => {
  const [name, route, isNda] = product as [string, string | null, boolean | undefined];

  if (route) {
    return (
      <Link
        key={index}
        phrase={name}
        // Мы используем "as RouteKey", так как уверены (из проверки if (route)),
        // что если route есть, то это валидный ключ из наших данных.
        to={routeMap[route as RouteKey]['path']}
        size="md"
      />
    );
  }

  return (
    <Text key={index} role="link">
      {name}
      {isNda && (
        <>
          {' '}
          <Text role="caption" colorScheme="muted">(NDA)</Text>
        </>
      )}
    </Text>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// TABLE
// ═══════════════════════════════════════════════════════════════════════════

export const Spheres: FC = () => {
  return (
    <>
      {/* <ProductCardOther
        heading="Подводим итоги"
        description="Таблица всех сфер, для которых я создавал продукт"
      // description="Ниже таблица всех проектов и сфер, для которых я создавал продукт. У большого числа проектов, информация о которых не может быть разглашена полностью политиками NDA."
      // summaryItems={[
      //   <Meta title="PropTech / IoT / Smart Home" children="Панель управления для системы высотного умного дома" />,
      //   <Meta title="Landing Pages, WebDev" children="Разработка лендингов и информационных сайтов" />,
      //   <Meta title="EdTech, Application Security Training" children="Платформа образовательных курсов по кибербезопасности" />,
      //   <Meta title="Logistics Tech, E-commerce" children="Платформа международных операторов доставки грузов" />,
      // ]}
      /> */}

      <HeadingMainPage
        heading="Все сферы, для которых я создавал продукт"
        description="Подводим итоги"
        className={styles.heading}

      />

      <Table stickyHeader stickyColumns={1} size="lg" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell width="40%">Сфера</TableCell>
            <TableCell>IT-Продукты</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itSpheresData.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Text role="table-td">{item.sphere}</Text>
                <br />
                <Text role="caption" colorScheme="muted">
                  {item.additionalTitles}
                </Text>
              </TableCell>
              <TableCell>
                {item.products.map((product, pIdx) => renderProduct(product, pIdx))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
