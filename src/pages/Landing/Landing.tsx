import { AboutMeSection, ArticlesSection, Hero, LetsTalkSection, ProductsSection, Spheres } from './sections';
import { PageWrapper } from '@shared/ui/wrappers';


export function LandingPage() {
  return <PageWrapper>
    <Hero />
    <ProductsSection />
    <Spheres />
    <AboutMeSection />
    <ArticlesSection />
    <LetsTalkSection />
  </PageWrapper>;
}
