import { createTheme } from "@mui/material";
import { error, grey, primary, secondary, success, warning } from "./colorPalette";


const fontSize = 14;

const fontFamily = [
    "Open Sans",
    "Roboto",
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

  
export const Bim4DarkTheme = createTheme({
    palette: {
        mode: 'dark',
      primary: {
        ...primary,
        light: primary[100],
      },
      secondary,
      error,
      warning,
      success,
      text: { primary: grey[900], secondary: grey[800], disabled: grey[400] },
      divider: grey[200],
      grey: { ...grey },
      background: { default: grey[100] },
    },
  
    typography: {
      fontSize,
      fontFamily,
      htmlFontSize: 16,
      body1: { fontSize },
      body2: { fontSize },
    }
  });
  