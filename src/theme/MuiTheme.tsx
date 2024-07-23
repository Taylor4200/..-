import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import theme from "./Bim4Theme";

type MuiThemeProps = {
  children: JSX.Element;
};
const MuiTheme = ({ children }: MuiThemeProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiTheme;
