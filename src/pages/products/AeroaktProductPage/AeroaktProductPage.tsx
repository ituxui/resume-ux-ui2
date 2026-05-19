import { ProductCard } from "@pages/Landing/sections";
import { renderDescription, renderMeta, renderScreens } from "@pages/Landing/sections/ProductsSection/ProductsSection.utils";
import { aeroactPersons } from "@shared/data"; // Создайте этот объект по аналогии с rdpPersons
import { productsSection } from "@shared/data/ProductsSection.data";
import { Heading, Text } from "@shared/ui";
import { Image, List, ListItem, Persons, Screen } from "@shared/ui/components";
import { Gallery, Stack } from "@shared/ui/wrappers";


export function AeroaktProductPage() {
  return (
    <>
      <Stack page="article" width='container' role="subsection">
        <ProductCard
          companyName={"ООО «Авиатерминал»"}
          projectName={"Автоматизация бизнес-зала"}
          description={renderDescription([
            'Иннициативный проект, выросший в полноценный внутренний продукт. Я с нуля спроектировал и разработал систему учёта пассажиров, которая устранила очереди в бизнес-зале и сократила время оформления документации с 3 часов до 20 минут в день.'
          ])}
          // Обновите индекс в productsSection под этот проект
          summaryItems={renderMeta(productsSection[4].meta)}
          gallery={renderScreens(productsSection[4].screens)}
          mode="page"
          logo={productsSection[4].logo}
        />
      </Stack>

      <Stack page="article" width="full" role="section">
        <Heading role="section">
          Контекст и вызов
        </Heading>

        <Stack page="article" width="text" role="subsection">
          <Heading role="subsection">
            Предпосылки разработки
          </Heading>
          <Stack page="article" width="text" role="paragraph">
            <Text role='body'>
              В 2016 году международный аэропорт Хабаровск присоединился к программам лояльности Priority Pass и Diners Club. Это привело к взрывному росту трафика: нагрузка на бизнес-зал выросла в десятки раз. На одном рейсе вместо привычных 3–7 посетителей стало 70–80 человек.
            </Text>
          </Stack>
        </Stack>

        <Stack page="article" width="text" role="subsection">
          <Heading role="subsection">
            Критическая проблема процессов
          </Heading>
          <Stack page="article" width="text" role="paragraph">
            <Text role='body'>
              Бизнес-процессы остались бумажными. Один сотрудник на стойке регистрации должен был обслуживать гостей и одновременно вручную заполнять кипу актов. Это приводило к огромным очередям из VIP-пассажиров, высокому проценту ошибок и колоссальному выгоранию персонала. Заполнение бумаг занимало до 3 часов за смену.
            </Text>
          </Stack>
        </Stack>

        <Stack page="article" width="text" role="subsection">
          <Heading role="subsection">
            Задачи продукта
          </Heading>
          <Stack page="article" width="text" role="none">
            <List>
              <ListItem>
                Избавить персонал от многократного ручного дублирования данных (на каждый рейс даты писались до 17 раз, номера рейсов — до 12 раз и многие другие данные).
              </ListItem>
              <ListItem>
                Ликвидировать очереди на стойке регистрации бизнес-зала.
              </ListItem>
              <ListItem>
                Устранить ошибки в финансовой отчетности, вызванные ручным подсчетом и неразборчивым почерком.
              </ListItem>
            </List>
          </Stack>
        </Stack>
      </Stack>

      <Stack page="article" width="full" role="section">
        <Heading role="section">
          Исследования и Эмпатия
        </Heading>

        <Stack page="article" width="text" role="none">
          <Heading role="subsection">
            Глубинное понимание болей
          </Heading>
          <Stack page="article" width="text" role="none">
            <Text role='body'>
              Имея опыт работы в бизнес-зале, я находился в идеальном контексте. Я провел серию интервью с коллегами (конечными пользователями), а также инициировал сложные согласования с руководством и бухгалтерией (стейкхолдерами), чтобы упростить бюрократические требования к сбору данных.
            </Text>
          </Stack>
        </Stack>
      </Stack>

      <Stack page="article" width='text' role="subsubsection">
        <Heading role='subsection'>
          Ключевая персона
        </Heading>
        {/* Не забудьте создать aeroactPersons в файле data.ts с данными Натальи */}
        <Stack page="article" width='text' role="section">
          <Persons persons={aeroactPersons} />
        </Stack>
        <Stack page="article" width='text' role="paragraph">
          <Text role='body'>
            <strong>Вывод:</strong> Пользователи испытывают стресс от потока людей и боятся сложных IT-систем. Интерфейс должен быть максимально "foolproof" (защищен от ошибок) и визуально не напоминать пугающие бухгалтерские программы.
          </Text>
        </Stack>
      </Stack>

      <Stack page="article" width='text' role="section">
        <Heading role='section'>
          UX/UI Решения в условиях ограничений
        </Heading>

        <Stack page="article" width='container' role="subsection">
          <Heading role='subsection'>
            Стек технологий: Выход за рамки Excel
          </Heading>
          <Text role='body'>
            Единственным доступным и согласованным инструментом на тот момент был MS Excel. Главным UX-вызовом было <strong>избавить пользователя от ощущения, что он работает в таблице</strong>. Я применил принципы проектирования SaaS-интерфейсов внутри табличной сетки.
          </Text>
        </Stack>

        <Stack page="article" width='container' role="subsection">
          <Heading role='subsection'>
            Card-based UI (Островной лейаут)
          </Heading>
          <Text role='body'>
            Вместо бесконечных строк я сгруппировал смысловые блоки в визуальные карточки. Использовал эффект отступов, скругления и мягкое выделение цветом для управления фокусом внимания.
          </Text>
        </Stack>

        <Stack page="article" width='container' role="subsection">
          <Heading role='subsection'>
            Zero Data Entry (Минимум ручного ввода)
          </Heading>
          <Text role='body'>
            Я спроектировал архитектуру единого окна. Сотрудник вводит данные пассажира всего <strong>один раз</strong> в главном Дашборде. Система сама подставляет текущую дату, аэропорт назначения, аббревиатуру авиакомпании и автоматически распределяет пассажиров по 10 разным актам.
          </Text>
        </Stack>

        <Stack page="article" width='container' role="subsection">
          <Heading role='subsection'>
            Сложная логика под капотом
          </Heading>
          <Text role='body'>
            Для реализации бесшовного опыта я написал сложные алгоритмы сортировки и VBA-скрипты. Страницы обновлялись автоматически в фоновом режиме, пустые ячейки скрывались, а система сама присваивала нужные префиксы (например, "VIP | ФИО") в зависимости от статуса гостя.
          </Text>
        </Stack>

        {/* <Stack page="article" width='full' role="paragraph">
           Укажите правильный путь к скриншоту интерфе
          <Screen src="/projects/aeroact/interface-preview.png" size="3/3" alt="Интерфейс системы Aeroact" scroll='static' />
        </Stack> */}
      </Stack>

      <Stack page="article" width="full" role="section">
        <Stack page="article" width="text" role="subsubsection">
          <Heading role="section">
            Импакт и Результаты
          </Heading>

          <Stack page="article" width="text" role="subsection">
            <Text role='body'>
              Внедрение системы кардинально изменило работу терминала. Бухгалтерия стала получать идеально сформированные печатные акты без ошибок, а сотрудники зала наконец-то смогли сфокусироваться на сервисе, а не на бумажной волоките.
            </Text>
          </Stack>
          <Stack page="article" width="text" role="subsection">
            <Text role='body'>
              Это не просто таблица в Excel. Это полный продуктовый цикл в миниатюре: выявление проблемы → исследование пользователей → проектирование интерфейса → разработка → согласование с бизнесом → внедрение → измеримый результат. Проект показал мне, что я хочу проектировать продукты, которые упрощают работу людей — и с тех пор это моя профессия.
            </Text>
          </Stack>

          <Stack page="article" width='container' role="section">
            <Gallery>
              <Screen src="/projects/aeroakt/Предыдущий акт.png" alt="Было" size='unset' addition={<Heading role='article'>Было</Heading>} scroll='static' />
              <Screen src="/projects/aeroakt/Новый акт.png" alt="Стало" size='unset' addition={<Heading role='article'>Стало</Heading>} scroll='static' />
            </Gallery>
          </Stack>

          <Stack page="article" width='container' role="subsection">
            <Stack page="article" width='container' role="paragraph">
              <Heading role='result-heading'>
                Время на заполнение отчетности сократилось с&nbsp;3&nbsp;часов
              </Heading>
            </Stack>
            <Heading role='result-value'>
              до 20 минут в день
            </Heading>
          </Stack>

          <Stack page="article" width='container' role="subsection">
            <Stack page="article" width='container' role="paragraph">
              <Heading role='result-heading'>
                Дублирование данных (дата, номер рейса, аэропорт и других) сведено
              </Heading>
            </Stack>
            <Heading role='result-value'>
              к 0 (Автоматизация)
            </Heading>
          </Stack>

          <Stack page="article" width='container' role="subsection">
            <Stack page="article" width='container' role="paragraph">
              <Heading role='result-heading'>
                Награда за оптимизацию бизнес-процессов (обычно вручается за 15 лет стажа, получена за 5)
              </Heading>
            </Stack>
            <Heading role='result-value'>
              Медаль за заслуги в авиации
            </Heading>
          </Stack>
          <Image src="/projects/aeroakt/Медаль.png" alt="Медаль за заслуги в авиации" />

        </Stack>
      </Stack>


      <Stack page="article" width='container' role="subsection">
        <Screen src="/projects/aeroakt/aeroaktMockup.jpg" alt="ДВИПРАЗ Портал Mockup" size='unset' scroll='static' />
      </Stack>
    </>
  );
}
