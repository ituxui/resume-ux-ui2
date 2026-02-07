
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
      {
        path: routeMap.aeroakt,
        Component: AeroaktProductPage
      },
      {
        path: routeMap['dvipraz-dashboard'],
        Component: DviprazDashboardProductPage
      },
      {
        path: routeMap['dvipraz-landing'],
        Component: DviprazLandingProductPage
      },
      {
        path: routeMap['rdp-dashboard'],
        Component: RdpDashboardProductPage
      },
      {
        path: routeMap.tsd,
        Component: TsdProductPage
      },
      {
        path: routeMap.uip,
        Component: UipProductPage
      }
    ]
  }
]);
