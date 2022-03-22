import {
  createStyles,
  ITheme,
  makeStyles,
} from "@chainsafe/common-theme"
import React from "react"
import { ReactNode } from "react"
import clsx from "clsx"
import { CssBaseline } from "@chainsafe/common-components"
import AppHeader from "./AppHeader"

interface IAppWrapper {
  children: ReactNode | ReactNode[]
}

const useStyles = makeStyles(
  ({constants}: ITheme) => {
    return createStyles({
      root: {
      },
      bodyWrapper: {
      },
      content: {
        marginTop: `${constants.headerHeight}px`
      },
    })
  },
)

const AppWrapper: React.FC<IAppWrapper> = ({ children }: IAppWrapper) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <article
        className={clsx(classes.bodyWrapper, {
        })}
      >
        <AppHeader />
        <section
          className={clsx(classes.content, {
          })}
        >
          {children}
        </section>
      </article>
    </div>
  )
}

export default AppWrapper
