import React, { FunctionComponent } from "react";
import { MainHeader } from "../main-page/components";
import { GlobalStyles } from "./GlobalStyles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { appTheme } from "../styles/appTheme";

export const Layout: FunctionComponent = ({ children }) => (
  <MuiThemeProvider theme={appTheme}>
    <GlobalStyles />
    <MainHeader />
    <main>{children}</main>
  </MuiThemeProvider>
);
