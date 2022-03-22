import { CloseCirceSvg, NavLink, Typography, useLocation } from "@chainsafe/common-components"
import { createStyles, ITheme, makeStyles, useOnClickOutside } from "@chainsafe/common-theme"
import clsx from "clsx"
import React, { useRef } from "react"
import { Currency, useDashboard } from "../../Contexts/DashboardContext/DashboardContext"
import { Dashboard } from "../../Contexts/DashboardContext/Types"
import { CURRENCY_TOGGLE_HIDDEN, ROUTE_LINKS } from "../Routes"

const useStyles = makeStyles(
  ({ constants, breakpoints, zIndex, animation, palette }: ITheme) => {
    return createStyles({
      root: {
        position: "fixed",
        zIndex: zIndex?.blocker,
        top: 0,
        right: 0,
        height: "100%",
        transitionDuration: `${animation.translate}ms`,
        width: 0,
        opacity: 0,
        visibility: "hidden",
        "&.active": {
          opacity: 1,
          visibility: "visible",
          [breakpoints.up("xs")]: {
            width: "100%"
          },
          [breakpoints.up("sm")]: {
            width: "80vw"
          },
          [breakpoints.up("md")]: {
            width: "60vw"
          },
          [breakpoints.up("lg")]: {
            width: 450
          },
        }
      },
      nav: {
        backgroundColor: palette.common.white.main,
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        [breakpoints.up("xs")]: {
          width: "100%"
        },
        [breakpoints.up("sm")]: {
          width: "80vw"
        },
        [breakpoints.up("md")]: {
          width: "60vw"
        },
        [breakpoints.up("lg")]: {
          width: 450
        },
      },
      link: {
        padding: `2rem 0`,
        textDecoration: "none",
        textAlign: "center",
        display: "block",
        fontSize: "3rem",
        transitionDuration: `${animation.transform}ms`,
        "&:hover": {
          textDecoration: "underline",
        }
      },
      close: {
        position: "absolute",
        top: constants.generalUnit * 3,
        right: constants.generalUnit * 3,
        cursor: "pointer",
        "& svg": {
          width: 50,
          height: 50
        }
      },
      currencySelector: {
        fontSize: "1.5rem",
        display: "inline-flex",
        cursor: "pointer",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        bottom: constants.generalUnit * 2,
        "& svg": {
          width: constants.generalUnit * 3,
          height: constants.generalUnit * 3,
          marginBottom: constants.generalUnit * 2
        },
        "& span span": {
          textTransform: "uppercase"
        }
      }
    })
  },
)

interface IAppNav {
  active: boolean
  close: () => void
}

const AppNav = ({
  active,
  close
}: IAppNav) => {
  const classes = useStyles()
  const ref = useRef(null)
  useOnClickOutside(ref, () => close())
  const { endpoints } = useDashboard()

  const { currency, changeCurrency } = useDashboard()
  const { pathname } = useLocation()

  return <section ref={ref} className={clsx(
    classes.root,{
      "active": active
    }
  )}>
    <nav className={classes.nav}>
      <div className={classes.close}>
        <CloseCirceSvg onClick={() => close()} />
      </div>
      {
        endpoints.map((dashboard: Dashboard, index: number) => (<NavLink onClick={() => close()} className={classes.link} key={`nav-link-${index}`} to={ROUTE_LINKS.Dashboard(dashboard.name.toLocaleLowerCase())} >
          {dashboard.name}
        </NavLink>))
      }
      {
        Object.keys(ROUTE_LINKS).filter((key: string) => typeof (ROUTE_LINKS as {[index: string]: any})[key] == "string").map((routeName: string, index: number) => (<NavLink onClick={() => close()} className={classes.link} key={`nav-link-${index}`} to={`${(ROUTE_LINKS as {[index: string]: any})[routeName]}`} >
          {routeName}
        </NavLink>))
      }
      {
        !CURRENCY_TOGGLE_HIDDEN.includes(pathname) && (
          <Typography className={classes.currencySelector} onClick={() => changeCurrency(currency === Currency.USD ? Currency.ETH : Currency.USD  )}>
            <svg version="1.1"  x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" >
              <g><path d="M417.2,91.8C281.5,200.6,145.8,309.5,10.1,418.4c326.6,0,653.1,0,979.7,0c-0.6-41.1,1.3-82.4-1-123.5c-6.6-38.6-48.1-42.1-79.5-39.8c-164,0-328.1,0-492.1,0C417.2,200.6,417.2,146.2,417.2,91.8z M10.1,581.6c0.6,41.1-1.3,82.4,1,123.5c6.6,38.6,48.1,42.1,79.5,39.8c164,0,328.1,0,492.1,0c0,54.4,0,108.9,0,163.3c135.7-108.9,271.4-217.7,407.1-326.6C663.3,581.6,336.7,581.6,10.1,581.6z"/></g>
            </svg>
            <span>
              Change to <span>
                {
                  currency === Currency.USD ? Currency.ETH : Currency.USD  
                }
              </span>
            </span>
          </Typography>
        )
      }
    </nav>
  </section>
}

export default AppNav
