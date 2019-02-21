import React from "react";
import { Global, css } from "@emotion/core";

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      html {
        box-sizing: border-box;
      }

      body {
        font-family: "Ubuntu", sans-serif;
        font-weight: 300;
      }

      @import url("https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700");
    `}
  />
);
