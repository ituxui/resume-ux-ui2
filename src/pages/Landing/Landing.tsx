import { AboutMeSection, ArticlesSection, Hero, LetsTalkSection, ProductsSection } from './sections';
import styles from './Landing.module.scss';


export function LandingPage() {
  return <div className={styles.wrapper}>
    <Hero />
    <ProductsSection />
    <AboutMeSection />

    <ArticlesSection />
    <LetsTalkSection />
  </div>;
}
