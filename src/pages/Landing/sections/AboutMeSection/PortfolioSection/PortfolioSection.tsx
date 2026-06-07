
import { HeadingMainPage } from '@shared/ui/components';
import styles from './PortfolioSection.module.scss';
import { ProjectCard } from './ProjectCard/ProjectCard';
import { routeMap } from '@shared/routes';
// https://mui.com/material-ui/react-masonry/
import Masonry from '@mui/lab/Masonry';


export function PortfolioSection() {
  return (
    <div className={styles.wrapper} id="anchor-projects">
      <HeadingMainPage
        heading="Портфолио"
        description="Мои работы"
        className={styles.heading}
      />



      <div className={styles.container}>

        <Masonry
          columns={{ xs: 1, md: 2 }}  // md = 900px по умолчанию
          spacing={2}
        >

          <ProjectCard
            heading="Портал застройщика УИП"
            description="Web Portal, Enterprise SaaS, Real Estate, Гиперлокальный UX"
            img="/projects/uip/UIP Mockup.png"
            link={routeMap['case-tsd']['path']}
            alt='Портал застройщика УИП'

          />
          <ProjectCard
            heading="Терминал сбора данных для завода по заправке газов"
            description="Android App, Industry 4.0, IIoT, Industrial Automation"
            img="/projects/oxygen-plant/landing.jpg"
            link={routeMap['case-tsd']['path']}
            alt='Терминал сбора данных для завода по заправке газов'
          />
          <ProjectCard
            heading="Портал университета ДВИПРАЗ"
            description="Web Portal, Media Tech, Content Management System"
            img="/projects/dvipraz/dvipraz portal mockup.jpg"
            link={routeMap['case-dvipraz-landing']['path']}
            alt='Портал университета ДВИПРАЗ'
          />
          <ProjectCard
            heading="Сервис удалённого доступа через RDP"
            description="UX UI Head, Cybersecurity Tech, Remote Access"
            img="/projects/rdp/rdp-dashboard-hero.jpg"
            link={routeMap['case-rdp-dashboard']['path']}
            alt='Сервис удалённого доступа через RDP'
          />
          <ProjectCard
            heading="Cистема учёта пассажиров для аэропорта"
            description="Excel, Travel Tech, Transportation process automation"
            img="/projects/aeroakt/aeroaktMockup.jpg"
            link={routeMap['case-aeroakt']['path']}
            alt='Cистема учёта пассажиров для аэропорта'
          />
          {/* <div>
          <Heading role="subsection" className={styles.tableHeading}

          >

            Таблица всех проектов и сфер, для которых я создавал продукт
          </Heading>
          <Spheres />
        </div> */}

        </Masonry>
      </div>

    </div>
  );
}

