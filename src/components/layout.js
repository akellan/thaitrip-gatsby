import * as React from "react";
import PropTypes from "prop-types";
import { MainHeader } from "../main-page/components";
import { GlobalStyles } from "./GlobalStyles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: { useNextVariants: true, h3: { fontWeight: 300 } }
});

const Layout = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <GlobalStyles />
    <MainHeader />
    <main>{children}</main>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
