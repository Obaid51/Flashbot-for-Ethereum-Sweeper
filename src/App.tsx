import React from "react"
import { ThemeSwitcher } from "@chainsafe/common-theme"
import {
  Router,
} from "@chainsafe/common-components"
import Routes from "./Components/Routes"
import AppWrapper from "./Components/Layouts/AppWrapper"
import { lightTheme } from "./Themes/LightTheme"
import { DashboardProvider } from "./Contexts/DashboardContext/DashboardContext"

const App: React.FC<{}> = () => {
  return (
    <ThemeSwitcher themes={{ light: lightTheme }}>
      <Router>
        <DashboardProvider>
          <AppWrapper>
            <Routes />
          </AppWrapper>
        </DashboardProvider>
      </Router>
    </ThemeSwitcher>
  )
}

export default App
