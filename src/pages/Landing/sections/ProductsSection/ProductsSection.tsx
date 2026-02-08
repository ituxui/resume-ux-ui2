
import { Meta } from '@shared/ui/sections';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductCardOther } from '../ProductCard/ProductCardOther';
import { productsSection } from './ProductsSection.data';
import { renderActions, renderDescription, renderMeta, renderScreens } from './ProductsSection.utils';

export const ProductsSection = () => {
  return (
    <section>
      {productsSection.map((project) => (
        <ProductCard
          key={project.id}
          companyName={project.companyName}
          projectName={project.projectName}
          description={renderDescription(project.description)}
          actions={renderActions(
            {
              actions: project.actions,
              innerLink: project.innerLink,
              mode: 'landing',
            },
          )}
          summaryItems={renderMeta(project.meta)}
          gallery={renderScreens(project.screens)}
          projectPageUrl={project.projectPageUrl}
          mode="landing"
        />
      ))}


      <ProductCardOther
        heading="Другие сферы"
        description="Также есть опыт в разработки большого числа проектов, информация о которых не может быть разглашена полностью политиками NDA, либо эти продукты находятся на стадии разработки."
        summaryItems={[
          <Meta title="PropTech / IoT / Smart Home" children="Панель управления для системы высотного умного дома" />,
          <Meta title="Landing Pages, WebDev" children="Разработка лендингов и информационных сайтов" />,
          <Meta title="EdTech, Application Security Training" children="Платформа образовательных курсов по кибербезопасности" />,
          <Meta title="Logistics Tech, E-commerce" children="Платформа международных операторов доставки грузов" />,
        ]}
      />
    </section>
  );
};
