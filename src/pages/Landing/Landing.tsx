import { AboutMeSection, ArticlesSection, Hero, LetsTalkSection, ProductsSection, Spheres } from './sections';
import styles from './Landing.module.scss';


export function LandingPage() {
  return <div className={styles.wrapper}>
    <Hero />
    <ProductsSection />
    <Spheres />
    <AboutMeSection />
    <ArticlesSection />
    <LetsTalkSection />
  </div>;
}
