import React, { FunctionComponent, Fragment } from "react";
import { MainHeader } from "../main-page/components";
import "../styles/index.css";
import UpLink from "./UpLink";

const LayoutDefault: FunctionComponent = ({ children }) => (
   <Fragment>
      <MainHeader />
      <main>{children}</main>
      <UpLink />
   </Fragment>
);

export const Layout = LayoutDefault;
