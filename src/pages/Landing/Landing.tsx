import { AboutMeSection, ArticlesSection, Hero, LetsTalkSection, ProductsSection, Spheres } from './sections';


export function LandingPage() {
  return <>
    <Hero />

    {/* TODO: Вставить карточки Специализация, Сферы и другие, посмотреть то видео с идеальными резюме, смотреть что там было. А где портфолио проектов начинается вставить заголовок "Портфолио" */}

    {/* TODO: Сделать новый продукт ПРОКПД, там рассказать якобы об интервью, ВКС, бриф заказчику (с чего начал), какие макеты накидала нейронка
    С Аурой Комфорта тоже что-то такое написать, что был бриф, обсуждения, логотип и тд

    */}

    <ProductsSection />
    <Spheres />
    <AboutMeSection />
    <ArticlesSection />
    <LetsTalkSection />
  </>;
}
