import {
  createStyles,
  ITheme,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@chainsafe/common-theme"
import React, { useState } from "react"
import clsx from "clsx"
import { Button, HamburgerMenu, Link, NavLink, Typography, useLocation } from "@chainsafe/common-components"
import AppNav from "./AppNav"
import { CURRENCY_TOGGLE_HIDDEN, ROUTE_LINKS } from "../Routes"
import LogoPng from "../../Media/Robot_Emoji_OG.png"
import { Currency, useDashboard } from "../../Contexts/DashboardContext/DashboardContext"
import { Dashboard } from "../../Contexts/DashboardContext/Types"

const useStyles = makeStyles(
  ({ constants, breakpoints, palette, typography, zIndex }: ITheme) => {
    return createStyles({
      root: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: `${constants.headerHeight}px`,
        padding: `0 ${constants.generalUnit * 3}px`,
        backgroundColor: palette.additional.black as string,
        zIndex: zIndex?.blocker,
        [breakpoints.down("md")]: {
          justifyContent: "flex-start",
          padding: `0 ${constants.generalUnit * 2}px`,
        },
        [breakpoints.up("md")]: {
          justifyContent: "space-around",
        },
      },
      logo: {
        display: "block",
        position: "relative",
        height: 46,
        width: constants.logoSize as number,
        lineHeight: "46px",
        "& img": {
          width: constants.logoSize as number,
          height: constants.logoSize as number,
          display: "block",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, calc(-50% - 2px))"
        },
      },
      title: {
        cursor: "pointer",
        color: palette.additional.white as string,
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        "& span": {
          borderBottom: "none",
          fontWeight: typography.fontWeight.regular,
          margin: 0,
          fontSize: 32,
          padding: 0,
          display: "inline-block",
          verticalAlign: "center"
        },

        "& sub": {
          fontSize: 24,
        },
        "& a":{
          color: palette.additional.white as string,
          textDecoration: "none",
          "&:first-child": {
            // ICON
            marginRight: constants.generalUnit / 2
          }
        }
      },
      menuButton: {
        position: "absolute",
        transform: "translate(0, -50%) rotateY(180deg)",
        right: constants.generalUnit * 2,
        top: "50%",
        "& span": {
          backgroundColor: palette.additional.white as string
        }
      },
      desktopNav: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        flex: "1 1 0",
        height: "100%",
        alignItems: "center",
        "& > *": {
          padding: `0 ${constants.generalUnit * 5}px`
        }
      },
      link: {
        fontSize: 24,
        color: palette.additional.white as string,
        textDecoration: "none",
        fontWeight: typography.fontWeight.regular,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        "&.active": {
          fontWeight: typography.fontWeight.bold
        }
      },
      currencySelector: {
        fontSize: 24,
        textDecoration: "none",
        textTransform: "uppercase",
        fontWeight: typography.fontWeight.regular,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        "& svg": {
          width: 20,
          height: 20,
          marginRight: constants.generalUnit
        },
      }
    })
  },
)

const AppHeader = () => {
  const classes = useStyles()

  const [navOpen, setNavOpen] = useState(false)

  const { breakpoints }: ITheme = useTheme()
  const desktop = useMediaQuery(breakpoints.up("md"))
  const { endpoints } = useDashboard()
  const { currency, changeCurrency } = useDashboard()
  const { pathname } = useLocation()

  return (
    <header
      className={clsx(classes.root)}
    >
       <div className={classes.title}>
         <a rel="noopener noreferrer" target="_blank" href="https://github.com/flashbots/pm" className={classes.logo}>
          <img alt="robot emoji" src={LogoPng} />
         </a>
         <Link to={ROUTE_LINKS.Dashboard("network")}>
          <Typography variant="h1">
            Flashbots Dashboard<sub>&nbsp;v0</sub>
          </Typography>
         </Link>
      </div>
      {
        desktop && (<section className={classes.desktopNav}>
          {
            endpoints.map((dashboard: Dashboard, index: number) => (<NavLink className={classes.link} key={`nav-link-${index}`} to={ROUTE_LINKS.Dashboard(dashboard.name.toLocaleLowerCase())} >
              {dashboard.name}
            </NavLink>))
          }
          {
            Object.keys(ROUTE_LINKS).filter((key: string) => typeof (ROUTE_LINKS as {[index: string]: any})[key] == "string").map((routeName: string, index: number) => (<NavLink className={classes.link} key={`nav-link-${index}`} to={`${(ROUTE_LINKS as {[index: string]: any})[routeName]}`} >
              {routeName}
            </NavLink>))
          }
          {
            !CURRENCY_TOGGLE_HIDDEN.includes(pathname) && (
              <Button variant="outline" className={classes.currencySelector} onClick={() => changeCurrency(currency === Currency.USD ? Currency.ETH : Currency.USD  )}>
                <svg version="1.1"  x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" >
                  <g><path d="M417.2,91.8C281.5,200.6,145.8,309.5,10.1,418.4c326.6,0,653.1,0,979.7,0c-0.6-41.1,1.3-82.4-1-123.5c-6.6-38.6-48.1-42.1-79.5-39.8c-164,0-328.1,0-492.1,0C417.2,200.6,417.2,146.2,417.2,91.8z M10.1,581.6c0.6,41.1-1.3,82.4,1,123.5c6.6,38.6,48.1,42.1,79.5,39.8c164,0,328.1,0,492.1,0c0,54.4,0,108.9,0,163.3c135.7-108.9,271.4-217.7,407.1-326.6C663.3,581.6,336.7,581.6,10.1,581.6z"/></g>
                </svg>
                <span>
                  {
                    currency === Currency.USD ? Currency.ETH : Currency.USD  
                  }
                </span>
              </Button>
            )
          }
        </section>)
      }
      {
        !desktop && <>
          <div
            className={classes.menuButton}
          >
            <HamburgerMenu
              onClick={() => setNavOpen(!navOpen)}
              variant={navOpen ? "active" : "default"}
            />
          </div>
          <AppNav close={() => setNavOpen(false)} active={navOpen} />
        </>
      }
    </header>
  )
}

export default AppHeader
