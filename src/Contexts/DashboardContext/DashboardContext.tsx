import React, { useEffect, useState } from "react"
import { ETH_DASHBOARDS } from "../../Constants/EthDashboardUrls"
import { USD_DASHBOARDS } from "../../Constants/UsdDashboardUrls"
import { testLocalStorage } from "../../Utils/Helpers"
import { Dashboard } from "./Types"

type DashboardContextProps = {
  children: React.ReactNode | React.ReactNode[]
}

export enum Currency {
  USD = "usd",
  ETH = "eth"
}

type DashboardContext = {
  currency: Currency
  availableCurrencies: Currency[]
  endpoints: Dashboard[]
  changeCurrency: (option: Currency) => void
}

const DashboardContext = React.createContext<DashboardContext | undefined>(undefined)

const CURRENCY_KEY = "fbdash0.currency"

const DashboardProvider = ({ children }: DashboardContextProps) => {
  const currencyOptions = {
    [Currency.USD]: USD_DASHBOARDS,
    [Currency.ETH]: ETH_DASHBOARDS
  }

  const [currency, changeCurrency] = useState<Currency>(Currency.USD)
  const canUseLocalStorage = React.useMemo(() => testLocalStorage(), [])

  useEffect(() => {
    if (canUseLocalStorage) {
      const cached = localStorage.getItem(CURRENCY_KEY)
      if (!cached) {
        localStorage.setItem(CURRENCY_KEY, Currency.USD)
        changeCurrency(Currency.USD)
      } else {
        changeCurrency(cached as Currency)
      }
    } else {
      changeCurrency(Currency.USD)
    }
  }, [canUseLocalStorage])

  useEffect(() => {
    if (canUseLocalStorage) {
      const cached = localStorage.getItem(CURRENCY_KEY)
      if (cached !== currency) {
        localStorage.setItem(CURRENCY_KEY, currency)
      }
    }
    
  }, [currency, canUseLocalStorage])

  return (
    <DashboardContext.Provider
      value={{
        availableCurrencies: Object.keys(currencyOptions).map((key: string) => key as Currency),
        currency,
        changeCurrency,
        endpoints: currencyOptions[currency]
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

const useDashboard = () => {
  const context = React.useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

export { DashboardProvider, useDashboard }
