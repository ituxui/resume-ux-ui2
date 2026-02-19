import { LandingPage } from "@pages/Landing/Landing";
import { createHashRouter } from "react-router";
import { routeMap } from "./utils";
import {
  AeroaktProductPage,
  DviprazDashboardProductPage,
  DviprazLandingProductPage,
  RdpDashboardProductPage,
  TsdProductPage,
  UipProductPage
} from "@pages";
import { App } from "../../app/ui/App";



export const router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: LandingPage
      },
      // Кейсы
      {
        path: routeMap['case-aeroakt'],
        Component: AeroaktProductPage
      },
      {
        path: routeMap['case-dvipraz-dashboard'],
        Component: DviprazDashboardProductPage
      },
      {
        path: routeMap['case-dvipraz-landing'],
        Component: DviprazLandingProductPage
      },
      {
        path: routeMap['case-rdp-dashboard'],
        Component: RdpDashboardProductPage
      },
      {
        path: routeMap['case-tsd'],
        Component: TsdProductPage
      },
      {
        path: routeMap['case-uip'],
        Component: UipProductPage
      },

      // Статьи
      {
        path: routeMap['article-type-definition-framework'],
        element: "ArticleTypeDefinitionFramework"
      },
      {
        path: routeMap['article-figma-automation-macros'],
        element: "ArticleFigmaAutomationMacros"
      },
      {
        path: routeMap['article-alpha-colors'],
        element: "ArticleAlphaColors"
      },

      // Обо мне (Бенто-секции)
      {
        path: routeMap['aboutme-personal'],
        element: "AboutmePersonal"
      },
      {
        path: routeMap['aboutme-design-systems'],
        element: "AboutmeDesignSystems"
      },
      {
        path: routeMap['aboutme-software'],
        element: "AboutmeSoftware"
      },
      {
        path: routeMap['aboutme-education'],
        element: "AboutmeEducation"
      },
      {
        path: routeMap['aboutme-soft-skills'],
        element: "AboutmeSoftSkills"
      },
      {
        path: routeMap['aboutme-subscriptions'],
        element: "AboutmeSubscriptions"
      },
      {
        path: routeMap['aboutme-library'],
        element: "AboutmeLibrary"
      },
      {
        path: routeMap['aboutme-ai'],
        element: "AboutmeAi"
      },
      {
        path: routeMap['aboutme-work-preferences'],
        element: "AboutmeWorkPreferences"
      },
      {
        path: routeMap['aboutme-t-shape-skills'],
        element: "AboutmeHardSkills"
      }
    ]
  }
]);
