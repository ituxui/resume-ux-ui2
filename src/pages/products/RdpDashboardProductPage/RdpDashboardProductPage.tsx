import { ProductCard } from "@pages/Landing/sections";
import { renderDescription, renderMeta, renderScreens } from "@pages/Landing/sections/ProductsSection/ProductsSection.utils";
import { tsdPersons } from "@shared/data";
import { productsSection } from "@shared/data/ProductsSection.data";
import { Heading, Text } from "@shared/ui";
import { List, ListItem, Persons } from "@shared/ui/components";
import { Stack } from "@shared/ui/wrappers";

export function RdpDashboardProductPage() {
  return <>

    <Stack page="article" width='container' role="subsection">

      <ProductCard
        companyName={"Stellar"}
        projectName={"Сервис удалённого доступа через RDP"}
        description={renderDescription(['Enterprise-решение для безопасного управления удалённым доступом через Remote Desktop Protocol. Я осуществил полный редизайн панели управления для сервиса безопасного удаленного доступа (RDP) и превратил «сырой» внутренний инструмента в конкурентоспособный продукт для выхода на внешний рынок.'])}
        // actions={renderActions(
        //   {
        //     actions: productsSection[1].actions,
        //     innerLink: productsSection[1].innerLink,
        //     mode: 'page',
        //   }
        // )}
        summaryItems={renderMeta(productsSection[3].meta)}
        gallery={renderScreens(productsSection[3].screens)}
        // projectPageUrl={productsSection[0].projectPageUrl}
        mode="page"
        logo={productsSection[3].logo}
      />
    </Stack>




    <Stack page="article" width="full" role="section">
      <Heading role="section">
        Контекст и вызов
      </Heading>



      <Stack page="article" width="text" role="subsection">
        <Heading role="subsection">
          Исходная ситуация
        </Heading>

        <Stack page="article" width="text" role="paragraph">
          <Text role='body'>
            Комплексный редизайн дашборд-системы, для существующего enterprise-продукта, используемого внутри компании. В ходе проекта необходимо полностью переработаны пользовательские пути, информационную архитектуру и ключевые бизнес-процессы.
          </Text>
        </Stack>
      </Stack>


      <Stack page="article" width="text" role="subsection">
        <Heading role="subsection">
          Ключевая проблема
        </Heading>
        <Stack page="article" width="text" role="paragraph">
          <Text role='body'>
            Предыдущая версия интерфейса не удовлетворяла потребностям целевой аудитории (системные администраторы, DevOps-инженеры, менеджеры по безопасности), поскольку была разработана без участия UX-специалистов в режиме rapid prototyping с использованием AI-генерации, что привело к критическим проблемам usability и низкому task completion rate.
          </Text>
        </Stack>
      </Stack>


      <Stack page="article" width="text" role="subsection">
        <Heading role="subsection">
          Бизнес-цели
        </Heading>

        <Stack page="article" width="text" role="none">
          <List>
            <ListItem>
              Подготовить продукт к выходу на B2B и B2C рынки, обеспечив конкурентоспособный UX.
            </ListItem>
            <ListItem>
              Снизить время получения выгоды (time-to-value) для новых пользователей
            </ListItem>
            <ListItem>
              Уменьшить нагрузку на техническую поддержку
            </ListItem>
            <ListItem>
              Обеспечить масштабируемость интерфейса под будущий функционал
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Stack>







    <Stack page="article" width="full" role="section">
      <Heading role="section">
        Исследовательская фаза
      </Heading>



      <Stack page="article" width="text" role="subsection">
        <Heading role="subsection">
          Исследование пользователей и контекста
        </Heading>

        <Stack page="article" width="text" role="paragraph">
          <Text role='body'>
            Провёл серию глубинных интервью с пользователями текущего продукта, включая супер-администраторов и системных администраторов. Применил методологию Jobs-to-be-Done для анализа потребностей и контекста использования, собрал качественную обратную связь о pain points существующего решения.
          </Text>
        </Stack>
      </Stack>
    </Stack>


    <Stack page="article" width='text' role="subsubsection">
      <Heading role='section'>
        User Personas
      </Heading>
      <Stack page="article" width='container' role="paragraph">
        <Text role='body'>
          На основе глубинных интервью сформировал 5 ключевых персон
        </Text>
      </Stack>
    </Stack>


    <Stack page="article" width='text' role="section">
      <Persons persons={tsdPersons} />
    </Stack>

  </>;
}
