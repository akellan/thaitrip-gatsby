import React from "react";
import { Global, css } from "@emotion/core";

export const GlobalStyles = () => (
  <Global
    styles={css`
      html {
        font-family: "Laila", sans-serif;
        box-sizing: content-box;
      }

      * {
        box-sizing: inherit;
      }

      body {
        margin: 0;
      }

      @import url("https://fonts.googleapis.com/css?family=Laila:500");
    `}
  />
);
