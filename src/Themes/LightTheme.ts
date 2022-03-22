import { createTheme } from "@chainsafe/common-theme"

export const lightTheme = createTheme({
  globalStyling: {
    ":root": {
      "--generalSpacing": "8px",
      "--primaryMain": "#509ee3",
      "--secondaryMain": "#74838f",
      "--successMain": "#88BF4D",
      "--commonBlackMain": "#291F1E",
      "--commonWhiteMain": "#EBFAFF",
      "--gold": "#f9d45c",
      "--black": "#000000",
      "--white": "#ffffff",
      "--gray": "#C4C4C4",
      "--border-gray": "#E5E5E5",
      "--turquoise": "#E0F4F4",
      "--red": "#fa1e0e"
    },
    body: {
      fontFamily: `"Lato", sans-serif`
    }
  },
  themeConfig: {
    palette: {
      common: {
        black: {
          main: "var(--commonBlackMain)" // Black coffee
        },
        white: {
          main: "var(--commonWhiteMain)" // Azure X11 web color
        }
      },
      primary: {
        // main: "#A989C5" // African violet
        main: "var(--primaryMain)"
      },
      secondary: {
        // main: "#98D9D9" // Blizard blue
        main: "var(--secondaryMain)"
      },
      success: {
        main: "var(--successMain)" // Pistachio 
      },
      additional: {
        "black": "var(--black)",
        "white": "var(--white)",
        "gray": "var(--gray)",
        "borderGray": "var(--border-gray)",
        "turquoise": "var(--turquoise)",
        "red": "var(--red)",
        "gold": "var(--gold)"
      }
    },
    constants: {
      headerHeight: 100,
      readCopyWidth: 1440,
      logoSize: 45
    },
    overrides: {
      Button: {
        variants: {
          primary: {
            root: {
              backgroundColor: "var(--turquoise)",
              color: "var(--black)"
            },
            active: {
              backgroundColor: "var(--gray)",
            },
            focus: {
              backgroundColor: "var(--gray)",
            },
            hover: {
              backgroundColor: "var(--gray)",
            }
          },
          outline: {
            root: {
              backgroundColor: "var(--white)",
              color: "var(--black)"
            },
            active: {
             
            }
          }
        }
      },
      Typography: {
        h1: {
          margin: "var(--generalSpacing) 0 calc(var(--generalSpacing) * 2)",
          // paddingBottom: "var(--generalSpacing)"
        },
        h2: {
          margin: "var(--generalSpacing) 0 calc(var(--generalSpacing) * 1.5)",
          // paddingBottom: "var(--generalSpacing)",
          fontSize: 22,
          lineHeight: "38px"
        },
        h3: {
          margin: "calc(var(--generalSpacing) * 2) 0 0",
          fontSize: 18,
          lineHeight: "28px"
          // paddingBottom: "var(28--generalSpacing)"
        },
        body1: {
          fontSize: 14,
          lineHeight: "22px",
          padding: "var(--generalSpacing) 0"
        },
        root: {
          lineHeight: "1.4",
          "& sub":{
            fontSize: "30%",
            bottom: 0
          },
          "& a": {
            color: "var(--primaryMain)"
          },
          "& ul": {
            listStyle: "disc",
          },
          "& ol": {
            listStyle: "decimal"
          },
          "& ol,& ul": {
            margin: "var(--generalSpacing) 0",
            paddingLeft: "calc(var(--generalSpacing) * 3)",
            "& li": {

            }
          },
          "& i, & em": {
            fontStyle: "italic"
          },
          "& pre": {
            padding: "calc(var(--generalSpacing) * 2)",
            fontSize: "85%",
            backgroundColor: "#f7f7f7",
            wordBreak: "break-all",
            display: "block"
          }, 
          "& code": {
            backgroundColor: "whitesmoke",
            borderRadius: "3px",
            color: "inherit !important",
            display: "inline",
            wordWrap: "normal",
            overflow: "visible",
            maxWidth: "auto"
          },
          "& p": {
            padding: "var(--generalSpacing) 0"
          }
        }
      }
    },
  },
})
