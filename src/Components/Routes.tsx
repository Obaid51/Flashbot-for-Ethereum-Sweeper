import React from "react"
import { Switch, Route, Redirect } from "@chainsafe/common-components"
import DashboardPage from "./Pages/DashboardPage"
import DataMetricsPage from "./Pages/DataMetricsPage"

export const ROUTE_LINKS = {
  "Data & Metrics": "/data-metrics",
  Dashboard: (dashboard: string) => `/${dashboard}`,
}

export const CURRENCY_TOGGLE_HIDDEN = [
  ROUTE_LINKS["Data & Metrics"]
]

const FilesRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path={ROUTE_LINKS["Data & Metrics"]}
        component={DataMetricsPage}
      />
      <Route
        exact
        path={ROUTE_LINKS.Dashboard(":dashboard")}
        component={DashboardPage}
      />
      <Redirect 
        exact
        path="/"
        to={ROUTE_LINKS.Dashboard("network")}
      />
    </Switch>
  )
}

export default FilesRoutes
