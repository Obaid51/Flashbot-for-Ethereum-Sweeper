import { Link, Typography } from "@chainsafe/common-components"
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme"
import clsx from "clsx"
import React, { ReactNode } from "react"

const useStyles = makeStyles(
  ({ constants, typography, palette }: ITheme) => {
    return createStyles({
      root: {
        padding: constants.generalUnit * 4,
        borderRadius: constants.generalUnit * 2,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        border: `1px solid ${palette.additional.borderGray}`
      },
      title: {
        marginTop: 0,
        marginBottom: constants.generalUnit
      },
      itemArea: {

      },
      item: {
        display: "block",
        textDecoration: "none",
        color: palette.common.black.main,
        "& a": {
          color: palette.common.black.main,
          textDecoration: "none",
          display: "flex"
        },
        "& svg, & img": {
          maxHeight: 18,
          maxWidth: 18,
          marginRight: constants.generalUnit
        },
        "&:hover": {
          fontWeight: typography.fontWeight.bold
        }
      }
    })
  },
)

export interface IContentItem {
  content: ReactNode | string,
  url: string,
  type: "hash" | "internal" | "external"
}

export interface ITableOfContents {
  title?: string
  items: IContentItem[] 
  className?: string
}

const TableOfContents = ({
  title = "Table of Contents", 
  items,
  className
 }: ITableOfContents) => {
  const classes = useStyles()

  return <section className={clsx(classes.root, className)}>
    <Typography className={classes.title} variant="h3" component="h3">
      { title }
    </Typography>
    <div className={classes.itemArea}>
      {
        items.map((item: IContentItem, index: number) => {
         switch(item.type) {
            case "hash": 
              return (
                <Typography className={classes.item} key={`content-links-${index}`}>
                  <a href={item.url}>
                    {
                      item.content
                    }
                  </a>
                </Typography>
              
              )
            case "internal":
              return (
                <Typography className={classes.item} key={`content-links-${index}`}>
                  <Link to={item.url}>
                    {
                      item.content
                    }
                  </Link>
                </Typography>
              )
            case "external": 
              return (
                <Typography className={classes.item} key={`content-links-${index}`}>
                  <a rel="noopener noreferrer" target="_blank" href={item.url}>
                    {
                      item.content
                    }
                  </a>
                </Typography>
              )
            default:
              return (
                <Typography className={classes.item} key={`content-links-${index}`}>
                  <Link to={item.url}>
                    {
                      item.content
                    }
                  </Link>
                </Typography>
              )
         }
          
        })
      }
    </div>
  </section>
}

export default TableOfContents
