import { LandingPage } from "@pages/Landing/Landing";
import { createHashRouter } from "react-router";
import { routeMap } from "./utils";
import {
  AeroaktProductPage,
  // DviprazDashboardProductPage,
  DviprazLandingProductPage,
  RdpDashboardProductPage,
  TsdProductPage,
  UipProductPage
} from "@pages";
import { App } from "../../app/ui/App";
import { PersonalInformation } from "@pages/Landing/sections";



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
        path: routeMap['case-uip']['path'],
        Component: UipProductPage
      },
      {
        path: routeMap['case-tsd']['path'],
        Component: TsdProductPage
      },
      {
        path: routeMap['case-dvipraz-landing']['path'],
        Component: DviprazLandingProductPage
      },
      // {
      //   path: routeMap['case-dvipraz-dashboard']['path'],
      //   Component: DviprazDashboardProductPage
      // },
      {
        path: routeMap['case-rdp-dashboard']['path'],
        Component: RdpDashboardProductPage
      },
      {
        path: routeMap['case-aeroakt']['path'],
        Component: AeroaktProductPage
      },

      // Статьи
      {
        path: routeMap['article-type-definition-framework']['path'],
        element: "ArticleTypeDefinitionFramework"
      },
      {
        path: routeMap['article-figma-automation-macros']['path'],
        element: "ArticleFigmaAutomationMacros"
      },
      {
        path: routeMap['article-alpha-colors']['path'],
        element: "ArticleAlphaColors"
      },

      // Обо мне (Бенто-секции)
      {
        path: routeMap['aboutme-personal']['path'],
        Component: PersonalInformation
      },
      {
        path: routeMap['aboutme-design-systems']['path'],
        element: "AboutmeDesignSystems"
      },
      {
        path: routeMap['aboutme-software']['path'],
        element: "AboutmeSoftware"
      },
      {
        path: routeMap['aboutme-education']['path'],
        element: "AboutmeEducation"
      },
      {
        path: routeMap['aboutme-soft-skills']['path'],
        element: "AboutmeSoftSkills"
      },
      {
        path: routeMap['aboutme-subscriptions']['path'],
        element: "AboutmeSubscriptions"
      },
      {
        path: routeMap['aboutme-library']['path'],
        element: "AboutmeLibrary"
      },
      {
        path: routeMap['aboutme-ai']['path'],
        element: "AboutmeAi"
      },
      {
        path: routeMap['aboutme-work-preferences']['path'],
        element: "AboutmeWorkPreferences"
      },
      {
        path: routeMap['aboutme-t-shape-skills']['path'],
        element: "AboutmeHardSkills"
      }
    ]
  }
]);
