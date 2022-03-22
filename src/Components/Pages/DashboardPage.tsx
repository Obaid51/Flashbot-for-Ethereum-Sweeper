import { useParams } from "@chainsafe/common-components"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import React, { useEffect, useState } from "react"
import Iframe from "react-iframe"
import { useDashboard } from "../../Contexts/DashboardContext/DashboardContext"
import { Dashboard } from "../../Contexts/DashboardContext/Types"

const useStyles = makeStyles(
  ({ constants, breakpoints }: ITheme) => {
    return createStyles({
      root: {
        minHeight: `calc(100vh - ${constants.headerHeight}px)`,
        padding: `${constants.generalUnit}px ${constants.generalUnit * 2}px ${constants.generalUnit * 3}px ${constants.generalUnit * 2}px`,
      },
      dashArea: {
        minHeight: `calc(100vh - ${constants.headerHeight}px)`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr", // 12,
        gridAutoRows: "auto",
        columnGap: `${constants.generalUnit}px`,
        rowGap: `${constants.generalUnit}px`,
        [breakpoints.up("sm")]: {
          gridAutoRows: "minmax(20vh, auto)",
        }
      },
      widget: {

      },
      tableArea: {
        marginTop: constants.generalUnit * 3
      },
      tabs: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        marginBottom: constants.generalUnit * 2,
        [breakpoints.down("sm")]: {
          justifyContent: "space-between",
        },
        "& > *":{
          margin: `0 ${constants.generalUnit}px`
        }
      },
      table: {
        display: "none",
        visibility: "hidden",
        opacity: 0,
        minHeight: "300px",
        "&.active": {
          display: "block",
          visibility: "visible",
          opacity: 1,
        },
        "& iframe": {
          minHeight: "300px",
        }
      },
      fullIframe: {
        marginTop : `${constants.headerHeight}px`,
        height: `calc(100vh - ${constants.headerHeight}px)`,
        width: "100%",
      }
    })
  },
)

const DashboardPage = () => {
  const classes = useStyles()

  const { endpoints } = useDashboard()

  const { dashboard } = useParams<{ dashboard: string}>()

  const [target, setTarget] = useState<Dashboard>()

  useEffect(() => {
    if (endpoints && dashboard) {
      const temp = endpoints.find((item: Dashboard) => item.name.toLowerCase() === dashboard)
      if (temp && temp !== target) setTarget(temp)
    }
  }, [target, endpoints, dashboard])

  console.log(target)

  return target ? <Iframe className={classes.fullIframe} url={target.link} /> : <></>
  
}

export default DashboardPage
