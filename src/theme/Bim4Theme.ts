import { createTheme, Theme } from "@mui/material/styles";
import { error, grey, primary, secondary, success, warning } from "./colorPalette";

const fontFamily = [
  "Roboto",
  "Open Sans",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Fira Sans",
  "Droid Sans",
  "Helvetica Neue",
  "sans-serif",
].join(",");

const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Create a theme instance.

const Bim4Theme = createTheme({
  palette: {
    primary: {
      ...primary,
      light: primary[100],
    },
    secondary,
    error,
    warning,
    success,
    text: { primary: grey[900], secondary: grey[800], disabled: grey[400] },
    divider: grey[400],
    grey: { ...grey },
    // background: { default: grey[100] },
  },

  typography: {
    fontFamily,
    htmlFontSize: 16,
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.5,
      color: primary[400]
    },
    overline: {
      fontSize: 14,
    },
    h1: {
      fontSize: 40,
      fontWeight: 500,
      lineHeight: 2.4,
    },
    h2: {
      fontSize: 32,
      fontWeight: 500,
      lineHeight: 2,
    },
    h3: {
      fontSize: 28,
      fontWeight: 500,
      lineHeight: 1.8,
    },
    h4: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.2,
      color: primary[500]
    },
    h6: {
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1,
    },
    subtitle2: {
      fontSize: 12,
      fontWeight: 700,
      lineHeight: 1.57,
      color: grey[800]
    }

  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.5,
        },

      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.5,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.5,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.2,
        },
      },
    },
    MuiListItemIcon : {
      styleOverrides:{
        root: {minWidth: 36}

      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
           "&:hover": {
             borderWidth: 1.5
           }
        }

      }
    },
    MuiFab: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: primary[600]
          }
        }
      }
    }

  },
});

const theme = { ...customTheme, ...Bim4Theme };

export type MuiThemeProps = Theme;

export default theme;
