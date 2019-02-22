import React, { FunctionComponent, Fragment } from "react";
import { MainHeader } from "../main-page/components";
import "./GlobalStyles";
import withRoot from "../styles/withRoot";

const LayoutDefault: FunctionComponent = ({ children }) => (
  <Fragment>
    <MainHeader />
    <main>{children}</main>
  </Fragment>
);

export const Layout = withRoot(LayoutDefault);
