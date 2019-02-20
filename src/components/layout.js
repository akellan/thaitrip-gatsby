import * as React from "react";
import PropTypes from "prop-types";
import { MainHeader } from "../main-page/components";
import { GlobalStyles } from "./GlobalStyles";

const Layout = ({ children }) => (
  <div>
    <GlobalStyles />
    <MainHeader />
    <main>{children}</main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
