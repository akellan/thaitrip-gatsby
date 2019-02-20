import React from "react";
import { Global, css } from "@emotion/core";

export const GlobalStyles = () => (
  <Global
    styles={css`
      html {
        font-family: "Laila", sans-serif;
      }

      @import url("https://fonts.googleapis.com/css?family=Laila:500");
    `}
  />
);
