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
        box-sizing: content-box;
      }

      body {
        font-family: "Laila", sans-serif;
      }

      * {
        box-sizing: inherit;
      }

      @import url("https://fonts.googleapis.com/css?family=Laila:500");
    `}
  />
);
